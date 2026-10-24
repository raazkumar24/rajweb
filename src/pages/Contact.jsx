import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import SectionBadge from "../components/ui/SectionBadge";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
} from "../components/ui/SocialPill";
import { socialLinks, WEB3FORMS_KEY } from "../config/site";
import InteractiveButton from "../components/ui/InteractiveButton";
import { HandwrittenBadge } from "../components/decoration/doodleCard";
import { BrandCtaBottomWave } from "../components/decoration/brandBackgroundShapes";

const CURRENT_YEAR = new Date().getFullYear();

const socialIconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

const topics = [
  "New website",
  "Full-stack web app",
  "Custom design",
  "Contract role",
];

const EASE = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "New website",
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
        const svc = e.detail.service;
        let matched = "Full-stack web app";
        if (/design|ui|ux|figma/i.test(svc)) matched = "Custom design";
        else if (/website|wordpress/i.test(svc)) matched = "New website";
        else if (/contract|role|consult/i.test(svc)) matched = "Contract role";

        setFormData((prev) => ({
          ...prev,
          topic: matched,
          message: `Hi Raj, I'd like to discuss a project regarding ${svc}.`,
        }));
      }
    };
    window.addEventListener("prefill-contact-service", handlePrefill);
    return () =>
      window.removeEventListener("prefill-contact-service", handlePrefill);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (botcheck) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMsg(
        "Please fill in all required fields (name, email, and message).",
      );
      return;
    }

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
        setFormData({
          name: "",
          email: "",
          topic: "Full-Stack Web App",
          message: "",
        });
      } else {
        setErrorMsg(
          result.message || "Failed to submit. Please email me directly.",
        );
      }
    } catch {
      setErrorMsg(
        "Network error. Please email me directly at raazverma625@gmail.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-20 w-full overflow-hidden bg-[#0E0E10] pt-20 pb-16 font-sans text-white select-none scroll-mt-20 sm:pt-28 sm:pb-24"
    >
      <BrandCtaBottomWave opacity={0.12} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* Availability Line & Badge */}
        <motion.div
          variants={itemVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 sm:mb-12"
        >
          <SectionBadge number="05" label="Contact" className="text-white/60" />

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Open for new projects &bull; Replies in &lt;24h</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={itemVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="relative inline-block">
            <h2
              id="contact-heading"
              className="font-display mb-6 text-[clamp(2.75rem,6vw+1rem,5.5rem)] font-bold leading-[1] tracking-[-0.03em] text-white"
            >
              Let&apos;s talk about your{" "}
              <span className="font-normal italic text-brand-light">project.</span>
            </h2>

            {/* Doodle annotation on the dark Contact section */}
            <HandwrittenBadge
              text="Let's go!"
              arrowDirection="down-left"
              rotation="rotate-2"
              textClass="text-sm sm:text-base"
              textColor="text-white/70"
              arrowClass="h-8 w-8 sm:h-10 sm:w-10"
              className="absolute -top-7 right-0 hidden sm:flex"
            />
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-baseline">
            <div>
              <span className="mb-1 block font-mono text-xs uppercase text-white/50">
                Direct email:
              </span>
              <a
                href="mailto:raazverma625@gmail.com"
                className="group font-display inline-flex items-center gap-2 text-xl font-semibold text-white transition-colors hover:text-brand-light sm:text-3xl"
              >
                <span>raazverma625@gmail.com</span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <p className="max-w-md text-sm leading-relaxed font-normal text-white/65 sm:text-base">
              Have a web application, e-commerce project, or custom interface
              design you would like to build? Send a note below.
            </p>
          </div>
        </motion.div>

        {/* Split Grid: Form & Channels */}
        <motion.div
          variants={itemVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-12 border-t border-white/10 pt-10 lg:grid-cols-12 lg:gap-16"
        >
          {/* Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent-state"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, scale: 0.97, y: 12 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
                >
                  <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Message sent successfully</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Thank you for reaching out!
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-white/70">
                    I have received your message and will respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-brand-light underline transition-colors hover:text-white"
                  >
                    <span>Send another message</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form-state"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 sm:gap-8"
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    checked={botcheck}
                    onChange={(e) => setBotcheck(e.target.checked)}
                  />

                  {/* Topic selector */}
                  <div>
                    <label className="mb-3 block text-sm font-normal text-white/75 sm:text-base">
                      What can I help you with?
                    </label>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {topics.map((t) => {
                        const isSelected = formData.topic === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() =>
                              setFormData((p) => ({ ...p, topic: t }))
                            }
                            className={`relative cursor-pointer rounded-full px-5 py-2.5 text-xs font-medium transition-colors select-none sm:text-sm ${
                              isSelected
                                ? "text-white font-medium"
                                : "text-white/65 hover:text-white"
                            }`}
                          >
                            {/* Base pill background */}
                            <span className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.04] transition-colors" />

                            {/* Animated sliding motion pill */}
                            {isSelected && (
                              <motion.span
                                layoutId="contact-topic-pill"
                                className="absolute inset-0 -z-5 rounded-full border border-white/25 bg-white/[0.14] shadow-sm backdrop-blur-xs"
                                transition={
                                  shouldReduceMotion
                                    ? { duration: 0 }
                                    : {
                                        type: "spring",
                                        stiffness: 420,
                                        damping: 32,
                                      }
                                }
                              />
                            )}
                            <span className="relative z-10">{t}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inputs without boxes (underline only) */}
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-medium text-white/70 sm:text-sm"
                      >
                        Your name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="e.g. Alex Rivera"
                        className="w-full rounded-none border-0 border-b border-white/20 bg-transparent py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-white focus:outline-none sm:text-base"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-medium text-white/70 sm:text-sm"
                      >
                        Your email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="alex@company.com"
                        className="w-full rounded-none border-0 border-b border-white/20 bg-transparent py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-white focus:outline-none sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-medium text-white/70 sm:text-sm"
                    >
                      Tell me about your project *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Tell me a bit about what you're building, target timeline, or what you need..."
                      className="w-full resize-none rounded-none border-0 border-b border-white/20 bg-transparent py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-white focus:outline-none sm:text-base"
                    />
                  </div>

                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-400">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                    <InteractiveButton
                      type="submit"
                      disabled={submitting}
                      variant="brand"
                      icon={<ArrowRight className="h-4 w-4" />}
                      className={submitting ? "opacity-60 cursor-not-allowed" : ""}
                    >
                      {submitting ? "Sending..." : "Send message"}
                    </InteractiveButton>

                    <span className="text-xs text-white/50 sm:text-sm">
                      I reply within 24 hours
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Channels & Copyright (as in reference image) */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:pl-6">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-brand-light sm:text-base">
                  Find me online
                </h3>
                <div className="flex flex-col gap-4 text-sm">
                  {socialLinks.map((item) => {
                    const IconComponent = socialIconMap[item.key] || GitHubIcon;
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.title}
                        className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                      >
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-brand-light transition-transform duration-200 group-hover:scale-110">
                          <IconComponent className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium text-white/85 group-hover:text-white">
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 text-xs leading-relaxed text-white/40">
              Designed &amp; built by Raj Shekhar.
              <br />
              &copy; {CURRENT_YEAR} All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
