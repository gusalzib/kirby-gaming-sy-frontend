<template>
    <section class="gallery">
      <h2>{{ $t('gallery') }}</h2>
      <div class="grid">
        <img
          v-for="(photo, index) in photos"
          :key="index"
          :src="photo"
          @click="openPhoto(photo)"
          alt="Gaming Hall Photo"
        />
      </div>
  
      <!-- Modal to show enlarged photo -->
      <div v-if="selectedPhoto" class="modal" @click="closePhoto">
        <img :src="selectedPhoto" class="modal-image" />
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Replace with your actual image paths
  const photos = ref([
    '/images/hall1 (1).jpeg',
    '/images/hall1 (2).jpeg',
    '/images/hall1 (3).jpeg',
    '/images/hall1 (4).jpeg',
    '/images/hall1 (5).jpeg',
    '/images/hall1 (6).jpeg',
    '/images/hall1 (7).jpeg',
    '/images/hall1 (8).jpeg',
    '/images/hall1 (9).jpeg',
    '/images/hall1 (10).jpeg',
    '/images/hall1 (11).jpeg',
    '/images/hall1 (12).jpeg',
    '/images/hall1 (13).jpeg',
    '/images/hall1 (14).jpeg',
    '/images/hall1 (15).jpeg',
    '/images/hall1 (16).jpeg',
    '/images/hall1 (17).jpeg',
    '/images/hall1 (18).jpeg',
    '/images/hall1 (19).jpeg',
    '/images/hall1 (20).jpeg',
    '/images/hall1 (21).jpeg',
    '/images/hall1 (22).jpeg',
  ])
  
  const selectedPhoto = ref(null)
  
  const openPhoto = (photo) => {
    selectedPhoto.value = photo
  }
  
  const closePhoto = () => {
    selectedPhoto.value = null
  }
  </script>
  
  <style scoped>
  .gallery {
    padding: 2rem;
    color: #f0f0f0;
    background-color: #0d0d0d;
  }
  
  .gallery h2 {
    font-size: 2rem;
    color: #00aaff;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
  
  .grid img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .grid img:hover {
    transform: scale(1.03);
  }
  
  /* Modal styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-image {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 12px;
  }
  </style>
  