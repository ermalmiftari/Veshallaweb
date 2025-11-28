import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MountainVillageHome(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const gallery = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd629?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white text-slate-900 selection:bg-emerald-300 selection:text-emerald-900">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* NAV */}
      <nav className="fixed left-0 right-0 z-50 mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-2xl bg-emerald-700/20 backdrop-blur px-4 py-2 shadow-lg border border-emerald-300/20">
          <a href="#home" className="flex items-center gap-3 text-white">
            <div className="rounded-full bg-white/20 p-2 text-lg">⛰️</div>
            <div className="hidden sm:block">
              <div className="font-bold">Veshalla</div>
              <div className="text-xs text-white/70">Mountain Village</div>
            </div>
          </a>

          <div className="hidden items-center gap-6 sm:flex">
            <a
              href="#things"
              className="text-sm font-medium text-white/90 hover:text-emerald-100 hover:underline"
            >
              Things
            </a>
            <a
              href="#gallery"
              className="text-sm font-medium text-white/90 hover:text-emerald-100 hover:underline"
            >
              Gallery
            </a>
            <a
              href="#plan"
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600"
            >
              Plan visit
            </a>
          </div>

          <button className="sm:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu className="text-white" />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-6 right-6 top-20 z-50 rounded-2xl bg-emerald-700/20 p-4 backdrop-blur shadow-lg border border-emerald-300/20 sm:hidden"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-white">Menu</div>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X className="text-white" />
                </button>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <a href="#things" className="text-white/90 hover:text-emerald-100" onClick={() => setMenuOpen(false)}>
                  Things
                </a>
                <a href="#gallery" className="text-white/90 hover:text-emerald-100" onClick={() => setMenuOpen(false)}>
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

      {/* HERO UPDATED */}
      <header
        id="home"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-600 to-emerald-800 text-white px-6"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-14 drop-shadow-lg">
          Welcome to Veshalla
        </h1>

        {/* HORIZONTAL BUTTONS */}
        <div className="flex flex-row gap-6 w-full max-w-2xl justify-center">

          {/* SHOP BUTTON */}
          <a
            href="/shop"
            className="text-center min-w-[150px] py-4 bg-white text-emerald-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            🛒 Shop
          </a>

          {/* MEMBER BUTTON */}
          <a
            href="/member"
            className="text-center min-w-[150px] py-4 bg-white text-emerald-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            👤 Members
          </a>

          {/* CAMERA BUTTON */}
          <a
            href="/camera"
            className="text-center min-w-[150px] py-4 bg-white text-emerald-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            📷 Camera
          </a>

        </div>
      </header>

      {/* THINGS */}
      <section id="things" className="bg-gradient-to-b from-orange-50 to-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Hike • Taste • Explore</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[ 
              { t: "Trail to Upper Meadow", d: "A 3.2 km loop with gentle incline and panoramic viewpoints. Great for families." },
              { t: "Village Food Tour", d: "Visit farms for fresh cheese, wildflower honey, and herbal tea. Weekend mornings only." },
              { t: "Waterfall & Forest Walk", d: "Shaded trail along a stream ending at a small waterfall. Wear proper shoes." }
            ].map((x, i) => (
              <article
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-transform"
              >
                <h3 className="text-lg font-semibold">{x.t}</h3>
                <p className="mt-2 text-slate-600">{x.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Scenes from the mountains</h2>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                onClick={() => setLightboxSrc(src)}
                className="h-40 w-full cursor-pointer rounded-xl object-cover sm:h-44 md:h-48 hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 grid place-items-center bg-black/70"
          >
            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="max-w-[90vw] max-h-[90vh]"
            >
              <img
                src={lightboxSrc}
                className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <button
                onClick={() => setLightboxSrc(null)}
                className="mt-4 w-full rounded-lg bg-white px-4 py-2 font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAN */}
      <section id="plan" className="bg-gradient-to-b from-white via-emerald-50 to-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">Plan your visit</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Check local transport schedules, book a homestay, and see seasonal events.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a href="#" className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow hover:bg-orange-600">
              Book homestay
            </a>
            <a href="#" className="rounded-xl border border-emerald-300 px-5 py-3 font-semibold text-emerald-700 hover:bg-emerald-50">
              Check transport
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
          &copy; 2025 Veshalla Mountain Village. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
