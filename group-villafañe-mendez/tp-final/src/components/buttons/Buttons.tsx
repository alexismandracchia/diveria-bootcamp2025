"use client";

import { Button, ButtonProps } from "flowbite-react";
import type { ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

export function GradientButton({ children, ...props }: CustomButtonProps ) {
  return (
    <Button
      {...props}
      className="
      bg-gradient-to-r 
      from-blue-500 
      via-blue-600 
      to-blue-700 
      text-white hover:bg-gradient-to-br 
      focus:ring-blue-300 
      dark:focus:ring-blue-800 
      py-2.5"
    >
      {children}
    </Button>
  );
}

export function ShadowButton({ children, disabled, ...props }: CustomButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={`
        text-white 
        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
        hover:bg-gradient-to-br 
        focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
        shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 
        font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
        ${disabled ? "opacity-50 cursor-not-allowed hover:bg-gradient-to-r" : "hover:opacity-90"}
      `}
    >
      {children}
    </Button>
  );
}