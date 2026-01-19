import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import svgPaths from "../imports/svg-9zz4bups76";
import imgBarryHeadshots from "@/assets/f38794277b68282e48c0f1fa2968cb07117406c5.png";
import BrandLogoContainer from "@/app/components/BrandLogoContainer";
import ContactForm from "@/app/components/ContactForm";
import TestimonialsSection from "@/app/components/TestimonialsSection";

/* --------------------------------- utils --------------------------------- */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------ style tokens ------------------------------ */

const DOT_BG_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle, rgba(23, 22, 23, 0.15) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const FONT_RUBIK = "font-['Rubik',sans-serif]";
const FONT_POPPINS = "font-['Poppins',sans-serif]";

const CONTAINER = "max-w-[1200px] mx-auto";
const CONTAINER_X_NAV = "px-[20px] sm:px-[52px]";
const CONTAINER_X_PAGE = "px-[20px] min-[600px]:px-[52px]";

const FOCUS_RING = cn(
  "focus:outline-none",
  "focus-visible:ring-2 focus-visible:ring-[#e3ffa6]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#e3dfed]"
);

const FOCUS_RING_DARK = cn(
  "focus:outline-none",
  "focus-visible:ring-2 focus-visible:ring-[#171617]/40",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#e3dfed]"
);

const NAV_LINK = cn(
  FONT_RUBIK,
  "font-medium text-[#171617] uppercase transition-opacity hover:opacity-70",
  "rounded-[8px]",
  FOCUS_RING
);

/* ------------------------------- primitives ------------------------------- */

function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn(CONTAINER, className)}>{children}</div>;
}

function NavLink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(NAV_LINK, className)} {...props} />;
}

const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function IconButton({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center",
        "h-[44px] w-[44px]",
        "rounded-[12px]",
        FOCUS_RING_DARK,
        className
      )}
      {...props}
    />
  );
});


/* ---------------------------------- App ---------------------------------- */

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  const reactId = useId();
  const contactHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const contactHeadingId = useMemo(() => `contact-heading-${reactId}`, [reactId]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    contactSection?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    // After scrolling, move focus to heading or first field for keyboard users.
    window.setTimeout(() => {
      (contactHeadingRef.current ?? firstFieldRef.current)?.focus();
    }, 350);
  };

  return (
    <div className="bg-[#e3dfed] min-h-screen relative" style={DOT_BG_STYLE}>
      {/* Skip Link */}
      <a
        href="#main"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:top-[12px] focus:left-[12px] z-[100]",
          "bg-white text-[#171617] px-[12px] py-[10px] shadow-md rounded-[8px]",
          FOCUS_RING
        )}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        className={cn(
          "main-navigation fixed top-0 left-0 right-0 z-50",
          "bg-[#e3dfed]/95 backdrop-blur-sm transition-all duration-300",
          isScrolled && "shadow-md"
        )}
        style={DOT_BG_STYLE}
        aria-label="Primary"
      >
        <Container
          className={cn(
            CONTAINER_X_NAV,
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "py-[18px] sm:py-[23.5px]" : "py-[22px] sm:py-[47px]"
          )}
        >
          {/* Logo */}
          <div
            className={cn(
              "transition-all duration-300",
              isScrolled
                ? "h-[44px] w-[40px] sm:h-[56.55px] sm:w-[50.7px]"
                : "h-[52px] w-[46px] sm:h-[87px] sm:w-[78px]"
            )}
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
          <div className="hidden sm:flex items-center gap-[24px] text-[20px]">
            <NavLink
              href="https://drive.google.com/file/d/1hX3MTiuYAtmoNTTxzIND9REDPMAwJ_4Z/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:font-semibold"
            >
              Resume
            </NavLink>

            <button
              type="button"
              onClick={() => {
                scrollToContact();
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "bg-[#e3ffa6] px-[20px] py-[12px] rounded-[12px]",
                FONT_RUBIK,
                "font-medium text-[#171617] text-[20px] uppercase",
                "transition-transform hover:scale-105 active:scale-95 cursor-pointer hover:font-semibold",
                "hover:bg-[#B2DB00]",
                FOCUS_RING_DARK
              )}
            >
              Contact me
            </button>
          </div>

          {/* Mobile menu button */}
          <IconButton
            ref={mobileMenuButtonRef}
            type="button"
            className="sm:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
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
          </IconButton>
        </Container>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div className="sm:hidden fixed inset-0 z-50" role="presentation" aria-hidden="true">
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
            className="absolute top-[16px] right-[16px] w-[86%] max-w-[360px] bg-[#E2D6FF] shadow-xl rounded-[16px] p-[20px] flex flex-col gap-[16px]"
            >
              <div className="flex items-center justify-between">
                <span className={cn(FONT_RUBIK, "font-bold text-[#171617] text-[16px] uppercase")}>
                  Menu
                </span>
                <IconButton
                  type="button"
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
                </IconButton>
              </div>

              <NavLink
                href="https://drive.google.com/file/d/1hX3MTiuYAtmoNTTxzIND9REDPMAwJ_4Z/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  FONT_RUBIK,
                  "font-medium text-[#171617] text-[20px] uppercase text-center",
                  "px-[12px] py-[12px] bg-white/60 rounded-[12px]",
                  "hover:underline hover:font-semibold",
                  FOCUS_RING
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  scrollToContact();
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "bg-[#e3ffa6] px-[12px] py-[12px] rounded-[12px]",
                  FONT_RUBIK,
                  "font-medium text-[#171617] text-[20px] uppercase text-center",
                  "transition-transform active:scale-95 cursor-pointer hover:font-semibold",
                  "hover:bg-[#B2DB00]",
                  FOCUS_RING_DARK
                )}
              >
                Contact me
              </button>

              <div className="mt-auto text-[12px] text-[#171617]/70">Press Escape to close.</div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main
        id="main"
        tabIndex={-1}
        className={cn(
          "hero",
          CONTAINER,
          CONTAINER_X_PAGE,
          "pt-[140px] min-[600px]:pt-[240px] pb-[60px] min-[600px]:pb-[100px] mb-[100px]"
        )}
      >
        <div className="flex items-center gap-[60px] max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-[24px]">
          {/* Left Column */}
          <div className="flex-1">
            <h1
              className={cn(
                FONT_RUBIK,
                "font-bold text-[#171617] max-w-[630px]",
                "min-[600px]:text-[56px] min-[600px]:leading-[61.6px] min-[600px]:tracking-[-1.12px] min-[600px]:mb-[24px]",
                "max-[599px]:text-[36px] max-[599px]:leading-[42px] max-[599px]:tracking-[-0.72px] max-[599px]:mb-[16px]"
              )}
            >
              Product Designer Who Simplifies the Complex
            </h1>

            <p
              className={cn(
                FONT_POPPINS,
                "text-[20px] leading-[30px] text-[#171617]",
                "mb-[36px] max-w-[611px]"
              )}
            >
              Building accessible, user-centred products by connecting design,
              engineering, and business around what matters.
            </p>

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
                <li key={skill} className="bg-[#e3ffa6] px-[12px] py-[12px] rounded-[12px]">
                  <span
                    className={cn(
                      FONT_POPPINS,
                      "text-[16px] leading-[19.748px] tracking-[0.48px] text-[#171617] whitespace-nowrap"
                    )}
                  >
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Headshot */}
          <div className="w-[419px] h-[539px] rounded-[16px] overflow-hidden shrink-0 max-[600px]:w-full max-[600px]:h-auto">
            <img
              src={imgBarryHeadshots}
              alt="Barry Conlon - Product Designer"
              className="w-full h-full object-cover object-center rounded-[16px] max-[600px]:aspect-[4/5]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </main>

      <BrandLogoContainer />

      <TestimonialsSection />

      <ContactForm
        headingId={contactHeadingId}
        headingRef={contactHeadingRef}
        firstFieldRef={firstFieldRef}
        idPrefix={reactId}
      />

      {/* Footer */}
      <footer className={cn(CONTAINER, CONTAINER_X_PAGE, "pb-[50px]")}>
        <p className={cn(FONT_POPPINS, "text-[14px] leading-[21.7px] text-[#171617]")}>
          ©️ Barry Conlon 2025.
        </p>
      </footer>
    </div>
  );
}
