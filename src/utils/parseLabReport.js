import { CODE_MAP } from "./codeMap";

export function parseLabReport(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  const out = {};

  for (const line of lines) {
    const m = line.match(/^(.+?)\s+(\d+(\.\d+)?)[^\d]+(\d+(\.\d+)?)-(\d+(\.\d+)?)[^\d]*(\S+)$/i);
    if (m) {
      const label = m[1].trim();
      const value = parseFloat(m[2]);
      const refLow = parseFloat(m[4]);
      const refHigh = parseFloat(m[6]);
      let unit = m[8];

      let flag = "normal";
      if (value > refHigh) flag = "high";
      if (value < refLow) flag = "low";

      const mapped = CODE_MAP[label] || label.toUpperCase().replace(/\s+/g,"_");

      out[label] = {
        code: mapped,
        label,
        value,
        unit,
        refLow,
        refHigh,
        flag,
      };
    }
  }

  return out;
}
