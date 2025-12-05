// controllers/productController.js
const Product = require("../models/productModel");

// GET /api/products
async function getProducts(req, res) {
  try {
    const rows = await Product.getAll();

    // Shape it to match your Shop component expectations
    const products = rows.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      desc: item.description || "Veshalla merch",
      image: item.image, // e.g. "/images/products/mountain-shirt.png"
      sizes: item.sizes ? String(item.sizes).split(",") : ["S", "M", "L", "XL"],
    }));

    return res.json(products);
  } catch (err) {
    console.error("Error getting products:", err);
    return res.status(500).json({
      error: "Failed to fetch products",
      code: err.code,
      message: err.message,
      sqlMessage: err.sqlMessage,
    });
  }
}

// GET /api/products/:id
async function getProductById(req, res) {
  try {
    const id = Number(req.params.id);
    const item = await Product.getById(id);

    if (!item) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = {
      id: item.id,
      name: item.name,
      price: Number(item.price),
      desc: item.description || "Veshalla merch",
      image: item.image,
      sizes: item.sizes ? String(item.sizes).split(",") : ["S", "M", "L", "XL"],
    };

    return res.json(product);
  } catch (err) {
    console.error("Error getting product by id:", err);
    return res.status(500).json({
      error: "Failed to fetch product",
      code: err.code,
      message: err.message,
      sqlMessage: err.sqlMessage,
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
};
