/* ---------------------------------------------------------------
   A–Z letter group headings for the Amazing Women in Tech gallery.

   gallery.js (from the theme) absolutely positions every .gallery-item
   and sets #gallery height. We run AFTER it (custom.js is the last
   import in main.js) to:
     1. read the clean layout positions gallery.js produced
     2. shift each portrait down by one "heading slot" for every letter
        boundary that appears at or above it
     3. insert the heading divs at the correct positions
     4. increase the container height to match

   On window resize, gallery.js resets all positions first, then our
   resize handler re-applies the same logic on the fresh values.
--------------------------------------------------------------- */
(function setupLetterHeadings() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  // Only active on womenBio galleries (portraits carry data-letter)
  const letterItems = Array.from(gallery.querySelectorAll("[data-letter]"));
  if (!letterItems.length) return;

  // Total vertical space reserved per letter group heading:
  //   PAD_TOP  — breathing room above the letter
  //   HEAD_H   — height of the heading element itself
  //   PAD_BOT  — gap between heading and first portrait of that letter
  const PAD_TOP = 24;
  const HEAD_H  = 40;
  const PAD_BOT = 14;
  const STEP    = PAD_TOP + HEAD_H + PAD_BOT; // 78 px per letter

  function insertHeadings() {
    // Remove stale headings from a previous run (e.g. after resize)
    gallery.querySelectorAll(".az-group-heading").forEach((el) => el.remove());

    // Snapshot boundary positions BEFORE we modify anything
    const boundaries = letterItems
      .map((el) => ({ letter: el.dataset.letter, top: parseFloat(el.style.top) }))
      .filter((b) => !isNaN(b.top));

    if (!boundaries.length) return;

    // Shift every gallery item down: one STEP per letter boundary
    // whose original top is <= the item's own original top
    Array.from(gallery.querySelectorAll(".gallery-item")).forEach((item) => {
      const t = parseFloat(item.style.top);
      if (isNaN(t)) return;
      const count = boundaries.filter((b) => b.top <= t).length;
      if (count > 0) item.style.top = t + count * STEP + "px";
    });

    // Insert heading divs at their final positions
    boundaries.forEach((b, i) => {
      // The heading slot for this letter starts at b.top + i*STEP
      // (i previous headings have already been inserted above it)
      const headingTop = b.top + i * STEP + PAD_TOP;
      const el = document.createElement("div");
      el.className = "az-group-heading";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = `<span>${b.letter}</span>`;
      el.style.cssText = `position:absolute; top:${headingTop}px; left:0; right:0; height:${HEAD_H}px;`;
      gallery.appendChild(el);
    });

    // Grow the container to fit the extra heading slots
    const base = parseFloat(gallery.style.height) || 0;
    gallery.style.height = base + boundaries.length * STEP + "px";
  }

  // Initial run — gallery.js has already positioned items synchronously
  insertHeadings();

  // Re-run after every resize (gallery.js resets positions first via its
  // own resize handler, which was registered before ours)
  window.addEventListener("resize", insertHeadings);
  window.addEventListener("orientationchange", insertHeadings);
})();
