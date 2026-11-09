# Symbiose Mobilité – refonte du site symbiose-mobilite.com

Le site WordPress actuel est reconstruit en **site statique** hébergé sur **Vercel** : rapide, sûr, accessible et optimisé pour le référencement. La **charte graphique d’origine est conservée** : logo, bleu marine `#012E40`, vert `#04C045`, grands blocs aux coins arrondis, titres bicolores, boutons « pilule », photos et pictogrammes d’origine.

## Contenu du dossier

| Dossier / fichier | Rôle |
|---|---|
| `public/` | **Le site prêt à mettre en ligne** (à copier tel quel sur l’hébergement) |
| `src/pages/` | Contenu des pages (`services.mjs` : accueil et services ; `other.mjs` : autres pages) |
| `src/data.mjs` | Témoignages, équipe, chiffres clés |
| `src/site.mjs` | Gabarit commun (en-tête, pied de page, SEO, formulaire de contact) |
| `src/static/` | CSS, JS, polices, images, `.htaccess`, `robots.txt`, `envoi.php`… |
| `sources/` | Images d’origine (avant optimisation) |
| `build.mjs` | Génère `public/` (Node 20+) |
| `api/envoi.js`, `vercel.json` | Formulaires et configuration pour Vercel |
| `scripts/optimize-images.py` | Convertit `sources/` en WebP responsives (Python + Pillow) |

## Modifier puis régénérer le site

```bash
node build.mjs
```

Pour ajouter ou remplacer une image : la déposer dans `sources/`, l’ajouter dans le tableau `MAP` de `scripts/optimize-images.py`, puis lancer :

```bash
python3 scripts/optimize-images.py
```

Aperçu local :

```bash
cd public && python3 -m http.server 8000
```

## Mise en ligne sur Vercel (recommandé)

Le projet est prêt pour Vercel : `vercel.json` (build, redirections, en-têtes de sécurité, cache) et `api/envoi.js` (envoi des formulaires par SMTP, en remplacement du script PHP).

1. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt GitHub `mbousquet-onestock/mikeltools`.
2. **Root Directory** : laisser la racine du dépôt (configuration dans `vercel.json` et `api/` à la racine) ou choisir `symbiose-mobilite` : les deux fonctionnent. Si vous modifiez les redirections ou en-têtes, mettez à jour les deux fichiers `vercel.json`.
3. **Environment Variables** (pour les formulaires) :

   | Variable | Valeur |
   |---|---|
   | `SMTP_USER` | adresse e-mail OVH servant à l’envoi, par ex. `contact@symbiose-mobilite.com` |
   | `SMTP_PASS` | mot de passe de cette boîte |
   | `SMTP_HOST` / `SMTP_PORT` | facultatif, par défaut `ssl0.ovh.net` / `465` |
   | `MAIL_TO` | facultatif, destinataire (par défaut `contact@symbiose-mobilite.com`) |

4. Cliquer sur **Deploy**, puis tester le site sur l’adresse `*.vercel.app` (formulaire de contact et enquête).
5. **Domaine** : dans *Settings → Domains*, ajouter `symbiose-mobilite.com` et `www.symbiose-mobilite.com` (redirigé vers le domaine principal). Dans la zone DNS OVH, suivre les valeurs affichées par Vercel (en général un enregistrement `A` vers `76.76.21.21` pour `@`, et un `CNAME` vers `cname.vercel-dns.com` pour `www`). **Ne pas toucher aux enregistrements `MX`** : la messagerie reste chez OVH.
6. Soumettre `https://symbiose-mobilite.com/sitemap.xml` dans Google Search Console.

Chaque `git push` sur la branche de production redéploie automatiquement le site.

Pour déployer en ligne de commande :

```bash
npx vercel@latest --cwd symbiose-mobilite
```

## Variante : mise en ligne sur OVH mutualisé

1. Sauvegarder l’installation WordPress actuelle (fichiers + base de données).
2. Remplacer le contenu du dossier `www/` par le contenu de `public/` (y compris le fichier caché `.htaccess`).
3. Créer l’adresse `site@symbiose-mobilite.com` (ou un alias) : elle sert d’expéditeur aux e-mails des formulaires (`src/static/envoi.php`).
4. Tester l’envoi des deux formulaires (contact et enquête).
5. Dans Google Search Console : soumettre `https://symbiose-mobilite.com/sitemap.xml` et demander l’indexation des pages principales.

Les adresses des pages sont **identiques à l’ancien site** (`/relocation/`, `/recrutement/`…) : le référencement acquis est conservé. Les anciennes adresses WordPress (`/sitemap_index.xml`, `/feed/`, `/temoignages/page/2/`…) sont redirigées en 301 par le `.htaccess`.

## À compléter / valider par Symbiose Mobilité

- **Mentions légales** : forme juridique, capital, SIREN/RCS et n° de TVA (surlignés en jaune sur la page `/mentions-legales/`) : informations **obligatoires** (LCEN).
- **FAQ** des pages Relocation, Recrutement et Impatriation : textes nouveaux rédigés à partir du contenu existant, à relire.
- **Chiffres clés** : l’accueil indique « +2 000 relocations/an » et la page Qui sommes-nous « +150 dossiers/mois » (≈ 1 800/an) : à harmoniser.
- **Newsletter** : les inscriptions arrivent par e-mail (case cochée). L’ancien site utilisait Mailjet : reporter les inscrits à la main ou brancher l’API.
- **Durées de conservation** des données (politique de confidentialité) : fixées à 2 ans, comme sur l’ancien site. À ajuster si besoin.

## Ce qui a été corrigé par rapport à l’ancien site

**Conformité légale (RGPD, LCEN, accessibilité)**
- Plus de Google reCAPTCHA, Google Analytics ni bandeau cookies : aucun traceur, aucune ressource tierce (polices hébergées sur le site). L’anti-spam se fait sans service externe.
- Politique de confidentialité réécrite selon le RGPD : bases légales, durées, destinataires, droits, recours CNIL.
- Mentions légales restructurées (l’ancienne version comptait deux articles « 5 » et manquait d’informations obligatoires).
- Accessibilité (RGAA / WCAG 2.2 AA, exigée par l’European Accessibility Act depuis juin 2025) : vrais libellés de formulaire (au lieu de simples textes d’exemple dans les champs), contrastes conformes, navigation au clavier, lien d’évitement, messages d’erreur explicites, déclaration d’accessibilité.
- Noms complets des clients retirés des témoignages (prénom + initiale).
- **Barre d’outils d’accessibilité** (bouton rond en bas à droite, comme sur l’ancien site, mais sans extension tierce) : taille du texte de 90 à 200 %, niveaux de gris, haut contraste, contraste négatif, arrière-plan clair, liens soulignés, police lisible, et deux outils ajoutés : espacement du texte (WCAG 1.4.12) et arrêt des animations. Utilisable au clavier et avec un lecteur d’écran, réglages mémorisés sur l’appareil (`src/static/js/a11y-init.js` et `main.js`).

**Référencement (SEO)**
- Title et meta description uniques et optimisés pour chaque page (l’accueil s’appelait « Accueil – Symbiose Mobilité »).
- Données structurées schema.org : entreprise (ProfessionalService), services, FAQ, fil d’Ariane, équipe.
- Plan du site `sitemap.xml`, `robots.txt`, `llms.txt` (moteurs de réponse IA), balises Open Graph avec une image de partage au bon format.
- Une seule balise H1 par page et une hiérarchie de titres cohérente.
- Texte de remplissage en latin (« Curabitur venenatis… ») retiré de la FAQ Impatriation et remplacé par de vraies questions-réponses.
- Pagination des témoignages corrigée : les pages 2 et 3 affichaient le même contenu que la page 1 (contenu dupliqué).
- Coquilles corrigées (« Symiose », « recutement », « Symbiose Mobilite »…).

**Performance et sécurité**
- Pages d’environ 30 Ko de HTML, contre environ 125 Ko auparavant (WordPress, jQuery, extensions), avec très peu de JavaScript.
- Images en WebP responsives avec dimensions explicites (11 Mo d’images d’origine ramenés à 2 Mo au total).
- Plus de WordPress à maintenir ni à mettre à jour (moins de surface d’attaque) ; HTTPS forcé, en-têtes de sécurité, cache navigateur et compression.
