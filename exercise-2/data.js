/**
 * Exercise 2: Worker Progress Report - Datasets
 * Pure JavaScript Data Models for Conditional Document Rendering
 */

// Dataset 1: Source PDF Dataset (Exact 1:1 match with supplied WCB Manitoba PDF)
const dataset_SourcePDF = {
  claimNo: "20042047",
  claimCode: "WP",
  workerName: "Madeleine Willson",
  workerAppId: "712041",
  submittedAt: "March 19, 2024 19:21",

  // Page 1: Return to Work
  returnToWork: {
    status: "returned", // "notMissed" | "notReturned" | "returned"
    returnDate: "March 15, 2024",
    workType: "modifiedReduced", // "fullRegular" | "fullReduced" | "modifiedRegular" | "modifiedReduced" | "other"
    otherWorkType: "",
    progressComment: "Terrible. Testing Testing",
    expectedReturnDate: "",
    concerns: "",
    employerContact: "",
    contactDate: ""
  },

  // Page 1: Recovery
  recovery: {
    recovered: true, // true = fully recovered, false = not fully recovered
    comments: ""
  },

  // Page 2: Pain Scale (1 to 10 or null)
  painLevel: null,

  // Page 2: Medical Treatment
  medicalTreatment: {
    continuing: false, // true = continuing, false = not continuing
    providerType: "",
    lastTreatmentDate: "",
    lastTreatmentProvider: "",
    nextTreatmentDate: "",
    nextTreatmentProvider: "",
    frequency: ""
  },

  // Page 2: Medication
  medication: {
    taking: false,
    name: ""
  },

  // Page 2: Home Exercises
  exercises: {
    doing: false,
    list: ""
  },

  // Page 2: Other Information
  otherInformation: "No info Testing Testing",

  // Page 3: Certification & Privacy Notice
  isCertified: true,
  privacyAccepted: true
};

// Dataset 2: Alternative Dataset (Demonstrating active treatments, pain scale 7, modified recovery)
const dataset_Alternative = {
  claimNo: "20098412",
  claimCode: "WP",
  workerName: "Alexander Hayes",
  workerAppId: "849201",
  submittedAt: "April 02, 2024 14:15",

  returnToWork: {
    status: "notReturned",
    returnDate: "",
    workType: "",
    otherWorkType: "",
    progressComment: "",
    expectedReturnDate: "April 15, 2024",
    concerns: "Persistent sharp lumbar pain when bending or lifting objects over 10 lbs.",
    employerContact: "Sarah Jenkins (HR Supervisor)",
    contactDate: "March 17, 2024"
  },

  recovery: {
    recovered: false,
    comments: "Mobility has improved by 40% compared to initial injury date. Morning stiffness remains pronounced."
  },

  painLevel: 7,

  medicalTreatment: {
    continuing: true,
    providerType: "Physiotherapist & Sports Medicine Physician",
    lastTreatmentDate: "March 14, 2024",
    lastTreatmentProvider: "Pan Am Clinic - Dr. K. Smith",
    nextTreatmentDate: "March 22, 2024",
    nextTreatmentProvider: "Pan Am Clinic - Physiotherapy Dept",
    frequency: "2 sessions per week (Tues / Thurs)"
  },

  medication: {
    taking: true,
    name: "Cyclobenzaprine 10mg (nightly), Naproxen 500mg (twice daily)"
  },

  exercises: {
    doing: true,
    list: "1. Core stabilization bridges (3 sets of 10 reps)\n2. Gentle pelvic tilts and hamstring stretches (twice daily)\n3. Resistance band rotator cuff exercises"
  },

  otherInformation: "Requesting ergonomics team evaluation before gradual return-to-work program begins.",

  isCertified: true,
  privacyAccepted: true
};

// Dataset 3: Minimal Dataset (No time missed, full regular hours, no treatment)
const dataset_Minimal = {
  claimNo: "20077109",
  claimCode: "WP",
  workerName: "Chloe Zhang",
  workerAppId: "902114",
  submittedAt: "March 30, 2024 09:30",

  returnToWork: {
    status: "notMissed",
    returnDate: "",
    workType: "fullRegular",
    otherWorkType: "",
    progressComment: "Working regular schedule without complications.",
    expectedReturnDate: "",
    concerns: "",
    employerContact: "Mark Robinson",
    contactDate: "March 18, 2024"
  },

  recovery: {
    recovered: true,
    comments: "Complete resolution of symptoms. Full range of motion restored."
  },

  painLevel: 1,

  medicalTreatment: {
    continuing: false,
    providerType: "",
    lastTreatmentDate: "March 10, 2024",
    lastTreatmentProvider: "Dr. Best Clinic",
    nextTreatmentDate: "",
    nextTreatmentProvider: "",
    frequency: "Discharged from active therapy"
  },

  medication: {
    taking: false,
    name: ""
  },

  exercises: {
    doing: false,
    list: ""
  },

  otherInformation: "No further wage-loss or medical expense claims expected.",

  isCertified: true,
  privacyAccepted: true
};
