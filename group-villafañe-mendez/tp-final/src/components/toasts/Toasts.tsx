"use client";
import React from "react";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";

interface ToastProps {
  message: string | null;
  visible: boolean;
  type?: "error" | "success";
}

export const Toasts = ({ message, visible, type = "error" }: ToastProps) => {
  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-900";
  const Icon = type === "success" ? MdCheckCircleOutline : MdErrorOutline;
  const title = type === "success" ? "Success:" : "Error:";

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center p-3 sm:p-4 max-w-xs sm:max-w-sm
      text-sm sm:text-base text-white 
      ${bgColor} rounded-lg shadow-lg 
      space-y-2
      transition-all duration-500 ease-in-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <Icon size={24} />
      <div className="break-words text-center">
        <span className="font-medium">{title}</span> {message}
      </div>
    </div>
  );
};
