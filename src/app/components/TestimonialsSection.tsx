import React, { useEffect, useId, useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard, { type TestimonialCardProps } from "./TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cn } from "@/app/components/ui/utils";
import { CONTAINER, CONTAINER_X_PAGE, FONT_POPPINS, FONT_RUBIK } from "./sectionTokens";
import imgRobertP from "@/assets/images/testimonial photos/1705360118043.jpg";
import imgSanderD from "@/assets/images/testimonial photos/1584180422920.jpg";
import imgSharonC from "@/assets/images/testimonial photos/1739277139947.jpg";
import imgDaleM from "@/assets/images/testimonial photos/1742133263321.jpg";
import imgLiamL from "@/assets/images/testimonial photos/1516879954634.jpg";
import imgCameronC from "@/assets/images/testimonial photos/1689546648492.jpg";

const CONTROL_BUTTON_CLASS = cn(
  "group flex h-10 w-10 items-center justify-center rounded-full",
  "border border-[#d0d5dd] bg-[#e3ffa6] text-[#171617]",
  "transition-colors hover:bg-[#B2DB00] hover:text-[#171617]",
  "transition-transform hover:scale-105",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e3ffa6]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#e3dfed]"
);

const CLOSE_BUTTON_CLASS = cn(
  "mt-4 w-full rounded-[12px] bg-[#e3ffa6] px-4 py-3",
  FONT_RUBIK,
  "font-medium text-[#171617]",
  "transition-transform hover:scale-[1.02] active:scale-95 hover:bg-[#B2DB00]",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171617]/40",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
);

const SLIDER_SETTINGS = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  swipe: true,
  swipeToSlide: true,
  touchThreshold: 10,
  cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
} as const;

const DEFAULT_TESTIMONIALS: TestimonialCardProps[] = [
  {
    name: "Robert P.",
    role: "Principal Software Engineer",
    company: "DC Thomson",
    project: "Worked together on Digital Product Development",
    quote:
      "I worked with Barry for well over a decade at DC Thomson, in various product squads and departments throughout that time, and he always stood out as a deeply talented, reliable, supportive and empathetic presence in the team. His attention to detail is second to none, as is his conscientious and considered approach to everything he does. His commitment to the accessibility and equity of his design work is remarkable, and has left a lasting (and positive) mark on my own UI and UX design ethos. In addition to his design, UX and communication skills, Barry brings a genuine warmth, wit, and intelligence to any group that he finds himself in. He is a joy to work with, and has been a good friend to me over the years.",
    imageUrl: imgRobertP,
  },
  {
    name: "Sharon C.",
    role: "Senior Insight Manager",
    company: "DC Thomson",
    project: "Collaborated on energy sector product research",
    quote:
      "I've worked with Barry on multiple UX research projects over the years, and he's consistently impressive. He combines his design expertise with strong research skills, running user tests and turning insights into clear, concise reports. Collaborative, thoughtful, and results-drive, he's a huge asset to any team.",
    imageUrl: imgSharonC,
  },
  {
    name: "Sander D.",
    role: "Senior Engineer",
    company: "DC Thomson",
    project: "Worked together on Digital Product Development",
    quote:
      "Sometimes you need a strong UX to strengthen those user journeys and sometimes you need someone confident to bring a fresh perspective from the context of extensive experience. Barry is that person. Passionate about building the best experiences for the people using the products and with the skills to deliver them from start to finish. All around great guy and friend.",
    imageUrl: imgSanderD,
  },
  {
    name: "Dale M.",
    role: "Digital Content Creator",
    company: "DC Thomson",
    project: "Collaborated on relaunching the Energy Voice brand",
    quote:
      "Barry is rock solid: always keen to iterate and improve designs, be open and candid and just an overall pleasure to work alongside! A valuable asset to any product team and a warm, genuine colleague. \nI worked closely with Barry on the energy brands at DC Thomson, and we engaged in a collaborative process that elevated the brands, adapting to a breakneck pace of change while maintaining extremely polished products and user experience.",
    imageUrl: imgDaleM,
  },
  {
    name: "Liam L.",
    role: "Software Engineer",
    company: "DC Thomson",
    project: "Worked together in the Energy brands product squad",
    quote:
      "It goes without saying that Barry's skill as designer is exceptional. Nevertheless, that's easy to spot and his fantastic ability would be easy to identify from even a small sample of the work he has done and his portfolio. However what may be not be as visible from the outside, and what has proved invaluable as a software engineer while working alongside Barry, along with his amazing design work, is his ability to use his experience as a developer and expertise in User Experience to build solutions that not only perform highly from a conversion perspective and business use. But also, are formatted and delivered in a way that is clear for engineers on how to develop and build the product quickly and to a high level. Barry is one you can lean on and get advice from when developing all manners of products and will always give the feedback you need at all stages across a products life cycle. Literally the perfect colleague as a Designer. couldn't recommend more.",
    imageUrl: imgLiamL,
  },
  {
    name: "Cameron C.",
    role: "Principal DevSecOps Engineer",
    company: "DC Thomson",
    project: "Worked together on Digital Product Development",
    quote:
      "I had the pleasure of working alongside Barry in multidisciplinary squads during my time at DC Thomson. He is an extremely capable professional with excellent communication skills. Barry consistently translated complex concepts and solutions into clear, engaging presentations that were easy for the team to understand and apply. As a team player, Barry was both collaborative and proactive—regularly championing new initiatives and ensuring our products were usable and accessible for all customers. His contributions always strengthened the team and the outcomes of our work. Barry was an outstanding colleague, and I would gladly work with him again. I strongly recommend him for any role that calls for a personable, conscientious, and highly capable individual.",
    imageUrl: imgCameronC,
  },
];

export type TestimonialsSectionProps = {
  title?: string;
  description?: string;
  testimonials?: TestimonialCardProps[];
};

export default function TestimonialsSection({
  title = "Testimonials",
  description = "Feedback from people I've worked with.",
  testimonials = DEFAULT_TESTIMONIALS,
}: TestimonialsSectionProps) {
  const sliderRef = useRef<Slider>(null);
  const sliderId = useId();
  const [activeTestimonial, setActiveTestimonial] =
    useState<TestimonialCardProps | null>(null);

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const closeModal = () => {
    setActiveTestimonial(null);
  };

  useEffect(() => {
    if (!activeTestimonial) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeTestimonial]);

  return (
    <section
      id="testimonials"
      aria-labelledby={`${sliderId}-title`}
      className={cn(
        CONTAINER,
        CONTAINER_X_PAGE,
        "pb-[60px] min-[600px]:pb-[100px] mb-[100px]"
      )}
    >
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id={`${sliderId}-title`}
              className={cn(
                FONT_RUBIK,
                "font-bold text-[#171617]",
                "text-[32px] leading-[38px] tracking-[-0.64px] max-w-[768px]",
                "min-[600px]:text-[40px] min-[600px]:leading-[46px] min-[600px]:tracking-[-0.8px]"
              )}
            >
              {title}
            </h2>
            <p className={cn(FONT_POPPINS, "text-[#5c6066] text-[16px]")}>{description}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              className={CONTROL_BUTTON_CLASS}
              aria-controls={sliderId}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 stroke-[1.5] group-hover:stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={CONTROL_BUTTON_CLASS}
              aria-controls={sliderId}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 stroke-[1.5] group-hover:stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div
          id={sliderId}
          className="relative testimonials-slider"
          aria-live="polite"
          aria-roledescription="carousel"
        >
          <Slider ref={sliderRef} {...SLIDER_SETTINGS}>
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                {...testimonial}
                isInteractive
                onClick={() => setActiveTestimonial(testimonial)}
              />
            ))}
          </Slider>
        </div>
      </div>

      {activeTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/50 px-0 py-0 sm:items-center sm:px-4 sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonial from ${activeTestimonial.name}`}
          onClick={closeModal}
        >
          <div
            className="h-full w-full sm:h-auto sm:max-w-[720px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-full flex-col overflow-y-auto sm:h-auto sm:overflow-visible">
              <TestimonialCard
                {...activeTestimonial}
                truncateQuote={false}
                outerPadding={false}
              />
              <button
                type="button"
                onClick={closeModal}
                className={CLOSE_BUTTON_CLASS}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
