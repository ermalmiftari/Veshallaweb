import { Router } from "express";
import db from "../config/db.js"; // where your MySQL connection is defined

const router = Router();

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.name, p.price,
             (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1) AS image,
             GROUP_CONCAT(s.size_name) AS sizes
      FROM products p
      JOIN product_sizes ps ON p.id = ps.product_id
      JOIN sizes s ON ps.size_id = s.id
      GROUP BY p.id;
    `);

    // rows is a plain array in JS; remove the ": any" TypeScript type
    const products = Array.isArray(rows)
      ? rows.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          sizes: item.sizes ? String(item.sizes).split(",") : [],
        }))
      : [];

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
