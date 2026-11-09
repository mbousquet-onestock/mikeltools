// Applique les réglages d'accessibilité mémorisés avant l'affichage (évite un flash).
(function () {
  var html = document.documentElement;
  html.classList.add("js");
  try {
    var s = JSON.parse(localStorage.getItem("a11y") || "{}");
    if (s.size && s.size !== 100) {
      html.setAttribute("data-a11y-size", String(s.size));
      if (s.size >= 150) html.classList.add("a11y-large");
    }
    (s.on || []).forEach(function (k) { html.classList.add("a11y-" + k); });
  } catch (e) { /* stockage indisponible : réglages par défaut */ }
})();
