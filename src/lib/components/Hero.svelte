<script>
    import logo from '$lib/assets/images/logo.svg';
	import FormBMI from './FormBMI.svelte';
</script>

<section class="hero">
    <header>
        <img class="logo" src={logo} alt="BMI Calculator Logo" />
        <h1 class="title">Body Mass Index Calculator</h1>
        <p class="description">Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</p>
    </header>

    <FormBMI />

</section>

<style>

.hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-400);
        text-align: center;
        padding: 0 var(--space-300);
    }

    .logo {
        width: 100%;
        max-width: var(--space-500);
        height: auto;
        align-self: center;
        margin-bottom: var(--space-100);
        display: block;
    }

    .hero::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: var(--gradient);
        border-radius: 0 0 var(--space-300) var(--space-300);
    }

    header {
        display: flex;
        flex-direction: column;
        gap: var(--space-300);
    }

    .title {
        font-size: var(--font-xl);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-md);
        letter-spacing: var(--letter-spacing-sm);
        color: var(--blue-900);
    }

    .description {
        font-size: var(--font-xs);
        font-weight: var(--w-regular);
        line-height: var(--line-height-xl);
        color: var(--grey-500);
    }

    @media (min-width: 48rem) {

        .hero {
            padding: var(--space-400) var(--space-600);
        }


        .hero::after {
            border-radius: 0 0 var(--space-500) var(--space-500);
        }
    }

    @media (min-width: 64rem) {
        .logo {
            max-width: var(--space-800);
            align-self: flex-start;
        }

        .hero {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-800);
            padding: var(--space-600) var(--space-1200);
            align-items: flex-start;
        }

        header {
            align-items: flex-start;
            text-align: start;
        }
    }


</style>