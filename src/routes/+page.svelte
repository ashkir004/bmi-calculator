<script>
    import Hero from '$lib/components/Hero.svelte';
	import Results from '$lib/components/Results.svelte';
    import Tips from '$lib/components/Tips.svelte';
	import Limitations from '$lib/components/Limitations.svelte';
</script>

<main>
    <Hero />

    <Results />

    <Tips />

    <Limitations />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: var(--space-700);
        margin: var(--space-300) auto var(--space-600);
    }

    @media (min-width: 80rem) {
        main {
            gap: var(--space-1000);
            margin-bottom: var(--space-1300);
        }
    }
</style>
