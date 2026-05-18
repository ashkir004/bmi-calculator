<script lang="ts">
    import { calculateBMI, validateBMIInput, getBMIResult } from "$lib/bmiCalculation";
    import type { $ZodFlattenedError } from "zod/v4/core";
    import type { BMIFormData } from "$lib/bmiValidation";

    let unitCategory = $state<'metric' | 'imperial'>('metric');

    let height = $state<number>(0);         // cm or ft
    let weight = $state<number>(0);     // kg or st
    let feet = $derived(height);
    let stone = $derived(weight);
    let heightInches = $state<number>(0);
    let weightLbs = $state<number>(0);
    let bmi = $state<number | undefined>(undefined);
    let validationResults = $state<{ success: boolean; errors?: $ZodFlattenedError<BMIFormData> } | undefined>(undefined);
    let bmiResult = $derived(getBMIResult(bmi, unitCategory, height, feet, heightInches));

    $effect(() => {

        if (unitCategory === 'metric') {
            heightInches = 0;
            weightLbs = 0;
            height = 0;
            weight = 0;
            bmi = undefined;
            validationResults = undefined;
        } else {
            height = 0;
            weight = 0;
            bmi = undefined;
            validationResults = undefined;
        }
    });
    

    function handleFocus(event: FocusEvent) {
        const target = event.target as HTMLInputElement;
        if (target.value === '0') {
            target.value = '';
        }
    }

    function handleOnInput() {

        const inputData = {
            unit: unitCategory,
            heightCm: height,
            weightKg: weight,
            feet: feet,
            stone: stone,
            inches: heightInches,
            pounds: weightLbs
        };

        const validationResult = validateBMIInput(inputData);

        console.log('Validation result:', validationResult);

        if (validationResult.success) {
            bmi = calculateBMI(inputData);
            validationResults = { success: true };
        } else {
            bmi = undefined;
            validationResults = { success: false, errors: validationResult.errors };
        }
    }

</script>

{#key unitCategory}
<form oninput={handleOnInput}>
    <h2 class="form-header">Enter your details below</h2>
    <div class="unit-selector">
        <label class="metric-option"><input type="radio" name="unit" value="metric" bind:group={unitCategory} /> Metric</label>
        <label class="imperial-option"><input type="radio" name="unit" value="imperial" bind:group={unitCategory} /> Imperial</label>
    </div>
    <div class="form-group">
        <label for="height">Height</label>
        <div class="inputs-wrapper">
            <input class="input-metric" type="number" id="height" name="height" bind:value={height} required onfocus={handleFocus} />
            <span class="unit-label-metric">{unitCategory === 'metric' ? 'cm' : 'ft'}</span>
            {#if unitCategory === 'imperial'}
                <input class="input-imperial" type="number" id="height" name="height" bind:value={heightInches} required onfocus={handleFocus} />
                <span class="unit-label-imperial">in</span>
            {/if}
        </div>
        {#if unitCategory === 'metric'}
            <p class="error">{validationResults?.errors && 'heightCm' in validationResults.errors.fieldErrors ? validationResults.errors.fieldErrors?.heightCm?.[0] : ''}</p>
        {:else}
            <div class="error-messages">
                <p class="error">{validationResults?.errors && 'feet' in validationResults.errors.fieldErrors ? validationResults.errors.fieldErrors?.feet?.[0] : ''}</p>
                <p class="error">{validationResults?.errors && 'inches' in validationResults.errors.fieldErrors ? validationResults.errors.fieldErrors?.inches?.[0] : ''}</p>
            </div>
        {/if}
    </div>
    <div class="form-group">
        <label for="weight">Weight</label>
        <div class="inputs-wrapper">
            <input class="input-metric" type="number" id="weight" name="weight" bind:value={weight} required onfocus={handleFocus} />
            <span class="unit-label-metric">{unitCategory === 'metric' ? 'kg' : 'st'}</span>
            {#if unitCategory === 'imperial'}
                <input class="input-imperial" type="number" id="weight" name="weight" bind:value={weightLbs} required onfocus={handleFocus} />
                <span class="unit-label-imperial">lbs</span>
            {/if}
        </div>
        {#if unitCategory === 'metric'}
            <p class="error">{validationResults?.errors && 'weightKg' in validationResults.errors.fieldErrors ? validationResults.errors.fieldErrors.weightKg?.[0] : ''}</p>
        {:else}
        <div class="error-messages">
            <p class="error">{validationResults?.errors && 'stone' in validationResults.errors.fieldErrors ? validationResults.errors.fieldErrors.stone?.[0] : ''}</p>
            <p class="error">{validationResults?.errors && 'pounds' in validationResults.errors.fieldErrors ? validationResults.errors.fieldErrors.pounds?.[0] : ''}</p>
        </div>
        {/if}
    </div>
    <div class="bmi-results">
        {#if bmi === undefined || validationResults?.success === false }
            <div class="bmi-welcome">
                <h2 >Welcome!</h2>
                <p>Enter your height and weight and you'll see your BMI result here</p>
            </div>
        {:else}
            <p class="bmi-label">Your BMI is... <span class="bmi-value">{bmi?.toFixed(1)}</span></p>
            <p class="bmi-description">Your BMI suggests you're a {bmiResult?.category}. Your ideal weight is between 
                <b>{bmiResult?.weightRange}</b></p>

            {/if}
        </div>
</form>
{/key}

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: var(--space-300);
        text-align: start;
        background-color: var(--white);
        padding: var(--space-300);
        border-radius: var(--space-200);
        box-shadow: 0 var(--space-200) var(--space-400) rgba(0, 0, 0, 0.1);
        width: 100%;
    }

    .form-header {
        font-size: var(--font-md);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-md);
        letter-spacing: var(--letter-spacing-sm);
        color: var(--blue-900);
    }

    .unit-selector {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: var(--font-sm);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-lg);
        color: var(--blue-900);
    }

    .unit-selector label {
        display: flex;
        align-items: center;
        gap: var(--space-200);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-100);
        position: relative;
    }

    .form-group label {
        font-size: var(--font-xxs);
        font-weight: var(--w-regular);
        line-height: var(--line-height-xl);
        color: var(--grey-500);
    }

    .form-group input {
        width: 100%;
        padding: var(--space-300);
        border: 1px solid var(--grey-500);
        border-radius: var(--space-150);
        font-size: var(--font-md);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-lg);
        color: var(--blue-900);
    }

    .form-group .inputs-wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: var(--space-300);
        background-color: aliceblue;
    }

    .form-group .unit-label-metric, .form-group .unit-label-imperial {
        font-size: var(--font-md);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-lg);
        color: var(--blue-500);
    }


    .form-group .input-metric, .form-group .unit-label-metric {
        grid-area: 1 / 1;
    }

    .form-group .input-imperial, .form-group .unit-label-imperial {
        grid-area: 1 / 2;
    }

    .unit-label-metric, .unit-label-imperial {
        justify-self: end;
        align-self: center;
        margin-right: var(--space-300);
    }  


    .bmi-results {
        display: flex;
        flex-direction: column;
        gap: var(--space-300);
        background-color: var(--blue-500);
        padding: var(--space-400);
        border-radius: var(--space-200);
        color: var(--white);
    }

    .bmi-results .bmi-welcome {
        display: flex;
        flex-direction: column;
        gap: var(--space-200);
    }

    .bmi-welcome h2 {
        font-size: var(--font-md);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-lg);
    }

    .bmi-label {
        font-size: var(--font-xs);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-xl);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--space-50);
    }

    .bmi-value {
        font-size: var(--font-xl);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-md);
        letter-spacing: var(--letter-spacing-sm);
        display: block;
    }

    .bmi-description {
        font-size: var(--font-xxs);
        font-weight: var(--w-regular);
        line-height: var(--line-height-xl);
    }

    .error-messages {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: var(--space-25);
    }

    .error {
        font-size: var(--font-xxsm);
        font-weight: var(--w-regular);
        color: var(--red);
    }

    @media (min-width: 48rem) {

        form {
            padding: var(--space-400);
        }


        .bmi-results {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-300);
            border-radius: var(--space-200) var(--space-1800) var(--space-1800) var(--space-200);
        }

        .bmi-label {
            flex-basis: 50%;
        }

        .bmi-description {
            flex-basis: 50%;
        }
    }


</style>