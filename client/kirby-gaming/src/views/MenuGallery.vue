<template>
    <AppHeader />
    <section class="menu-gallery section">
      <h2>{{ $t('menu') }}</h2>
      <div class="image-grid">
        <img
          v-for="(image, index) in menuImages"
          :key="index"
          :src="image"
          alt="menu image"
        />
      </div>
    </section>
  </template>
  
  <script setup>
  import AppHeader from '../components/AppHeader.vue'
  const menuImages = [
    new URL('../assets/menu/01.jpg', import.meta.url).href,
    new URL('../assets/menu/02.jpg', import.meta.url).href,
    new URL('../assets/menu/03.jpg', import.meta.url).href,
    new URL('../assets/menu/04.jpg', import.meta.url).href,
    new URL('../assets/menu/05.jpg', import.meta.url).href
  ]
  </script>
  
  <style scoped>
.image-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr; /* One column, full width */
  width: 100%; /* Ensure the grid takes full width of parent */
}

.image-grid img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 170, 255, 0.2);
  transition: transform 0.3s ease;
}

.image-grid img:hover {
  transform: scale(1.03);
}

  </style>
  