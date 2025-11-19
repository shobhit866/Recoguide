// src/components/TrendChart.jsx
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "../styles/trendChart.css";

export default function TrendChart({ trend = [], testCode = "Test" }) {
  const data = trend.length ? trend : [{ date: "-", value: 0 }];

  return (
    <div className="trend-chart-shell">
      <div className="trend-chart-header">
        <div className="trend-chart-title">{testCode} — recent trend</div>
        <div className="trend-chart-sub">Line + area · animated</div>
      </div>

      <div className="trend-chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 18, left: 6, bottom: 8 }}>
            
            {/* SVG GRADIENTS (DO NOT IMPORT defs) */}
            <defs>
              <linearGradient id="gradStroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#7dd3fc" stopOpacity={1} />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity={1} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={1} />
              </linearGradient>

              <linearGradient id="gradFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.32} />
                <stop offset="60%" stopColor="#60a5fa" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="6 6" />

            <XAxis
              dataKey="date"
              tick={{ fill: "#ffffff", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
            />

            <YAxis
              tick={{ fill: "#ffffff", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
            />

            <Tooltip
              contentStyle={{
                background: "rgba(11,17,25,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#fff",
                borderRadius: 8,
                padding: "8px 12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "#a5b4fc" }}
              itemStyle={{ color: "#fff" }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ color: "#fff", fontSize: 13 }}
              payload={[{ id: "line", value: testCode, type: "line", color: "#fff" }]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#gradStroke)"
              strokeWidth={3}
              fill="url(#gradFill)"
              dot={{ stroke: "#fff", strokeWidth: 1.5, r: 3, fill: "#0b1220" }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
