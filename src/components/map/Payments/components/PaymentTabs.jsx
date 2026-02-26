import React from "react";

export default function PaymentTabs({
  value,
  onChange,
  methods,
  disabled
}) {
  return (
    <div className="pm-tabs">
      {methods.map((m) => {
        const active = value === m.key;

        return (
          <button
            key={m.key}
            type="button"
            disabled={disabled}
            onClick={() => onChange(m.key)}
            className={`pm-tab ${active ? "active" : ""}`}
          >
            <div className="pm-tab-icon">{m.icon}</div>
            <div className="pm-tab-label">{m.title}</div>
          </button>
        );
      })}
    </div>
  );
}