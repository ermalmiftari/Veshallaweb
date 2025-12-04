// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create Stripe Checkout session
router.post("/create-session", paymentController.createCheckoutSession);

// Webhook (this route will be mounted with express.raw in server.js)
router.post("/webhook", paymentController.handleWebhook);

module.exports = router;
