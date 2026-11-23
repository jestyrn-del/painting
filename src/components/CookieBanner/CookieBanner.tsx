import { useEffect, useState } from "react";

import CookieSettingsModal, {
  type CookiePreferences,
} from "./CookieSettingsModal";

import "./CookieBanner.css";

const STORAGE_KEY = "cookie-consent";

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(STORAGE_KEY);

    if (savedConsent) {
      try {
        const saved = JSON.parse(savedConsent) as Partial<CookiePreferences>;

        setPreferences({
          necessary: true,
          analytics: saved.analytics === true,
          marketing: saved.marketing === true,
        });

        return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => window.clearTimeout(timer);
  }, []);

  const savePreferences = (value: CookiePreferences) => {
    const updatedPreferences = {
      ...value,
      necessary: true,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedPreferences)
    );

    setPreferences(updatedPreferences);
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  return (
    <>
      {/* Первоначальный баннер */}
      <div
        className={`cookie-banner ${
          isVisible ? "cookie-banner--visible" : ""
        }`}
      >
        <div className="cookie-banner-content">
          <h3>
            Для эффективной работы сайта мы используем cookie
          </h3>

          <button
            className="cookie-settings-link"
            type="button"
            onClick={() => setShowSettings(true)}
          >
            Настроить cookie <span>⟶</span>
          </button>
        </div>

        <div className="cookie-banner-actions">
          <button
            className="cookie-button cookie-button--dark"
            type="button"
            onClick={rejectAll}
          >
            закрыть
          </button>

          <button
            className="cookie-button cookie-button--yellow"
            type="button"
            onClick={acceptAll}
          >
            принять все
          </button>
        </div>
      </div>

      {/* Отдельное модальное окно настроек */}
      <CookieSettingsModal
        isOpen={showSettings}
        preferences={preferences}
        onChange={setPreferences}
        onSave={() => savePreferences(preferences)}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}

export default CookieBanner;
