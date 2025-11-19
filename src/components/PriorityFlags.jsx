// /src/components/PriorityFlags.jsx

import "../styles/priorityFlags.css";

export default function PriorityFlags({ flags }) {
  const { high = [], medium = [], low = [] } = flags || {};

  return (
    <div className="pf-container">

      <div className="pf-section pf-high">
        <h3>🔴 High Priority</h3>
        {high.length === 0 && <p className="pf-empty">No high risk markers</p>}
        {high.map((t, i) => (
          <div key={i} className="pf-item pf-item-high">
            <strong>{t.label}</strong> — {t.flag?.toUpperCase()}
            <div className="pf-value">Value: {t.value} {t.unit}</div>
          </div>
        ))}
      </div>

      <div className="pf-section pf-medium">
        <h3>🟡 Medium Priority</h3>
        {medium.length === 0 && <p className="pf-empty">No medium risk markers</p>}
        {medium.map((t, i) => (
          <div key={i} className="pf-item pf-item-medium">
            <strong>{t.label}</strong> — {t.flag?.toUpperCase()}
            <div className="pf-value">Value: {t.value} {t.unit}</div>
          </div>
        ))}
      </div>

      <div className="pf-section pf-low">
        <h3>🟢 Normal</h3>
        {low.length === 0 && <p className="pf-empty">No normal values</p>}
        {low.map((t, i) => (
          <div key={i} className="pf-item pf-item-low">
            <strong>{t.label}</strong>
            <div className="pf-value">Value: {t.value} {t.unit}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
