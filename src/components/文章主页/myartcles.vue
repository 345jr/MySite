

<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
  idea: {
    type: Object,
  },
});
</script>

<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <img :src=idea.img alt="Article Image" class="w-full h-40 object-cover">
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800">{{ idea.title }}</h3>
      <p class="text-sm text-gray-500 mt-1">{{ idea.summary }}</p>
      <p>发布时间 :{{ idea.time }}</p>
      <RouterLink :to="`/page/${idea.id}`" class="text-blue-500 mt-2 hover:text-rose-900">查看更多</RouterLink>
    </div>
  </div>
</template>
