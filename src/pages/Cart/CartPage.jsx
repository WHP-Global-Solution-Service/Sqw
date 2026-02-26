import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { clearCart, readCart, removeCartItem } from "../../utils/cartStorage";
import "../../css/CartPage.css";
import { useTranslation } from "react-i18next";
import { PRICE, PAYMENT_METHODS, FIELD_I18N_KEY } from "./constants";
import { applyUnlockFromCartMock } from "./utils/applyUnlockFromCartMock";

/* ---------------- PromptPay Payload ---------------- */
function generatePromptPayPayload(phone, amount) {
  const formatAmount = amount.toFixed(2);

  return `
00020101021129370016A0000006770101110113${phone.length
    .toString()
    .padStart(2, "0")}${phone}
5802TH5303764540${formatAmount.length}${formatAmount}6304
`.replace(/\s+/g, "");
}

function detectBrand(number) {
  const n = number.replace(/\s/g, "");
  if (/^4/.test(n)) return "VISA";
  if (/^5[1-5]/.test(n)) return "MASTERCARD";
  if (/^3[47]/.test(n)) return "AMEX";
  return "";
}

export default function CartPage() {
  const nav = useNavigate();
  const { t } = useTranslation("payment");
  const { t: tCommon } = useTranslation("common");

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => readCart());
  const [paymentMethod, setPaymentMethod] = useState("");

  const [selected, setSelected] = useState(() =>
    new Set(cart.map(it => it.landId))
  );

  const toggleItem = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ---------- CARD FORM ---------- */
  const [cardForm, setCardForm] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  /* ---------- QR ---------- */
  const [previewQr, setPreviewQr] = useState(null);
  const [qrStatus, setQrStatus] = useState("idle");
  const [qrExpire, setQrExpire] = useState(0);

  const total = useMemo(() => {
    return cart.reduce((sum, it) => {

      if(!selected.has(it.landId)) return sum;

      const fields = Array.isArray(it?.selectedFields) ? it.selectedFields : [];
      const s = fields.reduce((x, k) => x + (PRICE[k] || 0), 0);
      return sum + s;

    }, 0);
  }, [cart, selected]);

  const refresh = () => setCart(readCart());

  /* ---------- QR Create ---------- */
  const createQR = () => {
    if (!total) return;
    const payload = generatePromptPayPayload("0812345678", total);
    setPreviewQr(payload);
    setQrStatus("ready");
    setQrExpire(300);
  };

  useEffect(() => {
    if (qrStatus !== "ready") return;

    const timer = setInterval(() => {
      setQrExpire(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setQrStatus("expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [qrStatus]);

  useEffect(() => {
    if (paymentMethod === "promptpay") {
      createQR();
    } else {
      setPreviewQr(null);
      setQrStatus("idle");
    }
  }, [paymentMethod, total]);

  /* ---------- Card Validation ---------- */
  const isCardValid = () => {
    return (
      cardForm.number.replace(/\s/g, "").length === 16 &&
      cardForm.name.length > 3 &&
      cardForm.expiry.length === 5 &&
      cardForm.cvv.length === 3
    );
  };

  const handlePay = () => {
    if (!isCardValid()) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("ชำระเงินสำเร็จ 🎉");
    }, 1500);
  };

  const [slip, setSlip] = useState(null);

  return (
    <div className="ds-container ds-section cart-page">

      <div className="cart-page-header">

        <div className="cart-back">
          <button
            className="back-btn"
            onClick={() => nav("/map?mode=buy")}
          >
            <span className="material-symbols-outlined">
              arrow_back
            </span>
            ย้อนกลับ
          </button>
        </div>

        <div className="cart-page-title">
          <span className="material-symbols-outlined">
            shopping_cart
          </span>
          รายการที่เลือกไว้เพื่อปลดล็อกข้อมูล
        </div>

        <div className="cart-page-sub">
          PromptPay และ QR ใช้ได้เฉพาะรายการที่เลือก
        </div>

      </div>
      <div className="cart-layout">
        <div className="cart-items ds-col ds-gap-4">
          {cart.map(it => {
            const fields = Array.isArray(it?.selectedFields) ? it.selectedFields : [];
            const sub = fields.reduce((sum, k) => sum + (PRICE[k] || 0), 0);

            return (
              <div key={String(it.landId)} className="cart-row">

                {/* LEFT */}
                <div className="cart-row-left">

                  <input
                    type="checkbox"
                    className="cart-check"
                    checked={selected.has(it.landId)}
                    onChange={()=>toggleItem(it.landId)}
                  />

                  <div className="cart-icons">
                    <span className="material-symbols-outlined">
                      description
                    </span>
                  </div>

                  <div className="cart-info">

                    <div className="cart-land">
                      <span className="land-id">
                        #{it.landId}
                      </span>
                    </div>

                    {/* รายการที่เลือก */}
                    <div className="cart-fields-list">

                      {fields.length === 0 && (
                        <div className="cart-empty">ไม่มีข้อมูล</div>
                      )}

                      {fields.map(k => (
                        <div key={k} className="cart-field-item">
                          <span className="material-symbols-outlined cart-field-icon">
                            check_circle
                          </span>

                          {tCommon(FIELD_I18N_KEY[k] || "unknown")}
                        </div>
                      ))}

                    </div>

                    {/* ลิงก์ดูแผนที่ */}
                    <button
                      className="cart-link"
                      onClick={() =>
                        nav(`/map?mode=${it.mode || "buy"}&focus=${it.landId}`)
                      }
                    >
                      ดูตำแหน่งบนแผนที่
                    </button>

                  </div>
                </div>

                {/* RIGHT */}
                <div className="cart-row-right">

                  <div className="cart-date">
                    {it.createdAt
                      ? new Date(it.createdAt).toLocaleDateString("th-TH",{
                          day:"numeric",
                          month:"short",
                          year:"numeric"
                        })
                      : "-"
                    }
                  </div>

                  <div className="cart-price">
                    ฿ {sub.toLocaleString()}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ================= SUMMARY ================= */}
        <aside className="cart-summary">
          <div className="ds-card ds-card-pad cart-summary-box">

            {/* HEADER */}
            <div className="summary-head">

              <div className="summary-title">
                <span className="material-icon">receipt_long</span>
                สรุปรายการ
              </div>

              <div className="summary-badge">
                {selected.size} รายการ
              </div>

            </div>

            {/* TOTAL */}
            <div className="summary-total">
              <div className="summary-total-label">
                <span className="material-icon">payments</span>
                ยอดรวมทั้งหมด
              </div>

              <div className="summary-total-value">
                {total.toLocaleString("th-TH",{minimumFractionDigits:2})} บาท
              </div>
            </div>

            <div className="pm-methods">
              {PAYMENT_METHODS.map(pm => (
                <button
                  key={pm.key}
                  className={`pm-btn ${paymentMethod === pm.key ? "active" : ""}`}
                  onClick={() => setPaymentMethod(pm.key)}
                  type="button"
                >
                  <span className="material-symbols-outlined">
                    {pm.icon}
                  </span>
                  {pm.title}
                </button>
              ))}
            </div>
            {/* ---------- PROMPTPAY ---------- */}
            {paymentMethod === "promptpay" && previewQr && (
              <div className="pm-qr-preview">
                {qrStatus === "expired" && (
                  <div className="pm-qr-overlay">QR หมดอายุ</div>
                )}

                <QRCodeCanvas value={previewQr} size={170} />

                <div className="pm-qr-timer">
                  {qrStatus === "ready"
                    ? `หมดอายุใน ${qrExpire} วินาที`
                    : "กรุณาสร้าง QR ใหม่"}
                </div>

                <button
                  className="pay-main-btn"
                  onClick={createQR}
                >
                  {qrStatus === "ready" ? "รอการสแกน..." : "สร้าง QR ใหม่"}
                </button>
              </div>
            )}

            {/* ---------- CARD ---------- */}
            {paymentMethod === "card" && (
              <>
                <div className="pm-card-ui">

                  {/* NUMBER */}
                  <div className="pm-field">
                    <label>CARD NUMBER</label>

                    <div className="pm-card-number">
                      <input
                        inputMode="numeric"
                        value={cardForm.number}
                        onChange={e=>{
                          let raw=e.target.value.replace(/\D/g,"").slice(0,16)
                          const formatted=raw.replace(/(.{4})/g,"$1 ").trim()
                          setCardForm({...cardForm,number:formatted})
                        }}
                        placeholder="0000 0000 0000 0000"
                      />

                      {cardForm.number &&
                        <span className="pm-brand">
                          {detectBrand(cardForm.number)}
                        </span>
                      }
                    </div>
                  </div>

                  {/* NAME */}
                  <div className="pm-field">
                    <label>NAME ON CARD</label>
                    <input
                      value={cardForm.name}
                      onChange={e=>setCardForm({
                        ...cardForm,
                        name:e.target.value.toUpperCase()
                      })}
                      placeholder="NAME SURNAME"
                    />
                  </div>

                  {/* ROW */}
                  <div className="pm-row">

                    <div className="pm-field">
                      <label>EXPIRY</label>
                      <input
                        inputMode="numeric"
                        value={cardForm.expiry}
                        onChange={e=>{
                          let v=e.target.value.replace(/\D/g,"").slice(0,4)
                          if(v.length>=3)
                            v=v.slice(0,2)+"/"+v.slice(2)
                          setCardForm({...cardForm,expiry:v})
                        }}
                        placeholder="MM/YY"
                      />
                    </div>

                    <div className="pm-field">
                      <label>CVC</label>
                      <input
                        inputMode="numeric"
                        value={cardForm.cvv}
                        onChange={e=>{
                          let raw=e.target.value.replace(/\D/g,"").slice(0,3)
                          setCardForm({...cardForm,cvv:raw})
                        }}
                        placeholder="123"
                      />
                    </div>

                  </div>
                </div>

                {/* PAY */}
                <button
                  className="pay-main-btn"
                  disabled={!isCardValid() || loading}
                  onClick={handlePay}
                >
                  {loading ? "กำลังดำเนินการ..." : "✓ ยืนยันการชำระเงิน"}
                </button>
              </>
            )}

            {/* ---------- BANK ---------- */}
            {paymentMethod === "bank" && (
              <>
                <div className="pm-bank-box">

                  <div className="pm-bank-number">
                    000-000-0000
                  </div>

                  <div className="pm-bank-name">
                    ธนาคารกรุงไทย
                  </div>

                  <label className="pm-slip-upload">
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) setSlip(file);
                      }}
                    />
                    {slip ? slip.name : "อัปโหลดสลิปโอนเงิน"}
                  </label>

                </div>

                <button
                  className="pay-main-btn"
                  disabled={!slip || loading}
                  onClick={handlePay}
                >
                  {loading ? "กำลังตรวจสอบ..." : "ยืนยันการชำระเงิน"}
                </button>
              </>
            )}

          </div>
        </aside>
      </div>
    </div>
  );
}