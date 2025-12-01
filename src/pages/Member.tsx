import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";

export default function Member() {
  const [location, setLocation] = useState<"mk" | "diaspora">("mk");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const price = location === "mk" ? 10 : 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const memberData = {
        ...formData,
        location,
        price,
        registeredAt: new Date().toISOString(),
      };

      const memberId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      await window.storage.set(memberId, JSON.stringify(memberData));

      try {
        const listResult = await window.storage.get("members_list");
        const membersList = listResult ? JSON.parse(listResult.value) : [];
        membersList.push(memberId);
        await window.storage.set("members_list", JSON.stringify(membersList));
      } catch (error) {
        await window.storage.set("members_list", JSON.stringify([memberId]));
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          address: "",
        });
        setLocation("mk");
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving member data:", error);
      setErrors({ submit: "Failed to save registration. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-amber-900 text-white flex items-center justify-center px-4">
        <div className="relative z-10 text-center space-y-6 max-w-md">
          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Welcome to Veshalla!</h1>
          <p className="text-gray-200/80">
            Your membership registration has been received. We'll be in touch soon with payment details and your membership card.
          </p>
          <p className="text-sm text-amber-300">
            {formData.firstName}, you are now part of our mountain family.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-amber-900 text-white flex items-center justify-center px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 55%), radial-gradient(circle at bottom, rgba(0,0,0,0.4), transparent 55%)",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-5 flex justify-center">
        <span className="text-[5rem] md:text-[9rem] lg:text-[13rem] font-black tracking-[0.15em] text-white/5 leading-none">
          VESHALLA
        </span>
      </div>

      <button
        onClick={() => window.location.href = '/'}
        className="absolute top-8 left-8 z-20 inline-flex items-center gap-2 text-sm text-amber-300/80 hover:text-amber-300 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      <div className="relative z-10 grid w-full max-w-5xl gap-10 lg:grid-cols-[1.15fr,1fr] items-center">
        <div className="space-y-6">
          <p className="uppercase tracking-[0.3em] text-sm text-amber-300/80">
            MEMBER COMMUNITY
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Feel the warmth of{" "}
            <span className="text-amber-400 font-bold">Veshalla</span>,{" "}
            <br className="hidden md:block" />
            wherever you live.
          </h1>

          <p className="text-sm md:text-base text-gray-200/80 max-w-xl">
            Join a community that carries its village in the heart. Members from
            North Macedonia and the diaspora come together to support Veshalla,
            its people, its rivers and the Sharr mountain that protects it.
          </p>

          <p className="text-xs md:text-sm text-gray-300/70 max-w-md">
            Your membership keeps the village alive — from stone houses and
            narrow roads to the families returning every summer.
          </p>
        </div>

        <div className="bg-slate-950/70 border border-emerald-700/40 shadow-2xl shadow-emerald-900/40 rounded-2xl p-6 md:p-7 backdrop-blur">
          <h2 className="text-xl md:text-2xl font-semibold mb-1 text-center">
            Become a Veshalla Member
          </h2>
          <p className="text-xs md:text-sm text-gray-200/80 text-center mb-5">
            Fill in your details so we can welcome you properly.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1 text-gray-200/80">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`w-full rounded-lg bg-slate-900/80 border ${
                    errors.firstName ? "border-red-500" : "border-slate-700/60"
                  } px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400`}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs mb-1 text-gray-200/80">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`w-full rounded-lg bg-slate-900/80 border ${
                    errors.lastName ? "border-red-500" : "border-slate-700/60"
                  } px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400`}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1 text-gray-200/80">
                  Mobile number
                </label>
                <input
                  type="tel"
                  placeholder="+389 ..."
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className={`w-full rounded-lg bg-slate-900/80 border ${
                    errors.mobile ? "border-red-500" : "border-slate-700/60"
                  } px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400`}
                />
                {errors.mobile && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs mb-1 text-gray-200/80">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full rounded-lg bg-slate-900/80 border ${
                    errors.email ? "border-red-500" : "border-slate-700/60"
                  } px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1 text-gray-200/80">
                Address
              </label>
              <input
                type="text"
                placeholder="Street, city"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`w-full rounded-lg bg-slate-900/80 border ${
                  errors.address ? "border-red-500" : "border-slate-700/60"
                } px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400`}
              />
              {errors.address && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs mb-1 text-gray-200/80">
                Where do you currently live?
              </label>
              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value === "mk" ? "mk" : "diaspora")
                }
                className="w-full rounded-lg bg-slate-900/80 border border-slate-700/60 px-3 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              >
                <option value="mk">In North Macedonia</option>
                <option value="diaspora">Outside North Macedonia (diaspora)</option>
              </select>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-900/80 border border-emerald-600/60 px-3 py-3 text-xs md:text-sm">
              <div>
                <p className="font-medium text-amber-300">
                  Membership fee: {price} €
                </p>
                <p className="text-[11px] md:text-xs text-gray-200/80">
                  {location === "mk"
                    ? "Special price for members living in North Macedonia."
                    : "Diaspora contribution supporting projects in Veshalla."}
                </p>
              </div>
              <div className="text-right text-[11px] md:text-xs text-gray-300/70">
                billed yearly
              </div>
            </div>

            {errors.submit && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.submit}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-3 w-full rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-500 disabled:bg-amber-600/50 disabled:cursor-not-allowed transition-colors px-4 py-2.5 text-sm md:text-base font-semibold tracking-wide shadow-lg shadow-amber-900/40"
            >
              {isSubmitting ? "Submitting..." : "Join the Veshalla Community"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}