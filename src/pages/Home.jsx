import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { extractTextFromFile } from "../utils/extractTextFromFile";
import { aiParseLabReport } from "../utils/aiParser";
import { TEST_EXPLAIN } from "../utils/explanations";
import { adviceFor } from "../utils/riskAdvice";
import { uploadReportFile, saveReportRow, saveReportValues, listReports } from "../services/reportService";
import { CODE_MAP } from "../utils/codeMap";
import "../styles/Home.css";

import { generateFinalSummary } from "../utils/generateFinalSummary";
import { generateDietPlan } from "../utils/generateDietPlan";
import { generatePriorityFlags } from "../utils/priorityLogic";
import PriorityFlags from "../components/PriorityFlags";

export default function Home() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [recent, setRecent] = useState([]);
  const [showAll, setShowAll] = useState(false);
  

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
    

    listReports().then(r => setRecent(r || [])).catch(() => {});
  }, []);

  async function handleAnalyze() {
    if (!file) return setError("Choose a file first.");
    
    setBusy(true);
    setError("");
    setResult(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please log in first.");

      const text = await extractTextFromFile(file);

      // AI Parsing
      const { parsed } = await aiParseLabReport(text);

      if (!parsed) throw new Error("Unable to extract test values.");

      // EXPLANATIONS & ADVICE
      const summary = Object.fromEntries(
        Object.entries(parsed).map(([code, o]) => {
          const short = CODE_MAP[o.label?.toUpperCase()] || o.code || code;
          return [
            code,
            {
              explanation: TEST_EXPLAIN[short] || "—",
              advice: adviceFor(short, o.flag),
            }
          ];
        })
      );

      // AI Insights
      const finalSummary = await generateFinalSummary(parsed);
      const dietPlan = generateDietPlan(parsed);

      // Upload + Save
      const storagePath = await uploadReportFile(user.id, file);

      const row = await saveReportRow({
        userId: user.id,
        file,
        storagePath,
        extractedText: text,
        parsed,
        summary,
        finalSummary,
        dietPlan
      });

      await saveReportValues({ reportId: row.id, userId: user.id, parsed });

      setResult({
        parsed,
        summary,
        id: row.id,
        finalSummary,
        dietPlan
      });

      listReports().then(r => setRecent(r || []));

    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to analyze");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="homeA-wrap">
      <div className="upload-row card">
        <div className="upload-left">
          <h1>Upload & Analyze Report</h1>
          <p className="muted">Supported: PDF, JPG, PNG, WEBP, TXT</p>
        </div>

        <div className="upload-right">
          <label className="upload-box">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <span>{file ? file.name : "Choose a report file"}</span>
          </label>

          <div className="upload-actions">
            <button className="btn primary" onClick={handleAnalyze} disabled={busy || !file}>
              {busy ? "Analyzing..." : "Analyze"}
            </button>
            <button className="btn ghost" onClick={() => {
              setFile(null);
              setResult(null);
              setError("");
            }}>
              Clear
            </button>
          </div>

          {error && <div className="err">{error}</div>}
        </div>
      </div>

      {/* GRID */}
      <div className="grid-2-col">

        {/* LEFT COLUMN */}
        <div className="left-col">

          {result && (
            <div className="card summary-card">
              <h2>Overall Summary</h2>
              <p className="summary-text">{result.finalSummary}</p>
            </div>
          )}

          {/* TABLE */}
          <div className="card table-card">
            <h2>Parsed Tests</h2>

            {result ? (
              <div className="table-box">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Test</th>
                      <th>Value</th>
                      <th>Unit</th>
                      <th>Ref</th>
                      <th>Status</th>
                      <th>Advice</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(result.parsed).map(([code, o]) => (
                      <tr key={code}>
                        <td>{o.label}</td>
                        <td>{o.value}</td>
                        <td>{o.unit}</td>
                        <td>{o.refLow || ""}{o.refLow && " - "}{o.refHigh || ""}</td>
                        <td className={`status-cell ${o.flag?.toLowerCase()}`}>
                          {(o.flag || "NORMAL").toUpperCase()}
                        </td>
                        <td className="advice-cell">{result.summary[code].advice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="muted">Analyze a report to see parsed test table here.</p>
            )}
          </div>

          {/* RECENT REPORTS */}
          <div className="card recent-card">
            <h2>Recent Reports</h2>

            <div className="recent-list">
              {recent.length === 0 && <p className="muted">No reports yet</p>}

              {(showAll ? recent : recent.slice(0, 3)).map(r => (
                <a key={r.id} className="recent-link" href={`/report/${r.id}`}>
                  <div className="recent-date">{new Date(r.created_at).toLocaleDateString()}</div>
                  <div className="recent-name">{r.file_name}</div>
                </a>
              ))}

              {recent.length > 3 && (
                <button className="btn ghost small" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Hide" : "View All"}
                </button>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN → DIET + FLAGS */}
        <div className="right-col">

          {/* DIET */}
          {result && (
            <div className="card diet-card">
              <h3>Recommended Diet Plan</h3>
              {result.dietPlan.map((b, i) => (
                <div key={i} className="diet-block">
                  <div className="diet-title">🍽 {b.title}</div>
                  <ul>{b.items.map((it, j) => <li key={j}>• {it}</li>)}</ul>
                </div>
              ))}
            </div>
          )}

      
          {result && (
            <div className="card priority-card">
              <h3>Health Priority Flags</h3>
              <PriorityFlags flags={generatePriorityFlags(result.parsed)} />
            </div>
          )}

          {!result && (
            <div className="card help-card">
              <h3>How it works</h3>
              <ol>
                <li>Upload report</li>
                <li>AI extracts + parses tests</li>
                <li>You get summary, diet & health flags</li>
              </ol>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
