/* Project-level override of the theme's gallery.js.
   If the gallery contains [data-letter] portraits (Amazing Women in Tech),
   the per-letter layout is handled by custom.js instead. All other
   galleries use the original justified-layout logic unchanged. */
import justifiedLayout from "./justified-layout.js";
import * as params from "@params";

const gallery = document.getElementById("gallery");

// Bio galleries carry [data-letter] on their first portrait of each letter.
// custom.js owns the layout for those — skip here.
if (gallery && !gallery.querySelector("[data-letter]")) {
  let containerWidth = 0;
  const items = gallery.querySelectorAll(".gallery-item");

  const aspectRatios = Array.from(items).map((item) => {
    const img = item.querySelector("img");
    img.style.width  = "100%";
    img.style.height = "auto";
    return parseFloat(img.getAttribute("width")) / parseFloat(img.getAttribute("height"));
  });

  function updateGallery() {
    if (containerWidth === gallery.getBoundingClientRect().width) return;
    containerWidth = gallery.getBoundingClientRect().width;

    const layout = justifiedLayout(aspectRatios, {
      rowWidth: containerWidth,
      spacing: Number.isInteger(params.boxSpacing) ? params.boxSpacing : 8,
      rowHeight: params.targetRowHeight || 288,
      heightTolerance: Number.isInteger(params.targetRowHeightTolerance)
        ? params.targetRowHeightTolerance : 0.25,
    });

    items.forEach((item, i) => {
      const { width, height, top, left } = layout.boxes[i];
      item.style.position = "absolute";
      item.style.width    = width  + "px";
      item.style.height   = height + "px";
      item.style.top      = top    + "px";
      item.style.left     = left   + "px";
      item.style.overflow = "hidden";
    });

    gallery.style.position   = "relative";
    gallery.style.height     = layout.containerHeight + "px";
    gallery.style.visibility = "";
  }

  window.addEventListener("resize", updateGallery);
  window.addEventListener("orientationchange", updateGallery);

  updateGallery();
  updateGallery();
}
