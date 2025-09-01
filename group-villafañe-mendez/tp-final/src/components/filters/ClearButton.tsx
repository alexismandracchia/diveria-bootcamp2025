"use client";
import React from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
};

const ClearButton: React.FC<Props> = ({ disabled, onClick, title = "Limpiar filtros" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group inline-flex items-center justify-center h-11 w-11 rounded-2xl
                  border border-white/10 bg-white/5/50 backdrop-blur-md
                  shadow-[0_8px_24px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.02)]
                  transition-all
                  ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"}`}
      title={title}
      aria-label={title}
    >
      <FaTimes className="h-4 w-4 opacity-80 group-hover:opacity-100" />
    </button>
  );
};

export default ClearButton;
