import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";
import "../../../css/PayModal.css";

import { PAYMENT_METHODS, PRICE } from "./constants";
import { buildPromptPayMockQr } from "./utils";

function detectBrand(num){
  const n = num.replace(/\s/g,"");
  if(/^4/.test(n)) return "VISA";
  if(/^5[1-5]/.test(n)) return "MASTERCARD";
  if(/^3[47]/.test(n)) return "AMEX";
  if(/^6/.test(n)) return "DISCOVER";
  return "";
}

export default function PayModal({ open, draft, onClose, dock="center" }){

  const { t } = useTranslation("payment");

  const [paymentMethod,setPaymentMethod]=useState("promptpay");
  const [qrStatus,setQrStatus]=useState("ready");

  const [cardForm,setCardForm]=useState({
    number:"",
    name:"",
    expiry:"",
    cvv:""
  });

  const [errors,setErrors]=useState({});
  const [slip,setSlip]=useState(null);

  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [fail,setFail]=useState(false);

  const landId=draft?.landId ?? "";
  const selectedFields=Array.isArray(draft?.selectedFields)
    ? draft.selectedFields
    : [];
  
  const [qrExpire,setQrExpire] = useState(15)

  /* ================= MOCK API ================= */
  const mockPaymentApi=()=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        Math.random()>0.2 ? resolve() : reject();
      },1500);
    });
  };

  /* ================= RESET ================= */
  useEffect(()=>{
    if(!open) return;

    setPaymentMethod("promptpay");
    setQrStatus("ready");
    setErrors({});
    setSlip(null);
    setLoading(false);
    setSuccess(false);
    setFail(false);

  },[open,landId]);

  /* ================= PRICE ================= */
  const amount=useMemo(()=>{
    return selectedFields.reduce((sum,k)=>{
      if(k==="phone_line") return sum+PRICE.phone+PRICE.line;
      return sum+(PRICE[k]||0);
    },0);
  },[selectedFields]);

  /* ================= PROMPTPAY ================= */
  const previewQr=useMemo(()=>{
    if(paymentMethod!=="promptpay"||!amount) return null;
    return buildPromptPayMockQr(amount);
  },[paymentMethod,amount]);

  /* QR expire + auto success */
  useEffect(()=>{
    if(!previewQr) return;

    const expireTimer=setTimeout(()=>{
      setQrStatus("expired");
    },15000);

    const successTimer=setTimeout(()=>{
      setSuccess(true);
      setTimeout(()=>onClose(),1200);
    },8000);

    return ()=>{
      clearTimeout(expireTimer);
      clearTimeout(successTimer);
    };

  },[previewQr]);

  useEffect(()=>{
    if(paymentMethod!=="promptpay" || !previewQr) return

    setQrExpire(15)
    setQrStatus("ready")

    const interval = setInterval(()=>{
      setQrExpire(prev=>{
        if(prev<=1){
          clearInterval(interval)
          setQrStatus("expired")
          return 0
        }
        return prev-1
      })
    },1000)

    return ()=>clearInterval(interval)

  },[paymentMethod,previewQr])

  /* ================= VALIDATE ================= */
  const validateCard=()=>{
    const e={};
    if(!cardForm.number) e.number="กรุณากรอกหมายเลขบัตร";
    if(!cardForm.name) e.name="กรุณากรอกชื่อบนบัตร";
    if(!cardForm.expiry) e.expiry="กรุณากรอกวันหมดอายุ";
    if(!cardForm.cvv) e.cvv="กรุณากรอก CVV";
    setErrors(e);
    return Object.keys(e).length===0;
  };

  /* ================= HANDLE PAY ================= */
  const handlePay=async()=>{

    if(paymentMethod==="card" && !validateCard()) return;

    if(paymentMethod==="bank" && !slip){
      alert("กรุณาอัปโหลดสลิปก่อน");
      return;
    }

    try{
      setLoading(true);
      setFail(false);

      await mockPaymentApi();

      setSuccess(true);
      setTimeout(()=>onClose(),1200);

    }catch{
      setFail(true);
    }
    finally{
      setLoading(false);
    }
  };

  if(!open||!landId) return null;

  return createPortal(
    <div className={`pay-backdrop ${dock==="left"?"is-left":""}`} onClick={onClose}>
      <div className="pay-card" onClick={e=>e.stopPropagation()}>

        {/* HEADER */}
        <div className="pay-head">
          <div className="pay-title">{t("title")}</div>
          <button className="pay-close" onClick={onClose}>×</button>
        </div>

        <div className="pay-meta">
          {t("landId",{id:landId})}
        </div>

        {/* STATUS */}
        {success && (
          <div className="pm-success">
            ✓ ชำระเงินสำเร็จ
          </div>
        )}

        {fail && (
          <div className="pm-alert">
            <span className="material-symbols-outlined">error</span>
            การชำระเงินล้มเหลว กรุณาลองใหม่
          </div>
        )}

        {/* METHODS */}
        <div className="pm-methods">
          {PAYMENT_METHODS.map(m=>(
            <button
              key={m.key}
              onClick={()=>setPaymentMethod(m.key)}
              className={`pm-method-card ${paymentMethod===m.key?"active":""}`}
            >
              <div className="pm-method-icon">
                <span className="material-symbols-outlined">{m.icon}</span>
              </div>
              <div className="pm-method-label">{m.title}</div>
            </button>
          ))}
        </div>

        {/* PROMPTPAY */}
        {paymentMethod==="promptpay" && previewQr && (
          <>
            <div className="pm-qr-preview">

              {qrStatus==="expired" && (
                <div className="pm-qr-overlay">
                  หมดอายุ
                </div>
              )}

              <QRCodeCanvas value={previewQr} size={160}/>

              <div className="pm-qr-price">
                <span>ยอดชำระทั้งหมด</span>
                <b>{amount.toLocaleString()} บาท</b>
              </div>

              {qrStatus==="ready" && (
                <div style={{marginTop:8,fontSize:12,opacity:.7}}>
                  หมดอายุใน {qrExpire} วินาที
                </div>
              )}

            </div>

            <div className="pay-bottom">
              {qrStatus==="ready" ? (
                <button className="pay-main-btn" disabled>
                  รอการสแกน...
                </button>
              ) : (
                <button 
                  className="pay-main-btn"
                  onClick={()=>setQrStatus("ready")}
                >
                  สร้าง QR ใหม่
                </button>
              )}
            </div>
          </>
        )}

        {/* CARD */}
        {paymentMethod==="card" && (
          <>
            <div className="pm-card-form">

              {/* CARD NUMBER */}
              <div className="pm-input-group">
                <label>CARD NUMBER</label>

                <div className="pm-card-input">
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
                    <span className="pm-card-brand">
                      {detectBrand(cardForm.number)}
                    </span>
                  }
                </div>
              </div>

              {/* NAME */}
              <div className="pm-input-group">
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

              {/* ROW EXP + CVV */}
              <div className="pm-row">

                {/* EXPIRY */}
                <div className="pm-input-group">
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

                {/* CVV */}
                <div className="pm-input-group">
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

            {/* TOTAL */}
            <div className="pm-total-box">
              <span>ยอดชำระทั้งหมด</span>
              <b>{amount.toLocaleString()} บาท</b>
            </div>

            {/* BUTTON */}
            <div className="pay-bottom">
              <button className="pay-main-btn" onClick={handlePay} disabled={loading}>
                {loading?"กำลังดำเนินการ...":"✓ ยืนยันการชำระเงิน"}
              </button>
            </div>
          </>
          )}

        {/* BANK */}
        {paymentMethod==="bank" && (
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
                  onChange={e=>{
                    const file=e.target.files?.[0];
                    if(file) setSlip(file);
                  }}
                />
                {slip ? slip.name : "อัปโหลดสลิปโอนเงิน"}
              </label>

            </div>

            <div className="pm-total-box">
              <span>ยอดชำระทั้งหมด</span>
              <b>{amount.toLocaleString()} บาท</b>
            </div>

            <div className="pay-bottom">
              <button className="pay-main-btn" onClick={handlePay} disabled={loading}>
                {loading?"กำลังตรวจสอบ...":"ยืนยันการชำระเงิน"}
              </button>
            </div>
          </>
        )}

      </div>
    </div>,
    document.body
  );
}