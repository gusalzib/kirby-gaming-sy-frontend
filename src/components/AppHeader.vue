<template>
    <header class="site-header">
      <div class="left-group">
        <h1>{{ $t('title') }}</h1>
        <nav class="nav-links">
          <router-link to="/">{{ $t('home') }}</router-link>
          <router-link to="/about">{{ $t('about') }}</router-link>
          <router-link to="/menu">{{ $t('menu') }}</router-link>
        </nav>
      </div>
      <LanguageToggle />
    </header>
  </template>

  
  <script>
  import LanguageToggle from './LanguageToggle.vue'
  
  export default {
    components: {
      LanguageToggle
    }
  }
  </script>
  <style scoped>
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #0d0d0d;
    color: #f0f0f0;
    border-bottom: 2px solid #00aaff;
    flex-wrap: wrap;
  }
  
  .left-group {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  h1 {
    font-size: 1.8rem;
    color: #00aaff;
    margin: 0;
  }
  
  .nav-links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  
  .nav-links a {
    color: #f0f0f0;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .nav-links a:hover {
    color: #00aaff;
    text-decoration: underline;
  }
  </style>
  