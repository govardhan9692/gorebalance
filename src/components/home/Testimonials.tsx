import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Quote,
  Star,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { testimonials } from "@/data/content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const autoplay = React.useRef(
    Autoplay({
      delay: 5500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps",
      duration: reduceMotion ? 0 : 25,
    },
    reduceMotion ? [] : [autoplay.current]
  );

  const [selected, setSelected] = React.useState(0);
  const [inViewSlides, setInViewSlides] = React.useState<number[]>([0]);
  const [interacted, setInteracted] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setInViewSlides(emblaApi.slidesInView());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("slidesInView", onSelect).on("reInit", onSelect);
    const onPointerDown = () => setInteracted(true);
    emblaApi.on("pointerDown", onPointerDown);
    return () => {
      emblaApi.off("select", onSelect).off("slidesInView", onSelect).off("reInit", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi, onSelect]);

  // Pause autoplay when tab hidden
  React.useEffect(() => {
    if (reduceMotion) return;
    const handler = () => {
      const ap = autoplay.current;
      if (!ap) return;
      if (document.hidden) ap.stop();
      else ap.play();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [reduceMotion]);

  const navigate = React.useCallback(
    (fn: () => void) => {
      if (!emblaApi) return;
      setInteracted(true);
      fn();
      if (!reduceMotion) autoplay.current?.reset();
    },
    [emblaApi, reduceMotion]
  );

  const scrollPrev = () => navigate(() => emblaApi?.scrollPrev());
  const scrollNext = () => navigate(() => emblaApi?.scrollNext());
  const scrollTo = (i: number) => navigate(() => emblaApi?.scrollTo(i));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  return (
    <SectionWrapper id="testimonials" bg="base" labelledBy="testimonials-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-[520px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full bg-accent opacity-[0.04] blur-[140px]"
      />

      <div className="relative z-10">
        <SectionHeading
          align="center"
          eyebrow="CLIENT STORIES"
          title="Real people. Real *rebalancing*."
          subtitle="These are clients who arrived after years of being told their reports were normal. Here's what changed once we treated the cause."
          className="!mb-[44px] md:!mb-[56px]"
        />

        <div className="mb-6 overflow-hidden rounded-[20px] aspect-[3.4/1] min-h-[130px] max-h-[260px]">
          <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1600" alt="Warm consultation between a nutritionist and client" className="h-full w-full object-cover" loading="lazy" />
        </div>

        <motion.div
          ref={containerRef}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="xl:mr-[calc(50%-50vw+0px)]"
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <div
              ref={emblaRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              className="overflow-hidden rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              <div
                aria-live={interacted ? "polite" : "off"}
                className="flex select-none items-stretch -ml-[16px] cursor-grab active:cursor-grabbing md:-ml-[20px] lg:-ml-[24px]"
              >
                {testimonials.map((t, i) => {
                  const isActive = reduceMotion || inViewSlides.includes(i);
                  return (
                    <div
                      key={t.id}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${testimonials.length}`}
                      className="flex min-w-0 flex-[0_0_100%] pl-[16px] md:flex-[0_0_50%] md:pl-[20px] lg:flex-[0_0_33.333%] lg:pl-[24px]"
                    >
                      <div
                        className={cn(
                          "relative flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-border bg-surface p-[28px_22px] transition-[opacity,transform] duration-500 sm:p-[32px_28px] lg:p-[36px_32px]",
                          "md:origin-center",
                          !reduceMotion && !isActive && "md:opacity-55 md:scale-[0.97]"
                        )}
                        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                      >
                        <Quote
                          aria-hidden="true"
                          className="pointer-events-none absolute right-[24px] top-[20px] z-0 h-[72px] w-[72px] text-primary opacity-[0.08]"
                        />

                        <div className="relative z-10 mb-5 flex gap-[3px]">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star
                              key={s}
                              aria-hidden="true"
                              className={cn(
                                "h-4 w-4",
                                s < t.rating ? "fill-accent text-accent" : "text-border"
                              )}
                            />
                          ))}
                          <span className="sr-only">{t.rating} out of 5 stars</span>
                        </div>

                        <blockquote className="relative z-10 m-0 mb-[28px] flex-grow text-[15px] leading-[1.7] font-normal text-text lg:text-[16px]">
                          {t.quote}
                        </blockquote>

                        <div className="relative z-10 mb-5 h-px w-full bg-border" />

                        <div className="relative z-10">
                          <div className="mb-3 flex xl:hidden">
                            <VerifiedChip />
                          </div>
                          <div className="flex items-center gap-[14px]">
                            <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-primary-soft ring-[1.5px] ring-border">
                              <span className="font-display text-[15px] font-medium text-primary">
                                {t.initials}
                              </span>
                            </div>
                            <footer className="min-w-0 flex-grow">
                              <cite className="block not-italic text-[15px] font-semibold leading-[1.3] text-text">
                                {t.name}
                              </cite>
                              <p className="mt-1 text-[12.5px] leading-[1.4] text-text-muted">
                                {t.condition} · {t.duration}
                              </p>
                              <p className="mt-1 flex items-start gap-1 text-[12px] leading-[1.4] text-text-muted">
                                <MapPin aria-hidden="true" className="mt-[2px] h-3 w-3 shrink-0" />
                                <span>{t.location}</span>
                              </p>
                            </footer>
                            <div className="ml-auto hidden xl:flex">
                              <VerifiedChip />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-8 flex flex-col items-center gap-6 md:mt-10 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={selected === i ? "true" : undefined}
                className="grid h-11 w-11 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span
                  className={cn(
                    "h-2 rounded-full transition-all duration-[400ms]",
                    selected === i ? "w-[28px] bg-accent" : "w-2 bg-border"
                  )}
                  style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="group grid h-12 w-12 place-items-center rounded-full border-[1.5px] border-border bg-transparent text-text transition-all duration-300 hover:-translate-y-[2px] hover:border-primary hover:bg-primary-soft hover:text-primary focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-[2px]" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="group grid h-12 w-12 place-items-center rounded-full border-[1.5px] border-border bg-transparent text-text transition-all duration-300 hover:-translate-y-[2px] hover:border-primary hover:bg-primary-soft hover:text-primary focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-[2px]" />
            </button>
          </div>

          <Link
            to="/testimonials"
            className="group relative inline-flex items-center gap-2 text-[15px] font-semibold text-primary transition-colors duration-300 hover:text-accent"
          >
            <span className="relative">
              Read all stories
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function VerifiedChip() {
  return (
    <span className="inline-flex items-center gap-[5px] rounded-pill bg-primary-soft px-[10px] py-[5px] text-[11.5px] font-semibold text-primary">
      <BadgeCheck aria-hidden="true" className="h-3 w-3" />
      Verified client
    </span>
  );
}
