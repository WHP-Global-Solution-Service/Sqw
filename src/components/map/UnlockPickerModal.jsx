// src/pages/Map/UnlockPickerModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addToCart } from "../../utils/cartStorage";

export default function UnlockPickerModal({
  open,
  //title,
  //subtitle,
  items = [],
  initialSelected = [],
  onCancel,
  onConfirm,
  landId,
}) {
  const nav = useNavigate();
  const [selected, setSelected] = useState([]);
  const PRIMARY = "#053974";
  const PRIMARY_LIGHT = "#e6eef8"; 

  // ✅ bind unlock namespace
  const { t, i18n } = useTranslation("unlock");

  useEffect(() => {
    if (!open) return;
    setSelected(Array.isArray(initialSelected) ? initialSelected : []);
  }, [open, initialSelected]);

  const total = useMemo(() => {
    const set = new Set(selected);
    return (items || []).reduce(
      (sum, it) => (set.has(it.k) ? sum + (it.price || 0) : sum),
      0
    );
  }, [items, selected]);

  if (!open) return null;

  const canAct = !!landId && selected.length > 0;
  const locale = i18n.language === "th" ? "th-TH" : "en-US";

  const getIconBg = (key) => {
    const map = {
      contactOwner: "#e8f0ff",
      broker: "#fff4e6",
      phone: "#ffe8f0",
      line: "#e6f9f0",
      frame: "#eef2ff",
      chanote: "#f3e8ff",
      chat: "#e6f9f0",
    };
    return map[key] || "#f3f4f6";
  };

  const getIconColor = (key) => {
    const map = {
      contactOwner: "#2563eb",
      broker: "#f59e0b",
      phone: "#db2777",
      line: "#16a34a",
      frame: "#4f46e5",
      chanote: "#9333ea",
      chat: "#16a34a",
    };
    return map[key] || "#6b7280";
  };


  return (
    <div
        style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 57, 116, 0.35)",
        zIndex: 1000001,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "calc(var(--nav-height) + 54px)",
        paddingLeft: 16,
        paddingRight: 16,
      }}
      onClick={onCancel}
    >
      <div
          style={{
          width: 680,
          maxWidth: "100%",
          maxHeight: "85vh",
          background: "#fff",
          borderRadius: 18,
          padding: 8 ,
          boxShadow: "0 18px 60px rgba(0,0,0,.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Header ===== */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>
              {t("title")}
            </div>
            {landId ? (
              <div style={{ opacity: 0.6, marginTop: 6, fontSize: 12 }}>
                {t("picker.landId", { id: landId })}
              </div>
            ) : (
              <div style={{ opacity: 0.6, marginTop: 6, fontSize: 12 }}>
                * {t("picker.noLandId")}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCancel?.();
            }}
            aria-label={t("picker.aria.close")}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "#fff",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* ===== Items ===== */}
        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          {(items || []).map((it) => {
            const checked = selected.includes(it.k);

            const toggle = () => {
              setSelected((prev) =>
                prev.includes(it.k)
                  ? prev.filter((x) => x !== it.k)
                  : [...prev, it.k]
              );
            };

            return (
              <label
                key={it.k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 10px",
                  borderRadius: 14,
                  border: checked ? `1px solid ${PRIMARY}` : "1px solid #e8e8e8",
                  background: checked ? PRIMARY_LIGHT : "#fff",
                  cursor: "pointer",
                }}
              >
                {/* ===== LEFT CONTENT ===== */}
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: getIconBg(it.k),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 22,
                        color: getIconColor(it.k),
                      }}
                    >
                      {it.icon}
                    </span>
                  </div>

                  <div>
                    <div style={{ fontWeight: 900 }}>{it.label}</div>
                    <div style={{ opacity: 0.7, fontSize: 13 }}>
                      {(it.price || 0).toLocaleString(locale)}{" "}
                      {t("picker.priceUnit")}
                    </div>
                  </div>
                </div>

                {/* ===== CHECKBOX RIGHT SIDE ===== */}
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={toggle}
                  style={{
                    width: 18,
                    height: 18,
                    accentColor: "rgba(5, 57, 116, 0.35)",
                    cursor: "pointer",
                  }}
                />
              </label>
            );
          })}
        </div>

        {/* ===== Footer ===== */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ fontWeight: 900 }}>
            {t("picker.total", {
              total: total.toLocaleString(locale),
            })}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                height: 40,
                padding: "0 18px",
                borderRadius: 999,
                border: `2px solid ${PRIMARY}`,
                background: "#fff",
                fontWeight: 900,
              }}
            >
              {t("picker.action.cancel")}
            </button>

            <button
              type="button"
              disabled={!canAct}
              onClick={() => {
                if (!canAct) return;
                const r = addToCart({ landId, selectedFields: selected });
                if (r?.ok) nav("/cart");
              }}
              style={{
                height: 40,
                padding: "0 18px",
                borderRadius: 999,
                border: "2px solid rgba(5, 57, 116, 0.35)",
                background: "#fff",
                fontWeight: 900,
                opacity: canAct ? 1 : 0.6,
              }}
            >
              {t("picker.action.addToCart")}
            </button>

            <button
              type="button"
              disabled={!selected.length}
              onClick={() => onConfirm?.({ selected })}
              style={{
                height: 40,
                padding: "0 18px",
                borderRadius: 999,
                border: 0,
                background: PRIMARY,
                color: "#fff",
                fontWeight: 900,
                opacity: selected.length ? 1 : 0.6,
              }}
            >
              {t("picker.action.pay")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
