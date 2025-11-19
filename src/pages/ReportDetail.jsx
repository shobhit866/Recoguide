import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReportById } from "../services/reportService";
import dayjs from "dayjs";
import "../styles/reportDetail.css";

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [showExtracted, setShowExtracted] = useState(false);

  // Load Single Report
  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const r = await getReportById(id);
        setReport(r);
      } catch (e) {
        console.error("Error loading report:", e);
      }
    }

    load();
  }, [id]);

  if (!report) {
    return (
      <div className="rd-page">
        <div className="rd-loading card">Loading report…</div>
      </div>
    );
  }

  // Convert parsed object to array safely
  const params = report.parsed ? Object.values(report.parsed) : [];

  // Safe getter for fields
  function getField(p, key, fallback = "") {
    return p && p[key] !== undefined ? p[key] : fallback;
  }

  return (
    <div className="rd-page">

      {/* ---------- HEADER ---------- */}
      <div className="rd-header card">
        <div className="rd-header-left">
          <h1 className="rd-title">Report Details</h1>

          <div className="rd-meta">
            <div className="rd-file">{report.file_name}</div>
            <div className="rd-date">
              {dayjs(report.created_at).format("DD MMM YYYY, HH:mm")}
            </div>
          </div>
        </div>

        <div className="rd-actions">
          <Link to="/dashboard" className="btn ghost">← Back</Link>
          {report.download_url ? (
            <a className="btn" href={report.download_url} download>
              Download
            </a>
          ) : (
            <button className="btn ghost">No File</button>
          )}
        </div>
      </div>

      {/* ---------- QUICK SUMMARY ---------- */}
      <div className="rd-summary card">
        <h2>Quick Summary</h2>

        <div className="rd-summary-grid">
          {params.length === 0 ? (
            <div className="no-data">No parsed values available.</div>
          ) : (
            (() => {
              // Identify abnormal values first
              const abnormal = params.filter((p) => {
                const s = (p.status || p.flag || "normal").toLowerCase();
                return s === "high" || s === "low";
              });

              const normal = params.filter((p) => !abnormal.includes(p));

              const featured = [
                ...abnormal.slice(0, 4),
                ...normal.slice(0, Math.max(0, 4 - abnormal.length)),
              ];

              return featured.map((p, idx) => {
                const label = getField(p, "label", getField(p, "test", "Unknown"));
                const value = getField(p, "value", "");
                const unit = getField(p, "unit", "");
                const ref = getField(p, "ref", getField(p, "reference", ""));
                const statusRaw = (getField(p, "status", getField(p, "flag", "normal")) || "").toLowerCase();

                const status =
                  statusRaw.includes("high") || statusRaw === "h"
                    ? "high"
                    : statusRaw.includes("low") || statusRaw === "l"
                    ? "low"
                    : "normal";

                return (
                  <div key={idx} className="summary-pill">
                    <div className="pill-left">
                      <div className="pill-label">{label}</div>
                      <div className="pill-ref">{ref}</div>
                    </div>

                    <div className="pill-right">
                      <div className="pill-value">{value}{unit}</div>
                      <div className={`pill-status ${status}`}>{status.toUpperCase()}</div>
                    </div>
                  </div>
                );
              });
            })()
          )}
        </div>
      </div>

      {/* ---------- PARAMETER CARDS ---------- */}
      <div className="rd-params-grid">
        {params.length === 0 ? (
          <div className="card no-data">No parameter data found.</div>
        ) : (
          params.map((p, i) => {
            const label = getField(p, "label", getField(p, "test", `Param ${i+1}`));
            const value = getField(p, "value", "");
            const unit = getField(p, "unit", "");
            const ref = getField(p, "ref", getField(p, "reference", ""));
            const meaning = getField(p, "meaning", getField(p, "description", ""));
            const advice = getField(p, "advice", "");

            let statusRaw = (getField(p, "status", getField(p, "flag", "normal")) || "").toLowerCase();
            let status =
              statusRaw.includes("high") || statusRaw === "h"
                ? "high"
                : statusRaw.includes("low") || statusRaw === "l"
                ? "low"
                : "normal";

            return (
              <div className="rd-param-card card" key={i}>
                <div className="rd-param-header">
                  <div>
                    <div className="param-label">{label}</div>
                    <div className="param-ref">Ref: {ref || "—"}</div>
                  </div>

                  <div className="param-meta">
                    <div className="param-value">{value}{unit}</div>
                    <div className={`status-badge ${status}`}>
                      {status.toUpperCase()}
                    </div>
                  </div>
                </div>

                {meaning && (
                  <div className="param-meaning">
                    <strong>Meaning:</strong> {meaning}
                  </div>
                )}

                {advice && (
                  <div className="param-advice">
                    <strong>Advice:</strong> {advice}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ---------- EXTRACTED TEXT ---------- */}
      <div className="rd-extracted card">
        <div className="extracted-head">
          <h3>Extracted Text</h3>
          <button
            className="btn ghost small"
            onClick={() => setShowExtracted((s) => !s)}
          >
            {showExtracted ? "Hide" : "Show"}
          </button>
        </div>

        {showExtracted ? (
          <pre className="extracted-body">
            {report.extracted_text || "No extracted text available."}
          </pre>
        ) : (
          <p className="text-muted">
            Raw OCR text hidden. Click Show to view.
          </p>
        )}
      </div>
    </div>
  );
}
