import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Camera() {
  const { lang } = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const activeLang = lang || "en"

  const { t, i18n } = useTranslation("camera")

  // keep i18next in sync with URL /:lang
  useEffect(() => {
    if (activeLang && i18n.language !== activeLang) {
      i18n.changeLanguage(activeLang)
    }
  }, [activeLang, i18n])

  const handleLanguageChange = (newLang: string) => {
    if (newLang === activeLang) return
    // stay on camera page when switching language
    navigate(`/${newLang}/camera`)
  }

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

      {/* TOP BAR: HOME + LANGUAGE SWITCHER */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        {/* HOME BUTTON */}
        <Link
          to={`/${activeLang}`}
          className="
            flex items-center gap-2
            text-amber-300 hover:text-amber-200
            text-sm sm:text-base 
            font-medium transition
          "
        >
          ← {t("backHome")}
        </Link>

        {/* LANGUAGE SWITCHER (desktop) */}
        <div className="hidden sm:flex items-center gap-1 bg-black/40 border border-amber-500/40 rounded-full px-2 py-1 text-xs">
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
      </div>

      {/* HEADER */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-amber-300 drop-shadow-xl">
          {t("title")}
        </h1>

        <p className="text-gray-300 text-sm sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* CAMERA BOX */}
      <div className="relative z-10 mx-auto w-full max-w-2xl bg-black/40 border border-[#3b3b3b] rounded-2xl backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="w-full h-64 sm:h-80 bg-black/60 flex items-center justify-center">
          <p className="text-gray-500 text-sm sm:text-base">
            {t("placeholder")}
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
          {t("button")}
        </button>
      </div>
    </div>
  )
}
