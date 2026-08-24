import * as React from "react";
import { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useReducedMotion,
  MotionValue
} from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CurveDivider } from "@/components/shared/CurveDivider";
import { programJourney } from "@/data/content";
import { cn } from "@/lib/utils";

export function ProgramJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.55"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26
  });

  return (
    <>
      <CurveDivider fill="base" flip />
      <SectionWrapper id="journey" bg="base" labelledBy="journey-heading">
        {/* Decorative Dot Grid */}
        <div 
          className="absolute inset-0 h-[35%] w-full opacity-5 pointer-events-none" 
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle, var(--primary) 3px, transparent 3px)`,
            backgroundSize: '26px 26px',
            maskImage: 'linear-gradient(to bottom, black, transparent)'
          }}
        />

        <div className="mb-16 lg:mb-12 relative z-10">
          <SectionHeading
            align="center"
            eyebrow="THE PROGRAM JOURNEY"
            title="What the first six months actually *look like*."
            subtitle="This is the shape of a typical program. Yours will move faster or slower depending on what we find — but nothing here is skipped."
          />
        </div>

        <div ref={containerRef} className="relative max-w-[860px] mx-auto mt-16 lg:mt-[72px]">
          {/* Timeline Spine */}
          <div className="absolute left-[22px] sm:left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2 aria-hidden">
            {!isReducedMotion && (
              <motion.div 
                className="absolute inset-0 bg-primary origin-top"
                style={{ scaleY }}
              />
            )}
            {isReducedMotion && <div className="absolute inset-0 bg-primary" />}
          </div>

          {/* Phases */}
          <ol className="relative flex flex-col gap-11 md:gap-14 p-0 m-0 list-none">
            {programJourney.map((phase, idx) => (
              <TimelineEntry 
                key={idx} 
                phase={phase} 
                index={idx} 
                scrollYProgress={scrollYProgress}
              />
            ))}
          </ol>

          {/* Closing CTA */}
          <div className="mt-16 lg:mt-[64px] text-center relative z-10">
            <h4 className="font-fraunces font-medium text-[clamp(1.0625rem,1.6vw,1.25rem)] text-text mb-4.5">
              Phase zero takes about ten minutes.
            </h4>
            <a 
              href="/assessment"
              className="h-[54px] px-8 rounded-full bg-accent text-white font-semibold text-[15px] inline-flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(201,123,74,0.3)] hover:shadow-[0_12px_24px_rgba(201,123,74,0.4)]"
            >
              Begin My Assessment →
            </a>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

function TimelineEntry({ 
  phase, 
  index, 
  scrollYProgress 
}: { 
  phase: any; 
  index: number; 
  scrollYProgress: MotionValue<number> 
}) {
  const isReducedMotion = useReducedMotion();
  const isEven = index % 2 === 1;
  
  // Activation thresholds
  const thresholds = [0.10, 0.30, 0.50, 0.70, 0.90];
  const threshold = thresholds[index] ?? 0.10;
  
  // Transform activation
  const activation = useTransform(scrollYProgress, [threshold - 0.05, threshold], [0, 1]);
  const opacity = useTransform(scrollYProgress, [threshold - 0.05, threshold], [0.4, 1]);
  const translateY = useTransform(scrollYProgress, [threshold - 0.05, threshold], [14, 0]);

  return (
    <li className={cn(
      "relative grid grid-cols-1 md:grid-cols-2 items-center",
      isEven ? "md:text-left" : "md:text-right"
    )}>
      {/* Content Block */}
      <div className={cn(
        "md:w-full",
        isEven ? "md:order-2 md:pl-14" : "md:order-1 md:pr-14",
        "pl-[60px] sm:pl-[52px] md:pl-0"
      )}>
        <motion.div 
          style={{ 
            opacity: isReducedMotion ? 1 : opacity, 
            y: isReducedMotion ? 0 : translateY 
          }}
          className="group bg-surface border border-border rounded-[22px] p-[22px_20px] sm:p-[26px_24px] transition-all duration-300 hover:border-primary/30 hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(31,77,61,0.08)]"
        >
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-accent block mb-2.5">
            {phase.phase}
          </span>
          <h3 className="font-fraunces font-medium text-[clamp(1.0625rem,1.6vw,1.25rem)] text-text mb-2.5">
            {phase.title}
          </h3>
          <p className="text-[14.5px] leading-[1.68] text-text-muted">
            {phase.description}
          </p>
          
          {phase.chips && (
            <div className={cn(
              "flex flex-wrap gap-2 mt-4",
              !isEven && "md:justify-end"
            )}>
              {phase.chips.map((chip: string, i: number) => (
                <span 
                  key={i} 
                  className="text-[12px] font-medium text-text-muted bg-surface-alt border border-border px-[11px] py-[5px] rounded-full"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Node */}
      <div className="absolute left-[22px] sm:left-[18px] md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-10">
        <Node index={index} activation={activation} />
      </div>

      {/* Empty side for MD+ */}
      <div className={cn("hidden md:block", isEven ? "order-1" : "order-2")} />
    </li>
  );
}

function Node({ index, activation }: { index: number; activation: MotionValue<number> }) {
  const isReducedMotion = useReducedMotion();
  
  // Use springs for smooth node activation
  const activeSpring = useSpring(activation, { stiffness: 320, damping: 20 });
  
  const backgroundColor = useTransform(activeSpring, [0, 1], ["rgba(255, 255, 255, 1)", "rgba(31, 77, 61, 1)"]);
  const borderColor = useTransform(activeSpring, [0, 1], ["rgba(226, 232, 240, 1)", "rgba(31, 77, 61, 1)"]);
  const textColor = useTransform(activeSpring, [0, 1], ["rgba(31, 77, 61, 1)", "rgba(255, 255, 255, 1)"]);
  const boxShadow = useTransform(activeSpring, [0, 1], ["0 0 0 0px rgba(31, 77, 61, 0)", "0 0 0 8px rgba(31, 77, 61, 0.08)"]);

  return (
    <motion.div 
      className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full border-2 flex items-center justify-center font-fraunces font-medium text-[17px] relative"
      style={{
        backgroundColor: isReducedMotion ? "rgba(31, 77, 61, 1)" : backgroundColor,
        borderColor: isReducedMotion ? "rgba(31, 77, 61, 1)" : borderColor,
        color: isReducedMotion ? "#FFFFFF" : textColor,
        boxShadow: isReducedMotion ? "none" : boxShadow
      }}
    >
      {index + 1}
    </motion.div>
  );
}
