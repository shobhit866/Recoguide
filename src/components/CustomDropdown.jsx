import { useState } from "react";
import "../styles/customDropdown.css";

export default function CustomDropdown({ label, items, value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected = items.find((i) => i.code === value);

  return (
    <div className="cd-wrapper">
      <div className="cd-label">{label}</div>

      <div
        className="cd-selected"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected ? selected.label : "Select test"}</span>
        <span className="cd-arrow">▼</span>
      </div>

      {open && (
        <div className="cd-menu">
          {items.map((item) => (
            <div
              key={item.code}
              className="cd-item"
              onClick={() => {
                onChange(item.code);
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
