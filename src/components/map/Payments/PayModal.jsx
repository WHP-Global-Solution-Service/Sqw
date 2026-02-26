import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import "../../../css/PayModal.css";

import { LABEL, PAYMENT_METHODS, PRICE } from "./constants";
import { buildPromptPayMockQr, todayKeyTH } from "./utils";
import PaymentMethodDropdown from "./components/PaymentMethodDropdown";
import PromptPayQrModal from "./components/PromptPayQrModal";
import { createMockPayment } from "./mockEngine";

import { addPurchase } from "../../../utils/purchases";

export default function PayModal({ open, draft, onClose, onPaid, dock = "center" }) {
  const { t } = useTranslation("payment");
  const { t: tCommon } = useTranslation("common");
  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [payStatus, setPayStatus] = useState("PENDING"); // PENDING | PAID | FAILED

  const landId = draft?.landId ?? "";
  const selectedFields = Array.isArray(draft?.selectedFields)
    ? draft.selectedFields
    : [];

  /* =========================
     reset state เมื่อเปิด / เปลี่ยน land
  ========================= */
  useEffect(() => {
    if (!open) return;
    setLoading(false);
    setPaymentMethod("");
    setQrOpen(false);
    setQrData(null);
    setPayStatus("PENDING");
  }, [open, landId]);

  /* =========================
     normalize field (phone_line)
  ========================= */
  const normalizedSelected = useMemo(() => {
    const set = new Set();
    selectedFields.forEach((k) => {
      if (k === "phone_line") {
        set.add("phone");
        set.add("line");
      } else {
        set.add(k);
      }
    });
    return Array.from(set);
  }, [selectedFields]);

  /* =========================
     UI items
  ========================= */
  const itemsUi = useMemo(
    () =>
      normalizedSelected.map((k) => ({
        k,
        label: t(`field.${k}`, LABEL[k] || k),
        price: PRICE[k] || 0,
      })),
    [normalizedSelected, t]
  );

  const amount = useMemo(
    () => itemsUi.reduce((sum, i) => sum + i.price, 0),
    [itemsUi]
  );

  const canPay = Boolean(paymentMethod && amount > 0 && !loading);

  /* =========================
     PAY HANDLER
  ========================= */
  const onPay = async () => {
    if (!paymentMethod) {
      alert(t("alert.selectMethod"));
      return;
    }
    if (!amount) return;

    const orderId = `PM_${todayKeyTH()}_${landId}`;

    // PromptPay → แสดง QR
    if (paymentMethod === "promptpay") {
      setLoading(true);
      setPayStatus("PENDING");

      const qrText = buildPromptPayMockQr(amount);
      createMockPayment(orderId,amount);
      setQrData({ orderId, amount, qrText });

      setQrOpen(true);
      setLoading(false);
      return;
    }

    // Card / Bank (mock)
    alert(t("alert.notReady"));
  };

  if (!open || !landId) return null;

  return createPortal(
    <div className="pay-page">

      {/* LEFT PANEL */}
      <div className="pay-left">

        <div>
          <div className="pay-title">
            {t("section.paymentMethod")} | ChillPayMe
          </div>

          <PaymentMethodDropdown
            value={paymentMethod}
            options={PAYMENT_METHODS.map(m => ({
              ...m,
              label: t(`method.${m.value}`)
            }))}
            onChange={setPaymentMethod}
            disabled={loading}
          />

          <div className="pay-note">
            {paymentMethod === "promptpay"
              ? t("note.promptpay")
              : t("note.redirect")}
          </div>
        </div>

        <div className="pay-bottom">
          <button className="btn-outline" onClick={onClose}>
            {t("action.cancel")}
          </button>

          <button
            className="btn-primary"
            disabled={!canPay}
            onClick={onPay}
          >
            {paymentMethod === "promptpay"
              ? t("action.generateQr")
              : t("action.pay")}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="pay-right">

        <div className="summary-head">
          {t("title")}
        </div>

        <div className="summary-items">
          {itemsUi.map(it => (
            <div key={it.k} className="summary-row">
              <span>{it.label}</span>
              <span>{it.price.toLocaleString()} {t("total.unit")}</span>
            </div>
          ))}
        </div>

        <div className="summary-total">
          <span>{t("total.label")}</span>
          <span>{amount.toLocaleString()} {t("total.unit")}</span>
        </div>

      </div>

      {/* QR MODAL */}
      <PromptPayQrModal
        open={qrOpen}
        data={qrData}
        status={payStatus}
        onClose={() => {
          setQrOpen(false);
          setQrData(null);
          setPayStatus("PENDING");
        }}
        onPaid={() => {
          setPayStatus("PAID");
          setQrOpen(false);

          const paidAt = todayKeyTH();
          const title = t("title");
          const note = itemsUi.map(x => x.label).join(", ");

          addPurchase({
            id: qrData?.orderId || `PM_${paidAt}_${landId}_${Date.now()}`,
            landId,
            title,
            seller: draft?.owner || draft?.seller || "-",
            totalPrice: amount,
            status: "paid",
            paidAt,
            note: note ? `Unlock: ${note}` : "",
            paymentMethod,
          });

          onPaid?.();
          onClose?.();
        }}
      />

    </div>,
    document.body
  );
}
