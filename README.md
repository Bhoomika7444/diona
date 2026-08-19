# Diona Technologies – Document Generation Assignment

## Overview

This project was developed as part of the Diona Technologies technical assignment.

The objective was to recreate the two supplied PDF documents as dynamic, print-ready web documents using:

- HTML5
- CSS3
- Vanilla JavaScript

The implementation focuses on accurate document reproduction, dynamic data rendering, conditional fields, pagination, and print/PDF output.

---

## Exercises

### Exercise 1 – Medical & Travel Expense Request

Recreated the supplied Medical & Travel Expense Request document.

The document includes:

- Worker and claim information
- WCB header and branding
- Prescription Drugs
- Over-the-Counter Drugs
- Medical Supplies
- Parking
- Mileage
- Bus/Taxi expenses
- Footer and page numbering

#### Dynamic Data

The content is generated from JavaScript data rather than hard-coded HTML rows.

Available datasets:

- **Source PDF Dataset** – reproduces the reference PDF data
- **More Items Dataset** – contains multiple records, including 10 prescription records, to demonstrate dynamic table rendering and pagination
- **Minimal Dataset** – tests the document with minimal/optional data

When the number of records changes, the table rows are generated automatically and additional content is distributed across pages when required.

---

### Exercise 2 – Worker Progress Report

Recreated the supplied Worker Progress Report.

The document includes:

- Worker and claim information
- Return-to-work details
- Work duty information
- Recovery status
- Pain level
- Medical treatment
- Medication
- Home exercises
- Additional information
- Certification/privacy information
- Footer and page numbering

#### Dynamic Data

Different datasets are used to demonstrate conditional document behavior.

For example, changing the dataset can change:

- Return-to-work status
- Recovery status
- Pain level
- Medical treatment status
- Medication status
- Home exercise status
- Related dates and text fields

Checkboxes and fields are rendered according to the JavaScript data.

---

## Project Structure

```text
DIONA-TECHNOLOGIES/
│
├── assets/
│   ├── logo.svg
│   └── wcb-logo.svg
│
├── exercise-1/
│   ├── assets/
│   ├── data.js
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── exercise-2/
│   ├── assets/
│   ├── data.js
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── prompt-history/
│   └── ai-prompts.md
│
├── shared/
│   ├── common.css
│   ├── pagination.js
│   └── utilities.js
│
├── videos/
│   └── README.md
│
├── .gitignore
├── index.html
└── README.md



video link Exercise2 : https://drive.google.com/file/d/1pFwD29rGo-_XNCg3eudHC1P4Ay3pp5Fb/view?usp=sharing
