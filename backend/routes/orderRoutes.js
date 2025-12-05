// routes/orderRoutes.js
const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// POST /api/orders/create-session
router.post("/create-session", orderController.createOrderAndSession);

module.exports = router;
