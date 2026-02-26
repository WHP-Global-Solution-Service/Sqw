// src/components/chat/ChatModalMock.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  subscribeOnlineUsers,
  subscribeP2PChatRooms,
  subscribeChat,
  sendChatMessage,
  markMessagesAsRead,
  deleteChatRoom,
  updateUserOnlineStatus,
  setUserOffline,
} from "../../services/chatService.firebase";

export default function ChatModalMock({
  open,
  onClose,
  currentUid,
  userProfile,
  initialPeer,
}) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const endRef = useRef(null);
  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  /* presence */
  useEffect(() => {
    if (!open || !currentUid) return;

    updateUserOnlineStatus(currentUid, {
      name: userProfile?.name || `User-${currentUid.slice(0, 6)}`,
      photoURL: userProfile?.photoURL || "",
    });

    return () => setUserOffline(currentUid);
  }, [open, currentUid, userProfile]);

  /* online users */
  useEffect(() => {
    if (!open) return;
    return subscribeOnlineUsers(setOnlineUsers);
  }, [open]);

  /* inbox */
  useEffect(() => {
    if (!open || !currentUid) return;
    return subscribeP2PChatRooms(currentUid, setChatRooms);
  }, [open, currentUid]);

  /* open peer */
  useEffect(() => {
    if (!open || !initialPeer?.uid) return;
    setSelectedUser(initialPeer);
  }, [open, initialPeer]);

  /* subscribe chat */
  useEffect(() => {
    if (!open || !currentUid || !selectedUser?.uid) return;

    let unsub;
    (async () => {
      unsub = await subscribeChat(
        currentUid,
        userProfile?.name || "",
        selectedUser.uid,
        selectedUser.name || "",
        ({ roomId, messages }) => {
          setRoomId(roomId);
          setMessages(messages);
          requestAnimationFrame(scrollToBottom);
          markMessagesAsRead(currentUid, selectedUser.uid);
        }
      );
    })();

    return () => unsub?.();
  }, [open, currentUid, selectedUser, userProfile?.name]);

  /* send */
  async function onSend() {
    if (!chatInput.trim() || !selectedUser) return;

    await sendChatMessage(
      chatInput,
      currentUid,
      userProfile?.name || `User-${currentUid.slice(0, 6)}`,
      selectedUser.uid,
      selectedUser.name
    );
    setChatInput("");
  }

  /* delete */
  async function onDeleteRoom(room) {
    if (window.confirm("ต้องการลบห้องแชทนี้หรือไม่?")) {
      await deleteChatRoom(currentUid, room.otherUid);
      if (selectedUser?.uid === room.otherUid) {
        setSelectedUser(null);
        setRoomId(null);
        setMessages([]);
      }
    }
  }

  if (!open) return null;

  return (
    <div style={S.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div style={S.modal}>
        {/* header */}
        <div style={S.header}>
          <div style={{ fontWeight: 800 }}>Chat</div>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={S.body}>
          {/* LEFT */}
          <div style={S.left}>
            <div style={S.sectionTitle}>ออนไลน์</div>

            <div style={S.list}>
              {onlineUsers.map((u) => (
                <button
                  key={u.uid}
                  style={S.userRow(selectedUser?.uid === u.uid)}
                  onClick={() => setSelectedUser({ uid: u.uid, name: u.name || "" })}
                >
                  <div style={S.userName}>{u.name}</div>
                  <div style={S.online}>ออนไลน์</div>
                </button>
              ))}
            </div>

            <div style={{ ...S.sectionTitle, marginTop: 20 }}>Inbox</div>

            <div style={S.list}>
              {chatRooms.map((r) => (
                <div key={r.roomId} style={S.roomRowWrap(selectedUser?.uid === r.otherUid)}>
                  <button
                    style={S.roomRowBtn}
                    onClick={() => setSelectedUser({ uid: r.otherUid, name: r.otherName })}
                  >
                    <div style={S.roomTop}>
                      <div style={S.roomName}>{r.otherName}</div>
                      {r.unreadCount > 0 && <span style={S.badge}>{r.unreadCount}</span>}
                    </div>
                    <div style={S.lastMsg}>{r.lastMessage}</div>
                  </button>

                  <button style={S.trashBtn} onClick={() => onDeleteRoom(r)}>🗑</button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={S.right}>
            {!selectedUser ? (
              <div style={S.placeholder}>เลือกคนเพื่อเริ่มคุย</div>
            ) : (
              <>
                {/* chat header */}
                <div style={S.chatHeader}>
                  <div style={S.chatUser}>
                    <div style={S.avatar}/>
                    <div>
                      <div style={S.chatName}>{selectedUser.name}</div>
                      <div style={S.status}>ออนไลน์</div>
                    </div>
                  </div>
                </div>

                {/* messages */}
                <div style={S.messages}>
                  {messages.map((m) => {
                    const mine = m.fromUid === currentUid;
                    return (
                      <div key={m.id} style={S.msgRow(mine)}>
                        <div style={S.bubble(mine)}>
                          <div style={S.sender}>{mine ? "คุณ" : m.fromName}</div>
                          {m.text}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={endRef} />
                </div>

                {/* input */}
                <div style={S.inputBar}>
                  <input
                    style={S.input}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="พิมพ์ข้อความ..."
                    onKeyDown={(e) => e.key === "Enter" && onSend()}
                  />
                  <button style={S.sendBtn} onClick={onSend}>➤</button>
                </div>
              </>
            )}
          </div>
        </div>

        {roomId && <div style={S.footer}>Room: {roomId}</div>}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const S = {
  backdrop:{
    position:"fixed", inset:0, background:"rgba(0,0,0,.35)",
    display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999
  },

  modal:{
    width:"min(900px,92vw)",
    height:"min(560px,80vh)",
    background:"#fff",
    borderRadius:18,
    overflow:"hidden",
    display:"flex",
    flexDirection:"column",
    boxShadow:"0 20px 40px rgba(0,0,0,0.15)"
  },

  header:{
    padding:"12px 18px",
    borderBottom:"1px solid #eee",
    display:"flex",
    justifyContent:"space-between"
  },

  closeBtn:{ border:"none", background:"none", fontSize:18, cursor:"pointer" },

  body:{ flex:1, display:"grid", gridTemplateColumns:"260px 1fr", minHeight:0 },

  left:{
    background:"#f4f7fb",
    padding:12,
    overflowY:"auto",
    borderRight:"1px solid #eee"
  },

  right:{ display:"flex", flexDirection:"column", minHeight:0 },

  sectionTitle:{
    fontSize:11,
    fontWeight:800,
    opacity:.6,
    marginBottom:8
  },

  list:{ display:"flex", flexDirection:"column", gap:8 },

  userRow:(active)=>({
    border:"none",
    borderRadius:12,
    padding:"10px 12px",
    background: active ? "#e6f0ff" : "#fff",
    textAlign:"left",
    cursor:"pointer"
  }),

  userName:{ fontWeight:700 },
  online:{ fontSize:12, color:"#2ecc71" },

  roomRowWrap:(active)=>({
    display:"grid",
    gridTemplateColumns:"1fr 32px",
    borderRadius:12,
    overflow:"hidden",
    background: active ? "#e6f0ff" : "#fff"
  }),

  roomRowBtn:{ border:"none", background:"none", padding:"10px", textAlign:"left" },
  roomTop:{ display:"flex", justifyContent:"space-between" },
  roomName:{ fontWeight:700 },

  badge:{
    background:"#ff4d4f",
    color:"#fff",
    borderRadius:20,
    padding:"0 7px",
    fontSize:11
  },

  lastMsg:{ fontSize:12, opacity:.6 },

  trashBtn:{ border:"none", background:"none", cursor:"pointer" },

  placeholder:{ flex:1, display:"grid", placeItems:"center", opacity:.4 },

  chatHeader:{
    padding:"12px 16px",
    borderBottom:"1px solid #eee",
    display:"flex",
    alignItems:"center"
  },

  chatUser:{ display:"flex", gap:10, alignItems:"center" },

  avatar:{
    width:38, height:38,
    borderRadius:"50%",
    background:"#d8d8d8"
  },

  chatName:{ fontWeight:700 },
  status:{ fontSize:12, color:"#2ecc71" },

  messages:{
    flex:1,
    padding:16,
    overflowY:"auto",
    background:"#f1f5f9",
    display:"flex",
    flexDirection:"column"
  },

  msgRow:(mine)=>({
    display:"flex",
    justifyContent: mine ? "flex-end":"flex-start",
    marginBottom:12
  }),

  bubble:(mine)=>({
    maxWidth:"75%",
    borderRadius:18,
    padding:"10px 14px",
    background: mine ? "#2b6cb0":"#edf2f7",
    color: mine ? "#fff":"#1a202c"
  }),

  sender:{ fontSize:11, opacity:.7 },

  inputBar:{
    display:"grid",
    gridTemplateColumns:"1fr 50px",
    gap:10,
    padding:12,
    borderTop:"1px solid #eee"
  },

  input:{
    border:"1px solid #e2e8f0",
    borderRadius:999,
    padding:"10px 16px",
    background:"#f8fafc",
    outline:"none"
  },

  sendBtn:{
    border:"none",
    borderRadius:"50%",
    background:"#2b6cb0",
    color:"#fff",
    fontSize:18,
    cursor:"pointer"
  },

  footer:{
    padding:"6px 12px",
    fontSize:10,
    opacity:.4,
    borderTop:"1px solid #eee",
    textAlign:"right"
  }
};