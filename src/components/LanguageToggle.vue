<template>
    <div class="lang-toggle">
      <button @click="switchLang('ar')">العربية</button>
      <button @click="switchLang('en')">English</button>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()
  
  function switchLang(lang) {
    locale.value = lang
    document.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }
  </script>
  
  <style>
  .lang-toggle button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  </style>
  