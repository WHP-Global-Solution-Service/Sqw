<template>
  <div id="app" :class="{ 'mode-sale': currentMode === 'sale' }">
    <header class="app-header">
      <LoginBar
        :current-mode="currentMode"
        @change-mode="backToModeSelect"
        @open-contact="openContact"
      />
    </header>

    <!-- Global loading overlay for details -->
    <div v-if="isLoadingDetails" class="global-loading-overlay">
      <div class="global-loading-box">
        <div class="spinner"></div>
        <div style="margin-top: 8px; font-weight: 600; color: #fff">
          กำลังโหลดข้อมูลที่ดิน...
        </div>
      </div>
    </div>

    <!-- Global loading overlay for projects (shown during login) -->
    <div v-if="isLoadingProjects" class="global-loading-overlay">
      <div class="global-loading-box">
        <div class="spinner"></div>
        <div style="margin-top: 8px; font-weight: 600; color: #fff">
          กำลังโหลดข้อมูลโครงการ... กรุณารอสักครู่
        </div>
      </div>
    </div>

    <!-- Mode disclaimer modal (centered) -->
    <div v-if="showModeDisclaimerModal" class="mode-disclaimer-overlay">
      <div class="mode-disclaimer-box">
        <div class="mode-disclaimer-icon">⚠️</div>
        <div class="mode-disclaimer-text">
          ข้อมูลผลลัพธ์ในแพลตฟอร์มนี้ <br />
          เป็นการนำข้อมูลเบื้องต้น ทั้งรูปแผนที่ กฎหมายผังเมือง และข้อมูลอื่นๆ
          มาแสดง โดยผสานกับการใช้ข้อมูลภาพถ่ายดาวเทียมรวมถึง Base Maps
          จากหลายเว็บต่างๆ เพื่อแสดงตำแหน่งที่ตั้งโดยสังเขป
          และแสดงสภาพแวดล้อมแปลงที่ดินเท่านั้น
          <br />
          ไม่สามารถนำข้อมูลขนาดเนื้อที่ ระยะขอบเขต และตำแหน่ง ไปใช้ทางกฎหมายได้
          กรุณาดูเพื่อศึกษา ประกอบการตัดสินใจเท่านั้น <br />
          <strong
            >หากมีข้อสงสัยสามารถติดต่อทีมงาน
            เพื่อทำหนังสือสอบถามไปยังหน่วยงานราชการได้</strong
          ><br />
        </div>
        <div style="text-align: center; margin-top: 12px">
          <button class="btn btn-primary" @click="acceptModeDisclaimer">
            รับทราบ
          </button>
        </div>
      </div>
    </div>

    <!-- Coming Soon modal for pledge mode -->
    <div v-if="showComingSoonModal" class="mode-disclaimer-overlay">
      <div class="mode-disclaimer-box" style="max-width: 420px">
        <div class="mode-disclaimer-icon">🚧</div>
        <div
          class="mode-disclaimer-text"
          style="color: #f59e0b; font-size: 18px"
        >
          กำลังพัฒนา<br />
          พร้อมเปิดใช้บริการเร็วๆนี้
        </div>
        <div style="text-align: center; margin-top: 16px">
          <button class="btn btn-primary" @click="closeComingSoon">ตกลง</button>
        </div>
      </div>
    </div>

    <!-- Sale-specific notice popup shown after acknowledging the general disclaimer -->
    <div v-if="showSaleNoticePopup" class="mode-disclaimer-overlay">
      <div class="mode-disclaimer-box" style="max-width: 520px">
        <div class="mode-disclaimer-icon">🔔</div>
        <div class="mode-disclaimer-text" style="text-align: center">
          เตือน: ท่านกำลังเข้าสู่คำสั่งประมวลผลข้อมูลส่วนบุคคล
          ซึ่งท่านมีหน้าที่และความรับผิดชอบในการเข้าถึงข้อมูลเหล่านี้ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล
          พ.ศ. 2562 หากท่านไม่ประสงค์ที่จะดำเนินการต่อ กรุณากดเลือกคำสั่ง ตกลง
        </div>
        <div style="text-align: center; margin-top: 12px">
          <button class="btn btn-primary" @click="showSaleNoticePopup = false">
            ตกลง
          </button>
        </div>
      </div>
    </div>

    <!-- Contact modal: show image directly (use contact-panel.png, fallback to existing image) -->
    <div v-if="showContactModal" class="mode-disclaimer-overlay">
      <div
        class="mode-disclaimer-contact-us"
        style="max-width: 80vw; padding: 8px"
      >
        <img
          :src="isPortrait ? '/img/contact-us-v.jpg' : '/img/contact-us.jpg'"
          alt="Contact"
          style="
            width: 98%;
            height: auto;
            max-height: 80vh;
            display: block;
            border-radius: 8px;
            object-fit: contain;
          "
        />
        <div style="text-align: right; margin-top: 12px">
          <button class="btn btn-secondary" @click="showContactModal = false">
            ปิด
          </button>
        </div>
      </div>
    </div>

    <!-- Purchase modal (ChillPay payment) - styled like screenshot -->
    <div v-if="showPurchaseModal" class="purchase-overlay">
      <div class="purchase-box">
        <div class="purchase-icon">💳</div>
        <div class="purchase-text">
          <div class="purchase-title">
            เพื่อดูรายละเอียดการติดต่อ คุณต้องชำระค่าบริการเล็กน้อย
          </div>
          <div class="purchase-sub">💎 DEMO MODE - ชำระเงินแบบจำลอง</div>
          <div class="purchase-note">
            ⚠️ นี่คือโหมดทดสอบ<br />
            ระบบจะจำลองการชำระเงินโดยไม่มีการหักเงินจริง
          </div>
          <div v-if="chillpayProcessing" class="purchase-processing">
            <div class="spinner"></div>
            <span>กำลังประมวลผล...</span>
          </div>
        </div>
        <div class="purchase-actions">
          <button
            class="btn btn-secondary"
            @click="cancelPurchase"
            :disabled="chillpayProcessing"
          >
            ยกเลิก
          </button>
          <button
            class="btn btn-primary"
            @click="confirmPurchase"
            :disabled="chillpayProcessing"
          >
            {{
              chillpayProcessing ? "กำลังดำเนินการ..." : "💳 ชำระเงิน (Demo)"
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- Full details modal (shows seller contact after purchase or if owner) -->
    <div v-if="showFullDetailsModal" class="mode-disclaimer-overlay">
      <div
        class="mode-disclaimer-box"
        style="max-width: 520px; text-align: left; color: #0b1220"
      >
        <h3 style="margin: 0 0 8px">ข้อมูลผู้ขาย (เฉพาะผู้ที่ซื้อแล้ว)</h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap">
          <div style="flex: 1; min-width: 140px">
            <strong>ชื่อ:</strong>
            <div>
              {{ fullDetailsLand?.owner || fullDetailsLand?.agent || "-" }}
            </div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>ขนาดที่ดิน:</strong>
            <div>
              {{ fullDetailsLand?.size || fullDetailsLand?.area || "-" }} ตร.วา
            </div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>ขนาด (ไร่/งาน/วา):</strong>
            <div>
              {{
                (raiModel || "-") +
                " / " +
                (nganModel || "-") +
                " / " +
                (wahModel || "-")
              }}
            </div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>หน้ากว้างติดถนน:</strong>
            <div>
              {{ fullDetailsLand?.frontage || fullDetailsLand?.width || "-" }}
              ม.
            </div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>ขนาดถนน:</strong>
            <div>{{ landData.road || "-" }} ม.</div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>ราคา/ตร.วา:</strong>
            <div>
              {{
                formatPrice(
                  fullDetailsLand?.pricePerSqw || fullDetailsLand?.price,
                )
              }}
              บ.
            </div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>ราคารวม:</strong>
            <div>{{ formatPrice(fullDetailsLand?.totalPrice) }} บ.</div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>โทร:</strong>
            <div>{{ fullDetailsLand?.phone || "-" }}</div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>LINE ID</strong>
            <div>{{ fullDetailsLand?.lineId || "-" }}</div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>กรอบที่ดิน</strong>
            <div>
              <a
                class="download-link"
                href="https://drive.google.com/drive/folders/14egaStxGXWacaO9cq7vaJCOFm2wIurmy?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style="color: #e11d48; text-decoration: underline"
                onclick="this.classList.add('sqw-blink'); setTimeout(()=>this.classList.remove('sqw-blink'),900);"
                >คลิ้กเพื่อดาวน์โหลด</a
              >
            </div>
          </div>
          <div style="flex: 1; min-width: 140px">
            <strong>ข้อมูลโฉนด/ระวาง</strong>
            <div>
              <a
                class="download-link"
                href="https://drive.google.com/drive/folders/14egaStxGXWacaO9cq7vaJCOFm2wIurmy?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style="color: #e11d48; text-decoration: underline"
                onclick="this.classList.add('sqw-blink'); setTimeout(()=>this.classList.remove('sqw-blink'),900);"
                >คลิ้กเพื่อดาวน์โหลด</a
              >
            </div>
          </div>
        </div>

        <!-- แสดงรูปภาพทั้งหมด -->
        <div
          v-if="fullDetailsLand?.images && fullDetailsLand.images.length > 0"
          style="margin-top: 20px"
        >
          <h4 style="margin: 0 0 10px; color: #0b1220">
            รูปภาพประกอบ ({{ fullDetailsLand.images.length }})
          </h4>
          <div class="detail-images-grid">
            <img
              v-for="(img, idx) in fullDetailsLand.images"
              :key="idx"
              :src="img.data"
              :alt="'Image ' + (idx + 1)"
              @click="openImageViewer(fullDetailsLand.images, idx)"
              class="detail-image-thumb"
            />
          </div>
        </div>

        <div style="text-align: right; margin-top: 12px">
          <button
            type="button"
            class="btn btn-secondary"
            @click="showFullDetailsModal = false"
            @touchstart.prevent="showFullDetailsModal = false"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>

    <!-- Image Viewer Modal (LINE-style) -->
    <div
      v-if="showImageViewer"
      class="image-viewer-overlay"
      @click="closeImageViewer"
    >
      <div class="image-viewer-container" @click.stop>
        <button
          type="button"
          class="image-viewer-close"
          @click="closeImageViewer"
          @touchstart.prevent="closeImageViewer"
        >
          &times;
        </button>

        <button
          v-if="currentImageIndex > 0"
          class="image-viewer-nav prev"
          @click="prevImage"
        >
          &#8249;
        </button>

        <div class="image-viewer-content">
          <img
            :src="viewerImages[currentImageIndex]?.data"
            :alt="'Image ' + (currentImageIndex + 1)"
            class="image-viewer-img"
          />
          <div class="image-viewer-counter">
            {{ currentImageIndex + 1 }} / {{ viewerImages.length }}
          </div>
        </div>

        <button
          v-if="currentImageIndex < viewerImages.length - 1"
          class="image-viewer-nav next"
          @click="nextImage"
        >
          &#8250;
        </button>
      </div>
    </div>

    <div v-if="!currentMode" class="mode-select fullscreen1"></div>
    <div v-if="showModeDisclaimerModal" class="mode-select fullscreen1"></div>

    <!-- หน้าเลือกโหมด (ขึ้นเมื่อเปิดครั้งแรก)-->
    <div v-if="!currentMode" class="mode-select fullscreen">
      <h2>เลือกโหมดการใช้งาน</h2>
      <p>กรุณาเลือกดูข้อมูลที่ดิน</p>

      <div class="mode-buttons">
        <button class="mode-btn sale" @click="selectMode('sale')">
          ซื้อขายที่ดิน
        </button>
        <button class="mode-btn pledge" @click="selectMode('pledge')">
          ขายฝากที่ดิน
        </button>
        <button class="mode-btn eia" @click="selectMode('eia')">
          Future project & EIA Map Base
        </button>
      </div>
    </div>

    <!-- Login modal shown after selecting a mode when not authenticated -->
    <div v-if="showLoginModalAfterMode" class="mode-disclaimer-overlay">
      <div
        class="mode-select fullscreen"
        style="max-width: 500px; text-align: left"
      >
        <div style="text-align: center; margin-top: 8px">
          <h1 style="color: black">Login with Gmail</h1>
          <h1 style="color: black">เพื่อเข้าใช้งาน (Free)</h1>
          <button
            class="google-btn"
            @click="loginWithGoogleFromModal"
            style="
              border: 1px solid black;
              border-radius: 20px;
              padding: 10px;
              margin-top: 20px;
            "
          >
            <svg
              class="google-icon"
              viewBox="0 0 24 24"
              width="80px"
              height="80px"
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
      </div>
    </div>
    <div
      v-else-if="currentMode === 'eia' && showSelectAreaModal"
      class="mode-select selact-area"
    >
      <div class="form-section-area">
        <div class="header-title">เลือกพื้นที่</div>
        <div class="selact-area-btn">
          <button class="area-btn" @click="centerBangkok()">Bangkok</button>
          <button
            class="area-btn"
            @click="centerTo(101.15871369838715, 12.898715399777016, 10)"
          >
            EEC
          </button>
          <button
            class="area-btn"
            @click="centerTo(98.34484040737152, 7.958483076083571, 12)"
          >
            Phuket
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="currentMode === 'sale'">
      <nav class="navbar">
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
                        landData.totalPrice,
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

              <!-- อัปโหลดรูป (Max 5 รูป) -->
              <div class="form-group">
                <label class="form-group">
                  อัปโหลดรูป Max 5 รูป
                  <span
                    v-if="landData.images && landData.images.length > 0"
                    style="color: #e11d48; font-weight: bold"
                  >
                    ({{ landData.images.length }}/5)
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  @change="handleImageUpload"
                  :disabled="landData.images && landData.images.length >= 5"
                  class="form-input"
                  style="padding: 8px"
                />

                <!-- แสดงรูปที่อัปโหลดแล้ว -->
                <div
                  v-if="landData.images && landData.images.length > 0"
                  class="image-preview-grid"
                >
                  <div
                    v-for="(img, idx) in landData.images"
                    :key="idx"
                    class="image-preview-item"
                  >
                    <img
                      :src="img.data"
                      :alt="img.name"
                      @click="openImageViewer(landData.images, idx)"
                    />
                    <button
                      type="button"
                      class="remove-image-btn"
                      @click="removeImage(idx)"
                      @touchstart.prevent="removeImage(idx)"
                      title="ลบรูป"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 10px; margin-top: 30px">
                <button
                  class="btn btn-primary btn-full"
                  @click="saveLandData"
                  style="flex: 1"
                >
                  บันทึกและปิด
                </button>

                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteLandItem(editingLandId)"
                  :disabled="!editingLandId"
                  style="
                    padding: 10px 14px;
                    background: #e11d48;
                    color: #fff;
                    border: 0;
                    border-radius: 6px;
                  "
                  title="ลบแปลงนี้"
                >
                  ลบแปลง
                </button>
              </div>
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
                    <!-- แสดงรูปต่อท้ายชื่อ -->
                    <div
                      v-if="land.images && land.images.length > 0"
                      class="land-images-inline"
                    >
                      <img
                        v-for="(img, imgIdx) in land.images"
                        :key="imgIdx"
                        :src="img.data"
                        :alt="'Image ' + (imgIdx + 1)"
                        @click.stop="openImageViewer(land.images, imgIdx)"
                        class="land-thumbnail"
                      />
                    </div>
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

    <div v-else-if="currentMode === 'eia'">
      <nav class="navbar">
        <!-- Form Section -->
        <div class="form-section">
          <h3 @click="isFormOpen = !isFormOpen" style="cursor: pointer">
            Future Project Data
            <span v-if="isFormOpen">▲</span>
            <span v-else>▼</span>
          </h3>

          <transition name="fade">
            <div v-show="isFormOpen">
              <div class="form-subtitle">ข้อมูลโครงการและ EIA</div>

              <div class="form-row" style="display: flex; gap: 10px">
                <div class="form-group" style="flex: 1">
                  <label>วันสิ้นสุดโครงการ</label>
                  <input
                    type="date"
                    v-model="eiaProjectData.ownerNameTo"
                    class="form-input"
                  />
                </div>
                <div class="form-group" style="flex: 1">
                  <label>ชื่อโครงการ</label>
                  <input
                    type="text"
                    v-model="eiaProjectData.projectName"
                    class="form-input"
                    placeholder="ชื่อโครงการ"
                  />
                </div>
              </div>
              <div class="form-row" style="display: flex; gap: 10px">
                <div class="form-group" style="flex: 1">
                  <label>Project Value (M)</label>
                  <input
                    type="text"
                    :value="
                      formatProjectValueInput(eiaProjectData.projectValue)
                    "
                    @input="handleProjectValueInput"
                    class="form-input"
                    placeholder="Project Value"
                  />
                </div>
                <div class="form-group" style="flex: 1">
                  <label>เงินลงทุน (M)</label>
                  <input
                    type="text"
                    :value="formatInvestmentInput(eiaProjectData.investment)"
                    @input="handleInvestmentInput"
                    class="form-input"
                    placeholder="Investment"
                  />
                </div>
              </div>

              <!-- รูปภาพโครงการ -->
              <div class="form-group">
                <label>รูปภาพโครงการ</label>
                <input
                  type="file"
                  @change="handleEiaImageUpload"
                  accept="image/*"
                  class="form-input"
                />
                <div
                  v-if="eiaProjectData.projectImageName"
                  style="margin-top: 8px; font-size: 13px; color: #666"
                >
                  📎 {{ eiaProjectData.projectImageName }}
                  <button
                    @click="
                      eiaProjectData.projectImage = '';
                      eiaProjectData.projectImageName = '';
                    "
                    class="btn btn-danger"
                    style="margin-left: 10px; padding: 4px 8px; font-size: 12px"
                  >
                    ลบรูป
                  </button>
                </div>
              </div>
              <div class="form-row" style="display: flex; gap: 10px">
                <div class="form-group" style="flex: 1">
                  <label>ขนาดที่ดิน (ไร่-งาน-วา)</label>
                  <div style="display: flex; gap: 5px">
                    <input
                      type="text"
                      :value="formatNumberInput(eiaProjectData.landSizeRai)"
                      @input="handleRaiInput"
                      class="form-input"
                      placeholder="ไร่"
                      style="flex: 1"
                    />
                    <input
                      type="number"
                      v-model="eiaProjectData.landSizeNgan"
                      @input="handleNganInput"
                      class="form-input"
                      placeholder="งาน"
                      min="0"
                      step="1"
                      style="flex: 1"
                    />
                    <input
                      type="number"
                      v-model="eiaProjectData.landSizeWah"
                      @input="handleWahInput"
                      class="form-input"
                      placeholder="วา"
                      min="0"
                      step="0.01"
                      style="flex: 1"
                    />
                  </div>
                </div>
              </div>
              <!-- พื้นที่ใช้สอย -->
              <div class="form-row" style="display: flex; gap: 10px">
                <div class="form-group" style="flex: 1">
                  <label>พื้นที่ใช้สอย (ตร.ม.)</label>
                  <input
                    type="text"
                    :value="
                      formatNumberInputWithDecimal(eiaProjectData.usableArea)
                    "
                    @input="handleUsableAreaInput"
                    class="form-input"
                    placeholder="พื้นที่ใช้สอย"
                  />
                </div>
                <!-- สถานะโครงการ -->
                <div class="form-group">
                  <label>สถานภาพโครงการ</label>
                  <select
                    v-model="eiaProjectData.projectStatus"
                    class="form-input"
                  >
                    <option value="">เลือกสถานะ</option>
                    <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                    <option value="อยู่ระหว่างขอEIA">ขอEIA</option>
                    <option value="ได้EIAรอก่อสร้าง">รอก่อสร้าง</option>
                    <option value="เริ่มก่อสร้าง">เริ่มก่อสร้าง</option>
                    <option value="ดำเนินการแล้วเสร็จ">แล้วเสร็จ</option>
                  </select>
                </div>
              </div>
              <!-- แถวที่ 7: ทุกภาค + ทุกจังหวัด -->
              <div class="form-row" style="display: flex; gap: 10px">
                <div class="form-group" style="flex: 1">
                  <label>ภูมิภาค</label>
                  <select v-model="eiaProjectData.region" class="form-input">
                    <option value="">ภาค</option>
                    <option value="กรุงเทพและปริมณฑล">กรุงเทพและปริมณฑล</option>
                    <option value="ภาคกลาง">ภาคกลาง</option>
                    <option value="ภาคเหนือ">ภาคเหนือ</option>
                    <option value="ภาคตะวันออกเฉียงเหนือ">
                      ภาคตะวันออกเฉียงเหนือ
                    </option>
                    <option value="ภาคตะวันออก">ภาคตะวันออก</option>
                    <option value="ภาคใต้">ภาคใต้</option>
                  </select>
                </div>
                <!--menu เลือกจังหวัด-->
                <div class="form-group" style="flex: 1">
                  <label>จังหวัด</label>
                  <input
                    list="provinces"
                    v-model="eiaProjectData.province"
                    class="form-input"
                    placeholder="พิมพ์หรือเลือกจังหวัด"
                  />
                  <datalist id="provinces">
                    <option value="กระบี่">กระบี่</option>
                    <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                    <option value="กาญจนบุรี">กาญจนบุรี</option>
                    <option value="กาฬสินธุ์">กาฬสินธุ์</option>
                    <option value="กำแพงเพชร">กำแพงเพชร</option>
                    <option value="ขอนแก่น">ขอนแก่น</option>
                    <option value="จันทบุรี">จันทบุรี</option>
                    <option value="ฉะเชิงเทรา">ฉะเชิงเทรา</option>
                    <option value="ชลบุรี">ชลบุรี</option>
                    <option value="ชัยนาท">ชัยนาท</option>
                    <option value="ชัยภูมิ">ชัยภูมิ</option>
                    <option value="ชุมพร">ชุมพร</option>
                    <option value="เชียงราย">เชียงราย</option>
                    <option value="เชียงใหม่">เชียงใหม่</option>
                    <option value="ตรัง">ตรัง</option>
                    <option value="ตราด">ตราด</option>
                    <option value="ตาก">ตาก</option>
                    <option value="นครนายก">นครนายก</option>
                    <option value="นครปฐม">นครปฐม</option>
                    <option value="นครพนม">นครพนม</option>
                    <option value="นครราชสีมา">นครราชสีมา</option>
                    <option value="นครศรีธรรมราช">นครศรีธรรมราช</option>
                    <option value="นครสวรรค์">นครสวรรค์</option>
                    <option value="นนทบุรี">นนทบุรี</option>
                    <option value="นราธิวาส">นราธิวาส</option>
                    <option value="น่าน">น่าน</option>
                    <option value="บึงกาฬ">บึงกาฬ</option>
                    <option value="บุรีรัมย์">บุรีรัมย์</option>
                    <option value="ปทุมธานี">ปทุมธานี</option>
                    <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</option>
                    <option value="ปราจีนบุรี">ปราจีนบุรี</option>
                    <option value="ปัตตานี">ปัตตานี</option>
                    <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา</option>
                    <option value="พังงา">พังงา</option>
                    <option value="พัทลุง">พัทลุง</option>
                    <option value="พิจิตร">พิจิตร</option>
                    <option value="พิษณุโลก">พิษณุโลก</option>
                    <option value="เพชรบุรี">เพชรบุรี</option>
                    <option value="เพชรบูรณ์">เพชรบูรณ์</option>
                    <option value="แพร่">แพร่</option>
                    <option value="พะเยา">พะเยา</option>
                    <option value="ภูเก็ต">ภูเก็ต</option>
                    <option value="มหาสารคาม">มหาสารคาม</option>
                    <option value="มุกดาหาร">มุกดาหาร</option>
                    <option value="แม่ฮ่องสอน">แม่ฮ่องสอน</option>
                    <option value="ยโสธร">ยโสธร</option>
                    <option value="ยะลา">ยะลา</option>
                    <option value="ร้อยเอ็ด">ร้อยเอ็ด</option>
                    <option value="ระนอง">ระนอง</option>
                    <option value="ระยอง">ระยอง</option>
                    <option value="ราชบุรี">ราชบุรี</option>
                    <option value="ลพบุรี">ลพบุรี</option>
                    <option value="ลำปาง">ลำปาง</option>
                    <option value="ลำพูน">ลำพูน</option>
                    <option value="เลย">เลย</option>
                    <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                    <option value="สกลนคร">สกลนคร</option>
                    <option value="สงขลา">สงขลา</option>
                    <option value="สตูล">สตูล</option>
                    <option value="สมุทรปราการ">สมุทรปราการ</option>
                    <option value="สมุทรสงคราม">สมุทรสงคราม</option>
                    <option value="สมุทรสาคร">สมุทรสาคร</option>
                    <option value="สระแก้ว">สระแก้ว</option>
                    <option value="สระบุรี">สระบุรี</option>
                    <option value="สิงห์บุรี">สิงห์บุรี</option>
                    <option value="สุโขทัย">สุโขทัย</option>
                    <option value="สุพรรณบุรี">สุพรรณบุรี</option>
                    <option value="สุราษฎร์ธานี">สุราษฎร์ธานี</option>
                    <option value="สุรินทร์">สุรินทร์</option>
                    <option value="หนองคาย">หนองคาย</option>
                    <option value="หนองบัวลำภู">หนองบัวลำภู</option>
                    <option value="อ่างทอง">อ่างทอง</option>
                    <option value="อุดรธานี">อุดรธานี</option>
                    <option value="อุทัยธานี">อุทัยธานี</option>
                    <option value="อุตรดิตถ์">อุตรดิตถ์</option>
                    <option value="อุบลราชธานี">อุบลราชธานี</option>
                    <option value="อำนาจเจริญ">อำนาจเจริญ</option>
                  </datalist>
                </div>
              </div>

              <!-- แถวที่ 8: เขต/อำเภอ + แขวง/ตำบล -->
              <div class="form-row" style="display: flex; gap: 10px">
                <div class="form-group" style="flex: 1">
                  <label>เขต/อำเภอ</label>
                  <input
                    type="text"
                    v-model="eiaProjectData.district"
                    class="form-input"
                    list="district-list"
                    placeholder="เลือกหรือพิมพ์อำเภอ"
                    :disabled="!eiaProjectData.province"
                  />
                  <datalist id="district-list">
                    <option
                      v-for="district in availableDistricts"
                      :key="district"
                      :value="district"
                    />
                  </datalist>
                </div>
                <div class="form-group" style="flex: 1">
                  <label>แขวง/ตำบล</label>
                  <input
                    type="text"
                    v-model="eiaProjectData.subdistrict"
                    class="form-input"
                    list="subdistrict-list"
                    placeholder="เลือกหรือพิมพ์ตำบล"
                    :disabled="!eiaProjectData.district"
                  />
                  <datalist id="subdistrict-list">
                    <option
                      v-for="subdistrict in availableSubdistricts"
                      :key="subdistrict"
                      :value="subdistrict"
                    />
                  </datalist>
                </div>
              </div>

              <!-- Link เอกสาร -->
              <div class="form-group">
                <label>Link เอกสาร EIA</label>
                <input
                  type="text"
                  v-model="eiaProjectData.projectLink"
                  class="form-input"
                  placeholder="https://..."
                />
              </div>

              <!-- Link เอกสาร ช่องที่ 2 -->
              <div class="form-group">
                <label>Link ข่าวสาร/ข้อมูล</label>
                <input
                  type="text"
                  v-model="eiaProjectData.projectLink2"
                  class="form-input"
                  placeholder="https://..."
                />
              </div>

              <!-- วันที่อัพเดตล่าสุด (อ่านอย่างเดียว) -->
              <div class="form-group" v-if="eiaProjectData.lastUpdated">
                <label>วันที่อัพเดตล่าสุด</label>
                <input
                  type="text"
                  :value="formatDateTime(eiaProjectData.lastUpdated)"
                  class="form-input"
                  readonly
                  style="
                    background-color: #1a2332;
                    color: #9ca3af;
                    cursor: not-allowed;
                  "
                />
              </div>

              <div style="display: flex; gap: 8px; margin-top: 16px">
                <button
                  v-if="!editingEiaId"
                  class="btn btn-success"
                  @click="saveEiaProjectFromForm"
                  style="flex: 1"
                >
                  💾
                </button>
                <button
                  v-if="editingEiaId"
                  class="btn btn-success"
                  @click="saveEiaProjectFromForm"
                  style="flex: 1"
                >
                  💾
                </button>
                <button
                  v-if="editingEiaId"
                  class="btn btn-danger"
                  @click="deleteEiaProjectData(editingEiaId)"
                  style="flex: 1"
                >
                  🗑️
                </button>
                <button
                  class="btn btn-secondary"
                  @click="clearEiaForm"
                  style="flex: 1"
                >
                  ❌
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- List Section -->
        <div class="list-section" style="margin-top: 20px; color: #ffffff">
          <h3 @click="isListOpen = !isListOpen" style="cursor: pointer">
            รายการโครงการ ({{ filteredEiaProjects.length }})
            <span v-if="isListOpen">▲</span>
            <span v-else>▼</span>
          </h3>

          <transition name="fade">
            <div v-show="isListOpen">
              <div v-if="filteredEiaProjects.length > 0" class="land-list">
                <div
                  v-for="project in filteredEiaProjects"
                  :key="project.id"
                  class="land-item"
                  @click="editEiaProject(project)"
                  :class="{ active: editingEiaId === project.id }"
                >
                  <div class="land-info">
                    <div class="land-owner">
                      {{ project.projectName || "ไม่มีชื่อ" }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="no-data">ยังไม่มีข้อมูลโครงการ</div>
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
        <!-- Layers Button (moved to top) -->
        <button
          class="control-btn layers-btn"
          @click="toggleLayers"
          title="Layers"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </button>

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
          @click="toggleChat"
          :title="
            hasNewMessage
              ? unreadFromUsers.join(', ') + ' ส่งข้อความมา'
              : 'P2P Chat'
          "
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

        <!-- Draw (pencil) Button -->
        <button
          ref="drawBtn"
          class="control-btn draw-btn"
          :class="{ active: showDrawMenu }"
          @click="showDrawMenu = !showDrawMenu"
          title="Draw"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M3 21v-3.75L14.06 6.19a2 2 0 0 1 2.83 0l1.92 1.92a2 2 0 0 1 0 2.83L7.75 21H3z"
            />
            <path d="M14 7l3 3" />
          </svg>
        </button>
      </div>

      <!-- Draw Panel: moved out as floating popup (see below) -->

      <!-- Search Panel -->
      <div
        class="search-panel"
        v-show="showSearch"
        style="position: fixed; top: 160px; right: 80px; z-index: 2100"
      >
        <div class="panel-header">
          <h3>ค้นหา</h3>
          <button
            type="button"
            @click="showSearch = false"
            @touchstart.prevent="showSearch = false"
            class="close-btn"
          >
            ×
          </button>
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

      <!-- Filters Panel for Land Mode -->
      <div
        v-if="currentMode !== 'eia'"
        class="filters-panel filters-panel-land"
        v-show="showFilters"
      >
        <div class="panel-header">
          <h3>ตัวกรอง</h3>
          <button
            type="button"
            @click="showFilters = false"
            @touchstart.prevent="showFilters = false"
            class="close-btn"
          >
            ×
          </button>
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

      <!-- Filters Panel for EIA Mode -->
      <div
        ref="eiaFilterPanel"
        v-if="currentMode === 'eia'"
        class="filters-panel filters-panel-eia"
        v-show="showFilters"
        :style="{
          position: 'fixed',
          zIndex: 2100,
          cursor: isDraggingEiaFilter ? 'grabbing' : 'grab',
        }"
        @mousedown="startDragEiaFilter"
      >
        <div class="panel-header" style="cursor: grab">
          <h3>ตัวกรอง Project</h3>
          <button
            type="button"
            @click="showFilters = false"
            @touchstart.prevent="showFilters = false"
            class="close-btn"
          >
            ×
          </button>
        </div>

        <!-- มูลค่าโครงการ (ล้านบาท) -->
        <div class="filter-group">
          <label>Project Value (ล้านบาท)</label>
          <div class="price-range" style="display: flex; gap: 10px">
            <input
              type="text"
              :value="formatNumber(eiaFilters.projectValueMin)"
              @input="
                eiaFilters.projectValueMin = unformatNumber($event.target.value)
              "
              placeholder="ต่ำสุด"
              class="price-input"
              style="width: 50%"
            />
            <input
              type="text"
              :value="formatNumber(eiaFilters.projectValueMax)"
              @input="
                eiaFilters.projectValueMax = unformatNumber($event.target.value)
              "
              placeholder="สูงสุด"
              class="price-input"
              style="width: 50%"
            />
          </div>
        </div>

        <!-- ขนาดที่ดิน (ไร่) -->
        <div class="filter-group">
          <label>ขนาดที่ดิน (ไร่)</label>
          <div class="price-range" style="display: flex; gap: 10px">
            <input
              type="text"
              :value="formatNumber(eiaFilters.landSizeRaiMin)"
              @input="
                eiaFilters.landSizeRaiMin = unformatNumber($event.target.value)
              "
              placeholder="ต่ำสุด"
              class="price-input"
              style="width: 50%"
            />
            <input
              type="text"
              :value="formatNumber(eiaFilters.landSizeRaiMax)"
              @input="
                eiaFilters.landSizeRaiMax = unformatNumber($event.target.value)
              "
              placeholder="สูงสุด"
              class="price-input"
              style="width: 50%"
            />
          </div>
        </div>

        <!-- พื้นที่ใช้สอย (ตร.ม.) -->
        <div class="filter-group">
          <label>พื้นที่ใช้สอย (ตร.ม.)</label>
          <div class="price-range" style="display: flex; gap: 10px">
            <input
              type="text"
              :value="formatNumber(eiaFilters.usableAreaMin)"
              @input="
                eiaFilters.usableAreaMin = unformatNumber($event.target.value)
              "
              placeholder="ต่ำสุด"
              class="price-input"
              style="width: 50%"
            />
            <input
              type="text"
              :value="formatNumber(eiaFilters.usableAreaMax)"
              @input="
                eiaFilters.usableAreaMax = unformatNumber($event.target.value)
              "
              placeholder="สูงสุด"
              class="price-input"
              style="width: 50%"
            />
          </div>
        </div>

        <!-- ภูมิภาค -->
        <div class="filter-group">
          <label>ภูมิภาค</label>
          <select v-model="eiaFilters.region" class="form-select">
            <option value="">ภาค</option>
            <option value="กรุงเทพและปริมณฑล">กรุงเทพและปริมณฑล</option>
            <option value="ภาคกลาง">ภาคกลาง</option>
            <option value="ภาคเหนือ">ภาคเหนือ</option>
            <option value="ภาคตะวันออกเฉียงเหนือ">ภาคตะวันออกเฉียงเหนือ</option>
            <option value="ภาคตะวันออก">ภาคตะวันออก</option>
            <option value="ภาคใต้">ภาคใต้</option>
          </select>
        </div>

        <!-- จังหวัด -->
        <div class="filter-group">
          <label>จังหวัด</label>
          <input
            list="filter-provinces"
            v-model="eiaFilters.province"
            class="form-input"
            placeholder="เลือกจังหวัด"
          />
          <datalist id="filter-provinces">
            <option value="กระบี่">กระบี่</option>
            <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
            <option value="กาญจนบุรี">กาญจนบุรี</option>
            <option value="กาฬสินธุ์">กาฬสินธุ์</option>
            <option value="กำแพงเพชร">กำแพงเพชร</option>
            <option value="ขอนแก่น">ขอนแก่น</option>
            <option value="จันทบุรี">จันทบุรี</option>
            <option value="ฉะเชิงเทรา">ฉะเชิงเทรา</option>
            <option value="ชลบุรี">ชลบุรี</option>
            <option value="ชัยนาท">ชัยนาท</option>
            <option value="ชัยภูมิ">ชัยภูมิ</option>
            <option value="ชุมพร">ชุมพร</option>
            <option value="เชียงราย">เชียงราย</option>
            <option value="เชียงใหม่">เชียงใหม่</option>
            <option value="ตรัง">ตรัง</option>
            <option value="ตราด">ตราด</option>
            <option value="ตาก">ตาก</option>
            <option value="นครนายก">นครนายก</option>
            <option value="นครปฐม">นครปฐม</option>
            <option value="นครพนม">นครพนม</option>
            <option value="นครราชสีมา">นครราชสีมา</option>
            <option value="นครศรีธรรมราช">นครศรีธรรมราช</option>
            <option value="นครสวรรค์">นครสวรรค์</option>
            <option value="นนทบุรี">นนทบุรี</option>
            <option value="นราธิวาส">นราธิวาส</option>
            <option value="น่าน">น่าน</option>
            <option value="บึงกาฬ">บึงกาฬ</option>
            <option value="บุรีรัมย์">บุรีรัมย์</option>
            <option value="ปทุมธานี">ปทุมธานี</option>
            <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</option>
            <option value="ปราจีนบุรี">ปราจีนบุรี</option>
            <option value="ปัตตานี">ปัตตานี</option>
            <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา</option>
            <option value="พังงา">พังงา</option>
            <option value="พัทลุง">พัทลุง</option>
            <option value="พิจิตร">พิจิตร</option>
            <option value="พิษณุโลก">พิษณุโลก</option>
            <option value="เพชรบุรี">เพชรบุรี</option>
            <option value="เพชรบูรณ์">เพชรบูรณ์</option>
            <option value="แพร่">แพร่</option>
            <option value="พะเยา">พะเยา</option>
            <option value="ภูเก็ต">ภูเก็ต</option>
            <option value="มหาสารคาม">มหาสารคาม</option>
            <option value="มุกดาหาร">มุกดาหาร</option>
            <option value="แม่ฮ่องสอน">แม่ฮ่องสอน</option>
            <option value="ยโสธร">ยโสธร</option>
            <option value="ยะลา">ยะลา</option>
            <option value="ร้อยเอ็ด">ร้อยเอ็ด</option>
            <option value="ระนอง">ระนอง</option>
            <option value="ระยอง">ระยอง</option>
            <option value="ราชบุรี">ราชบุรี</option>
            <option value="ลพบุรี">ลพบุรี</option>
            <option value="ลำปาง">ลำปาง</option>
            <option value="ลำพูน">ลำพูน</option>
            <option value="เลย">เลย</option>
            <option value="ศรีสะเกษ">ศรีสะเกษ</option>
            <option value="สกลนคร">สกลนคร</option>
            <option value="สงขลา">สงขลา</option>
            <option value="สตูล">สตูล</option>
            <option value="สมุทรปราการ">สมุทรปราการ</option>
            <option value="สมุทรสงคราม">สมุทรสงคราม</option>
            <option value="สมุทรสาคร">สมุทรสาคร</option>
            <option value="สระแก้ว">สระแก้ว</option>
            <option value="สระบุรี">สระบุรี</option>
            <option value="สิงห์บุรี">สิงห์บุรี</option>
            <option value="สุโขทัย">สุโขทัย</option>
            <option value="สุพรรณบุรี">สุพรรณบุรี</option>
            <option value="สุราษฎร์ธานี">สุราษฎร์ธานี</option>
            <option value="สุรินทร์">สุรินทร์</option>
            <option value="หนองคาย">หนองคาย</option>
            <option value="หนองบัวลำภู">หนองบัวลำภู</option>
            <option value="อ่างทอง">อ่างทอง</option>
            <option value="อุดรธานี">อุดรธานี</option>
            <option value="อุทัยธานี">อุทัยธานี</option>
            <option value="อุตรดิตถ์">อุตรดิตถ์</option>
            <option value="อุบลราชธานี">อุบลราชธานี</option>
            <option value="อำนาจเจริญ">อำนาจเจริญ</option>
          </datalist>
        </div>

        <!-- สถานะโครงการ -->
        <div class="filter-group">
          <label>สถานภาพโครงการ</label>
          <select v-model="eiaFilters.projectStatus" class="form-select">
            <option value="">ทั้งหมด</option>
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="อยู่ระหว่างขอEIA">ขอEIA</option>
            <option value="ได้EIAรอก่อสร้าง">รอก่อสร้าง</option>
            <option value="เริ่มก่อสร้าง">เริ่มก่อสร้าง</option>
            <option value="ดำเนินการแล้วเสร็จ">แล้วเสร็จ</option>
          </select>
        </div>

        <!-- สถานะพิจารณา -->

        <div class="flex gap-2">
          <button class="btn btn-primary" @click="applyEiaFilters">
            ใช้ตัวกรอง
          </button>
          <button class="btn btn-secondary" @click="resetEiaFilters">
            ล้างตัวกรอง
          </button>
        </div>
      </div>

      <!-- Layers Panel -->
      <div
        class="layers-panel"
        v-show="showLayers"
        style="position: fixed; z-index: 2100"
      >
        <div class="panel-header">
          <h3>Layers</h3>
          <button
            type="button"
            @click="showLayers = false"
            @touchstart.prevent="showLayers = false"
            class="close-btn"
          >
            ×
          </button>
        </div>

        <div class="layer-section">
          <div class="layer-buttons">
            <button @click="addBangkokOverlay()" class="btn btn-info">
              ผังเมือง กทม. 2556
            </button>
            <button @click="addBangkokOverlayDaft()" class="btn btn-info">
              ผังเมือง กทม. 2570 (ร่าง)
            </button>
            <button @click="clearBangkokOverlay()" class="btn btn-info">
              ซ่อนผังเมือง
            </button>
          </div>

          <div class="opacity-control">
            <label class="opacity-label">Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              :value="kmlOpacity"
              class="slider"
              @input="setBangkokOverlayOpacity($event.target.value)"
            />
            <span class="opacity-value">{{ kmlOpacity.toFixed(2) }}</span>
          </div>
        </div>

        <div class="layer-section">
          <label class="checkbox-label">
            <input type="checkbox" v-model="dolEnabled" @change="onToggleDol" />
            <span class="checkmark">{{ dolEnabled ? "✓" : "" }}</span>
            ระวางกรมที่ดินสีแดง
          </label>
          <div class="opacity-control">
            <label class="opacity-label">Opacity</label>
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
        </div>
      </div>

      <!-- P2P Chat Panel -->
      <div
        class="chat-popup"
        v-show="showChat"
        style="position: fixed; inset: auto 10px 10px auto; z-index: 9999"
      >
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
          <button
            type="button"
            @click="showChat = false"
            @touchstart.prevent="showChat = false"
            class="close-btn"
          >
            ×
          </button>
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

        <!-- โหมด รายชื่อ (rooms) - แบบ Messenger -->
        <div v-if="chatMode === 'rooms'" class="rooms-pane messenger-style">
          <!-- แท็บเลือก -->
          <div class="messenger-tabs">
            <button
              class="tab-btn"
              :class="{ active: chatTabMode === 'recent' }"
              @click="chatTabMode = 'recent'"
            >
              แชทล่าสุด
              <span v-if="unreadCount > 0" class="tab-badge">{{
                unreadCount
              }}</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: chatTabMode === 'online' }"
              @click="chatTabMode = 'online'"
            >
              ออนไลน์
              <span class="tab-badge">{{ onlineUsers.length }}</span>
            </button>
          </div>

          <!-- รายการแชทล่าสุด (คนที่เคยคุย) -->
          <div v-if="chatTabMode === 'recent'" class="chat-list">
            <div v-if="chatRooms.length === 0" class="empty-state">
              ยังไม่มีการสนทนา<br />
              <small>คลิกแท็บ "ออนไลน์" เพื่อเริ่มคุย</small>
            </div>
            <div
              v-else
              v-for="room in chatRooms"
              :key="room.roomId"
              class="chat-room-item"
              :class="{ unread: room.unreadCount > 0 }"
              @click="openChatRoom(room)"
            >
              <div class="room-avatar">
                {{ (room.otherName || "U").charAt(0).toUpperCase() }}
              </div>
              <div class="room-info">
                <div class="room-name">{{ room.otherName }}</div>
                <div class="room-preview">
                  {{ room.lastText || "เริ่มการสนทนา..." }}
                </div>
              </div>
              <div class="room-meta">
                <div class="room-time">{{ formatTimeAgo(room.lastAt) }}</div>
                <span v-if="room.unreadCount > 0" class="unread-badge">{{
                  room.unreadCount
                }}</span>
              </div>
              <button
                class="delete-chat-btn"
                @click.stop="confirmDeleteChat(room)"
                title="ลบการสนทนา"
              >
                🗑️
              </button>
            </div>
          </div>

          <!-- รายการคนออนไลน์ -->
          <div v-else class="user-list">
            <div v-if="onlineUsers.length === 0" class="empty-state">
              ยังไม่มีใครออนไลน์
            </div>
            <button
              v-else
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

    <!-- Floating Draw Panel (popup, not embedded) - Sale Mode Only -->
    <div
      v-if="currentMode === 'sale'"
      ref="drawPanel"
      class="draw-panel floating-draw"
      v-show="showDrawMenu"
      style="position: fixed; top: 160px; right: 80px; z-index: 2100"
    >
      <div class="panel-header">
        <h3>วาดพื้นที่</h3>
        <button
          type="button"
          @click="showDrawMenu = false"
          @touchstart.prevent="showDrawMenu = false"
          class="close-btn"
        >
          ×
        </button>
      </div>

      <div style="display: flex; gap: 8px; padding: 12px">
        <button class="btn btn-info" @click="startDrawing">
          เริ่มวาดขอบเขต
        </button>
        <button class="btn btn-success" @click="finishDrawing">Finish</button>
        <button class="btn btn-danger" @click="clearDrawing">Clear</button>
      </div>
    </div>

    <!-- Floating Draw Panel for EIA Mode -->
    <div
      v-if="currentMode === 'eia'"
      ref="drawPanelEia"
      class="draw-panel floating-draw"
      v-show="showDrawMenu"
      style="position: fixed; top: 160px; right: 80px; z-index: 2100"
    >
      <div class="panel-header">
        <h3>วาดขอบเขต Project</h3>
        <button
          type="button"
          @click="showDrawMenu = false"
          @touchstart.prevent="showDrawMenu = false"
          class="close-btn"
        >
          ×
        </button>
      </div>

      <div style="display: flex; gap: 8px; padding: 12px">
        <button class="btn btn-info" @click="startDrawing">
          เริ่มวาดขอบเขต
        </button>
        <button class="btn btn-success" @click="finishDrawing">Finish</button>
        <button class="btn btn-danger" @click="clearDrawing">Clear</button>
      </div>
    </div>
  </div>

  <!-- Floating dashboard: centered at bottom of viewport -->
  <div id="floating-dashboard" class="floating-dashboard" aria-hidden="false">
    <!-- แสดงสถิติที่ดินเมื่ออยู่ในโหมดที่ดิน -->
    <template v-if="currentMode !== 'eia'">
      <div class="dashboard land-plots">
        <div class="dashboard-label">ที่ดินทั้งหมด</div>
        <span class="dashboard-number"
          >{{ dashboard.plots.toLocaleString() }}
        </span>
        <span class="highlight">ประกาศ</span>
      </div>
      <div class="dashboard area">
        <div class="dashboard-label">จำนวนรวม</div>
        <span class="dashboard-number">{{ fmt(dashboard.areaRai) }} </span>
        <span class="highlight"> ไร่</span>
      </div>
      <div class="dashboard value">
        <div class="dashboard-label">มูลค่าที่ดินรวม</div>
        <span class="dashboard-number">{{
          fmt(dashboard.totalValueMillion)
        }}</span>
        <span class="highlight">ล้านบาท</span>
      </div>
    </template>

    <!-- แสดงสถิติ EIA เมื่ออยู่ในโหมด EIA -->
    <template v-else>
      <div class="dashboard land-plots">
        <div class="dashboard-label">โครงการทั้งหมด</div>
        <span class="dashboard-number"
          >{{ eiaStatistics.totalProjects.toLocaleString() }}
        </span>
        <span class="highlight">โครงการ</span>
      </div>
      <div class="dashboard value">
        <div class="dashboard-label">Project Value Total</div>
        <span class="dashboard-number">{{
          eiaStatistics.totalValueFormatted
        }}</span>
        <span class="highlight">ล้านบาท</span>
      </div>
    </template>
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
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  color: #0b1220;
  padding: 20px 22px;
  border-radius: 14px;
  width: 90%;
  max-width: 540px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.18);
  border: 1px solid rgba(15, 23, 42, 0.06);
  transform-origin: center;
  animation: pop-in 180ms ease-out;
}
.mode-disclaimer-icon {
  font-size: 46px;
  margin-bottom: 8px;
}
.mode-disclaimer-contact-us {
  background: linear-gradient(180deg, #ffffff, #fbfdff);
  color: #0b1220;
  padding: 20px 22px;
  border-radius: 14px;
  width: fit-content;
  max-width: 94vw;
  text-align: center;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.18);
  border: 1px solid rgba(15, 23, 42, 0.06);
  transform-origin: center;
  animation: pop-in 180ms ease-out;
}

@keyframes pop-in {
  from {
    transform: scale(0.98);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Buttons used in modals */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 600;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-primary {
  background: #f59e0b;
  color: #fff;
  border-color: rgba(0, 0, 0, 0.05);
}
.btn-primary:hover {
  filter: brightness(0.98);
}
.btn-secondary {
  background: #f3f4f6;
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.04);
}

/* Login modal specific */
.login-modal .form-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e6e9ef;
  box-sizing: border-box;
}
.mode-disclaimer-box .google-btn {
  background: transparent;
  border: 1px solid #e6e9ef;
  color: #0b1220;
  padding: 8px 12px;
  border-radius: 8px;
}
.mode-disclaimer-text {
  font-weight: 700;
  line-height: 1.45;
  color: #b91c1c;
}

/* Global loading overlay used while loading full details */
.global-loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2300;
}
.global-loading-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 18px 22px;
  border-radius: 10px;
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

/* Make popup headers show draggable cursor */
.panel-header,
.chat-header,
.purchase-text {
  cursor: move;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

/* ===== FORCE LONGDO POPUP OVERRIDE (NUCLEAR MODE) ===== */

/* Ensure inner content containers relax restrictions */
.ldmap_popup_content,
.ldmap_content,
.ldmap_element,
.ldmap_body {
  max-height: none !important;
  overflow: visible !important;
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
@import "./styles/popUp.css";

/* Purchase modal styles (matching screenshot) */
.purchase-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 3000;
}
.purchase-box {
  background: #ffffff;
  color: #0b1220;
  padding: 20px 22px;
  border-radius: 12px;
  min-width: 420px;
  max-width: 92%;
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.65);
  text-align: center;
}
.purchase-icon {
  font-size: 42px;
  margin-bottom: 8px;
}
.purchase-text .purchase-title {
  font-weight: 700;
  margin-bottom: 6px;
}
.purchase-text .purchase-sub {
  color: #3b82f6;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}
.purchase-note {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  color: #92400e;
  line-height: 1.5;
  margin-top: 8px;
}
.purchase-processing {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
  color: #3b82f6;
  font-size: 14px;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.purchase-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}
.purchase-actions .btn {
  min-width: 120px;
}
.purchase-actions .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
/* Floating dashboard (center bottom) */
.floating-dashboard {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 18px;
  display: flex;
  gap: 12px;
  align-items: stretch;
  z-index: 1999;
  pointer-events: auto;
}

/* Floating draw panel: prefer fixed positioning and let JS place it */
.floating-draw {
  background: rgba(6, 10, 15, 0.95);
}

/* Image upload preview grid */
.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  margin-top: 10px;
}

.image-preview-item {
  position: relative;
  width: 100%;
  padding-top: 100%; /* Square aspect ratio */
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #334155;
  cursor: pointer;
}

.image-preview-item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.image-preview-item:hover img {
  transform: scale(1.05);
}

.remove-image-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s;
}

.remove-image-btn:hover {
  background: rgba(220, 38, 38, 1);
}

/* Land list inline images */
.land-images-inline {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.land-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #475569;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.land-thumbnail:hover {
  transform: scale(1.1);
  border-color: #e11d48;
}

/* Image Viewer Modal (LINE-style) */
.image-viewer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

/* Land/EIA Info Popup Card */
.land-info-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  animation: fadeIn 0.2s ease;
  padding: 20px;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.land-info-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  color: #333;
  border: none;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 10;
}

.land-info-close:hover {
  background: rgba(0, 0, 0, 0.2);
}

.land-info-header {
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.info-date {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 8px;
}

.info-date::before {
  content: "🕒";
  font-size: 14px;
}

.info-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.land-info-body {
  padding: 24px;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  min-width: 100px;
}

.info-value {
  flex: 1;
  text-align: right;
  color: #111827;
  font-size: 14px;
  font-weight: 500;
}

.info-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.link-button {
  color: #39ff14 !important;
  text-decoration: underline !important;
  cursor: pointer;
}

.link-button:hover {
  color: #6b0069 !important;
}

/* Info Cards Grid (for EIA and Land info) */
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.info-card {
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}

.info-card-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
}

.info-card-value {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  word-break: break-word;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
}

.contact-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
}

.contact-row:last-child {
  border-bottom: none;
}

.contact-label {
  font-size: 14px;
  color: #6b7280;
}

.contact-value {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  text-align: right;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-action {
  flex: 1;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-action.btn-primary:hover {
  background: #2563eb;
}

.btn-action.btn-secondary {
  background: #3b82f6;
  color: white;
}

.btn-action.btn-secondary:hover {
  background: #2563eb;
}

.btn-action.btn-primary-full {
  flex: 1;
  width: 100%;
  background: #3b82f6;
  color: white;
}

.btn-action.btn-primary-full:hover {
  background: #2563eb;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.image-viewer-container {
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-viewer-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s;
}

.image-viewer-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.image-viewer-content {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-viewer-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.image-viewer-counter {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.image-viewer-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  font-size: 48px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.image-viewer-nav:hover {
  background: rgba(255, 255, 255, 0.3);
}

.image-viewer-nav.prev {
  left: 20px;
}

.image-viewer-nav.next {
  right: 20px;
}

@media (max-width: 768px) {
  .image-viewer-nav {
    width: 40px;
    height: 40px;
    font-size: 36px;
  }

  .image-viewer-nav.prev {
    left: 10px;
  }

  .image-viewer-nav.next {
    right: 10px;
  }

  .image-viewer-close {
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    font-size: 28px;
  }
}

@media (max-width: 720px) {
  .floating-dashboard {
    left: 50%;
    transform: translateX(-50%);
    bottom: 12px;
    gap: 8px;
    padding: 0 10px;
  }
  .floating-dashboard .dashboard {
    padding: 12px 10px;
    min-width: 92px;
  }
}

/* Detail modal images grid */
.detail-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.detail-image-thumb {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #cbd5e1;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.detail-image-thumb:hover {
  transform: scale(1.05);
  border-color: #e11d48;
}

/* Download link blink animation */
.download-link {
  transition: transform 0.12s ease;
}
.sqw-blink {
  animation: sqwBlink 0.9s ease-in-out;
}
@keyframes sqwBlink {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 0.18;
    transform: scale(0.98);
  }
  60% {
    opacity: 0.18;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
