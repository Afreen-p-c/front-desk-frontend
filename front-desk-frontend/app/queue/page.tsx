'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';



type Patient = {
  id: number;
  name: string;
  status: string;
  priority: boolean;
};

const Page = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [name, setName] = useState('');

  const addToQueue = () => {
    const newPatient: Patient = {
      id: Date.now(),
      name,
      status: 'waiting',
      priority: false,
    };
    setPatients([newPatient, ...patients]);
    setName('');
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Patient Queue</h1>
        <div className="flex gap-2 mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient name"
            className="border p-2 w-full"
          />
          <button onClick={addToQueue} className="bg-green-500 text-white px-4 py-2">
            Add to Queue
          </button>
        </div>
        <ul className="space-y-2">
          {patients.map((patient) => (
            <li key={patient.id} className="border p-2">
              {patient.name} - {patient.status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
