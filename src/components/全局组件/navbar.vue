<!-- 导航栏组件 -->

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isActive = (routePath) => route.path === routePath;
const navigate = (path) => {
  router.push(path);
};

const emit = defineEmits([
  "toggle-mobile-menu",
  "play-music",
  "open-music-menu",
]);

const btnClass = (isActive) =>
  [
    "px-4 py-2 rounded-md hover:bg-gray-100",
    isActive ? "text-blue-600 font-bold" : "text-gray-700",
  ].join(" ");

const links = [
  { path: "/", name: "文章主页" },
  { path: "/about", name: "个人介绍" },
  { path: "/work", name: "我的作品" },
  { path: "/daily", name: "日常活动" },
];

const props = defineProps({
  song: String,
  isPlay: Boolean,
});
</script>

<template>
  <nav
    class="z-50 flex w-full items-center justify-between bg-white/80 p-4 shadow-md backdrop-blur-md"
  >
    <!-- 网站标题 -->
    <div class="hidden lg:block">
      <h1 class="ml-24 text-4xl font-bold">
        <span class="text-blue-300">Lo</span><span class="text-black">pop</span>
      </h1>
    </div>

    <!-- 移动端菜单按钮 发送事件-->
    <button @click="emit('toggle-mobile-menu')" class="text-gray-700 lg:hidden">
      <i class="pi pi-bars text-xl"></i>
    </button>
    <!-- 桌面端导航按钮 -->
    <div class="mx-auto hidden space-x-4 lg:mx-0 lg:flex">
      <button
        v-for="link in links"
        :key="link.path"
        @click="navigate(link.path)"
        :class="btnClass(isActive(link.path))"
      >
        {{ link.name }}
      </button>
    </div>

    <!-- 音乐播放器 -->
    <div class="flex items-center space-x-4">
      <div class="text-sm text-gray-500 italic md:block">
        可以点歌哦
        <i class="pi pi-angle-right"></i>
      </div>
      <button @click="emit('play-music')" class="music-btn">
        <i
          :class="props.isPlay ? 'pi pi-pause text-sky-500' : 'pi pi-play'"
        ></i>
      </button>

      <button @click="emit('open-music-menu')" class="music-btn">
        <i class="pi pi-headphones music-icon mr-1.5"></i>
        <span class="text-blue-500">{{ props.song }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
@reference '@/assets/tailwind.css';

.music-btn {
  @apply transform rounded-full p-2 transition-all duration-300 hover:scale-110 hover:bg-gray-100;
}

.music-icon {
  @apply text-lg text-blue-500;
}
</style>
