const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
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
