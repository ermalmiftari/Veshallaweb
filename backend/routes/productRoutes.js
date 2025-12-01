const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// /api/products
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.get("/:id/variant", productController.getVariantStock);

module.exports = router;
