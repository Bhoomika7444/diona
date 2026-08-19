# WCB Manitoba Document Generation Engine
### Technical Assignment Submission — Diona Technologies

A pure, data-driven document generation engine reproducing official **Workers Compensation Board (WCB) of Manitoba** forms using strictly **HTML5, CSS3, and Vanilla JavaScript**.

> **Core Philosophy**:  
> $$\text{JavaScript Data Model} \longrightarrow \text{Dynamic Rendering Engine} \longrightarrow \text{Semantic HTML Document} \longrightarrow \text{Dynamic Pagination} \longrightarrow \text{Print / PDF}$$  
> *The HTML contains zero hard-coded table rows or static values. Every row, checkbox, rating scale, header, and footer is synthesized dynamically from JavaScript data.*

---

## Table of Contents
1. [Assignment Overview](#assignment-overview)
2. [Tech Stack](#tech-stack)
3. [Project Directory Structure](#project-directory-structure)
4. [How to Run the Project](#how-to-run-the-project)
5. [How Dynamic Data Works](#how-dynamic-data-works)
6. [Exercise 1: Medical & Travel Expense Request](#exercise-1-medical--travel-expense-request)
7. [Exercise 2: Worker Progress Report](#exercise-2-worker-progress-report)
8. [Dynamic Pagination & Layout Strategy](#dynamic-pagination--layout-strategy)
9. [Key Assumptions](#key-assumptions)
10. [Challenges Faced & Solutions](#challenges-faced--solutions)
11. [How to Demonstrate Datasets (A / B / C)](#how-to-demonstrate-datasets-a--b--c)
12. [Print & PDF Export Workflow](#print--pdf-export-workflow)
13. [Video Walkthrough Demonstration](#video-walkthrough-demonstration)
14. [AI Prompt History & Transparency](#ai-prompt-history--transparency)

---

## 1. Assignment Overview

The assignment requires developing a web-based document generation solution that faithfully reproduces two official WCB Manitoba PDF forms:
1. **Exercise 1: Medical & Travel Expense Request** (Table-heavy multi-category expense report)
2. **Exercise 2: Worker Progress Report** (Conditional form containing pain scales, return-to-work statuses, medical treatments, and legal declarations)

### Key Objectives:
- **100% Data-Driven**: The JavaScript array/object is the single source of truth.
- **Dynamic Scalability**: Tables scale automatically from 1 item to 10+ items without overlapping or clipping.
- **Visual & Print Fidelity**: Pixel-accurate layout matching the official PDFs with responsive `@media print` rules.
- **Zero Build Complexity**: No React, no backend, no databases, and no external npm runtime dependencies.

---

## 2. Tech Stack

- **Markup**: Semantic HTML5 (`<article>`, `<header>`, `<section>`, `<table>`, `<footer>`)
- **Styling**: Pure CSS3 (`@media print`, Flexbox, CSS Grid, custom print page break controls)
- **Logic**: Vanilla JavaScript (ES6+, `Array.prototype.map()`, DOM manipulation)
- **Vector Assets**: SVG-based high-fidelity WCB Manitoba emblem

---

## 3. Project Directory Structure

```text
diona-document-generation/
│
├── index.html                           # Central repository landing page
│
├── exercise-1-medical-travel/
│   ├── index.html                       # Exercise 1 HTML entry point
│   ├── style.css                        # Exercise 1 layout & table styling
│   ├── script.js                        # Data-driven dynamic table renderer
│   └── data.js                          # Dataset A, B, and C definitions
│
├── exercise-2-worker-progress/
│   ├── index.html                       # Exercise 2 HTML entry point
│   ├── style.css                        # Exercise 2 form & checkbox styling
│   ├── script.js                        # Conditional form rendering engine
│   └── data.js                          # Dataset A, B, and C definitions
│
├── shared/
│   ├── common.css                       # Shared document dimensions, reset & print CSS
│   ├── pagination.js                    # Dynamic page numbering & footer manager
│   └── utilities.js                     # Safe HTML escaping & reusable table renderer
│
├── assets/
│   └── logo.svg                         # Vector WCB Manitoba emblem
│
├── prompt-history/
│   └── ai-prompts.md                    # Complete chronological AI prompt history
│
├── videos/
│   ├── README.md                        # Video demo notes, PiP recording guide & scripts
│   ├── exercise-1-video.mp4             # Exercise 1 walkthrough video
│   └── exercise-2-video.mp4             # Exercise 2 walkthrough video
│
└── README.md                            # Comprehensive technical documentation
```

---

## 4. How to Run the Project

This project requires **zero build steps** and **no npm installation**. You can run it in either of two simple ways:

### Method A: Direct Browser Execution
1. Open the project root folder.
2. Double-click `index.html` (or right-click $\rightarrow$ *Open with Google Chrome / Mozilla Firefox / Microsoft Edge*).
3. Navigate to **Exercise 1** or **Exercise 2**.

### Method B: Simple Local Static Server
If using a local web server (e.g., Python or Node static server):
```bash
# Python 3
python3 -m http.server 3000

# or Node.js npx serve
npx serve .
```
Open `http://localhost:3000` in your browser.

---

## 5. How Dynamic Data Works

### The Data-to-DOM Pipeline
Every document component is constructed dynamically through JavaScript:
```
JavaScript Data Object
   │
   ├── Array.prototype.map() ───► Generates sequential <tr>...</tr> elements
   ├── Conditionals (===)    ───► Toggles .checked classes on custom checkbox elements
   ├── escapeHtml()          ───► Sanitizes raw text to prevent XSS injection
   └── Pagination Engine     ───► Calculates total page count & updates footers
```

### Table Rendering Principle
```javascript
// Example: Reusable Table Generator from shared/utilities.js
function renderTableRows({ items, colSpan, rowRenderer, emptyMessage }) {
  if (!Array.isArray(items) || items.length === 0) {
    return `<tr><td colspan="${colSpan}" class="empty-table-cell">${escapeHtml(emptyMessage)}</td></tr>`;
  }
  return items.map(rowRenderer).join("");
}
```

---

## 6. Exercise 1: Medical & Travel Expense Request

Recreates the 2-page WCB Manitoba expense reimbursement claim.

### Data Model (`data.js`):
```javascript
const expenseReport = {
  claimNo: "20042047",
  workerName: "Madeleine Willson",
  workerAppId: "712041",
  submittedAt: "March 28, 2024 20:43",
  privacyAccepted: true,
  prescriptionDrugs: [...],
  otcDrugs: [...],
  medicalSupplies: [...],
  parking: [...],
  mileage: [...],
  busTaxi: [...]
};
```

### Dynamic Features:
- **6 Repeating Tables**:
  1. *Prescription Drugs* (5 columns)
  2. *Over-the-Counter Drugs* (5 columns)
  3. *Bandages, Braces or Other Medical Supplies* (6 columns)
  4. *Parking for Medical Appointments* (5 columns)
  5. *Mileage to Medical Appointments* (4 columns + WCB travel policy text)
  6. *Bus or Taxi Fare for Medical Appointments\** (5 columns + pre-approval notice)
- **Automatic Empty States**: If any category has 0 entries, a styled *"No entries submitted for this category."* row is rendered.
- **Privacy Agreement**: Checkbox state tied to `data.privacyAccepted`.

---

## 7. Exercise 2: Worker Progress Report

Recreates the 3-page WCB Manitoba progress evaluation form.

### Data Model (`data.js`):
```javascript
const workerProgressReport = {
  claimNo: "20042047",
  claimCode: "WP",
  workerName: "Madeleine Willson",
  workerAppId: "712041",
  submittedAt: "March 19, 2024 19:21",
  returnToWork: {
    status: "returned", // "notMissed" | "notReturned" | "returned"
    returnDate: "March 15, 2024",
    workType: "modifiedReduced",
    otherWorkType: "",
    progressComment: "Terrible. Testing Testing",
    expectedReturnDate: "",
    concerns: "",
    employerContact: "",
    contactDate: ""
  },
  recovery: { recovered: true, comments: "" },
  painLevel: null, // 1 to 10
  medicalTreatment: { continuing: false, providerType: "", ... },
  medication: { taking: false, name: "" },
  exercises: { doing: false, list: "" },
  otherInformation: "No info Testing Testing",
  isCertified: true,
  privacyAccepted: true
};
```

### Dynamic Features:
- **Page 1**: Return to work status selection, working duties grid, return date underline, and recovery status options.
- **Page 2**:
  - **1–10 Pain Scale**: Dynamically highlights the exact rating.
  - **Medical Treatment**: Toggles continuing vs. not continuing treatment; populates provider name, last treatment date, next appointment, and chiro/physio frequencies.
  - **Medications & Home Exercises**: Supports both single strings and multi-item arrays.
- **Page 3**: Legal certification statement and privacy notice checkboxes.

---

## 8. Dynamic Pagination & Layout Strategy

Rather than hard-coding static page counts:
1. **Content Measurement**: The engine calculates total row volume across all repeating categories.
2. **Deterministic Partitioning**:
   - **Small / Standard Datasets** ($\le 12$ rows, such as Dataset A): Distributed across **2 pages**, exactly matching the official sample PDF.
   - **Expanded Datasets** ($> 12$ rows, such as Dataset B with 20+ rows): Automatically flows across **3 pages**, preventing vertical table crowding or page overflow.
3. **Dynamic Footer Numbering**: The engine dynamically stamps `Page X of Y` (e.g. `Page 1 of 2` or `Page 1 of 3`) across all rendered page footers.

---

## 9. Key Assumptions

1. **Standard Paper Sizing**: North American **Letter** format (`8.5in` $\times$ `11in`) is used as the standard page container.
2. **Print-First Design**: The visual canvas emulates a generated PDF report, keeping interactive demonstration toolbars strictly outside the printable document area.
3. **Typography**: System font fallbacks (`Segoe UI`, `-apple-system`, `Helvetica Neue`, `Arial`) match the clean sans-serif typography of the WCB Manitoba forms without introducing external font web-requests.
4. **Vector Logo**: High-fidelity inline SVG emblem is used to ensure clean, crisp rendering at all print resolutions.

---

## 10. Challenges Faced & Solutions

| Challenge | Solution |
| :--- | :--- |
| **Preventing Row Overlap during Expansion** | Replaced static table rows with `Array.map()` generation inside standard `<table>` elements with fixed table-layout percentage widths. |
| **Dynamic Page Counts without Heavy Libraries** | Built a deterministic JavaScript chunking algorithm in `script.js` coupled with `shared/pagination.js` that counts data items and sets page counts dynamically. |
| **Print Dialog Styling Fidelity** | Implemented `@media print` rules with `-webkit-print-color-adjust: exact`, hiding the demo bar and removing container drop-shadows. |
| **Empty Category Handling** | Created `renderTableRows()` helper that cleanly outputs an italicized `colspan` notice when arrays are empty, preserving table borders. |

---

## 11. How to Demonstrate Datasets (A / B / C)

A non-printing demo toolbar sits at the top of each exercise:

- **Source PDF Dataset (Dataset A)**:
  - Loads the exact baseline data from the supplied WCB Manitoba sample PDF.
  - Exercise 1: 7 rows across 2 pages.
  - Exercise 2: *"Returned to work"*, *"Fully recovered"*, pain level unset.
- **Expanded Dataset (Dataset B)**:
  - Demonstrates multi-row dynamic scaling.
  - Exercise 1: 20+ records across all 6 tables, automatically generating 3 pages with `Page X of 3` footers.
  - Exercise 2: Active recovery state, pain level 7, ongoing treatments, multiple medications, and exercise routines.
- **Minimal Dataset (Dataset C)**:
  - Demonstrates stability with minimal or empty data arrays.
  - Tables with zero entries display clean *"No entries submitted for this category."* rows.
- **Edit JSON**:
  - Allows entering custom raw JSON objects at runtime.
  - Adding 5 new rows to an array instantly re-renders the document and updates table row counts.

---

## 12. Print & PDF Export Workflow

1. Click the green **Print / Save PDF** button on the demo toolbar (or press `Ctrl+P` / `Cmd+P`).
2. In the browser print dialog:
   - **Destination**: *Save as PDF*
   - **Layout**: *Portrait*
   - **Paper size**: *Letter*
   - **Options**: Enable *Background graphics* (for table headers and boxes)
3. The demo toolbar and edit modals are hidden automatically via `@media print`.

---

## 13. Video Walkthrough Demonstration

In accordance with the submission guidelines, two 2-minute narrated walkthrough videos with **Picture-in-Picture (Screen + Webcam)** are provided:

- **Video 1**: `videos/exercise-1-video.mp4` (Medical & Travel Expense Request walkthrough)
- **Video 2**: `videos/exercise-2-video.mp4` (Worker Progress Report walkthrough)

Detailed talking points and presentation scripts are available in [`videos/README.md`](videos/README.md).

---

## 14. AI Prompt History & Transparency

Complete prompt logs and AI engineering iterations are documented in [`prompt-history/ai-prompts.md`](prompt-history/ai-prompts.md).
