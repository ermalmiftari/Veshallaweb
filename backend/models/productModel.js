// models/productModel.js
const pool = require("../config/db");

/**
 * Get all products with:
 * - id
 * - name
 * - price
 * - image (first image from product_images)
 * - sizes (comma-separated string from sizes table)
 */
async function getAll() {
  const [rows] = await pool.query(
    `
    SELECT 
      p.id,
      p.name,
      p.price,
      (
        SELECT image_url 
        FROM product_images 
        WHERE product_id = p.id 
        LIMIT 1
      ) AS image,
      GROUP_CONCAT(DISTINCT s.size_name ORDER BY s.size_name) AS sizes
    FROM products p
    JOIN product_sizes ps ON p.id = ps.product_id
    JOIN sizes s ON ps.size_id = s.id
    GROUP BY p.id, p.name, p.price
    ORDER BY p.id DESC
    `
  );

  // Return rows as-is; controller will format for frontend if needed
  return rows;
}

/**
 * Get single product by ID with same structure.
 */
async function getById(id) {
  const [rows] = await pool.query(
    `
    SELECT 
      p.id,
      p.name,
      p.price,
      p.description,
      (
        SELECT image_url 
        FROM product_images 
        WHERE product_id = p.id 
        LIMIT 1
      ) AS image,
      GROUP_CONCAT(DISTINCT s.size_name ORDER BY s.size_name) AS sizes
    FROM products p
    JOIN product_sizes ps ON p.id = ps.product_id
    JOIN sizes s ON ps.size_id = s.id
    WHERE p.id = ?
    GROUP BY p.id, p.name, p.price, p.description
    `,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  getAll,
  getById,
};
