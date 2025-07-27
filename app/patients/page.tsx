'use client';
import { ChangeEvent } from 'react';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';


const doctorList = ['Dr. Smith', 'Dr. John', 'Dr. Emma'];

const Page = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    doctor: doctorList[0],
    date: '',
    time: '',
  });
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    setForm({
      name: '',
      age: '',
      gender: 'Male',
      phone: '',
      doctor: doctorList[0],
      date: '',
      time: '',
    });
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Patient</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full"
            required
          />
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
            className="border p-2 w-full"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 w-full"
            required
          />
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            {doctorList.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="border p-2 w-full"
            required
          />
          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            type="time"
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;