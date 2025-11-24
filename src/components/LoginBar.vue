<!-- src/components/LoginBar.vue -->
<template>
  <header class="login-bar top-strip modern">
    <div class="left">
      <div class="brand">
        <div class="brand-logo" title="SQW">SQW</div>
      </div>
    </div>

    <div class="right">
      <div class="auth-area">
        <div v-if="user" class="user-block">
          <div class="user-pill">
            <div class="avatar">
              {{
                (user.displayName || user.email || shortUid)
                  .charAt(0)
                  .toUpperCase()
              }}
            </div>
            <div class="user-meta">
              <div class="user-name">
                {{ user.displayName || user.email || shortUid }}
              </div>
              <div class="user-sub">ออนไลน์</div>
            </div>
          </div>
          <button class="logout-btn" @click="doLogout" title="ออกจากระบบ">
            ออก
          </button>
        </div>

        <div v-else class="login-block">
          <div class="compact-form">
            <input
              class="login-input"
              v-model="email"
              type="email"
              placeholder="อีเมล"
            />
            <input
              class="login-input"
              v-model="password"
              type="password"
              placeholder="รหัสผ่าน"
            />
            <button class="login-btn" @click="doLoginEmail">เข้าสู่ระบบ</button>
          </div>
          <div class="actions">
            <button class="reg-btn" @click="doRegister">สมัคร</button>
            <button
              class="google-btn"
              @click="doLoginGoogle"
              aria-label="Google sign in"
            >
              <svg
                class="google-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>
          <span v-if="error" class="error-msg">{{ error }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  onAuthChanged,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logout as doSignOut,
  updateOnlineStatus,
  clearOnlineStatus,
  ensureUserProfile,
} from "../firebase";

const user = ref(null);
const email = ref("");
const password = ref("");
const error = ref("");

let unsub = null;
onMounted(() => {
  unsub = onAuthChanged(async (u) => {
    user.value = u || null;
    // เมื่อเปลี่ยนผู้ใช้ ให้ประกาศสถานะออนไลน์พร้อมชื่อใหม่
    if (u) {
      const display =
        u.displayName ||
        (u.email ? u.email.split("@")[0] : `User-${u.uid.slice(0, 6)}`);
      await updateOnlineStatus(u.uid, { name: display });
      // ensure a minimal profile exists so inbox/listing can work
      try {
        await ensureUserProfile(u.uid, display);
      } catch (e) {
        console.warn("ensureUserProfile failed in LoginBar", e);
      }
    }
  });
});
onBeforeUnmount(() => {
  if (unsub) unsub();
});

const shortUid = computed(() =>
  user.value?.uid ? user.value.uid.slice(0, 6) : ""
);

async function doLoginGoogle() {
  error.value = "";
  try {
    await loginWithGoogle();
  } catch (e) {
    error.value = tidy(e);
  }
}
async function doLoginEmail() {
  error.value = "";
  try {
    await loginWithEmail(email.value, password.value);
  } catch (e) {
    error.value = tidy(e);
  }
}
async function doRegister() {
  error.value = "";
  try {
    // derive a friendly display name from the email local-part if not provided
    const local = (email.value || "").split("@")[0] || "user";
    const display = local
      ? local.charAt(0).toUpperCase() + local.slice(1)
      : "User";
    await registerWithEmail(email.value, password.value, display);
    // clear form after successful register
    email.value = "";
    password.value = "";
  } catch (e) {
    error.value = tidy(e);
  }
}
async function doLogout() {
  error.value = "";
  try {
    if (user.value?.uid) await clearOnlineStatus(user.value.uid);
    await doSignOut();
  } catch (e) {
    error.value = tidy(e);
  }
}
function tidy(e) {
  return (e?.message || String(e)).replace("Firebase: ", "");
}
</script>

<style scoped>
.login-bar input {
  padding: 0.4rem 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.login-bar button {
  padding: 0.4rem 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #f9fafb;
  cursor: pointer;
}

.login-bar button:hover {
  background: #f3f4f6;
}

.google-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #fff;
  border: 1px solid #dadce0;
  border-radius: 6px;
  color: #3c4043;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.google-btn:hover {
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.google-icon {
  width: 18px;
  height: 18px;
}

/* Top strip containment and sizing */
.top-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  width: 100%;
  max-height: 80px; /* enforce the requested max height */
  overflow: hidden;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.brand-logo {
  font-weight: 800;
  font-size: 20px;
  color: #111;
  padding: 8px 12px;
  border-radius: 8px;
  background: linear-gradient(90deg, #fff, #efefef);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  position: relative;
}

.auth-area {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.login-block,
.user-block {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.login-input {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.login-btn,
.reg-btn,
.logout-btn {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  color: #111;
  cursor: pointer;
  transition: transform 0.14s ease, box-shadow 0.14s ease;
}
.login-btn {
  background: #111;
  color: #000000;
  border-color: #111;
}
.reg-btn {
  background: transparent;
  color: #111;
}
.logout-btn {
  background: transparent;
  color: #111;
}
.error-msg {
  color: #b91c1c;
  font-size: 13px;
}

/* small micro-interactions */
.login-btn:hover,
.reg-btn:hover,
.logout-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}
.login-input {
  transition: box-shadow 0.14s ease, transform 0.12s ease, border-color 0.12s;
}
.login-input:focus {
  outline: none;
  border-color: rgba(0, 0, 0, 0.18);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

/* brand accent animation */
.brand-logo::after {
  content: "";
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 6px;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06),
    rgba(0, 0, 0, 0.02),
    rgba(0, 0, 0, 0.06)
  );
  border-radius: 4px;
  opacity: 0.9;
  transform: translateY(6px);
  transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.4s;
}
.top-strip:hover .brand-logo::after {
  transform: translateY(0);
  opacity: 1;
}

/* subtle loading shimmer when component mounts */
@keyframes bw-shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}
.top-strip.loading .brand-logo {
  background: linear-gradient(90deg, #f7f7f7 0%, #ededed 40%, #f7f7f7 100%);
  background-size: 400px 100%;
  animation: bw-shimmer 1.6s linear infinite;
}

/* make the Google icon monochrome by using currentColor when explicitly requested */
.google-icon.mono path {
  fill: currentColor;
}

@media (max-width: 720px) {
  .top-strip {
    padding: 0.4rem;
  }
  .login-input {
    padding: 6px 8px;
    font-size: 13px;
  }
  .brand-logo {
    font-size: 16px;
    padding: 6px 10px;
  }
}

/* Modern layout and additional styles for redesigned bar */
.login-bar.modern {
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.login-bar .left,
.login-bar .center,
.login-bar .right {
  display: flex;
  align-items: center;
}
.login-bar .left {
  flex: 0 0 auto;
}
.login-bar .center {
  flex: 1 1 auto;
  justify-content: center;
}
.login-bar .right {
  flex: 0 0 auto;
}

.control-group .icon-btn {
  background: transparent;
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #333;
}
.control-group .icon-btn:hover {
  background: rgba(0, 0, 0, 0.03);
  transform: translateY(-2px);
}

.user-pill {
  display: flex;
  gap: 8px;
  align-items: center;
  background: transparent;
  padding: 4px 8px;
  border-radius: 10px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.user-meta .user-name {
  font-weight: 700;
  font-size: 13px;
  color: #000000;
}
.user-meta .user-sub {
  font-size: 11px;
  color: rgba(0, 0, 0, 0.45);
}

.compact-form {
  display: flex;
  gap: 6px;
  align-items: center;
}
.actions {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-left: 6px;
}

/* ensure the whole bar never exceeds 80px visually */
.top-strip {
  min-height: 48px;
  height: auto;
}

/* responsive: keep auth inputs usable on very small screens (stack vertically) */
@media (max-width: 520px) {
  .compact-form {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  .compact-form input {
    display: block;
    width: 160px;
    max-width: 60vw;
  }
  .login-btn {
    padding: 6px 8px;
    width: auto;
  }
  .actions {
    flex-direction: row;
  }
  .actions .reg-btn {
    display: inline-flex;
  }
}
</style>
