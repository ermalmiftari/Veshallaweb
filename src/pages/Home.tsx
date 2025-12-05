import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllGallery, setShowAllGallery] = useState(false);

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
            <div className="rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-2 shadow-lg">
              ⛰️
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-amber-200">Veshalla</div>
              <div className="text-xs text-white/70">Mountain Village</div>
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-6 text-sm">
            <button onClick={() => document.getElementById("about")?.scrollIntoView()} className="text-amber-100 hover:text-amber-300">About</button>
            <button onClick={() => document.getElementById("things")?.scrollIntoView()} className="text-amber-100 hover:text-amber-300">Experiences</button>
            <button onClick={() => document.getElementById("gallery")?.scrollIntoView()} className="text-amber-100 hover:text-amber-300">Gallery</button>
            <button onClick={() => document.getElementById("hiking")?.scrollIntoView()} className="text-amber-100 hover:text-amber-300">Hiking</button>
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
            A mountain village above the clouds loved by people across the
            world.
          </p>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            <button 
              onClick={() => navigate(`/${activeLang}/shop`)} 
              className="flex-1 min-w-[200px] px-6 py-4 bg-white text-emerald-900 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-3xl mb-1">🛒</div>
              <div className="font-bold text-lg mb-1">Shop</div>
              <div className="text-xs text-slate-600">Browse authentic products from Veshalla</div>
            </button>
            
            <button 
              onClick={() => navigate(`/${activeLang}/member`)} 
              className="flex-1 min-w-[200px] px-6 py-4 bg-emerald-600 text-white rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-3xl mb-1">👤</div>
              <div className="font-bold text-lg mb-1">Membership</div>
              <div className="text-xs text-emerald-100">Join our community & support the village</div>
            </button>
            
            <button 
              onClick={() => navigate(`/${activeLang}/camera`)} 
              className="flex-1 min-w-[200px] px-6 py-4 bg-white text-red-600 border-2 border-red-500 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-3xl mb-1">🔴</div>
              <div className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
                Live Camera
              </div>
              <div className="text-xs text-slate-600">Watch Veshalla in real-time</div>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2 text-white/80 cursor-pointer" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="text-sm font-medium">Scroll Down</span>
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </header>

      {/* ABOUT */}
      <section id="about" className="py-16 bg-orange-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">About Veshalla</h2>
          <div className="space-y-4 text-slate-800 text-lg leading-relaxed">
            <p>
              Veshalla is one of the highest villages in the Šar Mountains, perched at an elevation where clouds drift through the valleys below. 
              Surrounded by pristine forests, crystal-clear mountain streams, and some of the cleanest air in the region, this village represents 
              a connection to nature that is increasingly rare in our modern world.
            </p>
            <p>
              For centuries, Veshalla has been home to resilient communities who have built their lives around the rhythm of the mountains. 
              Today, while many families have spread across Switzerland, Germany, Italy, and the USA in search of opportunities, 
              the heart of every Veshalla family still beats in these highlands. Every summer, the village comes alive as diaspora 
              members return to reconnect with their roots, preserve traditions, and share stories under the mountain sky.
            </p>
            <p>
              The village is not just a place—it's a living heritage of mountain culture, traditional architecture, and a community 
              bond that transcends borders. Whether you're seeking adventure, tranquility, or a glimpse into authentic mountain life, 
              Veshalla welcomes you with open arms and the warmth of highland hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="things" className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">Experiences</h2>
          <p className="text-slate-800 text-lg mb-8">
            Discover the authentic beauty of mountain life through unforgettable experiences in Veshalla.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">🥾</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Mountain Hiking</h3>
              <p className="text-slate-700">
                Explore scenic trails through ancient forests and alpine meadows. Routes for all skill levels, 
                from gentle walks to challenging summit climbs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">💧</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Waterfall Visits</h3>
              <p className="text-slate-700">
                Discover hidden waterfalls cascading down mountain cliffs. Perfect spots for photography 
                and experiencing the raw power of nature.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">🍵</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Tea with Locals</h3>
              <p className="text-slate-700">
                Experience genuine highland hospitality. Share traditional mountain tea and home-baked goods 
                while listening to stories of village life.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">🏔️</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Peak Climbing</h3>
              <p className="text-slate-700">
                Challenge yourself with guided climbs to nearby peaks including Kobilica (2,528m). 
                Breathtaking panoramic views await at the summit.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">🌲</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Forest Exploration</h3>
              <p className="text-slate-700">
                Wander through pristine mountain forests. Spot wildlife, identify native plants, 
                and breathe in the therapeutic mountain air.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">📸</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Photography Tours</h3>
              <p className="text-slate-700">
                Capture stunning mountain landscapes, traditional architecture, and golden-hour vistas. 
                Perfect for amateur and professional photographers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Cultural Heritage</h3>
              <p className="text-slate-700">
                Visit the historic Colorful Mosque (est. 1438) and Tetovo Fortress. 
                Explore centuries of mountain culture and Ottoman architecture.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">⛺</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Mountain Camping</h3>
              <p className="text-slate-700">
                Sleep under star-filled skies at designated camping spots. Experience the tranquility 
                of mountain nights away from city lights.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">🧘</div>
              <h3 className="font-bold text-xl text-emerald-900 mb-2">Mountain Meditation</h3>
              <p className="text-slate-700">
                Find peace in nature's silence. Perfect environment for meditation, yoga, 
                and digital detox in the heart of the mountains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 bg-gradient-to-b from-orange-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold text-emerald-900">Gallery</h2>
              <p className="text-slate-600 mt-2">Explore beautiful moments from Veshalla</p>
            </div>
            <button 
              onClick={() => setShowAllGallery(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
            >
              View All
            </button>
          </div>

          {/* Horizontal scrolling gallery */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {gallery.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="flex-shrink-0 w-64 h-48 sm:w-80 sm:h-56 snap-start cursor-pointer group"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={src}
                    alt={`Veshalla ${i + 1}`}
                    className="w-full h-full object-cover rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-[100]"
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

      {/* VIEW ALL GALLERY MODAL */}
      <AnimatePresence>
        {showAllGallery && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAllGallery(false)}
          >
            <motion.div
              className="relative w-full max-w-7xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-orange-50">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-900">All Photos</h3>
                  <p className="text-sm text-slate-600 mt-1">{gallery.length} photos from Veshalla</p>
                </div>
                <button 
                  onClick={() => setShowAllGallery(false)}
                  className="p-2 rounded-full hover:bg-slate-200 transition"
                >
                  <X className="w-6 h-6 text-slate-700" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.01 }}
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer"
                      onClick={() => {
                        setShowAllGallery(false);
                        setLightboxIndex(i);
                      }}
                    >
                      <img
                        src={src}
                        alt={`Veshalla ${i + 1}`}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 text-white">
                          <p className="text-sm font-semibold">Photo {i + 1}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HIKING MAP */}
      <section id="hiking" className="py-16 bg-gradient-to-b from-orange-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">Hiking & Trails</h2>
          <p className="text-slate-800 text-lg mb-8">
            Explore the mountain trails around Veshalla. Discover peaks, valleys, and landmarks that make this region special.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-emerald-200">
            <div className="relative">
              <img 
                src="/Veshalla.jpeg" 
                alt="Hiking Map" 
                className="w-full h-auto object-cover"
              />
              
              {/* Interactive markers overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Kobilica Peak marker */}
                <div className="absolute top-[15%] right-[25%] pointer-events-auto">
                  <div className="bg-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:scale-110 transition cursor-pointer">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                    Kobilica
                  </div>
                  <div className="mt-2 bg-white/95 backdrop-blur rounded-lg p-2 text-xs text-slate-700 max-w-[200px] shadow-lg">
                    Mountain peak in the Šar Mountains. It is 2,528 m high.
                  </div>
                </div>

                {/* Sharr Montain marker */}
                <div className="absolute top-[35%] left-[30%] pointer-events-auto">
                  <div className="bg-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:scale-110 transition cursor-pointer">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                    Sharr Mountain
                  </div>
                </div>

                {/* Tetovo Fortress marker */}
                <div className="absolute top-[45%] right-[20%] pointer-events-auto">
                  <div className="bg-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:scale-110 transition cursor-pointer">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                    Tetovo Fortress
                  </div>
                </div>

                {/* Colorful Mosque marker */}
                <div className="absolute bottom-[35%] left-[15%] pointer-events-auto">
                  <div className="bg-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 hover:scale-110 transition cursor-pointer">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                    Colorful Mosque
                  </div>
                  <div className="mt-2 bg-white/95 backdrop-blur rounded-lg p-2 text-xs text-slate-700 max-w-[200px] shadow-lg">
                    Originally built in 1438, rebuilt in 1833 by Abdurrahman Pasha.
                  </div>
                </div>
              </div>
            </div>

            {/* Trail information */}
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-orange-50">
              <h3 className="font-bold text-xl text-emerald-900 mb-4">Popular Hiking Routes</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🥾</span>
                    <span className="font-semibold text-emerald-900">Veshalla to Kobilica Peak</span>
                  </div>
                  <p className="text-sm text-slate-600">Duration: 4-5 hours • Difficulty: Moderate</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🌲</span>
                    <span className="font-semibold text-emerald-900">Forest Valley Trail</span>
                  </div>
                  <p className="text-sm text-slate-600">Duration: 2-3 hours • Difficulty: Easy</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💧</span>
                    <span className="font-semibold text-emerald-900">Waterfall Circuit</span>
                  </div>
                  <p className="text-sm text-slate-600">Duration: 3-4 hours • Difficulty: Moderate</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏛️</span>
                    <span className="font-semibold text-emerald-900">Cultural Heritage Walk</span>
                  </div>
                  <p className="text-sm text-slate-600">Duration: 2 hours • Difficulty: Easy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section id="sponsors" className="py-16 bg-gradient-to-b from-emerald-50 via-orange-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">
            Our Sponsors
          </h2>
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