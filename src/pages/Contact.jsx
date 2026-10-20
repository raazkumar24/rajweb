import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight, AlertCircle } from "lucide-react";
import {
  HandDrawnUnderline,
  HandwrittenBadge,
} from "../components/decorative";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
} from "../components/ui/SocialPill";
import { socialLinks, WEB3FORMS_KEY } from "../config/site";
import InteractiveButton from "../components/ui/InteractiveButton";

const CURRENT_YEAR = new Date().getFullYear();

const socialIconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
topic: "",
    message: "",
  });
  const [botcheck, setBotcheck] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Listen for prefill event from Services
  useEffect(() => {
    const handlePrefill = (e) => {
      if (e.detail?.service) {
        setFormData((prev) => ({
          ...prev,
          topic: e.detail.service,
          message: `Hi Raj, I'd like to talk about a project regarding ${e.detail.service}.`,
        }));
      }
    };
    window.addEventListener("prefill-contact-service", handlePrefill);
    return () => window.removeEventListener("prefill-contact-service", handlePrefill);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // Prevent double submit

    // Honeypot check: agar bot ne bhara hai to quietly reject
    if (botcheck) {
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Required fields validation
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMsg("Please fill in all required fields (name, email, and message).");
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: trimmedName,
          email: trimmedEmail,
          subject: `Portfolio contact: ${formData.topic}`,
          message: trimmedMessage,
          botcheck: botcheck ? "true" : "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSent(true);
        setErrorMsg("");
        setFormData({ name: "", email: "", topic: "", message: "" });
      } else {
        setErrorMsg(result.message || "Failed to send message. Please try again or reach out directly.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection or email me directly at raazverma625@gmail.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const topics = [
    "New website",
    "Full-stack web app",
    "Custom design",
    "Contract role",
  ];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#111111] text-[#FAF8F5] pt-8 sm:pt-10 lg:pt-14 pb-16 sm:pb-24 overflow-hidden font-sans scroll-mt-20 sm:scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Availability Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-emerald-400">
              Open for new client projects &amp; contract roles
            </span>
          </div>

          <HandwrittenBadge
            text="Usually replies in <12h"
            direction="curved-right"
            rotation="-rotate-6"
            className="text-white hidden sm:inline-flex"
          />
        </div>

        {/* Giant Headline */}
        <div className="mb-14 sm:mb-20">
          <h2 className="font-black italic uppercase leading-[0.88] tracking-[-0.045em] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white">
            LET&apos;S{" "}
            <span className="relative inline-block text-brand">
              TALK.
              <HandDrawnUnderline className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" color="var(--brand-primary)" />
            </span>
          </h2>

          <div className="mt-8 sm:mt-12 flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <div>
              <span className="text-sm text-white/50 block mb-2 font-medium">
                Email me directly anytime
              </span>
              <a
                href="mailto:raazverma625@gmail.com"
                className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl font-black italic tracking-tight text-white hover:text-brand transition-colors"
              >
                <span className="underline underline-offset-8 decoration-white/20 group-hover:decoration-brand">
                  raazverma625@gmail.com
                </span>
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 inline-block" />
              </a>
            </div>

            <p className="text-sm sm:text-base text-white/70 max-w-sm font-normal leading-relaxed">
              Have a website, web app, or client project you&apos;d like to get started on? Send a message below and let&apos;s talk.
            </p>
          </div>
        </div>

        {/* Split Grid: Minimal Underline-Only Form & Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-white/10">
          
          {/* LEFT: Underline-Only Minimal Form */}
          <div className="lg:col-span-8">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="text-sm font-semibold text-brand block mb-2">
                  Send a message
                </span>
                <p className="text-sm text-white/50">A few details help me give you a useful first reply.</p>
              </div>
              <span className="hidden sm:inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">Step 01 / 01</span>
            </div>

            {sent ? (
              <div className="py-12 px-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-3">
                <div className="flex items-center gap-2.5 text-emerald-400 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Message sent</span>
                </div>
                <h3 className="font-black italic uppercase text-2xl sm:text-3xl text-white">
                  THANK YOU FOR REACHING OUT.
                </h3>
                <p className="text-white/70 text-sm max-w-md">
                  I&apos;ve received your message and will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="inline-flex items-center gap-1.5 text-sm text-brand hover:text-white underline mt-2 font-medium cursor-pointer"
                >
                  <span>Send another message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-10">
                {/* Honeypot field (hidden from real users, filled by spam bots) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  checked={botcheck}
                  onChange={(e) => setBotcheck(e.target.checked)}
                />

                {/* Topic selector */}
                <div>
                  <label className="text-sm text-white/60 block mb-3 font-medium">
                    What can I help you with?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, topic: t }))}
                        className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                          formData.topic === t
                            ? "bg-brand text-[#111111] font-semibold"
                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm text-white/60 font-medium">
                      Your name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-brand pb-3 text-white placeholder-white/25 outline-none transition-colors text-base font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm text-white/60 font-medium">
                      Your email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-brand pb-3 text-white placeholder-white/25 outline-none transition-colors text-base font-normal"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-white/60 font-medium">
                    Tell me about your project *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me a bit about what you're building, target timeline, or what you need..."
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-brand pb-3 text-white placeholder-white/25 outline-none transition-colors text-base font-normal resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit button */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <InteractiveButton
                    type="submit"
                    disabled={submitting}
                    variant="brand"
                    className={submitting ? "opacity-60 cursor-not-allowed hover:translate-y-0" : ""}
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    {submitting ? "Sending..." : "Send message"}
                  </InteractiveButton>

                  <span className="text-sm text-white/50">
                    I reply within 24 hours
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Location & Socials */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-sm font-semibold text-brand block mb-2">
                  Where I am
                </span>
                <p className="text-base text-white font-medium">
                  India &bull; Available worldwide (remote)
                </p>
                <p className="text-sm text-white/50 mt-1">
                  Flexible working hours for US, European, and Asian client timezones.
                </p>
              </div>

              <div>
                <span className="text-sm font-semibold text-brand block mb-3">
                  Find me online
                </span>
                <div className="flex flex-col gap-3 text-sm">
                  {socialLinks.map((item) => {
                    const IconComponent = socialIconMap[item.key] || GitHubIcon;
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.title}
                        className="text-white/80 hover:text-brand flex items-center justify-between border-b border-white/10 pb-2.5 transition-colors group"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-4 h-4 text-brand inline-flex items-center justify-center shrink-0">
                            <IconComponent className="h-4 w-4" />
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clean Footer Colophon */}
            <div className="pt-8 border-t border-white/10 text-xs text-white/50 leading-relaxed font-normal">
              Designed &amp; built by Raj Shekhar.
              <br />
              &copy; {CURRENT_YEAR} All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
