import { Roboto } from "next/font/google";
import "./globals.css";
import "flowbite";
import type { ReactNode } from "react";
import { AuthProvider } from "./context/AuthProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={roboto.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
