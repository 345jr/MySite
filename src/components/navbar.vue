<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isActive = (routePath) => route.path === routePath;

const navigate = (path) => {
  router.push(path);
};
</script>

<template>
  <nav class="bg-white shadow-md p-4 flex justify-between">
    <div class="flex space-x-4">
      <button
        @click="navigate('/')"
        :class="{
          'text-blue-600 font-bold': isActive('/'),
          'text-gray-700': !isActive('/'),
        }"
        class="px-4 py-2 rounded-md hover:bg-gray-100"
      >
        文章主页
      </button>
      <button
        @click="navigate('/about')"
        :class="{
          'text-blue-600 font-bold': isActive('/about'),
          'text-gray-700': !isActive('/about'),
        }"
        class="px-4 py-2 rounded-md hover:bg-gray-100"
      >
        个人介绍
      </button>
      <button
        @click="navigate('/work')"
        :class="{
          'text-blue-600 font-bold': isActive('/work'),
          'text-gray-700': !isActive('/work'),
        }"
        class="px-4 py-2 rounded-md hover:bg-gray-100"
      >
        我的作品
      </button>
      <button
        @click="navigate('/daily')"
        :class="{
          'text-blue-600 font-bold': isActive('/daily'),
          'text-gray-700': !isActive('/daily'),
        }"
        class="px-4 py-2 rounded-md hover:bg-gray-100"
      >
        日常活动
      </button>
    </div>
  </nav>
</template>
