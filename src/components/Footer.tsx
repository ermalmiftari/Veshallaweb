import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 bg-[#0d0f0e] text-gray-300 relative z-10">
      
      {/* Soft top glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,170,80,0.08),transparent_80%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">

      {/* BRAND */}
<div>
  <div className="flex items-center gap-3 mb-4">
    <img
      src="/veshallalogo.jpg"
      alt="Veshalla Logo"
      className="w-10 h-10 rounded-full object-cover shadow-lg"
    />
    <h3 className="text-lg font-bold text-amber-300">Veshalla</h3>
  </div>
  <p className="text-sm text-gray-400 leading-relaxed">
    A high-mountain village in the Šar Mountains — where tradition, nature,
    and the global diaspora stay united with pride.
  </p>
</div>


        {/* QUICK LINKS */}
        <div>
          <h4 className="text-sm font-semibold text-amber-200 mb-4">Explore</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/" className="hover:text-amber-300 transition-colors">Home</a></li>
            <li><a href="/en/shop" className="hover:text-amber-300 transition-colors">Shop</a></li>
            <li><a href="/en/member" className="hover:text-amber-300 transition-colors">Membership</a></li>
            <li><a href="/en/camera" className="hover:text-amber-300 transition-colors">Live Camera</a></li>
          </ul>
        </div>

        {/* CONTACT & SOCIAL */}
        <div>
          <h4 className="text-sm font-semibold text-amber-200 mb-4">Contact</h4>

          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            For support, questions or collaborations:
          </p>

          <ul className="flex flex-col gap-2 text-sm mb-6">
            <li>
              📧 <a href="mailto:contact@veshalla.info" className="hover:text-amber-300 transition-colors">
                contact@veshalla.info
              </a>
            </li>
            <li>
              📞 <a href="tel:+41798969500" className="hover:text-amber-300 transition-colors">
                +41 79 896 95 00
              </a>
            </li>
          </ul>

          <div className="flex gap-4 text-gray-400">
            <a
              href="https://www.instagram.com/veshalla.info/"
              target="_blank"
              className="hover:text-amber-300 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/p/veshallainfo-100087836555447/"
              target="_blank"
              className="hover:text-amber-300 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.youtube.com/@veshallainfo"
              target="_blank"
              className="hover:text-amber-300 transition"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-stone-800 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">

          <p>
            © {new Date().getFullYear()} Veshalla — Mountain Heart, Global Family
          </p>

          <p className="text-[11px] text-gray-600">
            Designed with ❤️ for the people of Veshalla
          </p>
        </div>
      </div>
    </footer>
  );
}
