import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginRequiredModal from "../components/Common/LoginRequiredModal";
import "../css/HeroSection.css";
import { useAuth } from "../auth/AuthProvider";

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const [openModal, setOpenModal] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          {/* ใช้ whitespace-pre-line เพื่อให้ \n ใน JSON ทำงาน */}
          <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
            {t("hero.title")}
          </h1>
          <p className="hero-subtitle">{t("hero.subtitle")}</p>
          <div className="hero-buttons">
            <button
              className="hero-main-btn"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/map");
                } else {
                  setOpenModal(true);
                }
              }}
            >
              {t("hero.bomtom")}
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h3 className="stats-title">{t("stats.title")}</h3>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-symbols-outlined">map</span>
            </div>
            <div className="stat-number">10,000+</div>
            <div className="stat-label">{t("stats.land_plots")}</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-symbols-outlined">description</span>
            </div>
            <div className="stat-number">5,000+</div>
            <div className="stat-label">{t("stats.eia_reports")}</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="stat-number">1 {t("stats.million")}+</div>
            <div className="stat-label">{t("stats.users")}</div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <h2 className="how-title">{t("howItWorks.title")}</h2>
        <p className="how-subtitle">{t("howItWorks.subtitle")}</p>

        <div className="how-steps">
          <div className="how-step">
            <div className="how-icon">
              <span className="material-symbols-outlined">ads_click</span>
            </div>
            <h4>{t("howItWorks.step1.title")}</h4>
            <p>{t("howItWorks.step1.desc")}</p>
          </div>

          <div className="how-step">
            <div className="how-icon">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <h4>{t("howItWorks.step2.title")}</h4>
            <p>{t("howItWorks.step2.desc")}</p>
          </div>

          <div className="how-step">
            <div className="how-icon">
              <span className="material-symbols-outlined">bar_chart_4_bars</span>
            </div>
            <h4>{t("howItWorks.step3.title")}</h4>
            <p>{t("howItWorks.step3.desc")}</p>
          </div>
        </div>
      </section>

      {/* modal ต้องอยู่ใน fragment */}
      <LoginRequiredModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </>
  );
}