"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function PatientsPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, []);

  const doctorList = [
    "Dr. Ananya Roy – Gynecologist – Kolkata Clinic",
    "Dr. Arjun Mehta – Cardiologist – Mumbai Heart Center",
    "Dr. Neha Kapoor – Dermatologist – Delhi Skin Clinic",
    "Dr. Rohan Iyer – Pediatrician – Bangalore Kids Care",
    "Dr. Kavya Sharma – Psychiatrist – Chennai Wellness Center",
    "Dr. Vinay Deshmukh – Orthopedic – Pune Bone Clinic",
  ];

  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    doctor: doctorList[0],
    date: "",
    time: "",
    status: "Waiting",
  });

  const [customTime, setCustomTime] = useState({
    hour: "09",
    minute: "00",
    ampm: "AM",
  });

  useEffect(() => {
    const timeValue = `${customTime.hour}:${customTime.minute} ${customTime.ampm}`;
    setForm((prevForm) => ({ ...prevForm, time: timeValue }));
  }, [customTime]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPatient = () => {
    if (!form.name || !form.age || !form.doctor || !form.date || !form.time) return;
    const newPatient = {
      ...form,
      id: Date.now(),
    };
    setPatients([newPatient, ...patients]);
    setForm({
      name: "",
      age: "",
      gender: "Male",
      doctor: doctorList[0],
      date: "",
      time: "",
      status: "Waiting",
    });
    setCustomTime({ hour: "09", minute: "00", ampm: "AM" });
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] p-6 text-gray-800">
      <Navbar />
      <h1 className="text-3xl font-semibold mb-6 text-[#1e293b]">Patient Details</h1>

      {/* Form to add patient */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 border rounded w-full"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="px-4 py-2 border rounded w-full"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="px-4 py-2 border rounded w-full"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="px-4 py-2 border rounded w-full"
          >
            {doctorList.map((doc, index) => (
              <option key={index} value={doc}>
                {doc}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="px-4 py-2 border rounded w-full"
          />
          {/* Custom Time Picker */}
          <div className="flex items-center gap-2">
            <select
              className="border px-2 py-2 rounded"
              value={customTime.hour}
              onChange={(e) =>
                setCustomTime({ ...customTime, hour: e.target.value })
              }
            >
              {Array.from({ length: 12 }, (_, i) => {
                const hr = String(i + 1).padStart(2, "0");
                return <option key={hr}>{hr}</option>;
              })}
            </select>
            <span>:</span>
            <select
              className="border px-2 py-2 rounded"
              value={customTime.minute}
              onChange={(e) =>
                setCustomTime({ ...customTime, minute: e.target.value })
              }
            >
              {Array.from({ length: 60 }, (_, i) => {
                const min = String(i).padStart(2, "0");
                return <option key={min}>{min}</option>;
              })}
            </select>
            <select
              className="border px-2 py-2 rounded"
              value={customTime.ampm}
              onChange={(e) =>
                setCustomTime({ ...customTime, ampm: e.target.value })
              }
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="px-4 py-2 border rounded w-full"
          >
            <option>Waiting</option>
            <option>With Doctor</option>
            <option>Completed</option>
          </select>
        </div>
        <button
          onClick={addPatient}
          className="mt-4 bg-[#1e3a8a] text-white px-6 py-2 rounded hover:bg-[#1e40af]"
        >
          Add Patient
        </button>
      </div>

      {/* Patient List */}
      {patients.length === 0 ? (
        <p className="text-gray-500">No patients added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((p) => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-1 text-[#1e293b]">{p.name}</h2>
              <p className="text-sm text-gray-600">Age: {p.age}</p>
              <p className="text-sm text-gray-600">Gender: {p.gender}</p>
              <p className="text-sm text-gray-600">Doctor: {p.doctor}</p>
              <p className="text-sm text-gray-600">Date: {p.date}</p>
              <p className="text-sm text-gray-600">Time: {p.time}</p>
              <p className="text-sm mt-2">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    p.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : p.status === "With Doctor"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
