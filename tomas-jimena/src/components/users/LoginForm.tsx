"use client";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext"; // <- suponiendo que envolviste tu App con un context

export default function LoginForm() {
  const { login, loading, error } = useAppContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>{" "}
      <div className="h-5 w-full flex justify-center items-center -mt-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
}
