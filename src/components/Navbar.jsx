import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { readFavorites, subscribeFavoritesChanged } from "../utils/favorites";
import { useAuth } from "../auth/AuthProvider";
import { changeLanguage, getCurrentLanguage } from "../i18n/changeLanguage";

const CART_KEY = "sqw_cart_v1";
const DEFAULT_MODE = "buy";

function readCartCount() {
  try {
    const arr = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

export default function Navbar() {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();
  const navigate = useNavigate();

  const { me, logout } = useAuth();
  const role = me?.role;
  const isLoggedIn = !!me;
  const isAdmin = useMemo(()=> role === "admin",[role]);

  const [cartCount, setCartCount] = useState(readCartCount);
  const [favCount, setFavCount] = useState(() => readFavorites().length);

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const [modeOpen, setModeOpen] = useState(false);
  const modeRef = useRef(null);

  const currentLang = i18n.language || getCurrentLanguage();

  // cart sync
  useEffect(() => {
    const onChanged = () => setCartCount(readCartCount());
    window.addEventListener("sqw-cart-changed", onChanged);
    window.addEventListener("storage", onChanged);
    return () => {
      window.removeEventListener("sqw-cart-changed", onChanged);
      window.removeEventListener("storage", onChanged);
    };
  }, []);

  // favorites sync
  useEffect(() => {
    setFavCount(readFavorites().length);
    const unsub = subscribeFavoritesChanged(() =>
      setFavCount(readFavorites().length)
    );
    return unsub;
  }, []);

  // close dropdowns on outside click (merged)
  useEffect(()=>{
    const onClick = e => {
      if (!e.target) return;

      if (ref.current && !ref.current.contains(e.target))
        setOpen(false);

      if (modeRef.current && !modeRef.current.contains(e.target))
        setModeOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return ()=> document.removeEventListener("mousedown", onClick);
  },[]);

  useEffect(()=>{
    setOpen(false);
    setModeOpen(false);
  },[location.pathname]);

  useEffect(()=>{
    const esc = e=>{
      if(e.key==="Escape"){
        setOpen(false);
        setModeOpen(false);
      }
    };
    window.addEventListener("keydown",esc);
    return ()=>window.removeEventListener("keydown",esc);
  },[]);

  const go = useCallback(
    (to) => {
      setOpen(false);
      navigate(to);
    },
    [navigate]
  );

  const isMap = useMemo(
    () => location.pathname.startsWith("/map"),
    [location.pathname]
  );

  const currentMode = useMemo(() => {
    const sp = new URLSearchParams(location.search || "");
    return sp.get("mode") || DEFAULT_MODE;
  }, [location.search]);


  // MODE LABEL (i18n)
  const modeLabel = useMemo(() => {
    if (!isMap) return "";
    const sp = new URLSearchParams(location.search || "");
    const mode = sp.get("mode") || DEFAULT_MODE;
    return t(`nav.mode.${mode}`);
  }, [isMap, location.search, t]);

  const avatarLetter = useMemo(
    () => (me?.name?.charAt(0) || "U").toUpperCase(),
    [me?.name]
  );

  const changeMode = (mode) => {
    const sp = new URLSearchParams(location.search || "");
    sp.set("mode", mode);

    navigate(`${location.pathname}?${sp.toString()}`, {
      replace: true
    });

    setModeOpen(false);
  };

  return (
    <header className={`nav ${location.pathname === "/" || location.pathname === "/news" || location.pathname === "/contact" ? "nav-dark" : "nav-light"}`}>
      <Link to="/" className="nav-logo">SQW</Link>

      {isMap && (
        <div className="nav-mode" ref={modeRef}>
          <button
            type="button"
            className="nav-mode-pill clickable"
            onClick={() => setModeOpen(v => !v)}
            aria-expanded={modeOpen}
          >
            {modeLabel}
            <span className="chevron">▾</span>
          </button>

          {modeOpen && (
            <div className="nav-mode-menu">
              <button
                className={currentMode === "buy" ? "active" : ""}
                onClick={() => changeMode("buy")}
              >
                {t("nav.mode.buy")}
              </button>

              <button
                className={currentMode === "sell" ? "active" : ""}
                onClick={() => changeMode("sell")}
              >
                {t("nav.mode.sell")}
              </button>

              <button
                className={currentMode === "eia" ? "active" : ""}
                onClick={() => changeMode("eia")}
              >
                {t("nav.mode.eia")}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="nav-right">
        <NavLink to="/" className="nav-item">
          {t("nav.home")}
        </NavLink>

        <NavLink to="/news" className="nav-item">
          {t("nav.news")}
        </NavLink>

        <a href="#contact" className="nav-item">
          {t("nav.contact")}
        </a>

        {/* Notification */}
        {isLoggedIn && (
          <button className="nav-bell">
            <span className="material-symbols-outlined">notifications</span>
            <span className="bell-dot"></span>
          </button>
        )}

        <div className="nav-user-group ">
          {/* Profile / Auth */}
          {isLoggedIn ? (
            <div className="nav-profile" ref={ref}>
              <button
                className="nav-profile-trigger"
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
              >
                <div className="nav-avatar">
                  {me?.photoURL
                    ? <img src={me.photoURL} alt="avatar" />
                    : <span>{avatarLetter}</span>
                  }
                </div>

                <span className="nav-username">{me?.name}</span>

                <span className="material-symbols-outlined nav-chevron">
                  expand_more
                </span>
              </button>

              {open && (
                <div className="nav-profile-menu">
                  <div className="nav-profile-name">{me?.name}</div>

                  <button onClick={() => go("/profile")}>{t("nav.profile")}</button>
                  <button onClick={() => go("/profile?tab=fav")}>
                    {t("nav.favorites")} {favCount > 0 && `(${favCount})`}
                  </button>
                  <button onClick={() => go("/profile?tab=purchase")}>
                    {t("nav.purchases")}
                  </button>

                  {isAdmin && (
                    <>
                      <div className="nav-profile-divider" />
                      <div className="nav-profile-section">
                        <div className="nav-profile-section-title">
                          <ShieldCheck size={16} />
                          {t("nav.admin.section")}
                        </div>

                        <button onClick={() => go("/admin?tab=dashboard")}>
                          {t("nav.admin.dashboard")}
                        </button>
                        <button onClick={() => go("/admin?tab=broadcast")}>
                          {t("nav.admin.broadcast")}
                        </button>
                        <button onClick={() => go("/admin?tab=lands")}>
                          {t("nav.admin.lands")}
                        </button>
                      </div>
                    </>
                  )}

                  <div className="nav-profile-divider" />
                  <button
                    className="danger"
                    onClick={()=>{
                      setOpen(false);
                      setModeOpen(false);
                      logout();
                      navigate("/");
                    }}
                  >
                    {t("nav.logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth">
              <button
                className="nav-auth-pill"
                onClick={() => navigate("/login")}
              >
                {t("nav.login")} / {t("nav.signup")}
              </button>
            </div>
          )}

          {/* Cart */}
            {isLoggedIn && (
              <Link to="/cart" className="cart-btn">
                <span className="material-symbols-outlined cart-icon">
                  shopping_cart
                </span>

                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            )}
        </div>

        {/* Language Switch */}
        <div className="nav-lang">
          {/*<span className="material-symbols-outlined lang-icon">language</span>*/}

          <div className="lang-pill">
            <button
              className={currentLang === "th" ? "active" : ""}
              onClick={() => changeLanguage("th")}
            >
              TH
            </button>

            <span className="sep">|</span>

            <button
              className={currentLang === "en" ? "active" : ""}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}