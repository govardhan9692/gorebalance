import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  stagger?: number;
  className?: string;
}

export function Reveal({ 
  children, 
  delay = 0, 
  as: Component = "div", 
  stagger, 
  className 
}: RevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  if (stagger !== undefined) {
    return (
      <Component ref={ref} className={cn("reveal-container", className)}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: stagger,
              },
            },
          }}
          className="contents"
        >
          {React.Children.map(children, (child) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="contents"
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </Component>
    );
  }

  return (
    <Component ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </Component>
  );
}
