import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { getMockStatus } from "../mockEngine";

export default function PromptPayQrModal({
  open,
  data,
  status,
  onClose,
  onPaid,
}) {
  const { t } = useTranslation("payment");

  /* ---------- STATE ---------- */
  const [mockStatus,setMockStatus] = useState(status || "PENDING");

  /* ---------- POLLING ---------- */
  useEffect(()=>{
    if(!open || !data) return;

    const timer = setInterval(()=>{
      const s = getMockStatus(data.orderId);
      setMockStatus(s);

      if(s !== "PENDING") clearInterval(timer);
    },1000);

    return ()=> clearInterval(timer);
  },[open,data]);

  if (!open || !data) return null;

  /* ---------- STATUS FLAGS ---------- */
  const isPaid = mockStatus === "PAID";
  const isFailed = mockStatus === "FAILED";
  const isPending = mockStatus === "PENDING";

  /* ---------- RENDER ---------- */
  return createPortal(
    <div className="qr-overlay" onClick={onClose}>
      <div className="qr-panel" onClick={(e)=>e.stopPropagation()}>

        <div className="qr-head">
          <div className="qr-title">{t("promptpay.title")}</div>
          <button className="qr-close" onClick={onClose}>×</button>
        </div>

        <div className="qr-info">
          {t("promptpay.order",{id:data.orderId})}
        </div>

        <div className="qr-box">
          <QRCodeCanvas value={String(data.qrText)} size={220}/>
        </div>

        <div className="qr-amount">
          {Number(data.amount).toLocaleString()} {t("promptpay.amountUnit")}
        </div>

        <div className={`qr-status ${
          isPaid ? "success" :
          isFailed ? "error" : "pending"
        }`}>
          {isPaid
            ? t("promptpay.status.paid")
            : isFailed
            ? t("promptpay.status.failed")
            : t("promptpay.status.pending")}
        </div>

        <div className="qr-actions">
          <button className="btn-outline" onClick={onClose}>
            {t("action.close")}
          </button>

          {isPending && (
            <button className="btn-primary" onClick={onPaid}>
              {t("action.confirmPaid")}
            </button>
          )}
        </div>

      </div>
    </div>,
    document.body
  );
}