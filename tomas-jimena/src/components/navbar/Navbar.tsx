"use client";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
  const { isAuthenticated, user, handleLogout } = useAppContext();

  const hasToken = typeof window !== "undefined" && localStorage.getItem("token");
  const isAdmin = isAuthenticated && hasToken;

  return (
    <nav className="fixed top-0 left-0 w-full h-[65px] bg-gray-800 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-white">
        <Link href="/">MyApp</Link>
      </div>
      <ul className="flex gap-6 text-white">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>

        {isAdmin && (
          <>
            <li><Link href="/admin/users">Admin Users</Link></li>
            <li><Link href="/admin/products">Admin Products</Link></li>
          </>
        )}

        {isAuthenticated && (
          <li>
            <button onClick={handleLogout} className="text-red-400">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
