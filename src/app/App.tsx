import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import svgPaths from "../imports/svg-9zz4bups76";
import imgBarryHeadshots from "@/assets/f38794277b68282e48c0f1fa2968cb07117406c5.png";

// Google Apps Script endpoint
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxlQlDO3IzglbHL_gESH1uR3zUoY4wLcdcR7FyoRQtA9UbRRYRJR5vpit8Cs7MYYjloDA/exec";

type EnquiryReason =
  | ""
  | "Hiring Opportunity"
  | "Collaboration"
  | "Project Inquiry"
  | "Other";

type FormData = {
  name: string;
  email: string;
  organisation: string;
  reason: EnquiryReason;
  message: string;
  honeypot: string;
};

type FieldName = keyof FormData;

type FieldErrors = Partial<Record<FieldName, string>>;

type SubmitStatus = "idle" | "success" | "error";

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  organisation: "",
  reason: "",
  message: "",
  honeypot: "",
};

function validate(formData: FormData): { ok: boolean; errors: FieldErrors } {
  const errors: FieldErrors = {};

  // Honeypot: if filled, treat as bot. Avoid revealing this in UI.
  if (formData.honeypot) {
    errors.honeypot = "Bot detected";
    return { ok: false, errors };
  }

  if (!formData.name.trim()) errors.name = "Name is required";

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formData.reason) errors.reason = "Please select a reason for contact";
  if (!formData.message.trim()) errors.message = "Message is required";

  return { ok: Object.keys(errors).length === 0, errors };
}

function toUrlEncodedBody(formData: FormData): string {
  // Map 'reason' to 'enquiryType' for Google Script
  return new URLSearchParams({
    name: formData.name,
    email: formData.email,
    organisation: formData.organisation,
    enquiryType: formData.reason,
    message: formData.message,
  }).toString();
}

export default function App() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isScrolled, setIsScrolled] = useState(false);

  // Used for stable ids and focus management
  const reactId = useId();
  const contactHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  // New: summary + success focus targets
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const successMessageRef = useRef<HTMLParagraphElement | null>(null);

  const ids = useMemo(() => {
    // Generate stable, unique ids per render tree
    return {
      name: `name-${reactId}`,
      email: `email-${reactId}`,
      organisation: `organisation-${reactId}`,
      reason: `reason-${reactId}`,
      message: `message-${reactId}`,
      status: `form-status-${reactId}`,
      errorSummary: `error-summary-${reactId}`,
      contactHeading: `contact-heading-${reactId}`,
    };
  }, [reactId]);

  const FOCUS_RING =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e3ffa6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e3dfed] rounded-[8px]";

  const FOCUS_RING_DARK =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171617]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e3dfed] rounded-[12px]";


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);


  const clearFieldError = (name: FieldName) => {
    if (!errors[name]) return;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const fieldName = name as FieldName;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    clearFieldError(fieldName);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    contactSection?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

    // After scrolling, move focus to heading or first field for keyboard users.
    window.setTimeout(() => {
      (contactHeadingRef.current ?? firstFieldRef.current)?.focus();
    }, 350);
  };

  // New: error ordering and summary list for WCAG-friendly navigation
  const errorOrder: FieldName[] = ["name", "email", "reason", "message"];

  const errorSummaryItems = useMemo(() => {
    const items = errorOrder
      .map((field) => {
        const message = errors[field];
        if (!message) return null;

        const label =
          field === "name"
            ? "Name"
            : field === "email"
            ? "Email"
            : field === "reason"
            ? "Reason for contact"
            : field === "message"
            ? "Message"
            : field;

        return {
          field,
          label,
          message,
          targetId: ids[field as keyof typeof ids] as string,
        };
      })
      .filter(Boolean) as Array<{
      field: FieldName;
      label: string;
      message: string;
      targetId: string;
    }>;

    return items;
  }, [errors, ids]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { ok, errors: nextErrors } = validate(formData);
    setErrors(nextErrors);

    if (!ok) {
      setSubmitStatus("idle");
      window.requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: toUrlEncodedBody(formData),
        redirect: "follow",
      });

      const result = await response.json();

      if (result?.success) {
        setSubmitStatus("success");
        setFormData(INITIAL_FORM);
        setErrors({});

        window.requestAnimationFrame(() => {
          successMessageRef.current?.focus();
        });
      } else {
        console.error("Server error:", result?.error);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-[#e3dfed] min-h-screen relative"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(23, 22, 23, 0.15) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Skip Links */}
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:fixed focus:top-[12px] focus:left-[12px] z-[100] bg-white text-[#171617] px-[12px] py-[10px] shadow-md ${FOCUS_RING}`}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        className={`main-navigation fixed top-0 left-0 right-0 z-50 bg-[#e3dfed]/95 backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(23, 22, 23, 0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-label="Primary"
      >
        <div
          className={`max-w-[1200px] mx-auto px-[20px] sm:px-[52px] flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "py-[18px] sm:py-[23.5px]" : "py-[22px] sm:py-[47px]"
          }`}
        >
          {/* Logo */}
          <div
            className={`transition-all duration-300 ${
              isScrolled
                ? "h-[44px] w-[40px] sm:h-[56.55px] sm:w-[50.7px]"
                : "h-[52px] w-[46px] sm:h-[87px] sm:w-[78px]"
            }`}
            aria-hidden="true"
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 78 87"
            >
              <path d={svgPaths.p2889000} fill="#171617" />
            </svg>
          </div>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-[24px]">
            <a
              href="https://drive.google.com/file/d/1hX3MTiuYAtmoNTTxzIND9REDPMAwJ_4Z/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-['Rubik',sans-serif] font-medium text-[#171617] text-[20px] uppercase transition-opacity hover:opacity-70 ${FOCUS_RING}`}
            >
              Resume
            </a>

            <button
              type="button"
              onClick={() => {
                scrollToContact();
                setIsMobileMenuOpen(false);
              }}
              className={`bg-[#e3ffa6] px-[20px] py-[12px] rounded-[12px] font-['Rubik',sans-serif] font-medium text-[#171617] text-[20px] uppercase transition-transform hover:scale-105 active:scale-95 cursor-pointer ${FOCUS_RING_DARK}`}
            >
              Contact me
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            ref={mobileMenuButtonRef}
            type="button"
            className={`sm:hidden inline-flex items-center justify-center h-[44px] w-[44px] ${FOCUS_RING_DARK}`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {/* Simple hamburger / close icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="#171617"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="#171617"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div
            className="sm:hidden fixed inset-0 z-50"
            role="presentation"
            aria-hidden="true"
          >
            {/* Backdrop */}
            <button
              type="button"
              className="absolute inset-0 bg-black/30"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu backdrop"
            />

            {/* Panel */}
            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute top-0 right-0 h-full w-[86%] max-w-[360px] bg-[#e3dfed] shadow-xl p-[20px] flex flex-col gap-[16px]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(23, 22, 23, 0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-['Rubik',sans-serif] font-medium text-[#171617] text-[16px] uppercase">
                  Menu
                </span>
                <button
                  type="button"
                  className={`h-[44px] w-[44px] inline-flex items-center justify-center ${FOCUS_RING_DARK}`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
                  }}
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 6L18 18M18 6L6 18"
                      stroke="#171617"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <a
                href="https://drive.google.com/file/d/1hX3MTiuYAtmoNTTxzIND9REDPMAwJ_4Z/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-['Rubik',sans-serif] font-medium text-[#171617] text-[18px] uppercase px-[12px] py-[10px] bg-white/60 rounded-[12px] ${FOCUS_RING}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </a>

              <button
                type="button"
                onClick={() => {
                  scrollToContact();
                  setIsMobileMenuOpen(false);
                }}
                className={`bg-[#e3ffa6] px-[12px] py-[12px] rounded-[12px] font-['Rubik',sans-serif] font-medium text-[#171617] text-[18px] uppercase transition-transform active:scale-95 cursor-pointer ${FOCUS_RING_DARK}`}
              >
                Contact me
              </button>

              <div className="mt-auto text-[12px] text-[#171617]/70">
                Press Escape to close.
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main
        id="main"
        tabIndex={-1}
        className="hero max-w-[1200px] mx-auto px-[52px] pt-[240px] pb-[100px]"
      >
        <div className="flex gap-[60px] items-center">
          {/* Left Column - Content */}
          <div className="flex-1">
            <h1 className="font-['Rubik',sans-serif] font-bold text-[56px] leading-[61.6px] tracking-[-1.12px] text-[#171617] mb-[24px] max-w-[630px]">
              Product Designer Who Simplifies the Complex
            </h1>

            <p className="font-['Poppins',sans-serif] text-[20px] leading-[30px] text-[#171617] mb-[36px] max-w-[611px]">
              Building accessible, user-centred products by connecting design,
              engineering, and business around what matters.
            </p>

            {/* Skills Tags */}
            <ul className="tag-list flex flex-wrap gap-[18px] max-w-[611px]">
              {[
                "A11y Consultant",
                "Agile Methodologies",
                "Prototyping",
                "UI Design",
                "UX Design",
                "UX Research",
                "Workshop Facilitation",
              ].map((skill) => (
                <li
                  key={skill}
                  className="bg-[#e3ffa6] px-[12px] py-[12px] rounded-[12px]"
                >
                  <span className="font-['Poppins',sans-serif] text-[16px] leading-[19.748px] tracking-[0.48px] text-[#171617] whitespace-nowrap">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Headshot */}
          <div className="w-[419px] h-[539px] rounded-[16px] overflow-hidden shrink-0">
            <img
              src={imgBarryHeadshots}
              alt="Barry Conlon - Product Designer"
              className="w-full h-[116.56%] object-cover object-center translate-y-[0] rounded-[16px]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </main>

      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-[1200px] mx-auto px-[52px] pb-[100px]"
      >
        <div className="bg-[#f2edff] rounded-[16px] px-[200px] py-[100px]">
          <h2
            id={ids.contactHeading}
            ref={contactHeadingRef}
            tabIndex={-1}
            className="font-['Rubik',sans-serif] font-bold text-[45px] leading-[51.75px] tracking-[-0.9px] text-[#171617] text-center mb-[25px]"
          >
            Let&apos;s Work Together
          </h2>

          <p className="font-['Poppins',sans-serif] text-[20px] leading-[30px] text-[#171617] mb-[25px]">
            If you&apos;re hiring, exploring a collaboration, or have a project in
            mind, I&apos;d love to hear from you. Send a message and I&apos;ll respond
            as soon as possible.
          </p>

          {/* Screen-reader status region (keep) */}
          <div
            id={ids.status}
            tabIndex={-1}
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {submitStatus === "success"
              ? "Thank you for your message. I will get back to you soon."
              : submitStatus === "error"
              ? "There was an error submitting your message. Please try again."
              : ""}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]" noValidate>
            {/* Honeypot: hidden in a way that avoids AT/keyboard */}
            <div hidden>
              <label htmlFor={`hp-${reactId}`}>Do not fill this out</label>
              <input
                id={`hp-${reactId}`}
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            {/* Error summary with links */}
            {errorSummaryItems.length > 0 && submitStatus !== "success" && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                aria-labelledby={`${ids.errorSummary}-title`}
                className="border border-[#ec221f]/30 bg-white rounded-[12px] p-[16px]"
              >
                <p
                  id={`${ids.errorSummary}-title`}
                  className="font-['Poppins',sans-serif] text-[16px] leading-[24px] text-[#171617] mb-[8px]"
                >
                  Please correct the following:
                </p>

                <ul className="list-disc pl-[20px] space-y-[6px]">
                  {errorSummaryItems.map((item) => (
                    <li
                      key={item.field}
                      className="font-['Poppins',sans-serif] text-[14px] text-[#171617]"
                    >
                      <a
                        href={`#${item.targetId}`}
                        className="underline focus:outline-none focus:ring-2 focus:ring-[#e3ffa6] rounded-[6px]"
                        onClick={(ev) => {
                          ev.preventDefault();
                          const el = document.getElementById(item.targetId);
                          if (el instanceof HTMLElement) el.focus();
                        }}
                      >
                        {item.label}:
                      </a>{" "}
                      <span className="text-[#ec221f]">{item.message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Row 1: Name and Email */}
            <div className="flex gap-[32px]">
              <div className="flex-1">
                <label htmlFor={ids.name} className="flex gap-[2px] items-start mb-[6px]">
                  <span className="font-['Poppins',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                    Name
                  </span>
                  <span className="font-['Poppins',sans-serif] font-medium text-[14px] leading-[20px] text-[#ec221f]">
                    *
                  </span>
                </label>
                <input
                  ref={firstFieldRef}
                  id={ids.name}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                  className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[10px] font-['Poppins',sans-serif] text-[16px] leading-[24.8px] text-[#171617] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6] disabled:opacity-60"
                />
                {errors.name && (
                  <p id={`${ids.name}-error`} className="mt-[4px] text-[12px] text-[#ec221f]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor={ids.email} className="flex gap-[2px] items-start mb-[6px]">
                  <span className="font-['Poppins',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                    Email
                  </span>
                  <span className="font-['Poppins',sans-serif] font-medium text-[14px] leading-[20px] text-[#ec221f]">
                    *
                  </span>
                </label>
                <input
                  id={ids.email}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${ids.email}-error` : undefined}
                  className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[10px] font-['Poppins',sans-serif] text-[16px] leading-[24.8px] text-[#171617] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6] disabled:opacity-60"
                />
                {errors.email && (
                  <p id={`${ids.email}-error`} className="mt-[4px] text-[12px] text-[#ec221f]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Organisation and Reason */}
            <div className="flex gap-[32px]">
              <div className="flex-1">
                <label
                  htmlFor={ids.organisation}
                  className="flex gap-[2px] items-start mb-[6px]"
                >
                  <span className="font-['Poppins',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                    Organisation
                  </span>
                </label>
                <input
                  id={ids.organisation}
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  autoComplete="organization"
                  className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[10px] font-['Poppins',sans-serif] text-[16px] leading-[24.8px] text-[#171617] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6] disabled:opacity-60"
                />
              </div>

              <div className="flex-1">
                <label htmlFor={ids.reason} className="flex gap-[2px] items-center mb-[6px]">
                  <span className="font-['Poppins',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                    Reason for Contact
                  </span>
                  <span className="font-['Poppins',sans-serif] font-medium text-[14px] leading-[20px] text-[#ec221f]">
                    *
                  </span>
                </label>
                <div className="relative">
                  <select
                    id={ids.reason}
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.reason)}
                    aria-describedby={errors.reason ? `${ids.reason}-error` : undefined}
                    className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[10px] font-['Poppins',sans-serif] text-[16px] leading-[24.8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6] appearance-none pr-[40px] disabled:opacity-60"
                    style={{ color: formData.reason ? "#171617" : "#717680" }}
                  >
                    <option value="">Select reason</option>
                    <option value="Hiring Opportunity">Hiring Opportunity</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="#A4A7AE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {errors.reason && (
                  <p id={`${ids.reason}-error`} className="mt-[4px] text-[12px] text-[#ec221f]">
                    {errors.reason}
                  </p>
                )}
              </div>
            </div>

            {/* Row 3: Message */}
            <div>
              <label htmlFor={ids.message} className="flex gap-[2px] items-center mb-[6px]">
                <span className="font-['Poppins',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                  Message
                </span>
                <span className="font-['Poppins',sans-serif] font-semibold text-[14px] leading-[20px] text-[#ec221f]">
                  *
                </span>
              </label>
              <textarea
                id={ids.message}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${ids.message}-error` : undefined}
                className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[12px] font-['Poppins',sans-serif] text-[16px] leading-[24.8px] text-[#171617] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6] resize-y disabled:opacity-60"
              />
              {errors.message && (
                <p id={`${ids.message}-error`} className="mt-[4px] text-[12px] text-[#ec221f]">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#e3ffa6] rounded-[8px] px-[16px] py-[10px] font-['Poppins',sans-serif] text-[16px] leading-[19.2px] tracking-[0.48px] text-[#171617] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05),0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#171617]/30"
              disabled={isSubmitting}
              aria-describedby={ids.status}
            >
              {isSubmitting ? "Submitting..." : "Send Message"}
            </button>

            {/* Visible Submit Status */}
            {submitStatus === "success" && (
              <p
                ref={successMessageRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="mt-[10px] text-[16px] text-[#4CAF50]"
              >
                Thank you for your message! I&apos;ll get back to you soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p role="alert" className="mt-[10px] text-[16px] text-[#ec221f]">
                There was an error submitting your message. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-[52px] pb-[50px]">
        <p className="font-['Poppins',sans-serif] text-[14px] leading-[21.7px] text-[#171617]">
          ©️ Barry Conlon 2025.
        </p>
      </footer>
    </div>
  );
}
