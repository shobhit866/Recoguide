// aiParser.js
export async function aiParseLabReport(rawText) {
  const apiKey = import.meta.env.VITE_OPENAI_KEY;
  if (!apiKey) throw new Error("Missing OpenAI API Key (VITE_OPENAI_KEY)");

  const prompt = `
You are an expert medical data extraction AI.

Extract ALL lab test results from the following report. The report may contain:
- tables
- multi-column layouts
- OCR distortions
- mixed formatting
- abbreviations
- irregular value formatting

Return ONLY valid JSON in this EXACT format:

{
  "parsed": {
    "AUTO_CODE": {
      "label": "",
      "value": "",
      "unit": "",
      "refLow": "",
      "refHigh": "",
      "flag": ""
    }
  }
}

RULES:
- AUTO_CODE must be a short uppercase identifier (HB, FBS, LDL, TSH). If unknown, generate TEST1, TEST2, etc.
- 'label' must contain the full test name (Hemoglobin, WBC Count, etc.)
- Extract ONLY numbers for value, refLow, refHigh.
- 'unit' must contain unit symbols (g/dL, mg/dL, %, x10^3/uL)
- Determine HIGH / LOW / NORMAL based on extracted reference range.
- If reference range is unclear, leave refLow/refHigh empty but still infer HIGH/LOW if possible.
- Do NOT include any explanation or extra text.
- Return strictly JSON with no comments.

Lab Report Text:
-------------------------
${rawText}
-------------------------

Return pure JSON only.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0,
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const json = await response.json();

  let output = json.choices?.[0]?.message?.content?.trim() || "{}";

  try {
    return JSON.parse(output);
  } catch (err) {
    console.error("AI returned invalid JSON:", output);

    // Attempt second correction pass (auto-fix JSON)
    try {
      const fixed = output
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      return JSON.parse(fixed);
    } catch (e2) {
      throw new Error("AI returned invalid JSON format");
    }
  }
}
