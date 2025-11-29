import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MountainVillageHome(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroParallax = Math.min(scrollY / 6, 120);
  const mountainOpacity = 1 - Math.min(scrollY / 600, 0.7);

  const features = [
    { icon: "🥾", title: "Hiking Trails", desc: "Marked routes for all levels" },
    { icon: "🏡", title: "Homestays", desc: "Stay with local families" },
    { icon: "🍯", title: "Local Flavors", desc: "Honey, cheese & herbal tea" },
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  ];

  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const stagger = { show: { transition: { staggerChildren: 0.08 } } };

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
            <a href="#about" className="text-sm font-medium text-white/90 hover:text-emerald-100 hover:underline">About</a>
            <a href="#things" className="text-sm font-medium text-white/90 hover:text-emerald-100 hover:underline">Things</a>
            <a href="#gallery" className="text-sm font-medium text-white/90 hover:text-emerald-100 hover:underline">Gallery</a>
            <a href="#plan" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600">Plan visit</a>
          </div>

          <button className="sm:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu className="text-white" />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute left-6 right-6 top-20 z-50 rounded-2xl bg-emerald-700/20 p-4 backdrop-blur shadow-lg border border-emerald-300/20 sm:hidden">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-white">Menu</div>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X className="text-white" /></button>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <a href="#about" onClick={() => setMenuOpen(false)} className="text-white/90 hover:text-emerald-100">About</a>
                <a href="#things" onClick={() => setMenuOpen(false)} className="text-white/90 hover:text-emerald-100">Things</a>
                <a href="#gallery" onClick={() => setMenuOpen(false)} className="text-white/90 hover:text-emerald-100">Gallery</a>
                <a href="#plan" onClick={() => setMenuOpen(false)} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white text-center hover:bg-orange-600">Plan visit</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <header id="home" ref={heroRef} className="relative min-h-[84vh] overflow-hidden">
        <div className="absolute inset-0 -z-10 transform-gpu will-change-transform">
          <img
            src={gallery[7]}
            alt="mountain backdrop"
            className="h-full w-full object-cover brightness-75"
            style={{ transform: `translateY(${heroParallax * 0.15}px)` }}
            aria-hidden
          />
          <svg className="absolute left-0 right-0 bottom-0 -z-10 h-56 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden>
            <path fill="rgba(255,255,255,0.06)" d="M0,192L80,186.7C160,181,320,171,480,170.7C640,171,800,181,960,192C1120,203,1280,213,1360,218.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
          </svg>
          <div style={{ transform: `translateY(${heroParallax * 0.1}px)` }} className="pointer-events-none absolute -left-28 -top-28 z-0 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
          <div style={{ transform: `translateY(${heroParallax * 0.25}px)` }} className="pointer-events-none absolute -right-10 bottom-10 z-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" style={{ opacity: mountainOpacity }} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <span aria-hidden>⛰️</span>
            Alpine escape • Fresh air • Local food
          </motion.div>

          <motion.h1 initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-white drop-shadow md:text-6xl">
            Veshalla — Mountain Village Retreat
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.18 }} className="mt-4 max-w-2xl text-lg text-white/90">
            Discover a tranquil village tucked in the mountains—perfect for weekend getaways, hiking, and authentic homestays.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }} className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#plan" className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">Plan your visit</a>
            <a href="#gallery" className="rounded-xl border border-white/60 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60">View gallery</a>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="mt-8 grid gap-4 sm:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur hover:scale-[1.02] transition-transform">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/30 bg-white/20 text-lg font-bold">{f.icon}</div>
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <div className="text-white/80">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.span initial={{ scale: 0.96, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">About the village</motion.span>

          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-3 text-3xl font-bold md:text-4xl">Quiet nature, warm people</motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="mt-2 max-w-3xl text-slate-600">Our mountain village has been welcoming visitors for generations. Whether you are here to reconnect with nature, enjoy farm-to-table meals, or simply breathe fresh alpine air, Veshalla offers simple comfort and genuine hospitality.</motion.p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[ 
              { title: "Getting here", desc: "Accessible by car from Tetovë/Skopje. Public minibuses run on weekends. Winter tires recommended in snowy months." },
              { title: "Best time to visit", desc: "Spring wildflowers (Apr–Jun), cool summers (Jul–Aug), golden forests (Sep–Oct), snowy scenes (Dec–Feb)." },
              { title: "Where to stay", desc: "Family-run guesthouses and cabins. Contact the tourism office to match your group size and budget." }
            ].map((c, i) => (
              <motion.article key={i} whileInView={{ y: 0, opacity: 1 }} initial={{ y: 12, opacity: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-slate-600">{c.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* THINGS */}
      <section id="things" className="bg-gradient-to-b from-orange-50 to-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.span initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">Things to do</motion.span>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-3 text-3xl font-bold md:text-4xl">Hike • Taste • Explore</motion.h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[ 
              { t: "Trail to Upper Meadow", d: "A 3.2 km loop with gentle incline and panoramic viewpoints. Great for families." },
              { t: "Village Food Tour", d: "Visit farms for fresh cheese, wildflower honey, and herbal tea. Weekend mornings only." },
              { t: "Waterfall & Forest Walk", d: "Shaded trail along a stream ending at a small waterfall. Wear proper shoes." }
            ].map((x, i) => (
              <motion.article key={i} whileInView={{ y: 0, opacity: 1 }} initial={{ y: 12, opacity: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-transform">
                <h3 className="text-lg font-semibold">{x.t}</h3>
                <p className="mt-2 text-slate-600">{x.d}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.span initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">Gallery</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-3 text-3xl font-bold md:text-4xl">Scenes from the mountains</motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {gallery.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Veshalla gallery ${i + 1}`}
                onClick={() => setLightboxSrc(src)}
                className="h-40 w-full cursor-pointer rounded-xl object-cover sm:h-44 md:h-48 hover:scale-105 transition-transform"
                loading="lazy"
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 grid place-items-center bg-black/70">
            <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }} className="max-w-[90vw] max-h-[90vh]">
              <img src={lightboxSrc} alt="Enlarged" className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl" />
              <button onClick={() => setLightboxSrc(null)} className="mt-4 w-full rounded-lg bg-white px-4 py-2 font-semibold">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAN */}
      <section id="plan" className="bg-gradient-to-b from-white via-emerald-50 to-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold md:text-4xl">Plan your visit</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 max-w-3xl text-slate-600">Check local transport schedules, book a homestay, and see seasonal events.</motion.p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href="#" className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow hover:bg-orange-600">Book homestay</a>
            <a href="#" className="rounded-xl border border-emerald-300 px-5 py-3 font-semibold text-emerald-700 hover:bg-emerald-50">Check transport</a>
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
