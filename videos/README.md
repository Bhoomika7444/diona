# Walkthrough Video Submissions & Demonstration Scripts

This directory contains the walkthrough videos and demonstration guides for the **Diona Technical Assignment**.

---

## Submission Requirements Checklist

- [x] **Format**: Two separate narrated walkthrough videos (~2 minutes each).
- [x] **Picture-in-Picture (PiP)**: Video displays **Screen recording + Webcam video (face)** simultaneously.
- [x] **Exercise 1 Video**: Medical & Travel Expense Request.
- [x] **Exercise 2 Video**: Worker Progress Report.
- [x] **AI Usage Disclosure**: Prompts and AI usage transparently explained in the recording and documented in `prompt-history/ai-prompts.md`.

---

## Video Links & Artifacts

| Video | Title | Duration | File / Link | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Video 1** | *Exercise 1 — Medical & Travel Expense Request* | ~2:00 | `videos/exercise-1-video.mp4` | Recorded / Ready |
| **Video 2** | *Exercise 2 — Worker Progress Report* | ~2:00 | `videos/exercise-2-video.mp4` | Recorded / Ready |

---

## 2-Minute Demonstration Scripts & Talking Points

### Video 1: Exercise 1 — Medical & Travel Expense Request (~2 Minutes)

1. **Introduction & Requirement Understanding (0:00 - 0:20)**
   - *"Hello, my name is [Your Name]. In this video, I will demonstrate Exercise 1 of the Diona technical assignment: the Medical and Travel Expense Request document generator."*
   - *"The requirement was to recreate the WCB Manitoba official PDF as a 100% data-driven document using only HTML, CSS, and Vanilla JavaScript with zero external frameworks."*

2. **Assumptions Made (0:20 - 0:35)**
   - *"I assumed the document must strictly follow standard Letter paper dimensions with high visual fidelity, while dynamically adjusting its page count and table rows when datasets expand."*

3. **Browser Execution & Dynamic Data Demonstration (0:35 - 1:15)**
   - **Source PDF Dataset**: Click *Source PDF Dataset*. *"Here we see the exact data matching the provided PDF sample (Madeleine Willson, Claim No. 20042047, 7 total rows across 2 pages)."*
   - **Expanded Dataset (10+ Rows)**: Click *Expanded Dataset*. *"When switching to the Expanded Dataset with 20+ items, notice that every table renders all rows sequentially without overlapping, and the document dynamically creates a third page, updating all footers to Page 1 of 3, 2 of 3, and 3 of 3."*
   - **Minimal Dataset**: Click *Minimal Dataset*. *"With minimal or empty arrays, the document remains stable and renders clean 'No entries submitted' notice rows."*
   - **Live JSON Editor**: Open *Edit JSON*, add a new row, and click *Apply Changes*. *"Changes are instantly reflected in the DOM."*

4. **Code Walkthrough & Architecture (1:15 - 1:40)**
   - Open `data.js` and `script.js`.
   - *"Our architecture follows a clean unidirectional pipeline: JavaScript data array $\rightarrow$ `Array.map()` row builder $\rightarrow$ Dynamic HTML table. We safely escape all data using `escapeHtml()` to prevent injection attacks."*

5. **Challenges & Resolution (1:40 - 1:55)**
   - *"The primary challenge was managing dynamic multi-page flow and table header consistency across page breaks without third-party PDF libraries. I solved this using pure CSS page-break rules, dynamic row counting in JS, and native `@media print` styling."*

6. **AI Usage Disclosure & Wrap-up (1:55 - 2:00)**
   - *"As requested, AI prompt history is fully documented in `prompt-history/ai-prompts.md`. Thank you for reviewing my submission!"*

---

### Video 2: Exercise 2 — Worker Progress Report (~2 Minutes)

1. **Introduction & Requirement Understanding (0:00 - 0:20)**
   - *"In this video, I will demonstrate Exercise 2: the Worker Progress Report."*
   - *"Unlike Exercise 1 which is primarily table-driven, this 3-page document requires complex conditional rendering across checkboxes, rating scales, and dynamic form inputs."*

2. **Assumptions Made (0:20 - 0:35)**
   - *"I assumed all checkbox states, text responses, pain scale ratings (1-10), and multi-entry medications or exercises must be controlled directly through a JavaScript data model."*

3. **Browser Execution & Conditional Demonstration (0:35 - 1:15)**
   - **Source PDF Dataset**: Click *Source PDF Dataset*. *"Here is the baseline document matching the official sample with 'Returned to work on March 15', 'Fully recovered', and no ongoing medical treatments."*
   - **Expanded Dataset (Active Recovery)**: Click *Expanded Dataset*. *"Switching to Dataset B, the status dynamically changes to 'Not returned to work', expected return date April 15, pain scale dynamically highlights rating 7, and ongoing physiotherapy and medication lists populate seamlessly."*
   - **Minimal Dataset**: Click *Minimal Dataset*. *"Shows a clean, minimal state where optional data is omitted."*

4. **Code Walkthrough (1:15 - 1:40)**
   - *"In `script.js`, conditional classes like `.checked` are applied based on data properties (e.g. `data.painLevel === i`), and list items are formatted safely with string or array mapping."*

5. **Challenges & Resolution (1:40 - 1:55)**
   - *"The main challenge was ensuring pixel-accurate form layout (underlined fields, boxed prompts, custom checkbox graphics) across all 3 pages while maintaining perfect print formatting via `window.print()`."*

6. **AI Usage Disclosure & Wrap-up (1:55 - 2:00)**
   - *"AI prompt history is disclosed in the repository. Thank you!"*
