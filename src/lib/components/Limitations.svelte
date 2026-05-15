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
    <article class="limitation-content">
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