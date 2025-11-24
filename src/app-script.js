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
  saveLand,
  deleteLand,
  subscribeLandsAll,
  saveFloodZone,
  deleteFloodZone,
  subscribeFloodZonesAll,
} from "./firebase";

import LoginBar from "./components/LoginBar.vue";
import * as turf from "@turf/turf";
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


      currentMode: null,
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
      },

      savedLands: [],
      filteredLands: [],

      currentLocation: {
        lat: 13.7563,
        lon: 100.5234,
      },
      currentZoom: 12,
      showSearch: false,
      showFilters: false,
      showLayers: false,
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
      tempUserName: "",
      hasNewMessage: false,
      unreadCount: 0,
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
      kmlState: null,        // ผลลัพธ์จาก kmlToLongdoMap (overlays, bound)
      kmlOverlays: [],       // สำรองไว้กรณีต้องจัดการเองเป็นรายชิ้น
      kmlFeatures: [],
      bkkRect: null,
      kmlOpacity: 0.6,   // 0–1

    };
  },

  async mounted() {
    this.initMap();
    this.authUnsubscribe = onAuthChanged((u) => {
      // ออกจากระบบ → เคลียร์ state/ยกเลิก subscribe เดิมทั้งหมด
      if (!u) {
        this.resetP2PState();
        this.currentUserId = null;
        this.userProfile = { name: "", joinedAt: null };
        return;
      }
      const ack = localStorage.getItem("ackDisclaimer");
      if (ack === "yes") this.showDisclaimer = false;

      // เปลี่ยนบัญชี → รีเซ็ตก่อน
      const switched = this.currentUserId && this.currentUserId !== u.uid;
      if (switched) this.resetP2PState();

      this.currentUserId = u.uid;

      // เติมชื่อจากบัญชี (ถ้ายังไม่มีชื่อในช่องแชท)
      if (!this.userProfile.name) {
        this.userProfile.name =
          u.displayName || (u.email ? u.email.split("@")[0] : "");
      }

      // ดัน presence ขึ้น พร้อมชื่อ
      this.updateUserOnlineStatus();

      // เริ่ม subscribe ส่วนต่าง ๆ ของ P2P
      this.initP2PFacade();

      // === subscribe lands ของฉัน ===
      this.landsUnsub = subscribeLandsAll((list) => {
        this.savedLands = Array.isArray(list) ? list : [];
        this.renderLandsOnMap();
        this.$nextTick(() => this.checkLandsFloodStatus());
      });
    });
    // === subscribe flood zones (public) ===
    this.floodsUnsub = subscribeFloodZonesAll((list) => {
      this.savedFloods = Array.isArray(list) ? list : [];
      this.renderFloodsOnMap();
      this.$nextTick(() => this.checkLandsFloodStatus());
    });
  },

  beforeUnmount() {
    if (this.onlineUsersUnsubscribe) this.onlineUsersUnsubscribe();
    if (this.p2pChatUnsubscribe) this.p2pChatUnsubscribe();
    if (this.chatRoomsUnsubscribe) this.chatRoomsUnsubscribe();
    if (this.onlineStatusInterval) clearInterval(this.onlineStatusInterval);
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.authUnsubscribe) this.authUnsubscribe();
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
  },

  methods: {

    selectMode(mode) {
      this.currentMode = mode;
      // Show the centered disclaimer modal after mode selection
      this.showModeDisclaimerModal = true;
    },
    acceptModeDisclaimer() {
      // Dismiss the modal; user has acknowledged the notice
      this.showModeDisclaimerModal = false;
    },
    backToModeSelect() {
      this.currentMode = null;
    },

    clearSelectedLand() {
      this.editingLandId = null;
      this.landData = {
        size: "", width: "", road: "", price: "", totalPrice: "",
        landFrame: "", deedInformation: "",
        owner: "", agent: "", phone: "", lineId: "", raiModel: "", nganModel: "", wahModel: "",
      };
      this.clearDrawing(); // เอา polygon highlight จากการเลือกก่อนหน้าออก
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

          console.log(
            "[DOL WMS] constructed is longdo.Layer?",
            lyr instanceof window.longdo.Layer,
            lyr
          );

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
      };
      const target = resolve(dict[key] || B.HYBRID);

      console.log(
        "setBase =>",
        key,
        "type=",
        typeof dict[key],
        "target=",
        target
      );
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
              const xs = "x".repeat(Math.min(3, Math.max(1, len - 1)));
              return keep + xs;
            } else {
              // นามสกุล: เก็บ 3 ตัวท้าย ถ้ามี แทนที่กลางด้วย x
              if (len <= 1) return "x".repeat(len);
              const last1 = p.slice(-1);
              const xs = "x".repeat(len - 1);
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
          const mid = "x".repeat(Math.max(0, s.length - 3));
          return first2 + mid + last1;
        };

        const maskLine = (v) => (v ? "xxx" : "");


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
        const lineId = maskLine(item.lineId || "");
        const landFrame = esc(item.landFrame || "");
        const deed = esc(item.deedInformation || item.detail || "");
        const jsUid = String(item.ownerUid || item.ownerUid || '').replace(/'/g, "\\'");
        const jsName = String(displayOwner || '').replace(/'/g, "\\'");

        const html = `
          <div style="
            min-width:300px;
            max-width:360px;
            font-family: Inter, Arial, Helvetica, sans-serif;
            color:#e6eef8;
            background:linear-gradient(180deg,#0b1220 0%, #071022 100%);
            border-radius:12px;
            box-shadow:0 10px 30px rgba(2,6,23,0.75);
            padding:12px;
            border: none;
            overflow: visible;
          ">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
              <div style="font-weight:800;font-size:14px;color:#f8fafc;line-height:1.05">${esc(title)}</div>
            </div>

            <div style="display:flex;gap:8px;margin-bottom:10px">
              <div style="flex:1;display:flex;flex-direction:column;gap:8px">
                <div style="background:rgba(255,255,255,0.03);padding:8px;border-radius:10px;display:flex;flex-direction:column;overflow:visible">
                  <div style="font-size:12px;color:#9fb6cf;margin-bottom:4px">ขนาดที่ดิน (ตร.วา)</div>
                  <div style="font-weight:700;font-size:18px;color:#e6fff7">${fmt(area)}</div>
                </div>

                <div style="background:rgba(255,255,255,0.03);padding:8px;border-radius:10px;display:flex;flex-direction:column;overflow:visible">
                  <div style="font-size:12px;color:#9fb6cf;margin-bottom:4px">หน้ากว้างติดถนน (ม.)</div>
                  <div style="font-weight:700;font-size:16px;color:#bfe1ff">${fmt(frontage)}</div>
                </div>
              </div>

              <div style="width:120px;display:flex;flex-direction:column;gap:8px">
                <div style="background:rgba(255,255,255,0.03);padding:8px;border-radius:10px;text-align:center;overflow:visible">
                  <div style="font-size:12px;color:#9fb6cf">ขนาด (ไร่/งาน/วา)</div>
                  <div style="font-weight:700;font-size:14px;color:#e6fff7">${esc(rai)} / ${esc(ngan)} / ${esc(wah)}</div>
                </div>

                <div style="background:rgba(255,255,255,0.03);padding:8px;border-radius:10px;text-align:center;overflow:visible">
                  <div style="font-size:12px;color:#9fb6cf">ขนาดถนน (ม.)</div>
                  <div style="font-weight:700;font-size:14px;color:#e7d5ff">${fmt(road)}</div>
                </div>
              </div>
            </div>

            <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">
              <div style="flex:1;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));padding:10px;border-radius:10px;overflow:visible">
                <div style="font-size:12px;color:#9fb6cf">ราคา/ตร.วา</div>
                <div style="font-weight:800;font-size:16px;color:#e7d5ff">${fmt(pricePer, 'money')} บ.</div>
              </div>
              <div style="flex:1;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));padding:10px;border-radius:10px;overflow:visible">
                <div style="font-size:12px;color:#9fb6cf">ราคารวม</div>
                <div style="font-weight:800;font-size:16px;color:#bfe1ff">${fmt(total, 'money')} บ.</div>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:8px">

              <div style="display:flex;gap:8px">
                <div style="flex:1">
                  <div style="font-size:12px;color:#9fb6cf">โทร</div>
                  <div style="font-weight:700;color:#e6fff7">${esc(phone) || '-'}</div>
                </div>
                <div style="flex:1">
                  <div style="font-size:12px;color:#9fb6cf">LINE ID</div>
              <div style="font-weight:700;color:#e6fff7">${esc(lineId) || '-'}</div>
                </div>
              </div>
            </div>

            ${landFrame ? `<div style="font-size:12px;color:#9fb6cf;margin-bottom:6px">กรอบที่ดิน</div>
              <div style="background:rgba(255,255,255,0.02);padding:8px;border-radius:8px;color:#e6eef8;font-size:13px;margin-bottom:8px;overflow:visible">${landFrame}</div>` : ""}

            ${deed ? `<div style="font-size:12px;color:#9fb6cf;margin-bottom:4px">ข้อมูลโฉนด / ระวาง</div>
              <div style="background:rgba(255,255,255,0.02);padding:8px;border-radius:8px;color:#cfe8ff;font-size:12px;max-height:none;overflow:visible">${deed}</div>` : ""}

            <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px">
              ${item.ownerUid ? `<a href="javascript:void(0)" onclick="window.openChatWith('${jsUid}','${jsName}');return false" style="background:linear-gradient(90deg,#06b6d4,#0ea5e9);color:#071029;padding:8px 12px;border-radius:10px;font-weight:700;text-decoration:none;font-size:13px">แชทผู้ขาย</a>` : ''}
              <a href="javascript:void(0)" style="background:linear-gradient(90deg,#7c3aed,#5eead4);color:#071029;padding:8px 12px;border-radius:10px;font-weight:700;text-decoration:none;font-size:13px">ดูรายละเอียด</a>
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

      // ล้าง overlay เดิม
      try { this.landOverlays.forEach(o => this.map.Overlays.remove(o)); }
      catch (e) { console.debug("renderLandsOnMap: remove overlays failed:", e); }
      this.landOverlays = [];

      // ใช้ผลกรองถ้ามี ไม่งั้นใช้ทั้งหมด
      const lands =
        (this.filteredLands && this.filteredLands.length
          ? this.filteredLands
          : this.savedLands) || [];

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
            console.log("Map is ready, adding markers...");
            try { this.addMarkersToMap(); } catch (e) { console.error("addMarkersToMap failed", e); }

            // Try to force ESRI imagery as base if available (try several common keys)
            try {
              const tryEsriKeys = [
                'imagery', 'satellite', 'World_Imagery', 'satellite-roads', 'road',
                'ดาวเทียม', 'ถนน', 'ESRI - ดาวเทียม', 'ESRI - ถนน', 'esri.satellite'
              ];
              if (window.longdo?.Layers && typeof window.longdo.Layers.ESRI === 'function') {
                for (const k of tryEsriKeys) {
                  try {
                    const layer = window.longdo.Layers.ESRI(k);
                    if (layer) {
                      try {
                        if (this.map.Layers?.setBase) this.map.Layers.setBase(layer);
                        else if (this.map.Layers?.base) this.map.Layers.base(layer);
                        this.selectedMapType = 'esri-' + String(k).replace(/\s+/g, '-').toLowerCase();
                        console.log('ESRI base set with key:', k);
                        break;
                      } catch (inner) { console.debug('setBase with ESRI key failed', k, inner); }
                    }
                  } catch (_) { /* try next */ }
                }
              }
            } catch (e) { console.debug('ESRI base detection routine failed', e); }

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
          });
        } catch (e) { console.warn("binding ready event failed", e); }

        // Click handler (defensive)
        try {
          this.map.Event.bind("click", (ev) => {
            try {
              this.showMarkerInfo = false;
              if (!this.drawMode && !this.floodMode) {
                this.clearSelectedLand();
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

        // expose selectSaleType for popup buttons if present
        try { window.selectSaleType = this.selectSaleType.bind(this); } catch (e) { }
        try { window.openChatWith = this.openChatWith?.bind(this) || (() => { }); } catch (e) { }

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
            if (!this.drawMode && !this.floodMode) {
              this.selectFloodPolygon(overlay);
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

      console.log("Marker clicked:", markerData);
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
      console.log('sendMessage: sending', { to: this.selectedUser.uid, from: this.currentUserId, text });

      try {
        const res = await sendChatMessage(text, this.currentUserId, this.userProfile.name, this.selectedUser.uid);
        console.log('sendMessage: sent', res);
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
      console.log('initP2PFacade: subscribing to presence for', this.currentUserId);
      this.onlineUsersUnsubscribe = subscribeOnlineUsers((users) => {
        try { console.log('initP2PFacade: presence callback, total=', (users || []).length); } catch (_) { }
        this.onlineUsers = users.filter((u) => u.uid !== this.currentUserId);
        try { console.log('initP2PFacade: onlineUsers set to', this.onlineUsers.map(u => u.uid)); } catch (_) { }
      });

      if (this.chatRoomsUnsubscribe) this.chatRoomsUnsubscribe();
      this.chatRoomsUnsubscribe = subscribeP2PChatRooms(
        this.currentUserId,
        (rooms) => {
          this.chatRooms = rooms;
          this.unreadCount = rooms.reduce(
            (sum, r) => sum + (r.unreadCount || 0),
            0
          );
          this.hasNewMessage = this.unreadCount > 0;
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
    selectChatRoom(room) {
      const other = this.onlineUsers.find((u) => u.uid === room.otherUid);
      if (other) {
        this.selectUserToChat(other);
      } else {
        this.selectedUser = {
          uid: room.otherUid,
          name: `User-${room.otherUid.slice(0, 6)}`,
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
      console.log("Reloading API...");
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
      try { document.getElementById('map').style.cursor = 'crosshair'; } catch (e) { }
    },
    finishDrawing() {
      if (!this.map) return;
      if (this.drawPoints.length < 3) { alert("ต้องคลิกอย่างน้อย 3 จุด"); return; }
      try { if (this.drawPolyline) this.map.Overlays.remove(this.drawPolyline); } catch (e) { }
      try { if (this.drawPolygon) this.map.Overlays.remove(this.drawPolygon); } catch (e) { }
      this.drawPolygon = new window.longdo.Polygon(this.drawPoints, {
        lineWidth: 2, lineColor: "rgba(30,144,255,0.9)", fillColor: "rgba(30,144,255,0.25)",
      });
      this.map.Overlays.add(this.drawPolygon);
      this.drawMode = false;
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


    applyFilters() {
      console.log(this.filters);
      this.showFilters = false;
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
            console.log("Removing", overlay.__kml?.props?.name, overlay);
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
      this.addMarkersToMap();
      this.renderLandsOnMap();
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

    toggleFilters() {
      this.showFilters = !this.showFilters;
      this.showSearch = false;
      this.showLayers = false;
      this.showChat = false;
    },

    toggleLayers() {
      this.showLayers = !this.showLayers;
      this.showSearch = false;
      this.showFilters = false;
      this.showChat = false;
    },

    viewMyProperty() {
      console.log("View my property");
      // Show only user's markers
      this.showSearch = false;
      this.showFilters = false;
      this.showLayers = true;
    },

    exploreArea() {
      console.log("Explore area");
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
      };

      // แตก size (ตร.วา) เป็น RNW ให้ช่องด้านขวา
      const { rai, ngan, wah } = this.rnwFromSize(this.landData.size);
      this.raiModel = (rai === "" ? "" : String(rai));
      this.nganModel = (ngan === "" ? "" : String(ngan));
      this.wahModel = (wah === "" ? "" : (this.fmt2 ? this.fmt2(wah) : wah.toFixed(2)));


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
      };

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
      this.selectLand(land);
    },
    // ===== Flood Zone helpers =====
    startFloodDrawing(level = 'medium') {
      this.floodMode = true;
      this.floodLevel = level;
      this.floodPoints = [];
      this.redrawFloodDrawing();
      try { document.getElementById('map').style.cursor = 'crosshair'; } catch (e) { }
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
    },
  },
  watch: {
    availableLayers: {
      handler(newVal) {
        const markersLayer = newVal.find((l) => l.id === 1);
        if (markersLayer) {
          this.toggleMarkersLayer();
        }
        console.log("Start pop-up");
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
