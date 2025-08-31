import { Roboto } from "next/font/google";
import "./globals.css";
import "flowbite";
import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthProvider";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/navbar/NavBar";

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
<body className={`${roboto.className} surface-0 text-strong antialiased`}>        
  <AuthProvider>
          <Navbar />
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
