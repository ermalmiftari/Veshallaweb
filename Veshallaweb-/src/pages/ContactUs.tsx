import React, { useState } from "react";
import "./ContactUs.css";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: string;
  // Honeypot (should stay empty)
  website: string;
  consent: boolean;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  category: "General Inquiry",
  website: "",
  consent: false,
};

export default function ContactUs() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (k: keyof FormState, v: any) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.phone && !/^[\d+\-\s()]{6,}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!form.subject.trim()) e.subject = "Please add a subject.";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    if (!form.consent) e.consent = "You must agree to be contacted.";
    // Honeypot check is server-side too
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      setStatus(null);
      return;
    }
    if (form.website) {
      // Honeypot triggered — silently "succeed"
      setStatus({ ok: true, msg: "Thanks! We'll get back to you soon." });
      setForm(initialForm);
      return;
    }

    try {
      setSubmitting(true);
      setStatus(null);

      // Adjust this endpoint to your backend (example: /api/contact)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message.");
      setStatus({ ok: true, msg: "Message sent successfully. We'll contact you soon." });
      setForm(initialForm);
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <header className="contact-hero">
        <div className="container">
          <h1>Contact Our Village Office</h1>
          <p>
            Have a question, request, or suggestion? Send us a message and our municipal team will
            get back to you.
          </p>
        </div>
      </header>

      <main className="container grid">
        {/* LEFT: Form */}
        <section className="card">
          <h2>Send a Message</h2>

          {status && (
            <div className={`alert ${status.ok ? "alert-success" : "alert-error"}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <div className="hp">
              <label htmlFor="website">Leave this field empty</label>
              <input
                id="website"
                name="website"
                type="text"
                value={form.website}
                onChange={(e) => setField("website", e.target.value)}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g., Arben Ismaili"
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <small className="error">{errors.fullName}</small>}
              </div>

              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <small className="error">{errors.email}</small>}
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+389 70 000 000"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <small className="error">{errors.phone}</small>}
              </div>

              <div className="field">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value)}
                >
                  <option>General Inquiry</option>
                  <option>Public Services</option>
                  <option>Infrastructure</option>
                  <option>Events & Culture</option>
                  <option>Business & Permits</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="subject">Subject *</label>
              <input
                id="subject"
                type="text"
                placeholder="Short description"
                value={form.subject}
                onChange={(e) => setField("subject", e.target.value)}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <small className="error">{errors.subject}</small>}
            </div>

            <div className="field">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                placeholder="Write your message here…"
                rows={6}
                value={form.message}
                onChange={(e) => setField("message", e.target.value)}
                aria-invalid={!!errors.message}
              />
              {errors.message && <small className="error">{errors.message}</small>}
            </div>

            <div className="consent">
              <label>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setField("consent", e.target.checked)}
                />
                I agree that the village office may contact me regarding this message.
              </label>
              {errors.consent && <small className="error">{errors.consent}</small>}
            </div>

            <div className="actions">
              <button type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Send Message"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setForm(initialForm);
                  setErrors({});
                  setStatus(null);
                }}
                disabled={submitting}
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        {/* RIGHT: Info / Map */}
        <aside className="card side">
          <h3>Municipal Contacts</h3>
          <ul className="info-list">
            <li><strong>Village Office:</strong> Sheshi i Fshatit 1, Tetovë</li>
            <li><strong>Phone:</strong> +389 44 123 456</li>
            <li><strong>Email:</strong> info@village-example.mk</li>
            <li><strong>Hours:</strong> Mon–Fri, 08:00–16:00</li>
          </ul>

          <h4>Find Us</h4>
          <div className="map-wrap">
            {/* Replace src with your exact Google Maps share link */}
            <iframe
              title="Village location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2961.728!2d20.971!3d42.009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDAwJzMyLjQiTiAyMMKwNTgnMTUuNiJF!5e0!3m2!1sen!2smk!4v1700000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="mailto:info@village-example.mk">Email Us</a>
          </div>
        </aside>
      </main>
    </div>
  );
}
