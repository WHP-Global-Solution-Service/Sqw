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
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

// อ่านโปรไฟล์ผู้ใช้แบบครั้งเดียว (ไม่ subscribe)
export async function getUserProfile(uid) {
  if (!uid) return null;
  try {
    const pRef = ref(db, `users/${uid}/profile`);
    const snap = await get(pRef);
    return snap.exists() ? snap.val() : null;
  } catch (e) {
    console.warn('getUserProfile failed', e);
    return null;
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
const storage = getStorage(app);

/* ========================
   AUTH
   ======================== */
export function onAuthChanged(cb) {
  return onAuthStateChanged(auth, cb);
}

// Upload a Blob to Firebase Storage and return { url, path }
export async function uploadBlob(blob, path) {
  if (!blob || !path) throw new Error('uploadBlob: missing blob or path');
  try {
    const sref = storageRef(storage, path);
    await uploadBytes(sref, blob);
    const url = await getDownloadURL(sref);
    return { url, path };
  } catch (e) {
    console.error('uploadBlob failed', e, { path });
    throw e;
  }
}

// Delete a file in storage by path
export async function deleteStorageFile(path) {
  if (!path) return;
  try {
    const sref = storageRef(storage, path);
    await deleteObject(sref);
  } catch (e) {
    console.warn('deleteStorageFile failed', e, { path });
  }
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  // ใช้ popup สำหรับทุก device
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
}

// ไม่จำเป็นต้องใช้ redirect แล้ว
export async function checkRedirectResult() {
  return null;
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
      // ต้อง online === true เท่านั้น (ถ้า false หรือ undefined = offline)
      if (u.online !== true) return false;
      // lastSeen may be server timestamp (number) or missing; handle defensively
      const last = typeof u.lastSeen === "number" ? u.lastSeen : 0;
      const fresh = last ? now - last < STALE_MS : false; // if unknown timestamp, don't assume fresh
      return fresh;
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

    // ดึงชื่อจาก presence เพื่อให้แสดงชื่อจริงเสมอ
    let presObj = {};
    try {
      const presSnap = await get(ref(db, `presence`));
      presObj = presSnap.val() || {};
    } catch (e) {
      console.debug('Failed to fetch presence for names', e);
    }

    const list = keys.map((otherUid) => {
      const v = obj[otherUid] || {};
      const pres = presObj[otherUid] || {};
      // ใช้ชื่อจาก presence ก่อน ถ้าไม่มีค่อยใช้จาก inbox
      const realName = pres.name || v.otherName;
      return {
        roomId: `${myUid}_${otherUid}`,
        otherUid,
        otherName: realName || `User-${String(otherUid).slice(0, 6)}`,
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

// ลบการสนทนากับ user คนนั้นๆ (ลบจากฝั่งตัวเองเท่านั้น)
export async function deleteChatRoom(myUid, otherUid) {
  if (!myUid || !otherUid) throw new Error("deleteChatRoom: ต้องระบุ myUid และ otherUid");
  try {
    // ลบข้อความในห้องแชท (ฝั่งตัวเอง)
    await remove(ref(db, `privateChats/${myUid}/${otherUid}`));
    // ลบจาก inbox
    await remove(ref(db, `users/${myUid}/inbox/${otherUid}`));
    console.log('deleteChatRoom: deleted chat with', otherUid);
    return { ok: true };
  } catch (e) {
    console.error('deleteChatRoom failed', e);
    throw e;
  }
}

// ========================
// LANDS (ที่ดิน)
// ========================

export async function saveLand(uid, landData) {
  if (!uid) throw new Error("saveLand: need uid");
  try {
    console.log('firebase.saveLand: called', { uid, id: landData?.id, size: landData?.size, hasGeometry: !!landData?.geometry, images: (landData?.images || []).length });
  } catch (e) { /* ignore logging errors */ }
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
// EIA PROJECTS
// ========================
export async function saveEiaProject(uid, projectData) {
  if (!uid) throw new Error("saveEiaProject: need uid");
  const now = serverTimestamp();

  const payload = {
    ...projectData,
    ownerUid: uid,
    updatedAt: now,
  };

  if (projectData.id) {
    await update(ref(db, `eiaProjects/${uid}/${projectData.id}`), payload);
    await update(ref(db, `eiaProjectsPublic/${projectData.id}`), payload);
    return projectData.id;
  } else {
    const newRef = push(ref(db, `eiaProjects/${uid}`));
    const id = newRef.key;
    const newPayload = {
      ...payload,
      id,
      createdAt: now,
    };
    await update(newRef, newPayload);
    await update(ref(db, `eiaProjectsPublic/${id}`), newPayload);
    return id;
  }
}

export async function deleteEiaProject(uid, projectId) {
  if (!uid || !projectId) throw new Error("deleteEiaProject: need uid & projectId");
  await remove(ref(db, `eiaProjects/${uid}/${projectId}`));
  await remove(ref(db, `eiaProjectsPublic/${projectId}`));
}

export function subscribeEiaProjectsAll(cb) {
  const projectsRef = ref(db, `eiaProjectsPublic`);
  return onValue(projectsRef, (snap) => {
    const obj = snap.val() || {};
    const list = Object.entries(obj).map(([id, v]) => ({ id, ...v }));
    cb(list);
  });
}

/* ========================
   DAILY VISITORS TRACKING
   ======================== */
// Get today's date key in format YYYY-MM-DD
function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Record a visitor for today (called once per session)
export async function recordDailyVisitor(uid = null) {
  const todayKey = getTodayKey();
  const visitorId = uid || `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  try {
    // Store visitor in today's visitors list
    const visitorRef = ref(db, `dailyVisitors/${todayKey}/visitors/${visitorId}`);
    await update(visitorRef, {
      visitedAt: serverTimestamp(),
      uid: uid || null,
    });

    // Increment the counter using transaction
    const countRef = ref(db, `dailyVisitors/${todayKey}/count`);
    await runTransaction(countRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });
  } catch (e) {
    console.warn('recordDailyVisitor failed', e);
  }
}

// Record unique visitor (only counts once per uid per day)
export async function recordUniqueVisitor(uid) {
  if (!uid) return;
  const todayKey = getTodayKey();

  try {
    // Check if this user already visited today
    const visitorRef = ref(db, `dailyVisitors/${todayKey}/uniqueVisitors/${uid}`);
    const snap = await get(visitorRef);

    if (!snap.exists()) {
      // First visit today - record it
      await update(visitorRef, {
        visitedAt: serverTimestamp(),
      });

      // Increment unique counter
      const countRef = ref(db, `dailyVisitors/${todayKey}/uniqueCount`);
      await runTransaction(countRef, (currentCount) => {
        return (currentCount || 0) + 1;
      });
    }
  } catch (e) {
    console.warn('recordUniqueVisitor failed', e);
  }
}

// Subscribe to daily visitor count (realtime)
export function subscribeDailyVisitors(cb) {
  const todayKey = getTodayKey();
  const countRef = ref(db, `dailyVisitors/${todayKey}`);

  return onValue(countRef, (snap) => {
    const data = snap.val() || {};
    cb({
      date: todayKey,
      uniqueCount: data.uniqueCount || 0,
      totalCount: data.count || 0,
    });
  });
}

// Subscribe to all-time total visitors (รวมทุกวัน)
export function subscribeAllTimeVisitors(cb) {
  const countRef = ref(db, 'stats/allTimeVisitors');

  return onValue(countRef, (snap) => {
    const count = snap.val() || 0;
    cb(count);
  });
}

// Record all-time visitor (เพิ่มยอดรวมทั้งหมด - เรียกทุกครั้งที่ login)
export async function recordAllTimeVisitor() {
  try {
    const countRef = ref(db, 'stats/allTimeVisitors');
    await runTransaction(countRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });
  } catch (e) {
    console.warn('recordAllTimeVisitor failed', e);
  }
}

/* ========================
   VISITOR LOG (Admin)
   ======================== */

// Record visitor login (เก็บ log เมื่อเข้าสู่ระบบ)
export async function recordVisitorLogin(uid, displayName) {
  if (!uid) return null;
  const todayKey = getTodayKey();
  const sessionId = `${uid}_${Date.now()}`;

  try {
    const logRef = ref(db, `visitorLogs/${todayKey}/${sessionId}`);
    await update(logRef, {
      uid,
      displayName: displayName || 'Unknown',
      loginAt: serverTimestamp(),
      logoutAt: null,
      duration: null,
      status: 'online',
    });
    return sessionId;
  } catch (e) {
    console.warn('recordVisitorLogin failed', e);
    return null;
  }
}

// Update visitor logout (อัพเดท log เมื่อออกจากระบบ)
export async function recordVisitorLogout(sessionId) {
  if (!sessionId) return;
  const todayKey = getTodayKey();

  try {
    const logRef = ref(db, `visitorLogs/${todayKey}/${sessionId}`);
    const snap = await get(logRef);

    if (snap.exists()) {
      const data = snap.val();
      const loginAt = data.loginAt;
      const now = Date.now();
      const duration = loginAt ? Math.floor((now - loginAt) / 1000) : 0; // duration in seconds

      await update(logRef, {
        logoutAt: serverTimestamp(),
        duration,
        status: 'offline',
      });
    }
  } catch (e) {
    console.warn('recordVisitorLogout failed', e);
  }
}

// Set up onDisconnect to auto-update logout when browser closes
export async function setupVisitorDisconnect(sessionId) {
  if (!sessionId) return;
  const todayKey = getTodayKey();

  try {
    const logRef = ref(db, `visitorLogs/${todayKey}/${sessionId}`);
    await onDisconnect(logRef).update({
      logoutAt: serverTimestamp(),
      status: 'offline',
    });
  } catch (e) {
    console.warn('setupVisitorDisconnect failed', e);
  }
}

// Subscribe to visitor logs (realtime) - สำหรับ admin
export function subscribeVisitorLogs(date, cb) {
  const dateKey = date || getTodayKey();
  const logsRef = ref(db, `visitorLogs/${dateKey}`);

  return onValue(logsRef, (snap) => {
    const data = snap.val() || {};
    const logs = Object.entries(data).map(([sessionId, log]) => ({
      sessionId,
      ...log,
    }));
    // เรียงตาม loginAt ล่าสุดก่อน
    logs.sort((a, b) => (b.loginAt || 0) - (a.loginAt || 0));
    cb(logs);
  });
}

// Get available log dates (for admin to select)
export async function getVisitorLogDates() {
  try {
    const logsRef = ref(db, 'visitorLogs');
    const snap = await get(logsRef);
    if (!snap.exists()) return [];

    const dates = Object.keys(snap.val());
    dates.sort((a, b) => b.localeCompare(a)); // ล่าสุดก่อน
    return dates;
  } catch (e) {
    console.warn('getVisitorLogDates failed', e);
    return [];
  }
}

// ===== Force Logout Functions (Admin) =====

// Admin สั่งให้ user ถูก force logout
export async function forceLogoutUser(uid) {
  if (!uid) return false;
  try {
    console.log('forceLogoutUser: starting for uid:', uid);

    // 1. ส่ง signal ให้ client logout
    const forceLogoutRef = ref(db, `forceLogout/${uid}`);
    await update(forceLogoutRef, {
      timestamp: serverTimestamp(),
      reason: 'admin_forced',
    });
    console.log('forceLogoutUser: forceLogout flag set');

    // 2. อัพเดท presence ให้เป็น offline ทันที (รายชื่อ P2P Chat)
    const presenceRef = ref(db, `presence/${uid}`);
    await update(presenceRef, {
      online: false,
      lastSeen: serverTimestamp(),
      forceLogout: true,
    });
    console.log('forceLogoutUser: presence updated to offline');

    // 3. อัพเดท visitorLogs ให้เป็น offline ทันที (Admin Panel)
    const todayKey = getTodayKey();
    const logsRef = ref(db, `visitorLogs/${todayKey}`);
    const snap = await get(logsRef);

    if (snap.exists()) {
      const logs = snap.val();
      // หา session ของ user นี้ที่ยัง online อยู่
      for (const [sessId, log] of Object.entries(logs)) {
        if (log.uid === uid && log.status === 'online') {
          const logRef = ref(db, `visitorLogs/${todayKey}/${sessId}`);
          const now = Date.now();
          const duration = log.loginAt ? Math.floor((now - log.loginAt) / 1000) : 0;
          await update(logRef, {
            logoutAt: serverTimestamp(),
            duration,
            status: 'offline',
            forceLogout: true,
          });
          console.log('forceLogoutUser: visitorLog updated for session:', sessId);
        }
      }
    }

    console.log('forceLogoutUser: completed successfully');
    return true;
  } catch (e) {
    console.error('forceLogoutUser failed', e);
    return false;
  }
}

// Subscribe เพื่อรับคำสั่ง force logout (ผู้ใช้ subscribe นี้)
export function subscribeForceLogout(uid, cb) {
  if (!uid) return () => { };
  const forceLogoutRef = ref(db, `forceLogout/${uid}`);
  return onValue(forceLogoutRef, (snap) => {
    if (snap.exists()) {
      cb(snap.val());
    }
  });
}

// ลบ flag force logout หลังจาก user logout แล้ว
export async function clearForceLogoutFlag(uid) {
  if (!uid) return;
  try {
    const forceLogoutRef = ref(db, `forceLogout/${uid}`);
    await remove(forceLogoutRef);
  } catch (e) {
    console.warn('clearForceLogoutFlag failed', e);
  }
}

// Admin สั่งให้ทุกคน (ยกเว้นตัวเอง) ถูก force logout
export async function forceLogoutAllUsers(exceptUid) {
  try {
    const dateKey = getTodayKey();
    const logsRef = ref(db, `visitorLogs/${dateKey}`);
    const snap = await get(logsRef);

    if (!snap.exists()) return { success: true, count: 0 };

    const logs = snap.val();
    const onlineUsers = [];

    // หา user ที่ออนไลน์อยู่ (ยกเว้นตัวเอง)
    for (const [, log] of Object.entries(logs)) {
      if (log.status === 'online' && log.uid && log.uid !== exceptUid) {
        onlineUsers.push(log.uid);
      }
    }

    // ลบ duplicate uid
    const uniqueUids = [...new Set(onlineUsers)];

    // สั่ง force logout ทุกคน
    for (const uid of uniqueUids) {
      await forceLogoutUser(uid);
    }

    return { success: true, count: uniqueUids.length };
  } catch (e) {
    console.warn('forceLogoutAllUsers failed', e);
    return { success: false, count: 0 };
  }
}

// ===== Heartbeat & Version Control =====

// อัพเดท heartbeat ของ user (เรียกทุก 30 วินาที)
export async function updateHeartbeat(sessionId) {
  if (!sessionId) return false;
  const todayKey = getTodayKey();

  try {
    const logRef = ref(db, `visitorLogs/${todayKey}/${sessionId}`);
    await update(logRef, {
      lastHeartbeat: Date.now(),
      status: 'online',
    });
    return true;
  } catch (e) {
    console.debug('updateHeartbeat error:', e);
    return false;
  }
}

// Subscribe app version (บังคับ reload เมื่อมี version ใหม่)
export function subscribeAppVersion(currentVersion, onNewVersion) {
  try {
    const versionRef = ref(db, 'config/appVersion');

    return onValue(versionRef, (snap) => {
      if (!snap.exists()) return;

      const data = snap.val();
      const serverVersion = data?.version || '1.0.0';
      const forceReload = data?.forceReload || false;

      console.log('App version check:', { currentVersion, serverVersion, forceReload });

      // ถ้า version ไม่ตรง หรือมี flag forceReload
      if (serverVersion !== currentVersion || forceReload) {
        if (typeof onNewVersion === 'function') {
          onNewVersion(serverVersion, forceReload);
        }
      }
    });
  } catch (e) {
    console.error('subscribeAppVersion setup error:', e);
    return () => { };
  }
}

// ตั้งค่า app version (เรียกจาก Admin)
export async function setAppVersion(version, forceReload = false) {
  try {
    const versionRef = ref(db, 'config/appVersion');
    await update(versionRef, {
      version: version,
      forceReload: forceReload,
      updatedAt: Date.now(),
    });
    return true;
  } catch (e) {
    console.error('setAppVersion error:', e);
    return false;
  }
}

// ล้าง forceReload flag หลังจาก reload แล้ว
export async function clearForceReloadFlag() {
  try {
    const versionRef = ref(db, 'config/appVersion');
    await update(versionRef, {
      forceReload: false,
    });
    return true;
  } catch (e) {
    console.error('clearForceReloadFlag error:', e);
    return false;
  }
}

// ล้าง users ที่ไม่มี heartbeat เกิน 2 นาที (เรียกจาก Admin)
export async function cleanupStaleUsers() {
  try {
    const todayKey = getTodayKey();
    const logsRef = ref(db, `visitorLogs/${todayKey}`);
    const snap = await get(logsRef);

    if (!snap.exists()) return { success: true, count: 0 };

    const logs = snap.val();
    const staleThreshold = Date.now() - (2 * 60 * 1000); // 2 นาที
    let count = 0;
    const processedUids = new Set();

    for (const [sessId, log] of Object.entries(logs)) {
      if (log.status === 'online') {
        const lastHeartbeat = log.lastHeartbeat || log.loginAt || 0;

        // ถ้าไม่มี heartbeat เกิน 2 นาที → ถือว่า offline
        if (lastHeartbeat < staleThreshold) {
          // อัพเดท visitorLogs
          const logRef = ref(db, `visitorLogs/${todayKey}/${sessId}`);
          const logoutTime = lastHeartbeat || Date.now();
          const loginAt = log.loginAt || logoutTime;
          const duration = Math.floor((logoutTime - loginAt) / 1000);

          await update(logRef, {
            status: 'offline',
            logoutAt: logoutTime,
            duration: duration,
            staleLogout: true,
          });

          // อัพเดท presence ให้เป็น offline ด้วย (รายชื่อ P2P Chat)
          if (log.uid && !processedUids.has(log.uid)) {
            processedUids.add(log.uid);
            try {
              const presenceRef = ref(db, `presence/${log.uid}`);
              await update(presenceRef, {
                online: false,
                lastSeen: serverTimestamp(),
                staleLogout: true,
              });
            } catch (e) {
              console.debug('cleanupStaleUsers: presence update failed', e);
            }
          }

          count++;
        }
      }
    }

    console.log('cleanupStaleUsers: cleaned', count, 'stale users');
    return { success: true, count };
  } catch (e) {
    console.error('cleanupStaleUsers error:', e);
    return { success: false, count: 0 };
  }
}


export { app, analytics, auth, db };
