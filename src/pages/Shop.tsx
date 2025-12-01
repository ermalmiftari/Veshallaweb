import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function Shop(): JSX.Element {
  const { lang } = useParams<{ lang: string }>();

  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [query, setQuery] = useState("");

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const updateQuantity = (name: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(1, (prev[name] || 1) + delta),
    }));
  };

  const products = [
    {
      name: "Mountain Honey",
      price: "12€",
      desc: "Pure raw honey collected from Veshalla’s high-altitude wildflowers.",
      img: "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Wild Herbal Tea",
      price: "8€",
      desc: "A soothing mix of hand-picked alpine herbs and flowers.",
      img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Traditional Cheese",
      price: "15€",
      desc: "Farm-made goat and sheep cheese matured in natural caves.",
      img: "https://images.unsplash.com/photo-1559561854-7c1c1b22a4a6?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Handmade Wood Craft",
      price: "25€",
      desc: "Locally carved mountain wood decorations and figures.",
      img: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Forest Berry Jam",
      price: "10€",
      desc: "Jam made from berries growing deep inside the forest trails.",
      img: "https://images.unsplash.com/photo-1618165705076-0605a2c5a7d8?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Dried Mountain Herbs",
      price: "7€",
      desc: "Aromatic herbs collected from untouched mountain slopes.",
      img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-700 to-emerald-900 text-white relative overflow-hidden">
      {/* 🌿 PARALLAX TREES (FOREGROUND) */}
      <motion.img
        src="https://i.imgur.com/LjGQe1u.png"
        className="pointer-events-none select-none opacity-40 absolute bottom-0 left-0 w-1/2 -z-10"
        initial={{ y: 0 }}
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        style={{ transform: "translateZ(0)" }}
      />

      <motion.img
        src="https://i.imgur.com/LjGQe1u.png"
        className="pointer-events-none select-none opacity-40 absolute bottom-0 right-0 w-1/2 -z-10 scale-x-[-1]"
        initial={{ y: 0 }}
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* 🍂 FALLING LEAVES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-300 text-xl"
            style={{
              top: -20,
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: ["0%", "120%"],
              x: ["0%", Math.random() * 40 - 20 + "%"],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            🍂
          </motion.div>
        ))}
      </div>

      {/* 🏔 BACK BUTTON */}
      <Link
        to={`/${lang || "en"}/home`}
        className="fixed top-6 left-6 z-50 px-5 py-3 bg-white/90 text-emerald-800 font-semibold rounded-xl shadow-xl hover:bg-gray-100 transition backdrop-blur"
      >
        ⛰️ Home
      </Link>

      {/* ================= TITLE + SEARCH ================= */}
      <header className="pt-32 pb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold drop-shadow-xl"
        >
          Veshalla Shop
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 mt-3 max-w-xl mx-auto text-lg"
        >
          Natural products from the mountain village.
        </motion.p>

        {/* 🔍 SEARCH BAR */}
        <motion.input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-8 w-full max-w-md mx-auto px-5 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none backdrop-blur shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        />
      </header>

      {/* ================= PRODUCT GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((p, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden hover:scale-[1.03] transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={p.img}
                className="h-56 w-full object-cover cursor-pointer"
                onClick={() => setDetail(p)}
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-white/80">{p.price}</p>

                {/* ➕➖ QUANTITY SELECTOR */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(p.name, -1)}
                    className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30"
                  >
                    ➖
                  </button>

                  <div className="px-4 py-1 bg-white/20 rounded-lg">
                    {quantities[p.name] || 1}
                  </div>

                  <button
                    onClick={() => updateQuantity(p.name, +1)}
                    className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30"
                  >
                    ➕
                  </button>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setDetail(p)}
                    className="flex-1 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition font-semibold"
                  >
                    View
                  </button>

                  <button
                    onClick={() => setCartOpen(true)}
                    className="flex-1 py-3 bg-orange-500 rounded-xl hover:bg-orange-600 transition font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCT DETAIL POPUP ================= */}
      <AnimatePresence>
        {detail && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 border border-white/20 rounded-3xl p-6 max-w-lg w-full backdrop-blur-xl shadow-2xl relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setDetail(null)}
                className="absolute top-4 right-4 text-white"
              >
                <X size={28} />
              </button>

              <img
                src={detail.img}
                className="rounded-xl w-full h-56 object-cover mb-4"
              />

              <h2 className="text-3xl font-bold">{detail.name}</h2>
              <p className="text-white/70 mt-2">{detail.desc}</p>
              <p className="text-xl font-semibold mt-3">{detail.price}</p>

              {/* Quantity inside popup */}
              <div className="flex items-center gap-3 mt-4 justify-center">
                <button
                  onClick={() => updateQuantity(detail.name, -1)}
                  className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30"
                >
                  ➖
                </button>

                <div className="px-4 py-1 bg-white/20 rounded-lg">
                  {quantities[detail.name] || 1}
                </div>

                <button
                  onClick={() => updateQuantity(detail.name, +1)}
                  className="px-3 py-1 bg-white/20 rounded-lg hover:bg白/30"
                >
                  ➕
                </button>
              </div>

              <button
                onClick={() => setCartOpen(true)}
                className="mt-6 w-full py-3 bg-orange-500 rounded-xl font-semibold hover:bg-orange-600"
              >
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CART DRAWER ================= */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white/10 backdrop-blur-xl border-l border-white/30 shadow-2xl z-50 p-6"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>

            <p className="text-white/70 mt-8">
              Cart system can be implemented with backend / database.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-10 text-white/70">
        © 2025 Veshalla Mountain Market — Made with nature 🌿
      </footer>
    </div>
  );
}
