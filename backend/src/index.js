// backend/src/index.js
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const bookingsRouter = require('./routes/bookings');
const clientsRouter = require('./routes/clients');
const invoicesRouter = require('./routes/invoices');
const templatesRouter = require('./routes/templates');

// Enable JSON body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*", // Replace with Vercel URL later
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Health check
app.get("/", (req, res) => res.send("Backend is running"));

// Mount API routes
app.use("/api/bookings", bookingsRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/templates", templatesRouter);

// Port for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
