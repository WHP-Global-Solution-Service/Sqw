import React from "react";

export default function MembershipGateModal({
  open,
  onClose,
  onContinueFree,
  onUpgrade
}) {
  if (!open) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <h2>ยกระดับการจัดการที่ดินของคุณ</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div style={{display:"flex",gap:16,marginTop:16}}>

          <div style={cardStyle}>
            <h3>ผู้ใช้งานทั่วไป</h3>
            <p>ปลดล็อกข้อมูลแบบชำระครั้งต่อครั้ง</p>
            <button onClick={onContinueFree}>
              เริ่มใช้งานฟรี
            </button>
          </div>

          <div style={{...cardStyle,border:"2px solid #118e44"}}>
            <h3>สมาชิกพรีเมียม 💎</h3>
            <p>ดูข้อมูลได้มากกว่า และใช้งานไม่จำกัด</p>
            <button onClick={onUpgrade}>
              สมัครสมาชิกเลย
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position:"fixed",
  inset:0,
  background:"rgba(0,0,0,.35)",
  display:"grid",
  placeItems:"center",
  zIndex:1000000
};

const modalStyle = {
  width:700,
  background:"#fff",
  borderRadius:20,
  padding:24,
  boxShadow:"0 20px 60px rgba(0,0,0,.25)"
};

const cardStyle = {
  flex:1,
  border:"1px solid #eee",
  borderRadius:16,
  padding:16
};