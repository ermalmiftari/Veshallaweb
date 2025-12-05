// config/db.js
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");
    console.log("MySQL connected. Test query result:", rows[0].result);
  } catch (err) {
    console.error("MySQL connection error:", err.message);
  }
}

// run once at startup
testConnection();

export default pool; // IMPORTANT: default export
