import React from "react";

export default function MountainVillageHome(): JSX.Element {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <header
        id="home"
        className="relative min-h-[78vh] flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        {/* subtle color blobs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <span>⛰️</span> Alpine escape • Fresh air • Local food
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-white drop-shadow md:text-6xl">
            Veshalla — Mountain Village Retreat
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Discover a tranquil village tucked in the mountains—perfect for
            weekend getaways, hiking, and authentic homestays.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#plan"
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Plan your visit
            </a>
            <a
              href="#gallery"
              className="rounded-xl border border-white/60 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              View gallery
            </a>
          </div>

          {/* quick features */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🥾", title: "Hiking Trails", desc: "Marked routes for all levels" },
              { icon: "🏡", title: "Homestays", desc: "Stay with local families" },
              { icon: "🍯", title: "Local Flavors", desc: "Honey, cheese & herbal tea" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/30 bg-white/20 text-lg font-bold">
                  {f.icon}
                </div>
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <div className="text-white/80">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
            About the village
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Quiet nature, warm people</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Our mountain village has been welcoming visitors for generations.
            Whether you are here to reconnect with nature, enjoy farm-to-table
            meals, or simply breathe fresh alpine air, Veshalla offers simple
            comfort and genuine hospitality.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Getting here",
                desc:
                  "Accessible by car from Tetovë/Skopje. Public minibuses run on weekends. Winter tires recommended in snowy months.",
              },
              {
                title: "Best time to visit",
                desc:
                  "Spring wildflowers (Apr–Jun), cool summers (Jul–Aug), golden forests (Sep–Oct), snowy scenes (Dec–Feb).",
              },
              {
                title: "Where to stay",
                desc:
                  "Family-run guesthouses and cabins. Contact the tourism office to match your group size and budget.",
              },
            ].map((c, i) => (
              <article
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THINGS TO DO */}
      <section id="things" className="bg-gradient-to-b from-orange-50 to-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
            Things to do
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Hike • Taste • Explore</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Trail to Upper Meadow",
                d: "A 3.2 km loop with gentle incline and panoramic viewpoints. Great for families.",
              },
              {
                t: "Village Food Tour",
                d: "Visit farms for fresh cheese, wildflower honey, and herbal tea. Weekend mornings only.",
              },
              {
                t: "Waterfall & Forest Walk",
                d: "Shaded trail along a stream ending at a small waterfall. Wear proper shoes.",
              },
            ].map((x, i) => (
              <article
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
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
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
            Gallery
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Scenes from the mountains</h2>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Veshalla gallery ${i + 1}`}
                className="h-40 w-full rounded-xl object-cover sm:h-44 md:h-48"
              />
            ))}
          </div>
        </div>
      </section>

      {/* PLAN */}
      <section id="plan" className="bg-orange-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
            Plan your visit
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Info & contact</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Tourism Office</h3>
              <p className="mt-2 text-slate-600">
                Email: tourism@veshalla.example
                <br />
                Phone: +389 7X XXX XXX
                <br />
                Open: Mon–Sat, 09:00–17:00
              </p>
              <a
                href="#contact"
                className="mt-4 inline-block rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white shadow hover:bg-orange-600"
              >
                Send inquiry
              </a>
            </article>

            <article className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Map</h3>
              <p className="mt-2 text-slate-600">
                Use your preferred maps app and search for{" "}
                <strong>“Veshalla Village”</strong>. Parking near the square.
              </p>
              <div className="mt-3 overflow-hidden rounded-xl border">
                <iframe
                  title="Map"
                  className="h-40 w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=20.75%2C41.9%2C21.0%2C42.1&layer=mapnik"
                />
              </div>
            </article>

            <article className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Travel tips</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                <li>Pack layers; mountain weather shifts quickly.</li>
                <li>Carry water; refill at village fountains.</li>
                <li>Respect local customs and private land.</li>
                <li>Bring cash; some places may not accept cards.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready for your mountain escape?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Tell us your travel dates and group size. We’ll recommend homestays and
            routes that fit your plans.
          </p>
          <a
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow hover:bg-emerald-700"
            href="mailto:tourism@veshalla.example?subject=Trip%20inquiry%20-%20Veshalla%20village"
          >
            Email the team
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-slate-900 py-8 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
          <div>
            <strong className="text-white">Veshalla • Mountain Village</strong>
            <div className="text-slate-400">Tourism & Visitor Information</div>
          </div>
          <div>
            Built with <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 font-mono text-slate-200">React + Vite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
