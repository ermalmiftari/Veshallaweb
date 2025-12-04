// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create Stripe Checkout session
router.post("/create-session", paymentController.createCheckoutSession);

// Do NOT define /webhook here. It is handled directly in server.js with raw body.

module.exports = router;
