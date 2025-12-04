// config/stripe.js
const Stripe = require("stripe");

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in .env");
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // or latest from Stripe
});

module.exports = stripe;
