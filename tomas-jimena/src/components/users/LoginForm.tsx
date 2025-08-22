"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import React from "react";
import StatusMessage from "../ui/StatusMessage";

function LoginForm() {
  const { login, loading, error, success, clearError, clearSuccess } =
    useAppContext();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Limpiar error automáticamente después de 3s
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(t);
    }
  }, [error, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await login(username, password);

    if (ok) {
      setUsername("");
      setPassword("");

      setTimeout(() => {
        router.push("/products");
        clearSuccess();
      }, 1000);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md rounded-lg rounded-tl-none p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Button type="submit" loading={loading}>
            {loading ? "Loggin in..." : "Login"}
          </Button>
        </form>
      </div>

      {error ? (
        <StatusMessage message={error} type="error" />
      ) : success ? (
        <StatusMessage message={success} type="success" />
      ) : null}
    </>
  );
}

export default React.memo(LoginForm);
