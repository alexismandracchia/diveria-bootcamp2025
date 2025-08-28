interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  successMessage?: string;
  className?: string;
}

export function TextInput({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  successMessage,
  className = "",
}: TextInputProps) {
  const hasError = Boolean(error);
  const hasSuccess = Boolean(successMessage) && !hasError;

  const borderColor = hasError
    ? "border-red-500 focus:border-red-600 focus:ring-red-500"
    : hasSuccess
    ? "border-green-500 focus:border-green-600 focus:ring-green-500"
    : "border-gray-300 focus:border-blue-600 focus:ring-blue-500";

  const bgColor = hasError
    ? "bg-red-50 dark:bg-gray-700"
    : hasSuccess
    ? "bg-green-50 dark:bg-gray-700"
    : "bg-gray-50 dark:bg-gray-700";

  const textColor = hasError
    ? "text-red-900 dark:text-red-500 placeholder-red-700 dark:placeholder-red-500"
    : hasSuccess
    ? "text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500"
    : "text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500";

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full p-2.5 text-sm rounded-lg border ${borderColor} ${bgColor} ${textColor} focus:ring-1 focus:outline-none`}
      />
      {hasError && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Error:</span> {error}
        </p>
      )}
      {hasSuccess && (
        <p className="mt-1 text-sm text-green-600 dark:text-green-500">
          <span className="font-medium">Success:</span> {successMessage}
        </p>
      )}
    </div>
  );
}
