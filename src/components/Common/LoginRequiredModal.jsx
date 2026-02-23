import React from "react";
import "../../css/LoginRequiredModal.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // นำเข้า hook

export default function LoginRequiredModal({ open, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation("common"); // เรียกใช้งาน t

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon">
          <span className="material-symbols-outlined">lock</span>
        </div>

        <h2>{t("authModal.title")}</h2>
        <p>{t("authModal.description")}</p>

        <button
          className="modal-primary"
          onClick={() => navigate("/login")}
        >
          {t("authModal.loginBtn")}
        </button>

        <button className="modal-secondary" onClick={onClose}>
          {t("authModal.cancelBtn")}
        </button>
      </div>
    </div>
  );
}