export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-800 bg-[#0d0f0e] relative z-10">
      
      {/* Soft top glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,170,80,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-20">

        {/* LEFT SIDE — COPYRIGHT */}
        <p className="text-gray-500 text-sm text-center md:text-left">
          © {new Date().getFullYear()} Veshalla — A mountain heart with a global family
        </p>

        {/* RIGHT SIDE — LINKS */}
        <div className="flex gap-6 text-sm">
          <a
            href="/shipping"
            className="text-gray-500 hover:text-amber-300 transition-colors duration-200"
          >
            Shipping
          </a>

          <a
            href="/returns"
            className="text-gray-500 hover:text-amber-300 transition-colors duration-200"
          >
            Returns
          </a>

          <a
            href="/contact"
            className="text-gray-500 hover:text-amber-300 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
