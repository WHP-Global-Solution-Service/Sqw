// app-script.js - Enhanced version with marker management
/* eslint-disable no-unused-vars */
import {
  sendChatMessage,
  subscribeChat,
  onAuthChanged,
  subscribeOnlineUsers,
  subscribeP2PChatRooms,
  updateOnlineStatus,
  markMessagesAsRead,
  deleteChatRoom,
  saveLand,
  deleteLand,
  subscribeLandsAll,
  saveFloodZone,
  deleteFloodZone,
  subscribeFloodZonesAll,
  saveEiaProject,
  deleteEiaProject,
  subscribeEiaProjectsAll,
  getUserProfile,
  loginWithEmail,
  loginWithGoogle,
  checkRedirectResult,
} from "./firebase";

import LoginBar from "./components/LoginBar.vue";
import * as turf from "@turf/turf";
import { thailandLocations } from "./data/thailand-locations.js";
import * as chillpayService from "./services/chillpayService.js";
/* eslint-disable no-empty */
export default {
  name: "App",
  components: { LoginBar },
  data() {
    return {
      // --- Flood Zone layer ---
      floodMode: false,
      floodLevel: 'medium',   // 'low' | 'medium' | 'high'
      showFloodLayer: true,
      floodPoints: [],        // [{lon,lat}, ...] ระหว่างวาด
      floodPolyline: null,    // เส้นชั่วคราว
      floodPolygon: null,     // ชิ้นที่กำลังวาดอยู่
      floodOverlays: [],      // โพลิกอนน้ำท่วมที่วาดเสร็จแล้วทั้งหมด
      selectedFlood: null,             // โพลิกอนที่ถูกเลือก
      selectedFloodHighlight: null,    // เส้นไฮไลท์ชิ้นที่เลือก
      waterAmount: 1,
      savedFloods: [],   // โซนน้ำท่วมที่โหลดมาจาก DB (public)
      floodsUnsub: null, // ตัว unsubscribe
      floodSummary: { low: 0, medium: 0, high: 0, none: 0 },
      _floodPolysCache: [],   // แคช polygon ของน้ำท่วม

      // --- EIA Projects ---
      eiaMode: false,
      eiaDrawMode: false,
      eiaDrawPoints: [],
      eiaDrawPolyline: null,
      eiaDrawPolygon: null,
      eiaOverlays: [],
      savedEiaProjects: [],
      eiaProjectsUnsub: null,
      selectedEiaProject: null,
      showEiaPopup: false,
      eiaProjectData: {
        projectStartDate: '',
        ownerNameTo: '',
        projectName: '',
        projectValue: '',        // มูลค่าโครงการ (ล้านบาท)
        projectImage: '',        // รูปภาพโครงการ (base64)
        projectImageName: '',    // ชื่อไฟล์รูปภาพ
        landSizeRai: '',         // ขนาดที่ดิน (ไร่)
        landSizeNgan: '',        // ขนาดที่ดิน (งาน)
        landSizeWah: '',         // ขนาดที่ดิน (วา)
        usableArea: '',          // พื้นที่ใช้สอย (ตร.ม.)
        reportNumber: '',
        engineerNumber: '',
        approvalDate: '',
        approvalNumber: '',
        projectType: '',
        projectSubType: '',
        reviewStatus: '',
        projectStatus: '',
        region: '',
        province: '',
        district: '',
        subdistrict: '',
        projectLink: '',
        projectLink2: '',
        lastUpdated: null,
      },
      editingEiaId: null,

      // สีสำหรับ EIA Projects
      eiaColor: '#39ff14',
      eiaColorRgb: '57,255,20',
      eiaColorUrlEncoded: '%2339ff14',

      // EIA Filters
      eiaFilters: {
        projectValueMin: '',
        projectValueMax: '',
        landSizeRaiMin: '',
        landSizeRaiMax: '',
        usableAreaMin: '',
        usableAreaMax: '',
        region: '',
        province: '',
        projectStatus: '',
      },
      hasAppliedEiaFilters: false, // flag ว่าเคยกด filter EIA หรือไม่

      // EIA Filter Panel Draggable
      eiaFilterPanelX: window.innerWidth - 400,
      eiaFilterPanelY: 160,
      isDraggingEiaFilter: false,
      dragStartX: 0,
      dragStartY: 0,

      currentMode: null,
      isLoadingDetails: false,
      n_mode: "กรุณาเลือกโหมด", // 'sale' | 'pledge'
      raiModel: "",
      nganModel: "",
      wahModel: "",
      _isSyncingSize: false,

      _isSyncingPrice: false,
      _lastPriceSource: 'perSqw', // 'perSqw' | 'total'


      isFormOpen: true,
      isListOpen: true,
      editingLandId: null,

      snapPoints: [],  // points used for snapping

      mapMarkers: [], // Store actual marker objects
      showMarkerInfo: false,
      selectedMarker: null,
      showEiaInfo: false,
      selectedEiaForInfo: null,
      markerInfoPosition: { x: 0, y: 0 },
      map: null,
      selectedMapType: "hybrid",
      dolEnabled: true,
      opacity: 0.5,
      activeTab: "dashboard",
      snapEnabled: true,
      wmsDol: null,
      leafletWmsDol: null,
      snapSettings: {
        red: 180,
        green: 90,
        blue: 90,
      },
      landData: {
        size: "",
        width: "",
        owner: "",
        agent: "",
        phone: "",
        lineId: "",
        price: "",
        totalPrice: "",
        road: "",
        landFrame: "",
        deedInformation: "",
        images: [],
      },

      savedLands: [],
      filteredLands: [],
      hasAppliedFilters: false, // flag ว่าเคยกด filter หรือไม่

      currentLocation: {
        lat: 13.7563,
        lon: 100.5234,
      },
      currentZoom: 12,
      showSearch: false,
      showFilters: false,
      showLayers: false,
      showDrawMenu: false,
      searchQuery: "",
      filters: {
        landType: "",
        roadWidth: "",
        areaMinRai: "",
        areaMin: "",
        areaMax: "",
        areaMaxRai: "",
        priceMin: "",
        priceMax: "",
        totalPriceMin: "",
        totalPriceMax: "",
        frontMin: "",
        frontMax: "",
      },

      availableLayers: [
        { id: 1, name: "ดาวเทียม", visible: true },
        { id: 2, name: "แผนที่", visible: false },
        { id: 3, name: "จราจร", visible: false },
      ],
      // Chat related data
      showChat: false,
      chatMode: "rooms",
      chatMessages: [],
      chatRooms: [], // รายชื่อห้อง/คู่คุย (แบบง่าย)
      chatInput: "",
      currentUserId: null,
      userProfile: {
        name: "",
        joinedAt: null,
      },
      isAdmin: false,
      tempUserName: "",
      hasNewMessage: false,
      unreadCount: 0,
      lastMessageFrom: "",  // ชื่อคนที่ส่งข้อความมาล่าสุด
      unreadFromUsers: [],   // รายชื่อคนที่มีข้อความยังไม่อ่าน
      chatTabMode: 'recent', // 'recent' = แชทล่าสุด, 'online' = คนออนไลน์
      lastSeenMessageId: null,
      onlineUsers: [],
      selectedUser: null,
      currentChatRoom: null,
      showTypingIndicator: false,
      typingTimer: null,
      chatUnsubscribe: null,
      authUnsubscribe: null,
      myMarker: null,
      locating: false,
      geolocError: null,
      onlineStatusInterval: null,
      chatRoomsUnsubscribe: null,
      p2pChatUnsubscribe: null,
      onlineUsersUnsubscribe: null,
      drawMode: false,
      drawPoints: [],        // [{lon,lat}, ...]
      drawPolyline: null,    // เส้นชั่วคราวขณะวาด
      drawPolygon: null,     // โพลิกอนเมื่อกด Finish
      landOverlays: [],      // เก็บ polygon ของแปลงที่โหลดจาก Firebase
      landsUnsub: null,
      showDisclaimer: true,
      // show a centered modal after selecting sale/pledge mode
      showModeDisclaimerModal: false,
      // Show a sale-specific notice after acknowledging the general disclaimer
      showSaleNoticePopup: false,
      // Coming soon modal for pledge mode
      showComingSoonModal: false,
      // Purchase / details modals (mock payment)
      showPurchaseModal: false,
      purchaseLandPending: null, // land id being purchased
      showFullDetailsModal: false,
      fullDetailsLand: null,
      // Contact modal
      showContactModal: false,
      kmlState: null,        // ผลลัพธ์จาก kmlToLongdoMap (overlays, bound)
      kmlOverlays: [],       // สำรองไว้กรณีต้องจัดการเองเป็นรายชิ้น
      kmlFeatures: [],
      bkkRect: null,
      kmlOpacity: 0.6,   // 0–1

      // Image viewer
      showImageViewer: false,
      viewerImages: [],
      currentImageIndex: 0,

      // ChillPay configuration
      chillpay: {
        merchantCode: 'M037016',
        apiKey: 'Oh7XNjDQowUfM7G020YIU1gt7jNXxIdUaCm8UL8XFXvEzElamuzurR1HGuuxLP8',
        sandboxUrl: 'https://sandbox-pgw.chillpay.co/api/v3',
        backendUrl: 'http://localhost:3001', // Backend server URL
        useBackend: true, // true = ใช้ backend, false = demo mode
      },
      // Login-after-mode state
      showLoginModalAfterMode: false,
      pendingMode: null,
      loginEmail: '',
      loginPassword: '',
      loginError: '',
      chillpayProcessing: false,

      // Portrait mode for contact image
      isPortrait: window.innerHeight > window.innerWidth,

      // Pre-login gate (before mode selection)
      isPreAuthenticated: false,
      preLoginUser: '',
      preLoginPass: '',
      preLoginError: '',

    };
  },

  async mounted() {
    this.initMap();

    // Check pre-authentication status
    this.checkPreAuth();

    // Portrait mode detection for contact image
    this._handleResize = () => {
      this.isPortrait = window.innerHeight > window.innerWidth;
    };
    window.addEventListener('resize', this._handleResize);

    // ตรวจสอบผลลัพธ์จาก Google redirect login (สำหรับมือถือ)
    try {
      const redirectUser = await checkRedirectResult();
      if (redirectUser) {
        console.log('Redirect login success:', redirectUser.email);
        // ถ้ามี pending mode หลังจาก redirect login สำเร็จ
        const pendingMode = sessionStorage.getItem('pendingLoginMode');
        if (pendingMode) {
          sessionStorage.removeItem('pendingLoginMode');
          // รอให้ onAuthChanged ทำงานก่อน แล้วค่อย finalize
          setTimeout(() => {
            this.showLoginModalAfterMode = false;
            this.finalizeModeSelection(pendingMode);
          }, 500);
        }
      }
    } catch (e) {
      console.warn('checkRedirectResult error:', e);
    }

    this.authUnsubscribe = onAuthChanged((u) => {
      // ออกจากระบบ → เคลียร์ state/ยกเลิก subscribe เดิมทั้งหมด
      if (!u) {
        this.resetP2PState();
        this.currentUserId = null;
        this.userProfile = { name: "", joinedAt: null };
        this.isAdmin = false;
        return;
      }

      // ถ้า login สำเร็จจาก redirect และมี pending mode
      const pendingMode = sessionStorage.getItem('pendingLoginMode');
      if (pendingMode) {
        sessionStorage.removeItem('pendingLoginMode');
        this.showLoginModalAfterMode = false;
        setTimeout(() => {
          this.finalizeModeSelection(pendingMode);
        }, 100);
      }

      const ack = localStorage.getItem("ackDisclaimer");
      if (ack === "yes") this.showDisclaimer = false;

      // เปลี่ยนบัญชี → รีเซ็ตก่อน
      const switched = this.currentUserId && this.currentUserId !== u.uid;
      if (switched) this.resetP2PState();

      this.currentUserId = u.uid;
      // determine admin flag from user profile (optional DB field: profile.isAdmin or profile.role==='admin')
      try {
        getUserProfile(u.uid)
          .then((prof) => {
            try {
              this.isAdmin = !!(prof && (prof.isAdmin === true || prof.role === 'admin'));
            } catch (e) { this.isAdmin = false; }
          })
          .catch((e) => {
            console.warn('getUserProfile failed', e);
            this.isAdmin = false;
          });
      } catch (e) {
        this.isAdmin = false;
      }

      // เติมชื่อจากบัญชี (ถ้ายังไม่มีชื่อในช่องแชท)
      if (!this.userProfile.name) {
        this.userProfile.name =
          u.displayName || (u.email ? u.email.split("@")[0] : "");
      }

      // ดัน presence ขึ้น พร้อมชื่อ
      this.updateUserOnlineStatus();

      // เริ่ม subscribe ส่วนต่าง ๆ ของ P2P
      this.initP2PFacade();

      // เช็คว่ามี payment response หรือไม่ (หลัง redirect กลับมา)
      this.checkPaymentResponse();

      // เพิ่ม listener สำหรับรับข้อมูลจาก payment popup
      this.setupPaymentMessageListener();

      // === subscribe lands ของฉัน ===
      this.landsUnsub = subscribeLandsAll((list) => {
        this.savedLands = Array.isArray(list) ? list : [];
        this.renderLandsOnMap();
      });

      // === subscribe EIA projects ===
      this.eiaProjectsUnsub = subscribeEiaProjectsAll((list) => {
        this.savedEiaProjects = Array.isArray(list) ? list : [];
        // Render if in EIA mode OR just render anyway (will check mode inside)
        this.renderEiaProjectsOnMap();

        this.$nextTick(() => this.checkLandsFloodStatus());
      });
    });
    // === subscribe flood zones (public) ===
    this.floodsUnsub = subscribeFloodZonesAll((list) => {
      this.savedFloods = Array.isArray(list) ? list : [];
      this.renderFloodsOnMap();
      this.$nextTick(() => this.checkLandsFloodStatus());
    });
    // enable dragging for popup panels after initial render
    this.$nextTick(() => {
      try { if (typeof this.enableDraggables === 'function') this.enableDraggables(); } catch (e) { console.debug('enableDraggables call failed', e); }

      // Position floating draw panel next to the draw button when opened.
      try {
        // create a placement helper attached to this instance so we can remove listeners later
        this._positionDrawPanel = () => {
          try {
            const btn = (this.$refs && this.$refs.drawBtn) || document.querySelector('.control-btn.draw-btn');
            const panel = (this.$refs && this.$refs.drawPanel) || document.querySelector('.floating-draw');
            if (!btn || !panel) return;

            // ensure panel uses viewport-fixed coordinates so placement is predictable
            panel.style.position = 'fixed';
            panel.style.right = 'auto';
            panel.style.bottom = 'auto';

            const btnRect = btn.getBoundingClientRect();
            const panelRect = panel.getBoundingClientRect();

            // Prefer placing the panel to the left of the button (controls are on the right side)
            const gap = 8; // px
            let left = Math.round(btnRect.left - panelRect.width - gap);
            // If not enough space on left, place to the right of the button
            if (left < 8) left = Math.round(btnRect.right + gap);

            // Align vertically with the button's top (or ensure it stays inside viewport)
            let top = Math.round(btnRect.top);
            if (top + panelRect.height > window.innerHeight - 8) {
              top = Math.max(8, window.innerHeight - panelRect.height - 8);
            }

            panel.style.left = left + 'px';
            panel.style.top = top + 'px';
            panel.style.zIndex = 9999;
          } catch (e) {
            // ignore
          }
        };

        // reposition on resize / scroll
        window.addEventListener('resize', this._positionDrawPanel);
        window.addEventListener('scroll', this._positionDrawPanel, true);

        // watch the showDrawMenu flag and position when it opens
        try {
          this.$watch && this.$watch('showDrawMenu', (val) => {
            if (val) {
              this.$nextTick(() => {
                try { this._positionDrawPanel(); } catch (_) { }
                try {
                  // ensure the draw panel is draggable even if it was not processed earlier
                  const dp = (this.$refs && this.$refs.drawPanel) || document.querySelector('.floating-draw');
                  if (dp) {
                    const handle = dp.querySelector('.panel-header') || dp;
                    try { this._makeDraggable(dp, handle); } catch (_) { }
                  }
                } catch (_) { }
              });
            }
          });
        } catch (e) { }

        // also ensure draw panel gets draggable initialization now (if present)
        try {
          const dpNow = (this.$refs && this.$refs.drawPanel) || document.querySelector('.floating-draw');
          if (dpNow) {
            const h = dpNow.querySelector('.panel-header') || dpNow;
            try { this._makeDraggable(dpNow, h); } catch (_) { }
          }
        } catch (_) { }
      } catch (e) { console.debug('position draw panel setup failed', e); }
    });
  },

  beforeUnmount() {
    if (this.onlineUsersUnsubscribe) this.onlineUsersUnsubscribe();
    if (this.p2pChatUnsubscribe) this.p2pChatUnsubscribe();
    if (this.chatRoomsUnsubscribe) this.chatRoomsUnsubscribe();
    if (this.onlineStatusInterval) clearInterval(this.onlineStatusInterval);
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.authUnsubscribe) this.authUnsubscribe();
    if (this.landsUnsub) this.landsUnsub();
    if (this.floodsUnsub) this.floodsUnsub();
    if (this.eiaProjectsUnsub) this.eiaProjectsUnsub();
    // cleanup portrait resize listener
    if (this._handleResize) {
      window.removeEventListener('resize', this._handleResize);
      this._handleResize = null;
    }
    // cleanup draw panel listeners
    try {
      if (this._positionDrawPanel) {
        window.removeEventListener('resize', this._positionDrawPanel);
        window.removeEventListener('scroll', this._positionDrawPanel, true);
        this._positionDrawPanel = null;
      }
    } catch (e) { }
  },

  computed: {
    visibleMarkers() {
      const q = (this.searchQuery || "").trim().toLowerCase();

      const toNum = (v) => (v === "" || v == null ? null : Number(String(v).replace(/,/g, "")));
      const areaFromDetail = (detail) => {
        if (!detail) return null;
        const m = String(detail).match(/([\d,.]+)/);
        return m ? Number(m[1].replace(/,/g, "")) : null;
      };

      // --- ค่าตัวกรอง ---
      const toSqw = (sqw, rai) => {
        const s = toNum(sqw);
        const r = toNum(rai);
        return (s == null && r == null) ? null : (s || 0) + (r || 0) * 400;
      };
      const aMin = toSqw(this.filters.areaMin, this.filters.areaMinRai);
      const aMax = toSqw(this.filters.areaMax, this.filters.areaMaxRai);
      const pMin = toNum(this.filters.priceMin);
      const pMax = toNum(this.filters.priceMax);
      const tpMin = toNum(this.filters.allPriceMin);
      const tpMax = toNum(this.filters.allPriceMax);
      const fMin = toNum(this.filters.frontMin);
      const fMax = toNum(this.filters.frontMax);

      // รับค่าจาก dropdown ขนาดถนน: ใช้ filters.roadWidth ก่อน ถ้าไม่มีค่อยใช้ filters.landType (โครง UI เก่า)
      const roadSel = (
        this.filters.roadWidth ||
        this.filters.landType ||
        ""
      ).trim();

      // map ค่า dropdown -> ช่วงเมตร
      const roadRange = (sel) => {
        switch (sel) {
          case "lt6":
            return [null, 6];
          case "6-9.99":
            return [6, 9.99];
          case "10-11.99":
            return [10, 11.99];
          case "12-17.99":
            return [12, 17.99];
          case "18-29.99":
            return [18, 29.99];
          case "ge30":
            return [30, null];
          default:
            return [null, null];
        }
      };
      const [rwMin, rwMax] = roadRange(roadSel);

      return (this.markers || []).filter((m) => {
        // ค้นหาข้อความ
        const textOK =
          !q ||
          m.title?.toLowerCase().includes(q) ||
          m.detail?.toLowerCase().includes(q);

        // พื้นที่ (ตร.วา)
        const area = areaFromDetail(m.detail);
        const areaOK =
          (aMin == null || (area != null && area >= aMin)) &&
          (aMax == null || (area != null && area <= aMax));

        // ราคา/ตร.วา (บาท/ตร.วา)
        const ppw = m.pricePerWah != null ? Number(m.pricePerWah) : null;
        const priceOK =
          (pMin == null || (ppw != null && ppw >= pMin)) &&
          (pMax == null || (ppw != null && ppw <= pMax));

        const total =
          m.totalPrice != null
            ? Number(m.totalPrice)
            : (ppw != null && area != null ? ppw * area : null);

        const totalOK =
          (tpMin == null || (total != null && total >= tpMin)) &&
          (tpMax == null || (total != null && total <= tpMax));

        // หน้ากว้าง (เมตร)
        const fg = m.frontage != null ? Number(m.frontage) : null;
        const frontOK =
          (fMin == null || (fg != null && fg >= fMin)) &&
          (fMax == null || (fg != null && fg <= fMax));

        // ถนน (เมตร) จาก m.road
        const road = m.road != null ? Number(m.road) : null;
        const roadOK =
          (rwMin == null || (road != null && road >= rwMin)) &&
          (rwMax == null || (road != null && road <= rwMax));

        return textOK && areaOK && priceOK && totalOK && frontOK && roadOK;
      });
    },
    // ค่ารวมบน Dashboard (ใช้รายการที่กรองแล้ว ถ้าไม่มีใช้ทั้งหมด)
    dashboard() {
      const arr = (this.filteredLands?.length ? this.filteredLands : this.savedLands) || [];

      const plots = arr.length;

      // นับเจ้าของ (fallback: ownerUid > owner > agent)
      const owners = new Set(
        arr.map(it => it.ownerUid || (it.owner || '').trim() || (it.agent || '').trim())
          .filter(Boolean)
      ).size;

      // พื้นที่รวมจาก size (ตร.วา) หรือ area → แปลงเป็น "ไร่"
      const areaSqw = arr.reduce((s, it) => {
        const v = Number(it.size ?? it.area);
        return s + (Number.isFinite(v) ? v : 0);
      }, 0);
      const areaRai = areaSqw / 400;

      // มูลค่ารวม: ใช้ totalPrice ถ้ามี ไม่งั้น pricePerSqw*size
      const totalValue = arr.reduce((s, it) => {
        const tot = Number(it.totalPrice);
        if (Number.isFinite(tot) && tot > 0) return s + tot;
        const p = Number(it.pricePerSqw ?? it.price);
        const sz = Number(it.size ?? it.area);
        return s + (Number.isFinite(p) && Number.isFinite(sz) ? p * sz : 0);
      }, 0);

      return {
        plots,
        owners,
        areaRai,
        totalValue,
        totalValueMillion: totalValue / 1e6,
      };
    },

    // Available districts based on selected province
    availableDistricts() {
      const province = this.eiaProjectData.province?.trim();
      if (!province || !thailandLocations[province]) {
        return [];
      }
      return Object.keys(thailandLocations[province]).sort();
    },

    // Available subdistricts based on selected province and district
    availableSubdistricts() {
      const province = this.eiaProjectData.province?.trim();
      const district = this.eiaProjectData.district?.trim();
      if (!province || !district || !thailandLocations[province] || !thailandLocations[province][district]) {
        return [];
      }
      return thailandLocations[province][district].sort();
    },

    // Filtered EIA Projects
    filteredEiaProjects() {
      const projects = this.savedEiaProjects || [];
      const filters = this.eiaFilters;

      const toNum = (v) => (v === '' || v == null ? null : Number(String(v).replace(/,/g, '')));

      const valueMin = toNum(filters.projectValueMin);
      const valueMax = toNum(filters.projectValueMax);
      const raiMin = toNum(filters.landSizeRaiMin);
      const raiMax = toNum(filters.landSizeRaiMax);
      const areaMin = toNum(filters.usableAreaMin);
      const areaMax = toNum(filters.usableAreaMax);

      return projects.filter((p) => {
        // กรองมูลค่าโครงการ (ล้านบาท)
        const projectValue = Number(p.projectValue);
        const valueOK =
          (valueMin == null || (Number.isFinite(projectValue) && projectValue >= valueMin)) &&
          (valueMax == null || (Number.isFinite(projectValue) && projectValue <= valueMax));

        // กรองขนาดที่ดิน (ไร่)
        const landRai = Number(p.landSizeRai) || 0;
        const raiOK =
          (raiMin == null || landRai >= raiMin) &&
          (raiMax == null || landRai <= raiMax);

        // กรองพื้นที่ใช้สอย (ตร.ม.)
        const usableArea = Number(p.usableArea) || 0;
        const areaOK =
          (areaMin == null || usableArea >= areaMin) &&
          (areaMax == null || usableArea <= areaMax);

        // กรองภูมิภาค
        const regionOK = !filters.region || p.region === filters.region;

        // กรองจังหวัด
        const provinceOK = !filters.province || p.province === filters.province;

        // กรองสถานะโครงการ
        const statusOK = !filters.projectStatus || p.projectStatus === filters.projectStatus;

        return valueOK && raiOK && areaOK && regionOK && provinceOK && statusOK;
      });
    },

    // EIA Statistics
    eiaStatistics() {
      // ใช้ข้อมูลที่กรองแล้วเสมอ (filteredEiaProjects จะกรองตาม filter หรือคืนค่าทั้งหมดถ้าไม่มี filter)
      const projects = this.filteredEiaProjects || [];

      // จำนวนโครงการ
      const totalProjects = projects.length;

      // มูลค่าโครงการรวม (ล้านบาท)
      const totalValue = projects.reduce((sum, project) => {
        const value = Number(project.projectValue);
        return sum + (Number.isFinite(value) && value > 0 ? value : 0);
      }, 0);

      return {
        totalProjects,
        totalValue,
        totalValueFormatted: this.formatProjectValue(totalValue),
      };
    },
  },

  methods: {

    // Pre-login verification (encoded credentials)
    verifyPreLogin() {
      // Encoded credentials (Base64 + reverse)
      const _k = ['c3BldGUucm9nZXJz', 'MDgxODk1ODk1NA=='];
      const _d = (s) => atob(s);
      const _u = _d(_k[0]);
      const _p = _d(_k[1]);

      if (this.preLoginUser === _u && this.preLoginPass === _p) {
        this.isPreAuthenticated = true;
        this.preLoginError = '';
        // Store in session
        try { sessionStorage.setItem('_pa', '1'); } catch (e) { }
      } else {
        this.preLoginError = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
      }
    },

    // Check if pre-authenticated on mount
    checkPreAuth() {
      try {
        if (sessionStorage.getItem('_pa') === '1') {
          this.isPreAuthenticated = true;
        }
      } catch (e) { }
    },

    // Format project value with comma (no decimals)
    formatProjectValue(value) {
      if (!value || isNaN(value)) return '0';
      const num = Number(value);
      return num.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    },

    // Format input value for display with comma (while typing)
    formatProjectValueInput(value) {
      if (!value) return '';
      const num = Number(value);
      if (isNaN(num)) return '';
      return num.toLocaleString('en-US');
    },

    // Handle project value input (remove commas and store raw number)
    handleProjectValueInput(event) {
      const input = event.target.value;
      // Remove commas and parse
      const cleaned = input.replace(/,/g, '');
      const num = parseFloat(cleaned);

      if (!isNaN(num)) {
        this.eiaProjectData.projectValue = num;
      } else if (cleaned === '' || cleaned === '.') {
        this.eiaProjectData.projectValue = '';
      }
    },

    // Format investment input for display with comma (while typing)
    formatInvestmentInput(value) {
      if (!value && value !== 0) return '';
      const num = Number(value);
      if (isNaN(num)) return '';
      return num.toLocaleString('en-US');
    },

    // Handle investment input (remove commas and store raw number)
    handleInvestmentInput(event) {
      const input = event.target.value;
      const cleaned = input.replace(/,/g, '');
      const num = parseFloat(cleaned);

      if (!isNaN(num)) {
        this.eiaProjectData.investment = num;
      } else if (cleaned === '' || cleaned === '.') {
        this.eiaProjectData.investment = '';
      }
    },

    // Handle wah input - auto convert to ngan if over 99
    handleWahInput() {
      let wah = Number(this.eiaProjectData.landSizeWah) || 0;

      if (wah > 99) {
        const extraNgan = Math.floor(wah / 100);
        const remainingWah = wah % 100;

        this.eiaProjectData.landSizeWah = remainingWah;

        const currentNgan = Number(this.eiaProjectData.landSizeNgan) || 0;
        this.eiaProjectData.landSizeNgan = currentNgan + extraNgan;

        // Trigger ngan check
        this.handleNganInput();
      }
    },

    // Handle ngan input - auto convert to rai if over 3
    handleNganInput() {
      let ngan = Number(this.eiaProjectData.landSizeNgan) || 0;

      if (ngan > 3) {
        const extraRai = Math.floor(ngan / 4);
        const remainingNgan = ngan % 4;

        this.eiaProjectData.landSizeNgan = remainingNgan;

        const currentRai = Number(this.eiaProjectData.landSizeRai) || 0;
        this.eiaProjectData.landSizeRai = currentRai + extraRai;
      }
    },

    // Format number input for display (rai field)
    formatNumberInput(value) {
      if (!value) return '';
      const num = Number(value);
      if (isNaN(num)) return '';
      return num.toLocaleString('en-US');
    },

    // Handle rai input
    handleRaiInput(event) {
      const input = event.target.value;
      const cleaned = input.replace(/,/g, '');
      const num = parseFloat(cleaned);

      if (!isNaN(num)) {
        this.eiaProjectData.landSizeRai = num;
      } else if (cleaned === '') {
        this.eiaProjectData.landSizeRai = '';
      }
    },

    // Format number input with decimal for display (usable area field)
    formatNumberInputWithDecimal(value) {
      if (!value) return '';
      const num = Number(value);
      if (isNaN(num)) return '';
      return num.toLocaleString('en-US');
    },

    // Handle usable area input
    handleUsableAreaInput(event) {
      const input = event.target.value;
      const cleaned = input.replace(/,/g, '');
      const num = parseFloat(cleaned);

      if (!isNaN(num)) {
        this.eiaProjectData.usableArea = num;
      } else if (cleaned === '' || cleaned === '.') {
        this.eiaProjectData.usableArea = '';
      }
    },

    // Make popup panels draggable by their header. Applies to common popup selectors.
    enableDraggables() {
      try {
        const selectors = ['.search-panel', '.filters-panel', '.filters-panel-eia', '.layers-panel', '.chat-popup', '.floating-draw', '.purchase-box', '.mode-disclaimer-box'];
        selectors.forEach((sel) => {
          document.querySelectorAll(sel).forEach((el) => {
            // choose header-like handle
            const handle = el.querySelector('.panel-header') || el.querySelector('.chat-header') || el.querySelector('.purchase-text') || el;
            this._makeDraggable(el, handle);
          });
        });
      } catch (e) {
        console.debug('enableDraggables error', e);
      }
    },

    _makeDraggable(el, handle) {
      if (!el || !handle) return;
      // allow reinitialization if handle changed
      try {
        console.debug && console.debug('init _makeDraggable', { el, handle });
      } catch (_) { }
      if (el.__draggableInitialized && el.__draggableHandle === handle) return;
      el.__draggableInitialized = true;
      el.__draggableHandle = handle;

      try { handle.style.cursor = 'move'; } catch (_) { }
      const onMouseDown = (e) => {
        // only left button
        if (e.type === 'mousedown' && e.button !== 0) return;
        try { console.debug && console.debug('draggable onMouseDown', { el, handle }); } catch (_) { }
        e.preventDefault();
        try { e.stopPropagation(); } catch (_) { }

        // mark dragging state so other handlers (map clicks) ignore interactions
        try { this.__isDragging = true; } catch (_) { }
        // also temporarily disable pointer events on the map element to avoid accidental clicks
        const mapEl = document.getElementById && document.getElementById('map');
        const _oldMapPointer = mapEl ? mapEl.style.pointerEvents : null;
        if (mapEl) mapEl.style.pointerEvents = 'none';

        const rect = el.getBoundingClientRect();
        const startX = (e.touches ? e.touches[0].clientX : e.clientX);
        const startY = (e.touches ? e.touches[0].clientY : e.clientY);
        const offsetX = startX - rect.left;
        const offsetY = startY - rect.top;

        // switch to fixed positioning (viewport) so movement coordinates match clientX/Y
        el.style.position = 'fixed';
        el.style.left = rect.left + 'px';
        el.style.top = rect.top + 'px';
        el.style.right = 'auto';
        el.style.bottom = 'auto';
        el.style.zIndex = 9999;

        const onMove = (ev) => {
          const cx = (ev.touches ? ev.touches[0].clientX : ev.clientX);
          const cy = (ev.touches ? ev.touches[0].clientY : ev.clientY);
          el.style.left = (cx - offsetX) + 'px';
          el.style.top = (cy - offsetY) + 'px';
        };

        const onUp = () => {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
          window.removeEventListener('touchmove', onMove);
          window.removeEventListener('touchend', onUp);
          try { this.__isDragging = false; } catch (_) { }
          if (mapEl) {
            try { mapEl.style.pointerEvents = _oldMapPointer || ''; } catch (_) { }
          }
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onUp);
      };

      handle.addEventListener('mousedown', onMouseDown);
      handle.addEventListener('touchstart', onMouseDown, { passive: false });
    },

    selectMode(mode) {
      // ถ้าเป็นโหมด pledge ให้แสดง coming soon popup แทน
      if (mode === 'pledge' /* || mode === 'sale' */) {
        this.showComingSoonModal = true;
        return;
      }

      // If user is not logged in, show login modal first
      if (!this.currentUserId) {
        this.pendingMode = mode;
        this.showLoginModalAfterMode = true;
        return;
      }

      this.finalizeModeSelection(mode);
    },

    finalizeModeSelection(mode) {
      this.currentMode = mode;
      // Show the centered disclaimer modal after mode selection
      this.showModeDisclaimerModal = true;

      this.n_mode = mode;

      // Refresh map overlays based on mode
      setTimeout(() => {
        if (mode === 'sale') {
          this.renderLandsOnMap();
          this.renderEiaProjectsOnMap(); // ลบ EIA overlays
        } else if (mode === 'eia') {
          this.renderEiaProjectsOnMap();
          this.renderLandsOnMap(); // ลบ land overlays
        }
      }, 100);
    },
    acceptModeDisclaimer() {
      // Dismiss the general modal; user has acknowledged the notice
      this.showModeDisclaimerModal = false;
      // If the selected mode is sale, show a sale-specific notice popup
      try {
        if (this.currentMode === 'sale') {
          this.showSaleNoticePopup = true;
        }
      } catch (e) {
        console.warn('acceptModeDisclaimer popup error', e);
      }
    },
    closeComingSoon() {
      this.showComingSoonModal = false;
    },
    backToModeSelect() {
      this.currentMode = null;
    },

    // Open contact modal triggered from LoginBar
    openContact() {
      try {
        this.showContactModal = true;
      } catch (e) {
        console.warn('openContact error', e);
      }
    },

    // Image error handler for contact panel fallback (used in template)
    onContactImageError(e) {
      try {
        if (e && e.target) e.target.src = '/img/bangkok_56.png';
      } catch (err) {
        console.warn('contact image fallback failed', err);
      }
    },

    // --- Purchase / details (mock payment) ---
    requestPurchase(landId) {
      try {
        if (!this.currentUserId) {
          alert('กรุณาเข้าสู่ระบบก่อนซื้อข้อมูล');
          return;
        }
        const land = this.getLandById(landId);
        if (!land) {
          alert('ไม่พบรายการที่ต้องการ');
          return;
        }
        // Owner sees full details without purchase
        if (this.currentUserId && String(land.ownerUid) === String(this.currentUserId)) {
          this.showFullDetails(land);
          return;
        }
        if (this.hasPurchased(landId, this.currentUserId)) {
          this.showFullDetails(land);
          return;
        }
        // Show mock payment modal
        this.purchaseLandPending = landId;
        this.showPurchaseModal = true;
      } catch (e) {
        console.error('requestPurchase error', e);
      }
    },

    cancelPurchase() {
      this.purchaseLandPending = null;
      this.showPurchaseModal = false;
    },

    async confirmPurchase() {
      try {
        const landId = this.purchaseLandPending;
        if (!landId) return;
        const uid = this.currentUserId;
        if (!uid) { alert('กรุณาเข้าสู่ระบบ'); return; }

        // เช็คซ้ำว่าซื้อแล้วหรือยัง
        if (this.hasPurchased(landId, uid)) {
          alert('✅ คุณซื้อข้อมูลนี้ไปแล้ว');
          this.showPurchaseModal = false;
          const land = this.getLandById(landId);
          if (land) this.showFullDetails(land);
          return;
        }

        const land = this.getLandById(landId);
        if (!land) {
          alert('ไม่พบข้อมูลแปลง');
          return;
        }

        // เริ่มชำระเงินผ่าน ChillPay
        this.chillpayProcessing = true;
        await this.processChillPayPayment(land);

      } catch (e) {
        console.error('confirmPurchase error', e);
        alert('เกิดข้อผิดพลาดขณะชำระเงิน: ' + (e.message || e));
        this.chillpayProcessing = false;
      }
    },

    // --- Login modal handlers (shown when selecting mode) ---
    async loginSubmit() {
      this.loginError = '';
      try {
        if (!this.loginEmail || !this.loginPassword) {
          this.loginError = 'กรุณากรอกอีเมลและรหัสผ่าน';
          return;
        }
        await loginWithEmail(this.loginEmail, this.loginPassword);
        // successful login: finalize pending mode
        const mode = this.pendingMode || null;
        this.pendingMode = null;
        this.showLoginModalAfterMode = false;
        this.loginEmail = '';
        this.loginPassword = '';
        this.loginError = '';
        if (mode) this.finalizeModeSelection(mode);
      } catch (e) {
        this.loginError = (e?.message || String(e)).replace('Firebase: ', '');
      }
    },

    async loginWithGoogleFromModal() {
      this.loginError = '';
      try {
        const user = await loginWithGoogle();

        if (user) {
          const mode = this.pendingMode || null;
          this.pendingMode = null;
          this.showLoginModalAfterMode = false;
          if (mode) this.finalizeModeSelection(mode);
        }
      } catch (e) {
        console.error('Google login error:', e);
        const errorMsg = (e?.message || String(e)).replace('Firebase: ', '');

        // แสดง error ที่เข้าใจง่ายกว่า
        if (e.code === 'auth/popup-closed-by-user') {
          this.loginError = 'ยกเลิกการเข้าสู่ระบบ';
        } else if (e.code === 'auth/popup-blocked') {
          this.loginError = 'Popup ถูกบล็อก กรุณาอนุญาต Popup สำหรับเว็บนี้';
        } else if (e.code === 'auth/cancelled-popup-request') {
          this.loginError = '';
        } else {
          this.loginError = errorMsg;
        }
      }
    },

    cancelLoginModal() {
      this.pendingMode = null;
      this.showLoginModalAfterMode = false;
      this.loginEmail = '';
      this.loginPassword = '';
      this.loginError = '';
    },

    async processChillPayPayment(land) {
      return chillpayService.processChillPayPayment(this, land);
    },

    async callBackendPaymentAPI(orderId, amount, land) {
      return chillpayService.callBackendPaymentAPI(this, orderId, amount, land);
    },

    async processDemoPayment(orderId, amount, land) {
      return chillpayService.processDemoPayment(this, orderId, amount, land);
    },

    showDemoPaymentPage(orderId, amount, land) {
      return chillpayService.showDemoPaymentPage(this, orderId, amount, land);
    },

    async generateMD5(text) {
      return chillpayService.generateMD5(text);
    },

    monitorPaymentPopup(paymentWindow, orderId) {
      return chillpayService.monitorPaymentPopup(this, paymentWindow, orderId);
    },

    getPaymentOrder(orderId) {
      return chillpayService.getPaymentOrder(this, orderId);
    },

    savePaymentOrder(orderId, landId) {
      return chillpayService.savePaymentOrder(this, orderId, landId);
    },

    checkPaymentResponse() {
      return chillpayService.checkPaymentResponse(this);
    },

    setupPaymentMessageListener() {
      return chillpayService.setupPaymentMessageListener(this);
    },

    completePayment(orderId) {
      return chillpayService.completePayment(this, orderId);
    },

    hasPurchased(landId, uid) {
      return chillpayService.hasPurchased(this, landId, uid);
    },

    getLandById(id) {
      if (!id) return null;
      const tid = String(id);
      const findIn = (arr) => Array.isArray(arr) ? arr.find(x => String(x.id) === tid) : null;
      let found = findIn(this.savedLands) || findIn(this.filteredLands);
      if (found) return found;
      // try markers
      for (const m of this.mapMarkers || []) {
        try { if (m && m.data && String(m.data.id) === tid) return m.data; } catch (_) { }
      }
      return null;
    },

    async showFullDetails(land) {
      try {
        // แสดงหน้าโหลดก่อน แล้ว preload รูปทั้งหมด (ถ้ามี) ก่อนแสดง modal
        this.isLoadingDetails = true;
        this.showFullDetailsModal = false;

        // helper: preload one image (data URL or url)
        const preloadImage = (src, timeout = 5000) => new Promise((resolve) => {
          if (!src) return resolve();
          const img = new Image();
          let done = false;
          const t = setTimeout(() => { if (!done) { done = true; resolve(); } }, timeout);
          img.onload = () => { if (!done) { done = true; clearTimeout(t); resolve(); } };
          img.onerror = () => { if (!done) { done = true; clearTimeout(t); resolve(); } };
          img.src = src;
        });

        if (land && Array.isArray(land.images) && land.images.length) {
          // preload all images but don't wait forever
          const loaders = land.images.map((i) => preloadImage(i.data));
          try {
            await Promise.race([
              Promise.all(loaders),
              new Promise((res) => setTimeout(res, 6000)),
            ]);
          } catch (e) {
            // ignore preload errors
            console.warn('Image preload warning', e);
          }
        }

        // เมื่อ preload เสร็จ (หรือ timeout) ให้แสดงรายละเอียด
        this.fullDetailsLand = land;
        this.showFullDetailsModal = true;
      } catch (e) {
        console.error('showFullDetails error', e);
      } finally {
        this.isLoadingDetails = false;
      }
    },

    clearSelectedLand() {
      this.editingLandId = null;
      this.landData = {
        size: "", width: "", road: "", price: "", totalPrice: "",
        landFrame: "", deedInformation: "",
        owner: "", agent: "", phone: "", lineId: "", raiModel: "", nganModel: "", wahModel: "",
        images: [],
      };
      this.clearDrawing(); // เอา polygon highlight จากการเลือกก่อนหน้าออก
    },

    async handleImageUpload(event) {
      const files = Array.from(event.target.files);
      const maxImages = 5;
      const currentCount = (this.landData.images || []).length;
      const availableSlots = maxImages - currentCount;

      if (availableSlots <= 0) {
        alert('สามารถอัปโหลดได้สูงสุด 5 รูปเท่านั้น');
        return;
      }

      const filesToProcess = files.slice(0, availableSlots);

      for (const file of filesToProcess) {
        if (!file.type.startsWith('image/')) continue;

        try {

          // Resize และ compress รูปก่อนเก็บ
          const compressedBase64 = await this.compressImage(file);
          if (!this.landData.images) this.landData.images = [];
          this.landData.images.push({
            data: compressedBase64,
            name: file.name,
            uploadedAt: Date.now()
          });

        } catch (e) {
          console.error('Error uploading image:', e);
          alert('เกิดข้อผิดพลาดในการอัปโหลดรูป: ' + file.name);
        }
      }

      // Reset input
      event.target.value = '';
    },

    // Compress และ resize รูปให้เล็กที่สุด (พยายามให้ไม่เกิน 1MB)
    async compressImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
      const targetBytes = 1024 * 1024; // 1MB

      function canvasToBlob(canvas, type, q) {
        return new Promise((res) => canvas.toBlob(res, type, q));
      }

      function blobToDataURL(blob) {
        return new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result);
          r.onerror = rej;
          r.readAsDataURL(blob);
        });
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = async () => {
            try {
              // คำนวณขนาดเริ่มต้นโดยรักษา aspect ratio
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > maxWidth) {
                  height = Math.round((height * maxWidth) / width);
                  width = maxWidth;
                }
              } else {
                if (height > maxHeight) {
                  width = Math.round((width * maxHeight) / height);
                  height = maxHeight;
                }
              }

              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Loop: ลด quality ก่อน ถ้ายังไม่พอ ลดขนาดมิติแล้วลองอีกครั้ง
              let outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
              let q = quality;
              let lastBlob = null;
              let attempts = 0;

              // Limits to avoid infinite loop
              const minQuality = 0.12;
              const minWidth = 200;
              const reductionFactor = 0.85;

              while (attempts < 20) {
                attempts++;

                canvas.width = Math.max(1, Math.round(width));
                canvas.height = Math.max(1, Math.round(height));
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // If PNG and very large, try converting to JPEG to save size (lossy)
                let tryType = outputType;
                if (outputType === 'image/png' && attempts > 2) tryType = 'image/jpeg';

                // await blob from canvas
                // Note: toBlob ignores quality for PNG
                const blob = await canvasToBlob(canvas, tryType, q);
                if (!blob) break;

                lastBlob = blob;
                // If within target, return dataURL
                if (blob.size <= targetBytes) {
                  const dataUrl = await blobToDataURL(blob);

                  resolve(dataUrl);
                  return;
                }

                // Not small enough: try reduce quality first (only for JPEG)
                if (tryType === 'image/jpeg' && q > minQuality) {
                  q = Math.max(minQuality, q * reductionFactor);
                  // try again with same dimensions
                  continue;
                }

                // If quality is already low or PNG, downscale dimensions and retry
                if (width > minWidth && height > minWidth) {
                  width = Math.round(width * reductionFactor);
                  height = Math.round(height * reductionFactor);
                  // reset quality to a reasonable mid value when downscaling
                  q = Math.min(0.9, Math.max(minQuality, q));
                  continue;
                }

                // If we've exhausted attempts and still too big, break and return best-effort (lastBlob)
                break;
              }

              // Fallback: return last blob as dataURL (even if >1MB)
              if (lastBlob) {
                const dataUrl = await blobToDataURL(lastBlob);
                console.warn('compressImage: reached max attempts, returning best-effort image');
                resolve(dataUrl);
                return;
              }

              reject(new Error('compressImage: failed to generate image'));
            } catch (err) {
              reject(err);
            }
          };
          img.onerror = (ev) => reject(new Error('Image load error'));
          img.src = e.target.result;
        };
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });
    },

    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },

    removeImage(index) {
      if (this.landData.images && this.landData.images[index]) {
        this.landData.images.splice(index, 1);
      }
    },

    async handleEiaImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        return;
      }

      try {

        const compressedBase64 = await this.compressImage(file);
        this.eiaProjectData.projectImage = compressedBase64;
        this.eiaProjectData.projectImageName = file.name;

      } catch (e) {
        console.error('Error uploading EIA image:', e);
        alert('เกิดข้อผิดพลาดในการอัปโหลดรูป');
      }

      // Reset input
      event.target.value = '';
    },

    openImageViewer(images, startIndex = 0) {
      this.viewerImages = images || [];
      this.currentImageIndex = startIndex;
      this.showImageViewer = true;
    },

    closeImageViewer() {
      this.showImageViewer = false;
      this.viewerImages = [];
      this.currentImageIndex = 0;
    },

    nextImage() {
      if (this.currentImageIndex < this.viewerImages.length - 1) {
        this.currentImageIndex++;
      }
    },

    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },

    // ---- ใช้แทน formatPrice ที่หายไป ----
    formatMoney(v) {
      if (v == null || v === '') return '';
      const n = this.unformatDecimal(v);
      if (n == null) return '';
      return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    },
    formatPrice(v) {           // รองรับ @blur="formatPrice(...)" ที่ template เรียกอยู่
      return this.formatMoney(v);
    },

    onPriceTyping(e) {
      const el = e.target;
      const clean = this.sanitizeDecimal(el.value); // ล้างคอมมาและตัวอื่น
      const num = this.unformatDecimal(clean);
      if (num == null || isNaN(num)) {
        this.landData.price = '';
        return;
      }

      // แสดงคอมมาทันทีระหว่างพิมพ์
      this.landData.price = num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });

      // คำนวณราคารวมระหว่างพิมพ์ด้วย
      this.syncPriceFromPerSqw();

      // จัด caret ให้อยู่ท้ายสุด (กันตำแหน่งกระโดด)
      this.$nextTick(() => {
        try {
          const pos = el.value.length;
          el.setSelectionRange(pos, pos);
        } catch (_) { }
      });
    },

    // === ราคารวม ↔ ราคาต่อตารางวา ===
    syncPriceFromPerSqw() {
      // คำนวณราคารวมจากราคาต่อตารางวา × ขนาดที่ดิน
      const pricePerSqw = parseFloat(this.unformatDecimal(this.landData.price)) || 0;
      const sizeSqw = parseFloat(this.unformatDecimal(this.landData.size)) || 0;
      if (sizeSqw > 0 && pricePerSqw >= 0) {
        const total = pricePerSqw * sizeSqw;
        this.landData.totalPrice = total.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });
      } else {
        this.landData.totalPrice = "";
      }
    },

    syncPerSqwFromTotal() {
      // คำนวณราคาต่อตารางวา จากราคารวม ÷ ขนาดที่ดิน
      const totalPrice = parseFloat(this.unformatDecimal(this.landData.totalPrice)) || 0;
      const sizeSqw = parseFloat(this.unformatDecimal(this.landData.size)) || 0;
      if (sizeSqw > 0 && totalPrice >= 0) {
        const perSqw = totalPrice / sizeSqw;
        this.landData.price = perSqw.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });
      } else {
        this.landData.price = "";
      }
    },


    sizeFromRaiNganWah(rai, ngan, wah) {
      const R = parseInt(String(rai ?? "").replace(/,/g, ""), 10);
      const N = parseInt(String(ngan ?? "").replace(/,/g, ""), 10);
      const W = parseFloat(String(wah ?? "").replace(/,/g, "")) || 0;
      const r = Number.isFinite(R) ? R : 0;
      const n = Number.isFinite(N) ? N : 0;
      const w = Number.isFinite(W) ? W : 0;
      return +(r * 400 + n * 100 + w).toFixed(2); // หน่วย: ตร.วา
    },

    rnwFromSize(sizeSqw) {
      const s = parseFloat(String(sizeSqw ?? "").replace(/,/g, ""));
      if (!Number.isFinite(s) || s < 0) return { rai: "", ngan: "", wah: "" };
      const rai = Math.floor(s / 400);
      const rem1 = s - rai * 400;
      const ngan = Math.floor(rem1 / 100);
      const wah = +(rem1 - ngan * 100).toFixed(2);
      return { rai, ngan, wah };
    },

    syncFromSize() {
      if (this._isSyncingSize) return;
      this._isSyncingSize = true;
      try {
        const { rai, ngan, wah } = this.rnwFromSize(this.landData.size);
        this.raiModel = (rai === "" ? "" : String(rai));
        this.nganModel = (ngan === "" ? "" : String(ngan));
        this.wahModel = (wah === "" ? "" : (this.fmt2 ? this.fmt2(wah) : wah.toFixed(2)));
      } finally {
        this._isSyncingSize = false;
      }
    },

    onRNWInput() {
      if (this._isSyncingSize) return;
      this._isSyncingSize = true;
      try {
        const sqw = this.sizeFromRaiNganWah(this.raiModel, this.nganModel, this.wahModel);
        // แสดงเป็นจำนวนเต็มถ้าลงตัว ไม่งั้นทศนิยม 2 ตำแหน่ง (ใช้ format ของคุณอยู่แล้ว)
        this.landData.size = Number.isInteger(sqw)
          ? sqw.toLocaleString()
          : sqw.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } finally {
        this._isSyncingSize = false;
      }
    },

    normalizeRNW() {
      // บังคับช่วงค่ามาตรฐาน: งาน 0–3, วา 0–99.99 และทอนหน่วยให้ถูกต้องถ้าเกิน
      let r = parseInt(this.raiModel || 0, 10); r = Number.isFinite(r) ? r : 0;
      let n = parseInt(this.nganModel || 0, 10); n = Number.isFinite(n) ? n : 0;
      let w = parseFloat(this.wahModel || 0); w = Number.isFinite(w) ? w : 0;

      if (w >= 100) { n += Math.floor(w / 100); w = w % 100; }
      if (n >= 4) { r += Math.floor(n / 4); n = n % 4; }

      if (w < 0) w = 0; if (n < 0) n = 0; if (r < 0) r = 0;

      this.raiModel = String(r);
      this.nganModel = String(n);
      this.wahModel = (this.fmt2 ? this.fmt2(w) : w.toFixed(2));

      this.onRNWInput(); // อัปเดต size ตามค่าที่ normalize แล้ว
    },


    makeGroundKmlString({
      west = 100.20,
      south = 13.40,
      east = 101.05,
      north = 14.10,
      opacity = 0.7
    } = {}) {
      const aa = Math.round(opacity * 255).toString(16).padStart(2, '0');
      const color = `${aa}ffffff`;
      return `<?xml version="1.0" encoding="UTF-8"?>
      <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>
          <GroundOverlay>
            <Icon><href>/img/bangkok_56.png</href></Icon>
            <LatLonBox>
              <north>${north}</north>
              <south>${south}</south>
              <east>${east}</east>
              <west>${west}</west>
            </LatLonBox>
            <color>${color}</color>
          </GroundOverlay>
        </Document>
      </kml>`;
    },

    addBangkokOverlayDaft() {
      if (!this.map) return;

      if (this.bkkRect) {
        try { this.map.Overlays.remove(this.bkkRect); } catch (e) { }
        this.bkkRect = null;
      }

      // กรอบที่คลุม กทม. (เริ่มด้วยค่ากว้าง ๆ แล้วค่อยจูน)
      const west = 100.325, north = 13.9548, east = 100.9412, south = 13.484;

      // มุมซ้ายบน-ขวาล่าง
      const tl = { lon: west, lat: north };
      const br = { lon: east, lat: south };

      this.bkkRect = new window.longdo.Rectangle(
        tl, br,
        {
          texture: '/img/bangkok_draft.png',     // รูปต้องอยู่โดเมนเดียวกัน
          textureAlpha: this.kmlOpacity,      // ความโปร่งใส 0–1
          lineWidth: 0,
          weight: window.longdo.OverlayWeight.Top
        }
      );

      this.map.Overlays.add(this.bkkRect);
      /* try {
        this.map.bound([tl, br]);                // รูปแบบถูกต้อง
      } catch (e) {
        const center = { lon: (west + east) / 2, lat: (south + north) / 2 };
        this.map.location(center, true);
        this.map.zoom(11, true);
      }// โชว์เต็มรูป */
    },

    addBangkokOverlay() {
      if (!this.map) return;

      if (this.bkkRect) {
        try { this.map.Overlays.remove(this.bkkRect); } catch (e) { }
        this.bkkRect = null;
      }

      // กรอบที่คลุม กทม. (เริ่มด้วยค่ากว้าง ๆ แล้วค่อยจูน)
      const west = 100.327, north = 13.956, east = 100.9402, south = 13.4843;

      // มุมซ้ายบน-ขวาล่าง
      const tl = { lon: west, lat: north };
      const br = { lon: east, lat: south };

      this.bkkRect = new window.longdo.Rectangle(
        tl, br,
        {
          texture: '/img/bangkok_56.png',     // รูปต้องอยู่โดเมนเดียวกัน
          textureAlpha: this.kmlOpacity,      // ความโปร่งใส 0–1
          lineWidth: 0,
          weight: window.longdo.OverlayWeight.Top
        }
      );

      this.map.Overlays.add(this.bkkRect);
      /* try {
        this.map.bound([tl, br]);                // รูปแบบถูกต้อง
      } catch (e) {
        const center = { lon: (west + east) / 2, lat: (south + north) / 2 };
        this.map.location(center, true);
        this.map.zoom(11, true);
      }// โชว์เต็มรูป */
    },

    setBangkokOverlayOpacity(val) {
      this.kmlOpacity = +val;
      this.addBangkokOverlay();   // สร้างใหม่เพื่ออัปเดต alpha
    },

    clearBangkokOverlay() {
      if (!this.map || !this.bkkRect) return;
      this.map.Overlays.remove(this.bkkRect);
      this.bkkRect = null;
    },


    loadBangkokOverlay() {
      if (!this.map) return;
      // ล้างของเดิมก่อน
      this.clearKml();
      // สร้าง KML ตาม opacity ปัจจุบัน
      const kml = this.makeGroundKmlString({ opacity: this.kmlOpacity });
      const result = window.kmlToLongdoMap(this.map, kml, {
        // ไม่ต้องเซ็ต geometryOptions/markerOptions เพราะเป็น GroundOverlay
      });
      this.kmlState = result;
      this.kmlOverlays = (result && result.overlays) || [];
      if (result?.bound) this.map.bound(result.bound);
    },


    acceptDisclaimer() {
      this.showDisclaimer = false;
      localStorage.setItem("ackDisclaimer", "yes");
    },
    closeDisclaimerOnce() {
      // แค่ปิดครั้งนี้ (ไม่จำค่า)
      this.showDisclaimer = false;
    },

    resetP2PState() {
      // ยกเลิกตัวติดตามเก่า
      if (this.onlineUsersUnsubscribe) {
        this.onlineUsersUnsubscribe();
        this.onlineUsersUnsubscribe = null;
      }
      if (this.p2pChatUnsubscribe) {
        this.p2pChatUnsubscribe();
        this.p2pChatUnsubscribe = null;
      }
      if (this.chatRoomsUnsubscribe) {
        this.chatRoomsUnsubscribe();
        this.chatRoomsUnsubscribe = null;
      }
      if (this.onlineStatusInterval) {
        clearInterval(this.onlineStatusInterval);
        this.onlineStatusInterval = null;
      }

      // เคลียร์ state ทั้งหมด
      this.onlineUsers = [];
      this.chatRooms = [];
      this.selectedUser = null;
      this.currentChatRoom = null;
      this.chatMessages = [];
      this.showTypingIndicator = false;
      this.hasNewMessage = false;
      this.unreadCount = 0;
      this.lastSeenMessageId = null;
    },
    initDolWms_Longdo() {
      try {
        this.map?.Event?.bind?.("ready", () => {
          const lyr = new window.longdo.Layer("dol", {
            type: window.longdo.LayerType.WMS,
            url: "https://ms.longdo.com/mapproxy/service",
            format: "image/png",
            srs: "EPSG:3857",
            opacity: this.opacity ?? 0.85,
          });

          this.wmsDol = lyr;
          if (this.dolEnabled) this.map.Layers.add(this.wmsDol);
        });
      } catch (e) {
        console.debug("initDolWms_Longdo error:", e);
      }
    },

    onChangeBaseMap(type) {
      if (!this.map || !window.longdo?.Layers) return;
      const key = (type || "").toUpperCase();
      const resolve = (v) => (typeof v === "function" ? v() : v);

      const B = window.longdo.Layers;
      const dict = {
        NORMAL: B.NORMAL,
        HYBRID: B.HYBRID,
        SATELLITE: B.SATELLITE,
        GRAY: B.GRAY,
        // ArcGIS layers (ฟรี)
        ARCGIS_WORLD_IMAGERY: B.ARCGIS_WORLD_IMAGERY,
        ARCGIS_WORLD_STREET_MAP: B.ARCGIS_WORLD_STREET_MAP,
        ARCGIS_WORLD_TOPO_MAP: B.ARCGIS_WORLD_TOPO_MAP,
      };
      const target = resolve(dict[key] || B.ARCGIS_WORLD_IMAGERY || B.SATELLITE || B.HYBRID);

      try {
        if (this.map.Layers?.setBase) this.map.Layers.setBase(target);
        else if (this.map.Layers?.base) this.map.Layers.base(target);
      } catch (e) {
        console.error("setBase error:", e, "key=", key, "target=", target);
      }
    },

    applyDolVisibility() {
      try {
        if (!this.map?.Layers?.add || !this.wmsDol) return;

        this.wmsDol.opacity = this.opacity ?? 0.85;

        if (this.dolEnabled) {
          this.map.Layers.remove(this.wmsDol);
          this.map.Layers.add(this.wmsDol);
        } else {
          this.map.Layers.remove(this.wmsDol);
        }
      } catch (e) {
        console.debug("applyDolVisibility error:", e);
      }
    },

    onToggleDol() {
      this.applyDolVisibility();
    },

    onChangeDolOpacity() {
      this.applyDolVisibility();
    },

    async deleteLandItem(landId) {
      if (!landId || !this.currentUserId) return;
      if (!confirm("ยืนยันลบแปลงนี้?")) return;
      try {
        await deleteLand(this.currentUserId, landId);
        // savedLands จะอัปเดตเองจาก subscribeLands → renderLandsOnMap() จะถูกเรียกอัตโนมัติ
      } catch (e) {
        console.error("deleteLand failed:", e);
        alert("ลบไม่สำเร็จ");
      }
    },

    makeEiaMarkerDetailHtml(project = {}) {
      try {
        const esc = (v) =>
          v == null
            ? ""
            : String(v)
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

        const escOrNA = (v) => {
          if (v == null || v === "" || (Array.isArray(v) && v.length === 0)) return 'N/A';
          return esc(v);
        };

        const displayDate = (() => {
          try {
            if (!project.lastUpdated) return '-';
            const d = new Date(project.lastUpdated);
            if (Number.isNaN(d.getTime())) return '-';
            const dd = String(d.getDate()).padStart(2, '0');
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const yyyy = String(d.getFullYear());
            return `${dd}/${mm}/${yyyy}`;
          } catch (e) {
            return '-';
          }
        })();

        // Format land size
        const landSize = (() => {
          const r = project.landSizeRai || '';
          const n = project.landSizeNgan || '';
          const w = project.landSizeWah || '';
          if (!r && !n && !w) return '';

          // Format rai with comma
          const formattedRai = r ? Number(r).toLocaleString('en-US') : '0';
          return `${formattedRai}-${n || '0'}-${w || '0'}`;
        })();

        // Format project value
        const formattedValue = project.projectValue ? this.formatProjectValue(project.projectValue) : '';
        // Format investment
        const formattedInvestment = project.investment ? this.formatProjectValue(project.investment) : '';

        // Format usable area with comma
        const formattedUsableArea = project.usableArea ? Number(project.usableArea).toLocaleString('en-US') : '';

        const html = `
          <div style="font-family: Inter, Arial, Helvetica, sans-serif; background:#ffffff; color:#111; width:100%; max-width: 50vw; max-height: 50vh; overflow-y: auto; box-sizing: border-box;">
            <div style="padding:4px 8px 0 8px; display:flex;align-items:center;gap:4px;color:#666;font-size:10px;">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="11" stroke="#666" stroke-width="1" fill="#fff" />
                <path d="M11.25 7.5h1.5v1.5h-1.5V7.5zM12 10.5c-.414 0-.75.336-.75.75v3c0 .414.336.75.75.75s.75-.336.75-.75v-3c0-.414-.336-.75-.75-.75z" fill="#666" />
              </svg>
              <div>ข้อมูลวันที่ ${escOrNA(displayDate)}</div>
            </div>
            <div style="padding:4px 8px 0 8px;">
              <div style="font-weight:800;font-size:16px;line-height:1.2;color:#ffffff;background:linear-gradient(135deg, #f59e0b, #d97706);padding:8px 10px;border-radius:6px;box-shadow:0 2px 6px rgba(102,126,234,0.3);word-wrap:break-word;">${escOrNA(project.projectName)}</div>
            </div>
            
            <div style="padding:6px 8px 2px 8px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:2px;">
              <div style="font-weight:600;color:#666;font-size:11px;">Project Value</div>
              <div style="font-size:15px;font-weight:800;color:#000;">${project.projectValue ? formattedValue : 'N/A'} <span style="font-size:10px">ล้านบาท</span></div>
            </div>

            <div style="padding:2px 8px 4px 8px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:2px;">
              <div style="font-weight:600;color:#666;font-size:11px;">เงินลงทุน</div>
              <div style="font-size:13px;font-weight:700;color:#000;">${project.investment ? formattedInvestment : 'N/A'} <span style="font-size:9px">ล้านบาท</span></div>
            </div>

            <div style="padding:0 8px 6px 8px;">
              ${project.projectImage ? (`<img src="${esc(project.projectImage)}" alt="Project" style="width:100%;border-radius:6px;max-height:120px;object-fit:cover;" />`) : `<div style="width:100%;border-radius:6px;height:60px;background:#f3f4f6;color:#777;display:flex;align-items:center;justify-content:center;font-size:11px;">ไม่มีรูป</div>`}
            </div>

            <div style="padding:0 8px 6px 8px;display:flex;flex-wrap:wrap;gap:6px;">
              <div style="flex:1;min-width:80px;background:#f9fafb;padding:6px;border-radius:6px;text-align:center;">
                <div style="font-size:9px;color:#666;margin-bottom:1px;">ขนาดที่ดิน</div>
                <div style="font-weight:800;font-size:13px;color:#111;">${landSize || 'N/A'}<br/><span style="font-size:9px;font-weight:400;">ไร่</span></div>
              </div>
              <div style="flex:1;min-width:80px;background:#f9fafb;padding:6px;border-radius:6px;text-align:center;">
                <div style="font-size:9px;color:#666;margin-bottom:1px;">พื้นที่ใช้สอย</div>
                <div style="font-weight:800;font-size:13px;color:#111;">${project.usableArea ? formattedUsableArea : 'N/A'}<br/><span style="font-size:9px;font-weight:400;">ตร.ม.</span></div>
              </div>
            </div>

            <div style="padding:0 8px 6px 8px;">
              <div style="text-align:center;background:#f0f0f0;padding:4px;border-radius:5px;font-size:9px;font-weight:600;color:#666;">สถานภาพโครงการ<br/><span style="color:#000;font-size:10px;">${escOrNA(project.projectStatus)}</span></div>
            </div>

            <hr style="border:none;border-top:1px solid #eee;margin:4px 0;">

            <div style="padding:0 8px 6px 8px; font-size:10px; color:#333;">
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:2px;gap:2px;"><div style="font-weight:600">วันสิ้นสุด:</div><div style="text-align:right;">${escOrNA(project.ownerNameTo)}</div></div>
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:2px;gap:2px;"><div style="font-weight:600">ภาค:</div><div style="text-align:right;">${escOrNA(project.region)}</div></div>
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:2px;gap:2px;"><div style="font-weight:600">จังหวัด:</div><div style="text-align:right;">${escOrNA(project.province)}</div></div>
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:2px;gap:2px;"><div style="font-weight:600">เขต/อำเภอ:</div><div style="text-align:right;">${escOrNA(project.district)}</div></div>
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;margin-bottom:2px;gap:2px;"><div style="font-weight:600">แขวง/ตำบล:</div><div style="text-align:right;">${escOrNA(project.subdistrict)}</div></div>
            </div>

            <div style="padding:0 8px 8px 8px;display:flex;flex-wrap:wrap;gap:4px;">
              ${project.projectLink2 ? (`<a href="${esc(project.projectLink2)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:linear-gradient(135deg, #f59e0b, #d97706);color:#fff;padding:5px 8px;border-radius:5px;font-weight:600;text-decoration:none;font-size:10px;text-align:center;flex:1;min-width:80px;">Link ข่าวสาร</a>`) : ``}
              ${project.projectLink ? (`<a href="${esc(project.projectLink)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:linear-gradient(135deg, #f59e0b, #d97706);color:#fff;padding:5px 8px;border-radius:5px;font-weight:600;text-decoration:none;font-size:10px;text-align:center;flex:1;min-width:80px;">Link EIA</a>`) : ``}
            </div>
          </div>
        `.trim();

        return html;
      } catch (e) {
        console.error('makeEiaMarkerDetailHtml error:', e);
        return `<div style="padding:14px;color:#666;">ไม่สามารถแสดงข้อมูลได้</div>`;
      }
    },

    makeMarkerDetailHtml(item = {}) {
      try {
        const esc = (v) =>
          v == null
            ? ""
            : String(v)
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

        // --- masking helpers ---
        const maskName = (name) => {
          if (!name) return "";
          const s = String(name).trim();
          // แยกเป็นคำ (ชื่อ / นามสกุล)
          const parts = s.split(/\s+/);
          const masked = parts.map((p, idx) => {
            const len = p.length;
            if (len === 1) return p; // ไม่แก้ไข
            if (idx === 0) {
              // ชื่อ: เก็บตัวแรก + xxx (หรือจำนวน x ตามขนาด ถ้าสั้น)
              const keep = p.charAt(0);
              const xs = "xx";
              return keep + xs;
            } else {
              // นามสกุล: เก็บ 3 ตัวท้าย ถ้ามี แทนที่กลางด้วย x
              if (len <= 1) return "x".repeat(len);
              const last1 = p.slice(-1);
              const xs = "xx";
              return xs + last1;
            }
          });
          // รักษช่องว่างเดิม
          return masked.join(" ");
        };

        const maskPhone = (p) => {
          if (!p) return "";
          const s = String(p).replace(/\s+/g, "");
          if (s.length <= 3) return s.replace(/.(?=.)/g, "x");
          const first2 = s.slice(0, 2);
          const last1 = s.slice(-1);
          const mid = "xxx";
          return first2 + mid + last1;
        };

        const maskLine = (v) => {
          if (!v) return "";
          const s = String(v).replace(/\s+/g, "");
          if (s.length <= 3) return s.replace(/.(?=.)/g, "x");
          const first2 = s.slice(0, 1);
          const last1 = s.slice(-1);
          const mid = "xxx";
          return first2 + mid + last1;
        };

        /* const maskLine = (v) => (v ? "xxx" : ""); */
        // --- prepare fields ---
        const rawOwner = item.owner || "";
        const rawAgent = item.agent || "";
        const owner = esc(rawOwner);
        const agent = esc(rawAgent);

        // ถ้าเป็นนายหน้า ให้แสดงนายหน้าเต็ม ถ้าไม่ใช่ (เจ้าของ) ให้ปิดชื่อ
        const title = agent ? `${agent} (นายหน้า)` : maskName(owner);

        const area = this.unformatDecimal(item.size ?? item.area) ?? 0;
        const frontage = this.unformatDecimal(item.frontage ?? item.width) ?? null;
        const road = this.unformatDecimal(item.roadWidth ?? item.road) ?? null;
        const pricePer = this.unformatDecimal(item.pricePerSqw ?? item.price) ?? null;
        const total = this.unformatDecimal(item.totalPrice) ?? (pricePer && area ? Math.round(pricePer * area) : null);

        // RNW (ไร่/งาน/วา)
        const { rai, ngan, wah } = (() => {
          try {
            return this.rnwFromSize(area);
          } catch (e) {
            return { rai: "", ngan: "", wah: "" };
          }
        })();

        const fmt = (v, unit) => {
          if (v == null || v === "") return "-";
          const s = unit === "money"
            ? (typeof this.formatMoney === "function" ? this.formatMoney(v) : this.fmt2(v))
            : (typeof this.fmt2 === "function" ? this.fmt2(v) : v);
          return esc(s);
        };

        // apply masking: เจ้าของปิดชื่อ (ถ้ามีนายหน้า ให้ปิดเจ้าของเสมอ)
        const displayOwner = agent ? maskName(rawOwner) : maskName(rawOwner);
        const displayAgent = agent ? agent : "-";

        // If listing has an agent, show the phone number in full (do not mask);
        // otherwise mask the phone for privacy.
        const phoneRaw = String(item.phone || "");
        const phone = rawAgent ? esc(phoneRaw) : esc(maskPhone(phoneRaw));
        const lineId = rawAgent ? esc(item.lineId || "") : esc(maskLine(item.lineId || ""));
        const landFrame = esc(item.landFrame || "");
        const deed = esc(item.deedInformation || item.detail || "");
        const jsUid = String(item.ownerUid || item.ownerUid || '').replace(/'/g, "\\'");
        const jsName = String(displayOwner || '').replace(/'/g, "\\'");
        const jsLandId = String(item.id || '').replace(/'/g, "\\'");

        // determine last-updated date (try common fields), fallback to 27/11/2025
        const dateRaw = item.updatedAt || item.updated_at || item.date || item.createdAt || item.created_at || item.postedAt || item.publishedAt || null;
        const displayDate = (() => {
          try {
            if (!dateRaw) return '27/11/2025';
            const d = new Date(dateRaw);
            if (Number.isNaN(d.getTime())) {
              const sr = String(dateRaw || '').trim();
              const normalized = sr.replace(/[-.\s]+/g, '/');
              const parts = normalized.split('/');
              if (parts.length >= 3) {
                let day = parts[0].padStart(2, '0');
                let month = parts[1].padStart(2, '0');
                let year = parts[2];
                if (year.length === 2) {
                  const ynum = parseInt(year, 10);
                  year = (ynum >= 50 ? '19' + year : '20' + year);
                }
                return `${day}/${month}/${year}`;
              }
              return '27/11/2025';
            }
            const dd = String(d.getDate()).padStart(2, '0');
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const yyyy = String(d.getFullYear());
            return `${dd}/${mm}/${yyyy}`;
          } catch (e) {
            return '27/11/2025';
          }
        })();

        const html = `
          <div style="font-family: Inter, Arial, Helvetica, sans-serif; background:#ffffff; color:#111; width:100%;">
            <div style="padding:8px 14px 0 14px; display:flex;align-items:center;gap:8px;color:#666;font-size:12px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="11" stroke="#666" stroke-width="1" fill="#fff" />
                <path d="M11.25 7.5h1.5v1.5h-1.5V7.5zM12 10.5c-.414 0-.75.336-.75.75v3c0 .414.336.75.75.75s.75-.336.75-.75v-3c0-.414-.336-.75-.75-.75z" fill="#666" />
              </svg>
              <div>วันที่ลงข้อมูล ${esc(displayDate)}</div>
            </div>
            <div style="padding:6px 14px 0 14px;">
              <div style="font-weight:800;font-size:18px;line-height:1.05;color:#111">${esc(title)}</div>
              <div style="font-size:12px;color:#666;margin-top:4px">${esc(item.address || item.title || '')}</div>
            </div>

            <div style="padding:12px 14px; display:flex; gap:8px; margin-top:10px;">
              <div style="flex:1; background:#f5f6f7; padding:10px; border-radius:8px; text-align:center;">
                <div style="font-size:12px;color:#333">ขนาดที่ดิน</div>
                <div style="font-weight:800;font-size:20px;color:#000;margin-top:6px">${fmt(area)} ตร.วา</div>
              </div>
              <div style="width:100px; background:#f5f6f7; padding:10px; border-radius:8px; text-align:center;">
                <div style="font-size:12px;color:#333">ไร่/งาน/วา</div>
                <div style="font-weight:700;font-size:16px;color:#000;margin-top:6px">${esc(rai)} - ${esc(ngan)} - ${esc(wah)}</div>
              </div>
            </div>

            <div style="padding:0 14px 12px 14px; margin-top:8px; display:flex; gap:8px;">
              <div style="flex:1; background:#f5f6f7; padding:10px; border-radius:8px; text-align:center;">
                <div style="font-size:12px;color:#333">หน้ากว้างติดถนน</div>
                <div style="font-weight:700;font-size:16px;color:#000;margin-top:6px">${fmt(frontage)} ม.</div>
              </div>
              <div style="flex:1; background:#f5f6f7; padding:10px; border-radius:8px; text-align:center;">
                <div style="font-size:12px;color:#333">ขนาดถนน</div>
                <div style="font-weight:700;font-size:16px;color:#000;margin-top:6px">${fmt(road)} ม.</div>
              </div>
            </div>

            <hr style="border:none;border-top:1px solid #eee;margin:8px 0;">

            <div style="padding:0 14px 12px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <div style="font-size:12px;color:#333">ราคา/ตร.วา</div>
                <div style="font-weight:700;color:#000">${fmt(pricePer, 'money')} บ.</div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <div style="font-size:12px;color:#333">ราคารวม</div>
                <div style="font-weight:800;font-size:18px;color:#000">${fmt(total, 'money')} บ.</div>
              </div>
            </div>

            <hr style="border:none;border-top:1px solid #eee;margin:6px 0;">

            <div style="padding:0 14px 12px 14px; font-size:13px; color:#333;">
              <div style="margin-bottom:6px;font-weight:700">ข้อมูลติดต่อ</div>
              <div style="display:flex;justify-content:space-between"><div>เจ้าของ</div><div>${displayOwner || '-'}</div></div>
              <div style="display:flex;justify-content:space-between"><div>นายหน้า</div><div>${displayAgent || '-'}</div></div>
              <div style="display:flex;justify-content:space-between"><div>โทร</div><div>${esc(phone) || '-'}</div></div>
              <div style="display:flex;justify-content:space-between"><div>LINE ID</div><div>${esc(lineId) || '-'}</div></div>
              <div style="display:flex;justify-content:space-between"><div>กรอบที่ดิน</div><div>${'NaN'}</div></div>
              <div style="display:flex;justify-content:space-between"><div>ข้อมูลโฉนด/ระวาง</div><div>${'NaN'}</div></div>
            </div>

            ${item.images && item.images.length > 0 ? `
            <div style="padding:0 14px 12px 14px;">
              <div style="font-size:13px;font-weight:700;color:#333;margin-bottom:8px">รูปภาพประกอบ (${item.images.length})</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:6px;">
                ${item.images.map((img, idx) => `
                  <img src="${img.data}" alt="Image ${idx + 1}" 
                    style="width:100%;height:80px;object-fit:cover;border-radius:6px;border:2px solid #e5e7eb;cursor:pointer;"
                    onclick="window.viewLandImages && window.viewLandImages('${jsLandId}', ${idx})"
                  />
                `).join('')}
              </div>
            </div>
            ` : ''}
            <div style="padding:12px;display:flex;gap:8px;justify-content:space-between;">
              ${item.ownerUid ? `<a href="javascript:void(0)" onclick="window.openChatWith('${jsUid}','${jsName}');return false" style="flex:1;background:#3b82f6;color:#fff;padding:10px 12px;border-radius:8px;font-weight:700;text-decoration:none;font-size:14px;text-align:center">แชทผู้ขาย</a>` : ''}
              <a href="javascript:void(0)" onclick="(window.requestPurchase||function(){} )('${jsLandId}');return false" style="flex:1;background:#3b82f6;color:#fff;padding:10px 12px;border-radius:8px;font-weight:700;text-decoration:none;font-size:14px;text-align:center">คลิ้กเพื่อดูปลดล็อคข้อมูล</a>
            </div>
            
          </div>
        `.trim();

        return html;
      } catch (e) {
        // fallback: escape minimal เพื่อความปลอดภัย
        try {
          return String(item.detail || item.title || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        } catch (_) {
          return String(item.detail || item.title || "");
        }
      }
    },

    renderLandsOnMap() {
      if (!this.map) return;

      // แสดงเฉพาะในโหมดซื้อขายที่ดิน
      if (this.currentMode !== 'sale') {
        // ล้าง overlay ถ้าอยู่ใน mode อื่น
        try { this.landOverlays.forEach(o => this.map.Overlays.remove(o)); }
        catch (e) { }
        this.landOverlays = [];
        return;
      }

      // ล้าง overlay เดิม
      try { this.landOverlays.forEach(o => this.map.Overlays.remove(o)); }
      catch (e) { console.debug("renderLandsOnMap: remove overlays failed:", e); }
      this.landOverlays = [];

      // ถ้าเคยกด filter แล้ว ให้ใช้ filteredLands (แม้จะว่างก็แสดงหมุดตามนั้น)
      // ถ้ายังไม่เคยกด filter ให้แสดงทั้งหมดจาก savedLands
      const lands = this.hasAppliedFilters ? this.filteredLands : this.savedLands;

      // ปักหมุด + วาด polygon ของทุกแปลง
      lands.forEach((land) => {
        // --- marker (centroid หรือ fallback ไป location) ---
        let markerLoc = null;
        try {
          if (land.geometry?.type === "Polygon" && Array.isArray(land.geometry.coordinates)) {
            const pts = land.geometry.coordinates.map(([lon, lat]) => ({ lon, lat }));
            if (pts.length >= 3) {
              let area = 0, cx = 0, cy = 0;
              for (let i = 0; i < pts.length; i++) {
                const a = pts[i], b = pts[(i + 1) % pts.length];
                const f = (a.lon * b.lat - b.lon * a.lat);
                area += f; cx += (a.lon + b.lon) * f; cy += (a.lat + b.lat) * f;
              }
              area *= 0.5;
              markerLoc = area ? { lon: cx / (6 * area), lat: cy / (6 * area) } : pts[0];
            }
          }
        } catch (e) { }

        if (!markerLoc && land.location && typeof land.location.lon === "number" && typeof land.location.lat === "number") {
          markerLoc = land.location;
        }
        if (markerLoc) {
          const m = new window.longdo.Marker(markerLoc, {
            /* title: land.owner || land.agent + " (นายหน้า)" || "แปลงที่ดิน", */
            detail: this.makeMarkerDetailHtml(land),

            visibleRange: { min: 7, max: 20 },
            icon: { url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M12 2C7.58 2 4 5.58 4 10c0 5.25 5.4 10.58 7.2 12.19a1.2 1.2 0 0 0 1.6 0C14.6 20.58 20 15.25 20 10c0-4.42-3.58-8-8-8z' fill='rgba(255,255,255,0.85)' stroke='%239ca3af' stroke-width='1'/><circle cx='12' cy='10' r='3' fill='%239ca3af'/></svg>", size: { width: 28, height: 28 }, offset: { x: 14, y: 28 } },
          });
          m.__land = land;
          this.map.Overlays.add(m);
          this.landOverlays.push(m);
        }

        // --- polygon ---
        if (land.geometry?.type === "Polygon" && Array.isArray(land.geometry.coordinates)) {
          const pts = land.geometry.coordinates.map(([lon, lat]) => ({ lon, lat }));
          if (pts.length >= 3) {
            const poly = new window.longdo.Polygon(pts, {
              lineWidth: 2,
              lineColor: 'rgba(255,215,0,0.9)',   // เหลือง
              fillColor: 'rgba(255,215,0,0.25)',
            });
            poly.__land = land;
            this.map.Overlays.add(poly);
            this.landOverlays.push(poly);
          }
        }
      });
    },

    renderFloodsOnMap() {
      if (!this.map) return;

      // เคลียร์ overlay น้ำท่วมเดิมทั้งหมด
      try { this.floodOverlays.forEach(ov => this.map.Overlays.remove(ov)); } catch (_) { }
      this.floodOverlays = [];

      const zones = this.savedFloods || [];
      zones.forEach(z => {
        if (z?.geometry?.type === "Polygon" && Array.isArray(z.geometry.coordinates)) {
          const pts = z.geometry.coordinates.map(([lon, lat]) => ({ lon, lat }));
          if (pts.length >= 3) {
            // สไตล์ตาม level + waterAmount ปัจจุบัน
            const oldAmount = this.waterAmount;
            this.waterAmount = z.waterAmount ?? this.waterAmount;  // ใช้ค่าที่บันทึกไว้เป็น base
            const style = this.getFloodStyle(z.level || 'medium');
            this.waterAmount = oldAmount;

            const poly = new window.longdo.Polygon(pts, {
              lineWidth: 2,
              lineColor: style.lineColor,
              fillColor: style.fillColor,
            });
            poly.__isFlood = true;
            poly.__points = pts;
            poly._onMap = false;
            poly.__flood = {
              id: z.id,
              level: z.level || 'medium',
              ownerUid: z.ownerUid || null,
            };

            this.attachFloodEvents(poly);

            if (this.showFloodLayer) {
              this.map.Overlays.add(poly);
              poly._onMap = true;
            }
            this.floodOverlays.push(poly);
          }
        }
      });
    },


    // ...existing code...
    initMap() {
      // bind global handlers if available
      try { if (typeof this.bindGlobalErrorHandlers === "function") this.bindGlobalErrorHandlers(); } catch (e) { }

      try {
        if (typeof window.longdo === "undefined") {
          console.warn("longdo not loaded yet, retrying initMap...");
          setTimeout(() => this.initMap(), 500);
          return;
        }

        // prefer ESRI imagery (satellite + roads/labels) as the default base layer
        let baseLayer = null;
        try {
          // Try common ESRI imagery names; some Longdo builds accept different keys
          if (window.longdo.Layers && typeof window.longdo.Layers.ESRI === 'function') {
            try { baseLayer = window.longdo.Layers.ESRI('imagery'); } catch (e1) { }
            if (!baseLayer) try { baseLayer = window.longdo.Layers.ESRI('satellite'); } catch (e2) { }
            if (!baseLayer) try { baseLayer = window.longdo.Layers.ESRI('World_Imagery'); } catch (e3) { }
            if (!baseLayer) try { baseLayer = window.longdo.Layers.ESRI('road'); } catch (e4) { }
          }

          // Fallbacks: Longdo built-in satellite / hybrid
          if (!baseLayer && window.longdo.Layers && window.longdo.Layers.SATELLITE) {
            baseLayer = (typeof window.longdo.Layers.SATELLITE === 'function')
              ? window.longdo.Layers.SATELLITE()
              : window.longdo.Layers.SATELLITE;
          }
          if (!baseLayer && window.longdo.Layers && window.longdo.Layers.HYBRID) {
            baseLayer = (typeof window.longdo.Layers.HYBRID === 'function')
              ? window.longdo.Layers.HYBRID()
              : window.longdo.Layers.HYBRID;
          }
        } catch (e) {
          console.warn('failed to init ESRI imagery base, will fallback:', e);
        }

        // create map with defensive try/catch
        try {
          this.map = new window.longdo.Map({
            placeholder: document.getElementById("map"),
            language: "th",
            ui: window.longdo.UiComponent?.Full,
            layer: baseLayer,
          });
        } catch (err) {
          console.error("longdo.Map init failed with layer, retry without layer:", err);
          try {
            this.map = new window.longdo.Map({
              placeholder: document.getElementById("map"),
              language: "th",
            });
          } catch (err2) {
            console.error("longdo.Map init fallback failed:", err2);
            // show a small message in UI
            try {
              const el = document.getElementById("map");
              if (el) el.innerHTML = "<div style='color:#fff;padding:12px;background:#800'>Map init failed — see console</div>";
            } catch (_) { }
            return;
          }
        }

        try {
          this.map.Event.bind("ready", () => {


            // ----------------- FORCE FREE SATELLITE AS DEFAULT BASE -----------------
            // ใช้ ArcGIS หรือ Longdo Satellite ซึ่งฟรี (Google/Mapbox ต้องเสียเงิน)
            try {
              let satelliteLayer = null;
              const L = window.longdo.Layers;

              // ลำดับความสำคัญ: ArcGIS (ฟรี) > Longdo Satellite (ฟรี) > HYBRID
              if (L.ARCGIS_WORLD_IMAGERY) {
                satelliteLayer = typeof L.ARCGIS_WORLD_IMAGERY === 'function' ? L.ARCGIS_WORLD_IMAGERY() : L.ARCGIS_WORLD_IMAGERY;
                this.selectedMapType = 'arcgis-imagery';
                console.log('Using ArcGIS World Imagery (free)');
              } else if (L.SATELLITE) {
                satelliteLayer = typeof L.SATELLITE === 'function' ? L.SATELLITE() : L.SATELLITE;
                this.selectedMapType = 'longdo-satellite';
                console.log('Using Longdo Satellite (free)');
              } else if (L.HYBRID) {
                satelliteLayer = typeof L.HYBRID === 'function' ? L.HYBRID() : L.HYBRID;
                this.selectedMapType = 'longdo-hybrid';
                console.log('Using Longdo Hybrid (free)');
              }

              if (satelliteLayer) {
                if (this.map.Layers?.setBase) {
                  this.map.Layers.setBase(satelliteLayer);
                } else if (this.map.Layers?.base) {
                  this.map.Layers.base(satelliteLayer);
                }

                // เพิ่ม layer ถนน/ป้ายชื่อซ้อนทับ (ฟรี)
                try {
                  // ลอง ArcGIS labels ก่อน
                  if (L.ARCGIS_WORLD_TRANSPORTATION) {
                    const roadLayer = typeof L.ARCGIS_WORLD_TRANSPORTATION === 'function' ? L.ARCGIS_WORLD_TRANSPORTATION() : L.ARCGIS_WORLD_TRANSPORTATION;
                    this.map.Layers.add(roadLayer);
                    console.log('Added ArcGIS Transportation overlay');
                  }
                  if (L.ARCGIS_WORLD_PLACE) {
                    const placeLayer = typeof L.ARCGIS_WORLD_PLACE === 'function' ? L.ARCGIS_WORLD_PLACE() : L.ARCGIS_WORLD_PLACE;
                    this.map.Layers.add(placeLayer);
                    console.log('Added ArcGIS Place labels overlay');
                  }
                  // ถ้าไม่มี ArcGIS overlay ใช้ Longdo POI_TRANSPARENT แทน
                  if (!L.ARCGIS_WORLD_TRANSPORTATION && !L.ARCGIS_WORLD_PLACE && L.POI_TRANSPARENT) {
                    const poiLayer = typeof L.POI_TRANSPARENT === 'function' ? L.POI_TRANSPARENT() : L.POI_TRANSPARENT;
                    this.map.Layers.add(poiLayer);
                    console.log('Added Longdo POI overlay');
                  }
                } catch (overlayErr) {
                  console.debug('Failed to add road/label overlay:', overlayErr);
                }
              }

            } catch (e) {
              console.warn('Failed to init satellite base, keep default Longdo base:', e);
            }
            // ---------------------------------------------------------------

            // เพิ่ม marker ตามเดิม
            try { this.addMarkersToMap(); } catch (e) { console.error("addMarkersToMap failed", e); }

            // Defensive cleanup: remove Longdo attribution/logo nodes if present.
            // CSS rules already attempt to hide these, but some builds inject
            // elements in ways CSS may not catch — remove as a JS fallback.
            try {
              const candidates = [
                '.ldmap_logo', '.ldmap_footer', '.ldmap_attribution',
                '.ldmap_credit', '.ldmap_copyright', '.ldmap_poweredby',
                '.ldmap_tile_copyright', '.ldmap_attrib',
                'a[href*="longdo"]', 'img[alt*="Longdo"]'
              ];
              candidates.forEach((sel) => {
                document.querySelectorAll(sel).forEach((n) => {
                  try { n.remove(); }
                  catch (_) { n.style && (n.style.display = 'none'); }
                });
              });
            } catch (e) {
              console.debug('cleanup remove attribution failed:', e);
            }

            // Inject runtime CSS and a MutationObserver to force Longdo popups
            try {
              if (!document.getElementById('sqw-longdo-popup-style')) {
                const css = `
          .ldmap_placeholder.ldmap_frame.ldmap_popup { overflow: visible !important; max-height: none !important; max-width: 720px !important; width: auto !important; }
          .ldmap_placeholder.ldmap_frame.ldmap_popup, .ldmap_placeholder.ldmap_frame.ldmap_popup * { overflow: visible !important; max-height: none !important; height: auto !important; }
        `;
                const s = document.createElement('style');
                s.id = 'sqw-longdo-popup-style';
                s.appendChild(document.createTextNode(css));
                document.head.appendChild(s);
              }

              const fixPopupNode = (node) => {
                try {
                  node.style.overflow = 'visible';
                  node.style.maxHeight = 'none';
                  node.style.height = 'auto';
                  node.style.width = 'auto';
                  node.style.maxWidth = '720px';
                  node.querySelectorAll('*').forEach((ch) => {
                    try {
                      ch.style.overflow = 'visible';
                      ch.style.maxHeight = 'none';
                      ch.style.height = 'auto';
                    } catch (_) { }
                  });
                } catch (_) { }
              };

              // Patch existing popups
              document
                .querySelectorAll('.ldmap_placeholder.ldmap_frame.ldmap_popup')
                .forEach(fixPopupNode);

              // Observe DOM to patch future popups created by Longdo
              const mo = new MutationObserver((mutations) => {
                for (const m of mutations) {
                  for (const n of m.addedNodes) {
                    if (n && n.nodeType === 1) {
                      const el = /** @type {Element} */ (n);
                      if (el.classList && el.classList.contains('ldmap_placeholder')) {
                        fixPopupNode(el);
                      }
                      // sometimes wrapper is added deeper
                      el.querySelectorAll &&
                        el.querySelectorAll('.ldmap_placeholder')
                          .forEach(fixPopupNode);
                    }
                  }
                }
              });
              mo.observe(document.body, { childList: true, subtree: true });
            } catch (e) {
              console.debug('longdo popup override injection failed:', e);
            }
          });
        } catch (e) {
          console.warn("binding ready event failed", e);
        }


        // basic map setup (safe ops)
        try {
          this.map.location(
            { lon: this.currentLocation.lon, lat: this.currentLocation.lat, includePolygon: false },
            true
          );
          this.map.zoom(this.currentZoom, true);
        } catch (e) {
          console.warn("map.location/zoom warning:", e);
        }

        // reflect the chosen default base (prefer ESRI imagery)
        this.selectedMapType = (this.selectedMapType || 'esri-imagery');

        try { this.initDolWms_Longdo(); } catch (e) { console.warn("initDolWms_Longdo failed", e); }
        try { this.applyDolVisibility(); } catch (e) { console.warn("applyDolVisibility failed", e); }

        // Add markers after map ready
        try {
          this.map.Event.bind("ready", () => {

            try { this.addMarkersToMap(); } catch (e) { console.error("addMarkersToMap failed", e); }

            // Try to force free satellite as base (ArcGIS/Longdo ฟรี)
            try {
              const L = window.longdo?.Layers;
              if (L) {
                let satelliteLayer = null;
                // ลำดับความสำคัญ: ArcGIS (ฟรี) > Longdo Satellite (ฟรี) > HYBRID
                if (L.ARCGIS_WORLD_IMAGERY) {
                  satelliteLayer = typeof L.ARCGIS_WORLD_IMAGERY === 'function' ? L.ARCGIS_WORLD_IMAGERY() : L.ARCGIS_WORLD_IMAGERY;
                  this.selectedMapType = 'arcgis-imagery';
                } else if (L.SATELLITE) {
                  satelliteLayer = typeof L.SATELLITE === 'function' ? L.SATELLITE() : L.SATELLITE;
                  this.selectedMapType = 'longdo-satellite';
                } else if (L.HYBRID) {
                  satelliteLayer = typeof L.HYBRID === 'function' ? L.HYBRID() : L.HYBRID;
                  this.selectedMapType = 'longdo-hybrid';
                }

                if (satelliteLayer) {
                  if (this.map.Layers?.setBase) this.map.Layers.setBase(satelliteLayer);
                  else if (this.map.Layers?.base) this.map.Layers.base(satelliteLayer);
                  console.log('Satellite layer set:', this.selectedMapType);

                  // เพิ่ม layer ถนน/ป้ายชื่อซ้อนทับ (ฟรี)
                  try {
                    if (L.ARCGIS_WORLD_TRANSPORTATION) {
                      const roadLayer = typeof L.ARCGIS_WORLD_TRANSPORTATION === 'function' ? L.ARCGIS_WORLD_TRANSPORTATION() : L.ARCGIS_WORLD_TRANSPORTATION;
                      this.map.Layers.add(roadLayer);
                    }
                    if (L.ARCGIS_WORLD_PLACE) {
                      const placeLayer = typeof L.ARCGIS_WORLD_PLACE === 'function' ? L.ARCGIS_WORLD_PLACE() : L.ARCGIS_WORLD_PLACE;
                      this.map.Layers.add(placeLayer);
                    }
                    if (!L.ARCGIS_WORLD_TRANSPORTATION && !L.ARCGIS_WORLD_PLACE && L.POI_TRANSPARENT) {
                      const poiLayer = typeof L.POI_TRANSPARENT === 'function' ? L.POI_TRANSPARENT() : L.POI_TRANSPARENT;
                      this.map.Layers.add(poiLayer);
                    }
                  } catch (overlayErr) {
                    console.debug('Failed to add road/label overlay:', overlayErr);
                  }
                }
              }
            } catch (e) { console.debug('Satellite base detection routine failed', e); }

            // Defensive cleanup: remove Longdo attribution/logo nodes if present.
            // CSS rules already attempt to hide these, but some builds inject
            // elements in ways CSS may not catch — remove as a JS fallback.
            try {
              const candidates = [
                '.ldmap_logo', '.ldmap_footer', '.ldmap_attribution',
                '.ldmap_credit', '.ldmap_copyright', '.ldmap_poweredby',
                '.ldmap_tile_copyright', '.ldmap_attrib',
                'a[href*="longdo"]', 'img[alt*="Longdo"]'
              ];
              candidates.forEach((sel) => {
                document.querySelectorAll(sel).forEach((n) => { try { n.remove(); } catch (_) { n.style && (n.style.display = 'none'); } });
              });
            } catch (e) {
              console.debug('cleanup remove attribution failed:', e);
            }
            // Inject runtime CSS and a MutationObserver to force Longdo popups
            try {
              if (!document.getElementById('sqw-longdo-popup-style')) {
                const css = `
                  .ldmap_placeholder.ldmap_frame.ldmap_popup { overflow: visible !important; max-height: none !important; max-width: 720px !important; width: auto !important; }
                  .ldmap_placeholder.ldmap_frame.ldmap_popup, .ldmap_placeholder.ldmap_frame.ldmap_popup * { overflow: visible !important; max-height: none !important; height: auto !important; }
                `;
                const s = document.createElement('style');
                s.id = 'sqw-longdo-popup-style';
                s.appendChild(document.createTextNode(css));
                document.head.appendChild(s);
              }

              const fixPopupNode = (node) => {
                try {
                  node.style.overflow = 'visible';
                  node.style.maxHeight = 'none';
                  node.style.height = 'auto';
                  node.style.width = 'auto';
                  node.style.maxWidth = '720px';
                  node.querySelectorAll('*').forEach((ch) => {
                    try { ch.style.overflow = 'visible'; ch.style.maxHeight = 'none'; ch.style.height = 'auto'; } catch (_) { }
                  });
                } catch (_) { }
              };

              // Patch existing popups
              document.querySelectorAll('.ldmap_placeholder.ldmap_frame.ldmap_popup').forEach(fixPopupNode);

              // Observe DOM to patch future popups created by Longdo
              const mo = new MutationObserver((mutations) => {
                for (const m of mutations) {
                  for (const n of m.addedNodes) {
                    if (n && n.nodeType === 1) {
                      const el = /** @type {Element} */ (n);
                      if (el.classList && el.classList.contains('ldmap_placeholder')) {
                        fixPopupNode(el);
                      }
                      // sometimes wrapper is added deeper
                      el.querySelectorAll && el.querySelectorAll('.ldmap_placeholder').forEach(fixPopupNode);
                    }
                  }
                }
              });
              mo.observe(document.body, { childList: true, subtree: true });
            } catch (e) {
              console.debug('longdo popup override injection failed:', e);
            }
          });
        } catch (e) { console.warn("binding ready event failed", e); }

        // Click handler (defensive)
        try {
          // Overlay click handler: ensure EIA marker clicks open the EIA form/popup
          try {
            this.map.Event.bind("overlayClick", (overlay) => {
              try {
                if (!overlay) return;
                if (overlay.__isEiaProject) {
                  if (!this.drawMode && !this.floodMode) {
                    try { this.currentMode = 'eia'; this.isFormOpen = true; } catch (_) { }
                    this.editEiaProject(overlay.__eiaProject);
                    this.selectedEiaForInfo = overlay.__eiaProject;
                    this.showEiaInfo = true;
                    try {
                      if (overlay.__eiaProject && overlay.__eiaProject.location && this.map) {
                        this.map.location({ lon: overlay.__eiaProject.location.lon, lat: overlay.__eiaProject.location.lat }, true);
                      }
                    } catch (_) { }
                  }
                  return;
                }
                // If overlay is a land, open sale mode and select it (populates left form)
                if (overlay.__land) {
                  try { this.currentMode = 'sale'; } catch (_) { }
                  try { this.isFormOpen = true; } catch (_) { }
                  try { this.selectLand(overlay.__land); } catch (e) { console.debug('overlayClick selectLand', e); }
                  try { if (overlay.__land.location) this.map.location(overlay.__land.location, true); } catch (_) { }
                  return;
                }
              } catch (e) {
                console.error('overlayClick (initMap) error:', e);
              }
            });
          } catch (e) { console.warn('binding overlayClick in initMap failed', e); }

          this.map.Event.bind("click", (ev) => {
            try {
              // If a UI panel is being dragged, ignore map clicks
              if (this.__isDragging) return;

              this.showMarkerInfo = false;

              if (!this.drawMode && !this.floodMode) {
                this.clearSelectedLand();
                // ล้างฟอร์ม EIA เมื่อคลิกพื้นที่อื่น
                if (this.currentMode === 'eia' && !this.eiaDrawMode) {
                  this.clearEiaForm();
                  this.closeEiaInfo();
                }
                return;
              }
              const p = this.getClickLocation ? this.getClickLocation(ev) : null;
              if (!p) return;
              if (this.drawMode) {
                this.drawPoints.push({ lon: p.lon, lat: p.lat });
                this.redrawDrawing();
              } else if (this.floodMode) {
                this.floodPoints.push({ lon: p.lon, lat: p.lat });
                this.redrawFloodDrawing();
              }
              try {
                const dot = new window.longdo.Circle(p, 1, { fillColor: "rgba(0,0,0,0.7)" });
                this.map.Overlays.add(dot);
                setTimeout(() => this.map.Overlays.remove(dot), 500);
              } catch (_) { }
            } catch (inner) { console.error("map click handler error:", inner); }
          });
        } catch (e) { console.warn("binding click event failed", e); }

        // expose selectSaleType / openChatWith / requestPurchase for popup buttons if present
        try { window.selectSaleType = this.selectSaleType.bind(this); } catch (e) { }
        try { window.openChatWith = this.openChatWith?.bind(this) || (() => { }); } catch (e) { }
        try { window.requestPurchase = this.requestPurchase?.bind(this) || (() => { }); } catch (e) { }
        try { window.openImageViewer = this.openImageViewer?.bind(this) || (() => { }); } catch (e) { }
        try {
          window.openLeftDetails = (landId) => {
            try {
              const land = this.getLandById ? this.getLandById(landId) : null;
              if (!land) return;
              // ensure in sale mode and open left form
              try { this.currentMode = 'sale'; } catch (_) { }
              try { this.isFormOpen = true; } catch (_) { }
              try { this.selectLand(land); } catch (_) { }
            } catch (e) { console.debug('openLeftDetails error', e); }
          };
        } catch (e) { }
        try {
          window.viewLandImages = (landId, startIndex = 0) => {
            const land = this.getLandById(landId);
            if (land && land.images && land.images.length > 0) {
              this.openImageViewer(land.images, startIndex);
            }
          };
        } catch (e) { }

        // hide some UI components if available (safe)
        try { this.map.Ui?.Zoombar?.visible(false); this.map.Ui?.DPad?.visible(false); } catch (e) { }

      } catch (e) {
        console.error("initMap outer error:", e);
      }
    },
    // ...existing code...

    // ใช้ตอนคลิก “รายการฝั่งซ้าย”
    focusLand(land, zoom = 17) {
      if (!land || !this.map) return;
      // ใส่ข้อมูลลงแบบฟอร์ม/ฝั่งขวา เหมือนตอนคลิกที่ polygon/หมุด
      this.selectLand(land);

      // หา center แล้วเลื่อนไป
      const c = this.getLandCenter(land);
      this.centerTo(c.lon, c.lat, zoom);
    },

    // หาพิกัดศูนย์กลางของแปลง (centroid) หรือพิกัด marker ที่บันทึกไว้
    getLandCenter(land) {
      // geometry → centroid
      if (land?.geometry?.type === "Polygon" && Array.isArray(land.geometry.coordinates)) {
        const pts = land.geometry.coordinates.map(([lon, lat]) => ({ lon, lat }));
        if (pts.length >= 3) {
          let area = 0, cx = 0, cy = 0;
          for (let i = 0; i < pts.length; i++) {
            const a = pts[i], b = pts[(i + 1) % pts.length];
            const f = (a.lon * b.lat - b.lon * a.lat);
            area += f; cx += (a.lon + b.lon) * f; cy += (a.lat + b.lat) * f;
          }
          area *= 0.5;
          if (area) return { lon: cx / (6 * area), lat: cy / (6 * area) };
          return pts[0];
        }
      }
      // fallback → location ที่บันทึกไว้
      if (land?.location?.lon != null && land?.location?.lat != null) {
        return { lon: land.location.lon, lat: land.location.lat };
      }
      // สุดท้าย → พิกัดกลางปัจจุบัน
      return { lon: this.currentLocation.lon, lat: this.currentLocation.lat };
    },

    addMarkersToMap() {
      if (!this.map) return;

      // ถ้าไม่มี markers array หรือว่าง ให้ข้ามการทำงาน
      if (!this.markers || !Array.isArray(this.markers) || this.markers.length === 0) {
        return;
      }

      // เคลียร์หมุดเดิม
      this.clearAllMarkers();

      // เช็คว่า layer หมุดเปิดอยู่ไหม
      const markersLayer = this.availableLayers.find((l) => l.id === 1);
      if (!markersLayer || !markersLayer.visible) return;

      // เพิ่มหมุดลงแผนที่
      this.visibleMarkers.forEach((markerData) => {
        const marker = new window.longdo.Marker(markerData.location, {
          title: markerData.title,
          detail: markerData.detail,
          icon: markerData.icon || {
            url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M12 2C7.58 2 4 5.58 4 10c0 5.25 5.4 10.58 7.2 12.19a1.2 1.2 0 0 0 1.6 0C14.6 20.58 20 15.25 20 10c0-4.42-3.58-8-8-8z' fill='rgba(255,255,255,0.85)' stroke='%239ca3af' stroke-width='1'/><circle cx='12' cy='10' r='3' fill='%239ca3af'/></svg>",
            size: { width: 32, height: 32 },
            offset: { x: 16, y: 32 },
          },
          visibleRange: { min: 7, max: 20 },
          draggable: false,
          weight: window.longdo.OverlayWeight
            ? window.longdo.OverlayWeight.Top
            : null,
          // ❌ ไม่ใส่ popup:{} เพื่อให้ใช้ popup มาตรฐานของ Longdo
        });

        // เก็บอ้างอิงหมุด
        this.mapMarkers.push({
          data: markerData,
          marker: marker,
        });

        // เพิ่มหมุดลงบนแผนที่
        this.map.Overlays.add(marker);
      });

      // event คลิก overlay (เหมือนเดิม ไม่ต้องแก้)
      if (this.map.Event && this.map.Event.bind) {
        this.map.Event.bind("overlayClick", (overlay) => {
          if (overlay && overlay.__land) {
            this.onLandOverlayClick(overlay.__land, overlay);
            return;
          }
          if (overlay && overlay.__isFlood) {
            if (!this.drawMode && !this.floodMode && !this.eiaMode) {
              this.selectFloodPolygon(overlay);
            }
            return;
          }
          if (overlay && overlay.__isEiaProject) {
            if (!this.drawMode && !this.floodMode) {
              this.onEiaProjectClick(overlay.__eiaProject);
            }
            return;
          }
          const markerItem = this.mapMarkers.find(
            (item) => item.marker === overlay
          );
          if (markerItem) {
            this.onMarkerClick(markerItem.data, overlay);
          }
        });
      }
    },


    onMarkerClick(markerData) {
      this.selectedMarker = markerData;
      this.showMarkerInfo = true;

      // Optional: Center on clicked marker
      if (markerData.location) {
        this.map.location(markerData.location, true);
      }


    },

    clearAllMarkers() {
      if (!this.map) return;

      this.mapMarkers.forEach((item) => {
        this.map.Overlays.remove(item.marker);
      });
      this.mapMarkers = [];
    },

    toggleMarkersLayer() {
      const markersLayer = this.availableLayers.find((l) => l.id === 1);
      if (markersLayer) {
        if (markersLayer.visible) {
          this.addMarkersToMap();
        } else {
          this.clearAllMarkers();
        }
      }
    },

    addNewMarker(location) {
      const newMarker = {
        id: this.markers.length + 1,
        location: location,
        title: `พื้นที่ใหม่ ${this.markers.length + 1}`,
        detail: "คลิกเพื่อแก้ไขรายละเอียด",
        icon: {
          url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M12 2C7.58 2 4 5.58 4 10c0 5.25 5.4 10.58 7.2 12.19a1.2 1.2 0 0 0 1.6 0C14.6 20.58 20 15.25 20 10c0-4.42-3.58-8-8-8z' fill='rgba(255,255,255,0.85)' stroke='%239ca3af' stroke-width='1'/><circle cx='12' cy='10' r='3' fill='%239ca3af'/></svg>",
          size: { width: 32, height: 32 },
          offset: { x: 16, y: 32 },
        },
      };

      this.markers.push(newMarker);
      this.addMarkersToMap();
    },

    centerOnMarker(marker) {
      if (this.map && marker.location) {
        this.map.location(marker.location, true);
        this.map.zoom(15, true);
      }
    },

    async setUserProfile() {
      if (!this.tempUserName.trim()) return;
      this.userProfile.name = this.tempUserName.trim();
      this.userProfile.joinedAt = Date.now();
      await this.updateUserOnlineStatus();
      if (this.currentUserId) this.initP2PFacade(); // เผื่อเพิ่งได้ชื่อ
    },

    async sendMessage() {
      if (!this.chatInput.trim()) return;
      if (!this.userProfile.name) {
        alert('กรุณาตั้งชื่อผู้ใช้ก่อนส่งข้อความ');
        return;
      }
      if (!this.selectedUser || !this.selectedUser.uid) {
        alert('กรุณาเลือกผู้รับก่อนส่งข้อความ');
        return;
      }

      const text = this.chatInput.trim();

      try {
        const res = await sendChatMessage(text, this.currentUserId, this.userProfile.name, this.selectedUser.uid);
        // clear input after success
        this.chatInput = "";
      } catch (e) {
        console.error('send P2P failed:', e);
        const msg = e?.message || String(e);
        // show a more specific error so user can report it
        alert('ไม่สามารถส่งข้อความได้: ' + msg);
      }
    },

    handleTyping() {
      if (this.typingTimer) clearTimeout(this.typingTimer);
      this.showTypingIndicator = true;
      this.typingTimer = setTimeout(() => {
        this.showTypingIndicator = false;
      }, 1000);
    },

    formatNumber(value) {
      if (value == null || value === '') return '';
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    fmt2(n) {
      if (n == null || n === '') return '';
      const num = typeof n === 'string' ? parseFloat(n.replace(/,/g, '')) : Number(n);
      if (!Number.isFinite(num)) return '';
      return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    },

    fmt(n) {
      if (n == null || n === '') return '';
      const num = typeof n === 'string' ? parseFloat(n.replace(/,/g, '')) : Number(n);
      if (!Number.isFinite(num)) return '';
      return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    },

    unformatNumber(value) {
      if (!value) return '';
      return parseInt(value.replace(/,/g, ''), 10);
    },
    sanitizeDecimal(s) {
      // อนุญาตเฉพาะตัวเลขกับจุดทศนิยม 1 จุด (พิมพ์ .2, 0. หรือ 12.34 ได้)
      if (s == null) return "";
      let str = String(s).replace(/,/g, '').replace(/[^\d.]/g, '');
      const firstDot = str.indexOf('.');
      if (firstDot !== -1) {
        str = str.slice(0, firstDot + 1) + str.slice(firstDot + 1).replace(/\./g, '');
      }
      return str;
    },

    unformatDecimal(v) {
      if (v == null || v === '') return null;
      const n = parseFloat(String(v).replace(/,/g, ''));
      return Number.isFinite(n) ? n : null;
    },

    formatLandSize(value) {
      if (value == null || value === '') return '';
      let str = String(value).replace(/,/g, '').trim();

      // ถ้าเริ่มด้วยจุด เช่น ".2" → เติม 0 หน้า → "0.2"
      if (str.startsWith('.')) str = '0' + str;

      // ถ้าใส่เฉพาะ "." หรือ "0." → คืนเป็นค่าว่าง
      if (str === '.' || str === '0.') return '';

      const num = parseFloat(str);
      if (!Number.isFinite(num)) return '';

      // ถ้าจบด้วยจุด หรือเป็นรูปแบบ ".0" หรือ ".00" → ตัดทศนิยมทิ้ง
      if (str.endsWith('.') || /\.0+$/.test(str)) {
        return num.toLocaleString(); // แสดงเป็นจำนวนเต็ม
      }

      // ถ้าเป็นรูปแบบ ".2" หรือ "19.2" → เติม 0 ให้ครบ 2 หลัก
      if (/^\d+\.\d$/.test(str) || /^0\.\d$/.test(str)) {
        return num.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }

      // ถ้าเป็นจำนวนเต็ม → แสดงแบบไม่มีทศนิยม
      if (Number.isInteger(num)) return num.toLocaleString();

      // ถ้าเป็นทศนิยม (เช่น 19.25) → แสดง 2 หลัก
      return num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    formatTime(timestamp) {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));

      if (diffInMinutes < 1) return "ตอนนี้";
      if (diffInMinutes < 60) return `${diffInMinutes} นาทีที่แล้ว`;
      if (diffInMinutes < 1440)
        return `${Math.floor(diffInMinutes / 60)} ชั่วโมงที่แล้ว`;

      return date.toLocaleDateString("th-TH", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    formatDateTime(timestamp) {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return date.toLocaleString("th-TH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    scrollToBottom() {
      if (this.$refs.chatBody)
        this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
    },

    toggleP2P() {
      this.showChat = !this.showChat;
      if (this.showChat) {
        this.hasNewMessage = false;
        this.setChatMode("rooms");
        this.$nextTick(() => this.scrollToBottom());
      }
    },
    initP2PFacade() {
      if (!this.currentUserId) return;

      if (this.onlineUsersUnsubscribe) this.onlineUsersUnsubscribe();
      this.onlineUsersUnsubscribe = subscribeOnlineUsers((users) => {

        this.onlineUsers = users.filter((u) => u.uid !== this.currentUserId);

      });

      if (this.chatRoomsUnsubscribe) this.chatRoomsUnsubscribe();
      this.chatRoomsUnsubscribe = subscribeP2PChatRooms(
        this.currentUserId,
        (rooms) => {
          const prevUnread = this.unreadCount;
          this.chatRooms = rooms;
          this.unreadCount = rooms.reduce(
            (sum, r) => sum + (r.unreadCount || 0),
            0
          );
          this.hasNewMessage = this.unreadCount > 0;

          // เก็บรายชื่อคนที่มี unread messages (ใช้ชื่อจริงจาก otherName)
          const unreadRooms = rooms.filter(r => r.unreadCount > 0);
          this.unreadFromUsers = unreadRooms.map(r => r.otherName);

          // ถ้ามี unread ใหม่ แสดง notification
          if (this.unreadCount > prevUnread && unreadRooms.length > 0) {
            this.lastMessageFrom = unreadRooms[0].otherName;
            this.showChatNotification(this.lastMessageFrom);
          }
        }
      );

      this.updateUserOnlineStatus();
      if (this.onlineStatusInterval) clearInterval(this.onlineStatusInterval);
      this.onlineStatusInterval = setInterval(
        () => this.updateUserOnlineStatus(),
        30000
      );
    },
    async updateUserOnlineStatus() {
      if (!this.currentUserId || !this.userProfile.name) return;
      try {
        await updateOnlineStatus(this.currentUserId, {
          name: this.userProfile.name,
          lastSeen: Date.now(),
        });
      } catch (e) {
        console.error("Failed to update online status:", e);
      }
    },

    // แสดง notification เมื่อมีข้อความใหม่
    showChatNotification(fromName) {
      // เล่นเสียง
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2JkZuUjHxwZWJjbnuIlJqXjoF0aGVodH+MmZqXjoF0aWdpdoOQm5qUin5zaGhsfYqWm5eSiHtvamtxf4yYm5WOgndtam1zgY2Ym5OLf3JramxxgIyXmpOKfnFqa3F/jJeZk4p+c2tscIGMl5mSiXxxaWtwgIyXmZKJfHFpa3B/jJeZkol8');
        audio.volume = 0.3;
        audio.play().catch(() => { });
      } catch (_) { }

      // แสดง browser notification (ถ้าได้รับอนุญาต)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('💬 ข้อความใหม่', {
          body: `${fromName} ส่งข้อความถึงคุณ`,
          icon: '/img/icons/android-chrome-192x192.png',
          tag: 'chat-notification'
        });
      } else if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    },

    setChatMode(mode) {
      this.chatMode = mode;
      if (mode === "rooms" && this.p2pChatUnsubscribe) {
        this.p2pChatUnsubscribe();
        this.p2pChatUnsubscribe = null;
      }
    },
    backToRooms() {
      this.setChatMode("rooms");
    },
    selectUserToChat(user) {
      this.selectedUser = user;
      this.chatMode = "chat";
      this.startRoomWith(user.uid);
    },
    // เปิด chat room จากรายการแชทล่าสุด (Messenger style)
    openChatRoom(room) {
      this.selectedUser = {
        uid: room.otherUid,
        name: room.otherName,
      };
      this.chatMode = "chat";
      this.startRoomWith(room.otherUid);
    },
    // ยืนยันและลบห้องแชท
    async confirmDeleteChat(room) {
      const confirmed = confirm(`ต้องการลบการสนทนากับ "${room.otherName}" หรือไม่?\n\nข้อความทั้งหมดจะถูกลบจากฝั่งของคุณ`);
      if (!confirmed) return;
      try {
        await deleteChatRoom(this.currentUserId, room.otherUid);
        // ถ้ากำลังดูห้องนี้อยู่ ให้กลับไปหน้า rooms
        if (this.currentChatRoom === room.otherUid) {
          this.backToRooms();
        }
        alert('ลบการสนทนาเรียบร้อยแล้ว');
      } catch (e) {
        console.error('Delete chat failed', e);
        alert('เกิดข้อผิดพลาด: ' + e.message);
      }
    },
    // แปลงเวลาเป็น "5 นาทีที่แล้ว" style
    formatTimeAgo(timestamp) {
      if (!timestamp) return '';
      const now = Date.now();
      const diff = now - timestamp;
      const mins = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (mins < 1) return 'เมื่อกี้';
      if (mins < 60) return `${mins} นาที`;
      if (hours < 24) return `${hours} ชม.`;
      if (days < 7) return `${days} วัน`;
      return new Date(timestamp).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
    },
    selectChatRoom(room) {
      const other = this.onlineUsers.find((u) => u.uid === room.otherUid);
      if (other) {
        this.selectUserToChat(other);
      } else {
        this.selectedUser = {
          uid: room.otherUid,
          name: room.otherName || `User-${room.otherUid.slice(0, 6)}`,
        };
        this.chatMode = "chat";
        this.startRoomWith(room.otherUid);
      }
    },
    startRoomWith(otherUid) {
      if (this.p2pChatUnsubscribe) this.p2pChatUnsubscribe();

      this.p2pChatUnsubscribe = subscribeChat(
        this.currentUserId,
        otherUid,
        (messages) => {
          this.chatMessages = messages;
          this.$nextTick(() => this.scrollToBottom());
          markMessagesAsRead(this.currentUserId, otherUid);
        }
      );

      this.currentChatRoom = otherUid;
    },

    /**
     * Open chat UI and start a P2P session with another user by UID.
     * This is exposed to global scope so marker popups can call `window.openChatWith(uid, name)`.
     */
    openChatWith(otherUid, otherName = '') {
      try {
        if (!otherUid) return;
        if (!this.currentUserId) {
          alert('กรุณาเข้าสู่ระบบก่อนคุย');
          return;
        }

        this.showChat = true;
        this.chatMode = 'chat';
        // populate selectedUser for UI immediately
        this.selectedUser = {
          uid: otherUid,
          name: otherName || `User-${(otherUid || '').slice(0, 6)}`,
        };

        // start the P2P subscription and scroll to bottom
        this.$nextTick(() => {
          try {
            this.startRoomWith(otherUid);
            this.scrollToBottom();
          } catch (e) {
            console.error('openChatWith: startRoomWith failed', e);
          }
        });
      } catch (e) {
        console.error('openChatWith error:', e);
      }
    },

    centerBangkok() {
      if (this.map) {
        this.map.location(
          {
            lon: 100.5234,
            lat: 13.7563,
            includePolygon: false,
          },
          true
        );
        this.currentLocation = { lat: 13.7563, lon: 100.5234 };
        this.map.zoom(12, true);
      }
    },

    reloadAPI() {
      this.initMap();
    },
    // โหลด KML จาก URL
    async loadKmlFromUrl(url) {
      if (!this.map) return;
      if (!url) { alert('กรุณาระบุ URL ของไฟล์ KML'); return; }

      try {
        // ดึงไฟล์ KML
        const res = await fetch(url, { cache: 'no-store' });
        const kmlText = await res.text();

        // ล้างของเดิมก่อน
        this.clearKml();

        // แปลง + วาดด้วย helper (สร้างจาก script ใน index.html)
        const result = window.kmlToLongdoMap(this.map, kmlText, {
          // ปรับสไตล์ geometry ที่มากับ KML ได้
          geometryOptions: {
            lineWidth: 2,
            lineColor: 'rgba(255,215,0,0.95)',
            fillColor: 'rgba(255,215,0,0.25)',
          },
          // สไตล์ Marker (ถ้า KML มีจุด)
          markerOptions: {
            icon: {
              url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M12 2C7.58 2 4 5.58 4 10c0 5.25 5.4 10.58 7.2 12.19a1.2 1.2 0 0 0 1.6 0C14.6 20.58 20 15.25 20 10c0-4.42-3.58-8-8-8z' fill='rgba(255,255,255,0.85)' stroke='%239ca3af' stroke-width='1'/><circle cx='12' cy='10' r='3' fill='%239ca3af'/></svg>",
              size: { width: 28, height: 28 },
              offset: { x: 14, y: 28 },
            },
            visibleRange: { min: 6, max: 20 },
          },
        });

        this.kmlState = result;
        this.kmlOverlays = (result && Array.isArray(result.overlays)) ? result.overlays : [];
        this.kmlFeatures = Array.isArray(result?.features) ? result.features : [];

        // zoom ให้พอดีขอบเขต
        if (result?.bound) this.map.bound(result.bound);
        this.applyKmlFiltersUsingUI();

        // ถ้าต้อง snap กับจุด KML ด้วย ก็อัปเดตจุด snap
        this.updateSnapPoints();

      } catch (e) {
        console.error('loadKmlFromUrl error:', e);
        alert('โหลด KML ไม่สำเร็จ: ' + (e?.message || e));
      }
    },

    // เคลียร์ KML ออกจากแผนที่
    clearKml() {
      if (!this.map) return;

      try {
        if (this.kmlState?.overlays?.length) {
          this.kmlState.overlays.forEach(ov => this.map.Overlays.remove(ov));
        } else if (this.kmlOverlays?.length) {
          this.kmlOverlays.forEach(ov => this.map.Overlays.remove(ov));
        }
      } catch (e) {
        console.debug('clearKml remove overlays failed:', e);
      }

      this.kmlState = null;
      this.kmlOverlays = [];
    },

    // รองรับอัปโหลดไฟล์ .kml จากเครื่องผู้ใช้
    async importKmlFile(evt) {
      // NOTE: ตรงนี้คือ placeholder เดิมของคุณ ผมเติมให้เป็นของจริงแล้ว
      // ใช้ <input type="file" accept=".kml"> ส่ง event นี้เข้ามา
      const file = evt?.target?.files?.[0];
      if (!file) return;

      try {
        const kmlText = await file.text();
        this.clearKml();

        const result = window.kmlToLongdoMap(this.map, kmlText, {
          geometryOptions: {
            lineWidth: 2,
            lineColor: 'rgba(0,0,0,0.9)',
            fillColor: 'rgba(30,144,255,0.25)',
          },
          markerOptions: {
            icon: {
              url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M12 2C7.58 2 4 5.58 4 10c0 5.25 5.4 10.58 7.2 12.19a1.2 1.2 0 0 0 1.6 0C14.6 20.58 20 15.25 20 10c0-4.42-3.58-8-8-8z' fill='rgba(255,255,255,0.85)' stroke='%239ca3af' stroke-width='1'/><circle cx='12' cy='10' r='3' fill='%239ca3af'/></svg>",
              size: { width: 28, height: 28 },
              offset: { x: 14, y: 28 },
            },
            visibleRange: { min: 6, max: 20 },
          },
        });

        this.kmlState = result;
        this.kmlOverlays = (result && Array.isArray(result.overlays)) ? result.overlays : [];
        this.kmlFeatures = Array.isArray(result?.features) ? result.features : [];
        if (result?.bound) this.map.bound(result.bound);
        this.applyKmlFiltersUsingUI();
        this.updateSnapPoints();
      } catch (e) {
        console.error('importKmlFile error:', e);
        alert('อ่านไฟล์ KML ไม่สำเร็จ: ' + (e?.message || e));
      } finally {
        // รีเซ็ตค่า input ให้เลือกไฟล์เดิมซ้ำได้
        try { evt.target.value = ''; } catch (_) { }
      }
    },


    redrawDrawing() {
      if (!this.map) return;
      try { if (this.drawPolyline) this.map.Overlays.remove(this.drawPolyline); }
      catch (e) { console.debug("redraw: rm polyline fail", e); }
      try { if (this.drawPolygon) this.map.Overlays.remove(this.drawPolygon); }
      catch (e) { console.debug("redraw: rm polygon fail", e); }

      if (this.drawPoints.length >= 2) {
        this.drawPolyline = new window.longdo.Polyline(this.drawPoints, {
          lineWidth: 3,
          lineColor: "rgba(0,0,0,0.6)",
        });
        this.map.Overlays.add(this.drawPolyline);
      }
    },

    startDrawing() {
      this.drawMode = true;
      this.drawPoints = [];
      this.redrawDrawing();
      this.updateSnapPoints();
      try { document.getElementById('map').style.cursor = 'default'; } catch (e) { }
    },
    finishDrawing() {
      if (!this.map) return;
      if (this.drawPoints.length < 3) { alert("ต้องคลิกอย่างน้อย 3 จุด"); return; }
      try { if (this.drawPolyline) this.map.Overlays.remove(this.drawPolyline); } catch (e) { }
      try { if (this.drawPolygon) this.map.Overlays.remove(this.drawPolygon); } catch (e) { }

      // สีต่างกันตาม mode
      const isEiaMode = this.currentMode === 'eia';
      const lineColor = isEiaMode ? `rgba(${this.eiaColorRgb},0.9)` : "rgba(30,144,255,0.9)";
      const fillColor = isEiaMode ? `rgba(${this.eiaColorRgb},0.25)` : "rgba(30,144,255,0.25)";

      this.drawPolygon = new window.longdo.Polygon(this.drawPoints, {
        lineWidth: 2,
        lineColor: lineColor,
        fillColor: fillColor,
      });
      this.map.Overlays.add(this.drawPolygon);
      this.drawMode = false;

      // ถ้าเป็น EIA mode ให้เตรียมฟอร์ม
      if (isEiaMode) {
        this.isFormOpen = true;
        this.eiaProjectData = {
          projectName: '',
          projectLink: '',
          investment: '',
          tempLocation: this.drawPoints[0],
          geometry: {
            type: "Polygon",
            coordinates: this.drawPoints.map(p => [p.lon, p.lat])
          }
        };
        this.editingEiaId = null;
      }

      this.updateSnapPoints();
      try { document.getElementById('map').style.cursor = 'default'; } catch (e) { }
    },
    clearDrawing() {
      this.drawMode = false;
      this.drawPoints = [];
      try { if (this.drawPolyline) this.map.Overlays.remove(this.drawPolyline); } catch (e) { }
      try { if (this.drawPolygon) this.map.Overlays.remove(this.drawPolygon); } catch (e) { }
      this.drawPolyline = null;
      this.drawPolygon = null;

      this.updateSnapPoints();
      try { document.getElementById('map').style.cursor = 'default'; } catch (e) { }
    },

    // ========== EIA Project Methods (uses shared drawing functions) ==========

    async saveEiaProjectData(data) {
      if (!data.projectName?.trim() && !data.projectLink?.trim()) {
        alert("กรุณากรอก Project Name หรือ Link อย่างน้อย 1 ช่อง");
        return;
      }

      // ใช้ geometry ถ้ามี หรือ location จากการแก้ไข
      const geometry = data.geometry ||
        (this.selectedEiaProject && this.selectedEiaProject.geometry) ||
        null;

      const markerLoc = data.tempLocation ||
        (this.selectedEiaProject && this.selectedEiaProject.location) ||
        { lon: this.currentLocation.lon, lat: this.currentLocation.lat };

      const payload = {
        projectStartDate: (data.projectStartDate || "").trim(),
        ownerNameTo: (data.ownerNameTo || "").trim(),
        projectName: (data.projectName || "").trim(),
        investment: data.investment || "",
        projectValue: data.projectValue || "",
        projectImage: data.projectImage || "",
        projectImageName: data.projectImageName || "",
        landSizeRai: data.landSizeRai || "",
        landSizeNgan: data.landSizeNgan || "",
        landSizeWah: data.landSizeWah || "",
        usableArea: data.usableArea || "",
        reportNumber: (data.reportNumber || "").trim(),
        engineerNumber: (data.engineerNumber || "").trim(),
        approvalDate: (data.approvalDate || "").trim(),
        approvalNumber: (data.approvalNumber || "").trim(),
        projectType: (data.projectType || "").trim(),
        projectSubType: (data.projectSubType || "").trim(),
        reviewStatus: (data.reviewStatus || "").trim(),
        projectStatus: (data.projectStatus || "").trim(),
        region: (data.region || "").trim(),
        province: (data.province || "").trim(),
        district: (data.district || "").trim(),
        subdistrict: (data.subdistrict || "").trim(),
        projectLink: (data.projectLink || "").trim(),
        projectLink2: (data.projectLink2 || "").trim(),
        location: markerLoc,
        geometry: geometry,
        lastUpdated: new Date().toISOString(),
        id: this.editingEiaId || undefined,
      };

      try {
        if (!this.currentUserId) {
          alert("ยังไม่ได้เข้าสู่ระบบ");
          return;
        }

        await saveEiaProject(this.currentUserId, payload);

        // Clear form and drawing
        this.clearEiaForm();
        this.clearDrawing();
        alert("บันทึกเรียบร้อย");
      } catch (e) {
        console.error("saveEiaProject failed:", e);
        alert("บันทึกไม่สำเร็จ: " + (e?.message || e));
      }
    },

    async deleteEiaProjectData(projectId) {
      if (!confirm("ยืนยันการลบโครงการนี้?")) return;

      try {
        if (!this.currentUserId) {
          alert("ยังไม่ได้เข้าสู่ระบบ");
          return;
        }

        await deleteEiaProject(this.currentUserId, projectId);

        // Clear form
        this.clearEiaForm();
        alert("ลบเรียบร้อย");
      } catch (e) {
        console.error("deleteEiaProject failed:", e);
        alert("ลบไม่สำเร็จ: " + (e?.message || e));
      }
    },

    renderEiaProjectsOnMap() {
      if (!this.map) return;

      // แสดงเฉพาะในโหมด EIA
      if (this.currentMode !== 'eia') {
        // ล้าง overlay ถ้าอยู่ใน mode อื่น
        this.eiaOverlays.forEach(overlay => {
          try { this.map.Overlays.remove(overlay); } catch (e) { }
        });
        this.eiaOverlays = [];
        return;
      }

      // Remove old overlays
      this.eiaOverlays.forEach(overlay => {
        try { this.map.Overlays.remove(overlay); } catch (e) { }
      });
      this.eiaOverlays = [];

      // ถ้าเคยกด filter แล้ว ใช้ filteredEiaProjects (แม้จะว่างก็แสดงตามนั้น)
      // ถ้ายังไม่เคยกด filter ให้แสดงทั้งหมดจาก savedEiaProjects
      const projects = this.hasAppliedEiaFilters ? this.filteredEiaProjects : this.savedEiaProjects;

      // Render new overlays
      projects.forEach((project, idx) => {
        if (!project.geometry || project.geometry.type !== 'Polygon') {
          console.warn(`    ⚠️ Skipping project ${idx + 1} - no valid geometry`);
          return;
        }

        const coords = project.geometry.coordinates.map(c => ({ lon: c[0], lat: c[1] }));
        // --- Calculate centroid for marker ---
        let markerLoc = null;
        try {
          const pts = coords;
          if (pts.length >= 3) {
            let area = 0, cx = 0, cy = 0;
            for (let i = 0; i < pts.length; i++) {
              const a = pts[i], b = pts[(i + 1) % pts.length];
              const f = (a.lon * b.lat - b.lon * a.lat);
              area += f;
              cx += (a.lon + b.lon) * f;
              cy += (a.lat + b.lat) * f;
            }
            area *= 0.5;
            markerLoc = area ? { lon: cx / (6 * area), lat: cy / (6 * area) } : pts[0];
          }
        } catch (e) {
          console.warn('    ⚠️ Centroid calculation failed, using first point');
          markerLoc = coords[0];
        }

        // Fallback to saved location
        if (!markerLoc && project.location) {
          markerLoc = project.location;
        }

        // --- Create marker at centroid ---
        if (markerLoc) {
          const marker = new window.longdo.Marker(markerLoc, {
            visibleRange: { min: 7, max: 20 },
            icon: {
              url: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path d='M12 2C7.58 2 4 5.58 4 10c0 5.25 5.4 10.58 7.2 12.19a1.2 1.2 0 0 0 1.6 0C14.6 20.58 20 15.25 20 10c0-4.42-3.58-8-8-8z' fill='rgba(${this.eiaColorRgb},0.9)' stroke='${this.eiaColorUrlEncoded}' stroke-width='1.5'/><circle cx='12' cy='10' r='3' fill='white'/></svg>`,
              size: { width: 28, height: 28 },
              offset: { x: 14, y: 28 }
            },
            detail: this.makeEiaMarkerDetailHtml(project),
          });
          marker.__isEiaProject = true;
          marker.__eiaProject = project;

          this.map.Overlays.add(marker);
          this.eiaOverlays.push(marker);
        }

        // --- Create polygon ---
        const polygon = new window.longdo.Polygon(coords, {
          lineWidth: 2,
          lineColor: `rgba(${this.eiaColorRgb},0.9)`,
          fillColor: `rgba(${this.eiaColorRgb},0.25)`,
          title: project.projectName || 'EIA Project',
          weight: window.longdo.OverlayWeight.Top
        });

        // Add flags for identification
        polygon.__isEiaProject = true;
        polygon.__eiaProject = project;

        this.map.Overlays.add(polygon);
        this.eiaOverlays.push(polygon);
      });
    },

    onEiaProjectClick(project) {

      // Ensure app is in EIA mode and the left form is open,
      // then load project data into the form.
      try {
        this.currentMode = 'eia';
        this.isFormOpen = true;
      } catch (e) { /* ignore */ }

      // แสดงข้อมูลในช่องซ้าย (ฟอร์ม)
      this.editEiaProject(project);

      // แสดง info popup ด้วย
      this.selectedEiaForInfo = project;
      this.showEiaInfo = true;

      // Center map on project
      if (project.location) {
        this.map.location(project.location, true);
      }
    },

    closeEiaInfo() {
      this.showEiaInfo = false;
      this.selectedEiaForInfo = null;
    },

    addEiaMarkerAtLocation(location) {
      // ไม่เปิด popup แต่ใส่ข้อมูลลงฟอร์ม navbar
      this.selectedEiaProject = null;
      this.eiaProjectData = {
        projectName: '',
        projectLink: '',
        investment: '',
        tempLocation: location // เก็บตำแหน่งชั่วคราว
      };
      this.editingEiaId = null;

      // เปิดฟอร์มถ้าปิดอยู่
      this.isFormOpen = true;

      // Focus ไปที่ฟอร์ม
      setTimeout(() => {
        const input = document.querySelector('.form-section input[type="text"]');
        if (input) input.focus();
      }, 100);
    },

    saveEiaProjectFromForm() {
      // บันทึกจากฟอร์มใน navbar
      if (!this.eiaProjectData.projectName?.trim() && !this.eiaProjectData.projectLink?.trim()) {
        alert("กรุณากรอก Project Name หรือ Link อย่างน้อย 1 ช่อง");
        return;
      }

      // ต้องมี geometry จากการวาด หรือจากข้อมูลเดิม (กรณีแก้ไข)
      const geometry = this.eiaProjectData.geometry ||
        (this.selectedEiaProject && this.selectedEiaProject.geometry);

      if (!geometry) {
        alert("กรุณาวาดพื้นที่บนแผนที่ก่อนบันทึก");
        return;
      }

      // ถ้าไม่มี tempLocation (กรณีแก้ไข) ให้ใช้ของเดิม
      let markerLoc = this.eiaProjectData.tempLocation;
      if (!markerLoc && this.selectedEiaProject) {
        markerLoc = this.selectedEiaProject.location;
      }
      if (!markerLoc && geometry && geometry.coordinates && geometry.coordinates.length > 0) {
        // ใช้จุดแรกของ polygon เป็น location
        markerLoc = { lon: geometry.coordinates[0][0], lat: geometry.coordinates[0][1] };
      }
      if (!markerLoc) {
        alert("ไม่พบตำแหน่งโครงการ");
        return;
      }

      this.saveEiaProjectData({
        projectStartDate: this.eiaProjectData.projectStartDate,
        ownerNameTo: this.eiaProjectData.ownerNameTo,
        projectName: this.eiaProjectData.projectName,
        investment: this.eiaProjectData.investment,
        projectValue: this.eiaProjectData.projectValue,
        projectImage: this.eiaProjectData.projectImage,
        projectImageName: this.eiaProjectData.projectImageName,
        landSizeRai: this.eiaProjectData.landSizeRai,
        landSizeNgan: this.eiaProjectData.landSizeNgan,
        landSizeWah: this.eiaProjectData.landSizeWah,
        usableArea: this.eiaProjectData.usableArea,
        reportNumber: this.eiaProjectData.reportNumber,
        engineerNumber: this.eiaProjectData.engineerNumber,
        approvalDate: this.eiaProjectData.approvalDate,
        approvalNumber: this.eiaProjectData.approvalNumber,
        projectType: this.eiaProjectData.projectType,
        projectSubType: this.eiaProjectData.projectSubType,
        reviewStatus: this.eiaProjectData.reviewStatus,
        projectStatus: this.eiaProjectData.projectStatus,
        region: this.eiaProjectData.region,
        province: this.eiaProjectData.province,
        district: this.eiaProjectData.district,
        subdistrict: this.eiaProjectData.subdistrict,
        projectLink: this.eiaProjectData.projectLink,
        projectLink2: this.eiaProjectData.projectLink2,
        tempLocation: markerLoc,
        geometry: geometry
      });
    },

    editEiaProject(project) {
      this.selectedEiaProject = project;
      this.eiaProjectData = {
        projectStartDate: project.projectStartDate || '',
        ownerNameTo: project.ownerNameTo || '',
        projectName: project.projectName || '',
        investment: project.investment || '',
        projectValue: project.projectValue || '',
        projectImage: project.projectImage || '',
        projectImageName: project.projectImageName || '',
        landSizeRai: project.landSizeRai || '',
        landSizeNgan: project.landSizeNgan || '',
        landSizeWah: project.landSizeWah || '',
        usableArea: project.usableArea || '',
        reportNumber: project.reportNumber || '',
        engineerNumber: project.engineerNumber || '',
        approvalDate: project.approvalDate || '',
        approvalNumber: project.approvalNumber || '',
        projectType: project.projectType || '',
        projectSubType: project.projectSubType || '',
        reviewStatus: project.reviewStatus || '',
        projectStatus: project.projectStatus || '',
        region: project.region || '',
        province: project.province || '',
        district: project.district || '',
        subdistrict: project.subdistrict || '',
        projectLink: project.projectLink || '',
        projectLink2: project.projectLink2 || '',
        lastUpdated: project.lastUpdated || null,
        tempLocation: project.location,
        geometry: project.geometry
      };
      this.editingEiaId = project.id;

      // เปิดฟอร์ม
      this.isFormOpen = true;

      // Center map on project
      if (project.location && this.map) {
        this.map.location({ lon: project.location.lon, lat: project.location.lat }, true);
      }
    },

    editEiaProjectFromCard(project) {
      // เรียกจาก card popup
      this.closeEiaInfo();
      this.editEiaProject(project);
    },

    clearEiaForm() {
      this.selectedEiaProject = null;
      this.eiaProjectData = {
        projectStartDate: '',
        ownerNameTo: '',
        projectName: '',
        investment: '',
        projectValue: '',
        projectImage: '',
        projectImageName: '',
        landSizeRai: '',
        landSizeNgan: '',
        landSizeWah: '',
        usableArea: '',
        reportNumber: '',
        engineerNumber: '',
        approvalDate: '',
        approvalNumber: '',
        projectType: '',
        projectSubType: '',
        reviewStatus: '',
        projectStatus: '',
        region: '',
        province: '',
        district: '',
        subdistrict: '',
        projectLink: '',
        projectLink2: '',
        lastUpdated: null,
      };
      this.editingEiaId = null;
    },

    applyFilters() {
      this.showFilters = false;
      this.hasAppliedFilters = true; // บันทึกว่าได้กด filter แล้ว
      const {
        roadWidth, areaMin, areaMax, areaMinRai, areaMaxRai, priceMin, totalPriceMin, totalPriceMax, priceMax, frontMin, frontMax,
      } = this.filters;

      // แปลงค่าว่าง -> null / ตัวเลข
      const parseNum = (v) =>
        (v === "" || v == null ? null : Number(String(v).replace(/,/g, "")));

      // map ค่า roadWidth จาก dropdown -> ช่วงตัวเลข
      const roadMinMax = (rw) => {
        if (!rw) return [null, null];
        if (rw === "lt6") return [null, 6];
        if (rw === "6-9.99") return [6, 9.99];
        if (rw === "ge10") return [10, null];
        if (rw === "ge18") return [18, null];
        if (rw === "ge30") return [30, null];
        return [null, null];
      };

      const toSqw = (sqw, rai) => {
        const s = parseNum(sqw);
        const r = parseNum(rai);
        return (s == null && r == null) ? null : (s || 0) + (r || 0) * 400;
      };

      const [rwMin, rwMax] = roadMinMax(roadWidth);
      const aMin = toSqw(areaMin, areaMinRai);
      const aMax = toSqw(areaMax, areaMaxRai);
      const pMin = parseNum(priceMin),
        pMax = parseNum(priceMax);
      const tpMin = parseNum(totalPriceMin),
        tpMax = parseNum(totalPriceMax);
      const fMin = parseNum(frontMin),
        fMax = parseNum(frontMax);

      const getArea = (it) =>
        it.area != null ? +it.area : it.size ? +it.size : 0;
      const getPriceSqw = (it) =>
        it.pricePerSqw != null ? +it.pricePerSqw : it.price ? +it.price : 0;
      const getTotalPrice = (it) => it.totalPrice ?? (getArea(it) * getPriceSqw(it));
      const getFrontage = (it) =>
        it.frontage != null ? +it.frontage : it.width ? +it.width : 0;
      const getRoadWidth = (it) =>
        it.roadWidth != null ? +it.roadWidth : it.road ? +it.road : null;

      if (Array.isArray(this.savedLands)) {
        this.filteredLands = this.savedLands.filter((item) => {
          const area = getArea(item);
          const priceSqw = getPriceSqw(item);
          const total = +getTotalPrice(item);
          const frontage = getFrontage(item);
          const rwidth = getRoadWidth(item);

          const inArea =
            (aMin == null || area >= aMin) && (aMax == null || area <= aMax);
          const inPrice =
            (pMin == null || priceSqw >= pMin) &&
            (pMax == null || priceSqw <= pMax);
          const inTotal = (tpMin == null || total >= tpMin) && (tpMax == null || total <= tpMax);

          const inFront =
            (fMin == null || frontage >= fMin) &&
            (fMax == null || frontage <= fMax);
          const inRoad =
            (rwMin == null || (rwidth != null && rwidth >= rwMin)) &&
            (rwMax == null || (rwidth != null && rwidth <= rwMax));

          return inArea && inPrice && inTotal && inFront && inRoad;
        });
      } else {
        this.filteredLands = [];
      }

      this.addMarkersToMap(); // รีเรนเดอร์หมุดตามเงื่อนไขใหม่
      this.renderLandsOnMap();
      this.applyKmlFiltersUsingUI();
    },

    applyEiaFilters() {
      this.hasAppliedEiaFilters = true; // บันทึกว่าได้กด filter แล้ว
      this.renderEiaProjectsOnMap();
    },

    applyKmlFiltersUsingUI() {
      if (!this.map || !Array.isArray(this.kmlFeatures) || !this.kmlFeatures.length) return;

      // อ่านค่าตัวกรองแบบเดียวกับใน applyFilters()
      const toNum = (v) => (v === "" || v == null ? null : Number(String(v).replace(/,/g, "")));

      const toSqw = (sqw, rai) => {
        const s = toNum(sqw);
        const r = toNum(rai);
        return (s == null && r == null) ? null : (s || 0) + (r || 0) * 400;
      };
      const aMin = toSqw(this.filters.areaMin, this.filters.areaMinRai);
      const aMax = toSqw(this.filters.areaMax, this.filters.areaMaxRai);
      const pMin = toNum(this.filters.priceMin);
      const pMax = toNum(this.filters.priceMax);
      const tpMin = toNum(this.filters.totalPriceMin);
      const tpMax = toNum(this.filters.totalPriceMax);
      const fMin = toNum(this.filters.frontMin);
      const fMax = toNum(this.filters.frontMax);

      const roadSel = (this.filters.roadWidth || this.filters.landType || "").trim();
      const roadRange = (sel) => {
        switch (sel) {
          case "lt6": return [null, 6];
          case "6-9.99": return [6, 9.99];
          case "10-11.99": return [10, 11.99];
          case "12-17.99": return [12, 17.99];
          case "18-29.99": return [18, 29.99];
          case "ge30": return [30, null];
          default: return [null, null];
        }
      };
      const [rwMin, rwMax] = roadRange(roadSel);

      // ช่วยเช็คช่วง
      const inRange = (val, min, max) =>
        (min == null || (val != null && val >= min)) &&
        (max == null || (val != null && val <= max));

      // loop ทุก overlay ที่มาจาก KML
      this.kmlFeatures.forEach(({ overlay, props }) => {
        const total =
          props?.totalPrice != null
            ? Number(props.totalPrice)
            : (props?.area != null && props?.pricePerSqw != null
              ? Number(props.area) * Number(props.pricePerSqw)
              : null);
        const ok =
          inRange(props?.area, aMin, aMax) &&
          inRange(props?.pricePerSqw, pMin, pMax) &&
          inRange(total, tpMin, tpMax) &&
          inRange(props?.frontage, fMin, fMax) &&
          inRange(props?.roadWidth, rwMin, rwMax);

        // toggle แสดง/ซ่อน โดยไม่ทิ้งออบเจ็กต์
        try {
          if (ok) {
            // ถ้าเคยถูกลบออก ให้ add กลับ
            if (!overlay._onMap) {
              this.map.Overlays.add(overlay);
              overlay._onMap = true;
            }
          } else {

            this.map.Overlays.remove(overlay);
            overlay._onMap = false;
          }
        } catch (e) {
          // เงียบไว้
        }
      });
    },


    resetFilters() {
      this.filters = {
        landType: "", priceMin: "", priceMax: "",
        areaMin: "", areaMax: "", totalPriceMin: "", totalPriceMax: "", roadWidth: "",
        frontMin: "", frontMax: "",
      };
      this.filteredLands = [];
      this.hasAppliedFilters = false; // รีเซ็ต flag
      this.addMarkersToMap();
      this.renderLandsOnMap();
    },

    resetEiaFilters() {
      this.eiaFilters = {
        projectValueMin: '',
        projectValueMax: '',
        landSizeRaiMin: '',
        landSizeRaiMax: '',
        usableAreaMin: '',
        usableAreaMax: '',
        region: '',
        province: '',
        projectStatus: '',
      };
      this.hasAppliedEiaFilters = false; // รีเซ็ต flag
      this.renderEiaProjectsOnMap();
    },

    startDragEiaFilter(event) {
      // เฉพาะคลิกที่ปุ่มปิดเท่านั้น
      if (event.target.classList.contains('close-btn') ||
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'SELECT' ||
        event.target.tagName === 'BUTTON') {
        return;
      }

      this.isDraggingEiaFilter = true;
      this.dragStartX = event.clientX - this.eiaFilterPanelX;
      this.dragStartY = event.clientY - this.eiaFilterPanelY;

      document.addEventListener('mousemove', this.dragEiaFilter);
      document.addEventListener('mouseup', this.stopDragEiaFilter);
      event.preventDefault();
    },

    dragEiaFilter(event) {
      if (!this.isDraggingEiaFilter) return;

      this.eiaFilterPanelX = event.clientX - this.dragStartX;
      this.eiaFilterPanelY = event.clientY - this.dragStartY;

      // จำกัดไม่ให้ panel ออกนอกหน้าจอ
      if (this.eiaFilterPanelX < 0) this.eiaFilterPanelX = 0;
      if (this.eiaFilterPanelY < 0) this.eiaFilterPanelY = 0;
      if (this.eiaFilterPanelX > window.innerWidth - 100) {
        this.eiaFilterPanelX = window.innerWidth - 100;
      }
      if (this.eiaFilterPanelY > window.innerHeight - 50) {
        this.eiaFilterPanelY = window.innerHeight - 50;
      }
    },

    stopDragEiaFilter() {
      this.isDraggingEiaFilter = false;
      document.removeEventListener('mousemove', this.dragEiaFilter);
      document.removeEventListener('mouseup', this.stopDragEiaFilter);
    },

    getClickLocation(ev) {
      // กรณีส่ง lon/lat มาโดยตรง
      if (ev && typeof ev.lon === 'number' && typeof ev.lat === 'number') {
        return { lon: ev.lon, lat: ev.lat };
      }
      // กรณีส่งเป็นพิกเซล (x,y) ให้แปลงเป็นพิกัด
      if (ev && typeof ev.x === 'number' && typeof ev.y === 'number' && this.map?.location) {
        try {
          const loc = this.map.location(ev);
          if (loc && typeof loc.lon === 'number' && typeof loc.lat === 'number') return loc;
        } catch (e) { console.debug('getClickLocation: map.location(point) failed', e); }
      }
      // fallback: ใช้ pointer mode
      try {
        const loc = this.map.location(window.longdo?.LocationMode?.Pointer);
        if (loc && typeof loc.lon === 'number' && typeof loc.lat === 'number') return loc;
      } catch (e) { console.debug('getClickLocation: Pointer mode failed', e); }
      return null;
    },


    async saveLandData() {
      if (!(this.landData.owner?.trim() || this.landData.agent?.trim())) {
        alert("กรุณากรอกชื่อเจ้าของ หรือ ชื่อนายหน้า อย่างใดอย่างหนึ่ง");
        return;
      }
      const inputHasRNW =
        (this.raiModel != null && String(this.raiModel).trim() !== '') ||
        (this.nganModel != null && String(this.nganModel).trim() !== '') ||
        (this.wahModel != null && String(this.wahModel).trim() !== '');

      let sizeSqw = this.unformatDecimal(this.landData.size);
      if (inputHasRNW) {
        sizeSqw = this.sizeFromRaiNganWah(this.raiModel, this.nganModel, this.wahModel);
      }


      const geometry = this.drawPoints.length >= 3
        ? { type: "Polygon", coordinates: this.drawPoints.map(p => [p.lon, p.lat]) }
        : null;

      const markerLoc = geometry
        ? { lon: this.drawPoints[0].lon, lat: this.drawPoints[0].lat }
        : { lon: this.currentLocation.lon, lat: this.currentLocation.lat };

      const payload = {
        size: sizeSqw,
        frontage: this.unformatDecimal(this.landData.width),
        roadWidth: this.unformatDecimal(this.landData.road),
        pricePerSqw: this.unformatDecimal(this.landData.price),
        totalPrice: this.unformatDecimal(this.landData.totalPrice),
        landFrame: (this.landData.landFrame || "").trim(),
        deedInformation: (this.landData.deedInformation || "").trim(),
        owner: (this.landData.owner || "").trim(),
        agent: (this.landData.agent || "").trim(),
        phone: (this.landData.phone || "").trim(),
        lineId: (this.landData.lineId || "").trim(),
        location: markerLoc,
        geometry,
        images: this.landData.images || [],

        id: this.editingLandId || undefined,
      };



      try {
        if (!this.currentUserId) { alert("ยังไม่ได้เข้าสู่ระบบ (เปิด anonymous ได้)"); return; }


        await saveLand(this.currentUserId, payload);
        this.landData = {
          size: "",
          width: "",
          owner: "",
          agent: "",
          phone: "",
          lineId: "",
          price: "",
          totalPrice: "",
          road: "",
          landFrame: "",
          deedInformation: "",
          images: [],
        };
        this.editingLandId = null;
        this.clearDrawing();
        alert("บันทึกเรียบร้อย");
      } catch (e) {
        console.error("saveLand failed:", e);
        alert("บันทึกไม่สำเร็จ: " + (e?.message || e));
      }
    },

    toggleSearch() {
      this.showSearch = !this.showSearch;
      this.showFilters = false;
      this.showLayers = false;
      this.showChat = false;
    },

    toggleChat() {
      this.showChat = !this.showChat;
      this.showFilters = false;
      this.showLayers = false;
      this.showSearch = false;

      // When opening the chat, reset any inline positioning left by drag
      // so it reappears at the default bottom-right location.
      if (this.showChat) {
        this.$nextTick(() => {
          try {
            const el = document.querySelector('.chat-popup');
            if (el) {
              el.style.position = 'fixed';
              el.style.left = '';
              el.style.top = '';
              el.style.right = '10px';
              el.style.bottom = '10px';
              el.style.zIndex = '9999';
            }
          } catch (e) {
            console.debug && console.debug('reset chat popup position failed', e);
          }
          // re-enable draggables and scroll to bottom
          try { this.enableDraggables(); } catch (_) { }
          this.$nextTick(() => this.scrollToBottom());
        });
      }
    },

    toggleFilters() {
      this.showFilters = !this.showFilters;
      this.showSearch = false;
      this.showLayers = false;
      this.showChat = false;
      // เรียก enableDraggables หลัง DOM render เพื่อให้ลากได้
      if (this.showFilters) {
        this.$nextTick(() => {
          this.enableDraggables();
        });
      }
    },

    toggleLayers() {
      this.showLayers = !this.showLayers;
      this.showSearch = false;
      this.showFilters = false;
      this.showChat = false;
    },

    viewMyProperty() {
      // Show only user's markers
      this.showSearch = false;
      this.showFilters = false;
      this.showLayers = true;
    },

    exploreArea() {
    },

    centerTo(lon, lat, zoom = 17) {
      if (!this.map) return;

      try {
        this.map.location({ lon, lat, includePolygon: false });
        if (typeof this.map.zoom === "function") this.map.zoom(zoom);
      } catch (e) {
        console.debug("[SEARCH] centerTo error:", e);
      }

      /* try {
        if (this.myMarker) this.map.Overlays.remove(this.myMarker);
        this.myMarker = new window.longdo.Marker({ lon, lat });
        this.map.Overlays.add(this.myMarker);
      } catch (e) {
        console.debug("[SEARCH] marker add failed:", e);
      } */
    },

    locateByGPS() {
      if (!("geolocation" in navigator)) {
        alert("เบราเซอร์นี้ไม่รองรับการระบุตำแหน่ง (Geolocation)");
        return;
      }
      this.locating = true;
      this.geolocError = null;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          this.currentLocation = { lat: latitude, lon: longitude };
          this.centerTo(longitude, latitude, 18); // NOTE: centerTo(lon, lat)
          this.showSearch = false;
          this.locating = false;
        },
        (err) => {
          this.locating = false;
          this.geolocError = err?.message || "ขอสิทธิ์ตำแหน่งไม่สำเร็จ";
          alert("ไม่สามารถระบุตำแหน่งได้: " + this.geolocError);
        },
        { enableHighAccuracy: true, maximumAge: 20000, timeout: 10000 }
      );
    },

    async ensureLongdoServices() {
      if (window.longdo?.Services?.search) return true;

      // เผื่อ services กำลังโหลด (จาก main.js) รอสั้น ๆ ก่อน
      for (let i = 0; i < 15; i++) {
        if (window.longdo?.Services?.search) return true;
        await new Promise((r) => setTimeout(r, 200));
      }

      // ยังไม่มา → inject script ด้วย URL ที่ถูกต้อง
      const urls = [
        "https://api.longdo.com/services",
        "https://api.longdo.com/services/",
      ];

      for (const src of urls) {
        try {
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = src;
            s.async = true;
            s.onload = resolve;
            s.onerror = () => reject(new Error("services load failed: " + src));
            document.head.appendChild(s);
          });
          if (window.longdo?.Services?.search) return true;
        } catch (e) {
          console.debug("[SEARCH] inject services failed:", src, e);
        }
      }

      return !!window.longdo?.Services?.search;
    },

    async searchPlaceLongdo(q) {
      // 1) พยายามใช้ Services ก่อน
      if (await this.ensureLongdoServices()) {
        return new Promise((resolve) => {
          try {
            window.longdo.Services.search(
              { keyword: q, limit: 5, language: "th" },
              (results) => {
                if (Array.isArray(results) && results.length > 0) {
                  const best = results[0];
                  if (best?.lon != null && best?.lat != null) {
                    this.centerTo(best.lon, best.lat, 17);
                    this.showSearch = false;
                    resolve(true);
                    return;
                  }
                }
                alert("ไม่พบผลลัพธ์จาก Longdo สำหรับ: " + q);
                resolve(false);
              },
              (err) => {
                console.debug("[SEARCH] Services.search error:", err);
                resolve(false); // ให้ไป REST ต่อ
              }
            );
          } catch (e) {
            console.debug("[SEARCH] Services.search exception:", e);
            // ไป REST ต่อ
          }
        });
      }

      // 2) Fallback → REST (ใช้ key เดียวจาก main.js)
      try {
        const KEY = window.__LONGDO_KEY; // ✅ แชร์ key เดียวจาก main.js
        const url =
          `https://search.longdo.com/mapsearch/json/search` +
          `?keyword=${encodeURIComponent(q)}` +
          `&key=${encodeURIComponent(KEY)}` +
          `&limit=5&language=th`;

        const r = await fetch(url);
        const text = await r.text(); // กันกรณีปลายทางตอบ error HTML
        const data = JSON.parse(text); // ถ้าไม่ใช่ JSON จะ throw ไป catch
        const items = Array.isArray(data?.data) ? data.data : [];
        if (items.length && items[0]?.lon != null && items[0]?.lat != null) {
          this.centerTo(items[0].lon, items[0].lat, 17);
          this.showSearch = false;
          return true;
        }
        alert("ไม่พบผลลัพธ์จาก Longdo สำหรับ: " + q);
        return false;
      } catch (e) {
        console.debug("[SEARCH] REST search error:", e);
        alert("ค้นหาไม่สำเร็จ (REST)");
        return false;
      }
    },

    performSearch() {
      const q = (this.searchQuery || "").trim();

      // 1) ช่องว่าง → ใช้ GPS
      if (!q) {
        this.locateByGPS();
        return;
      }

      // 2) รองรับใส่พิกัด "lat, lon"
      const m = q.match(
        /^\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*$/
      );
      if (m) {
        const lat = parseFloat(m[1]);
        const lon = parseFloat(m[2]);
        if (
          isFinite(lat) &&
          isFinite(lon) &&
          Math.abs(lat) <= 90 &&
          Math.abs(lon) <= 180
        ) {
          this.centerTo(lon, lat, 18);
          this.showSearch = false;
          return;
        }
      }

      // 3) ชื่อสถานที่ → ใช้ Longdo (Services → REST)
      this.searchPlaceLongdo(q);
    },

    // --- Snapping helpers ---
    updateSnapPoints() {
      const pts = [];
      // collect all vertices from saved lands
      (this.savedLands || []).forEach((land) => {
        if (land?.geometry?.type === "Polygon" && Array.isArray(land.geometry.coordinates)) {
          land.geometry.coordinates.forEach(([lon, lat]) => pts.push({ lon, lat }));
        }
      });
      // include current drawing points
      if (Array.isArray(this.drawPoints)) pts.push(...this.drawPoints);
      this.snapPoints = pts;
    },
    getSnappedPoint(p) {
      if (!this.snapEnabled || !Array.isArray(this.snapPoints) || !this.snapPoints.length) return p;
      // tolerance in meters depends on zoom
      const zoom = (typeof this.map?.zoom === "function") ? this.map.zoom() : 16;
      const tol = zoom >= 18 ? 8 : zoom >= 16 ? 15 : 30;
      const dist = window.longdo?.Util?.distance;
      if (!dist) return p;
      let best = null, bestD = Infinity;
      for (const q of this.snapPoints) {
        const d = dist([p, q]);
        if (d < bestD) { bestD = d; best = q; }
      }
      return (best && bestD <= tol) ? best : p;
    },

    // --- Select a land and populate the form for editing
    selectLand(land) {
      if (!land) return;
      this.editingLandId = land.id || null;

      // Map model -> form model
      this.landData = {
        size: land.size ?? land.area ?? "",
        width: land.frontage ?? land.width ?? "",
        road: land.roadWidth ?? land.road ?? "",
        price: land.pricePerSqw != null ? this.formatMoney(land.pricePerSqw) : "",
        totalPrice: land.totalPrice ?? "",
        landFrame: land.landFrame ?? "",
        deedInformation: land.deedInformation ?? "",
        owner: land.owner ?? "",
        agent: land.agent ?? "",
        phone: land.phone ?? "",
        lineId: land.lineId ?? "",
        images: land.images || [],
      };

      // แตก size (ตร.วา) เป็น RNW ให้ช่องด้านขวา
      const { rai, ngan, wah } = this.rnwFromSize(this.landData.size);
      this.raiModel = (rai === "" ? "" : String(rai));
      this.nganModel = (ngan === "" ? "" : String(ngan));
      this.wahModel = (wah === "" ? "" : (this.fmt2 ? this.fmt2(wah) : wah.toFixed(2)));

      // Draw selected geometry for visual
      try {
        if (land.geometry?.type === "Polygon" && Array.isArray(land.geometry.coordinates)) {
          const pts = land.geometry.coordinates.map(([lon, lat]) => ({ lon, lat }));
          this.clearDrawing();
          this.drawPoints = pts;
          if (this.drawPoints.length >= 3) {
            try { if (this.drawPolyline) this.map.Overlays.remove(this.drawPolyline); } catch (e) { }
            try { if (this.drawPolygon) this.map.Overlays.remove(this.drawPolygon); } catch (e) { }
            this.drawPolygon = new window.longdo.Polygon(this.drawPoints, {
              lineWidth: 2, lineColor: "rgba(30,144,255,0.9)", fillColor: "rgba(30,144,255,0.25)",
            });
            this.map.Overlays.add(this.drawPolygon);
          }
        }
      } catch (e) { console.debug("selectLand draw error", e); }
    },

    onLandOverlayClick(land) {
      // Auto-open left-side sale form and select the land so fields populate
      try {
        try { this.currentMode = 'sale'; } catch (_) { }
        try { this.isFormOpen = true; } catch (_) { }
      } catch (e) { /* ignore */ }
      // Preserve existing behavior (select + draw), then show marker-style info
      this.selectLand(land);
      try {
        this.selectedMarker = land;
        this.showMarkerInfo = true;
      } catch (e) {
        console.debug('onLandOverlayClick: show marker info failed', e);
      }
    },
    // ===== Flood Zone helpers =====
    startFloodDrawing(level = 'medium') {
      this.floodMode = true;
      this.floodLevel = level;
      this.floodPoints = [];
      this.redrawFloodDrawing();
      try { document.getElementById('map').style.cursor = 'default'; } catch (e) { }
    },

    async finishFloodDrawing() {
      if (!this.map) return;
      if (this.floodPoints.length < 3) { alert("ต้องคลิกอย่างน้อย 3 จุด"); return; }

      // ลบชั่วคราว
      try { if (this.floodPolyline) this.map.Overlays.remove(this.floodPolyline); } catch (e) { }
      try { if (this.floodPolygon) this.map.Overlays.remove(this.floodPolygon); } catch (e) { }

      // เตรียม payload
      const geometry = { type: "Polygon", coordinates: this.floodPoints.map(p => [p.lon, p.lat]) };
      const center = this.floodPoints[0] || this.currentLocation; // optional

      if (!this.currentUserId) { alert("ยังไม่ได้เข้าสู่ระบบ"); return; }

      try {
        await saveFloodZone(this.currentUserId, {
          level: this.floodLevel,
          waterAmount: this.waterAmount,
          geometry,
          location: center,
        });

        // ปล่อยให้ subscribeFloodZonesAll → renderFloodsOnMap() เป็นคนวาด (จะไม่ซ้ำ)
      } catch (e) {
        console.error("saveFloodZone failed:", e);
        alert("บันทึกน้ำท่วมไม่สำเร็จ");
      }

      // reset state การวาด
      this.floodMode = false;
      this.floodPoints = [];
      this.floodPolyline = null;
      this.floodPolygon = null;
      try { document.getElementById('map').style.cursor = 'default'; } catch (e) { }
    },


    clearFloodDrawing() {
      this.floodMode = false;
      this.floodPoints = [];
      try { if (this.floodPolyline) this.map.Overlays.remove(this.floodPolyline); } catch (e) { }
      try { if (this.floodPolygon) this.map.Overlays.remove(this.floodPolygon); } catch (e) { }
      this.floodPolyline = null;
      this.floodPolygon = null;
      try { document.getElementById('map').style.cursor = 'default'; } catch (e) { }
    },

    redrawFloodDrawing() {
      if (!this.map) return;

      try { if (this.floodPolyline) this.map.Overlays.remove(this.floodPolyline); } catch (e) { }
      try { if (this.floodPolygon) this.map.Overlays.remove(this.floodPolygon); } catch (e) { }

      if (this.floodPoints.length >= 2) {
        this.floodPolyline = new window.longdo.Polyline(this.floodPoints, {
          lineWidth: 3,
          lineColor: "rgba(0,90,255,0.5)", // ฟ้าอ่อนสำหรับระหว่างวาด
        });
        this.map.Overlays.add(this.floodPolyline);
      }
    },

    getFloodStyle(level) {
      // base color ต่อระดับ (โทนฟ้า)
      let line = 'rgba(0,90,255,0.95)';
      let baseFillAlpha = 0.22; // ค่าเริ่ม

      switch (String(level)) {
        case 'low':
          line = 'rgba(0,128,255,0.95)';
          baseFillAlpha = 0.16;
          break;
        case 'high':
          line = 'rgba(0,64,160,1)';
          baseFillAlpha = 0.30;
          break;
        case 'medium':
        default:
          line = 'rgba(0,90,255,0.95)';
          baseFillAlpha = 0.22;
          break;
      }

      // ปรับตาม waterAmount (1..5) ให้ทึบขึ้นทีละนิด
      const step = 0.06; // ความทึบเพิ่มต่อระดับ
      const alpha = Math.max(0.10, Math.min(0.65, baseFillAlpha + (this.waterAmount - 1) * step));
      const fill = `rgba(0,120,255,${alpha})`;

      return { lineColor: line, fillColor: fill };
    },


    toggleFloodLayer() {
      this.showFloodLayer = !this.showFloodLayer;
      if (!this.map) return;

      // ถ้าปิดเลเยอร์ ให้ล้างการเลือกด้วย
      if (!this.showFloodLayer) this.clearFloodSelection();

      this.floodOverlays.forEach(ov => {
        try {
          if (this.showFloodLayer && !ov._onMap) {
            this.map.Overlays.add(ov);
            ov._onMap = true;
          } else if (!this.showFloodLayer && ov._onMap) {
            this.map.Overlays.remove(ov);
            ov._onMap = false;
          }
        } catch (e) { }
      });
    },

    increaseWaterAmount() {
      if (this.waterAmount < 5) {
        this.waterAmount++;
        this.restyleAllFloodPolygons();
      }
    },
    decreaseWaterAmount() {
      if (this.waterAmount > 1) {
        this.waterAmount--;
        this.restyleAllFloodPolygons();
      }
    },

    restyleAllFloodPolygons() {
      if (!this.map) return;

      // เราจะสร้างโพลิกอนใหม่แทนตัวเดิม เพื่อให้สีอัปเดตได้แน่นอน
      this.floodOverlays = this.floodOverlays.map(oldOv => {
        const wasOnMap = !!oldOv._onMap;
        const oldMeta = oldOv.__flood || {};
        const points = oldOv.__points;
        const style = this.getFloodStyle(oldMeta.level || 'medium');

        try { if (wasOnMap) this.map.Overlays.remove(oldOv); } catch (e) { }

        const newOv = new window.longdo.Polygon(points, {
          lineWidth: 2,
          lineColor: style.lineColor,
          fillColor: style.fillColor
        });
        newOv.__isFlood = true;
        newOv.__points = points;
        newOv.__flood = {
          id: oldMeta.id || null,
          level: oldMeta.level || 'medium',
          ownerUid: oldMeta.ownerUid || null,
        };
        newOv._onMap = false;
        this.attachFloodEvents(newOv);

        if (this.showFloodLayer && wasOnMap) {
          this.map.Overlays.add(newOv);
          newOv._onMap = true;
        }
        return newOv;
      });

      // อัปเดตของที่กำลังวาดอยู่ (เส้นชั่วคราวใช้สีคงเดิมพอ)
      if (this.floodPolygon) {
        try { this.map.Overlays.remove(this.floodPolygon); } catch (e) { }
        const style = this.getFloodStyle(this.floodLevel);
        this.floodPolygon = new window.longdo.Polygon(this.floodPoints, {
          lineWidth: 2,
          lineColor: style.lineColor,
          fillColor: style.fillColor
        });
        this.map.Overlays.add(this.floodPolygon);
      }
    },
    attachFloodEvents(poly) {
      // ผูกคลิกกับโพลิกอนน้ำท่วมแต่ละชิ้น
      try {
        poly.Event.bind('click', () => {
          // ห้ามชนกับโหมดกำลังวาดแปลงหรือวาดน้ำท่วม
          if (this.drawMode || this.floodMode) return;
          this.selectFloodPolygon(poly);
        });
      } catch (e) { }
    },

    selectFloodPolygon(poly) {
      if (!this.map) return;

      // ล้างไฮไลท์เดิมก่อน
      this.clearFloodSelection();

      this.selectedFlood = poly;

      // สร้างเส้นไฮไลท์ทับ (เส้นเหลือง ไม่มีสีพื้น)
      const pts = poly.__points || [];
      try {
        this.selectedFloodHighlight = new window.longdo.Polygon(pts, {
          lineWidth: 4,
          lineColor: 'rgba(255,215,0,0.95)', // เหลืองทอง
          fillColor: 'rgba(255,215,0,0.01)',
          weight: window.longdo.OverlayWeight.Top
        });
        this.map.Overlays.add(this.selectedFloodHighlight);
      } catch (e) { }
    },
    clearFloodSelection() {
      if (!this.map) return;
      try {
        if (this.selectedFloodHighlight)
          this.map.Overlays.remove(this.selectedFloodHighlight);
      } catch (e) { }
      this.selectedFloodHighlight = null;
      this.selectedFlood = null;
    },

    async deleteSelectedFlood() {
      if (!this.map || !this.selectedFlood) return;

      const id = this.selectedFlood.__flood?.id;
      const ownerUid = this.selectedFlood.__flood?.ownerUid || this.currentUserId;

      if (!confirm("ยืนยันลบโซนน้ำท่วมนี้?")) return;

      try {
        if (id) {
          await deleteFloodZone(ownerUid, id);
          // หลังลบ สำเนาในหน้าจอจะถูก sync ออกโดย subscribe → renderFloodsOnMap()
        } else {
          // กรณียังไม่ถูกบันทึก (ไม่มี id) → ลบเฉพาะบนแผนที่
          if (this.selectedFlood._onMap) this.map.Overlays.remove(this.selectedFlood);
          this.floodOverlays = this.floodOverlays.filter(ov => ov !== this.selectedFlood);
        }
      } catch (e) {
        console.error("deleteFloodZone failed:", e);
        alert("ลบไม่สำเร็จ");
      }

      this.clearFloodSelection();
    },
    // ====== ตรวจสอบแปลงที่ดินอยู่ในเขตน้ำท่วมระดับใด ======
    async checkLandsFloodStatus() {
      const lands = (this.filteredLands?.length ? this.filteredLands : this.savedLands) || [];
      const floods = Array.isArray(this.savedFloods) ? this.savedFloods : [];

      const result = { low: 0, medium: 0, high: 0, none: 0 };
      if (!lands.length) { this.floodSummary = result; return; }

      // เตรียม polygon ของน้ำท่วม (ปิดห่วงถ้ายังไม่ปิด)
      const floodPolys = floods
        .filter(f => f?.geometry?.type === "Polygon" && Array.isArray(f.geometry.coordinates))
        .map(f => {
          let ring = f.geometry.coordinates.slice();
          if (ring.length >= 3) {
            const first = ring[0], last = ring[ring.length - 1];
            if (first[0] !== last[0] || first[1] !== last[1]) ring = [...ring, first]; // ปิดห่วง
            try {
              return { level: f.level || "medium", poly: turf.polygon([ring]) };
            } catch { return null; }
          }
          return null;
        })
        .filter(Boolean);

      const levelOrder = { low: 0, medium: 1, high: 2 };

      for (const land of lands) {
        // หาจุดแทนแปลง: centroid ของ polygon หรือ location
        let pt = null;
        try {
          if (land.geometry?.type === "Polygon" && Array.isArray(land.geometry.coordinates)) {
            const ring = land.geometry.coordinates;
            pt = turf.centroid(turf.polygon([ring]));
          } else if (land.location && typeof land.location.lon === "number" && typeof land.location.lat === "number") {
            pt = turf.point([land.location.lon, land.location.lat]);
          }
        } catch { /* ignore */ }
        if (!pt) { result.none++; continue; }

        // เช็คว่าอยู่ในโซนใด (ถ้าอยู่หลายโซนเอาที่ระดับสูงกว่า)
        let best = null;
        for (const f of floodPolys) {
          try {
            if (turf.booleanPointInPolygon(pt, f.poly)) {
              if (!best || levelOrder[f.level] > levelOrder[best]) best = f.level;
            }
          } catch { /* ignore */ }
        }
        if (!best) result.none++; else result[best]++;
      }

      this.floodSummary = result;
    },

    recomputeFloodSummary() {
      this.floodSummary = this._calcFloodSummary(this.lands || [], this._floodPolysCache || []);
    },
    _calcFloodSummary(lands, floodPolys) {
      const t = (window.turf || this.$turf);
      const order = { low: 0, medium: 1, high: 2 };
      const res = { low: 0, medium: 0, high: 0, none: 0 };

      lands.forEach(land => {
        let pt = null;
        if (land.geometry?.type === 'Polygon') pt = t.centroid(land.geometry);
        else if (land.location) pt = t.point([land.location.lon, land.location.lat]);
        if (!pt) return;

        let level = null;
        floodPolys.forEach(f => {
          if (t.booleanPointInPolygon(pt, f.poly)) {
            if (level == null || order[f.level] > order[level]) level = f.level;
          }
        });
        if (!level) res.none++; else res[level]++;
      });

      return res;
    }
  },
  watch: {
    availableLayers: {
      handler(newVal) {
        const markersLayer = newVal.find((l) => l.id === 1);
        if (markersLayer) {
          this.toggleMarkersLayer();
        }

      },
      deep: true,
    },

    'landData.size'() { this.syncFromSize(); if (this.landData.price) this.syncPriceFromPerSqw(); },
    raiModel() { this.onRNWInput(); },
    nganModel() { this.onRNWInput(); },
    wahModel() { this.onRNWInput(); },

    'landData.owner'(val) {
      if (val && val.trim() !== '') this.landData.agent = '';
    },
    'landData.agent'(val) {
      if (val && val.trim() !== '') this.landData.owner = '';
    },

    // Reset district and subdistrict when province changes
    'eiaProjectData.province'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.eiaProjectData.district = '';
        this.eiaProjectData.subdistrict = '';
      }
    },

    // Reset subdistrict when district changes
    'eiaProjectData.district'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.eiaProjectData.subdistrict = '';
      }
    },

    // ล็อก scroll ตอน popup เปิด
    showDisclaimer(val) {
      document.body.style.overflow = val ? "hidden" : "";
    },
    savedLands: {
      handler() { this.checkLandsFloodStatus(); },
      deep: true
    },
    filteredLands: {
      handler() { this.checkLandsFloodStatus(); },
      deep: true
    },
    savedFloods: {
      handler() { this.checkLandsFloodStatus(); },
      deep: true
    },
  },


};
/* eslint-enable no-empty */
