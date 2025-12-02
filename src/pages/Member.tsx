import { useState } from "react";
import { Link } from "react-router-dom";

export default function Member() {
  const [location, setLocation] = useState("mk");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
  });

  const prices = {
    mk: { price: 10, currency: "EUR", label: "🇲🇰 North Macedonia" },
    switzerland: { price: 100, currency: "CHF", label: "🇨🇭 Switzerland" },
    germany: { price: 100, currency: "EUR", label: "🇩🇪 Germany" },
    austria: { price: 100, currency: "EUR", label: "🇦🇹 Austria" },
    italy: { price: 100, currency: "EUR", label: "🇮🇹 Italy" },
    slovenia: { price: 100, currency: "EUR", label: "🇸🇮 Slovenia" },
    belgium: { price: 100, currency: "EUR", label: "🇧🇪 Belgium" },
    france: { price: 100, currency: "EUR", label: "🇫🇷 France" },
    sweden: { price: 100, currency: "EUR", label: "🇸🇪 Sweden" },
    netherlands: { price: 100, currency: "EUR", label: "🇳🇱 Netherlands" },
    usa: { price: 100, currency: "USD", label: "🇺🇸 USA" },
  };

  const { price, currency, label } = prices[location];

  const handleChange = (field: string, val: string) =>
    setFormData((prev) => ({ ...prev, [field]: val }));

  // NEW BACKEND CONNECTED SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://46.101.135.237:4000/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          location,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert(data.error || "Failed to create member");
      } else {
        console.log("Member created:", data);
        alert("Member saved to DB!");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div
      className="
      min-h-screen relative px-4 sm:px-6 py-10 
      text-white flex flex-col
      "
      style={{
        background:
          "linear-gradient(to bottom, #0f0f0f 0%, #121712 45%, #0e1712 100%)",
      }}
    >
      {/* ORANGE GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,140,60,0.25),transparent_70%)] pointer-events-none" />

      {/* FOREST GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(60,100,70,0.20),transparent_80%)] pointer-events-none" />

      {/* CLEAN HOME BUTTON */}
      <div className="relative z-10 mb-6">
        <Link
          to="/"
          className="
            flex items-center gap-2
            text-amber-300 hover:text-amber-200 
            text-sm sm:text-base 
            font-medium transition
          "
        >
          <span className="text-lg">⛰️</span> Home
        </Link>
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <p className="text-xs tracking-[0.25em] text-amber-200/80 mb-1">
          COMMUNITY
        </p>

        <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-xl">
          <span className="text-amber-300">Veshalla</span> Membership
        </h1>

        <p className="text-gray-300 text-sm sm:text-lg mt-3 sm:mt-4 max-w-xl mx-auto">
          A mountain village with a global heart — wherever you are, you belong
          to Veshalla.
        </p>
      </div>

      {/* FORM CARD */}
      <div className="relative z-10 max-w-xl mx-auto w-full">
        <div className="bg-black/40 border border-[#3b3b3b] backdrop-blur-xl shadow-xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-center text-lg sm:text-xl font-semibold text-amber-300 mb-5">
            Membership Form
          </h2>

          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            {/* NAME ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">
                  Name
                </label>
                <input
                  className="w-full bg-black/50 border border-[#4c4c4c] px-3 py-2 sm:py-2.5 rounded-lg text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">
                  Surname
                </label>
                <input
                  className="w-full bg-black/50 border border-[#4c4c4c] px-3 py-2 sm:py-2.5 rounded-lg text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  value={formData.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                />
              </div>
            </div>

            {/* PHONE + EMAIL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">
                  Phone
                </label>
                <input
                  className="w-full bg-black/50 border border-[#4c4c4c] px-3 py-2 sm:py-2.5 rounded-lg text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  placeholder="+389 ..."
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">
                  Email
                </label>
                <input
                  className="w-full bg-black/50 border border-[#4c4c4c] px-3 py-2 sm:py-2.5 rounded-lg text-white focus:ring-1 focus:ring-amber-400 outline-none"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="text-xs sm:text-sm text-gray-300 mb-1 block">
                Address
              </label>
              <input
                className="w-full bg-black/50 border border-[#4c4c4c] px-3 py-2 sm:py-2.5 rounded-lg text-white focus:ring-1 focus:ring-amber-400 outline-none"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            {/* COUNTRY SELECT */}
            <div>
              <label className="text-xs sm:text-sm text-gray-300 mb-1 block">
                Where do you live?
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="
                  w-full bg-[#1a1f1c] border border-[#5c5c5c]
                  text-white px-3 py-2 sm:py-2.5 rounded-lg
                  focus:ring-1 focus:ring-amber-400 outline-none cursor-pointer
                "
              >
                <option value="mk">🇲🇰 North Macedonia</option>

                <optgroup label="Europe">
                  <option value="switzerland">🇨🇭 Switzerland</option>
                  <option value="germany">🇩🇪 Germany</option>
                  <option value="austria">🇦🇹 Austria</option>
                  <option value="italy">🇮🇹 Italy</option>
                  <option value="slovenia">🇸🇮 Slovenia</option>
                  <option value="belgium">🇧🇪 Belgium</option>
                  <option value="france">🇫🇷 France</option>
                  <option value="sweden">🇸🇪 Sweden</option>
                  <option value="netherlands">🇳🇱 Netherlands</option>
                </optgroup>

                <optgroup label="World">
                  <option value="usa">🇺🇸 USA</option>
                </optgroup>
              </select>
            </div>

            {/* PRICE BOX */}
            <div className="bg-black/40 border border-[#4c4c4c] px-4 sm:px-5 py-3 sm:py-4 rounded-xl">
              <p className="text-amber-300 font-medium text-base sm:text-lg">
                Membership fee:
                <span className="font-bold text-amber-200">
                  {" "}
                  {price} {currency}
                </span>
              </p>

              <p className="text-[10px] sm:text-xs text-amber-200/80 mt-1">
                {location === "mk"
                  ? "Local membership price."
                  : `Diaspora · ${label}`}
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="
                w-full bg-amber-600 hover:bg-amber-500 
                py-3 sm:py-3.5 rounded-lg font-semibold 
                shadow-lg transition text-sm sm:text-base
              "
            >
              Join Veshalla →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
