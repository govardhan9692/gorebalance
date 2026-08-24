import * as React from "react";
import { ArrowRight, HelpCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { treatments } from "@/data/content";
import { cn } from "@/lib/utils";

export function TreatmentsPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper id="treatments" bg="alt" labelledBy="treatments-heading">
      {/* Decorative Glow */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10 translate-x-[-20%] translate-y-[-20%]" 
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 lg:mb-[72px]">
          <SectionHeading 
            align="left"
            eyebrow="WHAT WE TREAT"
            title="Programs built for *your* condition, not a category."
            subtitle="Every program starts from the same place — your gut — but no two plans look alike. Here's where most clients begin."
            className="mb-0 max-w-[700px]"
          />
          
          <a 
            href="/treatments" 
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:text-accent transition-colors duration-300 md:mb-1.5"
          >
            <span>View All Treatments</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-[5px]" />
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>
        </div>

        {/* Grid */}
        <div className="mb-6 overflow-hidden rounded-[20px] aspect-[3.4/1] min-h-[130px] max-h-[260px]">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1600" alt="Balanced Indian-inspired meal with colourful vegetables" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7 xl:gap-8 list-none p-0 m-0 items-stretch">
          <Reveal stagger={0.07} className="contents">
            {treatments.map((treatment) => (
              <li key={treatment.id} className="h-full">
                <TreatmentCard treatment={treatment} shouldReduceMotion={shouldReduceMotion} />
              </li>
            ))}
          </Reveal>
        </ul>

        {/* Bottom CTA Strip */}
        <Reveal delay={0.2}>
          <div className="mt-16 md:mt-[64px] bg-surface/70 backdrop-blur-[16px] border border-border rounded-[24px] p-7 md:p-[28px_36px] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 md:gap-6 text-center md:text-left flex-col md:flex-row">
              <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
                <HelpCircle size={22} className="text-primary" />
              </div>
              <div>
                <h4 className="font-fraunces font-medium text-[clamp(1.0625rem,1.6vw,1.25rem)] text-text leading-tight">
                  Not sure which program fits you?
                </h4>
                <p className="text-sm text-text-muted mt-1.5">
                  The assessment identifies your root cause and the right starting point.
                </p>
              </div>
            </div>
            
            <a 
              href="/assessment"
              className="group h-[52px] px-7 rounded-full bg-accent text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(201,123,74,0.15)] hover:shadow-[0_8px_30px_rgba(201,123,74,0.25)] hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto"
            >
              <span>Take the Assessment</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

function TreatmentCard({ treatment, shouldReduceMotion }: { treatment: any; shouldReduceMotion: boolean | null }) {
  const Icon = treatment.icon;

  return (
    <a 
      href={`/treatments/${treatment.slug}`}
      aria-label={`${treatment.title} — view program details`}
      className={cn(
        "group relative flex flex-col h-full bg-surface border border-border rounded-[24px] p-8 lg:p-[32px_28px] xl:p-[32px_28px] overflow-hidden transition-all duration-300",
        "hover:-translate-y-[6px] hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(31,77,61,0.1)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-[3px] focus-visible:rounded-[24px]"
      )}
    >
      {/* Top Accent Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-t-[24px]" 
        aria-hidden="true"
      />

      {/* Icon */}
      <div className="w-14 h-14 md:w-14 md:h-14 min-[480px]:w-[56px] min-[480px]:h-[56px] rounded-[16px] bg-primary-soft group-hover:bg-primary flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105">
        <Icon 
          size={24} 
          strokeWidth={1.75} 
          className="text-primary group-hover:text-white transition-all duration-300 group-hover:rotate-6" 
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="font-fraunces font-medium text-[clamp(1.125rem,1.5vw,1.375rem)] text-text group-hover:text-primary transition-colors duration-300 leading-tight mb-3">
        {treatment.title}
      </h3>

      {/* Description */}
      <p className="text-[15px] sm:text-sm min-[480px]:text-[15px] leading-relaxed text-text-muted mb-6 flex-grow">
        {treatment.description}
      </p>

      <div className="relative h-[34px] overflow-hidden">
        {/* Layer 1: Tags (Shown by default) */}
        <div 
          className={cn(
            "absolute inset-0 flex items-center gap-2 flex-nowrap overflow-hidden transition-all duration-300",
            !shouldReduceMotion && "group-hover:-translate-y-3",
            "group-hover:opacity-0 md:group-hover:opacity-0"
          )}
        >
          {treatment.tags.map((tag: string, i: number) => (
            <span 
              key={i} 
              className="text-[12px] font-medium text-text-muted/80 md:text-text-muted bg-surface-alt dark:bg-primary-soft border border-border px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Layer 2: Learn More (Shown on hover) */}
        <div 
          className={cn(
            "hidden md:flex absolute inset-0 items-center gap-2 text-[14px] font-semibold text-accent opacity-0 transition-all duration-300 delay-[40ms]",
            !shouldReduceMotion && "translate-y-3 group-hover:translate-y-0",
            "group-hover:opacity-100"
          )}
        >
          <span>Learn more</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </a>
  );
}