export interface BadgeProps {
  textDanger?: string;
  textWarning?: string;
  textSuccess?: string;
}

export function Badge({ textDanger, textWarning, textSuccess }: BadgeProps) {
  const baseClasses =
    "inline-block text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 rounded-md border truncate";

  let colorClasses = "";
  let text = "";

  if (textDanger) {
    colorClasses = "bg-red-100 text-red-800 dark:text-red-400 border-red-400";
    text = textDanger;
  } else if (textWarning) {
    colorClasses =
      "text-yellow-800 dark:text-yellow-300 border-yellow-300";
    text = textWarning;
  } else if (textSuccess) {
    colorClasses =
      "text-green-800 dark:text-green-400 border-green-400";
    text = textSuccess;
  } else {
    colorClasses =
      "text-blue-800 dark:text-blue-400 border-blue-400";
    text = "Default";
  }

  return (
    <span
      className={`${baseClasses} ${colorClasses} max-w-full sm:max-w-xs`}
      title={text} 
    >
      {text}
    </span>
  );
}
