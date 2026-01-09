import React, { useMemo, useRef, useState } from "react";

// Google Apps Script endpoint
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxlQlDO3IzglbHL_gESH1uR3zUoY4wLcdcR7FyoRQtA9UbRRYRJR5vpit8Cs7MYYjloDA/exec";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const FONT_RUBIK = "font-['Rubik',sans-serif]";
const FONT_POPPINS = "font-['Poppins',sans-serif]";

const CONTAINER = "max-w-[1200px] mx-auto";
const CONTAINER_X_PAGE = "px-[20px] min-[600px]:px-[52px]";

const FOCUS_RING = cn(
  "focus:outline-none",
  "focus-visible:ring-2 focus-visible:ring-[#e3ffa6]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#e3dfed]"
);

const BTN_BASE = cn(
  "transition-transform active:scale-95 cursor-pointer",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);

const BTN_PRIMARY = cn(
  "bg-[#e3ffa6] text-[#171617]",
  "shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05),0px_1px_2px_0px_rgba(10,13,18,0.05)]",
  "hover:scale-[1.02]",
  BTN_BASE
);

const INPUT_BASE = cn(
  "w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px]",
  FONT_POPPINS,
  "text-[16px] leading-[24.8px] text-[#171617]",
  "shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]",
  "focus:outline-none focus:ring-2 focus:ring-[#e3ffa6]",
  "disabled:opacity-60"
);

const LABEL_TEXT = cn(
  FONT_POPPINS,
  "text-[14px] leading-[21.7px] text-[#414651]"
);

const REQUIRED_STAR = cn(
  FONT_POPPINS,
  "font-medium text-[14px] leading-[20px] text-[#ec221f]"
);

const ERROR_TEXT = cn("mt-[4px] text-[12px] text-[#ec221f]");

function PrimaryButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        BTN_PRIMARY,
        FONT_POPPINS,
        "rounded-[8px] px-[16px] py-[10px] text-[16px] leading-[19.2px] tracking-[0.48px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171617]/40",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[#e3dfed]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

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

type ContactFormFieldsProps = {
  endpointUrl?: string;
  /**
   * Optional: allow parent to focus the first field after scrolling.
   * If omitted, internal focus management still works on validation errors.
   */
  firstFieldRef?: React.RefObject<HTMLInputElement>;
  /**
   * Used to namespace IDs so multiple instances don't collide.
   */
  idPrefix: string;
};

function ContactFormFields({
  endpointUrl = GOOGLE_APPS_SCRIPT_URL,
  firstFieldRef,
  idPrefix,
}: ContactFormFieldsProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const internalFirstFieldRef = useRef<HTMLInputElement | null>(null);
  const effectiveFirstFieldRef = firstFieldRef ?? internalFirstFieldRef;

  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const successMessageRef = useRef<HTMLParagraphElement | null>(null);

  const ids = useMemo(() => {
    return {
      name: `name-${idPrefix}`,
      email: `email-${idPrefix}`,
      organisation: `organisation-${idPrefix}`,
      reason: `reason-${idPrefix}`,
      message: `message-${idPrefix}`,
      status: `form-status-${idPrefix}`,
      errorSummary: `error-summary-${idPrefix}`,
    };
  }, [idPrefix]);

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
          targetId: ids[field],
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
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
    <>
      {/* Screen-reader status region */}
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
        {/* Honeypot */}
        <div hidden>
          <label htmlFor={`hp-${idPrefix}`}>Do not fill this out</label>
          <input
            id={`hp-${idPrefix}`}
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleInputChange}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        {/* Error summary with links (label + message) */}
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
              className={cn(
                FONT_POPPINS,
                "text-[16px] leading-[24px] text-[#171617] mb-[8px]"
              )}
            >
              Please correct the following:
            </p>

            <ul className="list-disc pl-[20px] space-y-[6px]">
              {errorSummaryItems.map((item) => (
                <li
                  key={item.field}
                  className={cn(FONT_POPPINS, "text-[14px] text-[#171617]")}
                >
                  <a
                    href={`#${item.targetId}`}
                    className={cn("underline rounded-[6px]", FOCUS_RING)}
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

        {/* Row 1 */}
        <div className="flex gap-[32px] max-[600px]:flex-col max-[600px]:gap-[16px]">
          <div className="flex-1">
            <label htmlFor={ids.name} className="flex gap-[2px] items-start mb-[6px]">
              <span className={LABEL_TEXT}>Name</span>
              <span className={REQUIRED_STAR}>*</span>
            </label>
            <input
              ref={effectiveFirstFieldRef}
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
              className={cn(INPUT_BASE, "py-[10px]")}
            />
            {errors.name && (
              <p id={`${ids.name}-error`} className={ERROR_TEXT}>
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor={ids.email} className="flex gap-[2px] items-start mb-[6px]">
              <span className={LABEL_TEXT}>Email</span>
              <span className={REQUIRED_STAR}>*</span>
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
              className={cn(INPUT_BASE, "py-[10px]")}
            />
            {errors.email && (
              <p id={`${ids.email}-error`} className={ERROR_TEXT}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-[32px] max-[600px]:flex-col max-[600px]:gap-[16px]">
          <div className="flex-1">
            <label
              htmlFor={ids.organisation}
              className="flex gap-[2px] items-start mb-[6px]"
            >
              <span className={LABEL_TEXT}>Organisation</span>
            </label>
            <input
              id={ids.organisation}
              type="text"
              name="organisation"
              value={formData.organisation}
              onChange={handleInputChange}
              disabled={isSubmitting}
              autoComplete="organization"
              className={cn(INPUT_BASE, "py-[10px]")}
            />
          </div>

          <div className="flex-1">
            <label htmlFor={ids.reason} className="flex gap-[2px] items-center mb-[6px]">
              <span className={LABEL_TEXT}>Reason for Contact</span>
              <span className={REQUIRED_STAR}>*</span>
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
                className={cn(INPUT_BASE, "py-[10px] appearance-none pr-[40px]")}
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
              <p id={`${ids.reason}-error`} className={ERROR_TEXT}>
                {errors.reason}
              </p>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div>
          <label htmlFor={ids.message} className="flex gap-[2px] items-center mb-[6px]">
            <span className={LABEL_TEXT}>Message</span>
            <span className={cn(REQUIRED_STAR, "font-semibold")}>*</span>
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
            className={cn(INPUT_BASE, "py-[12px] resize-y")}
          />
          {errors.message && (
            <p id={`${ids.message}-error`} className={ERROR_TEXT}>
              {errors.message}
            </p>
          )}
        </div>

        <PrimaryButton type="submit" disabled={isSubmitting} aria-describedby={ids.status}>
          {isSubmitting ? "Submitting..." : "Send Message"}
        </PrimaryButton>

        {submitStatus === "success" && (
          <p
            ref={successMessageRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={cn("mt-[10px] text-[16px] text-[#4CAF50]", FONT_POPPINS)}
          >
            Thank you for your message! I&apos;ll get back to you soon.
          </p>
        )}
        {submitStatus === "error" && (
          <p
            role="alert"
            className={cn("mt-[10px] text-[16px] text-[#ec221f]", FONT_POPPINS)}
          >
            There was an error submitting your message. Please try again.
          </p>
        )}
      </form>
    </>
  );
}

type ContactFormProps = {
  headingId: string;
  headingRef?: React.RefObject<HTMLHeadingElement>;
  firstFieldRef?: React.RefObject<HTMLInputElement>;
  idPrefix: string;
};

export default function ContactForm({
  headingId,
  headingRef,
  firstFieldRef,
  idPrefix,
}: ContactFormProps) {
  return (
    <section
      id="contact"
      className={cn(CONTAINER, CONTAINER_X_PAGE, "pb-[60px] min-[600px]:pb-[100px]")}
    >
      <div className="bg-[#f2edff] rounded-[16px] px-[200px] py-[100px] max-[600px]:px-[40px] max-[600px]:py-[40px]">
        <h2
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
          className={cn(
            FONT_RUBIK,
            "font-bold text-[45px] leading-[51.75px] tracking-[-0.9px] text-[#171617]",
            "text-center mb-[25px]"
          )}
        >
          Let&apos;s Work Together
        </h2>

        <p
          className={cn(
            FONT_POPPINS,
            "text-[20px] leading-[30px] text-[#171617] mb-[25px]"
          )}
        >
          If you&apos;re hiring, exploring a collaboration, or have a project in
          mind, I&apos;d love to hear from you. Send a message and I&apos;ll respond as
          soon as possible.
        </p>

        <ContactFormFields idPrefix={idPrefix} firstFieldRef={firstFieldRef} />
      </div>
    </section>
  );
}
