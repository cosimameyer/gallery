/* ---------------------------------------------------------------
   Uniform-grid layout for the Amazing Women in Tech gallery.

   gallery.js (theme) skips galleries with [data-letter] items
   (see assets/js/gallery.js override). This module takes over with
   a uniform-tile grid so every portrait is the same size regardless
   of how many are in each letter group. Letter headings are inserted
   between groups.
--------------------------------------------------------------- */

(function setupLetterGroupedGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const letterItems = gallery.querySelectorAll("[data-letter]");
  if (!letterItems.length) return;

  // Vertical rhythm constants (px)
  const PAD_TOP = 24; // breathing room above each letter heading
  const HEAD_H  = 40; // height of the heading element
  const PAD_BOT = 14; // gap between heading bottom and first portrait row

  // Target portrait cell size — columns are computed from container width
  const TARGET_CELL = 280; // ideal cell width (px); actual width fills the row
  const GAP         = 8;   // gap between cells (px)

  let lastContainerWidth = 0;

  function cols(containerWidth) {
    // At least 1 column; break points roughly match common phone/tablet widths
    return Math.max(1, Math.round(containerWidth / (TARGET_CELL + GAP)));
  }

  function layoutGallery() {
    const containerWidth = gallery.getBoundingClientRect().width;
    if (!containerWidth || containerWidth === lastContainerWidth) return;
    lastContainerWidth = containerWidth;

    gallery.querySelectorAll(".az-group-heading").forEach((el) => el.remove());

    const allItems  = Array.from(gallery.querySelectorAll("a.gallery-item"));
    const numCols   = cols(containerWidth);
    const cellWidth = (containerWidth - GAP * (numCols - 1)) / numCols;
    // Portraits are designed as squares; keep cells square
    const cellHeight = cellWidth;

    // Identify letter-group boundaries
    const groupStarts = [];
    allItems.forEach((item, i) => {
      if (item.dataset.letter) groupStarts.push(i);
    });

    let cursorTop = 0;

    groupStarts.forEach((startIdx, g) => {
      const endIdx     = g + 1 < groupStarts.length ? groupStarts[g + 1] : allItems.length;
      const groupItems = allItems.slice(startIdx, endIdx);
      const letter     = groupItems[0].dataset.letter;

      // --- Letter heading ---
      const heading = document.createElement("div");
      heading.className = "az-group-heading";
      heading.setAttribute("aria-hidden", "true");
      heading.innerHTML = `<span>${letter}</span>`;
      heading.style.cssText =
        `position:absolute; top:${cursorTop + PAD_TOP}px; left:0; right:0; height:${HEAD_H}px;`;
      gallery.appendChild(heading);

      cursorTop += PAD_TOP + HEAD_H + PAD_BOT;

      // --- Uniform grid for this group ---
      groupItems.forEach((item, i) => {
        const col = i % numCols;
        const row = Math.floor(i / numCols);
        const img = item.querySelector("img");
        if (img) { img.style.width = "100%"; img.style.height = "auto"; }

        item.style.position = "absolute";
        item.style.width    = cellWidth  + "px";
        item.style.height   = cellHeight + "px";
        item.style.top      = (cursorTop + row * (cellHeight + GAP)) + "px";
        item.style.left     = (col * (cellWidth + GAP)) + "px";
        item.style.overflow = "hidden";
      });

      const numRows  = Math.ceil(groupItems.length / numCols);
      cursorTop     += numRows * (cellHeight + GAP);
    });

    gallery.style.position   = "relative";
    gallery.style.height     = cursorTop + "px";
    gallery.style.visibility = "";
  }

  layoutGallery();

  window.addEventListener("resize", () => { lastContainerWidth = 0; layoutGallery(); });
  window.addEventListener("orientationchange", () => { lastContainerWidth = 0; layoutGallery(); });
})();
