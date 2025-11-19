// Highly user-friendly, clinically safe advice generator
export function adviceFor(code, flag) {
  if (!flag || flag === "normal") {
    return "Values are in the normal range. Maintain a balanced diet, good sleep, and regular checkups.";
  }

  const hi = flag === "high";
  const lo = flag === "low";

  switch (code) {

    // ------------------ Diabetes ------------------
    case "FBS":
    case "PPBS":
    case "RBS":
    case "HBA1C":
      return hi
        ? "Sugar level is higher than normal. Reduce sweets, white rice, bakery items, and sugary drinks. Increase fiber (dal, salad, roti with bran), walk 20–30 minutes daily (especially after meals), and recheck sugars. Consult your clinician if levels stay high."
        : "Low sugar can be due to medicines/long gaps between meals. Keep a quick snack nearby and review diabetes medication doses with your clinician.";

    // ------------------ Lipids ------------------
    case "TC":
      return "High total cholesterol — reduce fried foods, butter/cream, red meat, and bakery items. Include oats, fruits, salads, nuts, and daily 30-minute exercise.";
      
    case "TG":
      return "Triglycerides are high — commonly due to sugar, oily food, or alcohol. Reduce sweets/soft drinks, limit alcohol, increase exercise, and focus on high-fiber meals.";
    
    case "HDL":
      return lo
        ? "Good cholesterol (HDL) is low. Increase physical activity, nuts (almonds/walnuts), seeds (flax/chia), healthy oils, and avoid smoking."
        : "Good HDL level — keep maintaining an active lifestyle!";
    
    case "LDL":
      return "Bad cholesterol (LDL) is high. Reduce ghee/butter, cheese, red meat, and processed foods. Add oats, fruits, and regular walking. Discuss with clinician if very high.";
    
    case "VLDL":
      return "High VLDL — often linked to high sugar intake and metabolic risk. Reduce sugary foods, alcohol, and increase exercise.";
    
    case "NON_HDL":
    case "TCHDLR":
      return "High non-HDL cholesterol — indicates significant heart risk. Strongly consider diet correction, weight control, and clinician review.";

    // ------------------ Liver ------------------
    case "ALT":
    case "AST":
      return hi
        ? "Liver enzymes are high — may be due to fatty liver, alcohol, medicines, or infection. Avoid alcohol, fried foods, and unnecessary painkillers. Consider liver ultrasound if persistent."
        : "Low levels are usually not concerning.";
    
    case "ALP":
      return "ALP is abnormal — may relate to liver, bile ducts, or bones. Correlate with symptoms and other tests.";
    
    case "GGT":
      return "High GGT — usually linked with alcohol use, fatty liver, or bile issues. Reduce alcohol and fatty foods.";
    
    case "TBIL":
    case "DBIL":
      return "Bilirubin is high — may cause jaundice. Avoid heavy/oily meals, stay hydrated, and get liver evaluation if symptoms occur.";

    // ------------------ Kidney ------------------
    case "CREAT":
      return hi
        ? "Creatinine is high — kidney may be under stress. Stay hydrated, avoid painkillers, and monitor BP and sugar. Seek clinician review."
        : "Low creatinine is usually harmless and may relate to low muscle mass.";

    case "BUN":
    case "UREA":
      return hi
        ? "High urea/BUN — could be dehydration, high-protein diet, or kidney strain. Improve hydration and reduce excess protein."
        : "Low values are usually not concerning.";

    case "EGFR":
      return hi
        ? "High eGFR generally not concerning. Continue hydration."
        : "Low eGFR suggests reduced kidney filtering — follow up with your clinician.";

    case "URIC":
      return hi
        ? "High uric acid — can cause gout or kidney stones. Reduce red meat, organ meat, alcohol, and sugary drinks. Hydrate well."
        : "Low uric acid is usually not concerning.";

    // ------------------ Thyroid ------------------
    case "TSH":
    case "FT4":
    case "FT3":
      return "Thyroid imbalance seen. Symptoms may include weight change, tiredness, or mood shifts. Clinician may adjust medication after full thyroid profile.";

    // ------------------ Electrolytes ------------------
    case "NA":
    case "K":
    case "CL":
    case "CAL":
    case "MG":
    case "PHOS":
      return "Electrolyte imbalance — hydrate sensibly and review any medicines like diuretics. Severe symptoms require urgent evaluation.";

    // ------------------ CBC ------------------
    case "HB":
      return lo
        ? "Low hemoglobin — likely anemia. Take iron-rich foods (green vegetables, jaggery, dal, beetroot) and get checked for iron/B12 deficiency."
        : "High Hb — often due to dehydration or smoking; occasionally due to high altitude or lung issues.";

    case "PLT":
      return lo
        ? "Low platelets — avoid injury, alcohol, and painkillers like ibuprofen. Recheck level if symptoms."
        : "High platelets — may increase clot risk; clinician review advised.";

    case "WBC":
      return hi 
        ? "High WBC — suggests infection or inflammation. Monitor fever/cough/urine symptoms."
        : "Low WBC — immunity is weak; avoid infections and consult clinician.";

    // ------------------ Urine ------------------
    case "U_PROT":
      return "Protein in urine — can be due to dehydration, exercise, or kidney strain. Recheck first-morning sample.";
    case "U_GLU":
      return "Sugar in urine — check blood glucose levels for diabetes.";
    case "U_KET":
      return "Urine ketones — dehydration, long fasting, or uncontrolled diabetes. Drink water and avoid skipping meals.";
    case "U_BLD":
      return "Blood in urine — could be stone or infection. Needs evaluation.";
    case "U_LEU":
    case "U_NIT":
      return "Signs of UTI — drink more water and see clinician if symptoms (burning, fever).";

    // ------------------ Cardiac Markers ------------------
    case "TROP_I":
      return "High troponin — may indicate heart muscle injury. This is an emergency — seek urgent care.";
    case "CKMB":
      return "High CK-MB — possible heart injury. Urgent evaluation advised.";
    case "NT_PROBNP":
      return hi
        ? "High NT-proBNP — indicates heart strain or heart failure. Needs clinician evaluation."
        : "Normal level — reassuring.";

    // ------------------ Infection Markers ------------------
    case "CRP":
      return hi
        ? "High CRP — indicates inflammation or infection. Monitor symptoms and seek medical review."
        : "";

    case "ESR":
      return hi
        ? "High ESR — suggests long-standing inflammation. Correlate clinically."
        : "";

    case "PCT":
      return hi
        ? "High procalcitonin — suggests bacterial infection. Needs clinician review."
        : "";

    case "DDIMER":
      return hi
        ? "High D-dimer — may indicate clotting activity. If breathlessness or chest pain → urgent care needed."
        : "";

    default:
      return "Test is outside common patterns — please correlate with symptoms and consult a clinician.";
  }
}
