"use client";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const { isAuthenticated, handleLogout } = useAppContext();
  const router = useRouter();
  const hasToken = typeof window !== "undefined" && localStorage.getItem("token");
  const isAdmin = isAuthenticated && hasToken;
  const handleLogoutButton = () => {
    handleLogout();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[65px] bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 px-6 flex justify-between items-center border-b border-gray-600">
      <div className="text-xl font-bold text-white">
        <Link href="/">MyApp</Link>
      </div>
      <ul className="flex gap-6 text-white">
        {!isAuthenticated &&(
          <li><Link href="/">Home</Link></li>
        )}
        <li><Link href="/products">Products</Link></li>

        {isAdmin && (
          <>
            <li><Link href="/admin/users">Admin Users</Link></li>
            <li><Link href="/admin/products">Admin Products</Link></li>
          </>
        )}

        {isAuthenticated && (
          <li>
            <button onClick={handleLogoutButton} className="text-red-400 cursor-pointer">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default React.memo(Navbar);