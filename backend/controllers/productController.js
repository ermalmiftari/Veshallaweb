const Product = require("../models/productModel");

exports.getProducts = (req, res) => {
  const { category } = req.query;
  const products = Product.getAll(category);
  res.json(products);
};

exports.getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = Product.getById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
};

exports.getVariantStock = (req, res) => {
  const id = Number(req.params.id);
  const { color, size } = req.query;

  if (!color || !size) {
    return res
      .status(400)
      .json({ error: "color and size query parameters are required" });
  }

  const result = Product.getVariantStock(id, color, size);

  if (!result) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({
    productId: result.product.id,
    color: result.color,
    size: result.size,
    stock: result.stock
  });
};
