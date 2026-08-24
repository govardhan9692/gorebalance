import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  bg?: "base" | "alt" | "surface";
  labelledBy?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  bg = "base",
  labelledBy,
  children,
  className,
}: SectionWrapperProps) {
  const bgClass = {
    base: "bg-bg",
    alt: "bg-surface-alt",
    surface: "bg-surface",
  }[bg];

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section-y relative overflow-hidden", bgClass, className)}
    >
      <div className="container-x relative z-10">
        {children}
      </div>
      
      {/* Global Grain Overlay within section if needed, or could be absolute fixed */}
      <div className="grain-overlay" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </section>
  );
}
