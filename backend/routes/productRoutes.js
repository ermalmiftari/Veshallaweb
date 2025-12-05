// routes/productRoutes.js
const express = require("express");
const db = require("../config/db").default; // ⬅ FIXED

const router = express.Router();

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
      GROUP BY p.id
    `);

    const products = rows.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      sizes: item.sizes ? item.sizes.split(",") : [],
    }));

    res.json(products);
  } catch (err) {
  console.error("Error fetching products:", err.message);
  res.status(500).json({ error: err.message });
}

});

module.exports = router;

