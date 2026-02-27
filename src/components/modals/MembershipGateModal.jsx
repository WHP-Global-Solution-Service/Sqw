import React, { useState } from "react";

const Icon = ({ name }) => (
  <span className="material-symbols-outlined" style={icon}>
    {name}
  </span>
);

export default function MembershipGateModal({
  open,
  onClose,
  onContinueFree,
  onUpgrade
}) {
  const [hovered, setHovered] = useState(null);

  if (!open) return null;

  return (
    <div
      style={overlay}
      onClick={(e)=>{
        if(e.target === e.currentTarget){
          onClose?.();
        }
      }}
    >
      <div style={modal} onClick={(e)=>e.stopPropagation()}>

        {/* HEADER */}
        <div style={header}>
          <div style={headerContent}>
            <h2 style={title}>ยกระดับการจัดการที่ดินของคุณ</h2>
            <p style={subtitle}>
              เลือกแผนที่ใช่เพื่อปลดล็อกศักยภาพการวิเคราะห์ที่ดินอย่างมืออาชีพ
            </p>
          </div>

          <button
            onClick={(e)=>{
              e.stopPropagation();
              onClose?.();
            }}
            style={closeBtn}
          >
            ✕
          </button>
        </div>


        {/* BODY */}
        <div style={cardWrap}>

          {/* FREE */}
          <div
            style={{
              ...card,
              border: hovered === "free"
                ? "2px solid #2563eb"
                : "1px solid #e5e7eb",
              boxShadow: hovered === "free"
                ? "0 10px 25px rgba(37,99,235,.15)"
                : "none"
            }}
            onMouseEnter={() => setHovered("free")}
            onMouseLeave={() => setHovered(null)}
          >
            <h3 style={cardTitle}>ผู้ใช้งานทั่วไป</h3>

            <ul style={list}>
              <li style={li}><Icon name="search"/>ค้นหาตำแหน่งแปลงที่ดินเบื้องต้น</li>
              <li style={li}><Icon name="article"/>อ่านข่าวอสังหาริมทรัพย์ทั่วไป</li>
              <li style={li}><Icon name="paid"/>ปลดล็อกข้อมูลที่ดิน : ชำระค่าบริการรายแปลง</li>
            </ul>

            <button style={outlineBtn} onClick={onContinueFree}>
              เริ่มใช้งานฟรี
            </button>
          </div>


          {/* PREMIUM */}
          <div
            style={{
              ...card,
              border: hovered === "premium"
                ? "2px solid #2563eb"
                : "1px solid #e5e7eb",
              boxShadow: hovered === "premium"
                ? "0 10px 25px rgba(37,99,235,.15)"
                : "none"
            }}
            onMouseEnter={() => setHovered("premium")}
            onMouseLeave={() => setHovered(null)}
          >
            <h3 style={cardTitle}>สมาชิกพรีเมียม 💎</h3>

            <ul style={list}>
              <li style={li}><Icon name="travel_explore"/>20 แปลง/วัน</li>
              <li style={li}><Icon name="auto_awesome"/>ปลดล็อกข้อมูลได้ฟรี 10 แปลง/วัน</li>
              <li style={li}><Icon name="bar_chart"/>ประหยัดค่าใช้จ่ายเมื่อดูข้อมูลจำนวนมาก</li>
            </ul>

            <button style={primaryBtn} onClick={onUpgrade}>
              สมัครสมาชิกเลย
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}


/* ---------- STYLES ---------- */

const overlay = {
  position:"fixed",
  inset:0,
  background:"rgba(0,0,0,.35)",
  display:"grid",
  placeItems:"center",
  zIndex:9999,
  backdropFilter:"blur(4px)"
};

const modal = {
  width:760,
  background:"#fff",
  borderRadius:22,
  boxShadow:"0 30px 80px rgba(0,0,0,.25)",
  overflow:"hidden",
  fontFamily:"sans-serif"
};

const header = {
  position:"relative",
  background:"#dbeafe",
  padding:"26px 24px",
  textAlign:"center"
};

const headerContent = {
  maxWidth:520,
  margin:"0 auto"
};

const closeBtn = {
  position:"absolute",
  top:18,
  right:20,
  border:"none",
  background:"transparent",
  fontSize:22,
  cursor:"pointer",
  color:"#1e3a8a"
};

const title = {
  margin:0,
  fontSize:26,
  fontWeight:700,
  color:"#1e3a8a"
};

const subtitle = {
  margin:"8px 0 0",
  fontSize:14,
  color:"#334155"
};

const cardWrap = {
  display:"flex",
  gap:20,
  padding:24
};

const card = {
  flex:1,
  borderRadius:18,
  padding:20,
  background:"#fafafa",
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between",
  transition:"all .25s ease",
  cursor:"pointer"
};

const cardTitle = {
  margin:0,
  fontSize:18,
  fontWeight:700
};

const list = {
  listStyle:"none",
  padding:0,
  margin:"14px 0 20px",
  lineHeight:1.9,
  fontSize:14
};

const li = {
  display:"flex",
  alignItems:"center",
  gap:8
};

const icon = {
  fontSize:20,
  color:"#1d4ed8"
};

const outlineBtn = {
  padding:"10px 18px",
  borderRadius:999,
  border:"2px solid #1d4ed8",
  background:"white",
  color:"#1d4ed8",
  fontWeight:600,
  cursor:"pointer"
};

const primaryBtn = {
  padding:"12px 18px",
  borderRadius:999,
  border:"none",
  background:"#1d4ed8",
  color:"white",
  fontWeight:700,
  cursor:"pointer",
  boxShadow:"0 6px 14px rgba(29,78,216,.4)"
};
