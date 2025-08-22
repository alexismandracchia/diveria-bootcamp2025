export default function Button({
  children,
  disabled,
  loading = false,
  type,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 rounded py-2 px-4 text-white transition
        ${disabled || loading ? "opacity-50 cursor-not-allowed bg-blue-400" : "bg-blue-500 hover:bg-blue-600"}
      `}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
      {children}
    </button>
  );
}
