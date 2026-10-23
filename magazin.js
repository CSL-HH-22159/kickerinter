/* magazin.js — gemeinsames Verhalten aller Magazin-Seiten (Unterseiten; das Portal hat dieselben Funktionen eingebaut) */
(function () {
  var root = document.documentElement;

  /* Hell/Dunkel-Schalter: merkt sich die Wahl, sonst gilt die Systemeinstellung */
  var btn = document.getElementById('themeBtn');
  if (btn) btn.addEventListener('click', function () {
    var dunkel = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dunkel ? 'light' : 'dark';
    try { localStorage.setItem('monolog-theme', root.dataset.theme); } catch (e) {}
  });

  /* Kompakt-Kopf: kleines Signet in der Rubrik-Leiste, sobald das Kopfband aus dem Bild ist */
  var kopf = document.getElementById('kopfband');
  if (kopf && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      document.body.classList.toggle('kompakt', !e[0].isIntersecting);
    }).observe(kopf);
  }
})();
