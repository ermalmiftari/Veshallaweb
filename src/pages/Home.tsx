import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAllModal, setShowAllModal] = useState(false);

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
  }, [lightboxIndex, gallery.length]);

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
            <div className="rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-2 shadow-lg">⛰️</div>
            <div className="hidden sm:block">
              <div className="font-bold text-amber-200">Veshalla</div>
              <div className="text-xs text-white/70">Mountain Village</div>
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-6 text-sm">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              About
            </button>
            <button
              onClick={() => document.getElementById("things")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              Experiences
            </button>
            <button
              onClick={() => document.getElementById("gallery")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              Gallery
            </button>
            <button
              onClick={() => document.getElementById("sponsors")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              Sponsors
            </button>
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
            A mountain village above the clouds loved by people across the
            world.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate(`/${activeLang}/shop`)} className="px-6 py-3 bg-white text-emerald-900 rounded-lg shadow hover:scale-105 transition">🛒 Shop</button>
            <button onClick={() => navigate(`/${activeLang}/member`)} className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow hover:scale-105 transition">👤 Membership</button>
            <button onClick={() => navigate(`/${activeLang}/camera`)} className="px-6 py-3 bg-white text-red-600 border border-red-500 rounded-lg shadow hover:scale-105 transition flex items-center gap-2">🔴 Live</button>
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
              <img
                key={i}
                src={src}
                onClick={() => setLightboxIndex(i)}
                className="rounded-xl object-cover h-40 sm:h-48 md:h-56 w-full shadow-md cursor-pointer hover:scale-[1.03] transition"
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {visibleCount < gallery.length && (
              <button
                onClick={() =>
                  setVisibleCount((v) => Math.min(v + 4, gallery.length))
                }
                className="px-5 py-3 bg-emerald-700 text-white rounded-lg shadow hover:bg-emerald-800"
              >
                Show more photos
              </button>
            )}

            <button
              onClick={() => setShowAllModal(true)}
              className="px-5 py-3 bg-white text-emerald-800 border border-emerald-600 rounded-lg shadow hover:bg-emerald-50"
            >
              Show all
            </button>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

      {/* SHOW ALL MODAL (box with all photos) */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-[85vh] bg-white rounded-2xl shadow-2xl p-4 sm:p-6 overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-900">
                  All Photos
                </h3>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="rounded-full p-2 hover:bg-slate-100"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {gallery.map((src, i) => (
                  <motion.img
                    key={src + "modal" + i}
                    src={src}
                    onClick={() => {
                      setLightboxIndex(i);
                    }}
                    className="rounded-lg object-cover h-32 sm:h-40 md:h-48 w-full shadow cursor-pointer hover:scale-[1.03] transition"
                    whileHover={{ scale: 1.03 }}
                  />
                ))}
              </div>
            </motion.div>
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
