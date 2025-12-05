// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create Stripe Checkout session
router.post("/create-session", paymentController.createCheckoutSession);

// Webhook is defined directly in server.js with raw body parser
module.exports = router;
