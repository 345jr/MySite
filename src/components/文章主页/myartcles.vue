<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
  idea: {
    type: Object,
  },
});
</script>

<template>
  <RouterLink
    :to="`/page/${idea.id}`"
    class="block h-full transform duration-300 hover:scale-[1.05]"
  >
    <div
      class="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 big-card-hover"
    >
      <!-- 大屏幕布局 -->
      <div class="hidden h-full sm:flex sm:flex-col">
        <div class="h-48 w-full overflow-hidden">
          <img
            :src="idea.img"
            alt="Article Image"
            class="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div class="flex flex-1 flex-col p-4">
          <h3 class="text-lg font-bold text-gray-800">{{ idea.title }}</h3>
          <p class="mt-1 flex-1 text-sm text-gray-500">{{ idea.summary }}</p>
          <p class="pi pi-calendar-clock mt-2 text-sm text-gray-600">
            {{ idea.time }}
          </p>
        </div>
      </div>

      <!-- 手机端布局 -->
      <div class="flex h-32 flex-row sm:hidden">
        <div class="w-1/3 overflow-hidden">
          <img
            :src="idea.img"
            alt="Article Image"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="flex flex-1 flex-col justify-between p-3">
          <div>
            <h3 class="line-clamp-1 text-xl font-semibold text-gray-800">
              {{ idea.title }}
            </h3>
            <p class="mt-1 line-clamp-2 text-base text-gray-500">
              {{ idea.summary }}
            </p>
          </div>
          <p class="text-sm text-gray-600">发布时间: {{ idea.time }}</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
@reference '@/assets/tailwind.css';
.big-card-hover {
  @apply hover:border hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg ;
}
</style>
