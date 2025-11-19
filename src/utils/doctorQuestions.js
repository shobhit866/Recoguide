export async function getDoctorQuestions(reportText) {
  const apiKey = import.meta.env.VITE_OPENAI_KEY;
  if (!apiKey) return [];

  const prompt = `
Given this lab report text:
---
${reportText}
---

Generate **exactly 5** short simple questions a normal Indian patient would ask a doctor.

RULES:
- NO explanation
- NO numbering (no 1. 2. 3.)
- NO sentences before/after array
- Return ONLY pure JSON array.
-provide simple and practical questions in hinglish

CORRECT EXAMPLE:
["Are my hemoglobin levels low?", "Do I need iron supplements?", "Should I change diet?", "Is any follow-up test needed?", "How often should I re-test this?"]
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${apiKey}`
    },
    body:JSON.stringify({
      model:"gpt-4o-mini",   
      messages:[{ role:"user", content:prompt }],
      temperature: 0.2
    })
  });

  const json = await res.json();

  let content = json.choices?.[0]?.message?.content || "";


  const start = content.indexOf("[");
  const end = content.lastIndexOf("]");
  if (start>=0 && end>=0) {
    content = content.slice(start, end+1);
  }

  try {
    return JSON.parse(content);
  } catch(e) {
    console.log("doctorQuestions parse fail:", content);
    return [];
  }
}
