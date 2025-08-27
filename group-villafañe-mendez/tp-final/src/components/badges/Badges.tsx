export interface BadgeProps {
  textDanger?: string;
  textWarning?: string;
  textSuccess?: string;
}

export function Badge({ textDanger, textWarning, textSuccess }: BadgeProps) {
  const baseClasses =
    "text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 border";

  let colorClasses = "";
  let text = "";

  if (textDanger) {
    colorClasses = "bg-red-100 text-red-800 dark:text-red-400 border-red-400";
    text = textDanger;
  } else if (textWarning) {
    colorClasses =
      "bg-yellow-100 text-yellow-800 dark:text-yellow-300 border-yellow-300";
    text = textWarning;
  } else if (textSuccess) {
    colorClasses =
      "bg-green-100 text-green-800 dark:text-green-400 border-green-400";
    text = textSuccess;
  } else {
    colorClasses =
      "bg-blue-100 text-blue-800 dark:text-blue-400 border-blue-400";
    text = "Default";
  }

  return <span className={`${baseClasses} ${colorClasses}`}>{text}</span>;
}
