export const QUOTA_LIMIT = 10;

export const ALL_UNLOCK_KEYS = [
  "contactOwner",
  "broker",
  "phone",
  "line",
  "frame",
  "chanote",
  "chat"            // ✅ เพิ่มตรงนี้
];

export const ALL_UNLOCK_ITEMS = [
  { k: "contactOwner", label: "เจ้าของ", price: 50, icon: "👤" },
  { k: "broker", label: "นายหน้า", price: 50, icon: "🧑‍💼" },
  { k: "phone", label: "เบอร์โทร", price: 200, icon: "📞" },
  { k: "line", label: "LINE ID", price: 150, icon: "💬" },
  { k: "frame", label: "กรอบที่ดิน", price: 100, icon: "🗺️" },
  { k: "chanote", label: "โฉนด/ระวาง", price: 200, icon: "📄" },

  // ⭐ เพิ่มอันนี้
  { k: "chat", label: "แชทผู้ขาย", price: 100, icon: "💬" },
];