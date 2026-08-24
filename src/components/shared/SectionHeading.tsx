import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "onDark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isOnDark = tone === "onDark";

  // Handle *word* syntax for italics + accent color
  const renderTitle = (text: string) => {
    const parts = text.split(/(\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={i} className="italic text-accent">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Reveal
      className={cn(
        "flex flex-col mb-12 md:mb-[48px]",
        isCenter ? "items-center text-center mx-auto max-w-[720px]" : "items-start text-left",
        className
      )}
    >
      <div className="flex items-center gap-[5px] mb-5 px-[14px] py-[6px] bg-primary-soft rounded-pill inline-flex">
        <span className="w-[5px] h-[5px] bg-accent rounded-full" />
        <span className="fs-eyebrow text-primary">{eyebrow}</span>
      </div>

      <h2 className={cn("fs-h2 mb-5", isOnDark ? "text-white" : "text-text")}>
        {renderTitle(title)}
      </h2>

      {subtitle && (
        <p className={cn("fs-sub max-w-[620px]", isOnDark ? "text-white/80" : "text-text-muted")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
