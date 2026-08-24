import { motion } from "framer-motion";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown } from "lucide-react";

const slides = [
  { image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2000", alt: "Fresh vegetables" },
  { image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000", alt: "Consultation" },
  { image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2000", alt: "Healthy lifestyle" },
  { image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000", alt: "Healthy food" },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center bg-bg">
      {/* Slideshow */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1.12 : 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
        </motion.div>
      ))}

      {/* Scrims */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-bg via-bg/10 to-transparent opacity-80 dark:opacity-100" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center lg:items-start text-center lg:text-left pt-24 pb-12 md:pt-20 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 max-w-full px-3 sm:px-4 py-2 rounded-pill bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-2 text-white/90 text-[10px] sm:text-[12px] font-semibold tracking-[0.12em] sm:tracking-[0.16em] uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
          <span className="truncate">GUT HEALTH & CLINICAL NUTRITION — HYDERABAD & KAKINADA</span>
        </motion.div>

        <h1 className="text-white max-w-[800px] mb-6 sm:mb-8 text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.02] sm:leading-[1.08]">
          {"Heal the gut. Rebalance the whole you.".split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-2 sm:mr-3 last:italic">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <p className="max-w-[560px] text-white/80 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed font-jakarta">
          Personalised, root-cause nutrition programs by Dt. N. Sai Sowjanya. We treat bloating, acidity, hormonal imbalance and low energy at the source — your gut — with science-backed plans built around your body, your food and your life.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => window.location.href = "/assessment"}
            className="px-8 sm:px-10 py-3.5 sm:py-4 bg-accent text-white rounded-pill font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Get My Gut Assessment →
          </button>
          <button 
            onClick={() => document.getElementById("symptoms")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-pill border border-white/20 font-semibold hover:bg-white/20 transition-all flex items-center justify-center"
          >
            See How It Works
          </button>
        </div>
        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center lg:justify-start gap-x-6 sm:gap-x-8 gap-y-3 text-white/70 text-[13px] sm:text-sm font-jakarta border-t border-white/10 pt-6 sm:pt-8 w-full max-w-[800px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Online & In-Clinic · Hyderabad & Kakinada
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            500+ Lives Rebalanced
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Root-Cause Protocols
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/40 cursor-pointer hover:text-white/70 transition-colors"
          onClick={() => document.getElementById("symptoms")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}