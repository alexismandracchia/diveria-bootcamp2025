"use client";
import React from "react";

interface ToastProps {
  message: string | null;
  visible: boolean;
}
import { MdErrorOutline } from "react-icons/md";

export const Toasts = ({ message, visible }: ToastProps) => {
  if (!message) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-start sm:items-center p-3 sm:p-4 max-w-xs sm:max-w-sm
        text-sm sm:text-base text-white 
        bg-red-900 rounded-lg shadow-lg 
        space-x-2 sm:space-x-3
        transition-all duration-500 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <MdErrorOutline size={24} className="flex-shrink-0 mt-1 sm:mt-0" />
      <div className="break-words">
        <span className="font-medium">Error:</span> {message}
      </div>
    </div>
  );
};
