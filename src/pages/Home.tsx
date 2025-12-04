import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const activeLang = lang || "en";

  // GALLERY IMAGES – all 29 photos
  const gallery = [
    "/WhatsApp Image 2025-12-01 at 22.02.38 (3).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.02.38.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.02.39 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.02.39.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.11 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.11 (2).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.11 (3).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.11.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.12 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.12.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.13 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.13 (2).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.13.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.14 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.14 (2).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.14 (3).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.14 (4).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.14 (5).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.14.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.15 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.15.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.16 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.16.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.17 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.17.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.10.18.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.20.36 (1).jpeg",
    "/WhatsApp Image 2025-12-01 at 22.20.36.jpeg",
    "/WhatsApp Image 2025-12-01 at 22.20.42.jpeg",
  ];

  const currentImage = lightboxIndex !== null ? gallery[lightboxIndex] : null;

  // Keyboard navigation for gallery
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % gallery.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + gallery.length) % gallery.length
        );
      }
      if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-orange-50 to-emerald-100 text-slate-900">

      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 z-50 mx-auto max-w-7xl px-4 py-3">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between rounded-2xl bg-emerald-900/70 backdrop-blur-xl px-4 py-2 shadow-xl border border-amber-400/40"
        >
          <button className="flex items-center gap-3 text-white">
            <div className="rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-2 shadow-lg">
              ⛰️
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-amber-200">Veshalla</div>
              <div className="text-xs text-white/70">Mountain Village</div>
            </div>
          </button>

          {/* NAV LINKS */}
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <button onClick={() => document.getElementById("about")?.scrollIntoView()} className="text-amber-100 hover:text-amber-300">About</button>
            <button onClick={() => document.getElementById("things")?.scrollIntoView()} className="text-amber-100 hover:text-amber-300">Experiences</button>
            <button onClick={() => document.getElementById("gallery")?.scrollIntoView()} className="text-amber-100 hover:text-amber-300">Gallery</button>
            <button onClick={() => document.getElementById("sponsors")?.scrollIntoView()} className="text-amber-100 hover:text-amber-300">Sponsors</button>
          </div>

          <button className="sm:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className="text-amber-200" />
          </button>
        </motion.div>
      </nav>

      {/* HERO */}
      <header
        className="relative min-h-screen text-white flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url("/Veshalla.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg mb-4">
            Welcome to Veshalla
          </h1>

          <p className="text-lg sm:text-xl mb-8 text-white/90">
            A mountain village above the clouds loved by people across the world.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate(`/${activeLang}/shop`)}
              className="px-6 py-3 bg-gradient-to-br from-white to-orange-100 text-emerald-900 font-semibold rounded-lg shadow-lg hover:scale-105 transition"
            >
              🛒 Shop
            </button>

            <button
              onClick={() => navigate(`/${activeLang}/member`)}
              className="px-6 py-3 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition"
            >
              👤 Membership
            </button>

            <button
              onClick={() => navigate(`/${activeLang}/camera`)}
              className="px-6 py-3 bg-white text-red-600 border border-red-500 font-semibold rounded-lg shadow-lg hover:scale-105 transition flex items-center gap-2"
            >
              🔴 Live
            </button>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="py-16 bg-orange-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-900 mb-3">About Veshalla</h2>
          <p className="text-slate-800">
            Veshalla is one of the highest villages in the Šar Mountains — surrounded by forests, streams, and clean air.
            The community is spread across Switzerland, Germany, Italy, and the USA, yet the heart of every family still belongs here.
          </p>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="things" className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">Experiences</h2>
          <p className="text-slate-800">
            Enjoy hiking, waterfalls, tea with locals, and the peaceful mountain atmosphere.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 bg-gradient-to-b from-orange-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">Gallery</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.slice(0, visibleCount).map((src, i) => (
              <motion.img
                key={src + i}
                src={src}
                onClick={() => setLightboxIndex(i)}
                className="rounded-xl object-cover h-40 sm:h-48 md:h-56 w-full shadow-md cursor-pointer hover:scale-[1.03] transition"
              />
            ))}
          </div>

          {visibleCount < gallery.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((v) => Math.min(v + 4, gallery.length))}
                className="px-5 py-3 bg-emerald-700 text-white rounded-lg shadow hover:bg-emerald-800"
              >
                Show more photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {currentImage && lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50"
            onClick={() => setLightboxIndex(null)}
          >
            <img
              src={currentImage}
              className="max-h-[80vh] w-auto rounded-2xl shadow-xl border border-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPONSORS — with ANIMATION C (Pulse Glow) */}
      <section
        id="sponsors"
        className="py-16 bg-gradient-to-b from-emerald-50 via-orange-50 to-emerald-50"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">Our Sponsors</h2>

          <p className="text-slate-800 text-sm sm:text-base mb-8">
            Thank you to all supporters who help keep Veshalla alive.
          </p>

          {/* 🔥 Premium Glow Animation */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(251,191,36,0)",
                "0 0 22px rgba(251,191,36,0.6)",
                "0 0 0px rgba(251,191,36,0)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="rounded-2xl overflow-hidden border border-amber-300 shadow-xl"
          >
            <img
              src="/1.png"
              className="w-full h-auto object-contain"
              alt="Sponsors"
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
