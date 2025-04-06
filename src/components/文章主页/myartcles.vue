<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
  idea: {
    type: Object,
  },
});
</script>

<template>
  <RouterLink :to="`/page/${idea.id}`" class="block h-full transform tracking-all duration-300 hover:scale-[1.05]">
    <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col 
    hover:bg-blue-50
      hover:border hover:border-blue-200">
      <!-- 大屏幕布局 -->
      <div class="hidden sm:flex sm:flex-col h-full">
        <div class="w-full h-48 overflow-hidden">
          <img :src="idea.img" alt="Article Image" class="w-full h-full object-cover" loading="lazy">
        </div>
        <div class="p-4 flex-1 flex flex-col">
          <h3 class="text-lg font-bold text-gray-800">{{ idea.title }}</h3>
          <p class="text-sm text-gray-500 mt-1 flex-1">{{ idea.summary }}</p>
          <p class="pi pi-calendar-clock text-sm text-gray-600 mt-2">{{ idea.time }}</p>
        </div>
      </div>

      <!-- 手机端布局 -->
      <div class="sm:hidden flex flex-row h-32">
        <div class="w-1/3 overflow-hidden">
          <img :src="idea.img" alt="Article Image" class="w-full h-full object-cover">
        </div>
        <div class="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-semibold text-gray-800 line-clamp-1">{{ idea.title }}</h3>
            <p class="text-base text-gray-500 mt-1 line-clamp-2">{{ idea.summary }}</p>
          </div>
          <p class="text-sm text-gray-600">发布时间: {{ idea.time }}</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
