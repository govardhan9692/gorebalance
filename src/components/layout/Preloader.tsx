import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const tagline = "Gut Health · Nutrition · Balance";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ 
            clipPath: "inset(0% 0% 100% 0% round 0% 0% 40% 40%)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
        >
          <div className="flex flex-col items-center">
            <Logo className="mb-6 scale-125" />
            
            <div className="flex flex-col items-center gap-2">
              <div className="flex overflow-hidden">
                {"GoRebalance".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.03,
                      ease: "easeOut",
                    }}
                    className="font-fraunces text-3xl font-semibold text-text"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-jakarta text-[10px] uppercase tracking-[0.2em] text-text-muted"
              >
                {tagline}
              </motion.span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-border">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "linear" }}
              className="h-full bg-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
