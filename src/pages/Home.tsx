"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import VeshallaMap from "../components/VeshallaMap"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showAllGallery, setShowAllGallery] = useState(false)

  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const activeLang = lang || "en"

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

  const handleLanguageChange = (newLang: string) => {
    if (newLang === activeLang) return
    navigate(`/${newLang}/home`)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const villageTopics = [
    "Emri - Etimologjia",
    "Historia - Kujtesa",
    "Demografia",
    "Besimi / Feja",
    "Arsimi",
    "Ekonomia",
    "Kuzhina",
    "Shëndetësia",
    "Sporti",
    "Artizanatet",
    "Krijimtaria",
    "Folkloristika",
    "Sociokultura",
    "Turizmi",
  ]

  const diaspora = [
    "në Rumeli",
    "në Vllahi",
    "në Turqi",
    "në ish-Jugosllavi",
    "në Austri",
    "në Gjermani",
    "në Zvicër",
    "në Danimarkë",
    "në Kroaci",
    "në Itali",
    "në Afrikë",
    "në Australi",
  ]

  const topButtons = [
    { label: "Ne", action: () => scrollTo("about") },
    { label: "për fëmijë", action: () => scrollTo("about") },
    { label: "për të rinj", action: () => navigate(`/${activeLang}/member`) },
    { label: "çka ta fikun", action: () => scrollTo("features") },
    { label: "për vizitarë", action: () => scrollTo("map") },
    { label: "...", action: () => scrollTo("gallery") },
    { label: "Kuizi", action: () => scrollTo("gallery") },
  ]

  const utilityButtons = [
    { label: "Foto galeria", action: () => setShowAllGallery(true) },
    { label: "Qendra digjitale / Film", action: () => scrollTo("about") },
    { label: "Harta interaktive", action: () => scrollTo("map") },
    { label: "Muzeu", action: () => scrollTo("about") },
    { label: "Arkivi", action: () => scrollTo("gallery") },
    { label: "Kontakti", action: () => scrollTo("contact") },
  ]

  return (
    <div className="min-h-screen bg-[#e9e7d8] text-[#1f2b1f]">
      {/* Container modified to w-full with removed max-width constraints */}
      <div className="w-full bg-[#f5f4e8] shadow-lg">
        {/* TOP HERO */}
        <section className="relative">
          <div
            className="h-[240px] sm:h-[320px] bg-cover bg-center relative w-full"
            style={{ backgroundImage: `url("/Veshalla.jpeg")` }}
          >
            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute left-4 top-4 flex items-center gap-3 z-10">
              <img
                src="/veshallalogo.jpg"
                alt="Veshalla Logo"
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="text-white drop-shadow">
                <div className="text-2xl font-bold">Veshalla</div>
                <div className="text-sm">dje - sot - nesër</div>
              </div>
            </div>

            <div className="absolute right-4 top-4 hidden sm:flex gap-2 z-10">
              <button className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold shadow">f</button>
              <button className="h-10 w-10 rounded-full bg-pink-600 text-white font-bold shadow">ig</button>
            </div>

            <button
              className="sm:hidden absolute right-4 top-4 z-10 rounded-md bg-[#214d2d] px-3 py-2 text-white"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="absolute right-4 bottom-5 text-white text-xl sm:text-3xl font-semibold italic drop-shadow">
              Mirë se vini në Veshallë!
            </div>
          </div>

          <div className="bg-[#214d2d] px-4 py-3 text-center text-white text-base sm:text-2xl font-semibold">
            E ardhmja ka nevojë për kujtime nga e kaluara dhe e sotmja...
          </div>

          <div className="border-y border-[#c8c3b0] bg-[#f9f8f0] px-4 py-3 text-center italic text-[#5d5a4f] text-sm sm:text-base">
            Një vend për historinë, kujtesën, kulturën, traditat dhe jetën e Veshallës.
          </div>

          {/* Language Bar */}
          <div className="flex justify-center border-b border-[#d8d2be] bg-[#f1eedf] py-3">
            <div className="rounded-md bg-[#214d2d] px-6 py-2 text-white font-bold tracking-wider">
              {["sq", "mk", "en", "de", "fr", "it", "tr"].map((code, index) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`mx-1 ${
                    activeLang === code ? "text-[#f4d37a]" : "text-white"
                  }`}
                >
                  {code.toUpperCase()}
                  {index !== 6 ? "_" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Boxed top nav */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-3 bg-[#f7f5e9] border-b border-[#d8d2be]">
            {topButtons.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="rounded-lg border-2 border-[#8a8574] bg-white px-3 py-3 text-sm sm:text-base shadow-sm hover:bg-[#efecd9]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN OLD-STYLE PANEL */}
        <section id="features" className="p-3 sm:p-4">
          <div className="rounded-lg bg-[#214d2d] px-4 py-3 text-center text-white font-semibold text-sm sm:text-lg">
            Ndihmoje platformën digjitale « Veshalla dje - sot - nesër ». Mos prit, dërgo materiale!
          </div>

          <div className="mt-3 grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-3">
            {/* LEFT COLUMN */}
            <div className="rounded-xl overflow-hidden border border-[#b9b39f] bg-[#173c23] text-white">
              <div className="px-4 py-3 text-2xl font-bold border-b border-white/15">
                Veshalla në Sharr
              </div>
              <div className="p-4 space-y-3 text-lg">
                {villageTopics.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo("about")}
                    className="block text-left w-full hover:text-[#f6d888]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER IMAGE */}
            <div className="relative rounded-xl overflow-hidden border border-[#b9b39f] min-h-[580px]">
              <img
                src="/Veshalla.jpeg"
                alt="Veshalla"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center text-white px-4 w-full">
                <div className="text-2xl sm:text-4xl font-bold drop-shadow">
                  Karakteristikat identitare:
                </div>
                <div className="text-lg sm:text-2xl font-semibold drop-shadow">
                  gjuha, traditat, zakonet ...
                </div>
              </div>

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center text-white">
                <div className="text-2xl sm:text-5xl font-bold drop-shadow mb-4">
                  Veshalla në syrin e kamerës
                </div>
                <button
                  onClick={() => navigate(`/${activeLang}/camera`)}
                  className="inline-flex items-center justify-center rounded-lg bg-white/90 px-6 py-3 text-[#214d2d] font-bold shadow-lg hover:bg-white"
                >
                  Hape kamerën / livestream
                </button>
              </div>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 text-center text-white w-full">
                <div className="text-2xl sm:text-4xl font-bold drop-shadow">
                  ... jeta në Veshallë e në mërgim ...
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="rounded-xl overflow-hidden border border-[#b9b39f] bg-[#486642] text-white">
              <div className="px-4 py-3 text-2xl font-bold border-b border-white/15">
                Veshalla në mërgim
              </div>
              <div className="px-4 pt-2 pb-4 text-right space-y-3 text-lg">
                {diaspora.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo("about")}
                    className="block w-full text-right hover:text-[#f6d888]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-[#214d2d] px-4 py-3 text-center text-white text-sm sm:text-base">
            Jeta nuk është përherë mjaltë, por kuah e ka provuar mjaltin e Veshallës një herë, e lyp përherë!
          </div>
        </section>

        {/* BOTTOM BUTTONS */}
        <section className="px-3 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {utilityButtons.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="rounded-lg border-2 border-[#8a8574] bg-[#f6f5ee] px-4 py-4 text-sm sm:text-base shadow-sm hover:bg-[#ece8d5]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="border-t border-[#d8d2be] bg-white px-5 py-10 w-full">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="mb-4 text-3xl font-bold text-[#214d2d]">Rreth Veshallës</h2>
            <p className="mb-4 text-[#444] leading-7">
              Kjo faqe është ridizenjuar me frymën e faqes së vjetër: më shumë strukturë,
              menu të kutizuara, pjesë informative dhe ndjesi më tradicionale.
            </p>
            <p className="text-[#444] leading-7">
              Këtu mund të vendosësh historinë, kujtesën, traditat, ekonominë, arsimin,
              sportin dhe çdo material tjetër që lidhet me Veshallën dhe mërgatën.
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="border-t border-[#d8d2be] bg-[#f9f8f0] px-5 py-10 w-full">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-bold text-[#214d2d]">Foto galeria</h2>
              <button
                onClick={() => setShowAllGallery(true)}
                className="rounded-lg bg-[#214d2d] px-5 py-3 text-white font-semibold hover:bg-[#173c23]"
              >
                Shiko të gjitha fotot
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {gallery.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="min-w-[260px] h-[180px] cursor-pointer overflow-hidden rounded-lg border border-[#cfcab6] bg-white shadow-sm"
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAP */}
        <section id="map" className="border-t border-[#d8d2be] bg-white px-5 py-10 w-full">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="mb-6 text-3xl font-bold text-[#214d2d]">Harta interaktive</h2>
            <div className="overflow-hidden rounded-xl border border-[#cfcab6] w-full">
              <div style={{ width: "100%", height: "550px" }}>
                <VeshallaMap />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-[#d8d2be] bg-[#f9f8f0] px-5 py-10 w-full">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="mb-4 text-3xl font-bold text-[#214d2d]">Kontakti</h2>
            <p className="text-[#444] leading-7">
              Nëse dëshiron të shtosh materiale, fotografi, kujtime ose dokumente për Veshallën,
              kjo pjesë mund të lidhet me formular kontakti ose email.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`/${activeLang}/member`)}
                className="rounded-lg bg-[#214d2d] px-5 py-3 text-white"
              >
                Bëhu anëtar
              </button>
              <button
                onClick={() => navigate(`/${activeLang}/shop`)}
                className="rounded-lg border border-[#214d2d] px-5 py-3 text-[#214d2d]"
              >
                Dyqani
              </button>
              <button
                onClick={() => navigate(`/${activeLang}/camera`)}
                className="rounded-lg border border-[#214d2d] px-5 py-3 text-[#214d2d]"
              >
                Kamera
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-[#214d2d] p-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="text-2xl font-bold">Menu</div>
              <button onClick={() => setMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>

            <div className="space-y-4 text-lg">
              <button onClick={() => scrollTo("about")} className="block">Rreth nesh</button>
              <button onClick={() => scrollTo("features")} className="block">Temat</button>
              <button onClick={() => scrollTo("gallery")} className="block">Foto galeria</button>
              <button onClick={() => scrollTo("map")} className="block">Harta</button>
              <button onClick={() => scrollTo("contact")} className="block">Kontakti</button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["sq", "mk", "en", "de", "fr", "it", "tr"].map((code) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`rounded-md border px-3 py-2 ${
                    activeLang === code ? "bg-white text-[#214d2d]" : "text-white"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setLightboxIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((i) => (i! - 1 + gallery.length) % gallery.length)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white"
            >
              <ChevronLeft size={34} />
            </button>

            <img
              src={currentImage}
              alt="Selected"
              className="max-h-[85vh] max-w-[90vw] rounded-xl border border-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((i) => (i! + 1) % gallery.length)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white"
            >
              <ChevronRight size={34} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALL GALLERY MODAL */}
      <AnimatePresence>
        {showAllGallery && (
          <motion.div
            className="fixed inset-0 z-[310] bg-black/80 p-4"
            onClick={() => setShowAllGallery(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="mx-auto w-full max-w-7xl rounded-xl bg-white p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#214d2d]">Të gjitha fotot</h3>
                <button onClick={() => setShowAllGallery(false)}>
                  <X className="text-[#214d2d]" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[75vh] overflow-y-auto">
                {gallery.map((src, i) => (
                  <div
                    key={i}
                    className="cursor-pointer overflow-hidden rounded-lg border border-[#d8d2be]"
                    onClick={() => {
                      setLightboxIndex(i)
                      setShowAllGallery(false)
                    }}
                  >
                    <img
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="h-40 w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}