// Symbiose Mobilité – amélioration progressive (le site fonctionne sans JavaScript).
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
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
