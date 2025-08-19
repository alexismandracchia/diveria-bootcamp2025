import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <XMarkIcon className="close" onClick={onClose}></XMarkIcon>
        {children}
      </div>
    </div>
  );
}