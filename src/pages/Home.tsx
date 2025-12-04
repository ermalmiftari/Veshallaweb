import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const activeLang = lang || "en";

  // ALL 29 PHOTOS
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

  // KEYBOARD ARROWS
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => (i! + 1) % gallery.length);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => (i! - 1 + gallery.length) % gallery.length);
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

      {/* ========== NAVIGATION ========== */}
      <nav className="fixed left-0 right-0 z-50 mx-auto max-w-7xl px-4 py-3">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between rounded-2xl bg-emerald-900/70 backdrop-blur-xl px-4 py-2 shadow-xl border border-amber-400/40"
        >
          <button className="flex items-center gap-3 text-white">
            <div className="rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-2 shadow-lg">⛰️</div>
            <div className="hidden sm:block">
              <div className="font-bold text-amber-200">Veshalla</div>
              <div className="text-xs text-white/70">Mountain Village</div>
            </div>
          </button>

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

      {/* HERO SECTION */}
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
            <button onClick={() => navigate(`/${activeLang}/shop`)} className="px-6 py-3 bg-white text-emerald-900 rounded-lg shadow hover:scale-105 transition">🛒 Shop</button>
            <button onClick={() => navigate(`/${activeLang}/member`)} className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow hover:scale-105 transition">👤 Membership</button>
            <button onClick={() => navigate(`/${activeLang}/camera`)} className="px-6 py-3 bg-white text-red-600 border border-red-500 rounded-lg shadow hover:scale-105 transition flex items-center gap-2">🔴 Live</button>
          </div>
        </div>
      </header>

      {/* ABOUT SECTION (VERSION A) */}
      <section id="about" className="bg-gradient-to-b from-orange-50 via-emerald-50 to-orange-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1 bg-amber-200 text-emerald-900 rounded-full text-sm font-semibold mb-4">
            ABOUT VESHALLA
          </div>

          <h2 className="text-4xl font-bold text-emerald-900 mb-4">
            A small village with a global family
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full mb-6" />

          <p className="text-slate-800 mb-3">
            Veshalla is one of the highest villages in the Šar Mountains – a quiet place surrounded by forests, streams, and clean mountain air.
          </p>

          <p className="text-slate-800 mb-3">
            Although only a small number of people live in the village today, the community is spread across Switzerland, Germany, and many other countries. Wherever they are, people still call Veshalla their home.
          </p>

          <p className="text-slate-800">
            This website connects everyone: locals, visitors, and the diaspora – through live views of the village, community membership, and products that support Veshalla’s future.
          </p>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="things" className="py-16 px-6 bg-gradient-to-b from-emerald-50 via-orange-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">Hike • Taste • Explore</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { t: "Trail to Upper Meadow", d: "A gentle hike with wide views over the valley and Šar Mountains.", icon: "🥾" },
              { t: "Village Food & Tea", d: "Local cheese, honey, and herbal tea prepared in family homes.", icon: "🧀" },
              { t: "Forest & Waterfalls", d: "Quiet walks along the river and small waterfalls above the village.", icon: "💧" },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl p-7 bg-white/90 backdrop-blur border border-amber-200 shadow hover:shadow-lg">
                <div className="text-3xl mb-4 bg-gradient-to-br from-amber-400 to-emerald-400 w-12 h-12 rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-2">{item.t}</h3>
                <p className="text-slate-700">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 bg-gradient-to-b from-orange-50 to-emerald-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">Gallery</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.slice(0, visibleCount).map((src, i) => (
              <img
                key={i}
                src={src}
                onClick={() => setLightboxIndex(i)}
                className="rounded-xl object-cover h-40 sm:h-48 md:h-56 w-full cursor-pointer shadow hover:scale-[1.03] transition"
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

      {/* LIGHTBOX WITH PREMIUM FLOATING ARROWS (STYLE A) */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* LEFT ARROW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i! - 1 + gallery.length) % gallery.length);
              }}
              className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition"
            >
              <ChevronLeft size={40} />
            </button>

            {/* IMAGE */}
            <motion.img
              src={currentImage}
              className="max-h-[80vh] w-auto rounded-2xl shadow-xl border border-white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* RIGHT ARROW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i! + 1) % gallery.length);
              }}
              className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPONSORS */}
      <section id="sponsors" className="py-16 bg-gradient-to-b from-emerald-50 via-orange-50 to-emerald-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">Our Sponsors</h2>

          <p className="text-slate-800 text-base mb-8">
            Thank you to all supporters who help keep Veshalla alive.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-amber-200"
          >
            <img src="/1.png" className="w-full h-auto object-contain" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
