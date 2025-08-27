'use client';
import { FaExclamationTriangle } from "react-icons/fa";
import { ShadowButton } from "@/components/buttons/Buttons";

type FullScreenErrorProps = {
  message?: string;
  onRetry?: () => void; 
};

export default function FullScreenError({ message, onRetry }: FullScreenErrorProps) {
  return (
    <div className="flex items-center justify-center h-100 bg-red-50 dark:bg-red-900">
      <div className="flex flex-col items-center space-y-4 text-center">
        <FaExclamationTriangle className="w-16 h-16 text-red-600 dark:text-red-300" />
        
        <p className="text-xl font-semibold text-red-800 dark:text-red-200">
          {message || "Oops! Something went wrong."}
        </p>

        {onRetry && (
          <ShadowButton
            onClick={onRetry}
            colorFrom="from-red-500"
            colorVia="via-red-600"
            colorTo="to-red-700"
            focusColor="focus:ring-red-300"
            darkFocusColor="dark:focus:ring-red-800"
            shadowColor="shadow-red-500/50"
            darkShadowColor="dark:shadow-red-800/80"
          >
            Try Again
          </ShadowButton>
        )}
      </div>
    </div>
  );
}
