import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  MapPin,
  Mail,
  Send,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
} from "../components/ui/SocialPill";
import { socialLinks, WEB3FORMS_KEY } from "../config/site";
import { EditorialSectionHeader, CircularStampBadge } from "../components/ui";

const CURRENT_YEAR = new Date().getFullYear();

const socialIconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

const topics = [
  { id: "website", label: "01 NEW WEBSITE" },
  { id: "webapp", label: "02 FULL-STACK APP" },
  { id: "design", label: "03 CUSTOM UI/UX" },
  { id: "contract", label: "04 CONTRACT ROLE" },
];

export default function Contact({ heroMode = "red" }) {
  const isRedTheme = heroMode === "red";
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    topic: "02 FULL-STACK APP",
    message: "",
  });
  const [botcheck, setBotcheck] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  // Live IST Time clock
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen for prefill event from Services
  useEffect(() => {
    const handlePrefill = (e) => {
      if (e.detail?.service) {
        const svc = e.detail.service;
        let matched = "02 FULL-STACK APP";
        if (/design|ui|ux|figma/i.test(svc)) matched = "03 CUSTOM UI/UX";
        else if (/website|wordpress/i.test(svc)) matched = "01 NEW WEBSITE";
        else if (/contract|role|consult/i.test(svc)) matched = "04 CONTRACT ROLE";

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("raazverma625@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleBackToTop = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (botcheck) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMsg("Please fill in all required fields (name, email, and message).");
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
          subject: `Commission Inquiry: ${formData.topic} - ${trimmedName}`,
          message: `${trimmedMessage}\n\n[Project Scope: ${formData.topic}]\n[Estimated Budget: ${formData.budget || "Not Specified"}]`,
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
          budget: "",
          topic: "02 FULL-STACK APP",
          message: "",
        });
      } else {
        setErrorMsg(result.message || "Failed to submit. Please email me directly.");
      }
    } catch {
      setErrorMsg(
        "Network error. Please email me directly at raazverma625@gmail.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Color tokens aligned with Hero, Works, Services, and FAQ
  const theme = isRedTheme
    ? {
        bg: "radial-gradient(ellipse at 50% 30%, #C41618 0%, #8A0B0D 55%, #50080B 100%)",
        textPrimary: "#FFFFFF",
        textMuted: "rgba(255, 255, 255, 0.75)",
        outlineTitle: "rgba(255, 255, 255, 0.9)",
        titleFill: "#FFFFFF",
        gridLine: "rgba(255, 255, 255, 0.15)",
        cardBg: "#131418",
        cardBorder: "rgba(255, 255, 255, 0.12)",
        cardActiveBorder: "rgba(239, 68, 68, 0.6)",
        cardGlow: "0 0 30px rgba(239, 68, 68, 0.18)",
        inputBg: "rgba(255, 255, 255, 0.04)",
        inputBorder: "rgba(255, 255, 255, 0.14)",
        inputFocus: "#FFFFFF",
        stampColor: "#FFFFFF",
        btnPrimaryBg: "#FFFFFF",
        btnPrimaryText: "#A81014",
        pillInactiveBg: "rgba(255, 255, 255, 0.05)",
        pillInactiveText: "rgba(255, 255, 255, 0.7)",
        pillActiveBg: "#EF4444",
        pillActiveText: "#FFFFFF",
      }
    : {
        bg: "radial-gradient(ellipse at 50% 30%, #F7F5EE 0%, #E8E4DA 60%, #D8D4C8 100%)",
        textPrimary: "#111111",
        textMuted: "#4B4B4B",
        outlineTitle: "#111111",
        titleFill: "#111111",
        gridLine: "rgba(0, 0, 0, 0.14)",
        cardBg: "#FFFFFF",
        cardBorder: "rgba(0, 0, 0, 0.1)",
        cardActiveBorder: "rgba(200, 29, 29, 0.5)",
        cardGlow: "0 18px 40px -10px rgba(0, 0, 0, 0.12)",
        inputBg: "rgba(0, 0, 0, 0.02)",
        inputBorder: "rgba(0, 0, 0, 0.12)",
        inputFocus: "#111111",
        stampColor: "#111111",
        btnPrimaryBg: "#111111",
        btnPrimaryText: "#FFFFFF",
        pillInactiveBg: "rgba(0, 0, 0, 0.04)",
        pillInactiveText: "#555555",
        pillActiveBg: "#C81D1D",
        pillActiveText: "#FFFFFF",
      };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative z-20 w-full overflow-hidden pt-16 pb-12 font-sans select-none scroll-mt-20 sm:pt-24 sm:pb-16 transition-colors duration-700"
      style={{
        background: theme.bg,
        color: theme.textPrimary,
      }}
    >
      {/* Film grain subtle overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── UNIFIED EDITORIAL HEADER ── */}
        <EditorialSectionHeader
          number="06"
          label="GET IN TOUCH"
          outlineTitle="LET'S BUILD"
          solidTitle="TOGETHER"
          description="Have an ambitious web application, custom UI system, or high-performance e-commerce platform you want to bring to life? Let's connect and establish a clear milestone timeline."
          heroMode={heroMode}
        />

        {/* ── 3. LIVE METRIC STRIP ── */}
        <div
          className="mb-10 sm:mb-14 flex flex-wrap items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border"
          style={{
            background: isRedTheme ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            borderColor: theme.gridLine,
          }}
        >
          {/* Availability Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] sm:text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR Q2 2026 COMMISSIONS</span>
          </div>

          {/* Guaranteed Response SLA */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[11px] sm:text-xs font-medium opacity-85"
            style={{ borderColor: theme.gridLine }}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>REPLIES WITHIN &lt; 24H</span>
          </div>

          {/* Live IST Time */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[11px] sm:text-xs font-medium ml-auto"
            style={{ borderColor: theme.gridLine }}
          >
            <MapPin className="w-3.5 h-3.5 text-[#EF4444]" />
            <span>NEW DELHI (IST): {currentTime || "10:30 AM"}</span>
          </div>
        </div>

        {/* ── 4. SPLIT GRID: DIRECT CHANNELS VS INTERACTIVE FORM ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* LEFT COLUMN: DIRECT COORDINATES & CHANNELS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* Direct Email Card with 1-Click Copy */}
            <div
              className="p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 shadow-xl"
              style={{
                background: isRedTheme ? "#131418" : "#FFFFFF",
                borderColor: theme.cardBorder,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#EF4444]">
                  [ DIRECT EMAIL ]
                </span>
                <Mail className="w-4 h-4 opacity-50" />
              </div>

              <div className="mb-6">
                <a
                  href="mailto:raazverma625@gmail.com"
                  className="font-display text-xl sm:text-2xl font-black tracking-tight break-all transition-colors hover:underline"
                  style={{ color: theme.titleFill }}
                >
                  raazverma625@gmail.com
                </a>
                <p className="mt-1 text-xs opacity-60 font-mono">
                  Primary inbox • Checked throughout the business day
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 py-2.5 px-4 rounded-xl border font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 active:scale-95"
                  style={{
                    background: copied
                      ? "rgba(16, 185, 129, 0.15)"
                      : isRedTheme
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.05)",
                    borderColor: copied
                      ? "rgba(16, 185, 129, 0.4)"
                      : theme.cardBorder,
                    color: copied
                      ? "#34D399"
                      : theme.textPrimary,
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED TO CLIPBOARD ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>

                <a
                  href="mailto:raazverma625@gmail.com"
                  className="py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-105"
                  style={{
                    background: theme.btnPrimaryBg,
                    color: theme.btnPrimaryText,
                  }}
                >
                  <span>WRITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Studio Specifications Card */}
            <div
              className="p-6 sm:p-7 rounded-3xl border space-y-4 shadow-md"
              style={{
                background: isRedTheme ? "#131418" : "#FFFFFF",
                borderColor: theme.cardBorder,
              }}
            >
              <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#EF4444]">
                [ STUDIO SPECIFICATIONS ]
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: isRedTheme ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                  <span className="opacity-60 font-mono">LOCATION:</span>
                  <span className="font-semibold">New Delhi, India</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: isRedTheme ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                  <span className="opacity-60 font-mono">WORKING HOURS:</span>
                  <span className="font-semibold">Mon – Fri, 10:00 – 19:00 IST</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: isRedTheme ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                  <span className="opacity-60 font-mono">ENGAGEMENT MODEL:</span>
                  <span className="font-semibold">Milestone or Dedicated Sprint</span>
                </div>
                <div className="flex justify-between items-center py-2" style={{ borderColor: isRedTheme ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
                  <span className="opacity-60 font-mono">COLLABORATION:</span>
                  <span className="font-semibold">Remote &bull; Global Clients</span>
                </div>
              </div>
            </div>

            {/* Social Channels Card */}
            <div
              className="p-6 sm:p-7 rounded-3xl border shadow-md"
              style={{
                background: isRedTheme ? "#131418" : "#FFFFFF",
                borderColor: theme.cardBorder,
              }}
            >
              <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#EF4444] mb-4">
                [ DEVELOPER & SOCIAL CHANNELS ]
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {socialLinks.map((item) => {
                  const IconComponent = socialIconMap[item.key] || GitHubIcon;
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: isRedTheme ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                        borderColor: isRedTheme ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/10 text-white">
                          <IconComponent className="w-4 h-4" />
                        </span>
                        <div className="text-left">
                          <div className="font-mono text-xs font-bold uppercase tracking-wider">
                            {item.key}
                          </div>
                          <div className="text-[11px] opacity-60">
                            {item.label}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ARCHITECTURAL INTERACTIVE FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden"
              style={{
                background: isRedTheme ? "#131418" : "#FFFFFF",
                borderColor: theme.cardBorder,
              }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent-state"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="py-12 px-4 flex flex-col items-center text-center gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="max-w-md">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                        [ TRANSMISSION RECEIVED ]
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-black uppercase mt-2">
                        MESSAGE DELIVERED SUCCESSFULLY
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed opacity-75">
                        Thank you for reaching out. Your project specifications have
                        been safely received. I will review the scope and reply
                        within 24 hours.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-4 px-6 py-3 rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 hover:scale-105 cursor-pointer"
                      style={{
                        background: theme.btnPrimaryBg,
                        color: theme.btnPrimaryText,
                      }}
                    >
                      SEND ANOTHER MESSAGE ↗
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-7">
                    {/* Honeypot */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      checked={botcheck}
                      onChange={(e) => setBotcheck(e.target.checked)}
                    />

                    {/* Step 1: Project Scope Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#EF4444]">
                          [ 01 ] SELECT PROJECT SCOPE *
                        </label>
                        <span className="font-mono text-[10px] opacity-50 uppercase">
                          Choose primary deliverable
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                        {topics.map((t) => {
                          const isSelected = formData.topic === t.label;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, topic: t.label }))
                              }
                              className="relative py-3 px-3 sm:px-4 rounded-xl border text-left font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer overflow-hidden"
                              style={{
                                background: isSelected
                                  ? theme.pillActiveBg
                                  : theme.pillInactiveBg,
                                borderColor: isSelected
                                  ? "transparent"
                                  : theme.cardBorder,
                                color: isSelected
                                  ? theme.pillActiveText
                                  : theme.pillInactiveText,
                                boxShadow: isSelected
                                  ? "0 4px 15px rgba(239, 68, 68, 0.3)"
                                  : "none",
                              }}
                            >
                              <span className="relative z-10">{t.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-80"
                        >
                          [ 02 ] YOUR NAME *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          placeholder="e.g. Alex Vance"
                          className="w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-200"
                          style={{
                            background: theme.inputBg,
                            borderColor: theme.inputBorder,
                            color: theme.textPrimary,
                          }}
                          onFocus={(e) => (e.target.style.borderColor = theme.inputFocus)}
                          onBlur={(e) => (e.target.style.borderColor = theme.inputBorder)}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-80"
                        >
                          [ 03 ] WORK EMAIL *
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
                          className="w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-200"
                          style={{
                            background: theme.inputBg,
                            borderColor: theme.inputBorder,
                            color: theme.textPrimary,
                          }}
                          onFocus={(e) => (e.target.style.borderColor = theme.inputFocus)}
                          onBlur={(e) => (e.target.style.borderColor = theme.inputBorder)}
                        />
                      </div>
                    </div>

                    {/* Step 3: Budget & Timeline (Optional) */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="budget"
                          className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-80"
                        >
                          [ 04 ] ESTIMATED BUDGET &amp; LAUNCH DATE (OPTIONAL)
                        </label>
                        <span className="font-mono text-[10px] opacity-40 uppercase">
                          e.g. $2k-$5k • Q2
                        </span>
                      </div>
                      <input
                        id="budget"
                        type="text"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, budget: e.target.value }))
                        }
                        placeholder="e.g. $1,500 - $3,500 • Ready to start in 2 weeks"
                        className="w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-200"
                        style={{
                          background: theme.inputBg,
                          borderColor: theme.inputBorder,
                          color: theme.textPrimary,
                        }}
                        onFocus={(e) => (e.target.style.borderColor = theme.inputFocus)}
                        onBlur={(e) => (e.target.style.borderColor = theme.inputBorder)}
                      />
                    </div>

                    {/* Step 4: Project Message */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-80"
                      >
                        [ 05 ] PROJECT BRIEF &amp; OBJECTIVES *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, message: e.target.value }))
                        }
                        placeholder="Describe your vision, target audience, preferred tech stack, or specific pain points you need resolved..."
                        className="w-full px-4 py-3 rounded-xl border font-sans text-sm outline-none transition-all duration-200 resize-none"
                        style={{
                          background: theme.inputBg,
                          borderColor: theme.inputBorder,
                          color: theme.textPrimary,
                        }}
                        onFocus={(e) => (e.target.style.borderColor = theme.inputFocus)}
                        onBlur={(e) => (e.target.style.borderColor = theme.inputBorder)}
                      />
                    </div>

                    {/* Error Notice */}
                    <AnimatePresence>
                      {errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-2 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-400">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{errorMsg}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-8 py-4 rounded-full font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:scale-105 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: theme.btnPrimaryBg,
                          color: theme.btnPrimaryText,
                        }}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{submitting ? "TRANSMITTING..." : "SUBMIT PROJECT INQUIRY ↗"}</span>
                      </button>

                      <div className="text-[11px] font-mono opacity-60 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Direct response guaranteed &lt; 24h</span>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── 5. BRUTALIST BOTTOM FOOTER STRIP ── */}
        <div
          className="mt-16 sm:mt-24 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase"
          style={{ borderColor: theme.gridLine }}
        >
          <div className="opacity-60 text-center sm:text-left">
            &copy; {CURRENT_YEAR} RAJ SHEKHAR &bull; ALL RIGHTS RESERVED.
          </div>

          <div className="opacity-50 text-[11px] text-center hidden md:block">
            ARCHITECTED WITH REACT + TAILWIND + FRAMER MOTION
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer font-bold tracking-wider"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
