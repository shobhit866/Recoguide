// Normal reference ranges for ADULTS.
// Units are common lab units used across India; adjust if your lab differs.
// For sex-specific tests, use obj.male / obj.female.
// For categorical urine tests, expected is "negative" or a qualitative range.

const M = "male", F = "female";

export const NORMALS = {
  // ===== 1) CBC =====
  HB: {
    label: "Hemoglobin",
    unit: "g/dL",
    [M]: { low: 13.0, high: 17.0 },
    [F]: { low: 12.0, high: 15.5 },
  },
  HCT: {
    label: "Hematocrit",
    unit: "%",
    [M]: { low: 40, high: 50 },
    [F]: { low: 36, high: 44 },
  },
  RBC: { label: "RBC Count", unit: "10^6/µL", low: 4.5, high: 5.9 },
  WBC: { label: "WBC Count", unit: "10^3/µL", low: 4.0, high: 11.0 },
  PLT: { label: "Platelets", unit: "10^3/µL", low: 150, high: 400 },
  MCV: { label: "MCV", unit: "fL", low: 80, high: 100 },
  MCH: { label: "MCH", unit: "pg", low: 27, high: 33 },
  MCHC: { label: "MCHC", unit: "g/dL", low: 32, high: 36 },
  RDW: { label: "RDW", unit: "%", low: 11.5, high: 14.5 },
  NEUTP: { label: "Neutrophils %", unit: "%", low: 40, high: 75 },
  LYMPP: { label: "Lymphocytes %", unit: "%", low: 20, high: 45 },
  MONOP: { label: "Monocytes %", unit: "%", low: 2, high: 10 },
  EOSP: { label: "Eosinophils %", unit: "%", low: 1, high: 6 },
  BASOP: { label: "Basophils %", unit: "%", low: 0, high: 2 },

  // ===== 2) Diabetes profile =====
  FBS: { label: "Fasting Blood Sugar", unit: "mg/dL", low: 70, high: 99 },
  PPBS: { label: "Post-Prandial Blood Sugar (2h)", unit: "mg/dL", low: 70, high: 140 },
  RBS: { label: "Random Blood Sugar", unit: "mg/dL", low: 70, high: 200 }, // diagnostic threshold >200 with symptoms
  HBA1C: { label: "HbA1c", unit: "%", low: 4.0, high: 5.6, bands: { prediabetes: [5.7, 6.4], diabetes: [6.5, 100] } },

  // ===== 3) Lipid profile =====
  TC: { label: "Total Cholesterol", unit: "mg/dL", low: 0, high: 199 },
  HDL: { label: "HDL Cholesterol", unit: "mg/dL", low: 40, high: 60 }, // ≥60 protective
  LDL: { label: "LDL Cholesterol", unit: "mg/dL", low: 0, high: 129 }, // <100 optimal (general)
  TG: { label: "Triglycerides", unit: "mg/dL", low: 0, high: 150 },
  VLDL: { label: "VLDL (calculated)", unit: "mg/dL", low: 5, high: 30 },
  TCHDLR: { label: "TC/HDL Ratio", unit: "", low: 0, high: 5 },

  // ===== 4) Liver function tests =====
  AST: { label: "AST (SGOT)", unit: "U/L", low: 0, high: 40 },
  ALT: { label: "ALT (SGPT)", unit: "U/L", low: 0, high: 41 },
  ALP: { label: "Alkaline Phosphatase", unit: "U/L", low: 40, high: 129 },
  GGT: { label: "GGT", unit: "U/L", low: 0, high: 60 },
  TBIL: { label: "Total Bilirubin", unit: "mg/dL", low: 0.3, high: 1.2 },
  DBIL: { label: "Direct Bilirubin", unit: "mg/dL", low: 0.0, high: 0.3 },
  IBIL: { label: "Indirect Bilirubin", unit: "mg/dL", low: 0.2, high: 0.9 },
  ALB: { label: "Albumin", unit: "g/dL", low: 3.5, high: 5.0 },
  GLOB: { label: "Globulin", unit: "g/dL", low: 2.0, high: 3.5 },
  AGR: { label: "A/G Ratio", unit: "", low: 1.0, high: 2.5 },
  TPROT: { label: "Total Protein", unit: "g/dL", low: 6.0, high: 8.3 },

  // ===== 5) Kidney function tests =====
  CREAT: {
    label: "Serum Creatinine",
    unit: "mg/dL",
    [M]: { low: 0.74, high: 1.35 },
    [F]: { low: 0.59, high: 1.04 },
  },
  BUN: { label: "BUN", unit: "mg/dL", low: 7, high: 20 },
  UREA: { label: "Urea", unit: "mg/dL", low: 17, high: 49 },
  URIC: {
    label: "Uric Acid",
    unit: "mg/dL",
    [M]: { low: 3.4, high: 7.0 },
    [F]: { low: 2.4, high: 6.0 },
  },
  EGFR: { label: "eGFR", unit: "mL/min/1.73m²", low: 90, high: 999 },

  // ===== 6) Thyroid =====
  TSH: { label: "TSH", unit: "µIU/mL", low: 0.4, high: 4.0 },
  FT4: { label: "Free T4", unit: "ng/dL", low: 0.8, high: 1.8 },
  FT3: { label: "Free T3", unit: "pg/mL", low: 2.3, high: 4.2 },

  // ===== 7) Electrolytes =====
  NA: { label: "Sodium", unit: "mmol/L", low: 135, high: 145 },
  K: { label: "Potassium", unit: "mmol/L", low: 3.5, high: 5.1 },
  CL: { label: "Chloride", unit: "mmol/L", low: 98, high: 107 },
  CA: { label: "Calcium (total)", unit: "mg/dL", low: 8.6, high: 10.2 },
  MG: { label: "Magnesium", unit: "mg/dL", low: 1.7, high: 2.2 },
  PHOS: { label: "Phosphate (Inorganic)", unit: "mg/dL", low: 2.5, high: 4.5 },
  CO2: { label: "CO₂ (Bicarbonate)", unit: "mmol/L", low: 22, high: 29 },

  // ===== 8) Urine routine (some qualitative) =====
  U_PH: { label: "Urine pH", unit: "", low: 5.0, high: 8.0 },
  U_SG: { label: "Specific Gravity", unit: "", low: 1.005, high: 1.030 },
  U_PROT: { label: "Urine Protein", unit: "", expected: "negative" },
  U_GLU: { label: "Urine Glucose", unit: "", expected: "negative" },
  U_KET: { label: "Ketones", unit: "", expected: "negative" },
  U_BLD: { label: "Blood (Hb)", unit: "", expected: "negative" },
  U_LEU: { label: "Leukocyte Esterase", unit: "", expected: "negative" },
  U_NIT: { label: "Nitrite", unit: "", expected: "negative" },
  U_URO: { label: "Urobilinogen", unit: "EU/dL", low: 0.2, high: 1.0 },
  U_WBC: { label: "Urine WBC", unit: "cells/HPF", low: 0, high: 5 },
  U_RBC: { label: "Urine RBC", unit: "cells/HPF", low: 0, high: 3 },
  U_EPI: { label: "Epithelial Cells", unit: "cells/HPF", low: 0, high: 10 },

  // ===== 9) Iron studies =====
  SIRON: { label: "Serum Iron", unit: "µg/dL", low: 60, high: 170 },
  TIBC: { label: "TIBC", unit: "µg/dL", low: 240, high: 450 },
  TSAT: { label: "Transferrin Saturation", unit: "%", low: 20, high: 50 },
  FERR: {
    label: "Ferritin",
    unit: "ng/mL",
    [M]: { low: 30, high: 400 },
    [F]: { low: 15, high: 150 },
  },

  // ===== 11) Cardiac markers =====
  TROP_I: { label: "Troponin I (hs)", unit: "ng/mL", low: 0.00, high: 0.04 }, // lab methods vary
  CKMB: { label: "CK-MB", unit: "ng/mL", low: 0.0, high: 5.0 },
  NT_PROBNP: { label: "NT-proBNP", unit: "pg/mL", low: 0, high: 125 }, // <125 for non-acute, age dependent

  // ===== 12) Others =====
  CRP: { label: "C-Reactive Protein", unit: "mg/L", low: 0.0, high: 5.0 },
  ESR: {
    label: "ESR (Westergren)",
    unit: "mm/hr",
    [M]: { low: 0, high: 15 },
    [F]: { low: 0, high: 20 },
  },
  DDIMER: { label: "D-Dimer (FEU)", unit: "µg/mL", low: 0.00, high: 0.50 },
  PCT: { label: "Procalcitonin", unit: "ng/mL", low: 0.00, high: 0.10 },
  LDH: { label: "LDH", unit: "U/L", low: 140, high: 280 },
};

export const SEX_KEYS = { M, F };
