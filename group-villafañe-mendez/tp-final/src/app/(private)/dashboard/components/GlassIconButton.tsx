"use client";
import { ReactElement } from "react";

export default function GlassIconButton({
  icon, onClick, title, disabled, className = "",
}: { icon: ReactElement; onClick?: () => void; title?: string; disabled?: boolean; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
      className={`glass-icon ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white/12 active:bg-white/20"} ${className}`}
    >
      <span className="sr-only">{title}</span>
      {icon}
    </button>
  );
}
