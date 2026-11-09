// Pages : accueil, relocation, recrutement, impatriation.
import { SITE, ORG_ID, img, checklist, faq, cta, contactForm, contactCard } from "../site.mjs";
import { testimonials, stats, reasons, feature, steps, surveyTeaser, otherServices } from "../components.mjs";

const service = (path, name, serviceType, description) => ({
  "@type": "Service",
  "@id": `${SITE.url}${path}#service`,
  name,
  serviceType,
  description,
  provider: { "@id": ORG_ID },
  areaServed: [{ "@type": "Country", name: "France" }],
  audience: { "@type": "BusinessAudience", audienceType: "Entreprises et salariés en mobilité professionnelle" },
  url: SITE.url + path,
});

/* ------------------------------------------------------------------ */
/* Accueil                                                             */
/* ------------------------------------------------------------------ */
export const home = {
  path: "/",
  title: "Relocation, recrutement, impatriation | Symbiose Mobilité",
  description:
    "Relocation, recrutement et impatriation : Symbiose Mobilité accompagne entreprises et salariés dans leur mobilité professionnelle en France et à l’étranger.",
  body: `
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__text">
      <p class="eyebrow">Relocation · Recrutement · Impatriation</p>
      <h1>Symbiose Mobilité, <span class="accent">la mobilité professionnelle en toute simplicité</span></h1>
      <p class="lead">À vos côtés où que vous alliez, en France et à l’étranger ! Relocation, recrutement, impatriation professionnelle : une offre globale et sur mesure pour les entreprises et leurs salariés.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="/nous-contacter/">Parler de votre projet</a>
        <a class="btn btn--outline" href="#expertises">Découvrir nos services</a>
      </div>
      ${stats().replace('class="stats"', 'class="stats stats--hero"')}
    </div>
    <div class="hero__media">
      ${img("mobilite-professionnelle-nouveau-depart", "Jeune salarié souriant portant un carton et une plante, prêt pour sa nouvelle prise de poste", { eager: true, sizes: "(min-width: 64rem) 40vw, 80vw" })}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="intro-title">
  <div class="container container--narrow center">
    <p class="eyebrow">Qui sommes-nous ?</p>
    <h2 id="intro-title" class="section-title">Une mobilité optimisée, sans contraintes</h2>
    <p class="lead">Symbiose Mobilité, c’est votre partenaire pour une mobilité sécurisée, en France et à l’étranger. Nous mettons notre savoir-faire au service des entreprises et de leurs salariés pour une prise de poste en toute sérénité.</p>
    <p>Recrutement, mutation, solution de logement et impatriation : vous valorisez votre marque employeur, renforcez votre attractivité et favorisez le bien-être de vos collaborateurs.</p>
    <p><a class="link-arrow" href="/qui-sommes-nous/">Découvrir l’équipe Symbiose Mobilité</a></p>
  </div>
</section>

<section class="section section--green" id="expertises" aria-labelledby="expertises-title">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">Nos 3 domaines d’expertise</p>
      <h2 id="expertises-title" class="section-title">Une offre de mobilité globale pour les entreprises et les salariés</h2>
    </div>
    <div class="cards cards--3">
      <article class="card card--dark">
        ${img("relocation-couple-nouveau-logement", "", { sizes: "(min-width: 64rem) 30vw, 100vw", cls: "card__img" })}
        <div class="card__body">
          <h3 class="card__title"><a class="card__link" href="/relocation/">Relocation</a></h3>
          <p class="card__lead">Nous nous occupons de tout, vous vous occupez de votre nouvelle vie !</p>
          <p>Recherche de logement, déménagement, démarches administratives : une transition fluide et clé en main pour vous concentrer sur l’essentiel.</p>
          <span class="card__more" aria-hidden="true">En savoir plus →</span>
        </div>
      </article>
      <article class="card card--dark">
        ${img("recrutement-integration-collaborateur", "", { sizes: "(min-width: 64rem) 30vw, 100vw", cls: "card__img" })}
        <div class="card__body">
          <h3 class="card__title"><a class="card__link" href="/recrutement/">Recrutement</a></h3>
          <p class="card__lead">Nous trouvons les talents qui vous ressemblent, où qu’ils soient !</p>
          <p>Une stratégie de recherche ciblée pour attirer les talents rares, de la définition du profil jusqu’à l’intégration, en France et à l’étranger.</p>
          <span class="card__more" aria-hidden="true">En savoir plus →</span>
        </div>
      </article>
      <article class="card card--dark">
        ${img("impatriation-demarches-administratives", "", { sizes: "(min-width: 64rem) 30vw, 100vw", cls: "card__img" })}
        <div class="card__body">
          <h3 class="card__title"><a class="card__link" href="/impatriation-professionnelle/">Impatriation professionnelle</a></h3>
          <p class="card__lead">Nous nous occupons des papiers, vous préparez vos cartons !</p>
          <p>Visas, titres de séjour, formalités : vos collaborateurs internationaux s’installent sereinement en France, vous vous concentrez sur votre activité.</p>
          <span class="card__more" aria-hidden="true">En savoir plus →</span>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="duo-title">
  <div class="container">
    <h2 id="duo-title" class="section-title center">Un accompagnement pensé pour chacun</h2>
    <div class="duo">
      <div class="duo__col">
        <h3>Pour les employeurs</h3>
        ${checklist([
          "<strong>Un seul interlocuteur</strong> pour vos recrutements et vos mobilités nationales et internationales",
          "<strong>Des délais réduits</strong> de recrutement, d’intégration et de mutation",
          "<strong>Une marque employeur renforcée</strong> : attraction, fidélisation et rétention des talents",
          "<strong>Un suivi régulier</strong> et sécurisé de chaque dossier",
        ])}
      </div>
      <div class="duo__col">
        <h3>Pour les collaborateurs</h3>
        ${checklist([
          "<strong>Un interlocuteur unique</strong>, de la prise de contact à l’installation",
          "<strong>Analyse de votre demande sous 24 h</strong> et informations en temps réel",
          "<strong>Accès à des offres hors marché</strong> et à notre réseau local",
          "<strong>Moins de stress</strong> pour vous et votre famille, plus de temps pour l’essentiel",
        ])}
      </div>
    </div>
  </div>
</section>

${testimonials(4)}
${surveyTeaser()}

<section class="section" id="contact" aria-labelledby="contact-home-title">
  <div class="container">
    <div class="section-head center">
      <p class="eyebrow">Contact</p>
      <h2 id="contact-home-title" class="section-title">Parlons de votre projet de mobilité</h2>
    </div>
    <div class="contact-layout">
      ${contactForm({ id: "contact-accueil", heading: "h3" })}
      ${contactCard()}
    </div>
  </div>
</section>`,
};

/* ------------------------------------------------------------------ */
/* Relocation                                                          */
/* ------------------------------------------------------------------ */
const relocFaq = faq([
  [
    "Qu’est-ce qu’une prestation de relocation ?",
    "La relocation regroupe l’ensemble des services qui facilitent l’installation d’un salarié muté ou recruté dans une nouvelle ville : recherche de logement, visites, constitution du dossier locatif, déménagement, démarches administratives et aide à l’installation de la famille.",
  ],
  [
    "Qui finance la prestation de relocation ?",
    "Dans la plupart des cas, la prestation est prise en charge par l’entreprise qui recrute ou mute son collaborateur. Nous accompagnons également les particuliers qui souhaitent être aidés dans leur mobilité. Contactez-nous pour obtenir une proposition adaptée.",
  ],
  [
    "Dans quelles villes intervenez-vous ?",
    "Notre siège est à Pessac, près de Bordeaux, et notre réseau de plus de 80 chargés de mission couvre l’ensemble du territoire français, de Bordeaux à Paris et l’Île-de-France, en passant par toutes les grandes métropoles.",
  ],
  [
    "Les visites peuvent-elles se faire à distance ?",
    "Oui. Votre chargé(e) de mission peut organiser des visites en visio et regrouper les rendez-vous pour limiter vos déplacements. Il ou elle peut aussi visiter les logements pour vous et vous transmettre un compte rendu détaillé.",
  ],
  [
    "Quelles aides au logement peuvent être mobilisées ?",
    "Selon votre situation, des dispositifs d’Action Logement comme l’avance LOCA-PASS® (dépôt de garantie) ou la garantie Visale peuvent être sollicités. Nous vérifions votre éligibilité et montons les dossiers avec vous.",
  ],
]);

export const relocation = {
  path: "/relocation/",
  title: "Relocation de salariés : logement et installation | Symbiose",
  description:
    "Recherche de logement, déménagement, démarches et aides à l’installation : Symbiose Mobilité accompagne vos salariés en mobilité, partout en France.",
  trail: [{ name: "Relocation", path: "/relocation/" }],
  jsonld: [
    service("/relocation/", "Relocation de salariés", "Relocation", "Recherche de logement, coordination du déménagement, démarches administratives et aide à l’installation pour les salariés en mobilité professionnelle."),
    relocFaq.jsonld,
  ],
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <p class="eyebrow">Relocation</p>
      <h1>Une offre de <span class="accent">mobilité globale</span>, du départ à l’arrivée</h1>
      <p class="lead">À chaque étape de la mobilité professionnelle, Symbiose Mobilité propose un accompagnement de proximité, avec un interlocuteur unique, pour une transition réussie du salarié et de son entreprise.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="/nous-contacter/?objet=Relocation">Demander une proposition</a>
        <a class="btn btn--outline" href="/qui-sommes-nous/">Découvrir Symbiose Mobilité</a>
      </div>
    </div>
    ${img("valeur-proximite", "Remise des clés et poignée de main entre une conseillère et sa cliente", { eager: true, sizes: "(min-width: 64rem) 45vw, 100vw", cls: "rounded" })}
  </div>
</section>
${steps([["logement", "Recherche de logement"], ["installation", "Coordination du déménagement"], ["demarches", "Démarches et financement"], ["aide", "Aide à l’installation"]], "Nos 4 domaines d’expertise")}
${feature({
  id: "logement",
  eyebrow: "Étape 1",
  title: `<span class="accent">Le logement,</span> une recherche sur mesure`,
  html: `<p>À votre écoute, votre interlocuteur identifie vos besoins, vous présente une présélection rigoureuse de logements et vous assiste jusqu’à votre installation.</p>
  ${checklist([
    "Découverte du cadre de vie et identification des besoins",
    "Présentation de la ville et de son environnement",
    "Présélection rigoureuse des logements",
    "Présentation de l’offre culturelle, sportive et sociale",
    "Garantie d’un nombre minimum de biens proposés",
    "Assistance à la signature du bail et finalisation administrative",
  ])}`,
  image: "recherche-logement-sur-mesure",
  alt: "",
})}
${feature({
  id: "installation",
  eyebrow: "Étape 2",
  title: `<span class="accent">L’installation,</span> un logement prêt à vivre`,
  reverse: true,
  html: `<p>Symbiose Mobilité travaille en étroite collaboration avec ses partenaires déménageurs. La visite technique et les devis sont offerts : seul le déménagement est facturé, après accord du salarié ou de l’entreprise.</p>
  ${checklist([
    "État des lieux d’entrée réalisé par un professionnel Symbiose Mobilité",
    "Remise des clés à votre arrivée",
    "Ouverture des compteurs : électricité, gaz, eau, internet",
  ])}`,
  image: "installation-demenagement",
  alt: "",
})}
<section class="section section--alt" id="demarches" aria-labelledby="demarches-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Étape 3</p>
      <h2 id="demarches-title" class="section-title"><span class="accent">Les démarches,</span> administratives et financement</h2>
      <p class="lead">Soyez serein : nous montons les dossiers administratifs à vos côtés. Nos dossiers locatifs complets et soignés font la différence auprès des bailleurs.</p>
      <p>Dans le cadre d’une mobilité professionnelle, Action Logement propose des aides financières aux salariés. Selon votre éligibilité, nous constituons pour vous les dossiers suivants :</p>
    </div>
    <div class="cards cards--2">
      <article class="card card--plain">
        <h3 class="card__title">L’avance LOCA-PASS®</h3>
        <p>Une avance sans intérêts pour financer le dépôt de garantie, remboursable progressivement (dans la limite d’un plafond fixé par Action Logement).</p>
        <p class="muted">Conditions d’éligibilité à vérifier selon votre contrat et votre situation.</p>
      </article>
      <article class="card card--plain">
        <h3 class="card__title">La garantie Visale</h3>
        <p>Une caution gratuite accordée par Action Logement, qui garantit au propriétaire le paiement du loyer et des charges en cas d’impayé. Un vrai atout pour rassurer le bailleur et décrocher le logement.</p>
      </article>
    </div>
    <p class="muted small">Informations à titre indicatif ; les conditions en vigueur sont publiées sur <a href="https://www.actionlogement.fr/" rel="noopener" target="_blank">actionlogement.fr<span class="sr-only"> (nouvelle fenêtre)</span></a>.</p>
  </div>
</section>
${feature({
  id: "aide",
  eyebrow: "Étape 4",
  title: `<span class="accent">L’aide à l’installation,</span> pour une mobilité confortable`,
  html: `<h3 class="h4">Une transition réussie pour les enfants</h3>
  ${checklist(["Sélection et présentation des établissements scolaires", "Recherche d’assistantes maternelles, de clubs sportifs et d’activités culturelles"])}
  <h3 class="h4">Un quotidien facilité</h3>
  ${checklist(["Devis d’assurance habitation à tarifs préférentiels", "Accompagnement à l’ouverture d’un compte bancaire", "Aide à la recherche d’emploi du conjoint"])}`,
  image: "aide-installation-famille-ecole",
  alt: "",
  reverse: true,
})}
${reasons([
  ["pictos-01-1", "Une expertise reconnue", "en matière de relocation."],
  ["pictos-02-1", "Une prise en charge complète", "de vos demandes, de A à Z."],
  ["pictos-03-1", "Un réseau national", "de plus de 80 chargés de mission."],
  ["pictos-04-1", "Gain de temps et tranquillité", "pour vous et vos salariés."],
])}
${testimonials(3)}
${relocFaq.html}
${otherServices("/relocation/")}
${cta("Un collaborateur à installer ?", "Décrivez-nous votre besoin : nous analysons votre demande sous 24 h.", "Demander une proposition", "/nous-contacter/?objet=Relocation")}`,
};

/* ------------------------------------------------------------------ */
/* Recrutement                                                         */
/* ------------------------------------------------------------------ */
const recruFaq = faq([
  [
    "Comment se déroule un recrutement avec Symbiose Mobilité ?",
    "Nous commençons par comprendre votre entreprise et le poste, puis nous définissons une stratégie de recherche sur mesure (annonces, chasse, réseau). Nous évaluons les candidats par des entretiens et des tests, vous présentons une short-list et vous accompagnons jusqu’à la fin de la période d’essai.",
  ],
  [
    "Recrutez-vous en dehors de votre région ou à l’international ?",
    "Oui. Grâce à notre ancrage local, national et international, nous recherchons des talents partout en France et à l’étranger.",
  ],
  [
    "Pouvez-vous aussi accompagner l’installation de la personne recrutée ?",
    "C’est notre spécificité : nous associons recrutement et mobilité. Recherche de logement, démarches administratives, impatriation si nécessaire : votre nouvelle recrue est opérationnelle plus vite et s’installe sereinement.",
  ],
  [
    "Je suis candidat : comment vous transmettre mon CV ?",
    "Utilisez le formulaire de contact en choisissant l’objet « Candidature spontanée » et présentez-nous votre projet. Nous reviendrons vers vous si votre profil correspond à l’une de nos missions.",
  ],
]);

export const recrutement = {
  path: "/recrutement/",
  title: "Cabinet de recrutement France et international | Symbiose",
  description:
    "Symbiose Mobilité, votre partenaire recrutement : stratégie sur mesure, chasse, sélection et intégration de vos talents, en France et à l’international.",
  trail: [{ name: "Recrutement", path: "/recrutement/" }],
  jsonld: [
    service("/recrutement/", "Recrutement et chasse de talents", "Recrutement", "Définition du besoin, stratégie de recrutement sur mesure, sélection et évaluation des candidats, accompagnement à l’embauche et à l’intégration."),
    recruFaq.jsonld,
  ],
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <p class="eyebrow">Recrutement</p>
      <h1>Symbiose Mobilité, votre partenaire <span class="accent">recrutement</span> différenciant</h1>
      <p class="lead">Trouver les talents qui partagent votre vision et vos valeurs demande du temps et de l’expertise. Nous prenons le temps de comprendre vos besoins et dénichons les profils les plus pertinents pour servir vos ambitions.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="/nous-contacter/?objet=Recrutement">Confier un recrutement</a>
        <a class="btn btn--outline" href="#candidature">Je suis candidat</a>
      </div>
    </div>
    ${img("recrutement-entretien-candidat", "Entretien de recrutement entre une candidate et un recruteur", { eager: true, sizes: "(min-width: 64rem) 45vw, 100vw", cls: "rounded" })}
  </div>
</section>
${steps([["projet", "Votre société et votre projet"], ["strategie", "Une stratégie sur mesure"], ["selection", "Sélection et évaluation"], ["integration", "Embauche et intégration"]], "Nos 4 étapes de recrutement")}
${feature({
  id: "projet",
  eyebrow: "Étape 1",
  title: `<span class="accent">Votre société</span> et votre projet de recrutement`,
  html: `<p>Nous commençons par parler de vous et de vos valeurs pour comprendre vos attentes. Nous affinons ensuite ensemble votre besoin, afin d’attirer les meilleurs talents… et ceux qui vous ressemblent.</p>
  ${checklist(["Comprendre votre culture d’entreprise et vos attentes", "Définir le profil du poste à pourvoir", "Identifier les compétences requises", "Déterminer les qualités personnelles recherchées"])}`,
  image: "recrutement-projet-entreprise",
  alt: "",
})}
${feature({
  id: "strategie",
  eyebrow: "Étape 2",
  title: `<span class="accent">Une stratégie</span> de recrutement sur mesure`,
  reverse: true,
  html: `<p>Vous recherchez la perle rare ? Notre objectif : recruter les profils les plus pertinents en un temps record. Dans un marché dynamique et concurrentiel, nous mobilisons notre réseau national et international à votre service.</p>
  ${checklist(["Identification des canaux de recrutement les plus adaptés", "Diffusion d’annonces attractives et ciblées", "Sourcing et chasse de profils", "Mobilisation de notre vivier de candidats qualifiés", "Suivi rigoureux des candidatures"])}`,
  image: "recrutement-strategie-sur-mesure",
  alt: "",
})}
${feature({
  id: "selection",
  eyebrow: "Étape 3",
  title: `<span class="accent">Sélection et évaluation</span> des candidats`,
  html: `<p>Étape décisive : nous évaluons les compétences par des tests pointus et des entretiens approfondis pour sécuriser votre choix, puis vous présentons une short-list accompagnée de dossiers complets et de nos conseils.</p>
  ${checklist(["Étude approfondie des profils", "Entretiens d’évaluation des compétences et de la motivation", "Tests de compétences et de personnalité", "Vérification des références professionnelles", "Présentation d’une short-list et organisation des entretiens", "Accompagnement dans la décision finale"])}`,
  image: "recrutement-integration-collaborateur",
  alt: "",
})}
${feature({
  id: "integration",
  eyebrow: "Étape 4",
  title: `<span class="accent">Embauche et intégration :</span> sécurisez et fidélisez vos talents`,
  reverse: true,
  html: `<p>L’arrivée d’un nouveau collaborateur est le début d’une belle aventure. Nous vous accompagnons de la signature du contrat jusqu’à la validation de la période d’essai.</p>
  ${checklist(["Accompagnement jusqu’à la signature du contrat", "Aide à la mobilité et à l’installation si nécessaire", "Suivi lors du pré-onboarding et de l’onboarding", "Démarches administratives et impatriation au besoin", "Suivi de la période d’essai et rétention du talent"])}`,
  image: "demarches-administratives-signature",
  alt: "",
})}
${reasons([
  ["pictos_differenciante", "Une offre différenciante :", "recrutement et mobilité réunis."],
  ["pictos_recrutement", "Une expertise reconnue", "en matière de recrutement."],
  ["pictos_internationale", "Un ancrage local, national et international", "pour trouver les meilleurs talents."],
  ["pictos_vivier", "Un vivier de candidats", "qualifiés, mobiles et motivés."],
  ["pictos-02-1", "Une approche personnalisée", "adaptée à votre besoin."],
  ["pictos_reactive", "Une grande réactivité", "pour répondre à vos demandes."],
])}
<section class="section section--alt" id="candidature" aria-labelledby="candidature-title">
  <div class="container container--narrow center">
    <p class="eyebrow">Candidats</p>
    <h2 id="candidature-title" class="section-title">Vous souhaitez rejoindre l’une de nos entreprises partenaires ?</h2>
    <p>Présentez-nous votre parcours et votre projet de mobilité. Nous étudions chaque candidature avec attention et revenons vers vous lorsqu’une mission correspond à votre profil.</p>
    <a class="btn btn--primary" href="/nous-contacter/?objet=Candidature%20spontan%C3%A9e">Déposer ma candidature</a>
  </div>
</section>
${recruFaq.html}
${otherServices("/recrutement/")}
${cta("Un poste à pourvoir ?", "Confiez-nous votre recrutement : nous revenons vers vous sous 24 h.", "Confier un recrutement", "/nous-contacter/?objet=Recrutement")}`,
};

/* ------------------------------------------------------------------ */
/* Impatriation                                                        */
/* ------------------------------------------------------------------ */
const impFaq = faq([
  [
    "Qu’est-ce que l’impatriation professionnelle ?",
    "L’impatriation désigne l’arrivée en France d’un salarié venant de l’étranger pour y travailler. Elle implique des démarches spécifiques : visa long séjour, autorisation de travail, titre de séjour, sécurité sociale, banque, logement… que nous prenons en charge pour l’entreprise et le salarié.",
  ],
  [
    "Combien de temps faut-il prévoir pour une impatriation ?",
    "Les délais dépendent de la nationalité du salarié, du type de titre demandé et des administrations concernées. Nous recommandons d’anticiper plusieurs semaines, voire quelques mois, avant la date de prise de poste. Nous établissons un calendrier précis dès l’analyse de votre situation.",
  ],
  [
    "Accompagnez-vous aussi la famille du salarié ?",
    "Oui. Nous pouvons intégrer à l’accompagnement les démarches liées aux membres de la famille, ainsi que la recherche de logement, la scolarisation des enfants et l’aide à la recherche d’emploi du conjoint grâce à notre offre de relocation.",
  ],
  [
    "Garantissez-vous la conformité des dossiers ?",
    "Nous assurons une veille réglementaire et vérifions la conformité de chaque dossier avant dépôt. La décision finale reste celle des autorités compétentes, mais un dossier complet et conforme maximise les chances d’une issue favorable dans les meilleurs délais.",
  ],
]);

export const impatriation = {
  path: "/impatriation-professionnelle/",
  title: "Impatriation : visas, titres de séjour, démarches | Symbiose",
  description:
    "Visa, autorisation de travail, titre de séjour, sécurité sociale : Symbiose Mobilité facilite l’arrivée en France de vos collaborateurs internationaux.",
  trail: [{ name: "Impatriation professionnelle", path: "/impatriation-professionnelle/" }],
  jsonld: [
    service("/impatriation-professionnelle/", "Impatriation professionnelle", "Impatriation", "Accompagnement des salariés étrangers et de leur entreprise : visas, autorisations de travail, titres de séjour et démarches administratives d’installation en France."),
    impFaq.jsonld,
  ],
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <p class="eyebrow">Impatriation professionnelle</p>
      <h1>Votre partenaire pour une <span class="accent">installation réussie</span> en France</h1>
      <p class="lead">Quitter son pays pour venir travailler en France est aussi enthousiasmant que stressant. Pour l’entreprise, accueillir un talent étranger est une richesse, mais aussi un défi logistique et administratif. Nous vous accompagnons à chaque étape.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="/nous-contacter/?objet=Demande%20de%20documentation">Demander la documentation</a>
        <a class="btn btn--outline" href="/qui-sommes-nous/">Découvrir Symbiose Mobilité</a>
      </div>
    </div>
    ${img("impatriation-visa-autorisation-travail", "Passeport posé sur un formulaire de demande de visa", { eager: true, sizes: "(min-width: 64rem) 45vw, 100vw", cls: "rounded" })}
  </div>
</section>
${steps([["visas", "Visas et autorisations de travail"], ["titres", "Titres de séjour"], ["demarches", "Démarches administratives"]], "Nos 3 domaines d’expertise")}
${feature({
  id: "visas",
  eyebrow: "Expertise 1",
  title: `<span class="accent">Obtention des visas</span> et autorisations de travail`,
  html: `<p>Venir travailler en France implique d’obtenir les visas et autorisations de travail adaptés. Nous vous accompagnons à chaque étape, en veillant à la conformité de votre dossier, pour que vous puissiez vous concentrer sur votre nouvelle mission.</p>
  ${checklist(["Analyse de votre situation et identification des démarches", "Conseil et assistance pour l’obtention des visas et autorisations de travail", "Veille réglementaire", "Un interlocuteur unique dédié à votre dossier", "Accompagnement tout au long de la procédure"])}`,
  image: "impatriation-demarches-administratives",
  alt: "",
})}
${feature({
  id: "titres",
  eyebrow: "Expertise 2",
  title: `<span class="accent">Gestion</span> de vos titres de séjour`,
  reverse: true,
  html: `<p>Obtenir votre titre de séjour est une étape clé de votre projet professionnel. Nous sommes à vos côtés de la constitution du dossier jusqu’à la remise du titre, en veillant au respect de la réglementation en vigueur.</p>
  ${checklist(["Conseil personnalisé selon votre situation", "Aide à la collecte des pièces justificatives", "Vérification de la conformité du dossier avant dépôt", "Suivi de la demande auprès des autorités compétentes", "Accompagnement lors de votre rendez-vous en préfecture"])}`,
  image: "impatriation-titre-de-sejour",
  alt: "",
})}
${feature({
  id: "demarches",
  eyebrow: "Expertise 3",
  title: `<span class="accent">Prise en charge</span> de vos démarches administratives`,
  html: `<p>S’installer dans un nouveau pays implique de nombreuses démarches, souvent complexes et chronophages. Nous vous proposons un accompagnement complet et personnalisé.</p>
  ${checklist(["Inscription au régime général de la Sécurité sociale", "Prise de rendez-vous et assistance pour l’ouverture d’un compte bancaire", "Souscription des assurances (habitation, responsabilité civile…)", "Immatriculation de votre véhicule ou échange de votre permis de conduire", "Toute autre démarche spécifique à votre situation"])}`,
  image: "demarches-administratives-signature",
  alt: "",
})}
${reasons([
  ["pictos-01-1", "On s’occupe de tout,", "de A à Z."],
  ["pictos-02-1", "Conformité légale", "de vos dossiers garantie par notre veille réglementaire."],
  ["pictos-03-1", "Maîtrise des démarches", "et des formalités liées à l’impatriation."],
  ["pictos-04-1", "Un réseau de partenaires", "de confiance."],
])}
${impFaq.html}
${otherServices("/impatriation-professionnelle/")}
${cta("Vous accueillez un talent international ?", "Recevez notre documentation et un premier diagnostic de votre situation.", "Demander la documentation", "/nous-contacter/?objet=Demande%20de%20documentation")}`,
};
