import { useEffect } from "react";
import "./modal.css";

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
        <button className="close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}