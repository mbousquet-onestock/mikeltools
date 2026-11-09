// Configuration, helpers et gabarit commun du site Symbiose Mobilité.
import { readFileSync } from "node:fs";

const images = JSON.parse(readFileSync(new URL("./images.json", import.meta.url)));

export const SITE = {
  url: "https://symbiose-mobilite.com",
  name: "Symbiose Mobilité",
  tagline: "La mobilité en toute simplicité",
  phone: "+33 6 04 53 35 23",
  phoneHref: "+33604533523",
  email: "contact@symbiose-mobilite.com",
  street: "32 rue du Bosquet",
  zip: "33600",
  city: "Pessac",
  region: "Nouvelle-Aquitaine",
  linkedin: "https://www.linkedin.com/company/symbiose-mobilit%C3%A9/",
  // Point d'envoi des formulaires : fonction serverless sur Vercel, script PHP sur OVH
  formAction: process.env.FORM_ACTION || (process.env.VERCEL ? "/api/envoi" : "/envoi.php"),
};

export const NAV = [
  { href: "/relocation/", label: "Relocation" },
  { href: "/recrutement/", label: "Recrutement" },
  { href: "/impatriation-professionnelle/", label: "Impatriation" },
  { href: "/qui-sommes-nous/", label: "Qui sommes-nous ?" },
  { href: "/temoignages/", label: "Témoignages" },
];

/** Échappe une chaîne pour l'insérer dans du HTML. */
export const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/**
 * Image responsive WebP avec dimensions explicites (pas de CLS).
 * @param {string} slug  nom dans images.json
 * @param {string} alt   texte alternatif ("" si décorative)
 * @param {object} o     { sizes, eager, cls }
 */
export function img(slug, alt, o = {}) {
  const meta = images[slug];
  if (!meta) throw new Error(`Image inconnue : ${slug}`);
  const { w, h, widths } = meta;
  const srcset = widths.map((x) => `/img/${slug}-${x}.webp ${x}w`).join(", ");
  const fallback = widths.find((x) => x >= 960) ?? widths.at(-1);
  const attrs = [
    `src="/img/${slug}-${fallback}.webp"`,
    widths.length > 1 ? `srcset="${srcset}"` : "",
    widths.length > 1 ? `sizes="${o.sizes ?? "(min-width: 64rem) 50vw, 100vw"}"` : "",
    `width="${w}" height="${h}"`,
    `alt="${esc(alt)}"`,
    o.eager ? 'fetchpriority="high"' : 'loading="lazy"',
    'decoding="async"',
    o.cls ? `class="${o.cls}"` : "",
  ];
  return `<img ${attrs.filter(Boolean).join(" ")}>`;
}

/** Pictogramme SVG décoratif. */
export const icon = (name) =>
  `<img src="/icons/${name}.svg" width="64" height="64" alt="" loading="lazy" decoding="async" class="picto">`;

const checkSvg =
  '<svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20"><path fill="currentColor" d="M8 13.6 4.4 10l-1.4 1.4L8 16.4l9-9L15.6 6z"/></svg>';

/** Liste à puces « coche ». */
export const checklist = (items) =>
  `<ul class="checklist">${items.map((i) => `<li>${checkSvg}<span>${i}</span></li>`).join("")}</ul>`;

/** FAQ accessible en <details>, avec données structurées FAQPage. */
export function faq(items, title = "Vos questions, nos réponses") {
  const html = `
<section class="section section--alt" aria-labelledby="faq-title">
  <div class="container container--narrow">
    <h2 id="faq-title" class="section-title">${title}</h2>
    <div class="faq">
      ${items
        .map(
          ([q, a]) => `<details class="faq__item"><summary>${q}</summary><div class="faq__answer"><p>${a}</p></div></details>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>`;
  const jsonld = {
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") },
    })),
  };
  return { html, jsonld };
}

/** Bandeau d'appel à l'action. */
export const cta = (title, text, label = "Nous contacter", href = "/nous-contacter/") => `
<section class="cta">
  <div class="container cta__inner">
    <div>
      <h2 class="cta__title">${title}</h2>
      <p>${text}</p>
    </div>
    <div class="cta__actions">
      <a class="btn btn--light" href="${href}">${label}</a>
      <a class="btn btn--ghost-light" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
    </div>
  </div>
</section>`;

/** Fil d'Ariane visible + données structurées. */
function breadcrumb(trail) {
  if (!trail?.length) return { html: "", jsonld: null };
  const all = [{ name: "Accueil", path: "/" }, ...trail];
  const html = `<nav class="breadcrumb container" aria-label="Fil d’Ariane"><ol>${all
    .map((c, i) =>
      i === all.length - 1
        ? `<li><span aria-current="page">${esc(c.name)}</span></li>`
        : `<li><a href="${c.path}">${esc(c.name)}</a></li>`
    )
    .join("")}</ol></nav>`;
  const jsonld = {
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: SITE.url + c.path,
    })),
  };
  return { html, jsonld };
}

export const ORG_ID = `${SITE.url}/#organisation`;

/** Données structurées de l'entreprise (présentes sur toutes les pages). */
export const organization = {
  "@type": ["ProfessionalService", "Organization"],
  "@id": ORG_ID,
  name: SITE.name,
  slogan: SITE.tagline,
  url: SITE.url + "/",
  logo: `${SITE.url}/img/logo-symbiose-mobilite.svg`,
  image: `${SITE.url}/img/og-symbiose-mobilite.jpg`,
  email: SITE.email,
  telephone: SITE.phoneHref,
  description:
    "Symbiose Mobilité accompagne les entreprises et leurs salariés dans leur mobilité professionnelle en France et à l’international : relocation, recrutement et impatriation.",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    postalCode: SITE.zip,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: "FR",
  },
  areaServed: [{ "@type": "Country", name: "France" }],
  founder: { "@type": "Person", name: "Mikel Barthelemy", jobTitle: "Directeur" },
  sameAs: [SITE.linkedin],
  knowsLanguage: ["fr", "en"],
};

const year = new Date().getFullYear();

/**
 * Gabarit HTML complet.
 * page = { path, title, description, body, trail, jsonld:[], noindex, ogImage, ogType }
 */
export function layout(page) {
  const canonical = SITE.url + page.path;
  const bc = breadcrumb(page.trail);
  const graph = [organization, { "@type": "WebSite", "@id": `${SITE.url}/#site`, url: SITE.url + "/", name: SITE.name, inLanguage: "fr-FR", publisher: { "@id": ORG_ID } }];
  graph.push({
    "@type": "WebPage",
    "@id": canonical + "#page",
    url: canonical,
    name: page.title,
    description: page.description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE.url}/#site` },
    about: { "@id": ORG_ID },
  });
  if (bc.jsonld) graph.push(bc.jsonld);
  graph.push(...(page.jsonld ?? []));
  const ogImage = SITE.url + (page.ogImage ?? "/img/og-symbiose-mobilite.jpg");
  const nav = NAV.map(
    (n) => `<li><a href="${n.href}"${page.path.startsWith(n.href) ? ' aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("");

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${canonical}">
<link rel="preload" href="/fonts/barlow-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/barlow-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/style.css?v=${page.version}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#012e40">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:type" content="${page.ogType ?? "website"}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${SITE.name} – ${SITE.tagline}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
<script src="/js/main.js?v=${page.version}" defer></script>
</head>
<body>
<a class="skip-link" href="#contenu">Aller au contenu</a>
<header class="site-header">
  <div class="topbar">
    <div class="container topbar__inner">
      <span>Relocation · Recrutement · Impatriation — partout en France et à l’international</span>
      <span class="topbar__contact">
        <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </span>
    </div>
  </div>
  <div class="container header__inner">
    <a class="brand" href="/" ${page.path === "/" ? 'aria-current="page"' : ""}>
      <img src="/img/logo-symbiose-mobilite.svg" width="190" height="57" alt="Symbiose Mobilité – accueil">
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-principal">
      <span class="menu-toggle__bars" aria-hidden="true"></span><span class="menu-toggle__label">Menu</span>
    </button>
    <nav id="menu-principal" class="main-nav" aria-label="Navigation principale">
      <ul>${nav}</ul>
      <a class="btn btn--primary btn--sm" href="/nous-contacter/"${page.path === "/nous-contacter/" ? ' aria-current="page"' : ""}>Nous contacter</a>
    </nav>
  </div>
</header>
${bc.html}
<main id="contenu" tabindex="-1">
${page.body}
</main>
<footer class="site-footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <img src="/img/logo-symbiose-mobilite.svg" width="190" height="57" alt="Symbiose Mobilité" loading="lazy">
      <p>${SITE.tagline}. Votre partenaire mobilité professionnelle en France et à l’international, basé à Pessac (Bordeaux Métropole).</p>
      <a class="footer__social" href="${SITE.linkedin}" rel="noopener" target="_blank">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
        Suivez-nous sur LinkedIn<span class="sr-only"> (nouvelle fenêtre)</span>
      </a>
    </div>
    <div>
      <h2 class="footer__title">Nos services</h2>
      <ul class="footer__links">
        <li><a href="/relocation/">Relocation et recherche de logement</a></li>
        <li><a href="/recrutement/">Recrutement et chasse de talents</a></li>
        <li><a href="/impatriation-professionnelle/">Impatriation professionnelle</a></li>
        <li><a href="/temoignages/">Témoignages clients</a></li>
        <li><a href="/enquete-de-satisfaction/">Enquête de satisfaction</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer__title">Nous trouver</h2>
      <address>
        ${SITE.name}<br>${SITE.street}<br>${SITE.zip} ${SITE.city}<br>
        <a href="tel:${SITE.phoneHref}">${SITE.phone}</a><br>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </address>
      <p><a href="/recrutement/#candidature">Déposer une candidature</a></p>
    </div>
  </div>
  <div class="container footer__bottom">
    <p>© ${year} ${SITE.name}</p>
    <ul>
      <li><a href="/mentions-legales/">Mentions légales</a></li>
      <li><a href="/politique-de-confidentialite/">Politique de confidentialité</a></li>
      <li><a href="/accessibilite/">Accessibilité : partiellement conforme</a></li>
    </ul>
  </div>
</footer>
</body>
</html>
`;
}

/** Bloc formulaire de contact (réutilisé sur plusieurs pages). */
export function contactForm({ id = "contact", subject = "", heading = "h2" } = {}) {
  const opt = (v) => `<option${v === subject ? " selected" : ""}>${v}</option>`;
  return `
<form class="form" id="${id}" action="${SITE.formAction}" method="post" novalidate>
  <input type="hidden" name="formulaire" value="contact">
  <input type="hidden" name="t" value="">
  <${heading} class="form__title">Écrivez-nous</${heading}>
  <p class="form__hint">Les champs marqués d’un astérisque (<span aria-hidden="true">*</span><span class="sr-only">astérisque</span>) sont obligatoires.</p>
  <div class="form__grid">
    <div class="field">
      <label for="${id}-profil">Vous êtes <span aria-hidden="true">*</span></label>
      <select id="${id}-profil" name="profil" required>
        <option value="">Choisir…</option><option>Une entreprise</option><option>Un particulier</option>
      </select>
    </div>
    <div class="field">
      <label for="${id}-objet">Objet de votre demande <span aria-hidden="true">*</span></label>
      <select id="${id}-objet" name="objet" required>
        <option value="">Choisir…</option>${["Relocation", "Recrutement", "Impatriation professionnelle", "Demande de documentation", "Candidature spontanée", "Autre"].map(opt).join("")}
      </select>
    </div>
    <div class="field">
      <label for="${id}-nom">Nom <span aria-hidden="true">*</span></label>
      <input id="${id}-nom" name="nom" type="text" autocomplete="family-name" required>
    </div>
    <div class="field">
      <label for="${id}-prenom">Prénom <span aria-hidden="true">*</span></label>
      <input id="${id}-prenom" name="prenom" type="text" autocomplete="given-name" required>
    </div>
    <div class="field">
      <label for="${id}-email">Adresse e-mail <span aria-hidden="true">*</span></label>
      <input id="${id}-email" name="email" type="email" autocomplete="email" required aria-describedby="${id}-email-aide">
      <p class="field__help" id="${id}-email-aide">Format attendu : nom@domaine.fr</p>
    </div>
    <div class="field">
      <label for="${id}-tel">Téléphone <span aria-hidden="true">*</span></label>
      <input id="${id}-tel" name="telephone" type="tel" autocomplete="tel" required>
    </div>
    <div class="field field--full">
      <label for="${id}-societe">Société</label>
      <input id="${id}-societe" name="societe" type="text" autocomplete="organization">
    </div>
    <div class="field field--full">
      <label for="${id}-message">Votre message <span aria-hidden="true">*</span></label>
      <textarea id="${id}-message" name="message" rows="5" required></textarea>
    </div>
    <div class="field field--hp" aria-hidden="true">
      <label for="${id}-site">Ne pas remplir ce champ</label>
      <input id="${id}-site" name="site_web" type="text" tabindex="-1" autocomplete="off">
    </div>
    <div class="field field--full field--check">
      <input id="${id}-rgpd" name="rgpd" type="checkbox" value="oui" required data-label="Consentement à la politique de confidentialité">
      <label for="${id}-rgpd">J’accepte que mes données soient utilisées pour traiter ma demande, conformément à la <a href="/politique-de-confidentialite/">politique de confidentialité</a>. <span aria-hidden="true">*</span></label>
    </div>
    <div class="field field--full field--check">
      <input id="${id}-news" name="newsletter" type="checkbox" value="oui">
      <label for="${id}-news">Je souhaite recevoir les actualités et offres de Symbiose Mobilité (désinscription possible à tout moment).</label>
    </div>
  </div>
  <div class="form__errors" role="alert" aria-live="assertive"></div>
  <button class="btn btn--primary" type="submit">Envoyer ma demande</button>
</form>`;
}

/** Coordonnées (bloc latéral). */
export const contactCard = (title = "Nos coordonnées") => `
<aside class="contact-card" aria-labelledby="coord-title">
  <h2 id="coord-title" class="contact-card__title">${title}</h2>
  <address>
    <p><strong>${SITE.name}</strong><br>${SITE.street}<br>${SITE.zip} ${SITE.city}</p>
    <p><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></p>
    <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
  </address>
  <p class="contact-card__note">Réponse sous 24 h ouvrées. Nous analysons chaque demande et revenons vers vous avec une proposition adaptée.</p>
</aside>`;
