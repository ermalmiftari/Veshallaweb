import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  const activeLang = lang || "en";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-orange-50 to-emerald-100 text-slate-900 selection:bg-orange-300 selection:text-emerald-900">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.5); }
          50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      {/* NAV */}
      <nav className="fixed left-0 right-0 z-50 mx-auto max-w-7xl px-6 py-4">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-900/40 via-emerald-800/40 to-emerald-900/40 backdrop-blur-xl px-4 py-2 shadow-2xl border border-orange-400/40"
        >
          <a href="#home" className="flex items-center gap-3 text-white group">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-2 text-lg shadow-lg"
            >
              ⛰️
            </motion.div>
            <div className="hidden sm:block">
              <div className="font-bold tracking-wide text-orange-200 group-hover:text-orange-300 transition">Veshalla</div>
              <div className="text-xs text-white/70">Mountain Village</div>
            </div>
          </a>

          <div className="hidden items-center gap-6 sm:flex">
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              href="#things" 
              className="text-sm font-medium text-orange-100 hover:text-orange-300 transition"
            >
              Things
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              href="#gallery" 
              className="text-sm font-medium text-orange-100 hover:text-orange-300 transition"
            >
              Gallery
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(251, 146, 60, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              href="#plan"
              className="rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-orange-500/50"
            >
              Plan visit
            </motion.a>
          </div>

          <button className="sm:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu className="text-orange-200 hover:text-orange-300 transition" />
          </button>
        </motion.div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-6 right-6 top-20 z-50 rounded-2xl bg-emerald-900/40 p-4 backdrop-blur shadow-xl border border-emerald-400/30 sm:hidden"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-orange-200">Menu</div>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X className="text-white" />
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <a href="#things" className="text-orange-100 hover:text-orange-300" onClick={() => setMenuOpen(false)}>
                  Things
                </a>
                <a href="#gallery" className="text-orange-100 hover:text-orange-300" onClick={() => setMenuOpen(false)}>
                  Gallery
                </a>
                <a
                  href="#plan"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white text-center hover:bg-orange-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Plan visit
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <header
        id="home"
        className="relative min-h-screen text-white overflow-hidden"
        style={{
          backgroundImage: `url("/Veshalla.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white text-center tracking-tight"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            Welcome to Veshalla
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl mb-12 text-white/90 text-center max-w-2xl"
          >
            Where mountains meet tradition
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-row gap-4 w-full max-w-2xl justify-center flex-wrap"
          >
            {/* Shop */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/${activeLang}/shop`)}
              className="min-w-[140px] py-3 px-6 bg-white text-emerald-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition text-center"
            >
              🛒 Shop
            </motion.button>

            {/* Members */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/${activeLang}/member`)}
              className="min-w-[140px] py-3 px-6 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-emerald-700 transition text-center"
            >
              👤 Members
            </motion.button>

            {/* Camera */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/${activeLang}/camera`)}
              className="min-w-[140px] py-3 px-6 bg-white text-emerald-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition text-center"
            >
              📷 Camera
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="text-white/70 text-xs font-light tracking-widest">SCROLL</div>
            <div className="w-5 h-8 border-2 border-white/50 rounded-full mx-auto mt-2 relative">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 bg-white/70 rounded-full absolute left-1/2 transform -translate-x-1/2 top-2"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* THINGS */}
      <section id="things" className="bg-gradient-to-b from-orange-100 via-emerald-50 to-orange-50 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 bg-orange-200 text-emerald-900 rounded-full text-sm font-semibold mb-4">
              EXPERIENCES
            </div>
            <h2 className="text-4xl font-bold text-emerald-900 md:text-5xl mb-2">Hike • Taste • Explore</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full" />
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { t: "Trail to Upper Meadow", d: "A 3.2 km loop with gentle incline and amazing views.", icon: "🥾", color: "from-orange-500 to-orange-600" },
              { t: "Village Food Tour", d: "Local cheese, honey, tea — fresh from the farms.", icon: "🧀", color: "from-emerald-500 to-emerald-600" },
              { t: "Waterfall & Forest Walk", d: "A calm path through the woods ending at a small waterfall.", icon: "💧", color: "from-orange-500 to-emerald-500" },
            ].map((x, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
                className="group rounded-3xl border-2 border-orange-200 bg-white/90 backdrop-blur p-8 shadow-lg hover:border-orange-400 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-bl-full opacity-50" />
                
                <div className={`inline-block text-4xl mb-4 p-3 rounded-2xl bg-gradient-to-br ${x.color} shadow-lg`}>
                  {x.icon}
                </div>
                
                <h3 className="text-xl font-bold text-emerald-900 mb-3 group-hover:text-orange-600 transition">{x.t}</h3>
                <p className="text-slate-700 leading-relaxed">{x.d}</p>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-orange-400 to-emerald-400 rounded-full mt-6"
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-orange-50 via-emerald-100 to-orange-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 right-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-emerald-500 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 bg-emerald-200 text-emerald-900 rounded-full text-sm font-semibold mb-4">
              GALLERY
            </div>
            <h2 className="text-4xl font-bold text-emerald-900 md:text-5xl mb-2">Scenes from the mountains</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full" />
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {gallery.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                onClick={() => setLightboxSrc(src)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, rotate: 1, zIndex: 10 }}
                className="h-48 w-full cursor-pointer rounded-2xl object-cover sm:h-52 md:h-56 shadow-xl hover:shadow-2xl transition-shadow border-2 border-white"
              />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 grid place-items-center bg-black/80 backdrop-blur-sm"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-[90vw] max-h-[90vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxSrc} 
                className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl border-4 border-white" 
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLightboxSrc(null)}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white shadow-2xl hover:shadow-orange-500/50"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAN */}
      <section id="plan" className="bg-gradient-to-b from-orange-50 via-emerald-100 to-emerald-50 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block px-4 py-1 bg-orange-200 text-emerald-900 rounded-full text-sm font-semibold mb-4">
              START YOUR JOURNEY
            </div>
            <h2 className="text-4xl font-bold text-emerald-900 md:text-5xl mb-4">Plan your visit</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full mx-auto mb-6" />
            <p className="max-w-3xl text-slate-700 text-lg mx-auto leading-relaxed">
              Check local transport schedules, book a homestay, and see seasonal events.
            </p>

            <div className="mt-10 flex flex-wrap gap-6 justify-center">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="#" 
                className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-semibold text-white shadow-lg hover:shadow-xl text-lg"
              >
                📅 Book homestay
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="#" 
                className="rounded-xl border-2 border-emerald-600 bg-white px-8 py-4 font-semibold text-emerald-800 hover:bg-emerald-50 shadow-lg text-lg"
              >
                🚌 Check transport
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-300 bg-gradient-to-b from-emerald-50 to-emerald-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-3 text-2xl shadow-lg">
                ⛰️
              </div>
              <div>
                <div className="font-bold text-xl text-emerald-900">Veshalla</div>
                <div className="text-sm text-emerald-700">Mountain Village</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-sm text-emerald-700"
            >
              &copy; 2025 Veshalla Mountain Village. All rights reserved.
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}