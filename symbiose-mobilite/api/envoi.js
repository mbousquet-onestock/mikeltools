// Fonction serverless Vercel : traitement des formulaires (contact et enquête de satisfaction).
// Envoi par SMTP (par défaut la messagerie OVH). Variables d'environnement à définir dans Vercel :
//   SMTP_USER, SMTP_PASS            (obligatoires) identifiants de la boîte d'envoi
//   SMTP_HOST, SMTP_PORT            (facultatifs) défaut : ssl0.ovh.net / 465
//   MAIL_TO                         (facultatif)  défaut : contact@symbiose-mobilite.com
//   MAIL_FROM                       (facultatif)  défaut : SMTP_USER
import nodemailer from "nodemailer";

const DELAI_MIN_MS = 3000;

const NOTES = {
  note_globale: "Satisfaction générale",
  note_accueil: "Accueil et présentation",
  note_reactivite: "Réactivité 1er échange",
  note_suivi: "Écoute et suivi",
  note_expertise: "Expertise et conseils",
  note_recrutement: "Profils (recrutement)",
  note_impatriation: "Impatriation",
  note_logement: "Logements et visites",
  note_recommandation: "Recommandation",
};

const redirect = (res, page) => res.redirect(303, `/${page}/`);

export default async function handler(req, res) {
  if (req.method !== "POST") return redirect(res, "nous-contacter");

  const body = typeof req.body === "object" && req.body ? req.body : {};
  const champ = (nom, max = 200) =>
    String(body[nom] ?? "")
      .replace(/[\r\0]/g, "")
      .trim()
      .slice(0, max);

  // Anti-spam : champ piège ou envoi trop rapide => on fait semblant d'accepter.
  const t = Number(body.t) || 0;
  if (champ("site_web") || (t > 0 && Date.now() - t < DELAI_MIN_MS)) return redirect(res, "merci");

  const formulaire = champ("formulaire", 20) === "enquete" ? "enquete" : "contact";
  const nom = champ("nom", 100);
  const prenom = champ("prenom", 100);
  const email = champ("email", 200);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!nom || !prenom || !emailOk || champ("rgpd", 3) !== "oui") return redirect(res, "erreur");

  let sujet;
  let lignes;
  if (formulaire === "contact") {
    const message = champ("message", 5000);
    const tel = champ("telephone", 30);
    if (!message || !tel || !champ("profil") || !champ("objet")) return redirect(res, "erreur");
    sujet = `Site web – ${champ("objet", 60)} – ${prenom} ${nom}`;
    lignes = {
      Profil: champ("profil"),
      Objet: champ("objet"),
      Nom: nom,
      Prénom: prenom,
      Société: champ("societe"),
      "E-mail": email,
      Téléphone: tel,
      Newsletter: champ("newsletter", 3) === "oui" ? "oui" : "non",
      Message: "\n" + message,
    };
  } else {
    sujet = `Enquête de satisfaction – ${prenom} ${nom}`;
    lignes = { Nom: nom, Prénom: prenom, "E-mail": email };
    for (const [cle, libelle] of Object.entries(NOTES)) {
      const n = Number(champ(cle, 1));
      lignes[libelle] = n >= 1 && n <= 5 ? `${n} / 5` : "—";
    }
    lignes["Améliorations"] = "\n" + champ("ameliorations", 3000);
    lignes["Témoignage"] = "\n" + champ("temoignage", 3000);
    lignes["Publication acceptée"] = champ("publication", 3) === "oui" ? "oui" : "non";
    lignes.Newsletter = champ("newsletter", 3) === "oui" ? "oui" : "non";
  }

  const date = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
  const texte =
    Object.entries(lignes)
      .map(([k, v]) => `${k} : ${v}`)
      .join("\n") + `\n\n--\nEnvoyé depuis symbiose-mobilite.com le ${date}\n`;

  const { SMTP_HOST = "ssl0.ovh.net", SMTP_PORT = "465", SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("SMTP_USER / SMTP_PASS non configurés");
    return redirect(res, "erreur");
  }

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: `Site Symbiose Mobilité <${process.env.MAIL_FROM || SMTP_USER}>`,
      to: process.env.MAIL_TO || "contact@symbiose-mobilite.com",
      replyTo: email,
      subject: sujet,
      text: texte,
    });
    return redirect(res, "merci");
  } catch (err) {
    console.error("Échec d'envoi :", err.message);
    return redirect(res, "erreur");
  }
}
