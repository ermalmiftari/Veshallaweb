// controllers/paymentController.js
const stripe = require("../config/stripe");
const Member = require("../models/memberModel");
const Order = require("../models/orderModel"); // NEW

function generateMembershipCode() {
  // Simple 8-char code like VES-AB12-CD34
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let part1 = "";
  let part2 = "";
  for (let i = 0; i < 4; i++)
    part1 += chars[Math.floor(Math.random() * chars.length)];
  for (let i = 0; i < 4; i++)
    part2 += chars[Math.floor(Math.random() * chars.length)];
  return `VES-${part1}-${part2}`;
}

// POST /api/payments/create-session
// MEMBERSHIP checkout – uses Member model
exports.createCheckoutSession = async (req, res) => {
  try {
    const { memberId, amount, currency } = req.body;

    if (!memberId || !amount || !currency) {
      return res
        .status(400)
        .json({ error: "memberId, amount, and currency are required" });
    }

    const member = await Member.getById(Number(memberId));
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const frontendBaseUrl =
      process.env.FRONTEND_BASE_URL || "https://veshalla.info";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: Math.round(amount * 100), // EUR to cents
            product_data: {
              name: `Veshalla Membership (${
                member.location === "mk" ? "Local" : "Diaspora"
              })`,
              description: `${member.name} ${member.surname}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${frontendBaseUrl}/en/member-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendBaseUrl}/en/member?status=cancelled`,
      metadata: {
        type: "membership", // <<< important for webhook routing
        memberId: String(member.id),
      },
    });

    // Save session id & status
    await Member.update(member.id, {
      stripe_session_id: session.id,
      stripe_payment_status: "created",
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return res
      .status(500)
      .json({ error: "Failed to create checkout session" });
  }
};

// POST /api/payments/webhook
exports.handleWebhook = (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(
      "Stripe webhook signature verification failed:",
      err.message
    );
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const type = session.metadata?.type || "membership";

    // MEMBERSHIP payment
    if (type === "membership") {
      const memberId = session.metadata?.memberId;
      const sessionId = session.id;

      (async () => {
        try {
          if (!memberId) return;

          const code = generateMembershipCode();

          await Member.update(Number(memberId), {
            stripe_session_id: sessionId,
            stripe_payment_status: "paid",
            membership_code: code,
          });

          console.log(`Membership paid for member ${memberId}, code=${code}`);
        } catch (err) {
          console.error("Error updating member on webhook:", err);
        }
      })();
    }

    // SHOP ORDER payment
    if (type === "order") {
      const orderId = session.metadata?.orderId;
      const sessionId = session.id;

      (async () => {
        try {
          if (!orderId) return;

          await Order.update(Number(orderId), {
            stripe_session_id: sessionId,
            stripe_payment_status: "paid",
          });

          console.log(`Order paid: orderId=${orderId}`);
        } catch (err) {
          console.error("Error updating order on webhook:", err);
        }
      })();
    }
  }

  res.json({ received: true });
};
