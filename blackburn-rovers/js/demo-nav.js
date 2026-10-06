/* Demo click-through: a click anywhere inside #page goes to the next page.
   - Next page comes from data-next on the script tag (none on the last page).
   - Clicks outside #page (Zoom chat widget, Cobrowse banner/cards) are ignored.
   - Add ?nonav to the URL to switch click-through off for that page load. */
(function () {
  var s = document.currentScript;
  var next = s && s.getAttribute('data-next');
  var off = /[?&]nonav\b/.test(location.search);
  if (!next || off) return;
  document.addEventListener('click', function (e) {
    var root = document.getElementById('page');
    if (!root || !root.contains(e.target)) return;
    if (window.getSelection && String(window.getSelection())) return;
    e.preventDefault();
    window.location.href = next;
  }, true);
})();
