"use client";
import React, { forwardRef, useEffect, useId, useRef } from "react";

type CheckboxFieldProps = {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  checked?: boolean; // uso controlado
  defaultChecked?: boolean; // uso no controlado
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  indeterminate?: boolean; // estado intermedio (—)
  className?: string; // clases del contenedor
  inputClassName?: string; // clases extra para el input
  labelClassName?: string; // clases extra para el label
  helperText?: React.ReactNode; // texto de ayuda/validación
};

const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    {
      id,
      name,
      label = "Label",
      checked,
      defaultChecked,
      onChange,
      value,
      required,
      disabled,
      indeterminate,
      className = "",
      inputClassName = "",
      labelClassName = "",
      helperText,
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? `cb-${autoId}`;
    const innerRef = useRef<HTMLInputElement | null>(null);

    // merge refs
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === "function") ref(innerRef.current);
      else
        (ref as React.MutableRefObject<HTMLInputElement | null>).current =
          innerRef.current;
    }, [ref]);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = !!indeterminate && !checked;
      }
    }, [indeterminate, checked]);

    return (
      <div className={`flex items-start ${className}`}>
        <input
          ref={innerRef}
          id={inputId}
          name={name}
          type="checkbox"
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked, e)}
          className={[
            "w-4 h-4",
            "text-blue-600",
            "bg-gray-100 dark:bg-gray-700",
            "border-gray-300 dark:border-gray-600",
            "rounded-sm",
            "focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600",
            "dark:ring-offset-gray-800",
            disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
            inputClassName,
          ].join(" ")}
          aria-describedby={helperText ? `${inputId}-help` : undefined}
        />
        <div className="ms-2">
          <label
            htmlFor={inputId}
            className={[
              "select-none",
              "text-sm font-medium",
              "text-gray-900 dark:text-gray-300",
              disabled ? "cursor-not-allowed" : "cursor-pointer",
              labelClassName,
            ].join(" ")}
          >
            {label}
          </label>

          {helperText ? (
            <p
              id={`${inputId}-help`}
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              {helperText}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);

CheckboxField.displayName = "CheckboxField";
export default CheckboxField;
