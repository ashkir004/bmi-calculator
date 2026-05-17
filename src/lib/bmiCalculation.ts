
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


export function getBMICategory(bmi: number | undefined) {
  if (bmi === undefined) {
    return null;
  }

  if (bmi < 18.5) {
    return {
      category: "Underweight",
      message:
        "A BMI below 18.5 is considered underweight. A balanced diet with sufficient nutrients and regular health checkups may help support healthy weight gain.",
    };
  }

  if (bmi < 25) {
    return {
      category: "Healthy weight",
      message:
        "A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week."
    };
  }

  if (bmi < 30) {
    return {
      category: "Overweight",
      message:
        "A BMI between 25 and 29.9 is considered overweight. Regular physical activity and balanced nutrition may help improve overall health.",
    };
  }

  return {
    category: "Obesity",
    message:
      "A BMI above 30 is considered obesity. Speaking with a healthcare professional can help determine supportive lifestyle strategies and health goals.",
  };
}


export function formatImperialRange(min: number, max: number) {
    const minStone = Math.floor(min / 14);
    const minPounds = Math.round(min % 14);
    const maxStone = Math.floor(max / 14);
    const maxPounds = Math.round(max % 14);

    return `${minStone}st ${minPounds}lbs - ${maxStone}st ${maxPounds}lbs`;
}


export function getMetricWeightRange(heightCm: number, category: string): string {
    const heightInMeters = heightCm / 100;
    let minWeight: number, maxWeight: number;
    let range: string = "";

    switch (category) {
        case "Underweight":
            maxWeight = 18.5 * heightInMeters ** 2;
            range = `below ${maxWeight.toFixed(1)}kgs`;
            break;
        case "Healthy weight":
            minWeight = 18.5 * heightInMeters ** 2;
            maxWeight = 24.9 * heightInMeters ** 2;
            range = `${minWeight.toFixed(1)}kgs - ${maxWeight.toFixed(1)}kgs`;
            break;
        case "Overweight":
            minWeight = 25 * heightInMeters ** 2;
            maxWeight = 29.9 * heightInMeters ** 2;
            range = `${minWeight.toFixed(1)}kgs - ${maxWeight.toFixed(1)}kgs`;
            break;
        case "Obesity":
            minWeight = 30 * heightInMeters ** 2;
            range = `${minWeight.toFixed(1)}kgs and above`;
            break;
    }

    return range;
}

export function getImperialWeightRange(feet: number, inches: number, category: string) {
    const heightInInches = feet * 12 + inches;
    let minWeight: number, maxWeight: number;
    let range: string = "";

    switch (category) {
        case "Underweight":
            maxWeight = (18.5 * heightInInches ** 2) / 703;
            range = `below ${formatImperialRange(0, maxWeight)}`;
            break;
        case "Healthy weight":
            minWeight = (18.5 * heightInInches ** 2) / 703;
            maxWeight = (24.9 * heightInInches ** 2) / 703;
            range = formatImperialRange(minWeight, maxWeight);
            break;
        case "Overweight":
            minWeight = (25 * heightInInches ** 2) / 703;
            maxWeight = (29.9 * heightInInches ** 2) / 703;
            range = formatImperialRange(minWeight, maxWeight);
            break;
        case "Obesity":
            minWeight = (30 * heightInInches ** 2) / 703;
            range = `above ${formatImperialRange(minWeight, minWeight + 14)}`;
            break;
    }

    return range;
}


export function getBMIResult(bmi: number | undefined, unitCategory: "metric" | "imperial", heightCm?: number, feet?: number, inches?: number) {
    const categoryInfo = getBMICategory(bmi);
    if (!categoryInfo) {
        return null;
    }

    let weightRange: string;
    if (unitCategory === "metric") {
        weightRange = getMetricWeightRange(heightCm!, categoryInfo.category);
    } else {
        weightRange = getImperialWeightRange(feet!, inches!, categoryInfo.category);
    }

    const { category, message } = categoryInfo;
    
    switch (category) {
        case "Underweight":
            return { category, message, weightRange };
        case "Healthy weight":
            return { category, message, weightRange };
        case "Overweight":
            return { category, message, weightRange };
        case "Obesity":
            return { category, message, weightRange };
    }
}