"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function QueuePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, []);

  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");

  // Load patients from localStorage when the page loads
  useEffect(() => {
    const savedPatients = localStorage.getItem("patientsQueue");
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Save patients to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("patientsQueue", JSON.stringify(patients));
  }, [patients]);

  const addPatient = () => {
    if (!name.trim()) return;
    const newPatient = {
      id: Date.now(),
      name,
      status: "Waiting",
    };
    setPatients([newPatient, ...patients]);
    setName("");
  };

  const updateStatus = (id, newStatus) => {
    const updated = patients.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setPatients(updated);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-6 text-gray-800">
      <Navbar />
      <h1 className="text-3xl font-semibold mb-6 text-[#1e293b]">Patient Queue</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter patient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
        />
        <button
          onClick={addPatient}
          className="bg-[#1e3a8a] text-white px-6 py-2 rounded hover:bg-[#1e40af]"
        >
          Add to Queue
        </button>
      </div>

      {patients.length === 0 ? (
        <p className="text-gray-500">No patients in queue.</p>
      ) : (
        <ul className="space-y-4">
          {patients.map((patient, index) => (
            <li
              key={patient.id}
              className="bg-white p-4 rounded shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div>
                <p className="font-medium text-lg">
                  #{patients.length - index} &nbsp; {patient.name}
                </p>
                <p className="text-sm text-gray-500">Status: {patient.status}</p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => updateStatus(patient.id, "Waiting")}
                  className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                >
                  Waiting
                </button>
                <button
                  onClick={() => updateStatus(patient.id, "With Doctor")}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  With Doctor
                </button>
                <button
                  onClick={() => updateStatus(patient.id, "Completed")}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Completed
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
