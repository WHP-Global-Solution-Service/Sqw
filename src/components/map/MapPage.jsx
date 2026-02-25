// src/components/map/MapPage.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ModeDisclaimerModal from "../Common/ModeDisclaimerModal";
import "../../css/MapPage.css";
import "../../css/land-popup.css";
import { useTranslation } from "react-i18next";


import MapControls from "./MapControls";
import FilterPanel from "../Panels/FilterPanel";
import PayModal from "./Payments/PayModal";
import MapPopup from "./MapPopup";
import SaleSidePanel from "./SaleSidePanel";
import DashboardStats from "./DashboardStats";
import SellModePickerModal from "./SellModePickerModal";
import { MAP_MODE, isEia, isSell, isLandMode } from "./mapMode";
import MembershipGateModal from "../modals/MembershipGateModal";


// ✅ Investor flow
import InvestorProfileModal from "./InvestorProfileModal";
import InvestorRecommendPanel from "./InvestorRecommendPanel";
import { loadInvestorProfile } from "../../utils/investorProfile";
import { recommendLands } from "./recommend/recommendLands";
import ModePickerModal from "./ModePickerModal";

// ✅ Broadcast & Line ADs (Mode 2)
import BroadcastFab from "./broadcast/BroadcastFab";
import BroadcastNewsModal from "./broadcast/BroadcastNewsModal";
import BroadcastCreateModal from "./broadcast/BroadcastCreateModal";
import BroadcastQuickActions from "./broadcast/BroadcastQuickActions";

import { useMapAccess } from "./hooks/useMapAccess";
import { useMapCart } from "./hooks/useMapCart";
import { useMapPopup } from "./hooks/useMapPopup";
import { useMapEvents } from "./hooks/useMapEvents";
import { useDragGuard } from "./hooks/useDragGuard";
import { useReopenPopup } from "./hooks/useReopenPopup";
import { useMapSearch } from "./hooks/useMapSearch";
import { useSelectedLandAccess } from "./hooks/useSelectedLandAccess";
import { useLandSelection } from "./hooks/useLandSelection";
import { useUnlockFlow } from "./hooks/useUnlockFlow";
import { useLandFilters } from "./hooks/useLandFilters";
import { useLongdoDrawing } from "./hooks/useLongdoDrawing";
import { useChatPresence } from "../../hooks/useChatPresence";

import { readFavorites, subscribeFavoritesChanged } from "../../utils/favorites";
import { DEFAULT_FILTER } from "./constants/filter";

import LandMarkers from "./LandMarkers";
import { mockLands } from "./lands/mockLands";

import LandDetailPanel from "./LandDetailPanel";
import UnlockPickerModal from "./UnlockPickerModal";

//import { useAuth } from "../../auth/AuthContext";
import { useAuth } from "../../auth/AuthProvider";
import RolePickerModal from "../../auth/RolePickerModal";

// ✅ แยกออกมาเป็น hooks
import { useMyLands } from "./hooks/useMyLands";
import { useSalePanel } from "./hooks/useSalePanel";
import { useMapBootstrap } from "./hooks/useMapBootstrap";

// ✅ Mock Chat Modal (ไม่ใช้ Firebase)
import ChatModalMock from "../chat/ChatModalMock";
import EiaDetailPanel from "./eia/EiaDetailPanel";
import { mockEias } from "./eia/mockEias";
import EiaDashboardStats from "./eia/EiaDashboardStats";

function safeNum(v){
  if(v == null) return null
  if(typeof v === "number") return v

  const cleaned = String(v)
    .replace(/[^\d.-]/g,"") // ลบ symbol
    .replace(",",".")       // comma → dot

  const n = Number(cleaned)
  return Number.isFinite(n) ? n : null
}

export default function MapPage() {
  // =========================================================================
  // Router
  // =========================================================================
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const mode = params.get("mode") || MAP_MODE.BUY;
  const focusLandId = params.get("focus"); // /map?mode=...&focus=LAND_ID

  // sell flow params
  const intent = params.get("intent"); // "seller" | "investor" | null
  const profile = params.get("profile"); // "done" | null

  const [sellPickOpen, setSellPickOpen] = useState(false);

  // Broadcast
  const [newsOpen, setNewsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createRole, setCreateRole] = useState("admin"); // admin|consignor
  const [createLand, setCreateLand] = useState(null);
  const [plan, setPlan] = useState("bkk2556");
  const [baseOpacity, setBaseOpacity] = useState(1);
  const [markersReady,setMarkersReady] = useState(false)

  // =========================================================================
  // ✅ Mock Identity for Chat (มาก่อนทุกอย่างที่ใช้มัน)
  // =========================================================================
  const [mockUid] = useState(() => {
    const key = "mock_uid";
    let uid = sessionStorage.getItem(key);
    if (!uid) {
      uid = "u_" + Math.random().toString(16).slice(2, 8);
      sessionStorage.setItem(key, uid);
    }
    return uid;
  });

  const [mockName, setMockName] = useState(() => {
    const key = "mock_name";
    let name = sessionStorage.getItem(key);
    if (!name) {
      name = `Guest-${Math.random().toString(16).slice(2, 6)}`;
      sessionStorage.setItem(key, name);
    }
    return name;
  })

  // =========================================================================
  // ✅ Auth (ต้องมาก่อน currentUid / userProfile)
  // =========================================================================
  const auth = useAuth();

  // =========================================================================
  // ✅ Derived values
  // =========================================================================
  const isMock = !auth.me?.uid;

  const userProfile = auth.me || {
    name: mockName,
    photoURL: "",
  };

  const currentUid = isMock
    ? mockUid
    : auth.me?.uid;

  // ✅ เปิด presence (online/offline) ให้ chat
  useChatPresence(currentUid, userProfile);

  // =========================================================================
  // Role picker modal
  // =========================================================================
  const [roleOpen, setRoleOpen] = useState(false);

  const role = auth.role;
  const updateRole = auth.updateRole;


  // =========================================================================
  // ✅ Chat state + handlers (Mock)
  // =========================================================================
  const [chatOpen, setChatOpen] = useState(false);
  const [initialPeer, setInitialPeer] = useState(null); // { uid, name }

  const openChat = useCallback(() => {
    if (!currentUid) return alert(t("common.loginRequired"));
    setInitialPeer(null);
    setChatOpen(true);
  }, [currentUid, t]);

  const openChatWith = useCallback(
    (otherUid, otherName = "") => {
      if (!otherUid) return;
      if (!currentUid) return alert(t("common.loginRequired"));
      setInitialPeer({ uid: otherUid, name: otherName || "" });
      setChatOpen(true);
    },
    [currentUid, t]
  );

  // ✅ กด “แชทผู้ขาย” จาก land (ปรับ field ให้ตรง schema จริงของคุณ)
  const openChatWithSellerFromLand = useCallback(
    (land) => {
      console.log("CHAT TARGET LAND =", land);

      const sellerUid =
        land?.contactUid ??
        land?.ownerId ??
        land?.createdBy ??
        land?.uid ??
        null;

      const sellerName =
        land?.owner ||
        land?.agent ||
        land?.ownerName ||
        "ผู้ขาย";

      if (!sellerUid) {
        alert("❌ land นี้ไม่มี UID ผู้ขาย");
        return;
      }

      openChatWith(sellerUid, sellerName);
    },
    [openChatWith]
  );

  // =========================================================================
  // Permissions
  // =========================================================================
  // วาดได้เฉพาะ landlord,seller,admin
  const canDraw =
    role === "landlord" ||
    role === "agent" ||
    role === "admin";
  const canUseBuy = role === "seller" || role === "landlord" || role === "admin";

  // ✅ intent=investor ให้เข้าได้ทุก role
  // ✅ intent=seller ต้องเป็น seller/landlord/admin
  const canSell =
    intent === "investor"
      ? true
      : role === "seller" || role === "admin" || role === "landlord";

  const drawingEnabled =
  (role === "admin") ||
  (canDraw && mode !== MAP_MODE.EIA);

  const [currentMode, setCurrentMode] = useState("normal"); // normal | eia | draw

  // =========================================================================
  // ✅ Sell flow: ต้องเลือก intent ก่อน แล้วค่อยเช็ค role
  // =========================================================================
  useEffect(() => {
    if (mode !== "sell") {
      setSellPickOpen(false);
      return;
    }

    // 1) เข้า sell แต่ยังไม่เลือก intent
    if (!intent) {
      setSellPickOpen(true);
      return;
    }

    setSellPickOpen(false);

    // 2) intent=seller แต่ role ไม่ผ่าน
    if (
      intent === "seller" &&
      !(role === "seller" || role === "landlord" || role === "admin")
    ) {
      alert(t("sell.permissionDenied"));
      navigate("/map?mode=sell&intent=investor", { replace: true });
    }
  }, [mode, intent, role, navigate, t]);

  const handlePickSellIntent = useCallback(
    (picked) => {
      // picked: "seller" | "investor"
      setSellPickOpen(false);
      navigate(`/map?mode=sell&intent=${encodeURIComponent(picked)}`, {
        replace: true,
      });
    },
    [navigate]
  );

  const handleCloseSellIntent = useCallback(() => {
    // ถ้าปิด modal โดยไม่เลือก -> กลับ buy
    setSellPickOpen(false);
    navigate("/map?mode=buy", { replace: true });
  }, [navigate]);

  // =========================================================================
  // ✅ Investor Profile modal open
  // =========================================================================
  const shouldAskInvestorProfile =
    mode === "sell" && intent === "investor" && profile !== "done";

  const isInvestorResult =
    mode === "sell" && intent === "investor" && profile === "done";

  // =========================================================================
  // Map bootstrap (disclaimer + layers + mapObj)
  // =========================================================================
  const {
    showDisclaimer,
    handleAcceptDisclaimer,
    openLayerMenu,
    setOpenLayerMenu,
    isSatellite,
    setIsSatellite,
    isTraffic,
    setIsTraffic,
    dolEnabled,
    setDolEnabled,
    dolOpacity,
    setDolOpacity,
    mapRef,
    mapObj,
    zoomIn,
    zoomOut,
    locateMe,
  } = useMapBootstrap({ mode });

  // =========================================================================
  // My lands
  // =========================================================================
  const { myLands } = useMyLands();

  // =========================================================================
  // Data (local + mock)
  // =========================================================================
  const lands = useMemo(() => {
    const local = Array.isArray(myLands) ? myLands : [];
    return [...local, ...mockLands];
  }, [myLands]);

  // =========================================================================
  // Filters
  // =========================================================================
  const {
    filterOpen,
    setFilterOpen,
    filterValue,
    setFilterValue,
    filteredLands,
    applyFilters,
    resetFilter,
  } = useLandFilters(lands, DEFAULT_FILTER);

  // =========================================================================
  // ✅ Recommend lands (Investor result)
  // =========================================================================
  const investorProfile = useMemo(() => {
    if (!isInvestorResult) return null;
    return loadInvestorProfile();
  }, [isInvestorResult]);

  const recommendedLands = useMemo(() => {
    if (!isInvestorResult) return null;
    return recommendLands(lands, investorProfile);
  }, [isInvestorResult, lands, investorProfile]);

  // ✅ lands ที่ใช้โชว์บนแผนที่/หมุด/สถิติ
  // land data (เดิม)
  const landsForMap = useMemo(()=>{

    const base = isInvestorResult
      ? (recommendedLands || [])
      : filteredLands

    return base.filter(l => l.mode === mode)

  },[mode, filteredLands, recommendedLands, isInvestorResult])

  // eia data (ใหม่)
  const eiaAsLandLike = useMemo(() => {

  const localEia = myLands.filter(l => l.__type === "eia");

    const list = [
      ...mockEias.map(eia => ({
        id:`eia-${eia.id}`,
        __type:"eia",
          location:{
            lat: safeNum(
              eia.location?.lat ??
              eia.location?.latitude ??
              eia.lat ??
              eia.y
            ),
            lon: safeNum(
              eia.location?.lon ??
              eia.location?.lng ??
              eia.location?.longitude ??
              eia.lon ??
              eia.x
            )
          },
        geometry:eia.geometry,
        raw:eia
      })),
      ...localEia
    ];

    return list;

  }, [myLands]);



  console.log(
 eiaAsLandLike.map(e => e.location)
)
  // =========================================================================
  // Favorites
  // =========================================================================
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(readFavorites().map((f) => String(f.id)))
  );

  useEffect(() => {
    const sync = () =>
      setFavoriteIds(new Set(readFavorites().map((f) => String(f.id))));
    const unsub = subscribeFavoritesChanged(sync);
    return unsub;
  }, []);

  

  // =========================================================================
  // Access / Cart
  // =========================================================================
  const accessApi = useMapAccess();
  const { addToCart } = useMapCart(navigate);

  // =========================================================================
  // Drawing
  // =========================================================================
  const { drawMode, startDrawing, finishDrawing, clearDrawing, getPoints } =
    useLongdoDrawing(mapObj, currentMode);

  useEffect(() => {
    if (!drawingEnabled) {
      try {
        clearDrawing?.();
      } catch {}
      setCurrentMode("normal");
    }
  }, [drawingEnabled, clearDrawing]);

  // ✅ draw เฉพาะ sell ที่เป็น seller intent (กัน investor)

  // =========================================================================
  // Sale panel + state (hook)
  // =========================================================================
  const canSeeSalePanel =
    role === "seller" || role === "landlord" || role === "admin";

  // ✅ กัน SaleSidePanel ใน investor result
  const isLandMode =
    mode === "buy" ||
    mode === "sell" ||
    mode === "eia";

  const showSalePanel =
    canSeeSalePanel &&
    isLandMode &&
    !(mode === "sell" && intent === "investor");

  const {
    saleOpen,
    setSaleOpen,
    landForm,
    setLandForm,
    handleSaveLand,
    handleDeleteLand,
  } = useSalePanel({
    getPoints,
    clearDrawing,
    currentUserId: auth.me?.uid,
    mode,
  });

  // =========================================================================
  // Popup
  // =========================================================================
  const popupApi = useMapPopup({ mapObj, mapRef });
  const [selectedEia, setSelectedEia] = useState(null);

  const { openPopupForWithAccess, onSelectLand } = useLandSelection({
    popupApi,
    accessApi,
  });

  // ✅ STEP 3.2: handler กลางสำหรับ map click (land / eia)
  const handleSelectOverlay = useCallback(
    (item, loc) => {
      // =========================
      // EIA MODE → เปิด EIA popup
      // =========================
      if (isEia(mode)) {
        if (!loc) return;

        // เก็บข้อมูล EIA ที่ถูกคลิก
        setSelectedEia({ item, loc });

        // ใช้ popup engine เดิม แค่เพื่อเปิด + คำนวณตำแหน่ง
        popupApi.openPopupFor(
          { id: "__eia__", __type: "eia" }, // dummy object สำหรับ popup engine
          loc
        );
        return;
      }

      // =========================
      // LAND MODE → behavior เดิม
      // =========================
      openPopupForWithAccess(item, loc);
    },
    [mode, popupApi, openPopupForWithAccess]
  );
  // =========================================================================

  useDragGuard({
    enabledRef: popupApi.popupOpenRef,
    threshold: 6,
  });

  const { rememberPopup, reopenPopup } = useReopenPopup({
    popupApi,
    openPopupForWithAccess,
  });

  const unlockFlow = useUnlockFlow({
    mode,
    accessApi,
    addToCart,
    popupApi,
    rememberPopup,
    reopenPopup,
  });

  const handleChatFromPopup = useCallback(() => {
    const land = popupApi.selectedLand;
    if (!land) return;

    const landId = land.id;
    const access = accessApi.access?.[landId];

    // ---------- ADMIN BYPASS ----------
    if (role === "admin") {
      openChatWithSellerFromLand(land);
      return;
    }

    // ---------- ACCESS CHECK ----------
    const hasChatAccess =
      access === true ||
      access === "all" ||
      access?.chat === true ||
      (Array.isArray(access) && access.includes("chat"));

    if (!hasChatAccess) {
      unlockFlow.onOpenUnlockPicker?.(landId);
      return;
    }

    // ---------- OPEN CHAT ----------
    openChatWithSellerFromLand(land);

  }, [
    popupApi.selectedLand,
    accessApi.access,
    unlockFlow,
    openChatWithSellerFromLand,
    role
  ]);

  useMapEvents({
    mapObj,
    onOverlayOrMarkerSelect: handleSelectOverlay, // ✅ ใช้ handler กลาง
    onMapClickClose: () => {
      if (createOpen || newsOpen) return;

      popupApi.closePopup();
      setSelectedEia(null); // ✅ ปิด EIA popup ด้วย
    },
    isDrawing: drawMode,
  });

  useEffect(() => {
    popupApi.closePopup();
  }, [mode, showDisclaimer]); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ เพิ่ม: ถ้าเปิด news/create -> ปิด popup อัตโนมัติ
  useEffect(() => {
    if (createOpen || newsOpen) popupApi.closePopup();
  }, [createOpen, newsOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ เปิด create แล้วจำ popup เดิมไว้
  const openCreate = useCallback(
    (roleToCreate) => {
      rememberPopup?.(); // ✅ จำ popup เดิม
      setCreateLand(popupApi.selectedLand || null);
      popupApi.closePopup(); // ✅ ปิด popup กันซ้อน

      setCreateRole(roleToCreate); // "admin" | "consignor"
      setCreateOpen(true);
    },
    [rememberPopup, popupApi]
  );

  // ✅ ปิด create แล้วเปิด popup เดิมกลับมา
  const closeCreate = useCallback(() => {
    setCreateOpen(false);
    setCreateLand(null); // ✅ เคลียร์ snapshot
    setTimeout(() => {
      reopenPopup?.();
    }, 0);
  }, [reopenPopup]);

  // =========================================================================
  // ✅ Focus + Zoom + Open Popup (เมื่อ navigate ไป /map?...&focus=ID)
  // =========================================================================
  useEffect(() => {
    if (!mapObj?.location) return;
    if (!focusLandId) return;
    if (!markersReady) return; // ⭐ สำคัญ
    if (!landsForMap?.length) return;

    const land = landsForMap.find(
      l => String(l.id) === String(focusLandId)
    );
    if (!land) return;

    const loc = land.location ?? {
      lat: land.lat ?? land.latitude,
      lon: land.lon ?? land.lng ?? land.longitude,
    };

    const lat = Number(loc?.lat);
    const lon = Number(loc?.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    mapObj.location({ lon, lat });
    mapObj.zoom(16);

    onSelectLand(land,{lon,lat});

  },[mapObj,focusLandId,landsForMap,markersReady]);
  // =========================================================================
  // Search
  // =========================================================================
  const handleSearch = useMapSearch(mapObj);
  const [modeOpen, setModeOpen] = useState(!params.get("mode"));

  // =========================================================================
  // Derived
  // =========================================================================
  const selectedLand = popupApi.selectedLand;
  const { unlockedFields } = useSelectedLandAccess(
    selectedLand,
    accessApi.access
  );
  const landForBroadcast = createLand || selectedLand; // ✅ ใช้ snapshot ก่อน

  // ================= LAYER REGISTRY =================
  const EIA_LAYERS = useMemo(() => {
    if (!mapObj || !window.longdo) return null;

    const L = window.longdo;

    return {
      bkk: new L.Layer("EIA_BKK"),
      metro: new L.Layer("EIA_METRO"),
      phuket: new L.Layer("EIA_PHUKET"),
      eec: new L.Layer("EIA_EEC"),
    };
  }, [mapObj]);

  const EIA_VIEWPORT = {
    bkk: { lon: 100.5018, lat: 13.7563, zoom: 10 },
    metro: { lon: 100.9018, lat: 13.7563, zoom: 9 },
    phuket: { lon: 98.3381, lat: 7.8804, zoom: 11 },
    eec: { lon: 101.4500, lat: 13.0000, zoom: 9 },
  };

  // ================= SWITCH LAYER =================
  const showLayer = useCallback((cat) => {
    if (!mapObj) return;

    // remove old
    if (!EIA_LAYERS) return;

    // add new
    const layer = EIA_LAYERS[cat];
    if (layer) mapObj.Layers.add(layer);

    // ===== move map =====
    const vp = EIA_VIEWPORT[cat];
    if (vp) {
      mapObj.location({ lon: vp.lon, lat: vp.lat });
      mapObj.zoom(vp.zoom);
    }

  }, [mapObj, EIA_LAYERS]);

  useEffect(() => {
    if (!mapObj) return;

    Object.values(EIA_LAYERS).forEach(layer => {
      try {
        layer.opacity(baseOpacity);
      } catch {}
    });

  }, [baseOpacity, mapObj, EIA_LAYERS]);

  const handleSelectMode = (mode) => {
      setModeOpen(false);
      navigate(`/map?mode=${mode}`, { replace: true });
    };

  useEffect(() => {
      setModeOpen(!params.get("mode"));
    }, [params]);

  // =========================================================================
  // Render
  // =========================================================================
  return (
    <div className="map-shell">
      <div id="map" className="map-canvas" />

      <ModePickerModal
        open={modeOpen}
        onClose={() => navigate("/map")}
        onSelect={handleSelectMode}
      />

      {showDisclaimer && (
        <ModeDisclaimerModal onClose={handleAcceptDisclaimer} />
      )}

      {/* ✅ Sell Intent Picker */}
      <SellModePickerModal
        open={sellPickOpen}
        onClose={handleCloseSellIntent}
        onPick={handlePickSellIntent}
      />

      {/* ✅ Investor Profile Form (intent=investor แต่ยังไม่ done) */}
      <InvestorProfileModal
        open={shouldAskInvestorProfile}
        onClose={() =>
          navigate(`/map?mode=sell&intent=investor`, { replace: true })
        }
        onDone={() =>
          navigate(`/map?mode=sell&intent=investor&profile=done`, {
            replace: true,
          })
        }
      />

      <FilterPanel
        mode={mode}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={filterValue}
        onChange={setFilterValue}
        onApply={applyFilters}
        onClear={resetFilter}
      />

      {mapObj && (
        <LandMarkers
          map={mapObj}
          lands={isEia(mode) ? eiaAsLandLike : landsForMap}
          favoriteIds={isEia(mode) ? undefined : favoriteIds}
          onSelect={handleSelectOverlay}
          onReady={() => setMarkersReady(true)}   // ⭐ เพิ่ม
          mode={mode}
        />
      )}

      <MapControls
        pageMode={mode}
        currentRole={role}
        onOpenRolePicker={() => setRoleOpen(true)}
        drawingEnabled={drawingEnabled} // ✅ กัน investor
        drawMode={drawMode}
        currentMode={currentMode}
        onSetMode={setCurrentMode}
        onStartDrawing={() => {
          if (!mapObj) {
            console.warn("map not ready");
            return;
          }
          setCurrentMode("draw");
          setTimeout(() => startDrawing(), 0);
        }}
        onFinishDrawing={finishDrawing}
        onClearDrawing={clearDrawing}
        onSearch={handleSearch}
        //openLayerMenu={openLayerMenu}
        //setOpenLayerMenu={setOpenLayerMenu}
        isSatellite={isSatellite}
        setIsSatellite={setIsSatellite}
        isTraffic={isTraffic}
        setIsTraffic={setIsTraffic}
        dolEnabled={dolEnabled}
        setDolEnabled={setDolEnabled}
        dolOpacity={dolOpacity}
        setDolOpacity={setDolOpacity}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onLocate={locateMe}
        onOpenFilter={() => setFilterOpen(true)}
        onOpenChat={openChat} // ✅ เปิด Mock Chat
        onOpenTools={() => alert(t("common.comingSoon"))}
        plan={plan}
        setPlan={setPlan}
        baseOpacity={baseOpacity}
        setBaseOpacity={setBaseOpacity}
        onEiaCategoryChange={showLayer}
      />

      {/* ✅ stats ด้านล่าง: ถ้า investor result ให้คิดจากรายการแนะนำ */}
      {isEia(mode) ? (
        <EiaDashboardStats eias={eiaAsLandLike} />
      ) : (
        <DashboardStats lands={landsForMap} />
      )}

      {/* ✅ ซ่อน popup ระหว่างเปิดข่าว/สร้าง Broadcast */}
      {!createOpen && !newsOpen && popupApi.popupOpen && (
        <MapPopup {...popupApi}>
          {isEia(mode) ? (
            <EiaDetailPanel
              data={selectedEia ?? landForm}
              onClose={() => {
                setSelectedEia(null);
                popupApi.closePopup();
              }}
            />
          ) : (
            <LandDetailPanel
              mode={mode}
              land={popupApi.selectedLand}
              unlockedFields={unlockedFields}
              onClose={() => popupApi.closePopup()}
              onOpenUnlockPicker={unlockFlow.onOpenUnlockPicker}
              onUnlockAll={unlockFlow.onUnlockAll}
              onChatSeller={handleChatFromPopup}
            />
          )}
        </MapPopup>
      )}


      {/* ✅ Investor Recommend List (เฉพาะ profile=done) */}
      {isInvestorResult && (
        <InvestorRecommendPanel
          lands={recommendedLands || []}
          onFocus={(x) =>
            navigate(
              `/map?mode=sell&intent=investor&profile=done&focus=${encodeURIComponent(
                x.id
              )}`
            )
          }
        />
      )}

      {/* ✅ SaleSidePanel (ไม่โชว์ใน investor) */}
      {showSalePanel && (
        <SaleSidePanel
          open={saleOpen}
          onToggle={() => setSaleOpen((v) => !v)}
          role={role}
          allowed={showSalePanel}
          mode={mode}
          drawingEnabled={drawingEnabled} // ✅ กัน investor ให้ชัวร์
          landData={landForm}
          setLandData={setLandForm}
          savedLands={myLands}
          onSave={() => {
            const r = handleSaveLand?.(); // {id}
            if (r?.id) {
              const keep = [];
              keep.push(`mode=${encodeURIComponent(mode)}`);
              if (intent) keep.push(`intent=${encodeURIComponent(intent)}`);
              if (profile) keep.push(`profile=${encodeURIComponent(profile)}`);
              keep.push(`focus=${encodeURIComponent(r.id)}`);
              navigate(`/map?${keep.join("&")}`);
            }
          }}
          onDelete={handleDeleteLand}
          onFocusLand={(land) => {
            const keep = [];
            keep.push(`mode=${encodeURIComponent(mode)}`);
            if (intent) keep.push(`intent=${encodeURIComponent(intent)}`);
            if (profile) keep.push(`profile=${encodeURIComponent(profile)}`);
            keep.push(`focus=${encodeURIComponent(land.id)}`);
            navigate(`/map?${keep.join("&")}`);
          }}
        />
      )}

      <MembershipGateModal
        open={accessApi.gateOpen}
        onClose={()=>accessApi.setGateOpen(false)}

        onContinueFree={()=>{
          accessApi.setGateOpen(false)
          accessApi.setUnlockOpen(true)
        }}

        onUpgrade={()=>{
          navigate("/pricing")
        }}
      />

      <UnlockPickerModal
        open={accessApi.unlockOpen}
        landId={accessApi.unlockLandId}
        //title={t("picker.title")}
        //subtitle={t("picker.subtitle")}
        items={accessApi.unlockItems}
        initialSelected={[]}
        onCancel={unlockFlow.onCancelUnlock}
        onAddToCart={unlockFlow.onAddToCartUnlock}
        onConfirm={unlockFlow.onConfirmUnlock}
      />

      <PayModal
        open={unlockFlow.payOpen}
        draft={unlockFlow.payDraft}
        onClose={unlockFlow.onClosePay}
        onPaid={(payload)=>{
          // 1️⃣ run logic เดิมก่อน
          unlockFlow.onPaid(payload)

          // 2️⃣ ตรวจว่า unlock chat ไหม
          const hasChat = payload?.selected?.includes("chat")

          if(hasChat){
            const land = popupApi.selectedLand
            if(land){
              openChatWithSellerFromLand(land)
            }
          }
        }}
      />

      {/* 1) ปุ่มลอยข่าว */}
      <BroadcastFab onClick={() => setNewsOpen(true)} />

      {/* 2) ปุ่มในบริบท popup */}
      <BroadcastQuickActions
        land={selectedLand}
        role={role}
        mode={mode}
        sellIntent={intent}
        onAdminClick={() => {
          if (!selectedLand) {
            alert(t("broadcast.selectLandFirst"));
            return;
          }
          openCreate("admin");
        }}
        onConsignorClick={() => {
          if (!selectedLand) {
            alert(t("broadcast.selectLandFirst"));
            return;
          }
          openCreate("consignor");
        }}
      />

      {/* 3) Modal ข่าว */}
      <BroadcastNewsModal
        open={newsOpen}
        onClose={() => setNewsOpen(false)}
        canAdmin={role === "admin"}
        onOpenAdminCreate={() => openCreate("admin")}
      />

      {/* 4) Modal สร้างแคมเปญ */}
      <BroadcastCreateModal
        open={createOpen}
        onClose={closeCreate}
        onSuccess={closeCreate} // ✅ submit สำเร็จ -> ปิด + reopen popup เดิม
        land={landForBroadcast} // ✅ กัน selectedLand หายหลัง closePopup()
        createdByRole={createRole}
        createdByUserId={role} // MVP: ใส่ role ไปก่อน
        mode={
          mode === "sell" && intent === "seller" ? "consignment" : "buy_sell"
        }
        intent={intent || null}
        defaultFeatured={createRole === "consignor"}
        defaultPriceTHB={createRole === "consignor" ? 100 : 0}
      />

      {/* ✅ Mock Chat Modal */}
      <ChatModalMock
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        currentUid={currentUid}
        userProfile={userProfile}
        initialPeer={initialPeer}
      />

      {/* ✅ ตัวช่วย: เปลี่ยนชื่อ mock user (ถ้ายังไม่มี auth profile)
          ลบออกได้ตามต้องการ */}
      {!auth.me?.name && (
        <div
          style={{
            position: "fixed",
            bottom: 12,
            left: 12,
            zIndex: 9999,
            background: "rgba(255,255,255,.9)",
            border: "1px solid #eee",
            borderRadius: 12,
            padding: "8px 10px",
            fontFamily: "system-ui",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.7 }}>mock name:</div>
          <input
            value={mockName}
            onChange={(e) => {
              const v = e.target.value;
              setMockName(v);
              sessionStorage.setItem("mock_name", v);
            }}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: "6px 8px",
              outline: "none",
              width: 160,
            }}
          />
          <div style={{ fontSize: 12, opacity: 0.6 }}>
          </div>
        </div>
      )}
    </div>
  );
}