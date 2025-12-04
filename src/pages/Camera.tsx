import { Link } from "react-router-dom";

export default function Camera() {
  return (
    <div
      className="
        min-h-screen relative text-white flex flex-col 
        px-4 sm:px-6 py-10
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

      {/* HOME BUTTON */}
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
          ← Home
        </Link>
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-amber-300 drop-shadow-xl">
          Veshalla Live Camera
        </h1>

        <p className="text-gray-300 text-sm sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
          Watch Veshalla from anywhere in the world — the mountains, the valley,
          the heart of the village.  
        </p>
      </div>

      {/* CAMERA BOX */}
      <div className="relative z-10 mx-auto w-full max-w-2xl bg-black/40 border border-[#3b3b3b] rounded-2xl backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="w-full h-64 sm:h-80 bg-black/60 flex items-center justify-center">
          <p className="text-gray-500 text-sm sm:text-base">
            Live camera feed will appear here
          </p>
        </div>
      </div>

      {/* BUTTON */}
      <div className="relative z-10 mt-6 mx-auto">
        <button
          className="
            bg-amber-600 hover:bg-amber-500 
            text-white font-semibold
            px-6 py-3 rounded-lg 
            shadow-lg transition
            text-sm sm:text-base
          "
        >
          Start Camera
        </button>
      </div>
    </div>
  );
}
