/**
 * Shared Dynamic Pagination Engine
 * Manages deterministic page distribution, footer updates, and overflow management.
 */

/**
 * Updates all footer page indicators across dynamically rendered pages.
 * Stamping 'Page X of Y' on every page.
 * @param {HTMLElement|string} container - The container element or selector
 */
function updateDocumentPagination(container) {
  const root = typeof container === "string" ? document.querySelector(container) : container;
  if (!root) return;

  const pages = root.querySelectorAll(".document-page");
  const totalPages = pages.length;

  pages.forEach((page, index) => {
    const pageNumEl = page.querySelector(".footer-bottom-row");
    if (pageNumEl) {
      pageNumEl.textContent = `Page ${index + 1} of ${totalPages}`;
    }
  });
}
