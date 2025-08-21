"use client";

import { useRouter } from "next/navigation";
import { GradientButton } from "@/components/buttons/Buttons";
import { PATH } from "../lib/common";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Página no encontrada
      </h2>
      <p className="text-gray-600 mb-6">
        Lo sentimos, la página que estás buscando no existe o fue eliminada.
      </p>
      <GradientButton onClick={() => router.push(PATH.HOME)}>
        Volver al inicio
      </GradientButton>
    </div>
  );
}
