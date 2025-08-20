"use client";

import { Button, ButtonProps } from "flowbite-react";

interface GradientButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function GradientButton({ children, ...props }: GradientButtonProps) {
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
