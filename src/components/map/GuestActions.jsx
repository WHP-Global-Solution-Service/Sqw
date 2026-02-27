import { useTranslation } from "react-i18next";

export default function GuestActions({ onChatSeller, onOpenUnlockPicker }) {
  const { t } = useTranslation("land");

  return (
    <>
      <button className="sqw-btn" type="button" onClick={onChatSeller}>
        <span className="material-symbols-outlined">forum</span>
        {t("action.chatSeller") || "แชทกับผู้ขาย"}
      </button>

      <button className="sqw-btn sqw-pay-btn" type="button" onClick={onOpenUnlockPicker}>
        <span className="material-symbols-outlined">lock_open</span>
        {t("action.unlock") || "ปลดล็อคข้อมูล"}
      </button>
    </>
  );
}