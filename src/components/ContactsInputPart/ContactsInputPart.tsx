import { useState, useRef } from 'react';

import './ContactsInputPart.css';

import Arrow from '../../../public/Assets/Common-Right-Arrow-Dark.svg';

import DocumentAttached from '../../../public/Assets/document-attachment.svg';
import CloseButton from '../../../public/Assets/Common-Close-Dark.svg';
import AddButton from '../../../public/Assets/Common-Add.svg';

import Close from '../../../public/Assets/Common-Close.svg';

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

type ContactsInputProps = {
  direction: string;
  setDirection: (value: string) => void;
  equipmentType: string;
  setEquipmentType: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  showTitle?: boolean;
  onClose?: () => void;
};

function ContactsInput({
  direction,
  setDirection,
  equipmentType,
  setEquipmentType,
  phone,
  setPhone,
  showTitle = false,
  onClose
}: ContactsInputProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const showTypeSelector = direction === "Оборудование" || direction === "Продукция";

  const phoneRef = useRef<HTMLInputElement>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursor = input.selectionStart ?? input.value.length;

    const digitsBefore = input.value
      .slice(0, cursor)
      .replace(/\D/g, "").length;

    const hasCountryCode = /^[78]/.test(input.value.replace(/\D/g, ""));

    const localDigitsBefore = Math.max(
      0,
      digitsBefore - (hasCountryCode && digitsBefore > 0 ? 1 : 0)
    );

    const formatted = formatPhone(input.value);

    setPhone(formatted);

    requestAnimationFrame(() => {
      if (phoneRef.current) {
        const position = getPhoneCaretPosition(
          formatted,
          localDigitsBefore
        );

        phoneRef.current.setSelectionRange(position, position);
      }
    });
  };
  
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);

    setFiles((prev) => {
      const newFiles = selectedFiles.filter(
        (file) =>
          !prev.some(
            (item) =>
              item.name === file.name &&
              item.size === file.size &&
              item.lastModified === file.lastModified
          )
      );

      return [...prev, ...newFiles];
    });

    // Позволяет повторно выбрать тот же файл
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {showTitle && (
        <>
        <img className="contact-title-close" src={Close} alt="x" onClick={onClose}/>
        <h2 className="contact-title" style={{ marginBottom: "2.5vh" }}>
          {direction === "Покраска"
            ? "Пришлите чертёж или фото, и мы рассчитаем стоимость за 2 часа"
            : "Заполните данные и мы с вами свяжемся"}
        </h2>

        </>
      )}
      
      <form
        className="contact-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >

        <div className={`contact-fields-grid ${showTypeSelector ? "has-type-selector" : ""}`}>
          <label className="contact-field direction-field">
            <span>направление</span>
            <select
              value={direction}
              onChange={(e) => {
                setDirection(e.target.value);
                setEquipmentType("");
              }}
            >
              <option value="Покраска">Покраска</option>
              <option value="Оборудование">Оборудование</option>
              <option value="Продукция">Продукция</option>
              <option value="Другое">Другое</option>
            </select>
          </label>

          {showTypeSelector && (
            <label className="contact-field type-field">
              <span>
                {direction === "Оборудование" ? "тип оборудования" : "тип"}
              </span>

              <select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value)}
                required
              >
                {direction === "Оборудование" ? (
                  <>
                    <option>Камеры нанесения</option>
                    <option>Печи полимеризации</option>
                    <option>Линии порошковой окраски</option>
                  </>
                ) : (
                  <>
                    <option>Мебель</option>
                    <option>Металлоконструкции</option>
                    <option>Модульные здания</option>
                  </>
                )}
              </select>
            </label>
          )}

          <label className="contact-field phone-field">
            <span>телефон</span>
            <div className="phone-input-wrap">
              <span className="phone-flag" aria-hidden="true" />
              <input ref={phoneRef} type="tel" inputMode="numeric" autoComplete="tel" placeholder="+7 (999) 999 99 99" value={phone} onChange={handlePhoneChange} required />
            </div>
          </label>

          <label className="contact-field email-field">
            <span>e-mail</span>
            <input type="email" placeholder="Ваша почта" />
          </label>

          <label className="contact-field name-field">
            <span>имя</span>
            <input type="text" placeholder="Ваше имя" required />
          </label>
        </div>

        <label className="contact-field-full">
          <span>комментарий</span>
          <textarea placeholder="Напишите любые уточнения для расчёта" rows={3} />
        </label>

        <div className="contact-form-file">
          <span>прикрепить файлы (чертёж/фото/ведомость)</span>

          <div className={`contact-form-file-picker ${files.length > 0 ? "has-files" : ""}`}>
            {files.length === 0 ? (
              <label className="contact-file-empty">
                <span>добавить (DWG, PDF, JPG до 20 МБ)</span>

                <span className="contact-form-file-arrow">
                  <img src={Arrow} alt="" />
                </span>

                <input type="file" accept=".dwg,.pdf,.jpg,.jpeg,.png" multiple onChange={handleFilesChange}/>
              </label>
            ) : (
              <>
                <div className="contact-file-list">
                  {files.map((file, index) => (
                    <div className="contact-file-item" key={`${file.name}-${file.lastModified}-${index}`}>
                      <div className="contact-file-icon">
                        <img src={DocumentAttached} alt="" />
                      </div>

                      <span className="contact-file-name" title={file.name}>
                        {file.name}
                      </span>

                      <button className="contact-file-remove" type="button" onClick={() => removeFile(index)} aria-label={`Удалить ${file.name}`}>
                        <img src={CloseButton} alt="" />
                      </button>
                    </div>
                  ))}
                </div>

                <label className="contact-file-add">
                  <img src={AddButton} alt="Добавить файл" />
                  <input type="file" accept=".dwg,.pdf,.jpg,.jpeg,.png" multiple onChange={handleFilesChange}/>
                </label>
              </>
            )}
          </div>
        </div>

        <div className="contact-submit-row">
          <label className="contact-form-agreement">
            <input type="checkbox" required />
            <span>
              <p>
                Нажимая кнопку, вы соглашаетесь {" "}
                <a>
                  с политикой<br/>
                  конфиденциальности и политикой обработки<br/>
                  персональных данных
                </a>
              </p>
            </span>
          </label>
          <label className="contact-form-agreement">
            <input type="checkbox" />
            <span>
              <p>
                Нажимая кнопку, вы также даете <a>согласие</a><br/>
                на получение рекламных и информационных рассылок
              </p>
            </span>
          </label>
        </div>

        <button className="button button--orange-bgr" type="submit">
          получить расчёт
        </button>

        {submitted && (
          <p role="status">
            Демонстрационная форма. Отправка на сервер пока не настроена.
          </p>
        )}
      </form>
    </>
  );
}

export default ContactsInput;