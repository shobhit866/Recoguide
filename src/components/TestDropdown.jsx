import { useState } from "react";
import "../styles/testDropdown.css";

export default function TestDropdown({ selected, setSelected, tests }) {
  const [open, setOpen] = useState(false);

  const current = tests.find(t => t.code === selected);

  return (
    <div className="test-dropdown">
      <div 
        className="dropdown-header"
        onClick={() => setOpen(!open)}
      >
        <span>{current.name} ({current.code})</span>
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="dropdown-menu">
          {tests.map((t) => (
            <div
              key={t.code}
              className="dropdown-item"
              onClick={() => {
                setSelected(t.code);
                setOpen(false);
              }}
            >
              {t.name} <span className="code">({t.code})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
