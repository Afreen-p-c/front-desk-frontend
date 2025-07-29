"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function AppointmentsPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Ananya Roy",
      specialization: "Gynecologist",
      location: "Kolkata Clinic",
    },
    {
      id: 2,
      name: "Dr. Arjun Mehta",
      specialization: "Cardiologist",
      location: "Mumbai Heart Center",
    },
    {
      id: 3,
      name: "Dr. Neha Kapoor",
      specialization: "Dermatologist",
      location: "Delhi Skin Clinic",
    },
    {
      id: 4,
      name: "Dr. Rohan Iyer",
      specialization: "Pediatrician",
      location: "Bangalore Kids Care",
    },
    {
      id: 5,
      name: "Dr. Kavya Sharma",
      specialization: "Psychiatrist",
      location: "Chennai Wellness Center",
    },
    {
      id: 6,
      name: "Dr. Vinay Deshmukh",
      specialization: "Orthopedic",
      location: "Pune Bone Clinic",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, []);
const [searchTerm, setSearchTerm] = useState("");
const [selectedLocation, setSelectedLocation] = useState("All");

  const [message, setMessage] = useState("");
const filteredDoctors = doctors.filter((doc) => {
  const matchesSearch =
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesLocation =
    selectedLocation === "All" || doc.location.toLowerCase().includes(selectedLocation.toLowerCase());

  return matchesSearch && matchesLocation;
});

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-6 text-gray-800">
      <Navbar />

      <h1 className="text-3xl font-semibold mb-6 text-[#1e293b]">Appointments</h1>

{message && (
  <div className="mt-6 p-4 bg-green-100 text-green-800 rounded shadow text-center text-lg">
    {message}
  </div>
)}

      
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
       <input
  type="text"
  placeholder="Search by doctor name or specialization"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
/>


       <select
  value={selectedLocation}
  onChange={(e) => setSelectedLocation(e.target.value)}
  className="px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
>
  <option value="All">All Locations</option>
  <option value="Kolkata">Kolkata</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Delhi">Delhi</option>
  <option value="Bangalore">Bangalore</option>
  <option value="Chennai">Chennai</option>
  <option value="Pune">Pune</option>
</select>

      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {filteredDoctors.map((doc) => (

          <div
            key={doc.id}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-medium text-[#1f2937] mb-1">{doc.name}</h2>
            <p className="text-sm text-gray-500">{doc.specialization}</p>
            <p className="text-sm text-gray-400 mb-4">Location: {doc.location}</p>

            <div className="space-y-2">
              <button
                onClick={() => setMessage(`✅ Appointment booked with ${doc.name}`)}
                className="w-full bg-[#1e3a8a] text-white py-2 rounded hover:bg-[#1e40af]"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setMessage(`🔄 Appointment rescheduled with ${doc.name}`)}
                className="w-full bg-[#4b5563] text-white py-2 rounded hover:bg-[#374151]"
              >
                Reschedule
              </button>
              <button
                onClick={() => setMessage(`❌ Appointment with ${doc.name} canceled`)}
                className="w-full bg-[#991b1b] text-white py-2 rounded hover:bg-[#7f1d1d]"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
