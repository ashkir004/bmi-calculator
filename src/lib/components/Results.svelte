<script>
    import manEating from '$lib/assets/images/image-man-eating.webp';
</script>


<section class="results">
    <header class="results-header">
        <img src={manEating} alt="Man eating" />
    </header>
    <div class="results-content">
        <h1 class="results-title">What your BMI result means</h1>
        <p class="results-description">A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.</p>
    </div>
</section>

<style>
    img {
        width: 100%;
        height: auto;
    }

    .results {
        display: flex;
        flex-direction: column;
        gap: var(--space-600);
        text-align: start;
    }
    
    .results-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-400);
        padding: 0 var(--space-300);
    }

    .results-title {
        font-size: var(--font-lg);
        font-weight: var(--w-semibold);
        line-height: var(--line-height-md);
        letter-spacing: var(--letter-spacing-sm);
        color: var(--blue-900);
    }

    .results-description {
        font-size: var(--font-xs);
        font-weight: var(--w-regular);
        line-height: var(--line-height-xl);
        color: var(--grey-500);
    }

    @media (min-width: 48rem) {
        .results {
            flex-direction: row;
            align-items: center;
            gap: var(--space-800);
        }

        .results-header {
            flex-basis: 45%;
            align-self: stretch;
        }

        .results-header img {
            height: 100%;
            object-fit: cover;
            object-position: center right;
        }
        
        .results-content {
             flex-basis: 55%;
        }
        
    }

    @media (min-width: 64rem) {

        .results {
            padding-inline: var(--space-1000);
            gap: var(--space-800);
        }

        .results-header, .results-content {
            flex-basis: 50%;
        }

        .results-header img {
            object-position: center;
        }

        .results-title {
            font-size: var(--font-xl);
            line-height: var(--line-height-lg);
        }
    }

    @media (min-width: 80rem) {
        .results {
            padding-inline: var(--space-1800);
            gap: var(--space-1000);
        }
    }

</style>