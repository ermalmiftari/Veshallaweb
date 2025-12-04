import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function Shop() {
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantities, setQuantities] = useState({});

  // Prevent background scrolling when popup/cart is open
  useEffect(() => {
    if (detail || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [detail, cartOpen]);

  const updateQuantity = (name, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(1, (prev[name] || 1) + delta),
    }));
  };

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
    <div
      className="
        min-h-screen relative overflow-hidden text-white
        bg-gradient-to-b from-[#1a1410] via-[#0f1612] to-[#0a0d0b]
        pb-safe
      "
    >

      {/* Texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* HOME BUTTON */}
      <a
        href="/"
        className="
          fixed top-safe left-safe sm:top-6 sm:left-6 z-50 
          px-3 py-2 text-gray-400 hover:text-amber-200 
          font-medium transition text-sm sm:text-base 
          flex items-center gap-2
        "
      >
        ← Home
      </a>

      {/* HEADER */}
      <header className="pt-28 sm:pt-32 pb-12 sm:pb-16 text-center px-4 relative z-10">
        <div className="inline-block mb-4 px-4 py-1.5 bg-amber-600/10 border border-amber-600/20 rounded-full">
          <span className="text-amber-200 text-xs sm:text-sm font-medium">
            Official Merchandise
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-amber-100 mb-3 sm:mb-4">
          Veshalla Collection
        </h1>

        <p className="text-gray-400 text-sm sm:text-lg max-w-xl mx-auto px-2 leading-relaxed">
          Wear the spirit of the mountains — crafted for our global community.
        </p>
      </header>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-32 relative z-10">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((p, i) => (
            <div
              key={i}
              className="
                rounded-xl bg-stone-900/50 border border-stone-700/40 
                shadow-xl overflow-hidden 
                hover:border-stone-600/60 hover:shadow-2xl 
                transition-all duration-300
              "
            >
              {/* IMAGE */}
              <div
                className="
                  h-64 sm:h-72 w-full overflow-hidden cursor-pointer relative
                "
                onClick={() => {
                  setSelectedSize("M");
                  setDetail(p);
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition" />
              </div>

              {/* CARD CONTENT */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-amber-100 mb-2">{p.name}</h3>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{p.desc}</p>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-amber-200 font-bold text-xl">{p.price}</p>
                  <span className="text-xs text-gray-500 bg-stone-800/50 px-2 py-1 rounded">
                    In Stock
                  </span>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setDetail(p)}
                    className="
                      flex-1 py-2 bg-transparent border border-stone-700/60 
                      rounded-lg hover:bg-stone-800/40 
                      transition text-sm text-gray-300
                    "
                  >
                    Details
                  </button>

                  <button
                    onClick={() => setCartOpen(true)}
                    className="
                      flex-1 py-2 bg-amber-600 hover:bg-amber-700 
                      text-white rounded-lg transition 
                      font-semibold text-sm shadow-md
                    "
                  >
                    Add
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
          className="
            fixed inset-0 bg-black/85 z-50 
            flex justify-center items-center 
            p-4 sm:p-6
          "
          onClick={() => setDetail(null)}
        >
          <div
            className="
              bg-stone-900 border border-stone-700 
              rounded-2xl p-6 sm:p-8 w-full max-w-lg 
              max-h-[92vh] overflow-y-auto 
              shadow-xl relative
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}
            <button
              onClick={() => setDetail(null)}
              className="
                absolute top-4 right-4 
                w-8 h-8 rounded-full 
                bg-stone-800/50 text-gray-400 
                hover:text-white transition
              "
            >
              <X size={18} />
            </button>

            {/* IMAGE */}
            <div className="rounded-xl overflow-hidden mb-4 shadow-lg">
              <img
                src={detail.img}
                alt={detail.name}
                className="w-full h-56 sm:h-72 object-cover"
              />
            </div>

            {/* DETAILS */}
            <h2 className="text-2xl font-bold text-amber-100 mb-2">
              {detail.name}
            </h2>

            <p className="text-gray-300 text-sm mb-4">{detail.desc}</p>

            <p className="text-2xl font-bold text-amber-200 mb-5">
              {detail.price}
            </p>

            {/* SIZE */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2 uppercase font-medium">
                Select Size
              </p>

              <div className="grid grid-cols-4 gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      py-2 sm:py-3 rounded-lg border font-semibold text-sm sm:text-base
                      ${
                        selectedSize === size
                          ? "bg-amber-600 text-white border-amber-600 shadow-md"
                          : "bg-stone-800/40 border-stone-700 text-gray-300 hover:bg-stone-800/60"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2 uppercase font-medium">
                Quantity
              </p>

              <div className="flex items-center gap-4 justify-center">
                <button
                  onClick={() => updateQuantity(detail.name, -1)}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-800/50 border border-stone-700 rounded-lg flex justify-center items-center text-lg font-bold text-gray-300 hover:bg-stone-800"
                >
                  −
                </button>

                <div className="w-16 sm:w-20 h-10 sm:h-12 bg-stone-800/40 border border-stone-700 rounded-lg flex items-center justify-center font-bold text-lg">
                  {quantities[detail.name] || 1}
                </div>

                <button
                  onClick={() => updateQuantity(detail.name, 1)}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-800/50 border border-stone-700 rounded-lg flex justify-center items-center text-lg font-bold text-gray-300 hover:bg-stone-800"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setCartOpen(true);
                setDetail(null);
              }}
              className="
                w-full py-3 sm:py-3.5 
                bg-amber-600 hover:bg-amber-700 
                text-white rounded-lg 
                font-semibold shadow-md
              "
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
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setCartOpen(false)}
          />

          <div
            className="
              fixed top-0 right-0 h-full 
              w-full max-w-xs sm:max-w-md 
              bg-stone-900 border-l border-stone-700 
              shadow-2xl z-50 flex flex-col
            "
          >
            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-stone-700">
              <h2 className="text-lg sm:text-xl font-bold text-amber-100">
                Shopping Cart
              </h2>

              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-800/50 text-gray-400 hover:text-white flex justify-center items-center transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="bg-stone-800/30 border border-stone-700 rounded-xl p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-stone-800/50 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🛒</span>
                </div>

                <p className="text-gray-300 font-medium mb-2">
                  Your cart is empty
                </p>

                <p className="text-gray-500 text-xs sm:text-sm">
                  Add products to begin
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 border-t border-stone-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm">Subtotal</span>
                <span className="text-amber-200 font-bold text-lg">0€</span>
              </div>

              <button className="w-full py-3 bg-stone-700/50 text-gray-500 rounded-lg font-semibold cursor-not-allowed">
                Checkout
              </button>

              <p className="text-center text-xs text-gray-600 mt-3">
                Cart system coming soon
              </p>
            </div>
          </div>
        </>
      )}

      {/* FOOTER */}
      <footer className="border-t border-stone-800 py-8 px-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            © 2025 Veshalla — Made for our community
          </p>

          <div className="flex gap-6 text-xs sm:text-sm">
            <a className="text-gray-500 hover:text-amber-200">Shipping</a>
            <a className="text-gray-500 hover:text-amber-200">Returns</a>
            <a className="text-gray-500 hover:text-amber-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
