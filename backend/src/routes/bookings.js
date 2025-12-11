// backend/src/routes/bookings.js
const express = require("express");
const router = express.Router();

/*
 |--------------------------------------------------------------------------
 |  DEMO BOOKING ROUTES
 |--------------------------------------------------------------------------
 |  These routes power:
 |   - GET  /api/bookings/slots   → returns available times
 |   - POST /api/bookings/book    → handles booking submissions
 |
 |  This version works fully without a database.
 |  Later we can upgrade to Prisma + PostgreSQL easily.
 |--------------------------------------------------------------------------
*/

// Temporary in-memory demo slots (you can change these)
let availableSlots = [
  "Monday 10:00 AM",
  "Monday 2:00 PM",
  "Tuesday 11:00 AM",
  "Wednesday 4:00 PM",
];

// ---------------------------------------------
// GET /api/bookings/slots
// ---------------------------------------------
router.get("/slots", async (req, res) => {
  try {
    // Respond with the current list of available slots
    res.json(availableSlots);
  } catch (error) {
    console.error("Error loading slots:", error);
    res.status(500).json({ error: "Failed to load slots" });
  }
});

// ---------------------------------------------
// POST /api/bookings/book
// ---------------------------------------------
router.post("/book", async (req, res) => {
  try {
    const { name, email, slot } = req.body;

    if (!name || !email || !slot) {
      return res
        .status(400)
        .json({ error: "Name, Email, and Slot are required." });
    }

    // If slot does not exist anymore
    if (!availableSlots.includes(slot)) {
      return res.status(400).json({ error: "Slot is no longer available." });
    }

    // Remove slot (simulate booking)
    availableSlots = availableSlots.filter((s) => s !== slot);

    console.log(`New booking confirmed: ${name} (${email}) booked ${slot}`);

    // Return success response
    res.json({
      message: "Booking confirmed!",
      booked: { name, email, slot },
    });
  } catch (error) {
    console.error("Error making booking:", error);
    res.status(500).json({ error: "Failed to complete booking" });
  }
});

module.exports = router;
