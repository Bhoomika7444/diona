# AI Prompts & Engineering History Log

This document records the AI prompts, iterations, and design rationale used during the development of the **WCB Manitoba Document Generation Engine** for Diona Technologies.

---

## 1. Project Overview & Scope
- **Client / Domain**: Workers Compensation Board (WCB) of Manitoba
- **Target Tech Stack**: Pure HTML5, CSS3, Vanilla JavaScript (Zero build step, Zero runtime dependencies, Zero React).
- **Core Requirements**:
  1. **Exercise 1**: Medical & Travel Expense Request (Multi-category dynamic table reimbursement claim).
  2. **Exercise 2**: Worker Progress Report (3-page conditional form evaluating recovery, RTW, pain scale, medical therapies).
  3. **Data-Driven Architecture**: 100% dynamic rendering from JavaScript objects via `Array.prototype.map()`. Zero hard-coded table rows.
  4. **Multi-Page Pagination**: Dynamic page distribution without row overlap, dynamic `Page X of Y` footers.
  5. **Independent Execution**: Both exercises must run completely independently when opened in VS Code or any web browser.

---

## 2. Chronological Prompt History & Rationale

### Phase 1: Visual Reverse-Engineering & Vector Asset Construction
> **Prompt**:
> *"Analyze the official WCB Manitoba Medical & Travel Expense Request and Worker Progress Report PDFs. Recreate all typographic hierarchies, exact table column ratios, 1px/1.5px border weights, custom checkboxes, and vector SVG logos with exact brand colors (#005a9c)."*

**Rationale & Engineering Outcome**:
- Replaced raster images with crisp inline/vector SVG logos in `assets/logo.svg`.
- Established standard Letter dimensions (`8.5in` $\times$ `11in`) with high-contrast, professional styling matching official government forms.

---

### Phase 2: Dynamic Data Pipeline & Edge Case Hardening
> **Prompt**:
> *"Construct a unidirectional data pipeline where JavaScript data models drive all DOM generation. Implement multiple datasets: Source PDF Dataset, 1-Item Dataset, More Items Dataset (10+ records in prescription drugs), Minimal Dataset, and a Live JSON Editor."*

**Rationale & Engineering Outcome**:
- Created `renderTableRows()` and `escapeHtml()` sanitizers to ensure dynamic security against XSS.
- Configured dynamic table row expansion: adding 10+ items automatically flows table rows sequentially without clipping.

---

### Phase 3: Adaptive Multi-Page Pagination
> **Prompt**:
> *"Design an adaptive pagination algorithm for Exercise 1 that calculates total row volume and chunks content across additional pages (Page 1 of 3, 2 of 3, 3 of 3) while keeping headers, footers, and page numbers strictly synchronized."*

**Rationale & Engineering Outcome**:
- When row volume expands (e.g. `More Items Dataset` with 10 prescription drugs + supplies + parking + transit), the pagination engine dynamically splits tables cleanly across 3 or 4 pages and numbers footers accurately.

---

### Phase 4: Full Separation & Standalone Execution
> **Prompt**:
> *"Ensure Exercise 1 and Exercise 2 are 100% self-contained standalone directories. When opening `exercise-1/index.html`, only Exercise 1 loads without any exercise switcher or external references. When opening `exercise-2/index.html`, only Exercise 2 loads."*

**Rationale & Engineering Outcome**:
- Made all CSS, JS, and data files fully local to `exercise-1/` and `exercise-2/`.
- Root `index.html` functions strictly as a clean project navigation portal.
