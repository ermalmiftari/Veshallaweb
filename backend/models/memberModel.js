// models/memberModel.js

// Handle both CommonJS and ESM versions of ../config/db
const dbModule = require("../config/db");
const pool = dbModule.default || dbModule; // if ESM => use default, if CJS => use module itself

async function getAll() {
  const [rows] = await pool.query(
    "SELECT * FROM members ORDER BY created_at DESC"
  );
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query("SELECT * FROM members WHERE id = ?", [id]);
  return rows[0] || null;
}

async function create(data) {
  const {
    name,
    surname,
    phone,
    email,
    address,
    location,
    membership_type = "standard",
    stripe_session_id = null,
    stripe_payment_status = null,
  } = data;

  const [result] = await pool.query(
    `INSERT INTO members 
      (name, surname, phone, email, address, location, membership_type, stripe_session_id, stripe_payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      surname,
      phone,
      email,
      address,
      location,
      membership_type,
      stripe_session_id,
      stripe_payment_status,
    ]
  );

  return getById(result.insertId);
}

async function update(id, data) {
  // Build dynamic update
  const fields = [];
  const values = [];

  const allowed = [
    "name",
    "surname",
    "phone",
    "email",
    "address",
    "location",
    "membership_type",
    "is_active",
    "stripe_session_id",
    "stripe_payment_status",
    "membership_code",
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
    `UPDATE members SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  if (result.affectedRows === 0) return null;
  return getById(id);
}

async function remove(id) {
  const member = await getById(id);
  if (!member) return null;

  const [result] = await pool.query("DELETE FROM members WHERE id = ?", [id]);
  if (result.affectedRows === 0) return null;

  return member;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
