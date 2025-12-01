import { useState } from "react";

export default function Member() {
  const [country, setCountry] = useState("");
  const price = country === "North Macedonia" ? 10 : country ? 100 : "";

  return (
    <div
      className="
        min-h-screen
        text-white
        flex flex-col items-center justify-center
        p-10 relative overflow-hidden
      "
      style={{
        backgroundImage: "url('/neca.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* BIG TRANSPARENT VESHALLA TEXT */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
        <h1 className="text-[18rem] font-extrabold tracking-widest text-white/10 select-none">
          VESHALLA
        </h1>
      </div>

      {/* TOP GRADIENT – soft fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/70"></div>

      {/* MIST EFFECT */}
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>

      {/* TEXT SECTION */}
      <div className="relative z-10 max-w-2xl text-center mb-10 drop-shadow-xl">
        <h1 className="text-5xl font-extrabold tracking-wide">
          Welcome to the Veshalla Community
        </h1>

        <p className="text-gray-200 text-lg mt-4">
          A mountain village rich in nature, culture, and tradition —
          loved by people across the world.  
          Become a member and stay connected, wherever you are.
        </p>
      </div>

      {/* FORM CARD */}
      <div
        className="
        relative z-10
        bg-black/60 
        backdrop-blur-xl 
        p-10 
        rounded-3xl 
        w-full 
        max-w-lg 
        border 
        border-white/10 
        shadow-2xl
      "
      >
        <h2 className="text-3xl font-semibold text-center mb-8">
          Member Registration
        </h2>

        <div className="flex flex-col space-y-5">

          <input
            type="text"
            placeholder="Name"
            className="p-3 bg-white/10 border border-white/20 rounded-xl 
                       focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            type="text"
            placeholder="Surname"
            className="p-3 bg-white/10 border border-white/20 rounded-xl 
                       focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            className="p-3 bg-white/10 border border-white/20 rounded-xl 
                       focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-white/10 border border-white/20 rounded-xl 
                       focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            type="text"
            placeholder="Full Address (Street, City)"
            className="p-3 bg-white/10 border border-white/20 rounded-xl 
                       focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* LOCATION SELECTOR */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="p-3 bg-white/10 border border-white/20 rounded-xl 
                       focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">Where do you live?</option>
            <option value="North Macedonia">North Macedonia</option>
            <option value="Diaspora">Diaspora</option>
          </select>

          {/* PRICE BOX */}
          {price !== "" && (
            <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-center text-lg font-semibold">
              Membership Price:{" "}
              <span className="text-orange-300 font-bold">{price} €</span>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 p-3 rounded-xl text-lg font-semibold hover:opacity-90 transition">
            Join the Community
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <p className="relative z-10 text-white/70 text-center mt-10 text-sm tracking-wide">
        Veshalla — High Above, Forever in Our Hearts.
      </p>
    </div>
  );
}
