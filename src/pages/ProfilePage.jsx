import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/profile.css";

import { readFavorites, removeFavorite, subscribeFavoritesChanged } from "../utils/favorites";
import { readPurchases, removePurchase, subscribePurchasesChanged } from "../utils/purchases";
import { readAllLands, removeLand, subscribeLandsChanged } from "../utils/landsLocal";
import { useAuth } from "../auth/AuthProvider";

/* ---------------- QUERY ---------------- */

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search || ""), [search]);
}

/* ---------------- TABS ---------------- */

const VALID_TABS = ["info", "fav", "purchase", "posts", "settings"];

/* ========================================================= */

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation("profile");
  const q = useQuery();
  const tab = (q.get("tab") || "info").toLowerCase();

  const { me, loading } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editOpen, setEditOpen] = useState(false);

  /* ---------------- AUTH GUARD ---------------- */

  useEffect(() => {
    if (!loading && !me) navigate("/login");
  }, [loading, me, navigate]);

  /* ---------------- TAB GUARD ---------------- */

  useEffect(() => {
    if (!VALID_TABS.includes(tab)) {
      navigate("/profile?tab=info", { replace: true });
    }
  }, [tab, navigate]);

  /* ---------------- DATA LOADERS ---------------- */

  useEffect(() => {
    setFavorites(readFavorites());
    return subscribeFavoritesChanged(() => {
      setFavorites(readFavorites());
    });
  }, []);

  useEffect(() => {
    setPurchases(readPurchases());
    return subscribePurchasesChanged(() => {
      setPurchases(readPurchases());
    });
  }, []);

  useEffect(() => {
    const load = () =>
      setPosts(readAllLands().filter(p => p.ownerId === me?.uid));

    load();
    return subscribeLandsChanged(load);
  }, [me]);

  /* ---------------- NAV ---------------- */

  const goTab = (name) => navigate(`/profile?tab=${name}`);

  /* ---------------- DELETE ---------------- */

  const deletePost = (id) => {
    if (!window.confirm(t("posts.confirmDelete"))) return;
    removeLand(id);
  };

  /* ---------------- LOADING ---------------- */

  if (loading)
    return <div className="center-screen">Loading...</div>;

  /* ========================================================= */

  return (
    <div className="profile-page">
      <div className="profile-container">

        <ProfileHeader me={me} onEdit={()=>setEditOpen(true)} t={t} />

          {editOpen && (
            <EditProfileModal
              me={me}
              onClose={()=>setEditOpen(false)}
            />
          )}

        <Stats
          posts={posts}
          favorites={favorites}
          purchases={purchases}
          role={me?.role}
          t={t}
        />

        <div className="profile-grid">

          <Sidebar tab={tab} goTab={goTab} t={t} role={me?.role}/>

          <Content
            tab={tab}
            posts={posts}
            favorites={favorites}
            purchases={purchases}
            deletePost={deletePost}
            navigate={navigate}
            removeFavorite={removeFavorite}
            removePurchase={removePurchase}
            t={t}
            me={me}
          />

        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ===================== COMPONENTS ======================== */
/* ========================================================= */

function ProfileHeader({ me, onEdit, t }) {
  const name = me?.name || me?.email || t("header.guest");
  const firstLetter = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="profile-header">

      {/* avatar */}
      <div className="profile-avatar">
        {firstLetter}
      </div>

      {/* text */}
      <div className="profile-meta">
        <div className="profile-name">
          {name}
        </div>

        <div className="profile-sub">
          {t("header.member")}
        </div>
      </div>

      {/* button */}
      <button
        className="ds-btn ds-btn-outline"
        onClick={onEdit}
      >
        {t("header.editProfile")}
      </button>

    </div>
  );
}

/* ---------------- STATS ---------------- */

function Stats({ posts, favorites, purchases, t, role }) {

  const items = [];

  if (["agent","landlord"].includes(role))
    items.push({ label: t("stats.posts"), value: posts.length });

  items.push({ label: t("stats.favorites"), value: favorites.length });
  items.push({ label: t("stats.purchases"), value: purchases.length });

  return (
    <div
      className="profile-stats"
      data-count={items.length}
    >
      {items.map((x,i)=>(
        <Stat key={i} value={x.value} label={x.label}/>
      ))}
    </div>
  );
}

const Stat = ({ value, label }) => (
  <div className="stat-card">
    <div className="stat-num">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

/* ---------------- SIDEBAR ---------------- */

function Sidebar({ tab, goTab, t, role }) {
  const items = [
    ["info", t("menu.info")],
    ["fav", t("menu.favorites")],
    ["purchase", t("menu.purchases")],

    ...( ["agent","landlord"].includes(role)
      ? [["posts", t("menu.posts")]]
      : []
    ),

    ["settings", t("menu.settings")]
  ];

  return (
    <aside className="profile-side">
      <div className="side-title">{t("menu.title")}</div>

      {items.map(([key, label]) => (
        <button
          key={key}
          className={`side-item ${tab === key ? "active" : ""}`}
          onClick={() => goTab(key)}
        >
          {label}
        </button>
      ))}
    </aside>
  );
}

/* ---------------- CONTENT SWITCH ---------------- */

function Content(props) {
  switch (props.tab) {
    case "posts":
      return <PostsTab {...props} />;
    case "fav":
      return <FavoritesTab {...props} />;
    case "purchase":
      return <PurchasesTab {...props} />;
    case "info":
      return <InfoTab {...props} />;
    default:
      return <ComingSoon t={props.t} />;
  }
}

/* ========================================================= */
/* ======================= TABS ============================ */
/* ========================================================= */

function PostsTab({ posts, t, deletePost, navigate }) {
  return (
    <section className="profile-content">
      <Header title={t("posts.title")} sub={t("posts.subtitle")} count={posts.length} />

      {posts.length === 0 ? (
        <Empty
          title={t("posts.emptyTitle")}
          sub={t("posts.emptySub")}
          btn={t("posts.goMapSell")}
          onClick={() => navigate("/map?mode=buy")}
        />
      ) : (
        <div className="purchase-grid">
          {posts.map(p => (
            <div key={p.id} className="purchase-card">

              <div className="purchase-top">
                <div className="purchase-title">
                  {p.owner || p.agent || t("common.unknown")}
                </div>
              </div>

              <Row label={t("posts.size")} value={Number(p.size || 0).toLocaleString()} />
              <Row label={t("posts.price")} value={Number(p.totalPrice || 0).toLocaleString()} />
              <Row label={t("posts.phone")} value={p.phone || "-"} />

              <div className="fav-actions fav-actions--row fav-actions--lg">
                <button className="ds-btn ds-btn-outline" onClick={()=>navigate(`/map?mode=${p.mode || "buy"}&focus=${p.id}`)}>
                  {t("posts.viewMap")}
                </button>

                <button className="danger-btn" onClick={()=>deletePost(p.id)}>
                  {t("posts.delete")}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------------- FAVORITES ---------------- */

function FavoritesTab({ favorites, removeFavorite, t, navigate }) {
  if (!favorites.length) {
    return (
      <section className="profile-content">
        <Header
          title={t("favorites.title")}
        />
        <Empty
          title={t("favorites.emptyTitle")}
          sub={t("favorites.emptySub")}
        />
      </section>
    );
  }

  return (
    <section className="profile-content">
      <Header
        title={t("favorites.title")}
      />

      <div className="fav-grid">

        {favorites.map(f => (
          <div key={f.id} className="fav-land-card">

            {/* delete */}
            <button
              className="fav-delete-icon"
              onClick={()=>{
                if(window.confirm(t("favorites.confirmRemove")))
                  removeFavorite(f.id)
              }}
            >
              ✕
            </button>

            {/* image */}
            <img
              src={f.image || "/placeholder.jpg"}
              className="fav-land-img"
            />

            {/* info */}
            <div className="fav-land-info">

              <div className="fav-land-title">
                {f.title || f.owner || t("common.unknown")}
              </div>

              <div className="fav-land-desc">
                {f.location || "-"}
              </div>

              <div className="fav-land-meta">
                <span>{t("posts.size")} {f.size ?? "-"}</span>
                <span>{t("posts.price")} {Number(f.totalPrice || 0).toLocaleString()}</span>
              </div>

              <button
                className="fav-land-link"
                onClick={()=>navigate(`/map?mode=${f.mode || "buy"}&focus=${f.id}`)}
              >
                {t("posts.viewMap")} →
              </button>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

/* ---------------- PURCHASES ---------------- */

function PurchasesTab({ purchases, removePurchase, t }) {
  return (
    <section className="profile-content">

      <Header
        title={t("purchases.title")}
      />

      <div className="purchase-table">

        {/* header row */}
        <div className="purchase-row purchase-head">
          <div></div>
          <div>{t("purchases.service")}</div>
          <div>{t("purchases.paidAt")}</div>
          <div>{t("purchases.status")}</div>
          <div>{t("purchases.qty")}</div>
          <div>{t("purchases.total")}</div>
          <div></div>
        </div>

        {/* rows */}
        {purchases.map(p => (
          <div key={p.id} className="purchase-row">

            {/* icon */}
            <div className="purchase-icon">
              <span className="material-symbols-outlined">
                receipt
              </span>
            </div>
            {/* service */}
            <div>{p.title || "-"}</div>

            {/* date */}
            <div>
              {p.paidAt
                ? new Date(p.paidAt).toLocaleDateString()
                : "-"}
            </div>

            {/* status */}
            <div>
              <span className={`badge ${p.status}`}>
                {p.status}
              </span>
            </div>

            {/* qty */}
            <div>{p.qty || 1}</div>

            {/* price */}
            <div>฿ {Number(p.totalPrice).toLocaleString()}</div>

            {/* view */}
            <div>
              <button
                className="icon-btn"
                onClick={()=>alert("view purchase")}
              >
                <span className="material-symbols-outlined">
                  visibility
                </span>
              </button>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

/* ---------------- INFO ---------------- */

function InfoTab({ me, t }) {
  const fields = [
    { label:t("info.name"), value:me?.name },
    { label:t("info.email"), value:me?.email },
    { label:t("info.phone"), value:me?.phone },
    { label:t("info.lineId"), value:me?.line_id },
    { label:t("info.status"), value:me?.role, isStatus:true }
  ];

  return (
    <section className="profile-content">
      <Header title={t("info.title")} sub={t("info.subtitle")} />

      <div className="info-card">
        {fields.map((f)=>(
          <Row key={f.label} label={f.label} value={f.value}/>
        ))}
      </div>
    </section>
  );
}


/* ========================================================= */
/* ================= SHARED UI ============================= */
/* ========================================================= */

const Header = ({ title, sub, count }) => (
  <div className="content-head">
    <div>
      <div className="content-title">{title}</div>
      <div className="content-sub">{sub}</div>
    </div>
    {count !== undefined && <div className="content-pill">{count}</div>}
  </div>
);

const Row = ({ label, value }) => {
  const isStatus = label === "สถานะ";

  return (
    <div className="fav-row">
      <span className="muted">{label}</span>

      {isStatus ? (
        <span className="badge badge-info">
          {value === "buyer" ? "สมาชิกทั่วไป" : value}
        </span>
      ) : (
        <b>{value || "-"}</b>
      )}
    </div>
  );
};

const Empty = ({ title, sub, btn, onClick }) => (
  <div className="empty-state">
    <div className="empty-title">{title}</div>
    <div className="empty-sub">{sub}</div>
    {btn && <button className="outline-btn" onClick={onClick}>{btn}</button>}
  </div>
);

const ComingSoon = ({ t }) => (
  <section className="profile-content">
    <Empty title={t("common.notReady")} sub={t("common.comingSoon")} />
  </section>
);

function EditProfileModal({ me, onClose }) {

  const [form,setForm] = useState({
    name: me.name || "",
    phone: me.phone || "",
    line_id: me.line_id || ""
  });

  const change = e =>
    setForm({...form,[e.target.name]:e.target.value});

  const save = ()=>{
    console.log("SAVE",form);
    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <div className="modal-header">
          Edit Profile
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">

          <input name="name" value={form.name} onChange={change}/>
          <input name="phone" value={form.phone} onChange={change}/>
          <input name="line_id" value={form.line_id} onChange={change}/>

        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={save}>Save</button>
        </div>

      </div>
    </div>
  );
}