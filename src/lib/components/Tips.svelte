<script>
    import iconEating from '$lib/assets/images/icon-eating.svg';
    import iconExercise from '$lib/assets/images/icon-exercise.svg';
    import iconSleep from '$lib/assets/images/icon-sleep.svg';
</script>


<section class="tips">
    <div class="tip">
        <img src={iconEating} alt="Healthy eating" />
        <div class="tip-content">
            <h3>Healthy eating</h3>
            <p>Healthy eating promotes weight control, disease prevention, better digestion, immunity, mental clarity, and mood.</p>
        </div>
    </div>
    <div class="tip">
        <img src={iconExercise} alt="Regular exercise" />  
        <div class="tip-content">
            <h3>Regular exercise</h3>
            <p>Exercise improves fitness, aids weight control, elevates mood, and reduces disease risk, fostering wellness and longevity.</p>
        </div>
    </div>
    <div class="tip">
        <img src={iconSleep} alt="Adequate sleep" />
        <div class="tip-content">
            <h3>Adequate sleep</h3>
            <p>Sleep enhances mental clarity, emotional stability, and physical wellness, promoting overall restoration and rejuvenation.</p>
        </div>
    </div>
</section>

<style>

    img {
        max-width: var(--space-800);
        height: auto;
    }

    .tips {
        display: flex;
        flex-direction: column;
        gap: var(--space-500);
        text-align: start;
        padding: var(--space-600) var(--space-300);
        background: var(--gradient);
    }

    .tip {
        display: flex;
        flex-direction: column;
        gap: var(--space-400);
    }

    .tip-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-300);
    }

    .tip h3 {
        font-size: var(--font-md);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-lg);
        letter-spacing: var(--letter-spacing-sm);
        color: var(--blue-900);
    }

    .tip p {
        font-size: var(--font-xs);
        font-weight: var(--w-regular);
        line-height: var(--line-height-xl);
        color: var(--grey-500);
    }

    @media (min-width: 48rem) {

        .tips {
            padding: var(--space-650) var(--space-500);
        }

        .tip {
            flex-direction: row;
            align-items: center;
            gap: var(--space-500);
        }
    }

    @media (min-width: 64rem) {
        .tips {
            padding: var(--space-1200) var(--space-1600);
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--space-500);
        }

        .tip {
            flex-direction: column;
            align-items: flex-start;
            text-align: start;
        }

    }
</style>