import React, { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
}

export default function Checkout() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart
  useEffect(() => {
    const raw = localStorage.getItem("veshalla_cart");
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
  }, []);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handlePay = async () => {
    if (!name || !email || !phone || !address) {
      setError("Please fill in all fields.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("https://veshalla.info/api/orders/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
          shipping_address: address,
          currency: "eur",
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            size: item.size,
            qty: item.qty,
            price: item.price
          }))
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to start checkout");
      }

      const data = await res.json();
      localStorage.removeItem("veshalla_cart");

      window.location.href = data.url;
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#0f1612] to-[#0a0d0b] text-white pb-safe">

      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-stone-800/80">
        <a
          href="/shop"
          className="text-sm sm:text-base text-gray-300 hover:text-amber-200 transition"
        >
          ← Back to shop
        </a>
        <h1 className="text-lg sm:text-xl font-semibold text-amber-100">
          Checkout
        </h1>
        <div />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid gap-8 lg:grid-cols-[2fr,1.5fr]">

        {/* Left */}
        <section className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-4">
            Contact & Shipping
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block text-sm text-gray-300 mb-1">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-2 text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-2 text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-2 text-sm"
                placeholder="+389..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg bg-stone-900 border border-stone-700 px-3 py-2 text-sm min-h-[80px]"
                placeholder="Street, city, country"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-900/20 border border-red-700/50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              disabled={loading || items.length === 0}
              onClick={handlePay}
              className={`w-full mt-2 py-3 rounded-lg font-semibold ${
                loading || items.length === 0
                  ? "bg-stone-800 text-gray-600 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700 text-white"
              }`}
            >
              {loading ? "Redirecting to Stripe..." : `Pay ${subtotal.toFixed(2)} €`}
            </button>

            <p className="text-xs text-gray-500 mt-2">Payments are via Stripe.</p>
          </div>
        </section>

        {/* Right */}
        <section className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 sm:p-7 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-semibold text-amber-100 mb-4">
            Order Summary
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Your cart is empty. <a href="/shop" className="text-amber-300 underline">Go back</a>.
            </p>
          ) : (
            <>
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-3 items-center bg-stone-900/80 border border-stone-700/70 rounded-xl p-3"
                  >
                    <img src={item.image} className="w-16 h-16 rounded-md object-cover" />

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-amber-100">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        Size: {item.size} · Qty: {item.qty}
                      </p>
                    </div>

                    <div className="text-sm font-bold text-amber-200">
                      {(item.price * item.qty).toFixed(2)} €
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-700 mt-4 pt-4 text-sm space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between text-amber-200 font-bold">
                  <span>Total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
