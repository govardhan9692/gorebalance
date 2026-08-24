import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumb: BreadcrumbItem[];
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  align?: "left" | "center";
  variant?: "image" | "plain";
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  image,
  align = "left",
  variant = "image",
  children,
}: PageHeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const onDarkText = "#F4F8F5";
  const onDarkMuted = "rgba(244,248,245,0.74)";
  const onDarkBorder = "rgba(244,248,245,0.20)";
  const onDarkGlass = "rgba(244,248,245,0.10)";

  const isImage = variant === "image" && image;
  const isCenter = align === "center";

  // Parse title for *italic* accent
  const titleParts = title.split(/(\*[^*]+\*)/g);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden isolation-isolate",
        !isImage ? "bg-surface-alt" : "bg-[#0E1512]"
      )}
      style={{
        paddingTop: "var(--header-h-offset)",
        paddingBottom: "clamp(72px, 9vw, 112px)",
        minHeight: "var(--hero-min-h)",
      }}
    >
      <style>{`
        :root {
          --header-h: 72px;
          --header-h-offset: calc(var(--header-h) + clamp(80px, 10vw, 128px));
          --hero-min-h: 340px;
        }
        @media (min-width: 768px) {
          :root {
            --hero-min-h: 420px;
          }
        }
        @media (min-width: 1024px) {
          :root {
            --header-h: 84px;
          }
        }
      `}</style>

      {/* Background Stack */}
      {isImage ? (
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          {/* Layer 0: Image */}
          <motion.div
            className="absolute inset-0"
            style={{ y: shouldReduceMotion ? 0 : imageY }}
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              width={image.width || 1920}
              height={image.height || 1080}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover scale-[1.06]"
              animate={!shouldReduceMotion ? { scale: [1.06, 1.12] } : {}}
              transition={{
                duration: 14,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Layer 1: Scrim */}
          <div
            className={cn(
              "absolute inset-0 z-10",
              isCenter
                ? "bg-gradient-to-b from-[rgba(14,21,18,0.85)] via-[rgba(14,21,18,0.6)] to-[rgba(14,21,18,0.85)]"
                : "bg-[linear-gradient(100deg,rgba(14,21,18,0.90)_0%,rgba(14,21,18,0.74)_42%,rgba(14,21,18,0.42)_100%)]"
            )}
          />

          {/* Layer 2: Bottom Melt */}
          <div className="absolute bottom-0 left-0 right-0 h-[140px] z-20 bg-gradient-to-t from-bg to-transparent" />

          {/* Layer 3: Primary Glow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary/16 rounded-full blur-[150px] z-20 pointer-events-none" />

          {/* Layer 4: Grain */}
          <div className="absolute inset-0 opacity-5 mix-blend-overlay z-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-primary/12 rounded-full blur-[150px]" />
          <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      )}

      {/* Content */}
      <div className={cn("container-x relative z-30", isCenter && "text-center")}>
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : contentY,
            opacity: contentOpacity,
          }}
          className={cn("max-w-[780px]", isCenter && "mx-auto")}
        >
          {/* 1. Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn("flex mb-7", isCenter && "justify-center")}
          >
            <ol className="flex items-center gap-2.5 list-none p-0 m-0">
              {breadcrumb.map((item, index) => {
                const isLast = index === breadcrumb.length - 1;
                return (
                  <React.Fragment key={item.label}>
                    <li>
                      {isLast ? (
                        <span
                          aria-current="page"
                          className="text-[13px] font-medium"
                          style={{ color: isImage ? onDarkText : "var(--text)" }}
                        >
                          {item.label}
                        </span>
                      ) : (
                        <a
                          href={item.href}
                          className="text-[13px] transition-colors hover:text-accent"
                          style={{ color: isImage ? onDarkMuted : "var(--text-muted)" }}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                    {!isLast && (
                      <ChevronRight
                        size={14}
                        className="opacity-45"
                        style={{ color: isImage ? onDarkMuted : "var(--text-muted)" }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </ol>
          </motion.nav>

          {/* 2. Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.09 }}
            className={cn("inline-flex items-center gap-2 px-4 py-[7px] rounded-full backdrop-blur-xl mb-5.5", 
              isImage ? "bg-[var(--h-glass)] border-[var(--h-border)]" : "bg-surface border-border")}
            style={{ 
              backgroundColor: isImage ? onDarkGlass : undefined,
              border: `1px solid ${isImage ? onDarkBorder : "var(--border)"}`
            }}
          >
            <div className="w-[5px] h-[5px] bg-accent rounded-full" />
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: isImage ? onDarkText : "var(--text)" }}
            >
              {eyebrow}
            </span>
          </motion.div>

          {/* 3. H1 */}
          <h1
            className="font-fraunces font-medium leading-[1.06] tracking-[-0.025em] mb-5.5"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              color: isImage ? onDarkText : "var(--text)",
            }}
          >
            {titleParts.map((part, i) => {
              const isAccent = part.startsWith("*") && part.endsWith("*");
              const text = isAccent ? part.slice(1, -1) : part;
              const words = text.split(" ");

              return words.map((word, j) => (
                <span key={`${i}-${j}`} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: (i + j) * 0.06 + 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "inline-block",
                      isAccent && "italic text-accent"
                    )}
                  >
                    {word}
                  </motion.span>
                </span>
              ));
            })}
          </h1>

          {/* 4. Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.27 }}
            className="font-jakarta leading-[1.65] max-w-[620px]"
            style={{
              fontSize: "clamp(1.0625rem, 1.5vw, 1.1875rem)",
              color: isImage ? onDarkMuted : "var(--text-muted)",
            }}
          >
            {subtitle}
          </motion.p>

          {/* 5. Meta Row */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Cue */}
      {!shouldReduceMotion && (
        <div className="hidden lg:block absolute z-30 pointer-events-none left-10 xl:left-[calc((100vw-1280px)/2+48px)]"
          style={{ bottom: "calc(clamp(72px, 9vw, 112px) + 40px)" }}
        >
          <div 
            className="w-[1px] h-10 mb-2.5 relative" 
            style={{ backgroundColor: isImage ? onDarkBorder : "var(--border)" }}
          >
            <motion.div
              animate={{ y: [0, 36, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-accent rounded-full"
            />
          </div>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: isImage ? onDarkMuted : "var(--text-muted)" }}
          >
            SCROLL
          </span>
        </div>
      )}
    </section>
  );
}