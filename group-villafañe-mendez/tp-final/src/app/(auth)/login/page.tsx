"use client";

import Link from "next/link";
import FormLogin from "./components/FormLogin";
import ParallaxBackground from "@/app/(auth)/login/components/ParallaxBackground"; 
import { useState, useEffect } from "react";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cardClasses = `
    relative z-10 p-8 rounded-lg shadow-lg w-full max-w-md
    bg-white/80 dark:bg-white/10
    text-black dark:text-white
    backdrop-blur-md border border-gray-300 dark:border-white/20
    transform transition-all duration-700 ease-out
    ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"}
  `;

  return (
    <ParallaxBackground>
      <div className={cardClasses}>
        <h2 className="text-2xl font-bold text-center mb-6">
          Inicia sesión en tu cuenta
        </h2>

        <FormLogin />

        <p className="text-gray-700 dark:text-gray-300 text-sm text-center mt-6">
          ¿No tienes una cuenta?{" "}
          <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </ParallaxBackground>
  );
};

export default LoginPage;