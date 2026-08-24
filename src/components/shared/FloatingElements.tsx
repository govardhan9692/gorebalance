import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative bg-white dark:bg-surface-alt px-4 py-2 rounded-lg shadow-xl border border-border text-sm font-medium text-text mb-2"
        >
          Questions? We're here.
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1 -right-1 w-4 h-4 bg-text text-white rounded-full text-[10px] flex items-center justify-center"
          >
            ×
          </button>
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white dark:bg-surface-alt border-r border-b border-border rotate-45" />
        </motion.div>
      )}

      <motion.a
        href="https://wa.me/919390414536?text=Hi%20GoRebalance%2C%20I%27d%20like%20to%20know%20more%20about%20your%20gut%20health%20programs."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="relative flex items-center bg-primary text-white rounded-pill shadow-lg overflow-hidden group h-12 sm:h-14"
        initial={{ width: 48 }}
        animate={{ width: isExpanded ? "auto" : 48 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 relative">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="pr-6 font-semibold whitespace-nowrap text-sm sm:text-base"
            >
              Chat with us
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
}



export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest > 400);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-[80px] right-6 z-[60] w-12 h-12 sm:bottom-[96px] sm:right-8 sm:w-14 sm:h-14 flex items-center justify-center glass rounded-full shadow-lg text-primary group"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="289"
              style={{ pathLength: scrollYProgress }}
              className="opacity-20"
            />
          </svg>
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
