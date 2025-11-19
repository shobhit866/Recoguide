// src/utils/generateDietPlan.js

export function generateDietPlan(parsed) {

  const highSugar = Object.values(parsed).some(o => o.label.includes("Glucose") || o.label.includes("HbA1c"));
  const lipidHigh = Object.values(parsed).some(o => o.label.includes("LDL") || o.label.includes("Triglyceride"));
  const anemia = Object.values(parsed).some(o => o.label.includes("Hemoglobin") && o.flag === "low");

  let blocks = [];

  if (highSugar) {
    blocks.push({
      title:"Blood Sugar Control",
      items:[
        "Roti → multigrain / jawar / bajra",
        "Avoid sugary drinks / sweets",
        "Walk 20–30 min after meals",
        "Add salads before lunch & dinner"
      ]
    });
  }

  if (lipidHigh) {
    blocks.push({
      title:"Cholesterol / Lipids",
      items:[
        "Avoid deep fried food",
        "Use mustard / olive oil",
        "Add oats + sprouts breakfast 3 days/week",
        "Walnut / flaxseed daily 1 tablespoon"
      ]
    });
  }

  if (anemia) {
    blocks.push({
      title:"Iron Improvement",
      items:[
        "Spinach / beetroot / jaggery",
        "Add lemon with meals (Vitamin-C improves iron)",
        "Avoid tea immediately after food"
      ]
    });
  }

  if (blocks.length === 0) {
    blocks.push({
      title:"General Healthy Diet",
      items:[
        "2-3 L water daily",
        "Plenty fruits / vegetables",
        "Limit junk food",
        "Light walk after meals"
      ]
    });
  }

  return blocks;
}
