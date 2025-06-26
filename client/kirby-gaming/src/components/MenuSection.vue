<!-- <template>
    <section class="section">
      <h2>{{ $t('menu') }}</h2>
      <ul>
        <li>{{ $t('coffee') }}</li>
        <li>{{ $t('mocha') }}</li>
        <li>{{ $t('cheesecake') }}</li>
        <li>{{ $t('boba') }}</li>
      </ul>
    </section>
  </template>
   -->

   <template>
    <section class="section">
      <h2>{{ $t('menu') }}</h2>
      <div class="menu-images">
        <img
          v-for="(image, index) in menuImages"
          :key="index"
          :src="image"
          alt="menu item"
        />
      </div>
    </section>
  </template>
  
  <script setup>
  const menuImages = [
    new URL('../assets/menu/01.jpg', import.meta.url).href,
    new URL('../assets/menu/02.jpg', import.meta.url).href,
    new URL('../assets/menu/03.jpg', import.meta.url).href,
    new URL('../assets/menu/04.jpg', import.meta.url).href,
    new URL('../assets/menu/05.jpg', import.meta.url).href
  ]
  </script>
  
  <style scoped>
  .menu-images {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr; /* One column, full width */
    width: 100%; /* Ensure the grid takes full width of parent */
  }
  
  .menu-images img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 170, 255, 0.3);
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  
  .menu-images img:hover {
    transform: scale(1.05);
  }
  </style>
  