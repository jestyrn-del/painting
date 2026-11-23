import { useEffect } from "react";
import { createPortal } from "react-dom";

import "./ContactModal.css";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function ContactModal({ isOpen, onClose, children }: ContactModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="contact-modal-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="contact-modal" role="dialog" aria-modal="true">
        {children}
      </div>
    </div>,
    document.body
  );
}

export default ContactModal;