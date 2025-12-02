// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const memberRoutes = require("./routes/memberRoutes");
require("./config/db"); // just to initialize and test connection

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server; change to your frontend URL in prod
    credentials: true
  })
);
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Veshallaweb API running" });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/members", memberRoutes);

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Veshallaweb API listening on http://localhost:${PORT}`);
});
