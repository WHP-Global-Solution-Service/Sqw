import React from "react";
import { useTranslation } from "react-i18next";
import "./broadcast.css";

export default function BroadcastQuickActions({
  land,
  role,
  mode,
  sellIntent,
  onAdminClick,
  onConsignorClick,
}) {
  if (!land?.id) return null;

  const { t } = useTranslation("broadcast");

  const isAdmin = role === "admin";
  const isAgent = role === "agent";
  const isLandlord = role === "landlord";

  const isConsignment = mode === "sell" && sellIntent === "seller";

  return (
    <div className="bc-quick">
      {(isAdmin || isAgent || isLandlord) && (
        <button
          className="bc-quick-btn"
          type="button"
          onClick={onAdminClick}
          title={
            isAdmin
              ? t("quick.adminTitle")
              : isAgent
              ? t("quick.agentTitle")
              : t("quick.landlordTitle")
          }
        >
          📣{" "}
          {isAdmin
            ? t("quick.adminLabel")
            : isAgent
            ? t("quick.agentLabel")
            : t("quick.landlordLabel")}
        </button>
      )}

      {isConsignment && !isAdmin && !isAgent && !isLandlord && (
        <button
          className="bc-quick-btn hot"
          type="button"
          onClick={onConsignorClick}
          title={t("quick.consignorTitle")}
        >
          🔥 {t("quick.consignorLabel")}
        </button>
      )}
    </div>
  );
}
