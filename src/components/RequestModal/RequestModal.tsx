
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { FormEvent } from "react";

import "./RequestModal.css";

type RequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    phone: string;
    personalData: boolean;
    advertising: boolean;
  }) => void;
};

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

function RequestModal({
  isOpen,
  onClose,
  onSubmit,
}: RequestModalProps) {
  const [phone, setPhone] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;
    const cursor = input.selectionStart ?? input.value.length;

    const digitsBefore = input.value
      .slice(0, cursor)
      .replace(/\D/g, "").length;

    const formatted = formatPhone(input.value);

    setPhone(formatted);

    requestAnimationFrame(() => {
      if (phoneRef.current) {
        const newCursor = getPhoneCaretPosition(
          formatted,
          digitsBefore
        );

        phoneRef.current.setSelectionRange(newCursor, newCursor);
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit?.({
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      personalData: formData.get("personalData") === "on",
      advertising: formData.get("advertising") === "on",
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="request-modal-overlay" onMouseDown={onClose}>
      <div className="request-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="request-modal-title">
        <div className="request-modal-header">
          <span className="request-modal-close-placeholder" />

          <h2 id="request-modal-title">
            Создайте заявку и мы свяжемся
            <br/>с вами
          </h2>

          <button type="button" className="request-modal-close" onClick={onClose} aria-label="Закрыть окно"/>
        </div>

        <form className="request-modal-form" onSubmit={handleSubmit}>
          <div className="request-modal-fields">
            <label className="request-modal-field">
              <span>имя</span>
              <input type="text" name="name" placeholder="Ваше имя" required/>
            </label>

            <label className="request-modal-field">
              <span>телефон</span>

              <div className="request-modal-phone">
                <span className="request-modal-flag" aria-hidden="true">🇷🇺</span>
                <input ref={phoneRef} type="tel" name="phone" inputMode="numeric" autoComplete="tel" placeholder="+7 (999) 999 99 99" value={phone} onChange={handlePhoneChange} required/>
              </div>
            </label>
          </div>

          <div className="request-modal-consents">
            <label className="request-modal-agreement">
              <input type="checkbox" name="personalData" required />
              <span>
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy-policy">
                  политикой конфиденциальности<br/>
                  и политикой обработки персональных данных
                </a>
              </span>
            </label>

            <label className="request-modal-agreement">
              <input type="checkbox" name="advertising" />
              <span>
                Нажимая кнопку, вы также даете согласие на получение{" "}<br/>
                <a href="/privacy-policy">
                  рекламных и информационных рассылок
                </a>
              </span>
            </label>
          </div>

          <div className="request-modal-submit">
            <button type="submit">заказать звонок</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default RequestModal;
