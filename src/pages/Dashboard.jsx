// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { listReports, getTrends } from "../services/reportService";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "../styles/dashboard.css";
import { supabase } from "../supabaseClient";

import TrendChart from "../components/TrendChart";
import { CODE_MAP } from "../utils/codeMap";

// Build a map from short code → proper name
const FULL_NAMES = {};
Object.entries(CODE_MAP).forEach(([label, code]) => {
  if (!FULL_NAMES[code]) FULL_NAMES[code] = label;
});

// Unique sorted test keys
const TEST_CODES = Object.keys(FULL_NAMES).sort();

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  const [trend, setTrend] = useState([]);
  const [testCode, setTestCode] = useState("HB");

  // Dropdown open
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    listReports().then(setReports).catch(console.error);
  }, []);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      console.log("USER:", data.user);
    }
    getUser();
  }, []);

  // Load Trend Data on selection
  useEffect(() => {
    getTrends(testCode)
      .then(rows => {
        setTrend(
          rows.map(r => ({
            date: dayjs(r.created_at).format("MMM D"),
            value: Number(r.value),
          }))
        );
      })
      .catch(console.error);
  }, [testCode]);

  return (
    <div className="dashboard-container">

      {/* Title */}
      <h1 className="dashboard-title">Dashboard & Trends</h1>

      {/* ===================== CUSTOM DROPDOWN ===================== */}
      <div className="dropdown-container">
        <label>Select Test</label>

        <div
          className="dropdown-box"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <span className="dropdown-text">
            {FULL_NAMES[testCode]} ({testCode})
          </span>
          <span className="dropdown-arrow">{openDropdown ? "▲" : "▼"}</span>
        </div>

        {openDropdown && (
          <div className="dropdown-list">
            {TEST_CODES.map(code => (
              <div
                key={code}
                className="dropdown-item"
                onClick={() => {
                  setTestCode(code);
                  setOpenDropdown(false);
                }}
              >
                <span className="drop-name">{FULL_NAMES[code]}</span>
                <span className="drop-code">({code})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===================== TREND CHART ===================== */}
      <TrendChart trend={trend} testCode={testCode} />

      {/* ===================== REPORTS TABLE ===================== */}
      <h2 className="dashboard-subtitle">Your Reports</h2>

      <div className="reports-table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>File Name</th>
              <th>Highlights</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{dayjs(r.created_at).format("DD MMM YYYY, HH:mm")}</td>

                <td className="report-file">
                  {r.file_name}
                </td>

                <td>
                  {r.parsed
                    ? Object.values(r.parsed)
                        .slice(0, 2)
                        .map((o, i) => (
                          <span key={i} className="highlight-pill">
                            {o.label}: <b>{o.value}{o.unit}</b>
                          </span>
                        ))
                    : <span className="no-data">No parsed data</span>}
                </td>

                <td>
                  <Link className="view-btn" to={`/report/${r.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
