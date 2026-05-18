<script>
    import iconGender from '$lib/assets/images/icon-gender.svg';
    import iconAge from '$lib/assets/images/icon-age.svg';
    import iconMuscle from '$lib/assets/images/icon-muscle.svg';
    import iconPregnancy from '$lib/assets/images/icon-pregnancy.svg';
    import iconRace from '$lib/assets/images/icon-race.svg';
</script>

<section class="limitations">
    <header>
        <h2 class="limitations-title">Limitations of BMI</h2>
        <p class="limitations-description">Although BMI is often a practical indicator of healthy weight, it is not suited for every person. Specific groups should carefully consider their BMI outcomes, and in certain cases, the measurement may not be beneficial to use.</p>
    </header>
    <article class="categories">
        <div class="category gender">
            <div class="category-header">
                <img src={iconGender} alt="Gender" />
                <h3>Gender</h3>
            </div>
            <p>The development and body fat composition of girls and boys vary with age. Consequently, a child's age and gender are considered when evaluating their BMI.</p>
        </div>
        <div class="category age">
            <div class="category-header">
                <img src={iconAge} alt="Age" />
                <h3>Age</h3>
            </div>
            <p>In aging individuals, increased body fat and muscle loss may cause BMI to underestimate body fat content.</p>
        </div>
        <div class="category muscle">
            <div class="category-header">
                <img src={iconMuscle} alt="Muscle" />
                <h3>Muscle</h3>
            </div>
            <p>BMI may misclassify muscular individuals as overweight or obese, as it doesn't differentiate muscle from fat.</p>
        </div>
        <div class="category pregnancy">
            <div class="category-header">
                <img src={iconPregnancy} alt="Pregnancy" />
                <h3>Pregnancy</h3>
            </div>
            <p>Expectant mothers experience weight gain due to their growing baby. Maintaining a healthy pre-pregnancy BMI is advisable to minimise health risks for both mother and child.</p>
        </div>
        <div class="category race">
            <div class="category-header">
                <img src={iconRace} alt="Race" />
                <h3>Race</h3>
            </div>
            <p>Certain health concerns may affect individuals of some Black and Asian origins at lower BMIs than others. To learn more, it is advised to discuss this with your GP or practice nurse.</p>
        </div>
    </article>
</section>

<style>

.limitations {
    display: flex;
    flex-direction: column;
    gap: var(--space-700);
    text-align: center;
    padding: var(--space-300);
    background-color: var(--white);
    font-size: var(--font-xs);
    font-weight: var(--w-regular);
    color: var(--grey-500);
    line-height: var(--line-height-xl);
}

.limitations header {
    display: flex;
    flex-direction: column;
    gap: var(--space-400);
}

.limitations-title {
    font-size: var(--font-lg);
    font-weight: var(--w-semibold);
    line-height: var(--line-height-md);
    letter-spacing: var(--letter-spacing-sm);
    color: var(--blue-900);
}

.categories {
    display: flex;
    flex-direction: column;
    gap: var(--space-200);
    text-align: start;
}

.category {
    display: flex;
    flex-direction: column;
    gap: var(--space-200);
    padding: var(--space-300);
    background-color: var(--white);
    border-radius: var(--space-200);
    box-shadow: var(--space-100) var(--space-200) var(--space-400) rgba(0, 0, 0, 0.1);
}

.category-header {
    display: flex;
    flex-direction: row;
    gap: var(--space-200);
    align-items: center;
    color: var(--blue-900);
    font-size: var(--font-sm);
    font-weight: var(--w-semibold);
}

@media (min-width: 48rem) {
    .limitations {
        padding: var(--space-400) var(--space-600);
    }

    .categories {
        display: grid;
        grid-template-columns: repeat(2, minmax(20rem, 1fr));
        justify-content: center;
        column-gap: var(--space-200);
        row-gap: var(--space-300);
    }

    .race {
        grid-column: 1 / -1;
        justify-self: center;
        max-width: 22rem;
    }
}


@media (min-width: 64rem) {

    .limitations {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .limitations header {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        text-align: start;
        max-width: 35rem;
    }

    .categories {
        grid-template-columns: 1fr 1fr 5rem 5rem 1fr 1fr;
        grid-template-rows: auto;
        grid-column: 2 / 4;
        grid-row: 1 / 2;
        justify-self: end;
    }

    .category {
        min-width: 22rem;
        max-width: 22rem;
    }

    .gender {
        grid-column: 4 / 5;
        grid-row: 1 / 2;
        justify-self: start;
    }

    .age {
        grid-column: 2 / 5;
        grid-row: 2 / 3;
        justify-self: end;
    }

    .muscle {
        grid-column: 5 / 6;
        grid-row: 2 / 3;
        justify-self: start;
    }

    .pregnancy {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
        justify-self: end;
    }

    .race {
        grid-column: 3 / 6;
        grid-row: 3 / 4;
        justify-self: start;
    }

}

@media (min-width: 80rem) {
    .limitations {
        padding: 0 var(--space-1800) 0;
    }
}

</style>