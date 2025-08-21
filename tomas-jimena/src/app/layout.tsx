"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { AppProvider } from "@/context/AppContext";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans `}
      >
        <AppProvider>
          <Navbar />
          {/* <ThemeToggle /> */}
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
