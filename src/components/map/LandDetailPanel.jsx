import { useEffect, useMemo, useState, Fragment } from "react";
import "../../css/land-popup.css";
import { useTranslation } from "react-i18next";
import { normalizeLand } from "../../utils/normalizeLand";
import {
  isFavorite as isFavInStore,
  toggleFavorite as toggleFavInStore,
} from "../../utils/favorites";

import MemberActions from "./MemberActions";
import GuestActions from "./GuestActions";


// -------------------------
// contact field config
// -------------------------
const CONTACT_FIELDS = [
  { key: "contactOwner", label: "field.owner", mask: "-----", icon: "person" },
  { key: "broker", label: "field.agent", mask: "-----", icon: "badge" },
  { key: "phone", label: "field.phone", mask: "**********", icon: "call" },
  { key: "line", label: "field.lineId", mask: "**********", icon: "chat" },
  { key: "frame", label: "field.landFrame", mask: "-----", icon: "crop_square" },
  { key: "chanote", label: "field.deed", mask: "-----", icon: "description" },
];


export default function LandDetailPanel({
  land,
  isMember,
  quotaUsed,
  unlockedFields = [],
  onClose,
  onOpenUnlockPicker,
  onUnlockAll,
  onChatSeller,
  isFavorite,
  onToggleFavorite,
  images,
  onBroadcast
}) {
  const { t } = useTranslation("land");
  const { t: tCommon, i18n } = useTranslation("common");

  const L = useMemo(() => normalizeLand(land), [land]);
  const unlockedSet = useMemo(() => new Set(unlockedFields), [unlockedFields]);
 
  // --- [view] ---
  const [currentViews, setCurrentViews] = useState(0);

  useEffect(() => {
    if (L?.id) {
      setCurrentViews((L.views || 1200) + 1); // Mock views
    }
  }, [L?.id]);

  const displayViews = currentViews >= 1000 ? (currentViews / 1000).toFixed(1) + " k" : currentViews;

  // ฟังก์ชันกลาง: เมื่อกดปุ่มใดๆ ใน GuestActions ให้เปิด Modal ก่อน
  const triggerGate = () => setIsGateOpen(true);
  const [openBroadcast, setOpenBroadcast] = useState(false);
  // ---------------------------

  const [favLocal, setFavLocal] = useState(() =>
    L?.id ? isFavInStore(L.id) : false
  );

  useEffect(() => {
    if (!L?.id) return;
    if (typeof isFavorite === "boolean") return;
    setFavLocal(isFavInStore(L.id));
  }, [L?.id, isFavorite]);

  const fav = typeof isFavorite === "boolean" ? isFavorite : favLocal;

  const handleFav = () => {
    if (!L?.id) return;
    const payload = {
      id: L.id,
      title: L.owner,
      owner: L.owner,
      image: L.images?.[0],
      size: L.area,
      price: L.pricePerWa ?? L.price,
      location: L.location,
      lat: L.lat,
      lon: L.lon ?? L.lng,
      updatedAt: L.updatedAt,
    };

    if (typeof onToggleFavorite === "function") {
      onToggleFavorite(L.id, !fav, payload);
      return;
    }
    const next = toggleFavInStore(L.id, payload);
    setFavLocal(next);
  };

  const canSeeAll = isMember && unlockedSet.size > 0;
  const canReveal = (key) => canSeeAll || unlockedSet.has(key);

  const showValue = (key, value, mask) =>
    canReveal(key) ? value ?? "-" : mask;

  const postedDate = L.createdAt
    ? new Date(L.createdAt).toLocaleDateString(i18n.language)
    : "-";

  return (
    <div id="sqw-popup-root">
      <div className="sqw-popup">
        {/* ---------- HEADER ---------- */}
        <div className="sqw-header-top">
          <button className={`sqw-fav ${fav ? "is-on" : ""}`} onClick={handleFav}>
            <span className="material-symbols-outlined">favorite</span>
          </button>

          <div className="sqw-top-title">
            {L.owner || "ข้อมูลที่ดิน"}
          </div>

          <button className="sqw-x" onClick={onClose}>×</button>
        </div>

        {/* ---------- META (DATE & VIEWS) ---------- */}
        <div className="sqw-meta-row">
          <div className="sqw-meta-item">
            <span className="material-symbols-outlined">schedule</span>
            {t("postedDate", { date: postedDate })}
          </div>

          <div className="sqw-meta-item">
            <span className="material-symbols-outlined">visibility</span>
            {displayViews} เข้าชม
          </div>
        </div>
      <div className="sqw-main-box">

        {/* IMAGE */}
        <div className="sqw-image-section">
          <div className="sqw-image-label">
            {t("section.images", "รูปภาพและสิ่งปลูกสร้าง")}
          </div>

          <div className="sqw-slider-container">
            {L.images?.length > 0 ? (
              <ImageSlider images={L.images} />
            ) : (
              <div className="sqw-no-img">{tCommon("noImage")}</div>
            )}
          </div>
        </div>

        {/* PRICE */}
        <div className="sqw-price-block">
          <div className="sqw-main-price">
            ฿ {L.totalPrice?.toLocaleString() || "-"}
          </div>
          <div className="sqw-sub-price">
            {t("price.perSqw")}: ฿{" "}
            {L.pricePerWa?.toLocaleString() ??
              L.price?.toLocaleString() ??
              "-"}
          </div>
        </div>

        {/* GRID */}
        <div className="sqw-info-grid">
          <div className="sqw-info-item">
            <div className="label">{t("field.size")}</div>
            <div className="value">
              {L.area || "-"} {t("unit.sqw")}
            </div>
          </div>

          <div className="sqw-info-item">
            <div className="label">{t("field.rnw")}</div>
            <div className="value">{L.raw || "-"}</div>
          </div>
        </div>

      </div>   


      {/* CONTACT SECTION */}
      <div className="sqw-contact-section">
        <div className="sqw-h">{t("section.contact")}</div>

        {CONTACT_FIELDS.map((f) => (
          <div className="sqw-contact-row" key={f.key}>
            <span className="c-label">{tCommon(f.label)}</span>
            <span className="material-symbols-outlined c-icon">
              {f.icon}
            </span>
            <span className="c-value">
              {showValue(f.key, L[f.key], f.mask)}
            </span>
          </div>
        ))}
      </div>

        {/* ---------- ACTIONS ---------- */}
      <div className="sqw-actions">
        {isMember ? (
          <MemberActions
            quotaUsed={quotaUsed}
            onChatSeller={() =>
              onChatSeller?.({
                uid: L.contactUid,
                name: L.owner
              })
            }
            onUnlockAll={() => onUnlockAll?.(L.id)}
          />
        ) : (
          <GuestActions
            onChatSeller={() =>
              onChatSeller?.({
                uid: L.contactUid,
                name: L.owner
              })
            }
            onOpenUnlockPicker={() => onOpenUnlockPicker?.(L.id)}
          />
        )}
      </div>
        <button
          className="btn-broadcast-heavy"
          onClick={() => onBroadcast?.(L)}
        >
          <span className="material-symbols-outlined">campaign</span>
          broadcast
        </button>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="sqw-box">
      <div className="sqw-box-k">{label}</div>
      <div className="sqw-box-v">{value}</div>
    </div>
  );
}

function ImageSlider({ images = [] }) {
  const [i, setI] = useState(0)
  const [startX, setStartX] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)

  if (!images.length) return null

  const prev = () => setI(v => v === 0 ? images.length - 1 : v - 1)
  const next = () => setI(v => v === images.length - 1 ? 0 : v + 1)

  // swipe support
  const onTouchStart = e => setStartX(e.touches[0].clientX)

  const onTouchEnd = e => {
    if (startX == null) return
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
    setStartX(null)
  }

  // keyboard support
  useEffect(()=>{
    const key = e=>{
      if(e.key==="ArrowRight") next()
      if(e.key==="ArrowLeft") prev()
      if(e.key==="Escape") setFullscreen(false)
    }
    window.addEventListener("keydown",key)
    return ()=>window.removeEventListener("keydown",key)
  },[])

  return (
    <>
      <div
        className="sqw-slider"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[i]}
          className="sqw-slide-img"
          onClick={()=>setFullscreen(true)}
        />

        {images.length > 1 && (
          <>
            <button className="sqw-arrow left" onClick={prev}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <button className="sqw-arrow right" onClick={next}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </>
        )}
      </div>

      {/* fullscreen modal */}
      {fullscreen && (
        <div className="sqw-full" onClick={()=>setFullscreen(false)}>
          <img src={images[i]}/>
        </div>
      )}
    </>
  )
}

