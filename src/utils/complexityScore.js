export async function getComplexityScore(reportText) {
  const apiKey = import.meta.env.VITE_OPENAI_KEY;
  if (!apiKey) return { score: null, explanation: "No OpenAI key set" };

  const prompt = `
You are a medical educator.
Given this medical lab report text, return 2 things in simple JSON only:
1) complexity score from 1 to 10
2) one line explanation why

report:
${reportText}

Return strictly JSON:
{"score": X, "explanation": "..."}
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

  try {
    return JSON.parse(json.choices?.[0]?.message?.content || "{}");
  } catch(e) {
    return { score:null, explanation:"parse error" };
  }
}
