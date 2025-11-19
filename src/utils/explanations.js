export const TEST_EXPLAIN = {

  // ------------------ CBC / Blood ------------------
  HB: "Hemoglobin measures oxygen-carrying capacity of your blood. Low Hb usually means anemia; high Hb may indicate dehydration or lung-related issues.",
  RBC: "Red blood cells carry oxygen. Low RBC suggests anemia; high RBC may indicate thick blood or chronic hypoxia.",
  WBC: "White blood cells fight infection. High WBC means infection or inflammation; low WBC means weak immunity.",
  NEUT: "Neutrophils fight bacterial infections. High levels suggest bacterial infection or stress.",
  LYMPH: "Lymphocytes fight viral infections. High levels suggest viral illness; low can be due to stress or steroids.",
  EOS: "Eosinophils increase in allergies, asthma, and parasitic infections.",
  MONO: "Monocytes rise in chronic infections or inflammation.",
  BASO: "Basophils are rare cells linked with allergies or thyroid-related conditions.",
  PLT: "Platelets help in blood clotting. Low platelet count increases bleeding risk; high platelets may increase clotting risk.",
  PCV: "Packed Cell Volume indicates blood thickness. High = dehydration; low = anemia.",
  MCV: "Shows size of RBCs. Low MCV = iron deficiency; high MCV = Vitamin B12/Folate deficiency.",
  MCH: "Average hemoglobin per RBC. Low in iron deficiency; high in B12 deficiency.",
  MCHC: "Hemoglobin concentration in RBCs. Low = iron deficiency; high sometimes seen in dehydration.",
  RDW: "Variation in RBC size. High RDW means mixed anemia (iron + B12 deficiency).",

  // ------------------ Sugar / Diabetes ------------------
  FBS: "Fasting blood sugar shows glucose level after overnight fasting. High FBS means prediabetes or diabetes risk.",
  PPBS: "Post-meal sugar level. High PPBS means poor sugar control even if fasting is normal.",
  RBS: "Random blood sugar. A quick indicator of glucose level anytime.",
  HBA1C: "Average sugar of last 3 months. Best indicator of long-term diabetes control.",

  // ------------------ Lipid Profile ------------------
  TC: "Total cholesterol. High levels increase heart disease risk.",
  LDL: "Bad cholesterol. High LDL leads to blockages in heart vessels.",
  HDL: "Good cholesterol. Higher HDL is protective for your heart.",
  TG: "Triglycerides are unhealthy fats. High levels come from sweets, oily food, alcohol.",
  VLDL: "Very low-density lipoproteins — transports triglycerides. High VLDL increases fat-related risks.",
  NON_HDL: "Total bad cholesterol (LDL + VLDL). More accurate for heart risk.",

  // ------------------ Liver (LFT) ------------------
  AST: "AST is a liver enzyme. High AST indicates liver cell injury, alcohol damage, or muscle injury.",
  ALT: "ALT is a highly liver-specific enzyme. High ALT means liver stress or damage.",
  ALP: "ALP rises in bile duct blockage, bone disorders, or liver disease.",
  GGT: "GGT rises due to alcohol use or bile flow obstruction.",
  TBIL: "Total bilirubin — high levels cause jaundice.",
  DBIL: "Direct bilirubin rises in liver or gallbladder blockage.",
  IBIL: "Indirect bilirubin rises in anemia or RBC breakdown.",
  ALB: "Albumin is made by the liver. Low levels mean poor nutrition or chronic illness.",
  GLOB: "Globulins support immunity. High = inflammation; low = low immunity.",
  AGR: "Albumin/Globulin ratio. Helps detect liver or immune issues.",

  // ------------------ Kidney (KFT) ------------------
  CREAT: "Creatinine shows kidney filtration. High creatinine means reduced kidney function.",
  BUN: "Blood urea nitrogen — rises in kidney problems or dehydration.",
  UREA: "Urea shows kidney function and protein breakdown.",
  URIC: "Uric acid — high levels cause gout or kidney stone risk.",
  EGFR: "Estimated kidney function. Low eGFR means chronic kidney disease.",

  // ------------------ Electrolytes ------------------
  NA: "Sodium maintains water balance. Low = dehydration or hormonal issue; high = severe dehydration.",
  K: "Potassium controls heart rhythm. High or low levels can be dangerous.",
  CL: "Chloride helps acid-base balance. Changes usually follow sodium.",
  CAL: "Calcium is essential for bones and nerves. Low = deficiency; high = hormonal issues.",
  MG: "Magnesium controls muscles & nerves. Low Mg causes cramps, weakness.",
  PHOS: "Phosphorus is important for bones. High in kidney disease.",

  // ------------------ Thyroid ------------------
  TSH: "TSH controls thyroid function. High TSH = hypothyroid; low TSH = hyperthyroid.",
  T3: "Active thyroid hormone. Low = hypothyroid; high = hyperthyroid.",
  T4: "Thyroid hormone level. Works with T3 and TSH.",
  FT3: "Free T3 — more accurate measure of active thyroid hormone.",
  FT4: "Free T4 — best indicator of thyroid gland performance.",

  // ------------------ Vitamins & Minerals ------------------
  B12: "Vitamin B12 helps nerve function and blood formation. Low B12 causes weakness, tingling, memory issues.",
  VITD: "Vitamin D supports bones, immunity, hormones. Low levels are extremely common.",
  FERRITIN: "Ferritin shows iron storage. Low = iron deficiency; high = inflammation.",
  IRON: "Iron level in blood. Low = anemia; high = overload.",
  TIBC: "Iron-binding ability. High TIBC = iron deficiency.",
  TRANSFERRIN: "Protein that carries iron. Low = chronic illness.",

  // ------------------ Cardiac Markers ------------------
  TROP_I: "Troponin indicates heart muscle damage. High = possible heart attack.",
  CKMB: "CK-MB rises in heart damage.",
  BNP: "BNP rises in heart failure.",
  HSCRP: "Highly-sensitive CRP — marker of heart inflammation.",

  // ------------------ Infection Markers ------------------
  CRP: "C-reactive protein. High CRP means significant inflammation or infection.",
  ESR: "ESR measures inflammation. High ESR suggests infection or chronic disease.",
  PCT: "Procalcitonin — high in bacterial infections.",
  DENV_IGG: "Indicates past dengue infection.",
  DENV_IGM: "Indicates recent dengue infection.",
  DENV_NS1: "Early dengue infection marker.",
  COVID: "COVID-19 test — positive means active infection.",
  WIDAL: "Typhoid screening test.",
  MAL_PF: "Malaria (Plasmodium falciparum).",
  MAL_PV: "Malaria (Plasmodium vivax).",

  // ------------------ Hormones ------------------
  TESTO: "Testosterone — male hormone controlling strength, libido, and energy.",
  ESTRO: "Estrogen — female hormone for cycle, skin, mood.",
  PROG: "Progesterone — controls menstrual cycle.",
  LH: "Luteinizing hormone — fertility marker.",
  FSH: "Follicle-stimulating hormone — egg/sperm health.",
  PRL: "Prolactin — high levels cause irregular periods, infertility.",
  CORT: "Cortisol — stress hormone.",
  DHEA: "Hormone affecting fertility & energy.",

  // ------------------ Allergy ------------------
  IGE: "IgE shows allergy tendency. High IgE = higher allergy risk."
};
