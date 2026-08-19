/**
 * Exercise 2: Worker Progress Report - Document Engine
 * Pure Vanilla JavaScript - Data-Driven Conditional Rendering
 * Self-contained module: Runs completely standalone when opened in VS Code or browser
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

// Active Dataset Reference (Single Source of Truth)
let currentData = typeof dataset_SourcePDF !== 'undefined' ? JSON.parse(JSON.stringify(dataset_SourcePDF)) : {};

/**
 * Renders the complete 3-page Worker Progress Report based on active dataset.
 * @param {Object} data - The worker progress report data model
 */
function renderDocument(data) {
  const viewport = document.getElementById("documentViewport");
  if (!viewport) return;

  const totalPages = 3;

  // Build 3 distinct pages
  const page1Html = buildPage1Html(data);
  const page2Html = buildPage2Html(data);
  const page3Html = buildPage3Html(data);

  const pages = [page1Html, page2Html, page3Html];

  viewport.innerHTML = pages.map((pageContent, index) => `
    <article class="document-page" id="docPage${index + 1}">
      <div class="page-body">
        ${pageContent}
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
}

// ==========================================
// PAGE BUILDERS
// ==========================================

// PAGE 1: Header, Intro, Return to Work & Recovery
function buildPage1Html(data) {
  const rtw = data.returnToWork || {};
  const rec = data.recovery || {};

  const isNotMissed = rtw.status === "notMissed";
  const isNotReturned = rtw.status === "notReturned";
  const isReturned = rtw.status === "returned";

  const isFullReg = rtw.workType === "fullRegular";
  const isFullRed = rtw.workType === "fullReduced";
  const isModReg = rtw.workType === "modifiedRegular";
  const isModRed = rtw.workType === "modifiedReduced";
  const isOtherWork = rtw.workType === "other";

  const isFullyRecovered = rec.recovered === true;
  const isNotFullyRecovered = rec.recovered === false;

  return `
    <!-- Header -->
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
        <h1 class="doc-main-title">Worker Progress Report</h1>
        <div class="claim-wp-box">
          <span class="claim-part">Claim No. ${escapeHtml(data.claimNo || "")}</span>
          <span class="wp-part">${escapeHtml(data.claimCode || "WP")}</span>
        </div>
      </div>
    </header>

    <!-- Intro Request Line -->
    <p class="intro-text">
      <span class="worker-name-span">${escapeHtml(data.workerName || "")}</span> provided the following updates in relation to their claim:
    </p>

    <!-- Section: Return to Work -->
    <section class="form-section">
      <h2 class="section-title">Return to Work</h2>
      
      <div class="question-box">
        <p class="select-prompt">Select one:</p>
        <div class="checkbox-row">
          <label class="checkbox-option">
            <span class="custom-checkbox ${isNotMissed ? 'checked' : ''}"></span>
            <span>I have not missed time from work</span>
          </label>

          <label class="checkbox-option">
            <span class="custom-checkbox ${isNotReturned ? 'checked' : ''}"></span>
            <span>I have not returned to work</span>
          </label>

          <div class="option-with-date">
            <label class="checkbox-option">
              <span class="custom-checkbox ${isReturned ? 'checked' : ''}"></span>
              <span>I returned to work on:</span>
            </label>
            <div class="date-underlined-field">
              <span class="date-val">${escapeHtml(isReturned ? rtw.returnDate : "")}</span>
              <span class="sub-label">Date</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Working Duties -->
      <div class="question-box">
        <p class="select-prompt">I am working:</p>
        <div class="duties-grid">
          <label class="checkbox-option">
            <span class="custom-checkbox ${isFullReg ? 'checked' : ''}"></span>
            <span>Full duties, regular hours</span>
          </label>

          <label class="checkbox-option">
            <span class="custom-checkbox ${isFullRed ? 'checked' : ''}"></span>
            <span>Full duties, reduced hours</span>
          </label>

          <label class="checkbox-option">
            <span class="custom-checkbox ${isModReg ? 'checked' : ''}"></span>
            <span>Modified duties, regular hours</span>
          </label>

          <label class="checkbox-option">
            <span class="custom-checkbox ${isModRed ? 'checked' : ''}"></span>
            <span>Modified duties, reduced hours</span>
          </label>

          <div class="other-duty-row">
            <label class="checkbox-option">
              <span class="custom-checkbox ${isOtherWork ? 'checked' : ''}"></span>
              <span>Other:</span>
            </label>
            <span class="line-input">${escapeHtml(isOtherWork ? rtw.otherWorkType : "")}</span>
          </div>
        </div>
      </div>

      <!-- Return to work is going -->
      <div class="field-block">
        <h3 class="field-block-title">My return to work is going:</h3>
        <div class="text-response-box">${escapeHtml(rtw.progressComment || "")}</div>
      </div>

      <!-- Expected return inline date -->
      <div class="inline-question-row">
        <span>I expect to return to work on:</span>
        <div class="field-underlined">
          <span class="line-val" style="min-width: 140px;">${escapeHtml(rtw.expectedReturnDate || "")}</span>
          <span class="sub-label">Date</span>
        </div>
      </div>

      <!-- Concerns about returning to work -->
      <div class="field-block">
        <h3 class="field-block-title">I have the following concerns about returning to work:</h3>
        <div class="text-response-box large">${escapeHtml(rtw.concerns || "")}</div>
      </div>

      <!-- Employer Contact -->
      <div class="inline-question-row">
        <span>I was most recently in contact with:</span>
        <div class="field-underlined">
          <span class="line-val" style="min-width: 220px;">${escapeHtml(rtw.employerContact || "")}</span>
          <span class="sub-label">(Name of employer contact)</span>
        </div>
        <span>on</span>
        <div class="field-underlined">
          <span class="line-val" style="min-width: 140px;">${escapeHtml(rtw.contactDate || "")}</span>
          <span class="sub-label">Date</span>
        </div>
      </div>
    </section>

    <!-- Section: Recovery -->
    <section class="form-section">
      <h2 class="section-title">Recovery</h2>
      
      <div class="question-box">
        <p class="select-prompt">Select one:</p>
        <div class="checkbox-row" style="gap: 32px;">
          <label class="checkbox-option">
            <span class="custom-checkbox ${isNotFullyRecovered ? 'checked' : ''}"></span>
            <span>I have not fully recovered from my workplace injury.</span>
          </label>

          <label class="checkbox-option">
            <span class="custom-checkbox ${isFullyRecovered ? 'checked' : ''}"></span>
            <span>I have fully recovered from my workplace injury.</span>
          </label>
        </div>
      </div>

      <div class="field-block">
        <h3 class="field-block-title">I have provided the following comments about my recovery:</h3>
        <div class="text-response-box large">${escapeHtml(rec.comments || "")}</div>
      </div>
    </section>
  `;
}

// PAGE 2: Pain Scale, Treatment, Medication, Exercises & Other Info
function buildPage2Html(data) {
  const pain = data.painLevel;
  const medTreat = data.medicalTreatment || {};
  const med = data.medication || {};
  const ex = data.exercises || {};

  const isTreatCont = medTreat.continuing === true;
  const isTreatNo = medTreat.continuing === false;

  const isTakingMed = med.taking === true;
  const isNotTakingMed = med.taking === false;

  const isDoingEx = ex.doing === true;
  const isNotDoingEx = ex.doing === false;

  const medNameDisplay = Array.isArray(med.name) ? med.name.join(", ") : (med.name || "");
  const exListDisplay = Array.isArray(ex.list) ? ex.list.map((item, i) => `${i + 1}. ${item}`).join("\n") : (ex.list || "");

  // Pain Scale Grid (1 to 10)
  let painRow1 = "";
  let painRow2 = "";
  for (let i = 1; i <= 5; i++) {
    painRow1 += `<label class="pain-number-option"><span class="custom-checkbox ${pain === i ? 'checked' : ''}"></span> ${i}</label>`;
  }
  for (let i = 6; i <= 10; i++) {
    painRow2 += `<label class="pain-number-option"><span class="custom-checkbox ${pain === i ? 'checked' : ''}"></span> ${i}</label>`;
  }

  return `
    <!-- Pain Scale -->
    <div class="pain-scale-container">
      <p class="pain-question-label">
        I rate my current pain/discomfort on a scale of 1-10,<br>
        where 1 is no pain and 10 is severe pain out of 10.
      </p>
      <div class="pain-scale-grid">
        <div class="pain-row">${painRow1}</div>
        <div class="pain-row">${painRow2}</div>
      </div>
    </div>

    <!-- Medical Treatment Continuation Box -->
    <div class="question-box">
      <p class="select-prompt">Select one:</p>
      <div class="checkbox-row" style="gap: 24px; align-items: flex-start;">
        <label class="checkbox-option" style="max-width: 200px;">
          <span class="custom-checkbox ${isTreatNo ? 'checked' : ''}"></span>
          <span>I am not continuing to receive medical treatment for my workplace injury.</span>
        </label>

        <div style="flex: 1;">
          <label class="checkbox-option">
            <span class="custom-checkbox ${isTreatCont ? 'checked' : ''}"></span>
            <span>I am continuing to receive medical treatment for my workplace injury from:</span>
          </label>
          <div class="field-underlined" style="width: 100%; margin-top: 4px;">
            <span class="line-val" style="width: 100%; text-align: left;">${escapeHtml(isTreatCont ? medTreat.providerType : "")}</span>
            <span class="sub-label">(Medical Provider Type)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Treatment Details -->
    <div class="treatment-detail-row">
      <span>My last medical treatment was</span>
      <div class="field-underlined">
        <span class="line-val" style="min-width: 140px;">${escapeHtml(medTreat.lastTreatmentDate || "")}</span>
        <span class="sub-label">Date</span>
      </div>
      <span>from</span>
      <div class="field-underlined" style="flex: 1;">
        <span class="line-val" style="width: 100%; text-align: left;">${escapeHtml(medTreat.lastTreatmentProvider || "")}</span>
        <span class="sub-label">(Medical Provider Name)</span>
      </div>
    </div>

    <div class="treatment-detail-row">
      <span>My next medical treatment is</span>
      <div class="field-underlined">
        <span class="line-val" style="min-width: 140px;">${escapeHtml(medTreat.nextTreatmentDate || "")}</span>
        <span class="sub-label">Date</span>
      </div>
      <span>from</span>
      <div class="field-underlined" style="flex: 1;">
        <span class="line-val" style="width: 100%; text-align: left;">${escapeHtml(medTreat.nextTreatmentProvider || "")}</span>
        <span class="sub-label">(Medical Provider Name)</span>
      </div>
    </div>

    <div class="treatment-detail-row" style="margin-top: 10px; margin-bottom: 12px;">
      <span>I am attending a Chiropractor or Physiotherapist</span>
      <div class="field-underlined" style="flex: 1;">
        <span class="line-val" style="width: 100%; text-align: left;">${escapeHtml(medTreat.frequency || "")}</span>
        <span class="sub-label">(Frequency)</span>
      </div>
    </div>

    <!-- Medication Box -->
    <div class="question-box">
      <p class="select-prompt">Select one:</p>
      <div class="checkbox-row" style="gap: 24px; align-items: flex-start;">
        <label class="checkbox-option" style="max-width: 200px;">
          <span class="custom-checkbox ${isNotTakingMed ? 'checked' : ''}"></span>
          <span>I am not taking medication for my workplace injury.</span>
        </label>

        <div style="flex: 1;">
          <label class="checkbox-option">
            <span class="custom-checkbox ${isTakingMed ? 'checked' : ''}"></span>
            <span>I am taking medication for my workplace injury:</span>
          </label>
          <div class="field-underlined" style="width: 100%; margin-top: 4px;">
            <span class="line-val" style="width: 100%; text-align: left;">${escapeHtml(isTakingMed ? medNameDisplay : "")}</span>
            <span class="sub-label">(Name of prescribed medication)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Home Exercises Box -->
    <div class="question-box">
      <p class="select-prompt">Select one:</p>
      <div class="checkbox-row" style="gap: 32px; margin-bottom: 8px;">
        <label class="checkbox-option">
          <span class="custom-checkbox ${isNotDoingEx ? 'checked' : ''}"></span>
          <span>I am not doing home exercises for my workplace injury.</span>
        </label>

        <label class="checkbox-option">
          <span class="custom-checkbox ${isDoingEx ? 'checked' : ''}"></span>
          <span>I am doing home exercises for my workplace injury.</span>
        </label>
      </div>
    </div>

    <div class="field-block">
      <h3 class="field-block-title">List the exercises you are doing:</h3>
      <div class="text-response-box large">${escapeHtml(isDoingEx ? exListDisplay : "")}</div>
    </div>

    <!-- Section: Other Information -->
    <section class="form-section" style="margin-top: 14px;">
      <h2 class="section-title">Other Information</h2>
      <div class="field-block">
        <h3 class="field-block-title">I would like to provide the following additional information about my claim/injury:</h3>
        <div class="text-response-box">${escapeHtml(data.otherInformation || "")}</div>
      </div>
    </section>
  `;
}

// PAGE 3: Certification & Privacy Statement
function buildPage3Html(data) {
  const isCert = data.isCertified === true;
  const isPriv = data.privacyAccepted === true;

  return `
    <div class="cert-block">
      <div class="cert-statement">
        <span class="custom-checkbox ${isCert ? 'checked' : ''}" style="margin-top: 2px;"></span>
        <p>
          I certify that the information given on this form is true, correct and complete to the best of my knowledge. I agree to notify the Workers Compensation Board of Manitoba (WCB) immediately once I return to any form of work and/or employment. I understand that it is an offence to knowingly make a false statement to the WCB. I also understand that it is an offence to withhold information from WCB which affects my entitlement to compensation (e.g., full or partial recovery from injury, ability to return to work, sources of additional income, etc.). I understand that refusing to co-operate with, or follow my treatment, may result in the WCB reducing or suspending my benefits.
        </p>
      </div>

      <div class="privacy-statement">
        <span class="custom-checkbox ${isPriv ? 'checked' : ''}" style="margin-top: 2px;"></span>
        <p>
          I understand that the <a href="https://wcb.mb.ca/privacy-notice" class="privacy-link" target="_blank" rel="noopener">Privacy Notice</a> applies to the personal information collected in this document.
        </p>
      </div>
    </div>
  `;
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
  } else if (datasetKey === "alternative") {
    currentData = JSON.parse(JSON.stringify(dataset_Alternative));
    const btn = document.getElementById("btnDataAlternative");
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

async function downloadPdfFile() {
  const btn = document.getElementById("btnSavePdf");
  const origText = btn ? btn.textContent : "Save as PDF";
  if (btn) {
    btn.textContent = "Generating...";
    btn.disabled = true;
  }

  try {
    const element = document.getElementById("documentViewport");
    if (typeof html2pdf !== "undefined" && element) {
      const claimStr = currentData && currentData.claimNo ? currentData.claimNo.replace(/[^a-zA-Z0-9]/g, "") : "Document";
      const filename = `Worker_Progress_Report_${claimStr}.pdf`;

      const opt = {
        margin: [8, 8, 8, 8],
        filename: filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
        jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], after: ".document-page" }
      };

      await html2pdf().set(opt).from(element).save();
    } else {
      triggerPrint();
    }
  } catch (err) {
    console.warn("Direct PDF export fallback:", err);
    triggerPrint();
  } finally {
    if (btn) {
      btn.textContent = origText;
      btn.disabled = false;
    }
  }
}

function triggerPrint() {
  try {
    window.focus();
    window.print();
  } catch (err) {
    console.warn("Print invocation fallback:", err);
    try {
      if (window.parent && window.parent !== window) {
        window.parent.focus();
        window.parent.print();
      }
    } catch (e) {
      console.error("Print execution failed:", e);
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

  const btnAlt = document.getElementById("btnDataAlternative");
  if (btnAlt) btnAlt.addEventListener("click", () => switchDataset("alternative"));

  const btnMin = document.getElementById("btnDataMinimal");
  if (btnMin) btnMin.addEventListener("click", () => switchDataset("minimal"));

  const btnEdit = document.getElementById("btnEditJson");
  if (btnEdit) btnEdit.addEventListener("click", openJsonEditor);

  const btnClose = document.getElementById("btnCloseModal");
  if (btnClose) btnClose.addEventListener("click", closeJsonEditor);

  const btnApply = document.getElementById("btnApplyJson");
  if (btnApply) btnApply.addEventListener("click", applyCustomJson);

  const printBtn = document.getElementById("btnPrintPdf");
  if (printBtn) printBtn.addEventListener("click", triggerPrint);
});
