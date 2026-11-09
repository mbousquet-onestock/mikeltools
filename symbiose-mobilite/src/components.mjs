// Blocs de contenu réutilisables entre les pages.
import { esc, icon, img } from "./site.mjs";
import { TESTIMONIALS, STATS } from "./data.mjs";

const quoteSvg =
  '<svg class="quote__mark" aria-hidden="true" viewBox="0 0 32 32" width="32" height="32"><path fill="currentColor" d="M9.3 26C5 26 2 22.6 2 18.2 2 11 7.4 5.4 14 4l1 2.3c-3.8 1.4-6.2 4.4-6.6 7.7 4 .1 6.8 2.8 6.8 6.1 0 3.4-2.6 5.9-5.9 5.9zm16 0c-4.3 0-7.3-3.4-7.3-7.8C18 11 23.4 5.4 30 4l1 2.3c-3.8 1.4-6.2 4.4-6.6 7.7 4 .1 6.8 2.8 6.8 6.1 0 3.4-2.6 5.9-5.9 5.9z"/></svg>';

export const testimonialCard = (t, tag = "h3") => `
<figure class="quote">
  ${quoteSvg}
  <blockquote><p>${esc(t.text)}</p></blockquote>
  <figcaption><${tag} class="quote__name">${esc(t.name)}</${tag}><span class="tag">${esc(t.service)}</span></figcaption>
</figure>`;

/** Carrousel de témoignages (défilement CSS natif, accessible au clavier). */
export const testimonials = (count = 4) => `
<section class="section" aria-labelledby="avis-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Avis clients</p>
      <h2 id="avis-title" class="section-title">Ils nous ont fait confiance</h2>
    </div>
    <div class="carousel" role="region" aria-label="Témoignages (défilement horizontal)" tabindex="0">
      ${TESTIMONIALS.slice(0, count).map((t) => testimonialCard(t, "p")).join("")}
    </div>
    <p class="center"><a class="btn btn--outline" href="/temoignages/">Lire tous les témoignages</a></p>
  </div>
</section>`;

export const stats = (items = STATS) => `
<ul class="stats" aria-label="Chiffres clés">
  ${items.map((s) => `<li><strong>${s.value}</strong><span>${s.label}</span></li>`).join("")}
</ul>`;

/** Grille « Pourquoi nous faire confiance ? » */
export const reasons = (items) => `
<section class="section" aria-labelledby="pourquoi-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Nos engagements</p>
      <h2 id="pourquoi-title" class="section-title">Pourquoi faire confiance à Symbiose Mobilité ?</h2>
    </div>
    <ul class="reasons">
      ${items.map(([ic, strong, rest]) => `<li>${icon(ic)}<p><strong>${strong}</strong> ${rest}</p></li>`).join("")}
    </ul>
  </div>
</section>`;

/** Section texte + image en alternance. */
export const feature = ({ id, title, eyebrow, html, image, alt, reverse = false }) => `
<section class="section feature${reverse ? " feature--reverse" : ""}" id="${id}" aria-labelledby="${id}-title">
  <div class="container feature__grid">
    <div class="feature__text">
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
      <h2 id="${id}-title" class="section-title">${title}</h2>
      ${html}
    </div>
    <div class="feature__media">${img(image, alt, { sizes: "(min-width: 64rem) 45vw, 100vw", cls: "rounded" })}</div>
  </div>
</section>`;

/** Sommaire d'ancres pour les pages services. */
export const steps = (items, title = "Nos domaines d’intervention") => `
<nav class="steps container" aria-label="${esc(title)}">
  <ol>
    ${items.map(([href, label], i) => `<li><a href="#${href}"><span class="steps__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>${label}</a></li>`).join("")}
  </ol>
</nav>`;

export const surveyTeaser = () => `
<section class="section section--alt">
  <div class="container survey">
    ${img("enquete-satisfaction", "", { sizes: "(min-width: 64rem) 22rem, 60vw", cls: "survey__img" })}
    <div>
      <h2 class="section-title">Vous nous avez fait confiance ? Merci !</h2>
      <p>Votre avis nous aide à améliorer nos services. Répondez à notre enquête de satisfaction : cela prend moins de 3 minutes.</p>
      <a class="btn btn--primary" href="/enquete-de-satisfaction/">Répondre à l’enquête</a>
    </div>
  </div>
</section>`;

export const otherServices = (current) => {
  const all = [
    ["/relocation/", "Relocation", "Recherche de logement, déménagement, démarches et installation.", "recherche-logement-sur-mesure"],
    ["/recrutement/", "Recrutement", "Chasse, sélection et intégration de talents en France et à l’étranger.", "recrutement-entretien-candidat"],
    ["/impatriation-professionnelle/", "Impatriation", "Visas, autorisations de travail, titres de séjour et formalités.", "impatriation-visa-autorisation-travail"],
  ].filter(([href]) => href !== current);
  return `
<section class="section" aria-labelledby="autres-title">
  <div class="container">
    <h2 id="autres-title" class="section-title center">Découvrez aussi nos autres expertises</h2>
    <div class="cards cards--2">
      ${all
        .map(
          ([href, title, text, image]) => `
      <article class="card">
        ${img(image, "", { sizes: "(min-width: 64rem) 40vw, 100vw", cls: "card__img" })}
        <div class="card__body">
          <h3 class="card__title"><a href="${href}" class="card__link">${title}</a></h3>
          <p>${text}</p>
          <span class="card__more" aria-hidden="true">En savoir plus →</span>
        </div>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>`;
};
