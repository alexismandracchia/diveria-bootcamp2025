export default function Button({ children, disabled, type}: { children: React.ReactNode; disabled?: boolean; type: "button" | "submit" | "reset"; }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={` cursor-pointer bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
