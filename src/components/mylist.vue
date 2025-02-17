<script setup>
import ArticleCard from './myartcles.vue';
import Data from '@/data.json'
import { ref } from 'vue';
const MyIdeas = ref(Data);

</script>

<template>
  <section class="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">文章列表</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <ArticleCard v-for="idea in MyIdeas" :key="idea.id" :idea="idea" />
      </div>
    </div>
  </section>
</template>
