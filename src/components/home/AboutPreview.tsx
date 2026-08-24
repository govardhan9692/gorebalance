import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Award, Star, MapPin, ArrowRight, Quote } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/shared/CountUp";
import { CurveDivider } from "@/components/shared/CurveDivider";
import { stats, brand, locations } from "@/data/content";
import { cn } from "@/lib/utils";
import practitionerPortrait from "@/assets/sai-sowjanya.jpg.asset.json";

export function AboutPreview() {
  const containerRef = React.useRef(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-3, -1.5]);
  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const locationString = locations.map(l => l.label).join(" · ");

  return (
    <>
      <CurveDivider fill="alt" />
      <SectionWrapper id="about" bg="alt" labelledBy="about-heading" className="overflow-visible">
        {/* Decorative Glow */}
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[140px] pointer-events-none -z-10 -translate-x-1/4 translate-y-1/4" 
          aria-hidden="true"
        />

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-[48px] md:gap-[56px] lg:gap-[80px] xl:gap-[96px] items-center">
          
          {/* Left Column: Portrait Composition */}
          <Reveal className="relative w-full max-w-[480px] lg:max-w-none mx-auto">
            <div className="relative aspect-[4/5] w-full max-w-[460px] mx-auto">
              
              {/* Layer 1: Back Accent Block */}
              <motion.div 
                style={{ rotate: shouldReduceMotion ? -3 : rotate }}
                className="absolute inset-[-24px_-24px_24px_24px] bg-primary-soft rounded-[28px] -z-20"
                aria-hidden="true"
              />

              {/* Layer 3: Dot Grid */}
              <div 
                className="absolute -top-5 -left-5 z-[-15] opacity-30 text-accent"
                aria-hidden="true"
              >
                <svg width="70" height="70" viewBox="0 0 70 70" fill="currentColor">
                  {[...Array(5)].map((_, r) => 
                    [...Array(5)].map((_, c) => (
                      <circle key={`${r}-${c}`} cx={4 + c * 14} cy={4 + r * 14} r="2" />
                    ))
                  )}
                </svg>
              </div>

              {/* Layer 2: The Photo */}
              <div className="relative h-full w-full rounded-[28px] overflow-hidden border border-border z-0">
                <motion.img 
                  style={{ y: shouldReduceMotion ? 0 : imageY, scale: shouldReduceMotion ? 1 : 1.08 }}
                  src={practitionerPortrait.url} 
                  alt="Dt. N. Sai Sowjanya, clinical nutritionist and gut health specialist"
                  className="h-full w-full object-cover object-[center_top]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1512]/28 to-transparent pointer-events-none" />
              </div>

              {/* Layer 4: Floating Credential Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.35 }}
                className={cn(
                  "absolute z-10 p-[18px_22px] rounded-[20px] border glass shadow-[0_16px_40px_rgba(27,36,32,0.12)] bg-surface/88 backdrop-blur-[16px]",
                  "bottom-[-20px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] md:w-auto md:bottom-[-28px] md:left-[-28px] md:translate-x-0"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Award size={20} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-600 text-text leading-tight">8+ Years · 500+ Clients</span>
                    <span className="text-[13px] text-text-muted">Rebalanced from the root</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Right Column: Content */}
          <div className="flex flex-col">
            <Reveal delay={0.15}>
              <SectionHeading 
                eyebrow="MEET YOUR NUTRITIONIST"
                title="Care that begins with *listening*, not prescribing."
                align="left"
                className="mb-0 text-left"
              />
              
              <div className="mt-8 mb-6 p-6 bg-primary-soft/50 border-l-4 border-accent rounded-r-2xl italic text-primary/90 relative overflow-hidden group">
                <Quote size={40} className="absolute -right-2 -bottom-2 text-accent/10 rotate-12 transition-transform group-hover:scale-110" />
                <p className="fs-body font-fraunces text-lg leading-relaxed relative z-10">
                  "Nutrition isn't about restriction. It's about giving your body the right environment to heal itself."
                </p>
              </div>
            </Reveal>

            <div className="space-y-4 max-w-[62ch]">
              <Reveal delay={0.23} className="reveal-container">
                <p className="fs-body text-text-muted">
                  I'm Dt. N. Sai Sowjanya, a clinical nutritionist specialising in gut health, digestive disorders and hormonal balance. I consult from my clinics in Hyderabad, Telangana and Kakinada, Andhra Pradesh — and online with clients across India.
                </p>
              </Reveal>
              <Reveal delay={0.31} className="reveal-container">
                <p className="fs-body text-text-muted">
                  My approach is simple: <span className="text-text font-500 relative inline-block">
                    symptoms are messages, not problems to be silenced
                    <span className="absolute bottom-1 left-0 w-full h-0.5 bg-accent/30 translate-y-[4px]" />
                  </span>. Before I build a single meal plan, I want to understand your digestion, your sleep, your stress, your cycle and what your day actually looks like. That's where the real answers live.
                </p>
              </Reveal>
              <Reveal delay={0.39} className="reveal-container">
                <p className="fs-body text-text-muted">
                  Every plan I create is built around real Indian food — your kitchen, your family's meals, your schedule and your budget. No exotic ingredients, no crash diets, no protocols you'll abandon in three weeks.
                </p>
              </Reveal>
            </div>

            {/* Stats Row */}
            <Reveal delay={0.47} className="mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="fs-h2 text-primary leading-none">
                        {stat.label === "Client Rating" ? (
                          <div className="flex items-center gap-1.5">
                            <span>4.9</span>
                            <Star size={18} fill="currentColor" className="text-accent shrink-0" />
                          </div>
                        ) : (
                          <div className="flex items-baseline">
                            <CountUp value={Number(stat.value.replace(/\+/g, ''))} duration={1.6} />
                            {stat.value.includes('+') && <span>+</span>}
                          </div>
                        )}
                      </span>
                    </div>
                    <span className="text-[13px] text-text-muted tracking-[0.02em] mt-1.5 leading-tight">
                      {stat.label}
                    </span>
                    <span className="sr-only">
                      {stat.value} {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Signature + CTA */}
            <Reveal delay={0.55} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7 sm:gap-6">
              <div className="flex flex-col">
                <span className="font-fraunces italic text-[1.25rem] lg:text-[1.5rem] text-text leading-tight">
                  {brand.practitioner}
                </span>
                <span className="text-[13px] text-text-muted mt-1">
                  {brand.credential}
                </span>
                <div className="flex items-center gap-1.5 text-[13px] text-text-muted mt-1">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span>{locationString}</span>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = "/about"}
                className="group h-[52px] px-7 rounded-pill border-[1.5px] border-primary text-primary font-600 text-[15px] flex items-center gap-2 hover:bg-primary-soft hover:-translate-y-0.5 transition-all duration-300"
              >
                Read My Full Story
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}