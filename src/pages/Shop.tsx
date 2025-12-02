import { useState } from "react";
import { X } from "lucide-react";

export default function Shop() {
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (name, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(1, (prev[name] || 1) + delta),
    }));
  };

  // T-SHIRT PRODUCTS
  const products = [
    {
      name: "Veshalla Classic T-Shirt",
      price: "20€",
      desc: "Premium cotton shirt with the Veshalla emblem.",
      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3c7b?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Mountain Spirit T-Shirt",
      price: "25€",
      desc: "Inspired by Sharr's mountain lines and warm colors.",
      img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Black Forest Edition",
      price: "30€",
      desc: "Soft dark cotton with forest-green signature print.",
      img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Vintage Veshalla Tee",
      price: "22€",
      desc: "Retro print inspired by old village traditions.",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Diaspora Edition Shirt",
      price: "27€",
      desc: "Special edition for the global Veshalla community.",
      img: "https://images.unsplash.com/photo-1585152456992-e71d5f8236c7b?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Alpine Minimal Tee",
      price: "18€",
      desc: "Minimalist mountain-themed daily wear.",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden text-white bg-gradient-to-b from-[#1a1410] via-[#0f1612] to-[#0a0d0b]">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Back Button */}
      <a
        href="/"
        className="fixed top-6 left-6 z-50 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
      >
        ⛰️ Home
      </a>

      {/* HEADER */}
      <header className="pt-32 pb-10 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
          Veshalla T-Shirts
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto">
          Premium shirts inspired by Veshalla's nature and culture.
        </p>
      </header>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p, i) => (
            <div
              key={i}
              className="rounded-xl bg-stone-900/50 border border-stone-700/40 shadow-xl overflow-hidden hover:border-amber-600/50 transition-all duration-200 group"
            >
              <div 
                className="h-64 w-full overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedSize("M");
                  setDetail(p);
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-100 mb-1">
                  {p.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{p.desc}</p>
                <p className="text-amber-200 font-bold text-lg mb-4">{p.price}</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setDetail(p)}
                    className="flex-1 py-2.5 bg-stone-800/50 border border-stone-700/50 rounded-lg hover:bg-stone-800/70 transition-colors duration-200 font-medium text-sm"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => setCartOpen(true)}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-200 font-semibold text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT POPUP */}
      {detail && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-6"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-stone-900/90 border border-stone-700/50 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetail(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X size={24} />
            </button>

            <div className="rounded-xl overflow-hidden mb-5">
              <img
                src={detail.img}
                alt={detail.name}
                className="w-full h-64 object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-amber-100 mb-2">
              {detail.name}
            </h2>

            <p className="text-gray-300 text-sm mb-3">{detail.desc}</p>
            <p className="text-xl font-bold text-amber-200 mb-5">
              {detail.price}
            </p>

            {/* SIZE SELECTOR */}
            <div className="mb-5">
              <p className="text-sm text-gray-400 mb-3 font-medium">Select Size:</p>

              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      flex-1 py-2 rounded-lg border font-medium transition-colors duration-200
                      ${
                        selectedSize === size
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-stone-800/50 border-stone-700/50 text-gray-300 hover:bg-stone-800/70"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mb-6 justify-center">
              <button
                onClick={() => updateQuantity(detail.name, -1)}
                className="w-10 h-10 bg-stone-800/50 border border-stone-700/50 rounded-lg hover:bg-stone-800/70 transition-colors duration-200 flex items-center justify-center"
              >
                −
              </button>

              <div className="w-16 h-10 bg-stone-800/50 border border-stone-700/50 rounded-lg flex items-center justify-center font-semibold">
                {quantities[detail.name] || 1}
              </div>

              <button
                onClick={() => updateQuantity(detail.name, 1)}
                className="w-10 h-10 bg-stone-800/50 border border-stone-700/50 rounded-lg hover:bg-stone-800/70 transition-colors duration-200 flex items-center justify-center"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                setCartOpen(true);
                setDetail(null);
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setCartOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-stone-900 border-l border-stone-700/50 shadow-2xl z-50 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-100">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="bg-stone-800/50 border border-stone-700/50 rounded-lg p-6 text-center">
              <p className="text-gray-400">
                Your cart is empty. Add some products to get started!
              </p>
              <p className="text-gray-500 text-sm mt-3">
                Cart functionality coming soon.
              </p>
            </div>
          </div>
        </>
      )}

      {/* FOOTER */}
      <footer className="text-center py-12 text-gray-500 relative z-10">
        © 2025 Veshalla T-Shirts — Made with pride 🏔️
      </footer>
    </div>
  );
}
