/**
 * Exercise 1: Medical & Travel Expense Request - Document Engine
 * Pure Vanilla JavaScript - Dynamic, Row-Aware Pagination & Rendering
 * Standalone, Self-Contained Module
 */

/**
 * Safely escapes HTML special characters to prevent XSS injection.
 * @param {string} str - Raw input string
 * @returns {string} Sanitized string
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
 * Reusable dynamic table row renderer.
 */
function renderTableRows({ items, colSpan, rowRenderer, emptyMessage = "No entries submitted for this category." }) {
  if (!Array.isArray(items) || items.length === 0) {
    return `<tr><td colspan="${colSpan}" class="empty-table-cell" style="text-align: center; color: #64748b; font-style: italic; padding: 10px;">${escapeHtml(emptyMessage)}</td></tr>`;
  }
  return items.map(rowRenderer).join("");
}

// Active Dataset Reference (Single Source of Truth)
let currentData = typeof dataset_SourcePDF !== 'undefined' ? JSON.parse(JSON.stringify(dataset_SourcePDF)) : {};

// ==========================================
// SECTION CONFIGURATIONS
// ==========================================
const sectionConfigs = [
  {
    key: "prescriptionDrugs",
    title: "Prescription Drugs",
    notice: null,
    subtext: null,
    colSpan: 5,
    tableHeaders: [
      { text: "Drug Name", width: "22%" },
      { text: "Prescription Date", width: "18%" },
      { text: "Date Purchased", width: "18%" },
      { text: "Healthcare Provider Name", width: "26%" },
      { text: "Paid Amount", width: "16%" }
    ],
    getItems: (data) => data.prescriptionDrugs || [],
    rowRenderer: (item) => `
      <tr>
        <td>${escapeHtml(item.drugName)}</td>
        <td>${escapeHtml(item.prescriptionDate)}</td>
        <td>${escapeHtml(item.datePurchased)}</td>
        <td>${escapeHtml(item.healthcareProvider)}</td>
        <td>${escapeHtml(item.paidAmount)}</td>
      </tr>
    `,
    headerHeight: 58,
    rowHeight: 24
  },
  {
    key: "otcDrugs",
    title: "Over-the-Counter Drugs",
    notice: null,
    subtext: null,
    colSpan: 5,
    tableHeaders: [
      { text: "Drug Name", width: "20%" },
      { text: "Date Purchased", width: "18%" },
      { text: "Paid Amount", width: "12%" },
      { text: "Seller's Name", width: "24%" },
      { text: "Reason for Purchasing", width: "26%" }
    ],
    getItems: (data) => data.otcDrugs || [],
    rowRenderer: (item) => `
      <tr>
        <td>${escapeHtml(item.drugName)}</td>
        <td>${escapeHtml(item.datePurchased)}</td>
        <td>${escapeHtml(item.paidAmount)}</td>
        <td>${escapeHtml(item.sellerName)}</td>
        <td>${escapeHtml(item.reasonForPurchasing)}</td>
      </tr>
    `,
    headerHeight: 58,
    rowHeight: 24
  },
  {
    key: "medicalSupplies",
    title: "Bandages, Braces or Other Medical Supplies",
    notice: null,
    subtext: null,
    colSpan: 6,
    tableHeaders: [
      { text: "Item Purchased", width: "20%" },
      { text: "Date Purchased", width: "13%" },
      { text: "Was this Prescribed?", width: "12%" },
      { text: "Healthcare Provider Name", width: "23%" },
      { text: "Paid Amount", width: "12%" },
      { text: "Seller's Name", width: "20%" }
    ],
    getItems: (data) => data.medicalSupplies || [],
    rowRenderer: (item) => `
      <tr>
        <td>${escapeHtml(item.itemPurchased)}</td>
        <td>${escapeHtml(item.datePurchased)}</td>
        <td>${escapeHtml(item.wasPrescribed)}</td>
        <td>${escapeHtml(item.healthcareProvider)}</td>
        <td>${escapeHtml(item.paidAmount)}</td>
        <td>${escapeHtml(item.sellerName)}</td>
      </tr>
    `,
    headerHeight: 58,
    rowHeight: 25
  },
  {
    key: "parking",
    title: "Parking for Medical Appointments",
    notice: null,
    subtext: null,
    colSpan: 5,
    tableHeaders: [
      { text: "Address of Healthcare Provider/Medical Facility", width: "42%" },
      { text: "Date", width: "18%" },
      { text: "Paid Amount", width: "14%" },
      { text: "Meter Used?", width: "12%" },
      { text: "Meter Number", width: "14%" }
    ],
    getItems: (data) => data.parking || [],
    rowRenderer: (item) => `
      <tr>
        <td>${escapeHtml(item.facilityAddress)}</td>
        <td>${escapeHtml(item.date)}</td>
        <td>${escapeHtml(item.paidAmount)}</td>
        <td>${escapeHtml(item.meterUsed)}</td>
        <td>${escapeHtml(item.meterNumber)}</td>
      </tr>
    `,
    headerHeight: 58,
    rowHeight: 30
  },
  {
    key: "mileage",
    title: "Mileage to Medical Appointments",
    notice: null,
    subtext: "The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.",
    colSpan: 4,
    tableHeaders: [
      { text: "Appointment Date", width: "18%" },
      { text: "Address of Healthcare Provider/Medical Facility", width: "35%" },
      { text: "Address of Workplace", width: "32%" },
      { text: "Number of km (Round Trip)", width: "15%" }
    ],
    getItems: (data) => data.mileage || [],
    rowRenderer: (item) => `
      <tr>
        <td>${escapeHtml(item.appointmentDate)}</td>
        <td>${escapeHtml(item.facilityAddress)}</td>
        <td>${escapeHtml(item.workplaceAddress)}</td>
        <td>${escapeHtml(item.roundTripKm)}</td>
      </tr>
    `,
    headerHeight: 78,
    rowHeight: 32
  },
  {
    key: "busTaxi",
    title: "Bus or Taxi Fare for Medical Appointments*",
    notice: "*Note: Pre-approval is required from your WCB representative to claim taxi fare(s).",
    subtext: null,
    colSpan: 5,
    tableHeaders: [
      { text: "Appointment Date", width: "15%" },
      { text: "Address of Starting Point", width: "30%" },
      { text: "Address of Healthcare Provider/Medical Facility", width: "33%" },
      { text: "Bus or Taxi (indicate one)", width: "12%" },
      { text: "Total Fare Paid", width: "10%" }
    ],
    getItems: (data) => data.busTaxi || [],
    rowRenderer: (item) => `
      <tr>
        <td>${escapeHtml(item.appointmentDate)}</td>
        <td>${escapeHtml(item.startingPoint || "")}</td>
        <td>${escapeHtml(item.facilityAddress)}</td>
        <td>${escapeHtml(item.transitType)}</td>
        <td>${escapeHtml(item.totalFarePaid)}</td>
      </tr>
    `,
    headerHeight: 78,
    rowHeight: 32
  }
];

// ==========================================
// HTML BUILDER HELPERS
// ==========================================

function buildHeaderHtml(data) {
  return `
    <header class="doc-header">
      <div class="header-left">
        <img src="assets/logo.svg" alt="Workers Compensation Board of Manitoba" class="wcb-logo">
        <address class="wcb-address">
          333 Broadway<br>
          Winnipeg, MB R3C 4W3<br>
          Phone: (204) 954-4321<br>
          Toll Free: 1-855-954-4321<br>
          <a href="https://wcb.mb.ca" target="_blank" rel="noopener">wcb.mb.ca</a>
        </address>
      </div>
      <div class="header-right">
        <h1 class="doc-main-title">Medical &amp; Travel Expense<br>Request</h1>
        <div class="claim-box">Claim No. ${escapeHtml(data.claimNo || "")}</div>
      </div>
    </header>
  `;
}

function buildIntroHtml(data) {
  return `
    <p class="intro-text">
      <span class="worker-name-span">${escapeHtml(data.workerName || "")}</span> requested reimbursement for the following medical and/or travel expenses:
    </p>
  `;
}

function buildTableSectionHtml({ config, items, isContinuation = false }) {
  const titleText = isContinuation ? `${config.title} (Continued)` : config.title;
  const noticeHtml = (!isContinuation && config.notice) ? `<p class="section-notice">${escapeHtml(config.notice)}</p>` : "";
  const subtextHtml = (!isContinuation && config.subtext) ? `<p class="section-subtext">${escapeHtml(config.subtext)}</p>` : "";

  const theadColsHtml = config.tableHeaders.map(h => `<th style="width: ${h.width};">${h.text}</th>`).join("");

  const rowsHtml = renderTableRows({
    items,
    colSpan: config.colSpan,
    rowRenderer: config.rowRenderer
  });

  return `
    <section class="form-section">
      <h2 class="section-title">${titleText}</h2>
      ${noticeHtml}
      ${subtextHtml}
      <table class="wcb-table">
        <thead>
          <tr>
            ${theadColsHtml}
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </section>
  `;
}

function buildPrivacySection(isAccepted) {
  const checkClass = isAccepted ? "custom-checkbox checked" : "custom-checkbox";
  return `
    <div class="privacy-agreement">
      <span class="${checkClass}"></span>
      <label>
        I understand that the <a href="https://wcb.mb.ca/privacy-notice" class="privacy-link" target="_blank" rel="noopener">Privacy Notice</a> applies to the personal information collected in this document.
      </label>
    </div>
  `;
}

// ==========================================
// DYNAMIC, ROW-AWARE PAGINATION ENGINE
// ==========================================

/**
 * Paginates sections and table rows dynamically based on available content height.
 * Handles single-item, multi-item (10+ records), and stress datasets without hardcoded page counts.
 * @param {Object} data - Expense request model
 */
function renderDocument(data) {
  const viewport = document.getElementById("documentViewport");
  if (!viewport) return;

  const PAGE_1_CAPACITY = 720;
  const SUBSEQUENT_PAGE_CAPACITY = 900;

  let pagesContent = [];
  let currentPageIndex = 0;
  let currentUsedHeight = 0;

  // Initialize Page 1 with Top Header and Worker Intro line
  const headerAndIntroHtml = buildHeaderHtml(data) + buildIntroHtml(data);
  pagesContent.push(headerAndIntroHtml);
  currentUsedHeight = 135; // Accurate measured combined height of header and intro

  function getPageCapacity() {
    return currentPageIndex === 0 ? PAGE_1_CAPACITY : SUBSEQUENT_PAGE_CAPACITY;
  }

  function startNewPage() {
    pagesContent.push("");
    currentPageIndex++;
    currentUsedHeight = 0;
  }

  // Iterate over each form table section
  for (const config of sectionConfigs) {
    const items = config.getItems(data);

    if (items.length === 0) {
      // Empty table row placeholder
      const emptySecHeight = config.headerHeight + 26;
      if (currentUsedHeight + emptySecHeight > getPageCapacity() && currentUsedHeight > (currentPageIndex === 0 ? 135 : 0)) {
        startNewPage();
      }
      const emptyHtml = buildTableSectionHtml({ config, items: [], isContinuation: false });
      pagesContent[currentPageIndex] += emptyHtml;
      currentUsedHeight += emptySecHeight;
      continue;
    }

    let startIndex = 0;
    let isContinuation = false;

    while (startIndex < items.length) {
      const remainingPageSpace = getPageCapacity() - currentUsedHeight;
      const secHeaderHeight = config.headerHeight;

      // Calculate how many rows fit in the current page
      const availableForRowSpace = remainingPageSpace - secHeaderHeight;
      const maxRowsThatFit = Math.floor(availableForRowSpace / config.rowHeight);

      if (maxRowsThatFit <= 0) {
        // If current page already has prior content, start a fresh page
        if (currentUsedHeight > (currentPageIndex === 0 ? 135 : 0)) {
          startNewPage();
          continue;
        }

        // On an empty page, fit as many as possible (at least 1 row to prevent stalls)
        const forcedRows = Math.max(1, Math.floor((getPageCapacity() - secHeaderHeight) / config.rowHeight));
        const endIndex = Math.min(items.length, startIndex + forcedRows);
        const chunkItems = items.slice(startIndex, endIndex);

        const chunkHtml = buildTableSectionHtml({ config, items: chunkItems, isContinuation });
        pagesContent[currentPageIndex] += chunkHtml;
        currentUsedHeight += secHeaderHeight + (chunkItems.length * config.rowHeight);

        startIndex = endIndex;
        isContinuation = true;

        if (startIndex < items.length) {
          startNewPage();
        }
      } else {
        const remainingItemsCount = items.length - startIndex;
        if (remainingItemsCount <= maxRowsThatFit) {
          // All remaining items fit on the current page
          const chunkItems = items.slice(startIndex);
          const chunkHtml = buildTableSectionHtml({ config, items: chunkItems, isContinuation });
          pagesContent[currentPageIndex] += chunkHtml;
          currentUsedHeight += secHeaderHeight + (chunkItems.length * config.rowHeight);
          startIndex = items.length;
        } else {
          // Split at exact row boundary and continue on next page
          const chunkItems = items.slice(startIndex, startIndex + maxRowsThatFit);
          const chunkHtml = buildTableSectionHtml({ config, items: chunkItems, isContinuation });
          pagesContent[currentPageIndex] += chunkHtml;
          startIndex += maxRowsThatFit;
          isContinuation = true;
          startNewPage();
        }
      }
    }
  }

  // Privacy Agreement Box
  const privacyHeight = 35;
  if (currentUsedHeight + privacyHeight > getPageCapacity() && currentUsedHeight > (currentPageIndex === 0 ? 135 : 0)) {
    startNewPage();
  }
  pagesContent[currentPageIndex] += buildPrivacySection(data.privacyAccepted);
  currentUsedHeight += privacyHeight;

  const totalPages = pagesContent.length;

  // Render Document Pages with Dynamic Footers
  viewport.innerHTML = pagesContent.map((pageHtml, index) => `
    <article class="document-page" id="docPage${index + 1}">
      <div class="page-body">
        ${pageHtml}
      </div>
      <footer class="doc-footer">
        <div class="footer-top-row">
          <span>Worker App ID: <span class="worker-app-id-val">${escapeHtml(data.workerAppId || "")}</span></span>
          <span>Submitted: <span class="submission-date-val">${escapeHtml(data.submittedAt || "")}</span></span>
        </div>
        <div class="footer-bottom-row">
          Page ${index + 1} of ${totalPages}
        </div>
      </footer>
    </article>
  `).join("");

  // Use Shared Pagination Utility for Stamping
  if (typeof updateDocumentPagination === "function") {
    updateDocumentPagination(viewport);
  }
}

// ==========================================
// CONTROLS & EVENT HANDLERS
// ==========================================

function switchDataset(datasetKey) {
  document.querySelectorAll(".btn-dataset").forEach(btn => btn.classList.remove("active"));

  if (datasetKey === "source") {
    currentData = JSON.parse(JSON.stringify(dataset_SourcePDF));
    const btn = document.getElementById("btnDataSource");
    if (btn) btn.classList.add("active");
  } else if (datasetKey === "more") {
    currentData = JSON.parse(JSON.stringify(dataset_MoreItems));
    const btn = document.getElementById("btnDataMoreItems");
    if (btn) btn.classList.add("active");
  } else if (datasetKey === "minimal") {
    currentData = JSON.parse(JSON.stringify(dataset_Minimal));
    const btn = document.getElementById("btnDataMinimal");
    if (btn) btn.classList.add("active");
  }

  renderDocument(currentData);
}

function openJsonEditor() {
  const textarea = document.getElementById("jsonEditorArea");
  if (!textarea) return;
  textarea.value = JSON.stringify(currentData, null, 2);
  const modal = document.getElementById("jsonEditorModal");
  if (modal) modal.classList.add("open");
}

function closeJsonEditor() {
  const modal = document.getElementById("jsonEditorModal");
  if (modal) modal.classList.remove("open");
}

function applyCustomJson() {
  const textarea = document.getElementById("jsonEditorArea");
  if (!textarea) return;
  try {
    const parsed = JSON.parse(textarea.value);
    currentData = parsed;
    renderDocument(currentData);
    document.querySelectorAll(".btn-dataset").forEach(btn => btn.classList.remove("active"));
    closeJsonEditor();
  } catch (err) {
    alert("Invalid JSON format: " + err.message);
  }
}

function triggerPrint() {
  try {
    window.focus();
    window.print();
  } catch (err) {
    console.warn("Print execution fallback:", err);
    try {
      if (window.parent && window.parent !== window) {
        window.parent.focus();
        window.parent.print();
      }
    } catch (e) {
      console.error("Print invocation failed:", e);
    }
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderDocument(currentData);

  const btnSrc = document.getElementById("btnDataSource");
  if (btnSrc) btnSrc.addEventListener("click", () => switchDataset("source"));

  const btnMore = document.getElementById("btnDataMoreItems");
  if (btnMore) btnMore.addEventListener("click", () => switchDataset("more"));

  const btnMin = document.getElementById("btnDataMinimal");
  if (btnMin) btnMin.addEventListener("click", () => switchDataset("minimal"));

  const btnEdit = document.getElementById("btnEditJson");
  if (btnEdit) btnEdit.addEventListener("click", openJsonEditor);

  const btnClose = document.getElementById("btnCloseModal");
  if (btnClose) btnClose.addEventListener("click", closeJsonEditor);

  const btnApply = document.getElementById("btnApplyJson");
  if (btnApply) btnApply.addEventListener("click", applyCustomJson);

  const btnPrint = document.getElementById("btnPrintPdf");
  if (btnPrint) btnPrint.addEventListener("click", triggerPrint);
});
