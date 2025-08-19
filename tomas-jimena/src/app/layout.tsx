"use client";

import { useState } from "react";

import "./globals.css";
import Header from "@/components/navbar/Header";
import Footer from "@/components/footer/Footer";
import ThemeToggle from "@/components/theme-toggle/ThemeToggle";

import { AppProvider } from "@/context/AppContext";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans flex flex-col min-h-screen`}
      >
        <AppProvider>
          <Header />
          {/* <ThemeToggle /> */}
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
