"use client";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import React from "react";

function LoginForm() {
  const { login, loading, error } = useAppContext();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    const ok = await login(username, password);

    if (ok) {
      setUsername("");
      setPassword("");
      setSuccess("Inicio exitoso");
      setTimeout(() => {
        router.push("/products");
      }, 1000);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

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

        <Button type="submit" disabled={loading}>
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="h-5 w-full flex justify-center items-center -mt-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
      </div>
    </>
  );
}

export default React.memo(LoginForm);
