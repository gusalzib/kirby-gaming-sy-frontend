<template>
    <section class="hero">
      <img src="@/assets/logos/android-chrome-512x512.png" alt="Logo" class="hero-logo" />
      <div class="hero-content">
        <h2>{{ $t('welcome') }}</h2>
        <p>{{ $t('tagline') }}</p>
      </div>
    </section>
  </template>
  
  <style scoped>
  .hero {
    padding: 4rem 2rem;
    background: linear-gradient(135deg, #0d0d0d 0%, #001f33 100%);
    border-radius: 12px;
    text-align: center;
    color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .hero-logo {
    width: 150px;        /* Adjust size as needed */
    height: auto;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 0 5px #00aaff);
    transition: transform 0.3s ease, filter 0.3s ease;
    cursor: default;
  }
  
  .hero-logo:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 15px #00aaff);
  }
  
  .hero-content h2 {
    font-size: 2.5rem;
    color: #00aaff;
    margin-bottom: 1rem;
  }
  
  .hero-content p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  /* Responsive for smaller screens */
  @media (max-width: 480px) {
    .hero-logo {
      width: 100px;
      margin-bottom: 1rem;
    }
  
    .hero-content h2 {
      font-size: 2rem;
    }
  
    .hero-content p {
      font-size: 1rem;
      max-width: 90%;
    }
  }
  </style>
  