// src/firebase.js
// Firebase v10+ modular SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInAnonymously, // เผื่อยังมีที่เรียกใช้ ensureAnonAuth อยู่
} from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
  get,
  update,
  onDisconnect,
} from "firebase/database";

/* ========================
   Firebase Config (ของคุณ)
   ======================== */
const firebaseConfig = {
  apiKey: "AIzaSyBDdOt1ajdsBOu7tVdcWOm3c_A61yvdytk",
  authDomain: "chattestproject-42024.firebaseapp.com",
  projectId: "chattestproject-42024",
  storageBucket: "chattestproject-42024.firebasestorage.app",
  messagingSenderId: "828044311671",
  appId: "1:828044311671:web:c6fe41d320716830591a72",
  measurementId: "G-6H2BLTSKLW",
  databaseURL:
    "https://chattestproject-42024-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// --- Initialize ---
const app = initializeApp(firebaseConfig);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (_) {
  // analytics อาจใช้ไม่ได้บนบางสภาพแวดล้อม (เช่น http)
}

const auth = getAuth(app);
const db = getDatabase(app);

/* ========================
   AUTH
   ======================== */
export function onAuthChanged(cb) {
  return onAuthStateChanged(auth, cb);
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  // แนะนำให้อัปเดต presence ทันทีด้าน UI หลัง login เสร็จ โดยเรียก updateOnlineStatus()
  return cred.user;
}

export async function loginWithEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function registerWithEmail(email, password, displayName = "") {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }
  return cred.user;
}

// เผื่อโค้ดเดิมยังเรียกใช้ (ถ้าไม่ได้ใช้ ลบ import ออกจากไฟล์อื่นได้)
export function ensureAnonAuth() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          await signInAnonymously(auth);
          return;
        }
        resolve(user.uid);
      } catch (e) {
        reject(e);
      }
    });
  });
}

// ล็อกเอาต์ + เคลียร์ presence
export async function logout() {
  const u = auth.currentUser;
  if (u) {
    await clearOnlineStatus(u.uid);
  }
  await signOut(auth);
}

/* ========================
   PRESENCE (ออนไลน์/ออฟไลน์)
   ======================== */
// อัปเดตสถานะออนไลน์ (เรียกหลัง login หรือเปลี่ยนชื่อ)
export async function updateOnlineStatus(uid, payload = {}) {
  if (!uid) return;
  const sref = ref(db, `presence/${uid}`);
  await update(sref, {
    uid,
    online: true,
    lastSeen: serverTimestamp(),
    ...payload, // { name: "..." } เป็นต้น
  });

  // ถ้าแท็บถูกปิด/เน็ตหลุด ให้ mark offline อัตโนมัติ
  onDisconnect(sref).update({
    online: false,
    lastSeen: serverTimestamp(),
  });
}

// ออกจากระบบจริง ๆ → mark offline
export async function clearOnlineStatus(uid) {
  if (!uid) return;
  const sref = ref(db, `presence/${uid}`);
  await update(sref, {
    online: false,
    lastSeen: serverTimestamp(),
  });
}

// ฟังรายชื่อคนออนไลน์แบบ realtime
export function subscribeOnlineUsers(cb) {
  const pRef = ref(db, "presence");
  return onValue(pRef, (snap) => {
    const obj = snap.val() || {};
    const now = Date.now();
    const STALE_MS = 60 * 1000; // ถ้าเงียบเกิน 60s ถือว่า stale

    const list = Object.values(obj).filter((u) => {
      const last =
        typeof u.lastSeen === "number" ? u.lastSeen : 0;
      const fresh = last ? now - last < STALE_MS : true;
      return u && u.online === true && fresh;
    });

    cb(list);
  });
}

/* ========================
   P2P CHAT (1-1)
   โครงสร้าง: privateChats/{userA}/{userB}/messages/{id}
   ======================== */

// ส่งข้อความ 1-1 (ชื่อฟังก์ชันเดิม)
export async function sendChatMessage(text, fromUid, fromName = "", toUid) {
  if (!toUid) throw new Error("sendChatMessage: ต้องระบุ toUid");

  const a = fromUid;
  const b = toUid;

  const myPath = ref(db, `privateChats/${a}/${b}/messages`);
  const theirPath = ref(db, `privateChats/${b}/${a}/messages`);

  const payload = {
    text: String(text || ""),
    fromUid: a,
    fromName: fromName || `User-${a.slice(0, 6)}`,
    createdAt: serverTimestamp(),
    readBy: { [a]: true }, // คนส่งอ่านแล้ว
  };

  // บันทึกทั้งสองฝั่ง (ให้ทั้งคู่เห็นห้องของตัวเอง)
  await push(myPath, payload);
  await push(theirPath, payload);
}

// ฟังข้อความห้อง 1-1 (ชื่อฟังก์ชันเดิม)
export function subscribeChat(myUid, otherUid, cb) {
  if (!myUid || !otherUid) return () => {};
  const msgsRef = ref(db, `privateChats/${myUid}/${otherUid}/messages`);
  return onValue(msgsRef, (snap) => {
    const data = snap.val() || {};
    const list = Object.entries(data).map(([id, v]) => ({ id, ...v }));
    list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    cb(list);
  });
}

// มาร์คว่า “ฉัน” อ่านแล้ว ทั้งหมดในห้องนี้
export async function markMessagesAsRead(myUid, otherUid) {
  if (!myUid || !otherUid) return;
  const base = `privateChats/${myUid}/${otherUid}/messages`;
  const msgsSnap = await get(ref(db, base));
  const msgs = msgsSnap.val() || {};
  const updates = {};
  Object.keys(msgs).forEach((id) => {
    updates[`${base}/${id}/readBy/${myUid}`] = true;
  });
  if (Object.keys(updates).length) await update(ref(db), updates);
}

// รายการห้อง (แบบง่าย) = ใช้ presence เป็น candidate
export function subscribeP2PChatRooms(myUid, cb) {
  const pRef = ref(db, "presence");
  return onValue(pRef, (snap) => {
    const obj = snap.val() || {};
    const list = Object.values(obj)
      .filter((u) => u.uid && u.uid !== myUid)
      .map((u) => ({
        roomId: `${myUid}_${u.uid}`,
        otherUid: u.uid,
        otherName: u.name || `User-${u.uid.slice(0, 6)}`,
        unreadCount: 0, // ถ้าจะนับจริง แนะนำทำ users/{uid}/inbox/{other} เพิ่ม
        lastText: "",
        lastAt: 0,
      }));
    cb(list);
  });
}

export { app, analytics, auth, db };
