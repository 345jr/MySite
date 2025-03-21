<script setup>
  import { RouterView } from 'vue-router';
  import Mynav from '@/components/全局组件/navbar.vue';
  import Footer from '@/components/全局组件/footer.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Mynav/>
    <main class="flex-grow">
      <RouterView/>
    </main>
    <Footer/>
  </div>
</template>

