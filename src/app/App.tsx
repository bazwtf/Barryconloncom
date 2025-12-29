import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-9zz4bups76";
import imgBarryHeadshots from "@/assets/f38794277b68282e48c0f1fa2968cb07117406c5.png";

// Google Apps Script endpoint
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxA6wHt7SLhXtIsU-tkC7uyo7_WfUNiJt3i1kM9CYEsyQRcRtzaD92LGgDco2tIC2q2pQ/exec";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    reason: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.reason) {
      newErrors.reason = "Please select a reason for contact";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitStatus('success');
          // Reset form
          setFormData({
            name: "",
            email: "",
            organisation: "",
            reason: "",
            message: "",
          });
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#e3dfed] min-h-screen relative" style={{
      backgroundImage: `radial-gradient(circle, rgba(23, 22, 23, 0.15) 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    }}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#e3dfed]/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`} style={{
        backgroundImage: `radial-gradient(circle, rgba(23, 22, 23, 0.15) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}>
        <div className={`max-w-[1200px] mx-auto px-[52px] flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-[23.5px]' : 'py-[47px]'}`}>
          {/* Logo */}
          <div className={`transition-all duration-300 ${isScrolled ? 'h-[56.55px] w-[50.7px]' : 'h-[87px] w-[78px]'}`}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 87">
              <path d={svgPaths.p2889000} fill="#171617" />
            </svg>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-[24px]">
            <a
              href="https://drive.google.com/file/d/1hX3MTiuYAtmoNTTxzIND9REDPMAwJ_4Z/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Rubik:Medium',sans-serif] font-medium text-[#171617] text-[20px] uppercase transition-opacity hover:opacity-70"
            >
              Resume
            </a>
            <button
              onClick={scrollToContact}
              className="bg-[#e3ffa6] px-[20px] py-[12px] rounded-[12px] font-['Rubik:Medium',sans-serif] font-medium text-[#171617] text-[20px] uppercase transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Contact me
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-[52px] pt-[240px] pb-[100px]">
        <div className="flex gap-[60px] items-center">
          {/* Left Column - Content */}
          <div className="flex-1">
            <h1 className="font-['Rubik:Bold',sans-serif] font-bold text-[56px] leading-[61.6px] tracking-[-1.12px] text-[#171617] mb-[24px] max-w-[630px]">
              Product Designer Who Simplifies the Complex
            </h1>
            
            <p className="font-['Poppins:Regular',sans-serif] text-[20px] leading-[30px] text-[#171617] mb-[36px] max-w-[611px]">
              Building accessible, user-centred products by connecting design, engineering, and business around what matters.
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-[18px] max-w-[611px]">
              {[
                "A11y Consultant",
                "Agile Methodologies",
                "Prototyping",
                "UI Design",
                "UX Design",
                "UX Research",
                "Workshop Facilitation",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-[#e3ffa6] px-[12px] py-[12px] rounded-[12px]"
                >
                  <p className="font-['Poppins:Medium',sans-serif] text-[16px] leading-[19.748px] tracking-[0.48px] text-[#171617] whitespace-nowrap">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Headshot */}
          <div className="w-[419px] h-[539px] rounded-[16px] overflow-hidden shrink-0">
            <img
              src={imgBarryHeadshots}
              alt="Barry Conlon - Product Designer"
              className="w-full h-[116.56%] object-cover object-center translate-y-[0] rounded-[16px]"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="max-w-[1200px] mx-auto px-[52px] pb-[100px]">
        <div className="bg-[#f2edff] rounded-[16px] px-[200px] py-[100px]">
          <h2 className="font-['Rubik:Bold',sans-serif] font-bold text-[45px] leading-[51.75px] tracking-[-0.9px] text-[#171617] text-center mb-[25px]">
            Let's Work Together
          </h2>
          
          <p className="font-['Poppins:Regular',sans-serif] text-[20px] leading-[30px] text-[#171617] mb-[25px]">
            If you're hiring, exploring a collaboration, or have a project in mind, I'd love to hear from you. Send a message and I'll respond as soon as possible.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
            {/* Row 1: Name and Email */}
            <div className="flex gap-[32px]">
              <div className="flex-1">
                <label className="flex gap-[2px] items-start mb-[6px]">
                  <span className="font-['Poppins:Regular',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                    Name
                  </span>
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#ec221f]">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[10px] font-['Poppins:Regular',sans-serif] text-[16px] leading-[24.8px] text-[#171617] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6]"
                  placeholder=""
                />
                {errors.name && (
                  <p className="mt-[4px] text-[12px] text-[#ec221f]">{errors.name}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="flex gap-[2px] items-start mb-[6px]">
                  <span className="font-['Poppins:Regular',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                    Email
                  </span>
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#ec221f]">
                    *
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[10px] font-['Poppins:Regular',sans-serif] text-[16px] leading-[24.8px] text-[#171617] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6]"
                  placeholder=""
                />
                {errors.email && (
                  <p className="mt-[4px] text-[12px] text-[#ec221f]">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Row 2: Organisation and Reason for Contact */}
            <div className="flex gap-[32px]">
              <div className="flex-1">
                <label className="flex gap-[2px] items-start mb-[6px]">
                  <span className="font-['Poppins:Regular',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                    Organisation
                  </span>
                </label>
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[10px] font-['Poppins:Regular',sans-serif] text-[16px] leading-[24.8px] text-[#171617] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6]"
                  placeholder=" "
                />
              </div>

              <div className="flex-1">
                <label className="flex gap-[2px] items-center mb-[6px]">
                  <span className="font-['Poppins:Regular',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                    Reason for Contact
                  </span>
                  <span className="font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[20px] text-[#ec221f]">
                    *
                  </span>
                </label>
                <div className="relative">
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[10px] font-['Poppins:Regular',sans-serif] text-[16px] leading-[24.8px] text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6] appearance-none pr-[40px]"
                  >
                    <option value="">Select reason</option>
                    <option value="hiring">Hiring Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="project">Project Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                  <p className="mt-[4px] text-[12px] text-[#ec221f]">{errors.reason}</p>
                )}
              </div>
            </div>

            {/* Row 3: Message */}
            <div>
              <label className="flex gap-[2px] items-center mb-[6px]">
                <span className="font-['Poppins:Regular',sans-serif] text-[14px] leading-[21.7px] text-[#414651]">
                  Message
                </span>
                <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[20px] text-[#ec221f]">
                  *
                </span>
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full bg-white border border-[#d5d7da] rounded-[8px] px-[14px] py-[12px] font-['Poppins:Regular',sans-serif] text-[16px] leading-[24.8px] text-[#171617] placeholder:text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus:outline-none focus:ring-2 focus:ring-[#e3ffa6] resize-y"
                  placeholder=" "
                />
              
              </div>
              {errors.message && (
                <p className="mt-[4px] text-[12px] text-[#ec221f]">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#e3ffa6] rounded-[8px] px-[16px] py-[10px] font-['Poppins:Medium',sans-serif] text-[16px] leading-[19.2px] tracking-[0.48px] text-[#171617] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05),0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <p className="mt-[10px] text-[16px] text-[#4CAF50]">Thank you for your message! I'll get back to you soon.</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-[10px] text-[16px] text-[#ec221f]">There was an error submitting your message. Please try again.</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1200px] mx-auto px-[52px] pb-[50px]">
        <p className="font-['Poppins:Regular',sans-serif] text-[14px] leading-[21.7px] text-[#171617]">
          ©️ Barry Conlon 2025.
        </p>
      </div>
    </div>
  );
}