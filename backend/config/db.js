// config/db.js
require("dotenv").config();
const mysql = require("mysql2");

// Create the pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise(); // <<< IMPORTANT: enables .query() to work

// Test connection once
async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");
    console.log("MySQL connected. Test query result:", rows[0].result);
  } catch (err) {
    console.error("MySQL connection error:", err.message);
  }
}

testConnection();

module.exports = pool; // <<< DEFAULT EXPORT for require()
