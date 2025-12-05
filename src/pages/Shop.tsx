import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  desc?: string;
  image: string;
  sizes?: string[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
}

export default function Shop() {
  const { lang } = useParams<{ lang: string }>();
  const activeLang = lang || "en";

  const [products, setProducts] = useState<Product[]>([]);
  const [detail, setDetail] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch products from backend
  useEffect(() => {
    fetch("https://veshalla.info/api/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          desc: p.desc || p.description || "Veshalla merch",
          image: p.image,
          sizes: p.sizes || ["S", "M", "L", "XL"],
        }));
        setProducts(formatted);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Disable scroll when modal/cart is open
  useEffect(() => {
    document.body.style.overflow = detail || cartOpen ? "hidden" : "auto";
  }, [detail, cartOpen]);

  const addToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          qty: 1,
        },
      ];
    });

    setDetail(null);
    setCartOpen(true);
  };

  const removeFromCart = (id: number, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updateQty = (id: number, size: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );

  // handle checkout – store cart and go to /:lang/checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    localStorage.setItem("veshalla_cart", JSON.stringify(cartItems));
    window.location.href = `/${activeLang}/checkout`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white bg-gradient-to-b from-[#1a1410] via-[#0f1612] to-[#0a0d0b] pb-safe">
      {/* HOME BUTTON */}
      <a
        href={`/${activeLang}/home`}
        className="fixed top-safe left-safe sm:top-6 sm:left-6 z-50 px-3 py-2 text-gray-400 hover:text-amber-200 font-medium transition text-sm sm:text-base flex items-center gap-2"
      >
        ← Home
      </a>

      {/* CART BUTTON FLOATING */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed top-safe right-safe sm:top-6 sm:right-6 z-50 bg-amber-600 hover:bg-amber-700 rounded-full px-4 py-2 text-sm sm:text-base font-semibold shadow-md"
      >
        Cart ({cartItems.reduce((sum, i) => sum + i.qty, 0)})
      </button>

      {/* HEADER */}
      <header className="pt-28 sm:pt-32 pb-12 sm:pb-16 text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-amber-100 mb-3">
          Veshalla Collection
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-lg mx-auto">
          Wear the spirit of the mountains.
        </p>
      </header>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-32">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-xl bg-stone-900/50 border border-stone-700/40 shadow-xl hover:border-stone-600/60 transition"
            >
              {/* IMAGE – opens details popup */}
              <div
                className="h-64 sm:h-72 w-full overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedSize("M");
                  setDetail(p);
                }}
              >
                <img
                  src={p.image}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-amber-100 mb-2">
                  {p.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {p.desc}
                </p>

                <div className="flex justify-between mb-4">
                  <p className="text-xl font-bold text-amber-200">
                    {p.price}€
                  </p>
                </div>

                {/* BUTTON now called "Add to Cart" but behaves like old Details (opens popup) */}
                <button
                  onClick={() => {
                    setSelectedSize("M");
                    setDetail(p);
                  }}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT POPUP */}
      {detail && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-stone-900 border border-stone-700 rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setDetail(null)}
            >
              <X />
            </button>

            <img
              src={detail.image}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold text-amber-100 mb-2">
              {detail.name}
            </h2>
            <p className="text-gray-300 text-sm mb-4">{detail.desc}</p>
            <p className="text-2xl font-bold text-amber-200 mb-5">
              {detail.price}€
            </p>

            <p className="text-xs text-gray-400 mb-2 uppercase font-medium">
              Select Size
            </p>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {(detail.sizes || ["S", "M", "L", "XL"]).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded-lg border text-sm font-semibold ${
                    selectedSize === size
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-stone-800/40 border-stone-700 text-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={() => addToCart(detail, selectedSize)}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold"
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
          <div className="fixed right-0 top-0 h-full w-full max-w-xs sm:max-w-md bg-stone-900 border-l border-stone-700 z-50 flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-stone-700">
              <h2 className="text-xl font-bold text-amber-100">
                Shopping Cart
              </h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setCartOpen(false)}
              >
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 && (
                <p className="text-gray-400 text-center mt-10">
                  Your cart is empty
                </p>
              )}

              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 items-center bg-stone-800/40 p-3 rounded-lg border border-stone-700"
                >
                  <img
                    src={item.image}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-amber-100 text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-300">
                      Size: {item.size}
                    </p>
                    <p className="text-amber-200 text-sm font-bold mt-1">
                      {item.price}€
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.size, -1)}
                        className="px-2 bg-stone-800 rounded"
                      >
                        −
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.size, 1)}
                        className="px-2 bg-stone-800 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-stone-700">
              <div className="flex justify-between text-gray-300 mb-3">
                <span>Subtotal</span>
                <span className="text-amber-200 font-bold">
                  {subtotal.toFixed(2)}€
                </span>
              </div>

              <button
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
                className={`w-full py-3 rounded-lg font-semibold ${
                  cartItems.length === 0
                    ? "bg-stone-800 text-gray-600 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
                }`}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
