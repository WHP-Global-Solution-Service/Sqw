<template>
  <div id="app">
    <header class="app-header">
      <LoginBar />
      <RouterView v-if="false" />
    </header>

    <!-- Mode disclaimer modal (centered) -->
    <div v-if="showModeDisclaimerModal" class="mode-disclaimer-overlay">
      <div class="mode-disclaimer-box">
        <div class="mode-disclaimer-icon">⚠️</div>
        <div class="mode-disclaimer-text">
          ข้อมูลนี้เพื่อใช้แสดงสภาพพื้นที่ตำแหน่งแปลงที่ดิน<br />
          และแปลงข้างเคียงร่วมกับ Google Maps เท่านั้น<br />
          <strong>ไม่ใช่หลักฐานที่ใช้ในทางกฏหมาย</strong><br />
        </div>
        <div style="text-align: center; margin-top: 12px">
          <button class="btn btn-primary" @click="acceptModeDisclaimer">
            รับทราบ
          </button>
        </div>
      </div>
    </div>

    <!-- หน้าเลือกโหมด (ขึ้นเมื่อเปิดครั้งแรก)-->
    <div v-if="!currentMode" class="mode-select fullscreen">
      <h2>เลือกโหมดการใช้งาน</h2>
      <p>กรุณาเลือกประเภทการใช้งานระบบจัดการที่ดิน</p>

      <div class="mode-buttons">
        <button class="mode-btn sale" @click="selectMode('sale')">
          🏡 ระบบซื้อขายที่ดิน
        </button>
        <button class="mode-btn pledge" @click="selectMode('pledge')">
          🤝 ระบบขายฝากที่ดิน
        </button>
      </div>
    </div>

    <div v-else-if="currentMode === 'sale'">
      <nav class="navbar">
        <!-- Map Controls Section -->
        <div class="control-section">
          <div
            style="
              margin-top: 8px;
              background: #fff1;
              padding: 8px;
              border-radius: 8px;
            "
          >
            <button @click="addBangkokOverlay()">ผังเมือง กทม. 2556</button>
            <button @click="addBangkokOverlayDaft()">
              ผังเมือง กทม. 2570 (ร่าง)
            </button>
            <button @click="clearBangkokOverlay()">ซ่อนผังเมือง</button>

            <label class="checkbox-label">Opacity (ผัง กทม.)</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              :value="kmlOpacity"
              @input="setBangkokOverlayOpacity($event.target.value)"
            />
            <span style="font-size: 12px">{{ kmlOpacity.toFixed(2) }}</span>
          </div>

          <label class="checkbox-label">
            <input type="checkbox" v-model="dolEnabled" @change="onToggleDol" />
            <span class="checkmark">{{ dolEnabled ? "✓" : "" }}</span>
            ระวางกรมที่ดินสีแดง
          </label>
          <div class="opacity-control">
            <label class="checkbox-label">Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              v-model="opacity"
              class="slider"
              @input="onChangeDolOpacity"
            />
            <span class="opacity-value">{{ opacity }}</span>
          </div>
          <!-- <div class="button-group">
          <button class="btn btn-primary" @click="centerBangkok">
            Center: Bangkok
          </button>
          <button class="btn btn-secondary" @click="reloadAPI">
            Reload API
          </button>
          <div
            class="button-group"
            style="display: flex; gap: 8px; align-items: center"
          >
          
            <button
              class="btn btn-primary"
              @click="loadKmlFromUrl('/kml/Test-Bom3.kml')"
            >
              Load .kml
            </button>
          </div>
        </div> -->
        </div>

        <!-- Navigation Buttons -->
        <div class="flex-container">
          <div class="dashboard land-plots">
            <span class="dashboard-number"
              >{{ dashboard.plots.toLocaleString() }}
              <span class="highlight">ประกาศ</span></span
            >
            <div class="dashboard-label">ที่ดินทั้งหมด</div>
          </div>
          <div class="dashboard area">
            <span class="dashboard-number"
              >{{ fmt2(dashboard.areaRai)
              }}<span class="highlight"> ไร่</span></span
            >
            <div class="dashboard-label">จำนวนรวม</div>
          </div>

          <!-- <div class="dashboard owners">
          <span class="dashboard-number"
            >{{ dashboard.owners.toLocaleString()
            }}<span class="highlight"> คน</span></span
          >
          <div class="dashboard-label">เจ้าของทั้งหมด</div>
        </div> -->
        </div>

        <div class="flex-container">
          <!-- <div class="dashboard area">
          <span class="dashboard-number"
            >{{ fmt2(dashboard.areaRai)
            }}<span class="highlight"> ไร่</span></span
          >
          <div class="dashboard-label">จำนวนรวม</div>
        </div> -->

          <div class="dashboard value">
            <span class="dashboard-number">{{
              fmt(dashboard.totalValueMillion)
            }}</span>
            <div class="dashboard-label">
              <span class="highlight">ล้านบาท</span>
            </div>
            <div class="dashboard-label">มูลค่าที่ดินรวม</div>
          </div>
        </div>

        <!-- <div class="btn-stack" style="max-width: 260px; margin: 0 auto">
        <div class="flood-summary-box">
          <h3>📊 สรุปแปลงที่ดินในเขตน้ำท่วม</h3>
          <div class="flood-summary-grid">
            <div class="summary-card high">
              <span class="label">น้ำท่วมมาก</span>
              <span class="count">{{ floodSummary.high }}</span>
            </div>
            <div class="summary-card medium">
              <span class="label">น้ำท่วมกลาง</span>
              <span class="count">{{ floodSummary.medium }}</span>
            </div>
            <div class="summary-card low">
              <span class="label">น้ำท่วมน้อย</span>
              <span class="count">{{ floodSummary.low }}</span>
            </div>
            <div class="summary-card none">
              <span class="label">ไม่อยู่ในน้ำท่วม</span>
              <span class="count">{{ floodSummary.none }}</span>
            </div>
          </div>
        </div> -->

        <!-- เริ่มโหมดน้ำท่วมตามระดับ -->
        <!-- <div class="flood-btn-grid"> -->
        <!-- แถวบน: ระดับน้ำ -->
        <!-- <button
            class="btn-icon low" 
            @click="startFloodDrawing('low')"
            title="น้ำท่วมระดับต่ำ (Low)"
          >
            💧<small>L</small>
          </button>
          <button
            class="btn-icon med"
            @click="startFloodDrawing('medium')"
            title="น้ำท่วมระดับกลาง (Medium)"
          >
            💧<small>M</small>
          </button>
          <button
            class="btn-icon high"
            @click="startFloodDrawing('high')"
            title="น้ำท่วมระดับสูง (High)"
          >
            💧<small>H</small>
          </button> -->

        <!-- แถวล่าง: จบ / ยกเลิก / ลบ -->
        <!-- <button
            class="btn-icon success"
            @click="finishFloodDrawing()"
            :disabled="!floodMode || floodPoints.length < 3"
            title="จบการวาดน้ำท่วม"
          >
            ✅
          </button>
          <button
            class="btn-icon cancel"
            @click="clearFloodDrawing()"
            :disabled="!floodMode"
            title="ยกเลิกที่กำลังวาด"
          >
            ❌
          </button>
          <button
            class="btn-icon danger"
            @click="deleteSelectedFlood()"
            :disabled="!selectedFlood"
            title="ลบพื้นที่ที่เลือก"
          >
            🗑️
          </button>
        </div>
      </div> -->

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
          <h3 @click="isFormOpen = !isFormOpen" style="cursor: pointer">
            ข้อมูลแปลง (พื้นดิน)
            <span v-if="isFormOpen">▲</span>
            <span v-else>▼</span>
          </h3>

          <transition name="fade">
            <div v-show="isFormOpen">
              <div class="form-subtitle">ข้อมูลการประเมินแปลง</div>
              <div class="form-subtitle">ระบบสามารถให้ข้อมูลอัตโนมัติ</div>
              <div
                class="form-row"
                style="display: flex; gap: 10px; flex-wrap: nowrap"
              >
                <!-- ฝั่งซ้าย: ขนาดที่ดิน (ตร.วา) -->
                <div style="flex: 1; max-width: 50%">
                  <label class="form-group">ขนาดที่ดิน (ตร.วา)</label>
                  <input
                    type="text"
                    inputmode="decimal"
                    v-model="landData.size"
                    @input="
                      landData.size = sanitizeDecimal($event.target.value);
                      syncFromSize();
                      if (landData.price) syncPriceFromPerSqw();
                    "
                    @blur="
                      landData.size = formatLandSize(landData.size);
                      syncFromSize();
                    "
                    class="form-input text-center"
                    placeholder="0"
                  />
                </div>

                <!-- ฝั่งขวา: ขนาดที่ดิน (ไร่ / งาน / วา) -->
                <div style="flex: 1; max-width: 50%">
                  <label class="form-group">ขนาดที่ดิน (ไร่/งาน/วา)</label>
                  <div style="display: flex; gap: 5px">
                    <input
                      class="form-input text-center"
                      style="width: 33.33%"
                      inputmode="numeric"
                      v-model="raiModel"
                      @input="onRNWInput()"
                      @blur="normalizeRNW()"
                      placeholder="0"
                    />
                    <input
                      class="form-input text-center"
                      style="width: 33.33%"
                      inputmode="numeric"
                      v-model="nganModel"
                      @input="onRNWInput()"
                      @blur="normalizeRNW()"
                      placeholder="0"
                    />
                    <input
                      class="form-input text-center"
                      style="width: 33.33%"
                      inputmode="decimal"
                      v-model="wahModel"
                      @input="
                        wahModel = sanitizeDecimal($event.target.value);
                        onRNWInput();
                      "
                      @blur="
                        wahModel = formatLandSize(wahModel);
                        normalizeRNW();
                      "
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div></div>

              <div class="form-group" style="display: flex; gap: 10px">
                <div class="form-group">
                  <label class="form-group">หน้ากว้างติดถนน (M)</label>
                  <input
                    type="text"
                    inputmode="numeric"
                    :value="formatNumber(landData.width)"
                    @input="
                      landData.width = unformatNumber($event.target.value)
                    "
                    class="form-input"
                    placeholder="0"
                  />
                </div>

                <div class="form-group">
                  <label class="form-group">ขนาดถนน (M)</label>
                  <input
                    type="text"
                    inputmode="numeric"
                    :value="formatNumber(landData.road)"
                    @input="landData.road = unformatNumber($event.target.value)"
                    class="form-input"
                    placeholder="0"
                  />
                </div>
              </div>

              <div class="form-group" style="display: flex; gap: 10px">
                <!-- ราคาต่อตารางวา -->
                <div>
                  <label class="form-group">ราคาต่อตารางวา</label>
                  <input
                    type="text"
                    inputmode="decimal"
                    v-model="landData.price"
                    @input="
                      landData.price = sanitizeDecimal(landData.price);
                      syncPriceFromPerSqw();
                    "
                    @blur="landData.price = formatPrice(landData.price)"
                    class="form-input text-center"
                    placeholder="0"
                  />
                </div>

                <!-- ราคารวม -->
                <div>
                  <label class="form-group">ราคารวม</label>
                  <input
                    type="text"
                    inputmode="decimal"
                    v-model="landData.totalPrice"
                    @input="
                      landData.totalPrice = sanitizeDecimal(
                        landData.totalPrice
                      );
                      syncPerSqwFromTotal();
                    "
                    @blur="
                      landData.totalPrice = formatPrice(landData.totalPrice)
                    "
                    class="form-input text-center"
                    placeholder="0"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="form-group">เจ้าของ</label>
                <input
                  type="text"
                  v-model="landData.owner"
                  placeholder="ชื่อเจ้าของ"
                  class="form-input"
                  :disabled="!!(landData.agent && landData.agent.trim())"
                />
              </div>
              <div class="form-group">
                <label class="form-group">นายหน้า</label>
                <input
                  type="text"
                  v-model="landData.agent"
                  placeholder="ชื่อนายหน้า"
                  class="form-input"
                  :disabled="!!(landData.owner && landData.owner.trim())"
                />
              </div>
              <div class="form-group" style="display: flex; gap: 10px">
                <div class="form-group">
                  <label class="form-group">โทร</label>
                  <input
                    type="text"
                    v-model="landData.phone"
                    placeholder="08x-xxx-xxxx"
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label class="form-group">LINE ID</label>
                  <input
                    type="text"
                    v-model="landData.lineId"
                    placeholder="@lineid หรือ lineid"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-group">กรอบที่ดิน</label>
                <input
                  type="text"
                  v-model="landData.landFrame"
                  placeholder="กรอบที่ดิน"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="form-group">ข้อมูลโฉนด/ระวาง</label>
                <input
                  type="text"
                  v-model="landData.deedInformation"
                  placeholder="ข้อมูลโฉนด/ระวาง"
                  class="form-input"
                />
              </div>

              <button
                style="margin-top: 30px"
                class="btn btn-primary btn-full"
                @click="saveLandData"
              >
                บันทึกและปิด
              </button>
            </div>
          </transition>

          <div class="section-divider"></div>

          <!-- รายการแปลง -->
          <h3 @click="isListOpen = !isListOpen" style="cursor: pointer">
            รายการแปลง
            <span v-if="isListOpen">▲</span>
            <span v-else>▼</span>
          </h3>

          <transition name="fade">
            <div v-show="isListOpen">
              <div class="form-subtitle">
                ข้อมูลรายการแปลงทั้งหมดของคุณ {{ savedLands.length }} แปลง
              </div>

              <div class="land-list" v-if="savedLands.length > 0">
                <div
                  v-for="(land, index) in savedLands"
                  :key="index"
                  class="land-item"
                >
                  <div class="land-owner" @click="focusLand(land)">
                    {{ land.owner || land.agent + " (นายหน้า)" || "ไม่ระบุ" }}
                  </div>
                  <div class="land-details">
                    {{ formatNumber(land.size) }} ตร.วา
                  </div>
                  <button
                    style="
                      margin-top: 6px;
                      padding: 6px 10px;
                      background: #e11d48;
                      color: #fff;
                      border: 0;
                      border-radius: 6px;
                    "
                    @click="deleteLandItem(land.id)"
                  >
                    ลบแปลง
                  </button>
                </div>
              </div>
              <div v-else class="no-data">ยังไม่มีข้อมูลแปลง</div>
            </div>
          </transition>
        </div>
      </nav>
    </div>

    <main class="main-content">
      <aside class="map-container">
        <div id="map" style="width: 100%; height: 100%"></div>
      </aside>
    </main>
    <section class="right-panel">
      <!-- Map Control Buttons -->
      <div class="map-controls">
        <!-- Search Button -->
        <button
          class="control-btn search-btn"
          @click="toggleSearch"
          title="Search"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        <!-- Filters Button -->
        <button
          class="control-btn filter-btn"
          @click="toggleFilters"
          title="Filters"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
          </svg>
        </button>
        <!-- P2P Chat Button -->
        <button
          class="control-btn p2p-btn"
          :class="{ 'has-notification': hasNewMessage }"
          @click="toggleP2P"
          title="P2P Chat"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            />
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
        <input
          type="text"
          v-model="searchQuery"
          placeholder="พิมพ์ชื่อสถานที่ หรือ 13.7563, 100.5018 (ปล่อยว่างเพื่อใช้ GPS)"
          class="search-input"
        />

        <button @click="performSearch" class="btn btn-primary">ค้นหา</button>

        <button
          @click="locateByGPS"
          class="btn btn-outline-secondary"
          style="margin-left: 8px"
        >
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
            <option value="lt6">ต่ำกว่า 6 เมตร</option>
            <option value="6-9.99">ตั้งแต่ 6–9.99 เมตร</option>
            <option value="ge10">ตั้งแต่ 10 เมตรขึ้นไป</option>
            <option value="ge18">ตั้งแต่ 18 เมตรขึ้นไป</option>
            <option value="ge30">30 เมตรขึ้นไป</option>
          </select>
        </div>
        <div class="form-group" style="display: flex; gap: 10px">
          <div class="filter-group">
            <label>ขนาดพื้นที่ (ตร.วา)</label>
            <div class="price-range">
              <input
                type="text"
                :value="formatNumber(filters.areaMin)"
                @input="filters.areaMin = unformatNumber($event.target.value)"
                placeholder="ต่ำสุด"
                class="price-input"
                style="width: 50%"
              />
              <input
                type="text"
                :value="formatNumber(filters.areaMax)"
                @input="filters.areaMax = unformatNumber($event.target.value)"
                placeholder="สูงสุด"
                class="price-input"
                style="width: 50%"
              />
            </div>
          </div>
          <div class="filter-group">
            <label>ขนาดพื้นที่ (ไร่)</label>
            <div class="price-range">
              <input
                type="text"
                :value="formatNumber(filters.areaMinRai)"
                @input="
                  filters.areaMinRai = unformatNumber($event.target.value)
                "
                placeholder="ต่ำสุด"
                class="price-input"
                style="width: 50%"
              />
              <input
                type="text"
                :value="formatNumber(filters.areaMaxRai)"
                @input="
                  filters.areaMaxRai = unformatNumber($event.target.value)
                "
                placeholder="สูงสุด"
                class="price-input"
                style="width: 50%"
              />
            </div>
          </div>
        </div>

        <div class="filter-group">
          <label>ช่วงราคา (บาท : ตร.วา)</label>
          <div class="price-range" style="display: flex; gap: 10px">
            <input
              type="text"
              :value="formatNumber(filters.priceMin)"
              @input="filters.priceMin = unformatNumber($event.target.value)"
              placeholder="ต่ำสุด"
              class="price-input"
              style="width: 50%"
            />
            <input
              type="text"
              :value="formatNumber(filters.priceMax)"
              @input="filters.priceMax = unformatNumber($event.target.value)"
              placeholder="สูงสุด"
              class="price-input"
              style="width: 50%"
            />
          </div>
        </div>
        <div class="filter-group">
          <label>ช่วงราคา (รวมทั้งแปลง)</label>
          <div class="price-range" style="display: flex; gap: 10px">
            <input
              type="text"
              :value="formatNumber(filters.totalPriceMin)"
              @input="
                filters.totalPriceMin = unformatNumber($event.target.value)
              "
              placeholder="ต่ำสุด"
              class="price-input"
              style="width: 50%"
            />
            <input
              type="text"
              :value="formatNumber(filters.totalPriceMax)"
              @input="
                filters.totalPriceMax = unformatNumber($event.target.value)
              "
              placeholder="สูงสุด"
              class="price-input"
              style="width: 50%"
            />
          </div>
        </div>
        <div class="filter-group">
          <label>หน้ากว้างที่ดิน (เมตร)</label>
          <div class="price-range" style="display: flex; gap: 10px">
            <input
              type="text"
              :value="formatNumber(filters.frontMin)"
              @input="filters.frontMin = unformatNumber($event.target.value)"
              placeholder="ต่ำสุด"
              class="price-input"
              style="width: 50%"
            />
            <input
              type="text"
              :value="formatNumber(filters.frontMax)"
              @input="filters.frontMax = unformatNumber($event.target.value)"
              placeholder="สูงสุด"
              class="price-input"
              style="width: 50%"
            />
          </div>
        </div>

        <div class="flex gap-2">
          <button class="btn btn-primary" @click="applyFilters">
            ใช้ตัวกรอง
          </button>
          <button class="btn btn-secondary" @click="resetFilters">ล้าง</button>
        </div>
      </div>

      <!-- Layers Panel -->
      <!-- <div class="layers-panel" v-show="showLayers">
          <div class="panel-header">
            <h3>Layers</h3>
            <button @click="showLayers = false" class="close-btn">×</button>
          </div>
          <div
            class="layer-item"
            v-for="layer in availableLayers"
            :key="layer.id"
          >
            <label class="checkbox-label">
              <input type="checkbox" v-model="layer.visible" />
              <span class="checkmark">✓</span>
              {{ layer.name }}
            </label>
          </div>
        </div> -->

      <!-- P2P Chat Panel -->
      <div class="chat-popup" v-show="showChat">
        <div class="chat-header">
          <div class="chat-title">
            <h3>P2P Chat</h3>
            <div class="text-xs opacity-70">
              คุณ:
              {{
                userProfile.name || "User-" + (currentUserId || "").slice(0, 6)
              }}
            </div>
          </div>
          <button @click="showChat = false" class="close-btn">×</button>
        </div>

        <!-- ตั้งชื่อ (ครั้งแรก) -->
        <div class="user-profile" v-if="!userProfile.name">
          <input
            type="text"
            v-model="tempUserName"
            placeholder="กรุณาตั้งชื่อของคุณก่อน"
            class="profile-input"
            @keyup.enter="setUserProfile"
          />
          <button @click="setUserProfile" class="btn btn-sm btn-primary">
            ตั้งชื่อ
          </button>
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
            <button
              v-for="u in onlineUsers"
              :key="u.uid"
              class="user-pill"
              @click="selectUserToChat(u)"
              :title="u.name || 'User-' + u.uid.slice(0, 6)"
            >
              <span class="dot online"></span>
              <span class="name">{{
                u.name || "User-" + u.uid.slice(0, 6)
              }}</span>
            </button>
          </div>
        </div>

        <!-- โหมด แชท (chat) -->
        <div v-else class="chat-pane">
          <div class="chat-subheader">
            <button class="btn btn-xs" @click="backToRooms">← กลับ</button>
            <div class="peer-name">
              {{
                selectedUser?.name ||
                "User-" + (selectedUser?.uid || "").slice(0, 6)
              }}
            </div>
          </div>

          <div class="chat-body" ref="chatBody">
            <div
              v-for="msg in chatMessages"
              :key="msg.id"
              class="chat-msg"
              :class="{
                me: msg.fromUid === currentUserId,
                system: msg.type === 'system',
              }"
            >
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
            <span class="typing-dots"
              ><span></span><span></span><span></span
            ></span>
            กำลังพิมพ์…
          </div>

          <div class="chat-input-row">
            <input
              type="text"
              v-model="chatInput"
              placeholder="พิมพ์ข้อความ..."
              class="chat-input"
              @keyup.enter="sendMessage"
              @input="handleTyping"
              :disabled="!userProfile.name || !selectedUser"
            />
            <button
              @click="sendMessage"
              class="btn btn-sm btn-primary send-btn"
              :disabled="
                !chatInput.trim() || !userProfile.name || !selectedUser
              "
            >
              ส่ง
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="./app-script.js"></script>

<style>
.rooms-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0 0.5rem;
}

.rooms-title {
  font-weight: 600;
}

.badge {
  background: #0ea5e9;
  color: #fff;
  border-radius: 999px;
  padding: 0 0.5rem;
  font-size: 0.8rem;
}

.badge.warn {
  background: #ef4444;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
}

.user-pill:hover {
  background: rgba(255, 255, 255, 0.12);
}

.user-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.user-pill .dot.online {
  background: #22c55e;
}

.user-pill .name {
  white-space: nowrap;
}

/* Mode disclaimer modal styles */
.mode-disclaimer-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2200;
}
.mode-disclaimer-box {
  background: #fff;
  color: #b91c1c;
  padding: 20px 22px;
  border-radius: 12px;
  width: 460px;
  max-width: 94%;
  text-align: center;
  box-shadow: 0 12px 40px rgba(2, 6, 23, 0.65);
}
.mode-disclaimer-icon {
  font-size: 46px;
  margin-bottom: 8px;
}
.mode-disclaimer-text {
  font-weight: 700;
  line-height: 1.45;
  color: #b91c1c;
}

.chat-subheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.chat-subheader .peer-name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
}

.room-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

.room-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
}

.room-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.room-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== FORCE LONGDO POPUP OVERRIDE (NUCLEAR MODE) ===== */
body div.ldmap_placeholder.ldmap_frame.ldmap_popup.ldmap_selectable {
  all: unset !important;
  position: absolute !important;
  background: rgba(0, 0, 0, 0.85) !important;
  border: 1px solid #ddd !important;
  color: #fff !important;
  border-radius: 12px !important;
  padding: 12px 16px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

/* Title */
div.ldmap_placeholder.ldmap_frame.ldmap_popup.ldmap_selectable .ldmap_title {
  color: #fff !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 6px !important;
}

/* Content */
div.ldmap_placeholder.ldmap_frame.ldmap_popup.ldmap_selectable .ldmap_element {
  color: #f5f5f5 !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
}

/* Close button */
div.ldmap_placeholder.ldmap_frame.ldmap_popup.ldmap_selectable
  .ldmap_popup_close {
  color: #ccc !important;
  font-size: 20px !important;
  font-weight: bold !important;
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
@import "./styles/main.css";
</style>
