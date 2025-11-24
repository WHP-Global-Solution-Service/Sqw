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
  runTransaction,
  onDisconnect,
  remove,
} from "firebase/database";

// Ensure a minimal user profile exists so inbox/rooms list can surface
export async function ensureUserProfile(uid, displayName = "") {
  if (!uid) return;
  try {
    const pRef = ref(db, `users/${uid}/profile`);
    const snap = await get(pRef);
    if (!snap.exists()) {
      await update(pRef, {
        name: displayName || `User-${String(uid).slice(0, 6)}`,
        joinedAt: serverTimestamp(),
      });
    }
  } catch (e) {
    console.warn('ensureUserProfile failed', e);
  }
}


/* ========================
   Firebase Config 
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
  try {
    // register onDisconnect handler first so it is guaranteed even if the client dies
    try {
      onDisconnect(sref).update({
        online: false,
        lastSeen: serverTimestamp(),
      });
    } catch (e) {
      console.debug('updateOnlineStatus: onDisconnect setup failed', e);
    }

    await update(sref, {
      uid,
      online: true,
      lastSeen: serverTimestamp(),
      ...payload, // { name: "..." } เป็นต้น
    });

    console.log('updateOnlineStatus: wrote presence for', uid, payload || {});
  } catch (e) {
    console.error('updateOnlineStatus failed for', uid, e);
    throw e;
  }
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
    try { console.log('subscribeOnlineUsers: presence snapshot keys=', Object.keys(obj || {}).length); } catch (err) { console.debug('subscribeOnlineUsers: keys log failed', err); }
    const now = Date.now();
    const STALE_MS = 60 * 1000; // ถ้าเงียบเกิน 60s ถือว่า stale

    let vals = [];
    try {
      vals = Array.isArray(obj) ? obj.filter(Boolean) : Object.values(obj || {});
    } catch (e) {
      vals = [];
    }

    const list = vals.filter((u) => {
      if (!u) return false;
      // lastSeen may be server timestamp (number) or missing; handle defensively
      const last = typeof u.lastSeen === "number" ? u.lastSeen : 0;
      const fresh = last ? now - last < STALE_MS : false; // if unknown timestamp, don't assume fresh
      return u && u.online === true && fresh;
    });
    try { console.log('subscribeOnlineUsers: online count=', list.length); } catch (err) { console.debug('subscribeOnlineUsers: count log failed', err); }

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
  if (!fromUid) throw new Error("sendChatMessage: ต้องระบุ fromUid");

  const a = fromUid;
  const b = toUid;

  const myPath = ref(db, `privateChats/${a}/${b}/messages`);
  const theirPath = ref(db, `privateChats/${b}/${a}/messages`);

  const payload = {
    text: String(text || ""),
    fromUid: a,
    fromName: fromName || `User-${String(a).slice(0, 6)}`,
    createdAt: serverTimestamp(),
    readBy: { [a]: true }, // คนส่งอ่านแล้ว
  };

  // บันทึกทั้งสองฝั่ง (ให้ทั้งคู่เห็นห้องของตัวเอง)
  try {
    const p1 = await push(myPath, payload);
    await push(theirPath, payload);

    // Update inbox summary for recipient and ensure sender inbox exists
    try {
      const now = Date.now();
      // bump recipient unread count atomically
      const inboxRef = ref(db, `users/${b}/inbox/${a}`);
      await runTransaction(inboxRef, (cur) => {
        if (cur == null) {
          return {
            otherUid: a,
            otherName: payload.fromName,
            lastText: payload.text,
            lastAt: now,
            unreadCount: 1,
          };
        }
        return {
          ...cur,
          otherUid: a,
          otherName: cur.otherName || payload.fromName,
          lastText: payload.text,
          lastAt: now,
          unreadCount: (cur.unreadCount || 0) + 1,
        };
      });

      // write/update sender's inbox summary (unread 0)
      const myInboxRef = ref(db, `users/${a}/inbox/${b}`);
      await update(myInboxRef, {
        otherUid: b,
        otherName: `User-${String(b).slice(0, 6)}`,
        lastText: payload.text,
        lastAt: now,
        unreadCount: 0,
      });
    } catch (e) {
      console.warn('sendChatMessage: inbox update failed', e);
    }

    console.log('sendChatMessage: pushed', { from: a, to: b, key: p1.key });
    return { ok: true, key: p1.key };
  } catch (e) {
    console.error('sendChatMessage failed', e, { from: a, to: b, payload });
    throw e;
  }
}

// ฟังข้อความห้อง 1-1 (ชื่อฟังก์ชันเดิม)
export function subscribeChat(myUid, otherUid, cb) {
  if (!myUid || !otherUid) {
    console.warn('subscribeChat: missing uid', { myUid, otherUid });
    return () => { };
  }
  const path = `privateChats/${myUid}/${otherUid}/messages`;
  const msgsRef = ref(db, path);
  console.debug('subscribeChat: subscribing to', path);
  return onValue(msgsRef, (snap) => {
    try {
      const data = snap.val() || {};
      const list = Object.entries(data).map(([id, v]) => ({ id, ...v }));
      list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
      console.debug(`subscribeChat: got ${list.length} messages for ${myUid}/${otherUid}`);
      cb(list);
    } catch (e) {
      console.error('subscribeChat: failed processing snapshot', e, { myUid, otherUid, snap: snap.val() });
      cb([]);
    }
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
  try {
    // clear unread count in my inbox entry for this conversation
    await update(ref(db, `users/${myUid}/inbox/${otherUid}`), { unreadCount: 0 });
  } catch (e) {
    console.warn('markMessagesAsRead: clear inbox unread failed', e);
  }
}

// รายการห้อง (แบบง่าย) = ใช้ presence เป็น candidate
export function subscribeP2PChatRooms(myUid, cb) {
  if (!myUid) return () => { };
  const inboxRef = ref(db, `users/${myUid}/inbox`);
  // helper to build rooms from privateChats (fallback)
  const buildFromPrivateChats = async () => {
    try {
      const pcSnap = await get(ref(db, `privateChats/${myUid}`));
      const pcObj = pcSnap.val() || {};
      // recursively find other UIDs that have a messages child
      const found = new Set();
      const walk = (obj, keyPath = []) => {
        if (!obj || typeof obj !== 'object') return;
        Object.keys(obj).forEach((k) => {
          const v = obj[k];
          const path = keyPath.concat(k);
          if (k === 'messages') {
            // parent of 'messages' is the otherUid
            if (path.length >= 1) {
              const otherUid = path[path.length - 2] || path[path.length - 1];
              if (otherUid) found.add(otherUid);
            }
          }
          if (v && typeof v === 'object') walk(v, path);
        });
      };
      walk(pcObj, [String(myUid)]);

      const otherUids = Array.from(found);
      // read presence/profile for names
      const presSnap = await get(ref(db, `presence`));
      const presObj = presSnap.val() || {};
      const list = otherUids.map((otherUid) => {
        const pres = presObj[otherUid] || {};
        return {
          roomId: `${myUid}_${otherUid}`,
          otherUid,
          otherName: pres.name || `User-${String(otherUid).slice(0, 6)}`,
          unreadCount: 0,
          lastText: "",
          lastAt: 0,
        };
      });
      console.debug('subscribeP2PChatRooms: fallback built rooms from privateChats', { myUid, otherUids });
      cb(list);
    } catch (e) {
      console.warn('subscribeP2PChatRooms fallback build failed', e);
      cb([]);
    }
  };

  return onValue(inboxRef, async (snap) => {
    const obj = snap.val() || {};
    const keys = Object.keys(obj || {});
    if (!keys.length) {
      // fallback to privateChats keys + presence names
      buildFromPrivateChats();
      return;
    }

    const list = keys.map((otherUid) => {
      const v = obj[otherUid] || {};
      return {
        roomId: `${myUid}_${otherUid}`,
        otherUid,
        otherName: v.otherName || `User-${String(otherUid).slice(0, 6)}`,
        unreadCount: v.unreadCount || 0,
        lastText: v.lastText || "",
        lastAt: v.lastAt || 0,
      };
    });
    // sort by lastAt desc
    list.sort((a, b) => (b.lastAt || 0) - (a.lastAt || 0));
    cb(list);
  });
}

// ========================
// LANDS (ที่ดิน)
// ========================

export async function saveLand(uid, landData) {
  if (!uid) throw new Error("saveLand: need uid");
  const now = serverTimestamp();

  const payload = {
    ...landData,
    ownerUid: uid,
    updatedAt: now,
  };

  if (landData.id) {
    await update(ref(db, `lands/${uid}/${landData.id}`), payload);
    await update(ref(db, `landsPublic/${landData.id}`), payload);
    return landData.id;
  } else {
    const newRef = push(ref(db, `lands/${uid}`));
    const id = newRef.key;
    const newPayload = {
      ...payload,
      id,
      createdAt: now,
    };
    await update(newRef, newPayload);
    await update(ref(db, `landsPublic/${id}`), newPayload);
    return id;
  }
}

export async function deleteLand(uid, landId) {
  if (!uid || !landId) throw new Error("deleteLand: need uid & landId");
  await remove(ref(db, `lands/${uid}/${landId}`));
  await remove(ref(db, `landsPublic/${landId}`));
}

// subscribe รวมทุกแปลง
export function subscribeLandsAll(cb) {
  const landsRef = ref(db, `landsPublic`);
  return onValue(landsRef, (snap) => {
    const obj = snap.val() || {};
    const list = Object.entries(obj).map(([id, v]) => ({ id, ...v }));
    cb(list);
  });
}


export function subscribeLands(uid, cb) {
  if (!uid) return () => { };
  const landsRef = ref(db, `lands/${uid}`);
  return onValue(landsRef, (snap) => {
    const obj = snap.val() || {};
    const list = Object.entries(obj).map(([id, v]) => ({ id, ...v }));
    cb(list);
  });
}

// ========================
// FLOOD ZONES (น้ำท่วม)
// ========================
export async function saveFloodZone(uid, zone) {
  if (!uid) throw new Error("saveFloodZone: need uid");
  const now = serverTimestamp();

  const payload = {
    ...zone,                 // { level, waterAmount, geometry, location? }
    ownerUid: uid,
    updatedAt: now,
  };

  if (zone.id) {
    await update(ref(db, `floods/${uid}/${zone.id}`), payload);
    await update(ref(db, `floodZonesPublic/${zone.id}`), payload);
    return zone.id;
  } else {
    const newRef = push(ref(db, `floods/${uid}`));
    const id = newRef.key;
    const data = { ...payload, id, createdAt: now };
    await update(newRef, data);
    await update(ref(db, `floodZonesPublic/${id}`), data);
    return id;
  }
}

export async function deleteFloodZone(ownerUid, zoneId) {
  if (!ownerUid || !zoneId) throw new Error("deleteFloodZone: need ownerUid & zoneId");
  await remove(ref(db, `floods/${ownerUid}/${zoneId}`));
  await remove(ref(db, `floodZonesPublic/${zoneId}`));
}

export function subscribeFloodZonesAll(cb) {
  const zRef = ref(db, `floodZonesPublic`);
  return onValue(zRef, (snap) => {
    const obj = snap.val() || {};
    const list = Object.entries(obj).map(([id, v]) => ({ id, ...v }));
    cb(list);
  });
}


export { app, analytics, auth, db };
