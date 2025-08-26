import { ReactNode } from "react";
import Link from "next/link";

type ButtonProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode; 
  className?: string;
};

export const PrimaryLinkButton = ({ href, children, icon, className }: ButtonProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 ${className}`}
    >
      {children}
      {icon && <span className="ms-2">{icon}</span>}
    </Link>
  );
};

export const SecondaryLinkButton = ({ href, children, icon, className }: ButtonProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-400 ${className}`}
    >
      {children}
      {icon && <span className="ms-2">{icon}</span>}
    </Link>
  );
};
