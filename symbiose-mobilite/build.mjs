#!/usr/bin/env node
// Génère le site statique dans public/ (aucune dépendance npm).
// Usage : node build.mjs
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { layout, SITE } from "./src/site.mjs";
import * as services from "./src/pages/services.mjs";
import * as other from "./src/pages/other.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "public");
const STATIC = join(ROOT, "src", "static");

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(STATIC, OUT, { recursive: true });

// Version pour l'invalidation du cache CSS/JS
const version = createHash("sha1")
  .update(readFileSync(join(STATIC, "css/style.css")))
  .update(readFileSync(join(STATIC, "js/main.js")))
  .digest("hex")
  .slice(0, 8);

const pages = [
  services.home,
  services.relocation,
  services.recrutement,
  services.impatriation,
  other.about,
  other.temoignages,
  other.contact,
  other.enquete,
  other.mentions,
  other.confidentialite,
  other.accessibilite,
  other.merci,
  other.erreur,
  other.notFound,
];

const problems = [];
for (const page of pages) {
  const html = layout({ ...page, version });
  const file = page.file ? join(OUT, page.file) : join(OUT, page.path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  // Contrôles SEO de base
  if (page.title.length > 70) problems.push(`${page.path} : title de ${page.title.length} caractères`);
  if (page.description.length > 160) problems.push(`${page.path} : description de ${page.description.length} caractères`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${page.path} : nombre de h1 ≠ 1`);
}

// sitemap.xml (pages indexables uniquement)
const today = new Date().toISOString().slice(0, 10);
const prio = (p) => (p === "/" ? "1.0" : ["/relocation/", "/recrutement/", "/impatriation-professionnelle/"].includes(p) ? "0.9" : "0.5");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${prio(p.path)}</priority></url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(join(OUT, "sitemap.xml"), sitemap);

// Rapport
const size = (dir) =>
  readdirSync(dir).reduce((s, f) => {
    const p = join(dir, f);
    return s + (statSync(p).isDirectory() ? size(p) : statSync(p).size);
  }, 0);
console.log(`✔ ${pages.length} pages générées dans public/ (${(size(OUT) / 1024).toFixed(0)} Ko, version ${version})`);
if (problems.length) {
  console.warn("⚠ Points à vérifier :\n  - " + problems.join("\n  - "));
  process.exitCode = 1;
}
