import React, { useState } from "react";
import api from "../lib/api"; // <-- uses VITE_API_URL automatically

export default function BookingWidget() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [slots, setSlots] = useState([]);
  const [status, setStatus] = useState("");

  // Load available booking slots
  const loadSlots = async () => {
    setStatus("Loading available slots...");

    try {
      const response = await api.get("/api/bookings/slots");
      setSlots(response.data);
      setStatus("Available slots loaded.");
    } catch (error) {
      console.error("Error loading slots:", error);
      setStatus("Failed to load slots. Check backend connection.");
    }
  };

  // Request booking creation
  const requestBooking = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Please enter both name and email.");
      return;
    }

    setStatus("Sending booking request...");

    try {
      const response = await api.post("/api/bookings/request", {
        name,
        email,
      });

      setStatus("Booking request sent successfully!");
      alert("Booking submitted!");
      console.log(response.data);
    } catch (error) {
      console.error("Booking request failed:", error);
      setStatus("Booking request failed. Check backend connection.");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd" }}>
      <h2>Book a time</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: "5px" }}
          />
        </label>

        <label style={{ marginLeft: "15px" }}>
          Email:
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "5px" }}
          />
        </label>
      </div>

      <button onClick={requestBooking}>Request Booking</button>

      <h3 style={{ marginTop: "20px" }}>Available slots</h3>
      <button onClick={loadSlots}>Load Slots</button>

      <ul style={{ marginTop: "10px" }}>
        {slots.length > 0 ? (
          slots.map((slot, index) => <li key={index}>{slot}</li>)
        ) : (
          <p>No slots loaded.</p>
        )}
      </ul>

      <p style={{ marginTop: "10px", fontStyle: "italic" }}>{status}</p>
    </div>
  );
}
