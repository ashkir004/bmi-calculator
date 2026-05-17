import { z } from "zod";

/* -----------------------------
   Metric Schema
----------------------------- */

export const metricSchema = z.object({
  unit: z.literal("metric"),

  heightCm: z.preprocess((val) => val === '' ? undefined : val, z.coerce
    .number("Height must be a number")
    .positive("Height must be greater than 0")
    .min(50, "Height too small")
    .max(300, "Height too large")),

  weightKg: z.preprocess((val) => val === '' ? undefined : val, z.coerce
    .number("Weight must be a number")
    .positive("Weight must be greater than 0")
    .min(10, "Weight too small")
    .max(500, "Weight too large"),
)});

/* -----------------------------
   Imperial Schema
----------------------------- */

export const imperialSchema = z.object({
  unit: z.literal("imperial"),

  feet: z.preprocess((val) => val === '' ? undefined : val, z.coerce
    .number("Feet must be a number")
    .int("Feet must be whole number")
    .min(0, "Feet cannot be negative")
    .max(9, "Feet too large")),

  inches: z.preprocess((val) => val === '' ? undefined : val, z.coerce
    .number("Inches must be a number")
    .int("Inches must be whole number")
    .min(0, "Inches cannot be negative")
    .max(11, "Inches must be between 0 and 11")),

  stone: z.preprocess((val) => val === '' ? undefined : val, z.coerce
    .number("Stone must be a number")
    .int("Stone must be whole number")
    .min(0, "Stone cannot be negative")
    .max(100, "Stone too large")),

  pounds: z.preprocess((val) => val === '' ? undefined : val, z.coerce
    .number("Pounds must be a number")
    .int("Pounds must be whole number")
    .min(0, "Pounds cannot be negative")
    .max(13, "Pounds must be between 0 and 13")),
});

/* -----------------------------
   Combined Schema
----------------------------- */

export const bmiSchema = z.discriminatedUnion("unit", [
  metricSchema,
  imperialSchema,
]);

export type BMIFormData = z.infer<typeof bmiSchema>;