#!/usr/bin/env python3
"""Convertit les images sources (sources/) en WebP responsives (src/static/img/).

Usage : python3 scripts/optimize-images.py
Génère aussi src/images.json (dimensions et largeurs disponibles), lu par build.mjs
pour produire des balises <img> avec srcset, width et height (zéro décalage de mise en page).
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "sources"
OUT = ROOT / "src" / "static" / "img"
WIDTHS = (480, 960, 1440)

# fichier source -> nom SEO (sans extension)
MAP = {
    "image-bandeau.png": "mobilite-professionnelle-nouveau-depart",
    "enquete.png": "enquete-satisfaction",
    "image-relocation.jpg": "relocation-couple-nouveau-logement",
    "demarches-administratives-big.jpg": "demarches-administratives-signature",
    "img_logement.png": "recherche-logement-sur-mesure",
    "img_installation.png": "installation-demenagement",
    "img_aide.png": "aide-installation-famille-ecole",
    "equipe-big.jpg": "valeur-esprit-equipe",
    "proximite-big.jpg": "valeur-proximite",
    "exigence-big.jpg": "valeur-exigence",
    "service-big.jpg": "valeur-sens-du-service",
    "symbiose-illus-1.jpeg": "recrutement-projet-entreprise",
    "symbiose-illus-2.jpg": "recrutement-strategie-sur-mesure",
    "symbiose-illus-3.jpeg": "recrutement-entretien-candidat",
    "symbiose-illus-4.jpeg": "recrutement-integration-collaborateur",
    "symbiose-illus-5.jpeg": "impatriation-visa-autorisation-travail",
    "symbiose-illus-6.jpeg": "impatriation-titre-de-sejour",
    "symbiose-illus-7.jpeg": "impatriation-demarches-administratives",
    "mikel_2-1.jpg": "team/mikel-barthelemy",
    "marion-2.png": "team/marion-vincent",
    "elidion.png": "team/elidion-keta",
}


def main() -> None:
    manifest = {}
    for src_name, slug in MAP.items():
        im = Image.open(SRC / src_name)
        im = im.convert("RGBA") if im.mode in ("P", "RGBA", "LA") else im.convert("RGB")
        w, h = im.size
        widths = sorted({min(x, w) for x in WIDTHS})
        dest = OUT / slug
        dest.parent.mkdir(parents=True, exist_ok=True)
        for tw in widths:
            th = round(h * tw / w)
            out = im if tw == w else im.resize((tw, th), Image.LANCZOS)
            out.save(f"{dest}-{tw}.webp", "WEBP", quality=78, method=6)
        manifest[slug] = {"w": w, "h": h, "widths": widths}
        print(f"{src_name:40} -> {slug} {widths}")

    # Image de partage réseaux sociaux (1200x630, JPEG pour compatibilité maximale)
    og = Image.open(SRC / "image-relocation.jpg").convert("RGB")
    ratio = 1200 / 630
    w, h = og.size
    nh = round(w / ratio)
    top = max(0, (h - nh) // 2)
    og.crop((0, top, w, top + nh)).resize((1200, 630), Image.LANCZOS).save(
        OUT / "og-symbiose-mobilite.jpg", "JPEG", quality=82, optimize=True, progressive=True
    )

    (ROOT / "src" / "images.json").write_text(json.dumps(manifest, indent=1))


if __name__ == "__main__":
    main()
