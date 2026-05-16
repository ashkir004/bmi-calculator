
import { z } from "zod";
import { bmiSchema } from "./bmiValidation";
import type { BMIFormData } from "./bmiValidation";


export function calculateBMI(inputData : BMIFormData): number {

    const { unit } = inputData;

    let heightCm: number, weightKg: number;
    let feet: number, inches: number, stone: number, pounds: number;
    
    let bmi: number;

    if (unit === 'metric') {
        ({ heightCm, weightKg } = inputData);
        const heightInMeters = heightCm / 100;
        bmi = weightKg / heightInMeters ** 2;
        
    } else {
        ({ feet, inches, stone, pounds } = inputData);
        const heightInInches = (feet * 12) + inches;
        const weightInPounds = (stone * 14) + pounds;
        bmi = (weightInPounds / heightInInches ** 2) * 703;
    }

    return bmi;
}


export function validateBMIInput(data: unknown) {
    const result = bmiSchema.safeParse(data);
    if (!result.success) {
        return { success: false, errors: z.flattenError(result.error)};
    }
    return { success: true, data: result.data };
}