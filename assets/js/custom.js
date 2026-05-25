/* ---------------------------------------------------------------
   Per-letter justified layout for the Amazing Women in Tech gallery.

   gallery.js (theme) is told to skip galleries that have [data-letter]
   items (see assets/js/gallery.js override). This module takes over:
   it runs a separate justifiedLayout call for each letter group so that
   rows never mix portraits from different letters, then inserts the
   letter headings between groups.
--------------------------------------------------------------- */
import justifiedLayout from "./justified-layout.js";
import * as params from "@params";

(function setupLetterGroupedGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const letterItems = gallery.querySelectorAll("[data-letter]");
  if (!letterItems.length) return;

  // Vertical rhythm constants (px)
  const PAD_TOP = 24; // space above the letter heading
  const HEAD_H  = 40; // height of the heading element
  const PAD_BOT = 14; // gap between heading and first portrait row

  // Gallery spacing / row-height from Hugo params (mirrors gallery.js defaults)
  const BOX_SPACING  = Number.isInteger(params.boxSpacing) ? params.boxSpacing : 8;
  const ROW_HEIGHT   = params.targetRowHeight || 288;
  const HEIGHT_TOL   = Number.isInteger(params.targetRowHeightTolerance)
    ? params.targetRowHeightTolerance : 0.25;

  let lastContainerWidth = 0;

  function layoutGallery() {
    const containerWidth = gallery.getBoundingClientRect().width;
    if (!containerWidth || containerWidth === lastContainerWidth) return;
    lastContainerWidth = containerWidth;

    // Remove stale headings from a previous run
    gallery.querySelectorAll(".az-group-heading").forEach((el) => el.remove());

    const allItems = Array.from(gallery.querySelectorAll("a.gallery-item"));

    // Collect aspect ratios (read from HTML attributes, same as gallery.js)
    const aspectRatios = allItems.map((item) => {
      const img = item.querySelector("img");
      img.style.width  = "100%";
      img.style.height = "auto";
      return parseFloat(img.getAttribute("width")) / parseFloat(img.getAttribute("height"));
    });

    // Identify where each letter group starts
    const groupStarts = [];
    allItems.forEach((item, i) => {
      if (item.dataset.letter) groupStarts.push(i);
    });

    // Layout each group independently and stack vertically
    let cursorTop = 0;

    groupStarts.forEach((startIdx, g) => {
      const endIdx = g + 1 < groupStarts.length ? groupStarts[g + 1] : allItems.length;
      const groupItems  = allItems.slice(startIdx, endIdx);
      const groupRatios = aspectRatios.slice(startIdx, endIdx);
      const letter = groupItems[0].dataset.letter;

      // --- Insert letter heading ---
      const heading = document.createElement("div");
      heading.className = "az-group-heading";
      heading.setAttribute("aria-hidden", "true");
      heading.innerHTML = `<span>${letter}</span>`;
      heading.style.cssText =
        `position:absolute; top:${cursorTop + PAD_TOP}px; left:0; right:0; height:${HEAD_H}px;`;
      gallery.appendChild(heading);

      cursorTop += PAD_TOP + HEAD_H + PAD_BOT;

      // --- Run justified layout for this group ---
      const layout = justifiedLayout(groupRatios, {
        rowWidth: containerWidth,
        spacing: BOX_SPACING,
        rowHeight: ROW_HEIGHT,
        heightTolerance: HEIGHT_TOL,
      });

      groupItems.forEach((item, i) => {
        const { width, height, top, left } = layout.boxes[i];
        item.style.position = "absolute";
        item.style.width    = width  + "px";
        item.style.height   = height + "px";
        item.style.top      = (cursorTop + top) + "px";
        item.style.left     = left + "px";
        item.style.overflow = "hidden";
      });

      cursorTop += layout.containerHeight;
    });

    // Expose the gallery
    gallery.style.position   = "relative";
    gallery.style.height     = cursorTop + "px";
    gallery.style.visibility = "";
  }

  layoutGallery();

  window.addEventListener("resize", () => {
    lastContainerWidth = 0; // force recalculation
    layoutGallery();
  });
  window.addEventListener("orientationchange", () => {
    lastContainerWidth = 0;
    layoutGallery();
  });
})();
