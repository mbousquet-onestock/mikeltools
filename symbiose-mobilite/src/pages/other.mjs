// Pages : qui sommes-nous, témoignages, contact, enquête, légales, merci, 404.
import { SITE, ORG_ID, esc, img, checklist, cta, contactForm, contactCard } from "../site.mjs";
import { stats, testimonialCard, otherServices } from "../components.mjs";
import { TEAM, TESTIMONIALS } from "../data.mjs";

/* ------------------------------------------------------------------ */
export const about = {
  path: "/qui-sommes-nous/",
  title: "Qui sommes-nous ? L’équipe Symbiose Mobilité à Pessac (Bordeaux)",
  description:
    "Découvrez Symbiose Mobilité : une équipe basée à Pessac et plus de 80 chargés de mission en France pour vos projets de relocation, recrutement et impatriation.",
  trail: [{ name: "Qui sommes-nous ?", path: "/qui-sommes-nous/" }],
  ogType: "profile",
  jsonld: [
    {
      "@type": "AboutPage",
      url: `${SITE.url}/qui-sommes-nous/`,
      mainEntity: { "@id": ORG_ID },
    },
    ...TEAM.map((p) => ({
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      worksFor: { "@id": ORG_ID },
      image: `${SITE.url}/img/${p.slug}-234.webp`,
    })),
  ],
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <p class="eyebrow">Qui sommes-nous ?</p>
      <h1>Symbiose Mobilité, <span class="accent">notre expérience</span> à vos côtés</h1>
      <p class="lead">Symbiose Mobilité apporte son savoir-faire et son expérience aux entreprises et à leurs salariés, en les accompagnant à travers une offre de mobilité globale, du départ à l’arrivée.</p>
    </div>
    ${img("recrutement-projet-entreprise", "L’équipe Symbiose Mobilité en réunion de travail", { eager: true, sizes: "(min-width: 64rem) 45vw, 100vw", cls: "rounded" })}
  </div>
</section>

<section class="section" aria-labelledby="savoir-title">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">Notre savoir-faire</p>
      <h2 id="savoir-title" class="section-title">Une équipe dédiée et soudée, basée à Pessac</h2>
      <p class="lead">Grâce à son expertise et à un large choix de prestations sur mesure, Symbiose Mobilité accompagne les entreprises et leurs salariés partout en France et à l’international.</p>
    </div>
    ${stats([
      { value: "+80", label: "chargés de mission répartis sur tout le territoire, en lien étroit avec le siège" },
      { value: "+150", label: "dossiers de relocation, de recrutement et d’impatriation gérés chaque mois" },
      { value: "+700", label: "entreprises clientes" },
      { value: "98 %", label: "de clients satisfaits" },
    ])}
  </div>
</section>

<section class="section section--alt" aria-labelledby="equipe-title">
  <div class="container">
    <h2 id="equipe-title" class="section-title center">L’équipe</h2>
    <div class="team">
      ${TEAM.map(
        (p) => `
      <article class="person">
        ${img(p.slug, `Portrait de ${p.name}`, { cls: "person__img" })}
        <h3 class="person__name">${p.name}</h3>
        <p class="person__role">${p.role}</p>
        <p class="person__kw">${p.keywords}</p>
        ${p.bio.map((b) => `<p>${b}</p>`).join("")}
      </article>`
      ).join("")}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="valeurs-title">
  <div class="container">
    <h2 id="valeurs-title" class="section-title center">Pour vos projets, nous nous appuyons sur 4 valeurs fortes</h2>
    <ul class="values">
      ${[
        ["valeur-esprit-equipe", "Esprit d’équipe"],
        ["valeur-proximite", "Proximité"],
        ["valeur-exigence", "Exigence"],
        ["valeur-sens-du-service", "Qualité des services"],
      ]
        .map(([s, l]) => `<li>${img(s, "", { sizes: "(min-width: 64rem) 22vw, 45vw" })}<span>${l}</span></li>`)
        .join("")}
    </ul>
  </div>
</section>

<section class="section section--alt" aria-labelledby="engagements-title">
  <div class="container">
    <div class="section-head center">
      <h2 id="engagements-title" class="section-title">Nous facilitons la mobilité en France et à l’international</h2>
    </div>
    <div class="duo">
      <div class="duo__col">
        <h3>Pour les employeurs</h3>
        <h4>Des coûts optimisés</h4>
        ${checklist(["Offres sur mesure pour les entreprises", "Délais de recrutement, d’intégration et de mutation réduits", "Attraction, fidélisation et rétention des talents"])}
        <h4>Une mobilité aisée</h4>
        ${checklist(["Un seul interlocuteur pour vos recrutements et vos mobilités nationales et internationales", "Une marque employeur attractive et renforcée", "Un collaborateur immédiatement opérationnel et valorisé"])}
        <h4>Un processus sécurisé</h4>
        ${checklist(["Suivi régulier des dossiers en cours", "Engagement de satisfaction"])}
      </div>
      <div class="duo__col">
        <h3>Pour les collaborateurs</h3>
        <h4>Un interlocuteur unique</h4>
        ${checklist(["De la prise de contact à la finalisation de la relocation ou du recrutement", "Coordination avec les chargés de mission locaux"])}
        <h4>Une équipe rigoureuse</h4>
        ${checklist(["Des coordinateurs qui vous relient à nos partenaires nationaux et internationaux", "Analyse de votre demande sous 24 h", "Informations en temps réel", "Confidentialité garantie"])}
        <h4>Un conseil indépendant</h4>
        ${checklist(["Une solide expertise terrain des marchés locaux", "Moins de stress personnel et familial lié à la mobilité", "Accès à des offres hors marché", "Un gain de temps conséquent sur l’administratif et la logistique"])}
      </div>
    </div>
  </div>
</section>
${otherServices("")}
${cta("Envie d’en savoir plus ?", "Notre équipe est à votre écoute pour construire votre projet de mobilité.")}`,
};

/* ------------------------------------------------------------------ */
export const temoignages = {
  path: "/temoignages/",
  title: "Témoignages et avis clients | Symbiose Mobilité",
  description:
    "Ils ont fait appel à Symbiose Mobilité pour leur relocation, leur recrutement ou leur impatriation : découvrez leurs témoignages.",
  trail: [{ name: "Témoignages", path: "/temoignages/" }],
  body: `
<section class="page-hero page-hero--simple">
  <div class="container container--narrow center">
    <p class="eyebrow">Témoignages</p>
    <h1>Ils nous ont <span class="accent">fait confiance</span></h1>
    <p class="lead">Convaincus par la qualité de nos services, nos clients partagent leur expérience de relocation, de recrutement et d’impatriation partout en France… et jusqu’à l’étranger !</p>
    <a class="btn btn--primary" href="/enquete-de-satisfaction/">Partager mon expérience</a>
  </div>
</section>
<section class="section" aria-labelledby="liste-avis">
  <div class="container">
    <h2 id="liste-avis" class="sr-only">Les derniers témoignages</h2>
    <div class="quotes-grid">
      ${TESTIMONIALS.map((t) => testimonialCard(t, "h3")).join("")}
    </div>
  </div>
</section>
${cta("À votre tour de vivre une mobilité sereine", "Parlez-nous de votre projet : nous vous répondons sous 24 h.")}`,
};

/* ------------------------------------------------------------------ */
export const contact = {
  path: "/nous-contacter/",
  title: "Nous contacter – Symbiose Mobilité, Pessac (Bordeaux)",
  description:
    "Un projet de mobilité professionnelle ? Contactez Symbiose Mobilité à Pessac : relocation, recrutement et impatriation. Réponse sous 24 h ouvrées.",
  trail: [{ name: "Nous contacter", path: "/nous-contacter/" }],
  jsonld: [{ "@type": "ContactPage", url: `${SITE.url}/nous-contacter/`, mainEntity: { "@id": ORG_ID } }],
  body: `
<section class="page-hero page-hero--simple">
  <div class="container container--narrow center">
    <p class="eyebrow">Contact</p>
    <h1>Symbiose Mobilité, <span class="accent">notre expertise</span> à vos côtés</h1>
    <p class="lead">Vous avez un projet de mobilité professionnelle ou une question ? Notre équipe vous conseille et vous accompagne en matière de relocation, de recrutement et d’impatriation professionnelle.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="container contact-layout">
    ${contactForm({ id: "contact" })}
    ${contactCard()}
  </div>
</section>`,
};

/* ------------------------------------------------------------------ */
const rating = (name, label, required = true) => `
<fieldset class="rating">
  <legend>${label}${required ? ' <span aria-hidden="true">*</span>' : ""}</legend>
  <div class="rating__scale">
    ${[1, 2, 3, 4, 5]
      .map(
        (n) => `<input type="radio" id="${name}-${n}" name="${name}" value="${n}"${required ? " required" : ""}><label for="${name}-${n}"><span class="sr-only">Note </span>${n}<span class="sr-only"> sur 5</span></label>`
      )
      .join("")}
  </div>
</fieldset>`;

export const enquete = {
  path: "/enquete-de-satisfaction/",
  title: "Enquête de satisfaction | Symbiose Mobilité",
  description:
    "Vous avez été accompagné par Symbiose Mobilité ? Donnez-nous votre avis en moins de 3 minutes et aidez-nous à améliorer nos services.",
  trail: [{ name: "Enquête de satisfaction", path: "/enquete-de-satisfaction/" }],
  body: `
<section class="page-hero page-hero--simple">
  <div class="container container--narrow center">
    <p class="eyebrow">Questionnaire de satisfaction</p>
    <h1>Votre satisfaction est notre priorité</h1>
    <p class="lead">Vous avez fait appel à nos services pour votre mobilité professionnelle : merci pour votre confiance ! Dans une démarche d’amélioration continue, votre avis sur la qualité de nos prestations nous est précieux.</p>
  </div>
</section>
<section class="section section--tight">
  <div class="container contact-layout">
    <form class="form" id="enquete" action="${SITE.formAction}" method="post" novalidate>
      <input type="hidden" name="formulaire" value="enquete">
      <input type="hidden" name="t" value="">
      <h2 class="form__title">Questionnaire</h2>
      <p class="form__hint">Les champs marqués d’un astérisque (<span aria-hidden="true">*</span><span class="sr-only">astérisque</span>) sont obligatoires. Notez de 1 (note la plus basse) à 5 (note la plus élevée).</p>
      <div class="form__grid">
        <div class="field"><label for="e-nom">Nom <span aria-hidden="true">*</span></label><input id="e-nom" name="nom" autocomplete="family-name" required></div>
        <div class="field"><label for="e-prenom">Prénom <span aria-hidden="true">*</span></label><input id="e-prenom" name="prenom" autocomplete="given-name" required></div>
        <div class="field field--full"><label for="e-email">Adresse e-mail <span aria-hidden="true">*</span></label><input id="e-email" name="email" type="email" autocomplete="email" required></div>
      </div>
      ${rating("note_globale", "De façon générale, quel est votre niveau de satisfaction concernant Symbiose Mobilité ?")}
      <h3 class="form__subtitle">Notre conseil et notre accompagnement</h3>
      ${rating("note_accueil", "Accueil et présentation de nos services")}
      ${rating("note_reactivite", "Réactivité et qualité du premier échange avec votre consultant(e)")}
      ${rating("note_suivi", "Écoute et suivi de votre demande")}
      ${rating("note_expertise", "Qualité de l’expertise et des conseils apportés")}
      ${rating("note_recrutement", "Pertinence des profils sélectionnés (recrutement)", false)}
      ${rating("note_impatriation", "Services d’impatriation professionnelle réalisés par votre référent(e)", false)}
      ${rating("note_logement", "Pertinence des logements sélectionnés et organisation des visites", false)}
      ${rating("note_recommandation", "Dans quelle mesure recommanderiez-vous Symbiose Mobilité à un proche ou un collègue ?")}
      <div class="form__grid">
        <div class="field field--full"><label for="e-ameliorer">Selon vous, comment pourrions-nous améliorer nos services ?</label><textarea id="e-ameliorer" name="ameliorations" rows="4"></textarea></div>
        <div class="field field--full"><label for="e-temoignage">Laissez-nous votre témoignage</label><textarea id="e-temoignage" name="temoignage" rows="4" aria-describedby="e-temoignage-aide"></textarea><p class="field__help" id="e-temoignage-aide">Avec votre accord ci-dessous, il pourra être publié sur notre site avec votre prénom et l’initiale de votre nom.</p></div>
        <div class="field field--hp" aria-hidden="true"><label for="e-site">Ne pas remplir ce champ</label><input id="e-site" name="site_web" tabindex="-1" autocomplete="off"></div>
        <div class="field field--full field--check"><input id="e-publication" name="publication" type="checkbox" value="oui"><label for="e-publication">J’accepte que mon témoignage soit publié sur le site (prénom et initiale du nom).</label></div>
        <div class="field field--full field--check"><input id="e-news" name="newsletter" type="checkbox" value="oui"><label for="e-news">Je souhaite recevoir les actualités et offres de Symbiose Mobilité.</label></div>
        <div class="field field--full field--check"><input id="e-rgpd" name="rgpd" type="checkbox" value="oui" required data-label="Consentement à la politique de confidentialité"><label for="e-rgpd">J’accepte que mes données soient traitées conformément à la <a href="/politique-de-confidentialite/">politique de confidentialité</a>. <span aria-hidden="true">*</span></label></div>
      </div>
      <div class="form__errors" role="alert" aria-live="assertive"></div>
      <button class="btn btn--primary" type="submit">Envoyer mes réponses</button>
    </form>
    ${contactCard("Des questions sur votre dossier ?")}
  </div>
</section>`,
};

/* ------------------------------------------------------------------ */
const legalPage = (path, name, title, description, html) => ({
  path,
  title,
  description,
  trail: [{ name, path }],
  body: `
<section class="page-hero page-hero--simple">
  <div class="container container--narrow"><h1>${name}</h1><p class="muted">Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p></div>
</section>
<section class="section section--tight">
  <div class="container container--narrow prose">${html}</div>
</section>`,
});

// Les mentions entre [crochets] sont à compléter par l'éditeur du site (obligations LCEN art. 6).
export const mentions = legalPage(
  "/mentions-legales/",
  "Mentions légales",
  "Mentions légales | Symbiose Mobilité",
  "Mentions légales du site symbiose-mobilite.com : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  `
<h2>1. Éditeur du site</h2>
<p>Conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), il est précisé aux utilisateurs du site <strong>symbiose-mobilite.com</strong> l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>
<ul>
  <li><strong>Raison sociale :</strong> Symbiose Mobilité – <span class="todo">[forme juridique et capital social à compléter]</span></li>
  <li><strong>Siège social :</strong> ${SITE.street}, ${SITE.zip} ${SITE.city}</li>
  <li><strong>SIREN / RCS :</strong> <span class="todo">[n° SIREN et ville du RCS à compléter]</span></li>
  <li><strong>N° de TVA intracommunautaire :</strong> <span class="todo">[à compléter]</span></li>
  <li><strong>Téléphone :</strong> <a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
  <li><strong>E-mail :</strong> <a href="mailto:${SITE.email}">${SITE.email}</a></li>
  <li><strong>Directeur de la publication :</strong> Mikel Barthelemy, directeur</li>
</ul>
<h2>2. Hébergement</h2>
<p>OVH SAS – 2 rue Kellermann – 59100 Roubaix – France – <a href="https://www.ovhcloud.com/fr/" rel="noopener" target="_blank">ovhcloud.com<span class="sr-only"> (nouvelle fenêtre)</span></a> – Tél. : 1007.</p>
<h2>3. Conception et crédits</h2>
<p>Conception graphique d’origine : Compos’it. Crédits photos : Adobe Stock. Police de caractères : Barlow (licence SIL Open Font License).</p>
<h2>4. Propriété intellectuelle</h2>
<p>Symbiose Mobilité est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur l’ensemble des éléments du site : textes, images, graphismes, logos, icônes. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite et constitutive d’une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
<p>La reproduction des textes sur support papier est autorisée à condition d’être gratuite, de respecter l’intégrité des documents et de citer clairement la source : « Document issu du site symbiose-mobilite.com ».</p>
<h2>5. Limitation de responsabilité</h2>
<p>Symbiose Mobilité s’efforce de fournir des informations exactes et à jour, mais ne saurait être tenue responsable des erreurs, d’une absence de disponibilité des informations ou de la présence de virus sur le site. Les informations relatives aux aides et dispositifs publics (Action Logement, titres de séjour…) sont fournies à titre indicatif et ne remplacent pas les sources officielles.</p>
<h2>6. Données personnelles</h2>
<p>Le traitement de vos données personnelles est décrit dans notre <a href="/politique-de-confidentialite/">politique de confidentialité</a>. Vous disposez notamment de droits d’accès, de rectification, d’effacement et d’opposition, que vous pouvez exercer à l’adresse <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
<h2>7. Cookies</h2>
<p>Ce site ne dépose <strong>aucun cookie publicitaire ni de mesure d’audience</strong> nécessitant votre consentement. Seuls des éléments strictement nécessaires à son fonctionnement peuvent être utilisés.</p>
<h2>8. Liens hypertextes</h2>
<p>Le site peut contenir des liens vers d’autres sites. Symbiose Mobilité n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>
<h2>9. Droit applicable</h2>
<p>Les présentes mentions sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents de Bordeaux seront seuls compétents, sous réserve des règles d’ordre public applicables aux consommateurs.</p>`
);

export const confidentialite = legalPage(
  "/politique-de-confidentialite/",
  "Politique de confidentialité",
  "Politique de confidentialité (RGPD) | Symbiose Mobilité",
  "Comment Symbiose Mobilité collecte, utilise et protège vos données personnelles, et comment exercer vos droits (RGPD).",
  `
<p>Symbiose Mobilité attache une grande importance à la protection de vos données personnelles. La présente politique décrit les traitements réalisés via le site symbiose-mobilite.com, conformément au Règlement général sur la protection des données (RGPD – UE 2016/679) et à la loi « Informatique et Libertés » modifiée.</p>
<h2>1. Responsable du traitement</h2>
<p>Symbiose Mobilité, ${SITE.street}, ${SITE.zip} ${SITE.city}, représentée par Mikel Barthelemy. Contact : <a href="mailto:${SITE.email}">${SITE.email}</a> – <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>.</p>
<h2>2. Données collectées et finalités</h2>
<div class="table-wrap">
<table>
  <caption class="sr-only">Traitements de données personnelles</caption>
  <thead><tr><th scope="col">Finalité</th><th scope="col">Données</th><th scope="col">Base légale</th><th scope="col">Durée de conservation</th></tr></thead>
  <tbody>
    <tr><td>Répondre à vos demandes de contact, de devis ou de documentation</td><td>Nom, prénom, e-mail, téléphone, société, message</td><td>Mesures précontractuelles / intérêt légitime</td><td>2 ans à compter du dernier contact</td></tr>
    <tr><td>Étudier les candidatures</td><td>Identité, coordonnées, parcours, message</td><td>Mesures précontractuelles</td><td>2 ans à compter du dernier contact, sauf opposition</td></tr>
    <tr><td>Enquête de satisfaction et publication de témoignages</td><td>Nom, prénom, e-mail, notes, commentaires</td><td>Intérêt légitime (amélioration des services) ; consentement pour la publication</td><td>2 ans ; publication jusqu’au retrait du consentement</td></tr>
    <tr><td>Envoi d’actualités et d’offres (newsletter)</td><td>E-mail, nom, prénom</td><td>Consentement</td><td>Jusqu’au désabonnement, au plus 2 ans sans interaction</td></tr>
  </tbody>
</table>
</div>
<p>Les champs obligatoires sont signalés par un astérisque ; à défaut, nous ne pourrons pas traiter votre demande.</p>
<h2>3. Destinataires</h2>
<p>Vos données sont destinées exclusivement aux équipes habilitées de Symbiose Mobilité et, si nécessaire à l’exécution de la prestation, à ses chargés de mission. Elles ne sont jamais vendues. Nos sous-traitants techniques (hébergement : OVH SAS, France ; outil d’e-mailing le cas échéant) agissent sur nos instructions et présentent des garanties conformes au RGPD.</p>
<h2>4. Transferts hors Union européenne</h2>
<p>Vos données sont hébergées en France. Aucun transfert hors de l’Union européenne n’est réalisé sans garanties appropriées (décision d’adéquation ou clauses contractuelles types).</p>
<h2>5. Cookies et traceurs</h2>
<p>Ce site n’utilise <strong>aucun cookie publicitaire, de réseau social ou de mesure d’audience</strong> soumis à consentement, et ne charge aucune ressource tierce (polices, scripts) depuis des serveurs extérieurs. Aucun bandeau cookies n’est donc nécessaire. Si un outil de mesure d’audience devait être ajouté, il serait configuré en mode exempté de consentement selon les recommandations de la CNIL, ou soumis à votre accord préalable.</p>
<h2>6. Vos droits</h2>
<p>Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition, ainsi que du droit de retirer votre consentement à tout moment et de définir des directives relatives au sort de vos données après votre décès.</p>
<p>Pour les exercer, écrivez-nous à <a href="mailto:${SITE.email}">${SITE.email}</a> ou par courrier à l’adresse ci-dessus. Nous répondons dans un délai d’un mois. En cas de doute raisonnable sur votre identité, un justificatif pourra vous être demandé.</p>
<p>Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <a href="https://www.cnil.fr/fr/plaintes" rel="noopener" target="_blank">CNIL<span class="sr-only"> (nouvelle fenêtre)</span></a>.</p>
<h2>7. Sécurité</h2>
<p>Nous mettons en œuvre des mesures techniques et organisationnelles adaptées : site servi exclusivement en HTTPS, accès restreint aux données, protection anti-spam des formulaires sans service tiers.</p>`
);

export const accessibilite = legalPage(
  "/accessibilite/",
  "Déclaration d’accessibilité",
  "Déclaration d’accessibilité | Symbiose Mobilité",
  "Engagement de Symbiose Mobilité en faveur de l’accessibilité numérique de son site internet.",
  `
<p>Symbiose Mobilité s’engage à rendre son site internet accessible au plus grand nombre, conformément au Référentiel général d’amélioration de l’accessibilité (RGAA 4.1.2) et aux règles WCAG 2.2 niveau AA.</p>
<h2>État de conformité</h2>
<p>Le site symbiose-mobilite.com est <strong>partiellement conforme</strong> au RGAA. Il a été conçu dans le respect des principaux critères (structure sémantique, navigation au clavier, contrastes, alternatives textuelles, formulaires étiquetés), mais n’a pas encore fait l’objet d’un audit complet par un organisme indépendant.</p>
<h2>Mesures mises en œuvre</h2>
${checklist([
  "Lien d’évitement « Aller au contenu » et navigation entièrement utilisable au clavier",
  "Contrastes de couleurs conformes (rapport d’au moins 4,5:1 pour le texte)",
  "Titres hiérarchisés, zones de page identifiées (en-tête, navigation, contenu, pied de page)",
  "Champs de formulaire associés à des étiquettes visibles et messages d’erreur explicites",
  "Respect de la préférence « réduire les animations » du système",
  "Compatibilité avec les lecteurs d’écran (NVDA, JAWS, VoiceOver) : boutons et zones correctement nommés",
  "Mise en page adaptée à tous les écrans et au zoom jusqu’à 400 %",
])}
<h2>Outils d’accessibilité</h2>
<p>Le bouton rond situé en bas à droite de chaque page ouvre une barre d’outils permettant d’adapter l’affichage à vos besoins. Vos réglages sont mémorisés sur votre appareil pour les visites suivantes.</p>
${checklist([
  "<strong>Taille du texte</strong> : de 90 % à 200 %, la mise en page s’adapte",
  "<strong>Niveaux de gris</strong>, pour les personnes sensibles aux couleurs",
  "<strong>Haut contraste</strong> (noir sur blanc) et <strong>contraste négatif</strong> (blanc sur noir, liens en jaune), pour les personnes malvoyantes",
  "<strong>Arrière-plan clair</strong>, pour limiter la fatigue visuelle",
  "<strong>Liens soulignés</strong>, pour repérer les liens sans se fier à la couleur",
  "<strong>Police lisible</strong>, plus adaptée aux personnes dyslexiques ou malvoyantes",
  "<strong>Espacement du texte</strong> (interlignes, lettres et mots), selon le critère WCAG 1.4.12",
  "<strong>Arrêt des animations</strong>, pour les personnes épileptiques ou sujettes aux vertiges",
])}
<p>Ces outils complètent les réglages de votre navigateur et de votre système (zoom, lecteur d’écran, mode sombre…), qui restent pleinement compatibles avec le site.</p>
<h2>Retour d’information et contact</h2>
<p>Si vous n’arrivez pas à accéder à un contenu ou à un service, contactez-nous à <a href="mailto:${SITE.email}">${SITE.email}</a> ou au <a href="tel:${SITE.phoneHref}">${SITE.phone}</a> : nous vous proposerons une alternative accessible.</p>
<h2>Voies de recours</h2>
<p>Si vous constatez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou à une fonctionnalité, que vous nous l’avez signalé et que vous n’avez pas obtenu de réponse satisfaisante, vous pouvez saisir le <a href="https://formulaire.defenseurdesdroits.fr/" rel="noopener" target="_blank">Défenseur des droits<span class="sr-only"> (nouvelle fenêtre)</span></a>.</p>`
);

/* ------------------------------------------------------------------ */
export const merci = {
  path: "/merci/",
  title: "Merci pour votre message | Symbiose Mobilité",
  description: "Votre message a bien été envoyé à Symbiose Mobilité.",
  noindex: true,
  body: `
<section class="page-hero page-hero--simple">
  <div class="container container--narrow center">
    <p class="eyebrow">Message envoyé</p>
    <h1>Merci, votre message a bien été envoyé !</h1>
    <p class="lead">Notre équipe revient vers vous sous 24 h ouvrées. Pour toute urgence, appelez-nous au <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>.</p>
    <a class="btn btn--primary" href="/">Retour à l’accueil</a>
  </div>
</section>`,
};

export const erreur = {
  path: "/erreur/",
  title: "Envoi impossible | Symbiose Mobilité",
  description: "Votre message n’a pas pu être envoyé.",
  noindex: true,
  body: `
<section class="page-hero page-hero--simple">
  <div class="container container--narrow center">
    <p class="eyebrow">Oups</p>
    <h1>Votre message n’a pas pu être envoyé</h1>
    <p class="lead">Vérifiez que tous les champs obligatoires sont remplis, puis réessayez. Vous pouvez aussi nous écrire directement à <a href="mailto:${SITE.email}">${SITE.email}</a> ou nous appeler au <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>.</p>
    <a class="btn btn--primary" href="/nous-contacter/">Revenir au formulaire</a>
  </div>
</section>`,
};

export const notFound = {
  path: "/404.html",
  file: "404.html",
  title: "Page introuvable | Symbiose Mobilité",
  description: "La page demandée n’existe pas ou a été déplacée.",
  noindex: true,
  body: `
<section class="page-hero page-hero--simple">
  <div class="container container--narrow center">
    <p class="eyebrow">Erreur 404</p>
    <h1>Cette page est introuvable</h1>
    <p class="lead">La page que vous cherchez n’existe pas ou a été déplacée. Voici quelques pistes :</p>
    <ul class="pill-list">
      <li><a href="/">Accueil</a></li>
      <li><a href="/relocation/">Relocation</a></li>
      <li><a href="/recrutement/">Recrutement</a></li>
      <li><a href="/impatriation-professionnelle/">Impatriation</a></li>
      <li><a href="/nous-contacter/">Nous contacter</a></li>
    </ul>
  </div>
</section>`,
};

export { esc };
