<template>
  <div id="app">
    <header class="app-header">
      <h1>SQW</h1>
      <LoginBar />

      <RouterView v-if="false" />
    </header>

    <nav class="navbar">
      <!-- Map Controls Section -->
      <div class="control-section">
        <label class="checkbox-label">
          <input type="checkbox" v-model="dolEnabled" @change="onToggleDol" />
          <span class="checkmark">{{ dolEnabled ? "✓" : "" }}</span>
          DOL (WMS: dol)
        </label>
        <div class="opacity-control">
          <label>Opacity</label>
          <input type="range" min="0" max="1" step="0.01" v-model="opacity" class="slider"
            @input="onChangeDolOpacity" />
          <span class="opacity-value">{{ opacity }}</span>
        </div>
        <div class="button-group">
          <button class="btn btn-primary" @click="centerBangkok">
            Center: Bangkok
          </button>
          <button class="btn btn-secondary" @click="reloadAPI">
            Reload API
          </button>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="nav-buttons">
        <button class="nav-btn" :class="{ active: activeTab === 'dashboard' }" @click="activeTab = 'dashboard'">
          Dashboard
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'feature' }" @click="activeTab = 'feature'">
          GetFeatureInfo
        </button>
        <button class="nav-btn" :class="{ active: activeTab === 'status' }" @click="activeTab = 'status'">
          Status
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn btn-info" @click="startDrawing">
          เริ่มวาดขอบเขต
        </button>
        <button class="btn btn-success" @click="finishDrawing">Finish</button>
        <button class="btn btn-danger" @click="clearDrawing">Clear</button>
      </div>

      <!-- Form Section -->
      <div class="form-section">
        <h3>ข้อมูลแปลง (พื้นดิน)</h3>
        <div class="form-subtitle">ข้อมูลการประเมินแปลง</div>

        <div class="form-group">
          <label>ขนาดที่ดิน (ตร.วา)</label>
          <div class="form-subtitle">ระบบสามารถให้ข้อมูลอัตโนมัติ</div>
          <input type="number" v-model="landData.size" class="form-input" placeholder="0" />
        </div>

        <div class="form-group">
          <label>หน้ากว้าง (เมตร)</label>
          <input type="number" v-model="landData.width" class="form-input" placeholder="0" />
        </div>

        <div class="form-group">
          <label>ขนาดถนน (เมตร)</label>
          <input type="number" v-model="landData.road" class="form-input" placeholder="0" />
        </div>
        <div class="form-group">
          <label>ข้อมูลราคาเปิดเผย</label>
          <input type="text" v-model="landData.price" placeholder="[เจ้า] ล้าน" class="form-input" />
        </div>

        <div class="form-group">
          <label>เจ้าของ</label>
          <input type="text" v-model="landData.owner" placeholder="ชื่อ-สกุล" class="form-input" />
        </div>

        <div class="form-group">
          <label>โทร</label>
          <input type="text" v-model="landData.phone" placeholder="08x-xxx-xxxx" class="form-input" />
        </div>

        <div class="form-group">
          <label>LINE ID</label>
          <input type="text" v-model="landData.lineId" placeholder="@lineid หรือ lineid" class="form-input" />
        </div>

        <button class="btn btn-primary btn-full" @click="saveLandData">
          บันทึกและปิด
        </button>

        <div class="section-divider"></div>

        <h3>รายการแปลง</h3>
        <div class="form-subtitle">ข้อมูลรายการแปลง</div>

        <div class="land-list" v-if="savedLands.length > 0">
          <div v-for="(land, index) in savedLands" :key="index" class="land-item">
            <div class="land-owner">{{ land.owner || "ไม่ระบุ" }}</div>
            <div class="land-details">{{ land.size }} ตร.วา</div>
          </div>
        </div>
        <div v-else class="no-data">ยังไม่มีข้อมูลแปลง</div>
      </div>
    </nav>

    <main class="main-content">
      <aside class="map-container">
        <div id="map" style="width: 100%; height: 100%"></div>

        <!-- Map Control Buttons -->
        <div class="map-controls">
          <!-- Search Button -->
          <button class="control-btn search-btn" @click="toggleSearch" title="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <!-- View My Property Button -->
          <button class="control-btn property-btn" @click="viewMyProperty" title="View My Property">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
              <polyline points="9,11 12,8 15,11" />
            </svg>
          </button>

          <!-- Filters Button -->
          <button class="control-btn filter-btn" @click="toggleFilters" title="Filters">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
            </svg>
          </button>

          <!-- Layers Button -->
          <button class="control-btn layers-btn" @click="toggleLayers" title="Layers">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12,2 2,7 12,12 22,7" />
              <polyline points="2,17 12,22 22,17" />
              <polyline points="2,12 12,17 22,12" />
            </svg>
          </button>

          <!-- P2P Chat Button -->
          <button class="control-btn p2p-btn" :class="{ 'has-notification': hasNewMessage }" @click="toggleP2P"
            title="P2P Chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span v-if="unreadCount > 0" class="notification-badge">{{
              unreadCount
            }}</span>
          </button>
        </div>

        <!-- Search Panel -->
        <div class="search-panel" v-show="showSearch">
          <div class="panel-header">
            <h3>ค้นหา</h3>
            <button @click="showSearch = false" class="close-btn">×</button>
          </div>
          <input type="text" v-model="searchQuery"
            placeholder="พิมพ์ชื่อสถานที่ หรือ 13.7563, 100.5018 (ปล่อยว่างเพื่อใช้ GPS)" class="search-input" />

          <button @click="performSearch" class="btn btn-primary">ค้นหา</button>

          <button @click="locateByGPS" class="btn btn-outline-secondary" style="margin-left: 8px">
            ใช้ตำแหน่งฉัน (GPS)
          </button>
        </div>

        <!-- Filters Panel -->
        <div class="filters-panel" v-show="showFilters">
          <div class="panel-header">
            <h3>ตัวกรอง</h3>
            <button @click="showFilters = false" class="close-btn">×</button>
          </div>
          <div class="filter-group">
            <label>ขนาดถนน</label>
            <!-- สำคัญ: ให้ v-model ชี้ที่ filters.roadWidth -->
            <select v-model="filters.roadWidth" class="form-select">
              <option value="">ทั้งหมด</option>
              <option value="lt6">กว้าง ต่ำกว่า 6 เมตร</option>
              <option value="6-9.99">กว้าง ตั้งแต่ 6–9.99 เมตร</option>
              <option value="10-11.99">กว้าง ตั้งแต่ 10–11.99 เมตร</option>
              <option value="12-17.99">ตั้งแต่ 12–17.99 เมตร</option>
              <option value="18-29.99">18–29.99 เมตร</option>
              <option value="ge30">30 เมตรขึ้นไป</option>
            </select>
          </div>
          <div class="filter-group">
            <label>ขนาดพื้นที่ (ตร.วา)</label>
            <div class="price-range">
              <input type="number" v-model="filters.areaMin" placeholder="ขนาดพื้นที่ต่ำสุด" class="price-input" />
              <input type="number" v-model="filters.areaMax" placeholder="ขนาดพื้นที่สูงสุด" class="price-input" />
            </div>
          </div>
          <div class="filter-group">
            <label>ช่วงราคา (บาท : ตร.วา)</label>
            <div class="price-range">
              <input type="number" v-model="filters.priceMin" placeholder="ต่ำสุด" class="price-input" />
              <input type="number" v-model="filters.priceMax" placeholder="สูงสุด" class="price-input" />
            </div>
          </div>
          <div class="filter-group">
            <label>หน้ากว้างที่ดิน (เมตร)</label>
            <div class="price-range">
              <input type="number" v-model.number="filters.frontMin" placeholder="ต่ำสุด" class="price-input" />
              <input type="number" v-model.number="filters.frontMax" placeholder="สูงสุด" class="price-input" />
            </div>
          </div>

          <button @click="applyFilters" class="btn btn-primary">
            ใช้ตัวกรอง
          </button>
        </div>

        <!-- Layers Panel -->
        <div class="layers-panel" v-show="showLayers">
          <div class="panel-header">
            <h3>Layers</h3>
            <button @click="showLayers = false" class="close-btn">×</button>
          </div>
          <div class="layer-item" v-for="layer in availableLayers" :key="layer.id">
            <label class="checkbox-label">
              <input type="checkbox" v-model="layer.visible" />
              <span class="checkmark">✓</span>
              {{ layer.name }}
            </label>
          </div>
        </div>

        <!-- P2P Chat Panel -->
        <div class="chat-popup" v-show="showChat">
          <div class="chat-header">
            <div class="chat-title">
              <h3>P2P Chat</h3>
              <div class="text-xs opacity-70">
                คุณ: {{ userProfile.name || ('User-' + (currentUserId || '').slice(0, 6)) }}
              </div>
            </div>
            <button @click="showChat = false" class="close-btn">×</button>
          </div>

          <!-- ตั้งชื่อ (ครั้งแรก) -->
          <div class="user-profile" v-if="!userProfile.name">
            <input type="text" v-model="tempUserName" placeholder="กรุณาตั้งชื่อของคุณก่อน" class="profile-input"
              @keyup.enter="setUserProfile" />
            <button @click="setUserProfile" class="btn btn-sm btn-primary">ตั้งชื่อ</button>
          </div>

          <!-- โหมด รายชื่อ (rooms) -->
          <div v-if="chatMode === 'rooms'" class="rooms-pane">
            <div class="rooms-head">
              <div class="rooms-title">คนออนไลน์ (คลิกเพื่อคุย):</div>
              <span class="badge">{{ onlineUsers.length }}</span>
            </div>

            <div v-if="onlineUsers.length === 0" class="empty-state">
              ยังไม่มีใครออนไลน์
            </div>

            <div v-else class="user-list">
              <button v-for="u in onlineUsers" :key="u.uid" class="user-pill" @click="selectUserToChat(u)"
                :title="u.name || ('User-' + u.uid.slice(0, 6))">
                <span class="dot online"></span>
                <span class="name">{{ u.name || ('User-' + u.uid.slice(0, 6)) }}</span>
              </button>
            </div>

            <!-- ถ้าต้องการแสดง 'ห้องล่าสุด' ให้ปลดคอมเมนต์ได้ -->
            <!--
    <div class="rooms-subtitle" v-if="chatRooms.length">ห้องล่าสุด</div>
    <div class="room-list" v-if="chatRooms.length">
      <button
        v-for="r in chatRooms"
        :key="r.roomId"
        class="room-item"
        @click="selectChatRoom(r)"
      >
        <div class="room-name">{{ r.otherName }}</div>
        <span v-if="r.unreadCount" class="badge warn">{{ r.unreadCount }}</span>
      </button>
    </div>
    -->
          </div>

          <!-- โหมด แชท (chat) -->
          <div v-else class="chat-pane">
            <div class="chat-subheader">
              <button class="btn btn-xs" @click="backToRooms">← กลับ</button>
              <div class="peer-name">
                {{ selectedUser?.name || ('User-' + (selectedUser?.uid || '').slice(0, 6)) }}
              </div>
            </div>

            <div class="chat-body" ref="chatBody">
              <div v-for="msg in chatMessages" :key="msg.id" class="chat-msg"
                :class="{ me: msg.fromUid === currentUserId, system: msg.type === 'system' }">
                <div class="bubble">
                  <div class="meta" v-if="!msg.type">
                    {{ msg.fromName }}
                    <span class="timestamp">{{ formatTime(msg.createdAt) }}</span>
                  </div>
                  <div class="text">{{ msg.text }}</div>
                </div>
              </div>

              <div v-if="chatMessages.length === 0" class="no-messages">
                เริ่มคุยกันเลย!
              </div>
            </div>

            <div class="typing-indicator" v-if="showTypingIndicator">
              <span class="typing-dots"><span></span><span></span><span></span></span>
              กำลังพิมพ์…
            </div>

            <div class="chat-input-row">
              <input type="text" v-model="chatInput" placeholder="พิมพ์ข้อความ..." class="chat-input"
                @keyup.enter="sendMessage" @input="handleTyping" :disabled="!userProfile.name || !selectedUser" />
              <button @click="sendMessage" class="btn btn-sm btn-primary send-btn"
                :disabled="!chatInput.trim() || !userProfile.name || !selectedUser">
                ส่ง
              </button>
            </div>
          </div>
        </div>

      </aside>
    </main>
  </div>
</template>

<script src="./app-script.js"></script>

<style>
.rooms-head {
  display: flex;
  align-items: center;
  gap: .5rem;
  margin: .25rem 0 .5rem
}

.rooms-title {
  font-weight: 600
}

.badge {
  background: #0ea5e9;
  color: #fff;
  border-radius: 999px;
  padding: 0 .5rem;
  font-size: .8rem
}

.badge.warn {
  background: #ef4444
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem
}

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .375rem .6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .12);
  cursor: pointer
}

.user-pill:hover {
  background: rgba(255, 255, 255, .12)
}

.user-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%
}

.user-pill .dot.online {
  background: #22c55e
}

.user-pill .name {
  white-space: nowrap
}

.chat-subheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5rem;
  gap: .5rem
}

.chat-subheader .peer-name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis
}

.room-list {
  display: flex;
  flex-direction: column;
  gap: .25rem;
  margin-top: .25rem
}

.room-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .4rem .6rem;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: .5rem;
  background: rgba(255, 255, 255, .04);
  cursor: pointer
}

.room-item:hover {
  background: rgba(255, 255, 255, .08)
}

.room-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

@import "./styles/base.css";
@import "./styles/header.css";
@import "./styles/navbar.css";
@import "./styles/forms.css";
@import "./styles/buttons.css";
@import "./styles/controls.css";
@import "./styles/sections.css";
@import "./styles/map.css";
@import "./styles/panels.css";
@import "./styles/responsive.css";
@import "./styles/chat.css";
</style>
