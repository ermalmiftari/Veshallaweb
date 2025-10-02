import React from "react";

export default function MountainVillageHome() {
  return (
    <div className="min-h-screen text-slate-900">
      {/* --- Lightweight styles (works without Tailwind) --- */}
      <style>{`
        :root { --accent:#2e7d32; --dark:#0f172a; --muted:#6b7280; }
        * { box-sizing: border-box; }
        body { margin: 0; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
        .btn { display:inline-block; padding:12px 18px; border-radius:10px; text-decoration:none; font-weight:600; }
        .btn-primary{ background:var(--accent); color:#fff; }
        .btn-outline{ border:2px solid #fff; color:#fff; }
        .section{ padding: 64px 0; }
        .grid{ display:grid; gap:20px; }
        .grid-3{ grid-template-columns: repeat(3, minmax(0,1fr)); }
        @media (max-width: 900px){ .grid-3{ grid-template-columns: 1fr; } }
        .card{ background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:20px; box-shadow:0 6px 20px rgba(0,0,0,.06); }
        .tag{ background: #ecfdf5; color:#065f46; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:700; letter-spacing:.02em; display:inline-block; }
        .h1{ font-size: clamp(32px, 6vw, 56px); line-height:1.05; margin:0; color:#fff; text-shadow:0 2px 20px rgba(0,0,0,.35); }
        .h2{ font-size: clamp(24px, 4vw, 32px); margin:0 0 8px 0; color:var(--dark); }
        .lead{ font-size: clamp(16px, 2.5vw, 18px); color:#f8fafc; max-width: 60ch; }
        .muted{ color:var(--muted); }
        .hero { position:relative; min-height: 78vh; display:flex; align-items:center; }
        .hero::before{ content:""; position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat; filter: brightness(.65); }
        .hero .content{ position:relative; z-index:1; padding: 40px 0; }
        .pill{ display:inline-flex; align-items:center; gap:8px; padding:8px 12px; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.35); color:#fff; border-radius:999px; backdrop-filter: blur(6px); font-weight:600; }
        .features{ display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; margin-top:18px; }
        @media (max-width: 900px){ .features{ grid-template-columns: 1fr; } }
        .feature{ display:flex; gap:12px; align-items:flex-start; color:#fff; }
        .icon{ height:38px; width:38px; border-radius:10px; background:#ffffff1a; display:grid; place-items:center; font-weight:800; border:1px solid #ffffff33; }
        .gallery{ display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:10px; }
        .gallery img{ width:100%; height:180px; object-fit:cover; border-radius:12px; }
        @media (max-width: 900px){ .gallery{ grid-template-columns: repeat(2, minmax(0,1fr)); } .gallery img{ height:140px; } }
        .footer{ background:#0b1220; color:#cbd5e1; padding:32px 0; }
        .kbd{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; background:#0f172a; color:#e2e8f0; padding:2px 6px; border-radius:6px; border:1px solid #1f2937 }
      `}</style>

      {/* Hero */}
      <header className="hero">
        <div className="container content">
          <div className="pill">⛰️ Alpine escape • Fresh air • Local food</div>
          <h1 className="h1" style={{marginTop: 12}}>Welcome to Veshalla — Mountain Village Retreat</h1>
          <p className="lead" style={{marginTop: 12}}>
            Discover a tranquil village tucked in the mountains—perfect for weekend getaways, hiking, and authentic homestays. Plan your visit, explore local trails, and taste traditional cuisine.
          </p>
          <div style={{display:"flex", gap:12, marginTop:20, flexWrap:"wrap"}}>
            <a href="#plan" className="btn btn-primary">Plan your visit</a>
            <a href="#gallery" className="btn btn-outline">View gallery</a>
          </div>
          <div className="features">
            <div className="feature"><div className="icon">🥾</div><div><strong>Hiking Trails</strong><div className="muted">Marked routes for all levels</div></div></div>
            <div className="feature"><div className="icon">🏡</div><div><strong>Homestays</strong><div className="muted">Stay with local families</div></div></div>
            <div className="feature"><div className="icon">🍯</div><div><strong>Local Flavors</strong><div className="muted">Honey, cheese & herbal tea</div></div></div>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <span className="tag">About the village</span>
          <h2 className="h2" style={{marginTop:12}}>Quiet nature, warm people</h2>
          <p className="muted" style={{maxWidth: "70ch"}}>
            Our mountain village has been welcoming visitors for generations. Whether you are here to reconnect with nature, enjoy farm-to-table meals, or simply breathe fresh alpine air, Veshalla offers simple comfort and genuine hospitality.
          </p>
          <div className="grid grid-3" style={{marginTop:20}}>
            <div className="card">
              <h3 style={{marginTop:0}}>Getting here</h3>
              <p className="muted">Accessible by car from Tetovë/Skopje. Public minibuses run on weekends. Roads are paved; winter tires recommended in snowy months.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>Best time to visit</h3>
              <p className="muted">Spring wildflowers (April–June), cool summers (July–August), golden forests (September–October), and snowy scenes (December–February).</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>Where to stay</h3>
              <p className="muted">Family-run guesthouses and cabins. Contact the tourism office to match your group size and budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Things to do */}
      <section className="section" id="things">
        <div className="container">
          <span className="tag">Things to do</span>
          <h2 className="h2" style={{marginTop:12}}>Hike • Taste • Explore</h2>
          <div className="grid grid-3" style={{marginTop:20}}>
            <div className="card">
              <h3 style={{marginTop:0}}>Trail to Upper Meadow</h3>
              <p className="muted">A 3.2 km loop with gentle incline, panoramic viewpoints, and picnic spots. Great for families.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>Village Food Tour</h3>
              <p className="muted">Visit farms for fresh cheese, wildflower honey, and herbal tea. Weekend mornings only.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>Waterfall & Forest Walk</h3>
              <p className="muted">Shaded trail along a stream ending at a small waterfall. Wear proper shoes; rocks may be slippery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section" id="gallery">
        <div className="container">
          <span className="tag">Gallery</span>
          <h2 className="h2" style={{marginTop:12}}>Scenes from the mountains</h2>
          <div className="gallery" style={{marginTop:16}}>
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
              <img key={i} src={src} alt={`Veshalla gallery ${i+1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Plan your visit */}
      <section className="section" id="plan" style={{background:"#f8fafc"}}>
        <div className="container">
          <span className="tag">Plan your visit</span>
          <h2 className="h2" style={{marginTop:12}}>Info & contact</h2>

          <div className="grid grid-3" style={{marginTop:20}}>
            <div className="card">
              <h3 style={{marginTop:0}}>Tourism Office</h3>
              <p className="muted">Email: tourism@veshalla.example<br/>Phone: +389 7X XXX XXX<br/>Open: Mon–Sat, 09:00–17:00</p>
              <a href="#contact" className="btn btn-primary">Send inquiry</a>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>Map</h3>
              <p className="muted">Use your preferred maps app and search for <strong>“Veshalla Village”</strong>. Parking available near the square.</p>
              <div style={{height:160, borderRadius:12, overflow:"hidden", border:"1px solid #e5e7eb"}}>
                <iframe
                  title="Map"
                  width="100%"
                  height="100%"
                  style={{border:0}}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=20.75%2C41.9%2C21.0%2C42.1&layer=mapnik">
                </iframe>
              </div>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>Travel tips</h3>
              <ul className="muted" style={{paddingLeft:18, margin:0}}>
                <li>Pack layers; mountain weather shifts quickly.</li>
                <li>Carry water; refill at village fountains.</li>
                <li>Respect local customs and private land.</li>
                <li>Bring cash; some places may not accept cards.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section" id="contact">
        <div className="container" style={{textAlign:"center"}}>
          <h2 className="h2">Ready for your mountain escape?</h2>
          <p className="muted" style={{maxWidth:"65ch", margin:"8px auto 18px"}}>
            Tell us your travel dates and group size. We’ll recommend homestays and routes that fit your plans.
          </p>
          <a className="btn btn-primary" href="mailto:tourism@veshalla.example?subject=Trip%20inquiry%20-%20Veshalla%20village">Email the team</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container" style={{display:"flex", justifyContent:"space-between", gap:16, flexWrap:"wrap"}}>
          <div>
            <strong>Veshalla • Mountain Village</strong>
            <div className="muted">Tourism & Visitor Information</div>
          </div>
          <div className="muted">Built with <span className="kbd">React + Vite</span></div>
        </div>
      </footer>
    </div>
  );
}
