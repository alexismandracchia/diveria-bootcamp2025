"use client";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function Portal({ children }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const el = elRef.current!;
    document.body.appendChild(el);
    setMounted(true);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (!mounted) return null;
  return ReactDOM.createPortal(children, elRef.current!);
}
