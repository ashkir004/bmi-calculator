<script>
    import logo from '$lib/assets/images/logo.svg';
</script>

<section class="hero">
    <img src={logo} alt="BMI Calculator Logo" />
    <header>
        <h1 class="title">Body Mass Index Calculator</h1>
        <p class="description">Better understand your weight in relation to your height using our body mass index (BM) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.</p>
    </header>
    <form>
        <h2 class="form-header">Enter your details below</h2>
        <div class="unit-selector">
            <label class="metric-option"><input type="radio" name="unit" value="metric" checked /> Metric</label>
            <label class="imperial-option"><input type="radio" name="unit" value="imperial" /> Imperial</label>
        </div>
        <div class="form-group">
            <label for="weight">Weight</label>
            <input class="weight-input" type="number" id="weight" name="weight" required />
        </div>
        <div class="form-group">
            <label for="height">Height</label>
            <input class="height-input" type="number" id="height" name="height" required />
        </div>
        <div class="bmi-results">
            <p class="bmi-label">Your BMI is... <span class="bmi-value">0</span></p>
            <p class="bmi-description">Your BMI suggests you're a healthy weight. Your ideal weight is between 63.3kgs - 85.2kgs.</p>
        </div>
    </form>
</section>