import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import "../../css/ModeDisclaimerModal.css";

export default function ModeDisclaimerModal({ onClose }) {
  const { t } = useTranslation("common");
  const [step, setStep] = useState("mode"); // "mode" | "pdpa"

  const goNext = () => setStep("pdpa");

  const handleConfirm = () => {
    onClose?.();      // ✅ accept จริง
    setStep("mode"); // reset เผื่อ modal เปิดใหม่
  };

  const handleCancel = () => {
    setStep("mode"); // กลับ step แรก
    // ไม่เรียก onClose → map ไม่ bootstrap
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {step === "mode" && (
          <>
            <div className="modal-icon">
              <WarningAmberIcon fontSize="inherit" />
            </div>

            <p className="modal-text">
              {t("disclaimer.mode.line1")}
              <br />
              {t("disclaimer.mode.line2")}
              <br />
              {t("disclaimer.mode.line3")}
            </p>

            <button className="btn btn-primary" onClick={goNext}>
              {t("disclaimer.mode.confirm")}
            </button>
          </>
        )}

        {step === "pdpa" && (
          <>
            <div className="modal-icon">
              <NotificationsActiveIcon fontSize="inherit" />
            </div>

            <p className="modal-text text-danger">
              {t("disclaimer.pdpa.line1")}
              <br />
              {t("disclaimer.pdpa.line2")}
              <br />
              {t("disclaimer.pdpa.line3")}
            </p>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={handleCancel}>
                {t("disclaimer.pdpa.cancel")}
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                {t("disclaimer.pdpa.confirm")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
