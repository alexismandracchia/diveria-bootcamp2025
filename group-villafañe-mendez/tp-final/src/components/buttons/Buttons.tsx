"use client";

import { Button, ButtonProps } from "flowbite-react";
import type { ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
  colorFrom?: string;       
  colorVia?: string;       
  colorTo?: string;         
  shadowColor?: string;    
  darkShadowColor?: string; 
  focusColor?: string;      
  darkFocusColor?: string;  
}

export function GradientButton({
  children,
  className = "",
  colorFrom = "from-blue-500",
  colorVia = "via-blue-600",
  colorTo = "to-blue-700",
  focusColor = "focus:ring-blue-300",
  darkFocusColor = "dark:focus:ring-blue-800",
  ...props
}: CustomButtonProps) {
  return (
    <Button
      {...props}
      className={`
        bg-gradient-to-r ${colorFrom} ${colorVia} ${colorTo}
        text-white hover:bg-gradient-to-br
        ${focusColor} ${darkFocusColor}
        py-2.5 px-4 rounded-lg
        ${className}
      `}
    >
      {children}
    </Button>
  );
}

export function ShadowButton({
  children,
  className = "",
  disabled = false,
  colorFrom = "from-blue-500",
  colorVia = "via-blue-600",
  colorTo = "to-blue-700",
  shadowColor = "shadow-blue-500/50",
  darkShadowColor = "dark:shadow-blue-800/80",
  focusColor = "focus:ring-blue-300",
  darkFocusColor = "dark:focus:ring-blue-800",
  ...props
}: CustomButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={`
        text-white
        bg-gradient-to-r ${colorFrom} ${colorVia} ${colorTo}
        hover:bg-gradient-to-br
        focus:ring-4 focus:outline-none ${focusColor} ${darkFocusColor}
        shadow-lg ${shadowColor} dark:shadow-lg ${darkShadowColor}
        font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
        ${disabled ? "opacity-50 cursor-not-allowed hover:bg-gradient-to-r" : "hover:opacity-90"}
        ${className}
      `}
    >
      {children}
    </Button>
  );
}
