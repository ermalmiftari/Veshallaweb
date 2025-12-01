import { useState } from "react";
import { Link } from "react-router-dom";

export default function Member() {
  const [location, setLocation] = useState<"mk" | "diaspora">("mk");
  const price = location === "mk" ? 10 : 100;

  return (
    <div
      className="
        relative min-h-screen overflow-hidden 

        bg-gradient-to-b 
        from-amber-700/50 
        via-emerald-950/60 
        to-[#1a0f05]/80

        text-white flex flex-col items-start 
        justify-start px-6 py-12
      "
    >

      {/* DARK ORANGE SUN GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,110,30,0.42),transparent_65%)] pointer-events-none" />

      {/* DEEP GREEN MOUNTAIN SHADOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,40,20,0.35),transparent_70%)] pointer-events-none" />

      {/* DARK AMBER SHADOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(120,60,20,0.28),transparent_75%)] pointer-events-none" />


      {/* HOME BUTTON — LEFT SIDE */}
      <div className="relative z-10 mb-10 w-full flex justify-start">
        <Link
          to="/"
          className="
            bg-amber-500 hover:bg-amber-400 
            text-black font-semibold 
            px-6 py-3 rounded-xl
            shadow-lg shadow-amber-900/40
            transition text-lg
          "
        >
          ← Back to Home
        </Link>
      </div>

      {/* TEXT SECTION */}
      <div className="relative z-10 w-full max-w-3xl text-center mb-10 self-center">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-xl">
          Warmth of <span className="text-amber-300">Veshalla</span>, wherever you go
        </h1>

        <p className="text-gray-100/90 text-base md:text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
          A community rooted in tradition, mountains, and the warm colors of home.
          Whether you live in North Macedonia or across the world, your membership
          supports Veshalla’s future.
        </p>
      </div>

      {/* FORM CARD */}
      <div
        className="
          relative z-10 bg-gradient-to-b 
          from-emerald-950/80 to-emerald-900/70

          border border-amber-500/20 backdrop-blur-xl 
          shadow-[0_0_50px_-15px_rgba(0,0,0,0.8)]

          max-w-xl w-full rounded-2xl p-8 self-center
        "
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          Become a Member
        </h2>
        <p className="text-gray-200/80 text-center text-sm mb-6">
          Fill your information below.
        </p>

        <form className="space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-200/80 mb-1">Name</label>
              <input
                type="text"
                className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                placeholder="First name"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-200/80 mb-1">Surname</label>
              <input
                type="text"
                className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-200/80 mb-1">Mobile number</label>
              <input
                type="tel"
                className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                placeholder="+389 ..."
              />
            </div>

            <div>
              <label className="block text-xs text-gray-200/80 mb-1">Email</label>
              <input
                type="email"
                className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-200/80 mb-1">Address</label>
            <input
              type="text"
              className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber-400"
              placeholder="Street, city"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-200/80 mb-1">Where do you live?</label>
            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value === "mk" ? "mk" : "diaspora")
              }
              className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="mk">North Macedonia</option>
              <option value="diaspora">Diaspora</option>
            </select>
          </div>

          {/* PRICE BOX */}
          <div className="bg-black/40 border border-amber-600/40 px-4 py-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-medium text-amber-300 text-lg">
                Membership fee: {price} €
              </p>
              <p className="text-[11px] text-gray-300/80">
                {location === "mk"
                  ? "Special price for members living in North Macedonia."
                  : "Diaspora contribution supporting village progress."}
              </p>
            </div>
            <p className="text-[11px] text-gray-300/70">yearly</p>
          </div>

          <button
            type="submit"
            className="
              w-full rounded-xl bg-amber-500 hover:bg-amber-400 
              transition px-4 py-3 text-sm font-semibold tracking-wide 
              shadow-lg shadow-amber-900/40
            "
          >
            Join the Community
          </button>

        </form>
      </div>
    </div>
  );
}
