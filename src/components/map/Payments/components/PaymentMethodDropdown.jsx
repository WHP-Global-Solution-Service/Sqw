import React from "react";
import { useTranslation } from "react-i18next";

export default function PaymentMethodDropdown({
  value,
  options = [],
  onChange,
  disabled,
}) {
  const { t } = useTranslation("payment");

  return (
    <div className="pm-list">
      {options.map((o) => {
        const active = o.key === value;

        return (
          <button
            key={o.key}
            type="button"
            disabled={disabled}
            className={`pm-card ${active ? "is-active" : ""}`}
            onClick={() => onChange(o.key)}
          >
            <div className="pm-card-left">
              <div className="pm-card-title">
                {t(`method.${o.key}`)}
              </div>

              <div className="pm-card-desc">
                {t(`note.${o.key}`, { defaultValue: "" })}
              </div>
            </div>

            <div className="pm-card-check">
              {active && "✓"}
            </div>
          </button>
        );
      })}
    </div>
  );
}