import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import type { FormEvent } from "react";

import "./ProductionVisitModal.css";

import "../../pages/Home.css";
import "../../index.css";

import Close from "../../../public/Assets/Common-Close.svg";


function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (!digits.length) return "";

  let result = "+7";

  if (digits.length > 0) result += " (" + digits.slice(0, 3);
  if (digits.length >= 3) result += ") " + digits.slice(3, 6);
  if (digits.length >= 7) result += " " + digits.slice(6, 8);
  if (digits.length >= 9) result += " " + digits.slice(8, 10);

  return result;
}

function getPhoneCaretPosition(value: string, digitsBefore: number) {
  if (digitsBefore === 0) return 2;

  let digits = 0;

  for (let i = 0; i < value.length; i++) {
    if (/\d/.test(value[i])) {
      digits++;

      if (digits === digitsBefore + 1) {
        return i + 1;
      }
    }
  }

  return value.length;
}



type ProductionVisitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    phone: string;
    date: string;
    time: string;
    personalData: boolean;
    advertising: boolean;
  }) => void;
};

function ProductionVisitModal({ isOpen, onClose, onSubmit,}: ProductionVisitModalProps) {
  const [phone, setPhone] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const cursor = input.selectionStart ?? input.value.length;

    const digitsBefore = input.value
      .slice(0, cursor)
      .replace(/\D/g, "").length;

    const formatted = formatPhone(input.value);

    setPhone(formatted);

    requestAnimationFrame(() => {
      if (phoneRef.current) {
        const newCursor = getPhoneCaretPosition(formatted, digitsBefore);
        phoneRef.current.setSelectionRange(newCursor, newCursor);
      }
    });
  };

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit?.({
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      personalData: formData.get("personalData") === "on",
      advertising: formData.get("advertising") === "on",
    });
  };

  return createPortal(
    <div
      className="visit-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="visit-modal" role="dialog" aria-modal="true" aria-labelledby="visit-modal-title">
        <img className="visit-modal-close" src={Close} alt="x" onClick={onClose}/>

        <div className="visit-modal-header">
          <h2 id="visit-modal-title">Приехать на производство</h2>

          <p>
            Заполните данные и мы согласуем посещение нашего производства
          </p>
        </div>

        <form className="visit-modal-content" onSubmit={handleSubmit}>

          <div className="visit-form-row">
            <label className="visit-form-field">
              <span>имя</span>
              <input type="text" name="name" placeholder="Ваше имя" required/>
            </label>
            
            <label className="visit-form-field">
              <span>телефон</span>

              <div className="request-modal-phone">
                <span className="request-modal-flag" aria-hidden="true">🇷🇺</span>
                <input ref={phoneRef} type="tel" name="phone" inputMode="numeric" autoComplete="tel" placeholder="+7 (999) 999 99 99" value={phone} onChange={handlePhoneChange} required/>
              </div>
            </label>
          </div>

          <div className="visit-form-row">
            <label className="visit-form-field">
              <span>дата</span>
              <input type="date" name="date" min={new Date().toISOString().split("T")[0]} required/>
            </label>

            <div className="visit-form-field">
              <span>время</span>

              <div className="visit-time-options">
                <label>
                  <input type="radio" name="time" value="morning" defaultChecked/>
                  <span>
                    первая половина дня<br/>
                    (с 10:00 до 14:00)
                  </span>
                </label>

                <label>
                  <input type="radio" name="time" value="afternoon"/>
                  <span>
                    вторая половина дня<br/>
                    (с 14:00 до 18:00)
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="visit-modal-consents">
          <label className="visit-modal-agreement">
            <input type="checkbox" name="personalData" required/>
            <span>
              <p>
                Нажимая кнопку, вы соглашаетесь{" "}
                <a href="/privacy-policy">
                  с политикой<br />
                  конфиденциальности и политикой обработки<br />
                  персональных данных
                </a>
              </p>
            </span>
          </label>

          <label className="visit-modal-agreement">
            <input type="checkbox" name="advertising"/>
            <span>
              <p>
                Нажимая кнопку, вы также даете{" "}
                <a href="/privacy-policy">
                согласие
                </a>
                <br />
                на получение рекламных и информационных рассылок
              </p>
            </span>
          </label>
          </div>

          <button type="submit" className="visit-modal-submit">
            отправить данные
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default ProductionVisitModal;