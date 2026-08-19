/**
 * Shared Utilities for Diona Document Generation
 * Provides security escaping, formatting helpers, and DOM utilities.
 */

/**
 * Escapes unsafe characters for HTML output.
 * Prevents XSS vulnerabilities and ensures raw text strings render safely.
 * @param {string|number|null|undefined} str 
 * @returns {string}
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Reusable table rendering helper.
 * Iterates over an array of records and outputs table rows, or renders an empty-state row if array is empty.
 * @param {Object} options
 * @param {Array} options.items - The data array
 * @param {number} options.colSpan - Total number of columns in the table
 * @param {Function} options.rowRenderer - Function converting a record into a `<tr>...</tr>` string
 * @param {string} [options.emptyMessage] - Optional custom message when items array is empty
 * @returns {string} HTML string
 */
function renderTableRows({ items, colSpan, rowRenderer, emptyMessage = "No entries submitted for this category." }) {
  if (!Array.isArray(items) || items.length === 0) {
    return `<tr><td colspan="${colSpan}" class="empty-table-cell">${escapeHtml(emptyMessage)}</td></tr>`;
  }
  return items.map(rowRenderer).join("");
}

/**
 * Triggers the browser print dialog.
 */
function triggerPrint() {
  window.print();
}
