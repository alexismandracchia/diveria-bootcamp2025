"use client";
import { ReactNode } from "react";

export default function GlassCard({
  children,
  className = "",
}: { children: ReactNode; className?: string }) {
  return (
    <section className={`glass rounded-2xl p-4 md:p-6 ${className}`}>
      {children}
    </section>
  );
}
