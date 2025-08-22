interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function FloatingInput({
  id,
  label,
  type = "text",
  placeholder = " ",
  className = "",
  value,
  onChange,
  error,
}: FloatingInputProps) {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={`relative ${className}`}>
      <input
        type={inputType}
        id={id}
        value={value}
        onChange={onChange}
        className={`
          block py-2.5 px-0 w-full 
          text-sm text-gray-900 
          placeholder-gray-400 dark:placeholder-gray-500
          bg-transparent border-0 border-b-2 appearance-none 
          focus:outline-none focus:ring-0 peer
           ${error 
            ? "border-red-500 focus:border-red-600 dark:border-red-500 dark:focus:border-red-600" 
            : "border-gray-300 focus:border-blue-600 dark:border-gray-500 dark:focus:border-blue-500"
          }
          dark:text-white
        `}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className={`
          absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
          peer-focus:-translate-y-6 peer-focus:scale-75
          ${error ? "text-red-600 dark:text-red-500" : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 dark:peer-focus:text-blue-500"}
        `}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          tabIndex={-1}
        >
          {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
        </button>
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">
          <span className="font-medium">Error:</span> {error}
        </p>
      )}
    </div>
  );
}
