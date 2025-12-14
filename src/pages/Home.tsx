"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import VeshallaMap from "../components/VeshallaMap"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showAllGallery, setShowAllGallery] = useState(false)

  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const activeLang = lang || "en"

  const { t, i18n } = useTranslation("home")

  // keep i18next in sync with URL /:lang
  useEffect(() => {
    if (activeLang && i18n.language !== activeLang) {
      i18n.changeLanguage(activeLang)
    }
  }, [activeLang, i18n])

  const handleLanguageChange = (newLang: string) => {
    if (newLang === activeLang) return
    navigate(`/${newLang}/home`)
  }

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
  ]

  const currentImage = lightboxIndex !== null ? gallery[lightboxIndex] : null

  // KEYBOARD ARROWS
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => (i! + 1) % gallery.length)
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => (i! - 1 + gallery.length) % gallery.length)
      }
      if (e.key === "Escape") {
        setLightboxIndex(null)
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightboxIndex, gallery.length])

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
          {/* Logo */}
          <button className="flex items-center gap-3 text-white">
            <img
              src="/veshallalogo.jpg"
              alt="Veshalla Logo"
              className="w-10 h-10 rounded-full object-cover shadow-lg"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-amber-200">Veshalla</div>
              <div className="text-xs text-white/70">{t("navbar.subtitle")}</div>
            </div>
          </button>

          {/* Desktop Language Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-emerald-800/80 rounded-full px-2 py-1 text-xs">
            {["en", "de", "it", "sq"].map((code) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`px-2 py-1 rounded-full transition ${
                  activeLang === code
                    ? "bg-amber-400 text-emerald-900 font-semibold"
                    : "text-amber-100 hover:text-amber-300"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Nav Links (Desktop only) */}
          <div className="hidden sm:flex items-center gap-6 text-sm">
            {/* Links */}
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              {t("navbar.about")}
            </button>
            <button
              onClick={() => document.getElementById("things")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              {t("navbar.experiences")}
            </button>
            <button
              onClick={() => document.getElementById("gallery")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              {t("navbar.gallery")}
            </button>
            <button
              onClick={() => document.getElementById("hiking-map")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              {t("navbar.hiking")}
            </button>
            <button
              onClick={() => document.getElementById("sponsors")?.scrollIntoView()}
              className="text-amber-100 hover:text-amber-300"
            >
              {t("navbar.sponsors")}
            </button>
          </div>

          {/* Mobile Language Switcher + Menu Button */}
          <div className="sm:hidden flex items-center gap-3">
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-1 bg-emerald-800/80 rounded-full px-2 py-1 text-xs">
              {["en", "de", "it", "sq"].map((code) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`px-2 py-1 rounded-full transition ${
                    activeLang === code
                      ? "bg-amber-400 text-emerald-900 font-semibold"
                      : "text-amber-100 hover:text-amber-300"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(true)}>
              <Menu className="text-amber-200" />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* HERO SECTION */}
      <header
        className="relative min-h-screen text-white flex items-center justify-center text-center px-6 pt-24"
        style={{
          backgroundImage: `url("/Veshalla.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg mb-4">
            {t("hero.title")}
          </h1>

          <p className="text-lg sm:text-xl mb-8 text-white/90">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            <button
              onClick={() => navigate(`/${activeLang}/shop`)}
              className="flex-1 min-w-[200px] px-6 py-4 bg-white text-emerald-900 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-3xl mb-1">🛒</div>
              <div className="font-bold text-lg mb-1">{t("hero.shop.title")}</div>
              <div className="text-xs text-slate-600">{t("hero.shop.desc")}</div>
            </button>

            <button
              onClick={() => navigate(`/${activeLang}/member`)}
              className="flex-1 min-w-[200px] px-6 py-4 bg-emerald-600 text-white rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-3xl mb-1">👤</div>
              <div className="font-bold text-lg mb-1">{t("hero.member.title")}</div>
              <div className="text-xs text-emerald-100">{t("hero.member.desc")}</div>
            </button>

            <button
              onClick={() => navigate(`/${activeLang}/camera`)}
              className="flex-1 min-w-[200px] px-6 py-4 bg-white text-red-600 border-2 border-red-500 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-3xl mb-1">🔴</div>
              <div className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
                {t("hero.camera.title")}
              </div>
              <div className="text-xs text-slate-600">{t("hero.camera.desc")}</div>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div
            className="flex flex-col items-center gap-2 text-white/80 cursor-pointer"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-sm font-medium">{t("hero.scroll")}</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </header>

      {/* ABOUT */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-100 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-xl">⛰️</span>
                <span className="font-semibold text-sm">{t("about.badge")}</span>
              </div>
            </div>
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-800 via-emerald-600 to-orange-600 bg-clip-text text-transparent mb-8">
              {t("about.title")}
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500"
            >
              <p className="text-slate-800 text-lg leading-relaxed">
                {t("about.paragraph1")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-orange-500"
            >
              <p className="text-slate-800 text-lg leading-relaxed">
                {t("about.paragraph2")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-amber-500"
            >
              <p className="text-slate-800 text-lg leading-relaxed">
                {t("about.paragraph3")}
              </p>
            </motion.div>
          </div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-center text-white shadow-lg">
              <div className="text-3xl font-bold">1247m</div>
              <div className="text-sm text-emerald-100">{t("about.stats.elevation")}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-center text-white shadow-lg">
              <div className="text-3xl font-bold">{t("about.stats.centuries.label")}</div>
              <div className="text-sm text-orange-100">{t("about.stats.centuries.caption")}</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-center text-white shadow-lg">
              <div className="text-3xl font-bold">{t("about.stats.air.label")}</div>
              <div className="text-sm text-amber-100">{t("about.stats.air.caption")}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-4 text-center text-white shadow-lg">
              <div className="text-3xl font-bold">{t("about.stats.community.label")}</div>
              <div className="text-sm text-emerald-100">{t("about.stats.community.caption")}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section
        id="things"
        className="py-20 bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-100 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-xl">✨</span>
                <span className="font-semibold text-sm">{t("experiences.badge")}</span>
              </div>
            </div>
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-4">
              {t("experiences.title")}
            </h2>
            <p className="text-slate-700 text-xl max-w-3xl mx-auto">
              {t("experiences.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mountain Hiking */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-emerald-200"
            >
              <div className="text-5xl mb-4 bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center">
                🥾
              </div>
              <h3 className="font-bold text-xl text-emerald-900 mb-3">
                {t("experiences.hiking.title")}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {t("experiences.hiking.desc")}
              </p>
            </motion.div>

            {/* Waterfall Visits */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-200"
            >
              <div className="text-5xl mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                💧
              </div>
              <h3 className="font-bold text-xl text-emerald-900 mb-3">
                {t("experiences.waterfalls.title")}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {t("experiences.waterfalls.desc")}
              </p>
            </motion.div>

            {/* Tea with Locals */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-amber-200"
            >
              <div className="text-5xl mb-4 bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center">
                🍵
              </div>
              <h3 className="font-bold text-xl text-emerald-900 mb-3">
                {t("experiences.tea.title")}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {t("experiences.tea.desc")}
              </p>
            </motion.div>

            {/* Peak Climbing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-teal-200"
            >
              <div className="text-5xl mb-4 bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center">
                🏔️
              </div>
              <h3 className="font-bold text-xl text-emerald-900 mb-3">
                {t("experiences.peaks.title")}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {t("experiences.peaks.desc")}
              </p>
            </motion.div>

            {/* Forest Exploration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-green-200"
            >
              <div className="text-5xl mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
                🌲
              </div>
              <h3 className="font-bold text-xl text-emerald-900 mb-3">
                {t("experiences.forest.title")}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {t("experiences.forest.desc")}
              </p>
            </motion.div>

            {/* Photography Tours */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-orange-200"
            >
              <div className="text-5xl mb-4 bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center">
                📸
              </div>
              <h3 className="font-bold text-xl text-emerald-900 mb-3">
                {t("experiences.photo.title")}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {t("experiences.photo.desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="py-20 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-100 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-xl">📸</span>
                  <span className="font-semibold text-sm">{t("gallery.badge")}</span>
                </div>
              </div>
              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-800 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                {t("gallery.title")}
              </h2>
              <p className="text-slate-700 text-lg mt-3">
                {t("gallery.subtitle")}
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => setShowAllGallery(true)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition shadow-lg hover:shadow-xl font-semibold"
            >
              {t("gallery.viewAll", { count: gallery.length })}
            </motion.button>
          </div>

          {/* Horizontal scrolling gallery */}
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
              {gallery.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="flex-shrink-0 w-72 h-52 sm:w-80 sm:h-60 snap-start cursor-pointer group relative rounded-2xl overflow-hidden shadow-xl"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={src || "/placeholder.svg"}
                    alt={t("gallery.imageAlt", { index: i + 1 })}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-sm font-semibold">{t("gallery.cardLabel")}</div>
                  </div>
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
                e.stopPropagation()
                setLightboxIndex((i) => (i! - 1 + gallery.length) % gallery.length)
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
                e.stopPropagation()
                setLightboxIndex((i) => (i! + 1) % gallery.length)
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
                  <h3 className="text-2xl font-bold text-emerald-900">{t("gallery.modal.title")}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {t("gallery.modal.subtitle", { count: gallery.length })}
                  </p>
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
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                      className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
                      onClick={() => {
                        setLightboxIndex(i)
                        setShowAllGallery(false)
                      }}
                    >
                      <img
                        src={src || "/placeholder.svg"}
                        alt={t("gallery.imageAlt", { index: i + 1 })}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HIKING MAP */}
      <section id="hiking-map" className="py-20 bg-white">
        <div style={{ width: "100%", height: "600px" }}>
          <VeshallaMap />
        </div>
      </section>

      {/* SPONSORS */}
      <section
        id="sponsors"
        className="py-20 bg-gradient-to-br from-orange-100 via-amber-50 to-emerald-100 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-xl">🤝</span>
                <span className="font-semibold text-sm">{t("sponsors.badge")}</span>
              </div>
            </div>
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-800 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              {t("sponsors.title")}
            </h2>
            <p className="text-slate-700 text-xl mb-12 max-w-2xl mx-auto">
              {t("sponsors.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white p-4"
          >
            <img src="/1.png" className="w-full h-auto object-contain rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-emerald-900/95 backdrop-blur-lg z-[200] flex flex-col items-center justify-center gap-8 text-white text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute top-6 right-6" onClick={() => setMenuOpen(false)}>
              <X size={32} className="text-amber-200" />
            </button>

            <button
              onClick={() => {
                document.getElementById("about")?.scrollIntoView()
                setMenuOpen(false)
              }}
              className="hover:text-amber-300"
            >
              {t("navbar.about")}
            </button>
            <button
              onClick={() => {
                document.getElementById("things")?.scrollIntoView()
                setMenuOpen(false)
              }}
              className="hover:text-amber-300"
            >
              {t("navbar.experiences")}
            </button>
            <button
              onClick={() => {
                document.getElementById("gallery")?.scrollIntoView()
                setMenuOpen(false)
              }}
              className="hover:text-amber-300"
            >
              {t("navbar.gallery")}
            </button>
            <button
              onClick={() => {
                document.getElementById("hiking-map")?.scrollIntoView()
                setMenuOpen(false)
              }}
              className="hover:text-amber-300"
            >
              {t("navbar.hiking")}
            </button>
            <button
              onClick={() => {
                document.getElementById("sponsors")?.scrollIntoView()
                setMenuOpen(false)
              }}
              className="hover:text-amber-300"
            >
              {t("navbar.sponsors")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}