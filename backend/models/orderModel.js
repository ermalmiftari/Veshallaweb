// models/orderModel.js
const dbModule = require("../config/db");
const pool = dbModule.default || dbModule;

/**
 * data: {
 *   customer_name,
 *   customer_email,
 *   customer_phone,
 *   shipping_address,
 *   total_amount,
 *   currency,
 *   items: [{ productId, name, size, qty, price }]
 * }
 */
async function create(data) {
  const {
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    total_amount,
    currency,
    items = [],
  } = data;

  // 1) Insert order
  const [result] = await pool.query(
    `INSERT INTO orders
      (customer_name, customer_email, customer_phone, shipping_address, total_amount, currency, stripe_session_id, stripe_payment_status)
     VALUES (?, ?, ?, ?, ?, ?, NULL, 'created')`,
    [
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      total_amount,
      currency,
    ]
  );

  const orderId = result.insertId;

  // 2) Insert items
  for (const item of items) {
    await pool.query(
      `INSERT INTO order_items
        (order_id, product_id, product_name, size, quantity, unit_price)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        item.productId,
        item.name,
        item.size,
        item.qty,
        item.price,
      ]
    );
  }

  return getById(orderId);
}

async function getById(id) {
  const [orders] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
  if (!orders.length) return null;

  const [items] = await pool.query(
    "SELECT * FROM order_items WHERE order_id = ?",
    [id]
  );

  const order = orders[0];
  order.items = items;
  return order;
}

async function update(id, data) {
  const fields = [];
  const values = [];

  const allowed = [
    "customer_name",
    "customer_email",
    "customer_phone",
    "shipping_address",
    "total_amount",
    "currency",
    "stripe_session_id",
    "stripe_payment_status",
  ];

  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }

  if (!fields.length) {
    return getById(id);
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE orders SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  if (result.affectedRows === 0) return null;
  return getById(id);
}

module.exports = {
  create,
  getById,
  update,
};
