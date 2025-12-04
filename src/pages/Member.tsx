import React, { useState } from "react";
import { Link } from "react-router-dom";

// Backend base URL:
// - When running frontend on localhost → talk to local backend on http://localhost:4000
// - When running on production domain (veshalla.info) → same origin (empty string)
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const BASE_URL = isLocalhost ? "http://localhost:4000" : "";

export default function Member() {
  // ---------------------------------------
  // COUNTRY META (labels only)
  // ---------------------------------------
  const countryMeta = {
    mk: { label: "🇲🇰 North Macedonia" },

    // EUROPE
    albania: { label: "🇦🇱 Albania" },
    kosovo: { label: "🇽🇰 Kosovo" },
    serbia: { label: "🇷🇸 Serbia" },
    montenegro: { label: "🇲🇪 Montenegro" },
    bosnia: { label: "🇧🇦 Bosnia & Herzegovina" },
    croatia: { label: "🇭🇷 Croatia" },
    bulgaria: { label: "🇧🇬 Bulgaria" },
    greece: { label: "🇬🇷 Greece" },
    romania: { label: "🇷🇴 Romania" },
    hungary: { label: "🇭🇺 Hungary" },
    czech: { label: "🇨🇿 Czech Republic" },
    slovakia: { label: "🇸🇰 Slovakia" },
    poland: { label: "🇵🇱 Poland" },
    slovenia: { label: "🇸🇮 Slovenia" },
    italy: { label: "🇮🇹 Italy" },
    france: { label: "🇫🇷 France" },
    spain: { label: "🇪🇸 Spain" },
    portugal: { label: "🇵🇹 Portugal" },
    germany: { label: "🇩🇪 Germany" },
    austria: { label: "🇦🇹 Austria" },
    netherlands: { label: "🇳🇱 Netherlands" },
    belgium: { label: "🇧🇪 Belgium" },
    switzerland: { label: "🇨🇭 Switzerland" },
    sweden: { label: "🇸🇪 Sweden" },
    norway: { label: "🇳🇴 Norway" },
    denmark: { label: "🇩🇰 Denmark" },
    finland: { label: "🇫🇮 Finland" },
    uk: { label: "🇬🇧 United Kingdom" },
    ireland: { label: "🇮🇪 Ireland" },
    estonia: { label: "🇪🇪 Estonia" },
    latvia: { label: "🇱🇻 Latvia" },
    lithuania: { label: "🇱🇹 Lithuania" },
    iceland: { label: "🇮🇸 Iceland" },
    malta: { label: "🇲🇹 Malta" },
    cyprus: { label: "🇨🇾 Cyprus" },

    // EXTRA
    turkey: { label: "🇹🇷 Turkey" },
    usa: { label: "🇺🇸 USA" },
    canada: { label: "🇨🇦 Canada" },
    australia: { label: "🇦🇺 Australia" },
  } as const;

  type LocationKey = keyof typeof countryMeta;

  const [location, setLocation] = useState<LocationKey>("mk");
  const [phoneCountry, setPhoneCountry] = useState<LocationKey>("mk");

  // ---------------------------------------
  // PHONE FORMAT PLACEHOLDERS PER COUNTRY
  // ---------------------------------------
  const phoneFormats: Record<LocationKey, string> = {
    mk: "+389 XX XXX XXX",

    albania: "+355 XX XXX XXXX",
    kosovo: "+383 4X XXX XXX",
    serbia: "+381 XX XXX XXXX",
    montenegro: "+382 XX XXX XXX",
    bosnia: "+387 XX XXX XXX",
    croatia: "+385 XX XXX XXXX",
    bulgaria: "+359 XX XXX XXXX",
    greece: "+30 XXX XXX XXXX",
    romania: "+40 XXX XXX XXX",
    hungary: "+36 XX XXX XXXX",
    czech: "+420 XXX XXX XXX",
    slovakia: "+421 XXX XXX XXX",
    poland: "+48 XXX XXX XXX",
    slovenia: "+386 XX XXX XXX",
    italy: "+39 XXX XXX XXXX",
    france: "+33 X XX XX XX XX",
    spain: "+34 XXX XXX XXX",
    portugal: "+351 XXX XXX XXX",
    germany: "+49 XXXX XXXXX",
    austria: "+43 XXXX XXXXX",
    netherlands: "+31 XX XXX XXXX",
    belgium: "+32 XXX XX XX XX",
    switzerland: "+41 XX XXX XX XX",
    sweden: "+46 XX XXX XXXX",
    norway: "+47 XXX XX XXX",
    denmark: "+45 XX XX XX XX",
    finland: "+358 XX XXX XXXX",
    uk: "+44 7XXX XXX XXX",
    ireland: "+353 XX XXX XXXX",
    estonia: "+372 XXXX XXXX",
    latvia: "+371 XX XXX XXX",
    lithuania: "+370 XXX XXXXX",
    iceland: "+354 XXX XXXX",
    malta: "+356 XXXX XXXX",
    cyprus: "+357 XX XXXXX",

    turkey: "+90 XXX XXX XXXX",
    usa: "+1 (XXX) XXX-XXXX",
    canada: "+1 (XXX) XXX-XXXX",
    australia: "+61 X XXXX XXXX",
  };

  // ---------------------------------------
  // FORM STATE
  // ---------------------------------------
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
  });

  const { label } = countryMeta[location];
  const isMacedonia = location === "mk";
  const price = isMacedonia ? 10 : 100;
  const currency = "EUR"; // 10 EUR for MK, 100 EUR for others

  const handleChange = (field: keyof typeof formData, val: string) =>
    setFormData((prev) => ({ ...prev, [field]: val }));

  // ---------------------------------------
  // SUBMIT (Create member + Stripe payment)
  // ---------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.surname.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.address.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // 1) Create member in DB
      const res = await fetch(`${BASE_URL}/api/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          location,
          // Use enum values that exist in DB: 'standard', 'premium', 'vip'
          membership_type: isMacedonia ? "standard" : "premium",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Create member error:", data);
        alert(data.error || "Failed to create member");
        return;
      }

      const createdMemberId = data.id;

      // 2) Create Stripe Checkout session
      const payRes = await fetch(`${BASE_URL}/api/payments/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: createdMemberId,
          amount: price, // 10 or 100
          currency, // "EUR"
        }),
      });

      const payData = await payRes.json();

      if (!payRes.ok) {
        console.error("Payment session error:", payData);
        alert(payData.error || "Failed to start payment.");
        return;
      }

      // 3) Redirect to Stripe Checkout
      window.location.href = payData.url;
    } catch (error) {
      console.error("Network or server error:", error);
      alert("Network error. Please try again.");
    }
  };

  const renderCountryOptions = () => (
    <>
      <option value="mk">🇲🇰 North Macedonia</option>

      <optgroup label="Balkans">
        <option value="albania">🇦🇱 Albania</option>
        <option value="kosovo">🇽🇰 Kosovo</option>
        <option value="serbia">🇷🇸 Serbia</option>
        <option value="montenegro">🇲🇪 Montenegro</option>
        <option value="bosnia">🇧🇦 Bosnia & Herzegovina</option>
        <option value="croatia">🇭🇷 Croatia</option>
        <option value="bulgaria">🇧🇬 Bulgaria</option>
        <option value="greece">🇬🇷 Greece</option>
      </optgroup>

      <optgroup label="Central & Eastern Europe">
        <option value="romania">🇷🇴 Romania</option>
        <option value="hungary">🇭🇺 Hungary</option>
        <option value="poland">🇵🇱 Poland</option>
        <option value="slovakia">🇸🇰 Slovakia</option>
        <option value="czech">🇨🇿 Czech Republic</option>
      </optgroup>

      <optgroup label="Western Europe">
        <option value="germany">🇩🇪 Germany</option>
        <option value="austria">🇦🇹 Austria</option>
        <option value="switzerland">🇨🇭 Switzerland</option>
        <option value="france">🇫🇷 France</option>
        <option value="italy">🇮🇹 Italy</option>
        <option value="spain">🇪🇸 Spain</option>
        <option value="portugal">🇵🇹 Portugal</option>
        <option value="belgium">🇧🇪 Belgium</option>
        <option value="netherlands">🇳🇱 Netherlands</option>
      </optgroup>

      <optgroup label="Nordic">
        <option value="sweden">🇸🇪 Sweden</option>
        <option value="norway">🇳🇴 Norway</option>
        <option value="denmark">🇩🇰 Denmark</option>
        <option value="finland">🇫🇮 Finland</option>
        <option value="iceland">🇮🇸 Iceland</option>
      </optgroup>

      <optgroup label="UK & Ireland">
        <option value="uk">🇬🇧 United Kingdom</option>
        <option value="ireland">🇮🇪 Ireland</option>
      </optgroup>

      <optgroup label="Baltics">
        <option value="estonia">🇪🇪 Estonia</option>
        <option value="latvia">🇱🇻 Latvia</option>
        <option value="lithuania">🇱🇹 Lithuania</option>
      </optgroup>

      <optgroup label="Mediterranean">
        <option value="cyprus">🇨🇾 Cyprus</option>
        <option value="malta">🇲🇹 Malta</option>
      </optgroup>

      <optgroup label="World">
        <option value="turkey">🇹🇷 Turkey</option>
        <option value="usa">🇺🇸 USA</option>
        <option value="canada">🇨🇦 Canada</option>
        <option value="australia">🇦🇺 Australia</option>
      </optgroup>
    </>
  );

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
      {/* HOME BUTTON */}
      <div className="relative z-10 mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-amber-300 hover:text-amber-200 text-sm sm:text-base font-medium transition"
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
          <span className="text-amber-300">Support Veshalla</span> by becoming a
          member
        </h1>
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
              {/* PHONE WITH COUNTRY CHOOSER */}
              <div>
                <label className="text-xs sm:text-sm text-gray-300 mb-1 block">
                  Phone
                </label>
                <div className="flex gap-2">
                  <select
                    value={phoneCountry}
                    onChange={(e) =>
                      setPhoneCountry(e.target.value as LocationKey)
                    }
                    className="w-24 sm:w-28 bg-[#1a1f1c] border border-[#5c5c5c] text-xs sm:text-sm text-white px-2 py-2 rounded-lg focus:ring-1 focus:ring-amber-400 outline-none"
                  >
                    <option value="mk">🇲🇰</option>
                    <option value="albania">🇦🇱</option>
                    <option value="kosovo">🇽🇰</option>
                    <option value="serbia">🇷🇸</option>
                    <option value="montenegro">🇲🇪</option>
                    <option value="bosnia">🇧🇦</option>
                    <option value="croatia">🇭🇷</option>
                    <option value="bulgaria">🇧🇬</option>
                    <option value="greece">🇬🇷</option>
                    <option value="romania">🇷🇴</option>
                    <option value="hungary">🇭🇺</option>
                    <option value="poland">🇵🇱</option>
                    <option value="slovakia">🇸🇰</option>
                    <option value="czech">🇨🇿</option>
                    <option value="germany">🇩🇪</option>
                    <option value="austria">🇦🇹</option>
                    <option value="switzerland">🇨🇭</option>
                    <option value="france">🇫🇷</option>
                    <option value="italy">🇮🇹</option>
                    <option value="spain">🇪🇸</option>
                    <option value="portugal">🇵🇹</option>
                    <option value="belgium">🇧🇪</option>
                    <option value="netherlands">🇳🇱</option>
                    <option value="sweden">🇸🇪</option>
                    <option value="norway">🇳🇴</option>
                    <option value="denmark">🇩🇰</option>
                    <option value="finland">🇫🇮</option>
                    <option value="uk">🇬🇧</option>
                    <option value="ireland">🇮🇪</option>
                    <option value="estonia">🇪🇪</option>
                    <option value="latvia">🇱🇻</option>
                    <option value="lithuania">🇱🇹</option>
                    <option value="cyprus">🇨🇾</option>
                    <option value="malta">🇲🇹</option>
                    <option value="iceland">🇮🇸</option>
                    <option value="turkey">🇹🇷</option>
                    <option value="usa">🇺🇸</option>
                    <option value="canada">🇨🇦</option>
                    <option value="australia">🇦🇺</option>
                  </select>

                  <input
                    className="flex-1 bg-black/50 border border-[#4c4c4c] px-3 py-2 sm:py-2.5 rounded-lg text-white focus:ring-1 focus:ring-amber-400 outline-none"
                    placeholder={phoneFormats[phoneCountry]}
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
              </div>

              {/* EMAIL */}
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

            {/* LOCATION SELECT */}
            <div>
              <label className="text-xs sm:text-sm text-gray-300 mb-1 block">
                Where do you live?
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as LocationKey)}
                className="w-full bg-[#1a1f1c] border border-[#5c5c5c] text-white px-3 py-2 sm:py-2.5 rounded-lg focus:ring-1 focus:ring-amber-400 outline-none cursor-pointer"
              >
                {renderCountryOptions()}
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
                {isMacedonia
                  ? "Local membership price · North Macedonia"
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
