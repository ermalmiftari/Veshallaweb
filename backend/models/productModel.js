// In-memory products with variants (colors / sizes)
let products = [
  {
    id: 1,
    slug: "mountain-shirt",
    name: "Mountain Village T-Shirt",
    description: "Soft cotton T-shirt with Veshalla Mountain Village print.",
    basePrice: 1200, // MKD
    category: "clothes",
    imageUrl: "/images/products/mountain-shirt.png",
    options: {
      colors: ["white", "black", "forest-green"],
      sizes: ["S", "M", "L", "XL"]
    },
    stockByVariant: {
      "white-S": 10,
      "white-M": 15,
      "white-L": 8,
      "black-M": 20,
      "black-L": 12,
      "forest-green-M": 5
    },
    isActive: true
  },
  {
    id: 2,
    slug: "hoodie-village",
    name: "Mountain Village Hoodie",
    description: "Warm hoodie, perfect for cold nights in Veshalla.",
    basePrice: 2200,
    category: "clothes",
    imageUrl: "/images/products/hoodie-village.png",
    options: {
      colors: ["black", "dark-grey"],
      sizes: ["S", "M", "L", "XL"]
    },
    stockByVariant: {
      "black-M": 10,
      "black-L": 10,
      "dark-grey-M": 7
    },
    isActive: true
  }
];

function getAll(category) {
  if (!category) return products;
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

function getById(id) {
  return products.find((p) => p.id === id);
}

function getVariantStock(id, color, size) {
  const product = getById(id);
  if (!product) return null;

  const key = `${color}-${size}`;
  const stock = product.stockByVariant[key] ?? 0;

  return { product, color, size, stock };
}

module.exports = {
  getAll,
  getById,
  getVariantStock
};
