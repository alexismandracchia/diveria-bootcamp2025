"use client";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "muted";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

export default function GlassButton({
  children, onClick, variant = "primary", className = "", type = "button", disabled, ariaLabel
}: Props) {
  const base = variant === "primary"
    ? "glass-button text-white/90"
    : "glass-button glass-muted text-white/80";
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${base} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
