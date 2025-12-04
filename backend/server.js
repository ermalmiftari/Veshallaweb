// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const productRoutes = require("./routes/productRoutes");
const memberRoutes = require("./routes/memberRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Controllers
const paymentController = require("./controllers/paymentController");

// Initialize DB connection (mysql2 pool + testConnection)
require("./config/db");

const app = express();
const PORT = process.env.PORT || 4000;

// CORS – allow local dev and production domain
app.use(
  cors({
    origin: ["http://localhost:5173", "https://veshalla.info"],
  })
);

/**
 * Stripe webhook MUST receive raw body.
 * Define this route BEFORE express.json for this path.
 */
app.post(
  "/api/payments/webhook",
  bodyParser.raw({ type: "application/json" }),
  paymentController.handleWebhook
);

// Normal JSON body parsing for all other routes
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Veshallaweb API running" });
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/payments", paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Veshallaweb API listening on http://localhost:${PORT}`);
});
