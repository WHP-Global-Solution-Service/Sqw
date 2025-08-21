// app-script.js - Enhanced version with marker management
import {
  sendChatMessage,
  subscribeChat,
  onAuthChanged,
  subscribeOnlineUsers, // รายชื่อออนไลน์ (filtered ฝั่ง client)
  subscribeP2PChatRooms, // รายการห้อง (แบบง่ายจาก presence)
  updateOnlineStatus, // อัปเดต presence
  markMessagesAsRead,
} from "./firebase";
import LoginBar from "./components/LoginBar.vue";

export default {
  name: "App",
  components: { LoginBar },
  data() {
    return {
      markers: [
        {
          id: 1,
          location: { lon: 100.62480074665218, lat: 13.854780454307365 },
          title: "a",
          detail: "พื้นที่ 170 ตร.วา",
          pricePerWah: 55000,
          frontage: 12, // เมตร
          road: 20, // เมตร (ใช้กับ dropdown)
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
            size: { width: 32, height: 32 },
            offset: { x: 16, y: 32 },
          },
        },
        {
          id: 2,
          location: { lon: 100.70418523, lat: 13.7439037 },
          title: "b",
          detail: "พื้นที่ 2,784 ตร.วา",
          pricePerWah: 12000,
          frontage: 25,
          road: 8,
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
            size: { width: 28, height: 28 },
            offset: { x: 14, y: 28 },
          },
        },
        {
          id: 3,
          location: { lon: 100.5234, lat: 13.7244 },
          title: "c",
          detail: "พื้นที่ 229 ตร.วา",
          pricePerWah: 38000,
          frontage: 10,
          road: 5,
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
            size: { width: 32, height: 32 },
            offset: { x: 16, y: 32 },
          },
        },
        {
          id: 4,
          location: { lon: 100.5792851, lat: 13.7254161 },
          title: "d",
          detail: "พื้นที่ 130 ตร.วา",
          pricePerWah: 60000,
          frontage: 8,
          road: 12,
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
            size: { width: 32, height: 32 },
            offset: { x: 16, y: 32 },
          },
        },
        {
          id: 5,
          location: { lon: 100.5342488, lat: 13.8527173 },
          title: "e",
          detail: "พื้นที่ 400 ตร.วา",
          pricePerWah: 25000,
          frontage: 15,
          road: 30,
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
            size: { width: 32, height: 32 },
            offset: { x: 16, y: 32 },
          },
        },
      ],

      mapMarkers: [], // Store actual marker objects
      showMarkerInfo: false,
      selectedMarker: null,
      markerInfoPosition: { x: 0, y: 0 },
      map: null,
      selectedMapType: "hybrid",
      dolEnabled: true,
      opacity: 0.3,
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
        phone: "",
        lineId: "",
        price: "",
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
        priceMin: "",
        priceMax: "",
        areaMin: "",
        areaMax: "",
        roadWidth: "",
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

      const toNum = (v) => (v === "" || v == null ? null : Number(v));
      const areaFromDetail = (detail) => {
        if (!detail) return null;
        const m = String(detail).match(/([\d,.]+)/);
        return m ? Number(m[1].replace(/,/g, "")) : null;
      };

      // --- ค่าตัวกรอง ---
      const aMin = toNum(this.filters.areaMin);
      const aMax = toNum(this.filters.areaMax);
      const pMin = toNum(this.filters.priceMin);
      const pMax = toNum(this.filters.priceMax);
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

        return textOK && areaOK && priceOK && frontOK && roadOK;
      });
    },
  },

  methods: {
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

    initMap() {
      if (typeof window.longdo !== "undefined") {
        this.map = new window.longdo.Map({
          placeholder: document.getElementById("map"),
          language: "th",
          layer:
            typeof window.longdo.Layers.HYBRID === "function"
              ? window.longdo.Layers.HYBRID()
              : window.longdo.Layers.HYBRID,
        });

        this.map.location(
          {
            lon: this.currentLocation.lon,
            lat: this.currentLocation.lat,
            includePolygon: false,
          },
          true
        );

        this.map.zoom(this.currentZoom, true);
        this.selectedMapType = "hybrid";

        this.initDolWms_Longdo();
        this.applyDolVisibility();

        // Add markers after map is ready
        this.map.Event.bind("ready", () => {
          console.log("Map is ready, adding markers...");
          this.addMarkersToMap();
        });

        // Handle map click to close marker info
        this.map.Event.bind("click", () => {
          this.showMarkerInfo = false;
        });
      } else {
        setTimeout(() => this.initMap(), 500);
      }
    },

    addMarkersToMap() {
      if (!this.map) return;

      // Clear existing markers first
      this.clearAllMarkers();

      // Check if markers layer is visible
      const markersLayer = this.availableLayers.find((l) => l.id === 1);
      if (!markersLayer || !markersLayer.visible) return;

      // Add each marker to the map
      this.visibleMarkers.forEach((markerData) => {
        const marker = new window.longdo.Marker(markerData.location, {
          title: markerData.title,
          detail: markerData.detail,
          icon: markerData.icon || {
            url: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
            size: { width: 32, height: 32 },
            offset: { x: 16, y: 32 },
          },
          visibleRange: { min: 7, max: 20 },
          draggable: false,
          weight: window.longdo.OverlayWeight
            ? window.longdo.OverlayWeight.Top
            : null,
          popup: {
            html: `<div style="padding: 10px;">
                                <h4 style="margin: 0 0 5px 0; color: #333;">${markerData.title}</h4>
                                <p style="margin: 0; color: #666; font-size: 14px;">${markerData.detail}</p>
                            </div>`,
          },
        });

        // Store marker reference with data
        this.mapMarkers.push({
          data: markerData,
          marker: marker,
        });

        // Add marker to map
        this.map.Overlays.add(marker);
      });

      // Bind click event to overlays after adding them
      if (this.map.Event && this.map.Event.bind) {
        this.map.Event.bind("overlayClick", (overlay) => {
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
          url: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
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
      if (
        !this.chatInput.trim() ||
        !this.userProfile.name ||
        !this.selectedUser
      )
        return;
      try {
        await sendChatMessage(
          this.chatInput.trim(),
          this.currentUserId,
          this.userProfile.name,
          this.selectedUser.uid
        );
        this.chatInput = "";
      } catch (e) {
        console.error("send P2P failed:", e);
        alert("ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง");
      }
    },

    handleTyping() {
      if (this.typingTimer) clearTimeout(this.typingTimer);
      this.showTypingIndicator = true;
      this.typingTimer = setTimeout(() => {
        this.showTypingIndicator = false;
      }, 1000);
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
      this.onlineUsersUnsubscribe = subscribeOnlineUsers((users) => {
        this.onlineUsers = users.filter((u) => u.uid !== this.currentUserId);
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

    startDrawing() {
      console.log("Start drawing boundary");
    },

    finishDrawing() {
      console.log("Finish drawing");
    },

    clearDrawing() {
      console.log("Clear drawing");
    },

    applyFilters() {
      // ดึงค่าตัวกรอง
      const {
        roadWidth,
        areaMin,
        areaMax,
        priceMin,
        priceMax,
        frontMin,
        frontMax,
      } = (this.showFilters = false);
      this.addMarkersToMap(); // ← สำคัญ

      // แปลงค่าว่าง -> null / ตัวเลข
      const parseNum = (v) =>
        v === "" || v === null || v === undefined ? null : +v;

      // map ค่า roadWidth จาก dropdown -> ช่วงตัวเลข
      const roadMinMax = (rw) => {
        if (!rw) return [null, null];
        if (rw === "lt6") return [null, 6];
        if (rw === "6-9.99") return [6, 9.99];
        if (rw === "10-11.99") return [10, 11.99];
        if (rw === "12-17.99") return [12, 17.99];
        if (rw === "18-29.99") return [18, 29.99];
        if (rw === "ge30") return [30, null];
        return [null, null];
      };

      const [rwMin, rwMax] = roadMinMax(roadWidth);
      const aMin = parseNum(areaMin),
        aMax = parseNum(areaMax);
      const pMin = parseNum(priceMin),
        pMax = parseNum(priceMax);
      const fMin = parseNum(frontMin),
        fMax = parseNum(frontMax);

      // หมายเหตุเรื่องชื่อฟิลด์ใน savedLands:
      //   - โค้ดตัวอย่างนี้ “คาดหวัง” ให้แต่ละรายการมี:
      //       area (ตร.วา), pricePerSqw (บาท/ตร.วา), frontage (เมตร), roadWidth (เมตร)
      //   - แต่จากโค้ดของคุณตอน saveLandData() เก็บเป็น: size, width, price
      //     เลยทำ adapter ให้รองรับทั้งสองแบบ

      const getArea = (it) =>
        it.area != null ? +it.area : it.size ? +it.size : 0;
      const getPriceSqw = (it) =>
        it.pricePerSqw != null ? +it.pricePerSqw : it.price ? +it.price : 0;
      const getFrontage = (it) =>
        it.frontage != null ? +it.frontage : it.width ? +it.width : 0;
      const getRoadWidth = (it) =>
        it.roadWidth != null ? +it.roadWidth : it.road ? +it.road : null;

      if (Array.isArray(this.savedLands)) {
        this.filteredLands = this.savedLands.filter((item) => {
          const area = getArea(item);
          const priceSqw = getPriceSqw(item);
          const frontage = getFrontage(item);
          const rwidth = getRoadWidth(item);

          const inArea =
            (aMin == null || area >= aMin) && (aMax == null || area <= aMax);
          const inPrice =
            (pMin == null || priceSqw >= pMin) &&
            (pMax == null || priceSqw <= pMax);
          const inFront =
            (fMin == null || frontage >= fMin) &&
            (fMax == null || frontage <= fMax);
          const inRoad =
            (rwMin == null || (rwidth != null && rwidth >= rwMin)) &&
            (rwMax == null || (rwidth != null && rwidth <= rwMax));

          return inArea && inPrice && inFront && inRoad;
        });
      } else {
        this.filteredLands = [];
      }

      this.addMarkersToMap(); // รีเรนเดอร์หมุดตามเงื่อนไขใหม่
    },

    saveLandData() {
      if (this.landData.owner) {
        this.savedLands.push({ ...this.landData });
        this.landData = {
          size: "",
          width: "",
          owner: "",
          phone: "",
          lineId: "",
          price: "",
        };
        console.log("Land data saved:", this.savedLands);
      } else {
        alert("กรุณากรอกชื่อเจ้าของ");
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

      try {
        if (this.myMarker) this.map.Overlays.remove(this.myMarker);
        this.myMarker = new window.longdo.Marker({ lon, lat });
        this.map.Overlays.add(this.myMarker);
      } catch (e) {
        console.debug("[SEARCH] marker add failed:", e);
      }
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
  },
};
