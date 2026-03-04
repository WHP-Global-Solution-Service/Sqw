import React from "react";
import { useTranslation } from "react-i18next";
import "../../css/MapToolsMenu.css";

export default function MapToolsMenu({
  open,
  onClose,
  onOpenTools,
  showDrawing,
  drawMode,
  showEiaToggle,
  currentMode,
  onToggleDrawMode,
  onStartDrawing,
  onFinishDrawing,
  onClearDrawing,
  currentRole,
  pageMode,
  onUndoDrawing,
  onRedoDrawing,
}) {
  const { t } = useTranslation("map");
  const rootRef = React.useRef(null);
  const finishingRef = React.useRef(false);
  const DRAWABLE_MODES = ["buy","sell","eia"];
  const canDraw =
  ["landlord", "agent", "admin"].includes(currentRole) && showDrawing;

  /* ---------- safe wrapper ---------- */
  const safe = React.useCallback(
    fn => () => {
      fn?.();
      onClose?.();
    },
    [onClose]
  );

  /* ---------- ESC close ---------- */
  React.useEffect(() => {
    if (!open) return;

    const handler = e => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!drawMode) {
      finishingRef.current = false;
    }
  }, [drawMode]);

  /* ---------- click outside close ---------- */
  React.useEffect(() => {
    if (!open) return;

    const handleClick = e => {
      if (rootRef.current && !rootRef.current.contains(e.target))
        onClose?.();
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  /* ---------- finish handler ---------- */
  const handleFinish = () => {
    if (!drawMode || finishingRef.current) return;
    finishingRef.current = true;
    onFinishDrawing?.();
    onClose?.();
  };

  const handleStart = React.useCallback(() => {
    if (!canDraw) return;
    onStartDrawing?.();
    onClose?.();
  }, [canDraw, onStartDrawing, onClose]);

  /* ❗ condition ต้องอยู่ตรงนี้ */
  if (!open) return null;

  return (
    <div
      ref={rootRef}
      className="mtm-pop"
      role="dialog"
      aria-modal="true"
      aria-label="Map tools menu"
    >
      <div className="mtm-bar">

        {/* LEFT */}
        <div className="mtm-section">
          <span className="mtm-icon material-symbols-outlined nav-blue">
            navigation
          </span>

          <div className="mtm-text">
            <div className="mtm-sub">{t("draw")}</div>
            
          </div>
        </div>


        {/* MODE TOGGLE */}
        {showEiaToggle && (
          <div className="mtm-section">
            <button
              className={`mtm-chip ${currentMode === "eia" ? "is-eia" : ""}`}
              onClick={onToggleDrawMode}
            >
              <span className="material-symbols-outlined">swap_horiz</span>
              {currentMode === "eia" ? t("eiaMode") : t("normalMode")}
            </button>
          </div>
        )}


        {/* ACTIONS */}
        {showDrawing && (
          <div className="mtm-section">

            <button
              className="mtm-iconBtn"
              disabled={!canDraw}
              onClick={handleStart}
            >
              <span className="material-symbols-outlined">
                play_arrow
              </span>
            </button>

            <button
              className="mtm-iconBtn danger"
              disabled={!canDraw}
              onClick={canDraw ? safe(onClearDrawing) : undefined}
            >
              <span className="material-symbols-outlined">
                delete
              </span>
            </button>

            <div className="mtm-section right-actions">

              {/* Cancel */}
              <button
                className="mtm-btn ghost"
                onClick={onClose}
              >
                ยกเลิก
              </button>

              {/* Save */}
              <button
                className="mtm-btn primary"
                disabled={!drawMode || !canDraw}
                onClick={handleFinish}
              >
                <span className="material-symbols-outlined">check</span>
                บันทึกที่ดิน
              </button>

            </div>


          </div>
        )}

      </div>
    </div>
  );
}