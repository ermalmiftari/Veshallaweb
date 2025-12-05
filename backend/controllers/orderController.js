// controllers/orderController.js
const stripe = require("../config/stripe");
const Order = require("../models/orderModel");

// POST /api/orders/create-session
// Body: { customer_name, customer_email, customer_phone, shipping_address, currency, items: [...] }
exports.createOrderAndSession = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      currency,
      items,
    } = req.body;

    if (
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !shipping_address ||
      !currency
    ) {
      return res.status(400).json({
        error:
          "customer_name, customer_email, customer_phone, shipping_address, currency are required",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items array is required" });
    }

    // Compute total on server (secure)
    const total_amount = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.qty),
      0
    );

    // 1) Create order in DB with status=created
    const order = await Order.create({
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      total_amount,
      currency,
      items,
    });

    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "https://veshalla.info";

    // 2) Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customer_email,
      line_items: items.map((item) => ({
        price_data: {
          currency,
          unit_amount: Math.round(Number(item.price) * 100), // cents
          product_data: {
            name: item.name,
            description: `Size: ${item.size}`,
          },
        },
        quantity: Number(item.qty),
      })),
      success_url: `${frontendBaseUrl}/en/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendBaseUrl}/en/shop?status=cancelled`,
      metadata: {
        type: "order",
        orderId: String(order.id),
      },
    });

    // 3) Save Stripe session id to order
    await Order.update(order.id, {
      stripe_session_id: session.id,
      stripe_payment_status: "created",
    });

    return res.json({ url: session.url, orderId: order.id });
  } catch (err) {
    console.error("Error creating order session:", err);
    return res.status(500).json({ error: "Failed to create order session" });
  }
};
