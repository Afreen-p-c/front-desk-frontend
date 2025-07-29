"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function DashboardPage() {
  const router = useRouter();

  // Protect the page from unauthenticated access
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-6 text-gray-800">
        <Navbar />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-[#1e293b]">Dashboard</h1>
        
      </div>

      <p className="text-lg text-gray-700">Welcome to the clinic dashboard!</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/appointments"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded text-center block"
        >
          Manage Appointments
        </a>
        <a
          href="/queue"
          className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded text-center block"
        >
          View Patient Queue
        </a>
      </div>
    </div>
  );
}
