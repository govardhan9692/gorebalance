import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wind, 
  Flame, 
  Timer, 
  BatteryLow, 
  Scale, 
  Sparkles, 
  CalendarHeart, 
  Candy, 
  Check,
  Activity,
  ArrowRight,
  Lock,
  Clock,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/shared/CountUp";
import { symptoms } from "@/data/content";

const iconMap: Record<string, any> = {
  Wind,
  Flame,
  Timer,
  BatteryLow,
  Scale,
  Sparkles,
  CalendarHeart,
  Candy
};

export function SymptomChecker() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gr_selected_symptoms");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem("gr_selected_symptoms", JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleSymptom = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const clearAll = () => setSelectedIds([]);

  const n = selectedIds.length;

  const getResultLine1 = () => {
    if (n <= 2) return `You've selected ${n} early signals.`;
    if (n <= 4) return `You've selected ${n} signs — that's a pattern, not a coincidence.`;
    return `You've selected ${n} signs. Your gut has been asking for help for a while.`;
  };

  const getResultLine2 = () => {
    if (n <= 2) return "Caught early, these are very reversible with the right nutrition plan.";
    if (n <= 4) return "These symptoms are usually connected. A root-cause assessment will show you how.";
    return "This is exactly what the GoRebalance protocol is built to unwind.";
  };

  return (
    <SectionWrapper id="symptoms" bg="base" labelledBy="symptoms-heading">
      {/* Decorative Glow */}
      <div 
        className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/4 -translate-y-1/4" 
        aria-hidden="true"
      />

      <div className="relative z-10">
        <SectionHeading
          eyebrow="THE SIGNS YOUR GUT IS ASKING FOR HELP"
          title="Bloated, tired, and told everything is *normal*?"
          subtitle="Most people live with these every single day and assume it's stress, age or 'just how my body is'. It usually isn't. It's your gut asking for help."
          align="center"
          className="mb-[56px] lg:mb-[72px]"
        />

        <div 
          role="group" 
          aria-labelledby="symptoms-heading"
          className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-[12px] min-[480px]:gap-[16px] md:gap-[20px] xl:gap-[24px]"
        >
          <div className="col-span-full mb-1 overflow-hidden rounded-[20px] aspect-[2.4/1] min-h-[150px] max-h-[280px]">
            <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1400" alt="Colourful fresh ingredients prepared for a nourishing meal" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <Reveal stagger={0.06} className="contents">
            {symptoms.map((symptom) => {
              const Icon = symptom.icon as any;
              const isSelected = selectedIds.includes(symptom.id);

              return (
                <button
                  key={symptom.id}
                  type="button"
                  aria-pressed={isSelected}
                  aria-describedby={`detail-${symptom.id}`}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={cn(
                    "relative text-left flex flex-col items-start h-full p-[18px_14px] min-[480px]:p-[24px_20px] md:p-[28px_24px] rounded-[20px] border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-3",
                    isSelected 
                      ? "bg-primary-soft border-primary -translate-y-[2px]" 
                      : "bg-surface border-border hover:md:-translate-y-[4px] hover:md:border-primary/35 hover:md:shadow-[0_12px_32px_rgba(31,77,61,0.10)]"
                  )}
                >
                  {/* Icon Container */}
                  <div className={cn(
                    "w-[40px] h-[40px] min-[480px]:w-[48px] min-[480px]:h-[48px] rounded-[14px] flex items-center justify-center mb-[16px] md:mb-[20px] transition-all duration-300",
                    isSelected ? "bg-primary" : "bg-primary-soft group-hover:bg-primary-soft/80"
                  )}>
                    {Icon && (
                      <Icon 
                        size={22} 
                        strokeWidth={1.75} 
                        className={cn(
                          "transition-transform duration-300",
                          isSelected ? "text-white" : "text-primary group-hover:scale-105 group-hover:rotate-6"
                        )} 
                      />
                    )}
                  </div>

                  {/* Label */}
                  <h3 className={cn(
                    "font-jakarta font-600 leading-[1.3] mb-[8px] transition-colors duration-300",
                    "text-[15px] min-[480px]:text-[17px]",
                    isSelected ? "text-primary dark:text-text" : "text-text"
                  )}>
                    {symptom.label}
                  </h3>

                  {/* Detail */}
                  <p 
                    id={`detail-${symptom.id}`}
                    className="hidden min-[480px]:block text-[12.5px] md:text-[14px] leading-[1.55] text-text-muted"
                  >
                    {symptom.detail}
                  </p>

                  {/* Check Badge */}
                  <div className="absolute top-[14px] right-[14px] w-[24px] h-[24px] flex items-center justify-center">
                    <motion.div
                      initial={false}
                      animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="w-full h-full bg-primary rounded-full flex items-center justify-center"
                    >
                      <Check size={14} className="text-white" />
                    </motion.div>
                  </div>
                </button>
              );
            })}
          </Reveal>
        </div>

        {/* Live Result Bar */}
        <div className="mt-[40px] md:mt-[48px]">
          <AnimatePresence initial={false}>
            {n > 0 ? (
              <motion.div
                key="result-bar"
                initial={{ height: 0, opacity: 0, y: 12 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 12 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="overflow-hidden"
              >
                <div className="glass p-[20px] md:p-[24px_28px] rounded-[20px] border flex flex-col md:flex-row items-center justify-between gap-[20px]">
                  <div className="flex items-center gap-[20px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-primary-soft flex items-center justify-center shrink-0">
                      <Activity size={22} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-[16px] font-600 text-text leading-tight mb-1">
                        {n <= 2 && (
                          <>You've selected <CountUp value={n} duration={0.2} /> early signals.</>
                        )}
                        {n > 2 && n <= 4 && (
                          <>You've selected <CountUp value={n} duration={0.2} /> signs — that's a pattern, not a coincidence.</>
                        )}
                        {n > 4 && (
                          <>You've selected <CountUp value={n} duration={0.2} /> signs. Your gut has been asking for help for a while.</>
                        )}
                      </h4>
                      <p className="text-[14px] text-text-muted leading-snug">{getResultLine2()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-[12px] w-full md:w-auto">
                    <button 
                      type="button"
                      onClick={() => window.location.href = `/assessment?symptoms=${selectedIds.join(",")}`}
                      className="group flex items-center justify-center gap-[8px] bg-accent text-white h-[52px] px-[28px] rounded-pill font-600 text-[15px] shadow-[0_4px_20px_rgba(201,123,74,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(201,123,74,0.4)] w-full md:w-auto"
                    >
                      See What's Causing This
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <button 
                      onClick={clearAll}
                      className="text-[13px] text-text-muted hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default-cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <p className="text-[14px] text-text-muted mb-[16px]">Tick the ones you recognise — or skip straight ahead.</p>
                <button 
                  type="button"
                  onClick={() => window.location.href = "/assessment"}
                  className="group flex items-center justify-center gap-[8px] bg-accent text-white h-[56px] px-[34px] rounded-pill font-600 text-[16px] shadow-[0_4px_20px_rgba(201,123,74,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(201,123,74,0.4)]"
                >
                  Get My Personalised Assessment
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reassurance Row */}
        <div className="mt-[40px] md:mt-[32px] flex flex-wrap justify-center gap-[20px] md:gap-[40px] text-[13px] text-text-muted">
          <div className="flex items-center gap-[8px]">
            <Lock size={14} className="text-primary" />
            <span>100% confidential</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <Clock size={14} className="text-primary" />
            <span>Takes ~10 minutes</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <UserCheck size={14} className="text-primary" />
            <span>Reviewed personally by Dt. Sai Sowjanya</span>
          </div>
        </div>

        {/* Accessibility Region */}
        <div className="sr-only" aria-live="polite">
          {n} symptoms selected.
        </div>
      </div>
    </SectionWrapper>
  );
}
