import { z } from "zod";

const indianPhone = /^(?:\+?91[\s-]?)?(?:0[\s-]?)?[6789]\d{9}$/;
const isoDate = z.string().datetime({ offset: true });

export const detailsSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  age: z.coerce.number().int().min(1).max(120),
  gender: z.enum(["female", "male", "other", "prefer_not_to_say"]),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  phone: z.string().trim().regex(indianPhone).transform((value) => value.replace(/\D/g, "").replace(/^91/, "").replace(/^0/, "")),
  addressLine: z.string().trim().min(5).max(200),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  pincode: z.string().regex(/^\d{6}$/),
  preferredMode: z.enum(["in_clinic_hyderabad", "in_clinic_kakinada", "online"]),
  referralSource: z.string().trim().max(100).optional(),
  selectedSymptoms: z.array(z.string()).optional(),
  programInterest: z.string().optional(),
});

export const paymentSchema = z.object({
  screenshotUrl: z.string().url().refine((value) => value.startsWith("https://"), "Must be an HTTPS URL"),
  screenshotPublicId: z.string(),
  uploadedAt: isoDate,
  transactionRef: z.string().trim().max(60).optional(),
  amountNote: z.string().optional(),
  verificationStatus: z.enum(["pending", "verified", "not_verified"]).default("pending"),
  verifiedAt: isoDate.nullable().default(null),
  verifiedBy: z.string().nullable().default(null),
});

export const consentSchema = z.object({
  accurateInfo: z.literal(true),
  contactConsent: z.literal(true),
  dataConsent: z.literal(true),
});

export const healthSchema = z.object({});
export const nutritionSchema = z.object({});

export const fullAssessmentSchema = z.object({
  details: detailsSchema,
  payment: paymentSchema,
  health: healthSchema,
  nutrition: nutritionSchema,
  consent: consentSchema,
});

export type Details = z.infer<typeof detailsSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type Consent = z.infer<typeof consentSchema>;
export type Health = z.infer<typeof healthSchema>;
export type Nutrition = z.infer<typeof nutritionSchema>;
export type FullAssessment = z.infer<typeof fullAssessmentSchema>;
