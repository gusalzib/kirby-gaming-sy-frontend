<template>
  <AppHeader />
  <section class="about">
    <div class="about-container">
      <h2>{{ $t('aboutTitle') }}</h2>
      <p>{{ $t('aboutText') }}</p>

      <div class="features">
        <div class="feature">
          🎮 <span>{{ $t('featureGames') }}</span>
        </div>
        <div class="feature">
          🍰 <span>{{ $t('featureDesserts') }}</span>
        </div>
        <div class="feature">
          ☕ <span>{{ $t('featureDrinks') }}</span>
        </div>
        <div class="feature">
          👥 <span>{{ $t('featureCommunity') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
</script>

<style scoped>
.about {
  padding: 3rem 2rem;
  background-color: #0d0d0d;
  color: #f0f0f0;
  text-align: center;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  color: #00aaff;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.feature {
  background-color: #001f33;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
