"use client";

import { useState } from "react";

export function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    collegeYear: "",
    track: "engineering",
    links: "",
    proudBuild: "",
  });

  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    reference: string;
    track: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "proudBuild") {
      if (value.length <= 500) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.whatsapp.trim()) {
      setErrorMsg("Please enter your WhatsApp number.");
      return;
    }
    if (!formData.collegeYear.trim()) {
      setErrorMsg("Please specify your college and current year of study.");
      return;
    }
    if (!formData.links.trim()) {
      setErrorMsg("Please provide at least one link demonstrating your work.");
      return;
    }
    if (!formData.proudBuild.trim()) {
      setErrorMsg("Please describe one project or problem you are proud of.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application. Please try again.");
      }

      setSuccessData({
        reference: data.reference || `SC-${Date.now().toString(36).toUpperCase()}`,
        track: data.track || formData.track,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      collegeYear: "",
      track: "engineering",
      links: "",
      proudBuild: "",
    });
    setCharCount(0);
    setSuccessData(null);
    setErrorMsg(null);
  };

  return (
    <section id="apply" className="border-t border-[#1A1A1A]/12 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[680px] px-5 sm:px-6">
        <div className="mb-8">
          <span className="font-mono text-xs font-semibold text-[#D9822B]">
            06
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
            Application
          </h2>
          <p className="mt-2 text-xs text-[#666666] font-sans">
            Cohort 1 - dates announced to selected applicants
          </p>
        </div>

        {successData ? (
          <div className="border border-[#1A1A1A]/15 bg-white/40 p-8 space-y-4">
            <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
              Application received.
            </h3>
            <p className="text-[17px] leading-[1.6] text-[#333333]">
              Your submission has been logged under reference{" "}
              <strong className="font-mono font-medium text-[#1A1A1A]">
                {successData.reference}
              </strong>
              . Applications are reviewed directly on submitted proof of work.
            </p>
            <p className="text-sm text-[#666666]">
              Cohort 1 - dates announced to selected applicants.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-[#D9822B] underline underline-offset-4 hover:text-[#B56518]"
              >
                Submit another application &rarr;
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {errorMsg && (
              <div className="border-l-2 border-[#D9822B] bg-[#1A1A1A]/5 p-3 text-sm text-[#1A1A1A]">
                {errorMsg}
              </div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Alex Morgan"
                required
                className="editorial-input"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="alex@example.com"
                required
                className="editorial-input"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2"
              >
                WhatsApp Number
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                required
                className="editorial-input"
              />
            </div>

            {/* College & Year */}
            <div>
              <label
                htmlFor="collegeYear"
                className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2"
              >
                College &amp; Current Year
              </label>
              <input
                type="text"
                id="collegeYear"
                name="collegeYear"
                value={formData.collegeYear}
                onChange={handleInputChange}
                placeholder="e.g. PES University, 3rd Year"
                required
                className="editorial-input"
              />
              <p className="mt-1.5 text-xs text-[#666666]">
                Stored privately by organizers; hidden from judges to keep evaluation identity-blind.
              </p>
            </div>

            {/* Track Preference */}
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2">
                Track Preference
              </span>
              <div className="flex flex-col sm:flex-row gap-4 pt-1">
                {[
                  { id: "engineering", label: "Engineering (18 seats)" },
                  { id: "business", label: "Business (18 seats)" },
                  { id: "mixed", label: "Mixed Track (2+2)" },
                ].map((trackOption) => (
                  <label
                    key={trackOption.id}
                    className="flex items-center gap-2 cursor-pointer text-sm text-[#1A1A1A]"
                  >
                    <input
                      type="radio"
                      name="track"
                      value={trackOption.id}
                      checked={formData.track === trackOption.id}
                      onChange={handleInputChange}
                      className="accent-[#D9822B]"
                    />
                    <span>{trackOption.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Proof of Work Links */}
            <div>
              <label
                htmlFor="links"
                className="block text-xs font-mono uppercase tracking-wider text-[#666666] mb-2"
              >
                Links to Proof of Work
              </label>
              <input
                type="text"
                id="links"
                name="links"
                value={formData.links}
                onChange={handleInputChange}
                placeholder="GitHub repo, deployed project, financial model, or portfolio"
                required
                className="editorial-input"
              />
              <p className="mt-1.5 text-xs text-[#666666]">
                Separate multiple links with commas.
              </p>
            </div>

            {/* One Thing You Built or Solved */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <label
                  htmlFor="proudBuild"
                  className="block text-xs font-mono uppercase tracking-wider text-[#666666]"
                >
                  One thing you built or solved that you are proud of
                </label>
                <span className="text-xs font-mono text-[#666666]">
                  {charCount}/500
                </span>
              </div>
              <textarea
                id="proudBuild"
                name="proudBuild"
                value={formData.proudBuild}
                onChange={handleInputChange}
                rows={4}
                maxLength={500}
                placeholder="Describe the problem, the trade-offs you chose, and how you verified it worked."
                required
                className="w-full bg-transparent border-0 border-b border-[#1A1A1A]/25 pb-2 text-[16px] text-[#1A1A1A] rounded-none focus:border-[#D9822B] focus:ring-0 focus:outline-none placeholder:text-[#1A1A1A]/40 resize-none font-sans"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-[2px] bg-[#D9822B] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#C27122] disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Submitting application..." : "Submit application \u2192"}
              </button>
              <span className="text-xs text-[#666666]">
                We use your details only to review your application.
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
