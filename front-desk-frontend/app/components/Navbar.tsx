"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#1e3a8a] text-white px-6 py-3 flex items-center justify-between shadow">
      <div className="flex gap-6 font-medium">
        <Link
          href="/dashboard"
          className={isActive("/dashboard") ? "underline" : ""}
        >
          Dashboard
        </Link>
        <Link
          href="/appointments"
          className={isActive("/appointments") ? "underline" : ""}
        >
          Appointments
        </Link>
        <Link
          href="/queue"
          className={isActive("/queue") ? "underline" : ""}
        >
          Queue
        </Link>
        <Link href="/patients">Patients</Link>

      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
      >
        Logout
      </button>
    </nav>
  );
}
