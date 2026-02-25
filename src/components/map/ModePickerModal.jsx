import React from "react";
import "../../css/mode-picker.css";

export default function ModePickerModal({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="mode-overlay">
      <div className="mode-card">

        <h2>เลือกโหมดการใช้งาน</h2>
        <p>กรุณาเลือกโหมดที่ตรงกับความต้องการของคุณมากที่สุด</p>
        <p>เพื่อสัมผัสประสบการณ์ที่ออกแบบมาให้คุณโดยเฉพาะ</p>

        <div className="mode-grid">

          <button onClick={() => onSelect("buy")}>
            <div className="icon buy">
              <span
                className="material-symbols-outlined"
                style={{ color:"#1E3A8A" }}
                >
                handshake
              </span>
            </div>
            <b>ซื้อขาย</b>
            <span>ค้นหาที่ดินซื้อขาย</span>
          </button>

          <button onClick={() => onSelect("sell")}>
            <div className="icon sell">
              <span 
                className="material-symbols-outlined"
                style={{ color: "#0D9488" }}
                >real_estate_agent
              </span>
            </div>
            <b>ขายฝาก</b>
            <span>วิเคราะห์การลงทุน</span>
          </button>

          <button onClick={() => onSelect("eia")}>
            <div className="icon eia">
              <span 
                className="material-symbols-outlined"
                style={{ color: "#D97706" }}
                >description
              </span>
            </div>
            <b>EIA</b>
            <span>ตรวจสอบโครงการ</span>
          </button>

        </div>

      </div>
    </div>
  );
}