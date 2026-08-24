import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { detailsSchema, paymentSchema, healthSchema, nutritionSchema, type Details, type Payment, type Health, type Nutrition } from "@/schemas/assessment";

export type AssessmentStep = "details" | "payment" | "health" | "nutrition" | "complete";
export type AssessmentData = { details: Partial<Details>; payment: Partial<Payment>; health: Partial<Health>; nutrition: Partial<Nutrition> };
export type AssessmentState = { currentStep: AssessmentStep; completedSteps: AssessmentStep[]; data: AssessmentData; draftId: string; direction: "forward" | "back"; lastSavedAt: string | null };

type AssessmentContextValue = AssessmentState & { goToStep: (step: AssessmentStep) => void; next: () => Promise<boolean>; back: () => void; updateSection: <K extends keyof AssessmentData>(section: K, data: Partial<AssessmentData[K]>) => void; markStepComplete: (step?: AssessmentStep) => Promise<void>; resetAssessment: () => void; submitFinal: (consent: { accurateInfo: true; contactConsent: true; dataConsent: true }) => Promise<void> };

const key = "gr_assessment_draft_v1";
const steps: AssessmentStep[] = ["details", "payment", "health", "nutrition", "complete"];
const emptyData: AssessmentData = { details: {}, payment: {}, health: {}, nutrition: {} };
const makeId = () => crypto.randomUUID();
const initial = (): AssessmentState => ({ currentStep: "details", completedSteps: [], data: emptyData, draftId: makeId(), direction: "forward", lastSavedAt: null });

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      if (saved && saved.savedAt && Date.now() - Date.parse(saved.savedAt) <= 14 * 86400000) return { ...initial(), ...saved, lastSavedAt: saved.savedAt };
    } catch { /* offline/corrupt draft */ }
    const params = new URLSearchParams(window.location.search);
    let selectedSymptoms: unknown = null;
    try { selectedSymptoms = JSON.parse(localStorage.getItem("gr_selected_symptoms") || "null"); } catch { /* ignore malformed preference */ }
    return { ...initial(), data: { ...emptyData, details: { selectedSymptoms: Array.isArray(selectedSymptoms) ? selectedSymptoms : undefined, programInterest: params.get("program") || undefined } } };
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const updateSection = useCallback(<K extends keyof AssessmentData>(section: K, data: Partial<AssessmentData[K]>) => {
    setState((previous) => ({ ...previous, data: { ...previous.data, [section]: { ...previous.data[section], ...data } } }));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState((previous) => { const savedAt = new Date().toISOString(); localStorage.setItem(key, JSON.stringify({ ...previous, savedAt })); return { ...previous, lastSavedAt: savedAt }; }), 600);
  }, []);
  const goToStep = useCallback((step: AssessmentStep) => setState((s) => { const target = steps.indexOf(step); const current = steps.indexOf(s.currentStep); const previous = steps[target - 1]; return target <= current + 1 && (target <= current || (previous !== undefined && s.completedSteps.includes(previous))) ? { ...s, currentStep: step, direction: target >= current ? "forward" : "back" } : s; }), []);
  const markStepComplete = useCallback(async (step = state.currentStep) => { if (step === "complete") return; const completedSteps = state.completedSteps.includes(step) ? state.completedSteps : [...state.completedSteps, step]; setState((s) => ({ ...s, completedSteps })); try { await setDoc(doc(db, "assessmentDrafts", state.draftId), { ...state, completedSteps, updatedAt: Timestamp.now(), createdAt: Timestamp.now(), status: "draft" }, { merge: true }); } catch { /* Firestore must never block offline flow */ } }, [state]);
  const next = useCallback(async () => { const schema = [detailsSchema, paymentSchema, healthSchema, nutritionSchema][steps.indexOf(state.currentStep)]; const target = steps[steps.indexOf(state.currentStep) + 1]; if (!schema || !target || !schema.safeParse(state.data[state.currentStep as keyof AssessmentData]).success) return false; await markStepComplete(); goToStep(target); return true; }, [state, markStepComplete, goToStep]);
  const back = useCallback(() => { const target = steps[Math.max(0, steps.indexOf(state.currentStep) - 1)]; if (target) goToStep(target); }, [state.currentStep, goToStep]);
  const resetAssessment = useCallback(() => { localStorage.removeItem(key); setState(initial()); }, []);
  const submitFinal = useCallback(async (consent: { accurateInfo: true; contactConsent: true; dataConsent: true }) => { const payload = { ...state.data, consent }; await addDoc(collection(db, "assessments"), { ...payload, draftId: state.draftId, createdAt: Timestamp.now() }); setState((s) => ({ ...s, currentStep: "complete" })); }, [state]);
  const value = useMemo(() => ({ ...state, goToStep, next, back, updateSection, markStepComplete, resetAssessment, submitFinal }), [state, goToStep, next, back, updateSection, markStepComplete, resetAssessment, submitFinal]);
  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}
export const useAssessment = () => { const context = useContext(AssessmentContext); if (!context) throw new Error("useAssessment must be used inside AssessmentProvider"); return context; };
