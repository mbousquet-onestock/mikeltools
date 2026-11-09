// Symbiose Mobilité – amélioration progressive (le site fonctionne sans JavaScript).
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  initAccessibilityTools();
  // Menu mobile
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("menu-principal");
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Pré-sélection de l'objet via ?objet=... (liens « Demander une proposition »)
  const objet = new URLSearchParams(location.search).get("objet");
  if (objet) {
    document.querySelectorAll('select[name="objet"]').forEach((sel) => {
      const opt = [...sel.options].find((o) => o.text === objet);
      if (opt) sel.value = opt.value || opt.text;
    });
  }

  // Formulaires : horodatage anti-spam + validation accessible
  document.querySelectorAll("form.form").forEach((form) => {
    const t = form.querySelector('input[name="t"]');
    if (t) t.value = String(Date.now());

    form.addEventListener("submit", (e) => {
      form.querySelectorAll(".field__error").forEach((el) => el.remove());
      form.querySelectorAll("[aria-invalid]").forEach((el) => {
        el.removeAttribute("aria-invalid");
        const ids = (el.getAttribute("aria-describedby") || "").split(" ").filter((id) => !id.endsWith("-err"));
        ids.length ? el.setAttribute("aria-describedby", ids.join(" ")) : el.removeAttribute("aria-describedby");
      });

      const invalid = [];
      const seenRadios = new Set();
      form.querySelectorAll("input, select, textarea").forEach((el) => {
        if (el.type === "radio") {
          if (seenRadios.has(el.name)) return;
          seenRadios.add(el.name);
        }
        if (el.checkValidity()) return;
        invalid.push(el);
        const fieldset = el.closest("fieldset");
        const label = fieldset
          ? fieldset.querySelector("legend").textContent
          : form.querySelector(`label[for="${el.id}"]`)?.textContent || "";
        const msg = el.validity.typeMismatch
          ? "Format invalide (exemple : nom@domaine.fr)."
          : el.type === "checkbox"
            ? "Merci de cocher cette case."
            : "Ce champ est obligatoire.";
        const err = document.createElement("p");
        err.className = "field__error";
        err.id = `${el.id || el.name}-err`;
        err.textContent = msg;
        (fieldset || el.closest(".field")).append(err);
        if (!fieldset) {
          el.setAttribute("aria-invalid", "true");
          el.setAttribute("aria-describedby", [el.getAttribute("aria-describedby"), err.id].filter(Boolean).join(" "));
        }
        el.dataset.label ||= label.replace("*", "").trim();
      });

      const box = form.querySelector(".form__errors");
      if (invalid.length) {
        e.preventDefault();
        box.textContent = `Le formulaire contient ${invalid.length} erreur${invalid.length > 1 ? "s" : ""} : ${invalid
          .map((el) => el.dataset.label)
          .join(", ")}.`;
        invalid[0].focus();
      } else {
        box.textContent = "";
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = "Envoi en cours…";
      }
    });
  });
});

// Outils d'accessibilité : taille du texte, contrastes, police lisible, espacement, animations.
function initAccessibilityTools() {
  const root = document.documentElement;
  const box = document.getElementById("a11y");
  if (!box) return;
  const toggle = box.querySelector(".a11y__toggle");
  const panel = document.getElementById("a11y-panel");
  const output = document.getElementById("a11y-size-value");
  const SIZES = [90, 100, 112, 125, 150, 175, 200];
  const EXCLUSIVE = ["contrast", "invert", "light"]; // un seul mode de couleurs à la fois

  let state = { size: 100, on: [] };
  try { state = { ...state, ...JSON.parse(localStorage.getItem("a11y") || "{}") }; } catch (e) {}

  const save = () => { try { localStorage.setItem("a11y", JSON.stringify(state)); } catch (e) {} };
  const apply = () => {
    if (state.size === 100) root.removeAttribute("data-a11y-size");
    else root.setAttribute("data-a11y-size", String(state.size));
    root.classList.toggle("a11y-large", state.size >= 150);
    box.querySelectorAll("[data-a11y-toggle]").forEach((btn) => {
      const k = btn.dataset.a11yToggle;
      const on = state.on.includes(k);
      root.classList.toggle("a11y-" + k, on);
      btn.setAttribute("aria-pressed", String(on));
    });
    output.textContent = state.size + " %";
    // aria-disabled plutôt que disabled : le bouton garde le focus clavier
    box.querySelector('[data-a11y="smaller"]').setAttribute("aria-disabled", String(state.size === SIZES[0]));
    box.querySelector('[data-a11y="bigger"]').setAttribute("aria-disabled", String(state.size === SIZES.at(-1)));
    toggle.classList.toggle("is-active", state.size !== 100 || state.on.length > 0);
  };

  const setOpen = (open, focusBack = false) => {
    toggle.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    if (open) panel.querySelector("button").focus();
    else if (focusBack) toggle.focus();
  };

  toggle.addEventListener("click", () => setOpen(panel.hidden));
  box.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) setOpen(false, true);
  });
  document.addEventListener("click", (e) => {
    if (!panel.hidden && !box.contains(e.target)) setOpen(false);
  });

  box.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn || btn === toggle) return;
    const action = btn.dataset.a11y;
    const key = btn.dataset.a11yToggle;
    const i = SIZES.indexOf(state.size);
    if (action === "close") return setOpen(false, true);
    if (action === "bigger" && i < SIZES.length - 1) state.size = SIZES[i + 1];
    if (action === "smaller" && i > 0) state.size = SIZES[i - 1];
    if (action === "reset") state = { size: 100, on: [] };
    if (key) {
      if (state.on.includes(key)) state.on = state.on.filter((k) => k !== key);
      else state.on = [...state.on.filter((k) => !(EXCLUSIVE.includes(key) && EXCLUSIVE.includes(k))), key];
    }
    if (!SIZES.includes(state.size)) state.size = 100;
    apply();
    save();
  });

  apply();
}
