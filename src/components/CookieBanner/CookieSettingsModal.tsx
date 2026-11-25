import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import "./CookieSettingsModal.css";

import "../../pages/Home.css";
import "../../index.css";

import Arrow from '../../../public/Assets/Common-Right-Arrow.svg';
import Close from '../../../public/Assets/Common-Close.svg';

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieSettingsModalProps = {
  isOpen: boolean;
  preferences: CookiePreferences;
  onChange: (value: CookiePreferences) => void;
  onSave: () => void;
  onClose: () => void;
};

function CookieSettingsModal({
  isOpen,
  preferences,
  onChange,
  onSave,
  onClose,
}: CookieSettingsModalProps) {

  const [expandedTab, setExpandedTab] = useState<
    "necessary" | "analytics" | "marketing" | null
  >(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleExpanded = (
    key: "necessary" | "analytics" | "marketing"
  ) => {
    setExpandedTab((prev) => (prev === key ? null : key));
  };

  const togglePreference = (
    key: "analytics" | "marketing"
  ) => {
    onChange({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  const Switch = ({
    checked,
    disabled = false,
    onClick,
  }: {
    checked: boolean;
    disabled?: boolean;
    onClick?: () => void;
  }) => (
    <button type="button" className={`cookie-switch ${checked ? "cookie-switch--on" : ""}`} role="switch" aria-checked={checked} disabled={disabled} onClick={onClick}>
      <span className="cookie-switch-thumb" />
    </button>
  );

  return createPortal(
    <div
      className="cookie-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
        <img className="cookie-modal-close" src={Close} alt="x" onClick={() => onClose()}/>
        
        <div className="cookie-modal-header">
          <h2 id="cookie-modal-title">Настройка cookie</h2>

          <p>
            Cookie, которые необходимы для корректной работы сайта, включены<br/>
            автоматически. Остальные данные можно настроить
          </p>
        </div>

        <div className="cookie-modal-content">

          {/* Необходимые cookie */}
          <div className={`cookie-category ${expandedTab === "necessary" ? "cookie-category--expanded" : ""}`}>
            <button
              type="button"
              className={`cookie-category-arrow ${expandedTab === "necessary" ? "cookie-category-arrow--open" : ""}`}
              onClick={() => toggleExpanded("necessary")}
              aria-expanded={expandedTab === "necessary"}
              aria-label="Раскрыть описание необходимых cookie"
            >
              <img src={Arrow} />
            </button>

            <div className="cookie-category-info">
              <h3>Необходимые cookie</h3>
              <span className="cookie-status cookie-status--default">по умолчанию</span>
            </div>

            {expandedTab === "necessary" && (
              <p className="cookie-category-description">
                Эти cookie необходимы для корректной работы сайта.
                Они обеспечивают основные функции, например навигацию
                по страницам и доступ к защищённым разделам сайта.
                Без них сайт не сможет работать должным образом.
              </p>
            )}
          </div>

          {/* Аналитические cookie */}
          <div className={`cookie-category ${expandedTab === "analytics" ? "cookie-category--expanded" : ""}`}>
            <button
              type="button"
              className={`cookie-category-arrow ${expandedTab === "analytics" ? "cookie-category-arrow--open" : ""}`}
              onClick={() => toggleExpanded("analytics")}
              aria-expanded={expandedTab === "analytics"}
              aria-label="Раскрыть описание аналитических cookie"
            >
              <img src={Arrow} />
            </button>

            <div className="cookie-category-info">
              <h3>Cookie для аналитики</h3>

              <div className="cookie-category-control">
                <span className={`cookie-status ${preferences.analytics ? "cookie-status--enabled" : "cookie-status--disabled"}`}>
                  {preferences.analytics ? "включены" : "выключены"}
                </span>

                <Switch checked={preferences.analytics} onClick={() => togglePreference("analytics")}/>
              </div>
            </div>

            {expandedTab === "analytics" && (
              <p className="cookie-category-description">
                Аналитические cookie помогают нам понимать, как
                посетители взаимодействуют с сайтом: какие страницы
                открывают, сколько времени проводят на сайте и
                какие функции используют. Эта информация позволяет
                улучшать работу и удобство сайта.
              </p>
            )}
          </div>

          {/* Рекламные и маркетинговые cookie */}
          <div className={`cookie-category ${expandedTab === "marketing" ? "cookie-category--expanded" : ""}`}>
            <button
              type="button"
              className={`cookie-category-arrow ${expandedTab === "marketing" ? "cookie-category-arrow--open" : ""}`}
              onClick={() => toggleExpanded("marketing")}
              aria-expanded={expandedTab === "marketing"}
              aria-label="Раскрыть описание рекламных cookie"
            >
              <img src={Arrow} />
            </button>

            <div className="cookie-category-info">
              <h3>Рекламные и маркетинговые cookie</h3>

              <div className="cookie-category-control">
                <span className={`cookie-status ${preferences.marketing ? "cookie-status--enabled" : "cookie-status--disabled" }`}>
                  {preferences.marketing ? "включены" : "выключены"}
                </span>

                <Switch checked={preferences.marketing} onClick={() => togglePreference("marketing")}/>
              </div>
            </div>

            {expandedTab === "marketing" && (
              <p className="cookie-category-description">
                Эти файлы помогают показывать вам рекламу, которая
                действительно может быть вам интересна. Они запоминают,
                какие страницы вы посещали на нашем сайте, и позволяют
                рекламным сетям (например, Яндексу или VK) формировать
                персональные предложения на других площадках. Также
                они помогают нам оценивать эффективность наших рекламных
                кампаний и не показывать вам одно и то же объявление
                слишком часто. Если вы отключите эти файлы, рекламы
                в интернете меньше не станет, но она перестанет
                соответствовать вашим интересам.
              </p>
            )}
          </div>

        </div>

        <button type="button" className="cookie-modal-save" onClick={onSave}>
          cохранить
        </button>
      </div>
    </div>,
    document.body
  );
}

export default CookieSettingsModal;
