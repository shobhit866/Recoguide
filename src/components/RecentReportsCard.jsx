// components/RecentReportsCard.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function RecentReportsCard({ userId }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("id, file_name, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error) setReports(data || []);
    };
    fetchReports();
  }, [userId]);

  return (
    <div style={{
      background: "#010334ff",
      borderRadius: 12,
      padding: 15,
      marginTop: 10,
      color: "#fff"
    }}>
      <h3 style={{ marginBottom: 12 }}>Recent Reports</h3>

      {reports.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No reports yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {reports.map((r) => (
            <li key={r.id} style={{ marginBottom: 8 }}>
              <b>{new Date(r.created_at).toLocaleDateString()}</b>
              — {r.file_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
