export async function generateFinalSummary(parsed) {
  const apiKey = import.meta.env.VITE_OPENAI_KEY;
  if (!apiKey) return "Overall results based on your report need review. (No AI key set)";

  const tests = Object.values(parsed).map(o => ({
    label: o.label, flag: o.flag, value: o.value, unit: o.unit
  }));

  const prompt = `
Tum ek doctor ho.
Patient ko unke test result easy Hinglish me samjhana hai.
Complex medical terms avoid karna.
6-10 sentence ka paragraph banao.
Yeh test data hai:

${JSON.stringify(tests, null, 2)}

Explain:
- overall kya lag raha
- koi red flags? (match with HIGH/LOW)
- kya lifestyle changes helpful honge
- kab follow up karna chahiye
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${apiKey}`
    },
    body:JSON.stringify({
      model:"gpt-3.5-turbo",
      messages:[{ role:"user", content:prompt }]
    })
  });

  const json = await res.json();
  return json.choices?.[0]?.message?.content || "Summary unavailable";
}
