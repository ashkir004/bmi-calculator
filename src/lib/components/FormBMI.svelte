<script lang="ts">
    import { calculateBMI, validateBMIInput } from "$lib/bmiCalculation";
    import type { $ZodFlattenedError, $ZodSchema } from "zod/v4/core";
    import type { BMIFormData } from "$lib/bmiValidation";

    let unitCategory = $state<'metric' | 'imperial'>('metric');

    let height = $state<number>(0);         // cm or ft
    let weight = $state<number>(0);     // kg or st
    let heightInches = $state<number>(0);
    let weightLbs = $state<number>(0);
    let bmi = $state<number | undefined>(undefined);
    let validationErrors = $state<$ZodFlattenedError<BMIFormData> | undefined>(undefined);

    $effect(() => {

        if (unitCategory === 'metric') {
            heightInches = 0;
            weightLbs = 0;
            height = 0;
            weight = 0;
            bmi = undefined;
        } else {
            height = 0;
            weight = 0;
            bmi = undefined;
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
            feet: height,
            stone: weight,
            inches: heightInches,
            pounds: weightLbs
        };

        const validationResult = validateBMIInput(inputData);

        console.log('Validation result:', validationResult);

        if (validationResult.success) {
            bmi = calculateBMI(inputData);
        } else {
            bmi = undefined;
            validationErrors = validationResult.errors;
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

    </div>
    <div class="bmi-results">
        {#if bmi === undefined}
            <div class="bmi-welcome">
                <h2 >Welcome!</h2>
                <p>Enter your height and weight and you'll see your BMI result here</p>
            </div>
        {:else}
            <p class="bmi-label">Your BMI is... <span class="bmi-value">{bmi?.toFixed(1)}</span></p>
            <p class="bmi-description">Your BMI suggests you're a healthy weight. Your ideal weight is between <b>63.3kgs - 85.2kgs</b>.</p>
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
        border: 1px solid var(--grey-500);
        padding: var(--space-300);
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


</style>