import React, { useState } from "react";

// ❗ IMPORTANT: USE YOUR RENDER BACKEND URL HERE
const API_URL = import.meta.env.VITE_API_URL || "https://invoicing-app-s26l.onrender.com";

export default function BookingWidget() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [slots, setSlots] = useState([]);

  const loadSlots = async () => {
    try {
      const res = await fetch(`${API_URL}/api/bookings/slots`);
      if (!res.ok) throw new Error("Failed to load slots");

      const data = await res.json();
      setSlots(data);
    } catch (err) {
      console.error("Error loading slots:", err);
    }
  };

  const requestBooking = async () => {
    try {
      const res = await fetch(`${API_URL}/api/bookings/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();
      alert(data.message || "Booking request sent!");

    } catch (err) {
      console.error("Error requesting booking:", err);
      alert("Booking request failed");
    }
  };

  return (
    <div>
      <h1>Invoicing & Booking App (Demo)</h1>

      <h3>Book a time</h3>
      <div>
        Name: <input value={name} onChange={e => setName(e.target.value)} />
        Email: <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <button onClick={loadSlots}>Load Slots</button>

      <h3>Available slots</h3>
      <ul>
        {slots.length === 0 && <p>No slots loaded</p>}
        {slots.map((slot, i) => (
          <li key={i}>{slot}</li>
        ))}
      </ul>

      <button onClick={requestBooking}>Request Booking</button>
    </div>
  );
}
