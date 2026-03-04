import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./eia-dashboard.css";

function normalizeStatus(raw) {
  if (!raw) return "unknown";
  if (raw === "ผ่าน EIA" || raw === "approved") return "approved";
  if (raw === "รอพิจารณา" || raw === "pending") return "pending";
  return "unknown";
}

function formatInt(n) {
  return Number(n || 0).toLocaleString("th-TH");
}

export default function EiaDashboardStats({ eias = [] }) {

  const { t } = useTranslation("eia");
  const [open, setOpen] = useState(false);

  const stats = useMemo(() => {
    const list = Array.isArray(eias) ? eias : [];

    let approved = 0;
    let pending = 0;

    list.forEach((e) => {
      const status = normalizeStatus(e?.raw?.status || e?.status);
      if (status === "approved") approved += 1;
      if (status === "pending") pending += 1;
    });

    return {
      total: list.length,
      approved,
      pending,
    };
  }, [eias]);

  if (!stats.total) return null;

  return (
    <div className={`dashbar ${open ? "open" : "collapsed"}`}>

      <button
        className="dashToggleFloating"
        onClick={() => setOpen(v => !v)}
      >
        <span>แสดงข้อมูลผลลัพธ์</span>
        <span className={`dashArrow ${open ? "up" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="dashContent">

          <div className="dashcard">
            <div className="dashlabel">โครงการทั้งหมด (โครงการ)</div>
            <div className="dashvalue">{formatInt(stats.total)}</div>
            <div className="dashunit">รายการ</div>
          </div>

          <div className="dashcard">
            <div className="dashlabel">Project Value Total (บาท)</div>
            <div className="dashvalue">{formatInt(stats.approved)}</div>
            <div className="dashunit">บาท</div>
          </div>

          <div className="dashcard">
            <div className="dashlabel">โครงการทั้งหมด (ภาครัฐ)</div>
            <div className="dashvalue">{formatInt(stats.pending)}</div>
            <div className="dashunit">โครงการ</div>
          </div>

          <div className="dashcard">
            <div className="dashlabel">โครงการทั้งหมด (ภาคเอกชน)</div>
            <div className="dashvalue">{formatInt(stats.pending)}</div>
            <div className="dashunit">โครงการ</div>
          </div>

        </div>
      )}

    </div>
  );
}