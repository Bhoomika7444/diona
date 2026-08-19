/**
 * Exercise 1: Medical & Travel Expense Request - Datasets
 * Pure JavaScript Data Models
 */

// Dataset 1: Source PDF Dataset (Exact 1:1 match with supplied WCB PDF)
const dataset_SourcePDF = {
  claimNo: "20042047",
  workerName: "Madeleine Willson",
  workerAppId: "712041",
  submittedAt: "March 28, 2024 20:43",
  privacyAccepted: true,

  // Table 1: Prescription Drugs (1 item)
  prescriptionDrugs: [
    {
      drugName: "Naproxen",
      prescriptionDate: "February 28, 2024",
      datePurchased: "February 29, 2024",
      healthcareProvider: "Dr. Best",
      paidAmount: "$20.00"
    }
  ],

  // Table 2: Over-The-Counter Drugs (1 item)
  otcDrugs: [
    {
      drugName: "Advil",
      datePurchased: "March 28, 2024",
      paidAmount: "$8.00",
      sellerName: "Shoppers Drug Mart",
      reasonForPurchasing: "Pain"
    }
  ],

  // Table 3: Medical Supplies (1 item)
  medicalSupplies: [
    {
      itemPurchased: "Tensor",
      datePurchased: "February 28, 2024",
      wasPrescribed: "Yes",
      healthcareProvider: "Dr. Best",
      paidAmount: "$10.00",
      sellerName: "Shoppers DrugMart"
    }
  ],

  // Table 4: Parking for Medical Appointments (1 item)
  parking: [
    {
      facilityAddress: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada",
      date: "March 28, 2024",
      paidAmount: "$10.00",
      meterUsed: "yes",
      meterNumber: "12245"
    }
  ],

  // Table 5: Mileage to Medical Appointments (1 item)
  mileage: [
    {
      appointmentDate: "March 28, 2024",
      facilityAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
      workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3,Canada",
      roundTripKm: "20 km"
    }
  ],

  // Table 6: Bus or Taxi Fare for Medical Appointments (2 items)
  busTaxi: [
    {
      appointmentDate: "March 28, 2024",
      startingPoint: "",
      facilityAddress: "HSC Winnipeg Women’s Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada",
      transitType: "Bus",
      totalFarePaid: "$3.00"
    },
    {
      appointmentDate: "March 27, 2024",
      startingPoint: "25 Furby St, Winnipeg MB R3C2A2, Canada",
      facilityAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada",
      transitType: "Taxi",
      totalFarePaid: "$15.00"
    }
  ]
};

// Dataset 2: 1-Item Dataset (Clean verification of single-item state)
const dataset_1Item = {
  claimNo: "20042047",
  workerName: "Madeleine Willson",
  workerAppId: "712041",
  submittedAt: "March 28, 2024 20:43",
  privacyAccepted: true,

  prescriptionDrugs: [
    {
      drugName: "Naproxen 500mg",
      prescriptionDate: "February 28, 2024",
      datePurchased: "February 29, 2024",
      healthcareProvider: "Dr. Best",
      paidAmount: "$20.00"
    }
  ],

  otcDrugs: [
    {
      drugName: "Advil Extra Strength",
      datePurchased: "March 28, 2024",
      paidAmount: "$8.00",
      sellerName: "Shoppers Drug Mart",
      reasonForPurchasing: "Pain relief"
    }
  ],

  medicalSupplies: [
    {
      itemPurchased: "Tensor Bandage",
      datePurchased: "February 28, 2024",
      wasPrescribed: "Yes",
      healthcareProvider: "Dr. Best",
      paidAmount: "$10.00",
      sellerName: "Shoppers DrugMart"
    }
  ],

  parking: [
    {
      facilityAddress: "333 St Mary Ave, Winnipeg MB R3C4A5",
      date: "March 28, 2024",
      paidAmount: "$10.00",
      meterUsed: "yes",
      meterNumber: "12245"
    }
  ],

  mileage: [
    {
      appointmentDate: "March 28, 2024",
      facilityAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9",
      workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3",
      roundTripKm: "20 km"
    }
  ],

  busTaxi: [
    {
      appointmentDate: "March 28, 2024",
      startingPoint: "25 Furby St",
      facilityAddress: "HSC Winnipeg Women’s Hospital, 665 William Ave",
      transitType: "Bus",
      totalFarePaid: "$3.00"
    }
  ]
};

// Dataset 3: More Items Dataset (Stress test with 10+ records in prescription drugs and rich multi-table records)
const dataset_MoreItems = {
  claimNo: "20098412",
  workerName: "Alexander Hayes",
  workerAppId: "849201",
  submittedAt: "April 02, 2024 14:15",
  privacyAccepted: true,

  // Exactly 10 individual prescription drug records
  prescriptionDrugs: [
    { drugName: "Naproxen 500mg", prescriptionDate: "March 01, 2024", datePurchased: "March 02, 2024", healthcareProvider: "Dr. Best", paidAmount: "$24.50" },
    { drugName: "Cyclobenzaprine 10mg", prescriptionDate: "March 05, 2024", datePurchased: "March 05, 2024", healthcareProvider: "Dr. K. Smith", paidAmount: "$18.75" },
    { drugName: "Amoxicillin 250mg", prescriptionDate: "March 08, 2024", datePurchased: "March 09, 2024", healthcareProvider: "Dr. Best", paidAmount: "$15.00" },
    { drugName: "Gabapentin 300mg", prescriptionDate: "March 12, 2024", datePurchased: "March 13, 2024", healthcareProvider: "Dr. R. Vance", paidAmount: "$32.40" },
    { drugName: "Metformin 500mg", prescriptionDate: "March 15, 2024", datePurchased: "March 16, 2024", healthcareProvider: "Dr. L. Chen", paidAmount: "$12.80" },
    { drugName: "Atorvastatin 20mg", prescriptionDate: "March 18, 2024", datePurchased: "March 19, 2024", healthcareProvider: "Dr. K. Smith", paidAmount: "$28.00" },
    { drugName: "Pantoprazole 40mg", prescriptionDate: "March 20, 2024", datePurchased: "March 21, 2024", healthcareProvider: "Dr. Best", paidAmount: "$22.15" },
    { drugName: "Tramadol 50mg", prescriptionDate: "March 22, 2024", datePurchased: "March 23, 2024", healthcareProvider: "Dr. R. Vance", paidAmount: "$35.00" },
    { drugName: "Duloxetine 30mg", prescriptionDate: "March 25, 2024", datePurchased: "March 26, 2024", healthcareProvider: "Dr. L. Chen", paidAmount: "$41.50" },
    { drugName: "Meloxicam 15mg", prescriptionDate: "March 28, 2024", datePurchased: "March 29, 2024", healthcareProvider: "Dr. Best", paidAmount: "$19.30" }
  ],

  otcDrugs: [
    { drugName: "Advil Extra Strength", datePurchased: "March 03, 2024", paidAmount: "$12.99", sellerName: "Shoppers Drug Mart", reasonForPurchasing: "Acute knee swelling" },
    { drugName: "Robaxacet Platinum", datePurchased: "March 10, 2024", paidAmount: "$16.49", sellerName: "Rexall Pharmacy", reasonForPurchasing: "Muscle spasms" },
    { drugName: "Tylenol Arthritis 650mg", datePurchased: "March 18, 2024", paidAmount: "$14.25", sellerName: "Walmart Pharmacy", reasonForPurchasing: "Joint stiffness" }
  ],

  medicalSupplies: [
    { itemPurchased: "Tensor Bandage 4\"", datePurchased: "March 01, 2024", wasPrescribed: "Yes", healthcareProvider: "Dr. Best", paidAmount: "$10.00", sellerName: "Shoppers DrugMart" },
    { itemPurchased: "Hinged Knee Brace", datePurchased: "March 08, 2024", wasPrescribed: "Yes", healthcareProvider: "Dr. K. Smith", paidAmount: "$85.00", sellerName: "Physio Med Supply" },
    { itemPurchased: "Gel Hot/Cold Compress", datePurchased: "March 14, 2024", wasPrescribed: "No", healthcareProvider: "N/A", paidAmount: "$14.50", sellerName: "Rexall Pharmacy" }
  ],

  parking: [
    { facilityAddress: "333 St Mary Ave, Winnipeg MB R3C4A5", date: "March 04, 2024", paidAmount: "$10.00", meterUsed: "yes", meterNumber: "12245" },
    { facilityAddress: "820 Sherbrook St, Winnipeg MB R3A 1R9", date: "March 11, 2024", paidAmount: "$12.50", meterUsed: "yes", meterNumber: "88412" },
    { facilityAddress: "440 Edmonton St, Winnipeg MB R3B 2M4", date: "March 19, 2024", paidAmount: "$8.00", meterUsed: "no", meterNumber: "Lot B-4" }
  ],

  mileage: [
    { appointmentDate: "March 04, 2024", facilityAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3", roundTripKm: "22 km" },
    { appointmentDate: "March 11, 2024", facilityAddress: "Pan Am Clinic, 75 Poseidon Bay, Winnipeg", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3", roundTripKm: "18 km" },
    { appointmentDate: "March 19, 2024", facilityAddress: "St. Boniface Hospital, 409 Tache Ave", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3", roundTripKm: "15 km" }
  ],

  busTaxi: [
    { appointmentDate: "March 02, 2024", startingPoint: "25 Furby St, Winnipeg MB R3C2A2", facilityAddress: "HSC Winnipeg Women’s Hospital, 665 William Ave", transitType: "Bus", totalFarePaid: "$3.15" },
    { appointmentDate: "March 07, 2024", startingPoint: "25 Furby St, Winnipeg MB R3C2A2", facilityAddress: "440 Edmonton St, Winnipeg MB R3B 2M4", transitType: "Taxi", totalFarePaid: "$16.50" },
    { appointmentDate: "March 15, 2024", startingPoint: "Portage Ave & Carlton St", facilityAddress: "Pan Am Clinic, 75 Poseidon Bay", transitType: "Taxi", totalFarePaid: "$19.00" },
    { appointmentDate: "March 22, 2024", startingPoint: "333 Broadway", facilityAddress: "St. Boniface Physiotherapy, 409 Tache Ave", transitType: "Bus", totalFarePaid: "$3.15" }
  ]
};

// Dataset 4: Minimal Dataset (Zero or empty rows in optional sections)
const dataset_Minimal = {
  claimNo: "20077109",
  workerName: "Chloe Zhang",
  workerAppId: "902114",
  submittedAt: "March 30, 2024 09:30",
  privacyAccepted: true,

  prescriptionDrugs: [
    {
      drugName: "Ibuprofen 400mg",
      prescriptionDate: "March 20, 2024",
      datePurchased: "March 21, 2024",
      healthcareProvider: "Dr. L. Vance",
      paidAmount: "$12.00"
    }
  ],

  otcDrugs: [],
  medicalSupplies: [],
  parking: [],
  mileage: [],
  busTaxi: []
};
