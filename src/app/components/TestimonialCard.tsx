import React from "react";
import { cn } from "@/app/components/ui/utils";
import { FONT_POPPINS, FONT_RUBIK } from "./sectionTokens";

export type TestimonialCardProps = {
  name: string;
  role: string;
  company: string;
  project: string;
  quote: string;
  imageUrl: string;
  onClick?: () => void;
  isInteractive?: boolean;
  truncateQuote?: boolean;
  outerPadding?: boolean;
};

export default function TestimonialCard({
  name,
  role,
  company,
  project,
  quote,
  imageUrl,
  onClick,
  isInteractive = false,
  truncateQuote = true,
  outerPadding = true,
}: TestimonialCardProps) {
  const cardClassName = cn(
    "flex h-full flex-col gap-6 rounded-[12px] bg-[var(--card-background)] p-8",
    "border border-[#e4e7ec]",
    FONT_POPPINS,
    isInteractive && "cursor-pointer"
  );

  return (
    <div className={cn("h-full testimonial-card", outerPadding && "px-4")}>
      <div
        className={cardClassName}
        onClick={onClick}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={
          isInteractive
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
      >
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-[#f2f4f7]">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(FONT_RUBIK, "font-medium text-[#171617] text-[18px] truncate")}>
              {name}
            </h3>
            <p className="text-sm text-[#5c6066] truncate">
              {role}, {company}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-[#6b7280]">{project}</p>
          <p
            className={cn(
              "text-[#2b2f33] leading-relaxed",
              truncateQuote && "line-clamp-10"
            )}
          >
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}
