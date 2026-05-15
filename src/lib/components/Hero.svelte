<script>
    import logo from '$lib/assets/images/logo.svg';
	import FormBMI from './FormBMI.svelte';
</script>

<section class="hero">
    <img src={logo} alt="BMI Calculator Logo" />
    <header>
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
        gap: var(--space-400);
        text-align: center;
        padding: var(--space-300);
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


</style>