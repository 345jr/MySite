<!-- 气泡作品展示组件 -->

<script setup>
import Data from "@/data/works_data.json";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const projects = ref(Data);
const bubbles = ref([]);
const selectedProject = ref(null);

// 气泡颜色数组
const bubbleColors = [
  "bg-blue-200/30",
  "bg-purple-200/30",
  "bg-pink-200/30",
  "bg-green-200/30",
  "bg-yellow-200/30",
];

// 气泡动画
onMounted(() => {
  bubbles.value.forEach((bubble, index) => {
    gsap.fromTo(
      bubble,
      { x: 0, y: 0 },
      {
        x: () => Math.cos(Date.now() * 0.002 + index) * 280,
        y: () => Math.sin(Date.now() * 0.002 + index) * 280,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1,
      },
    );
  });
});

// 点击显示详情
const showDetails = (project) => {
  selectedProject.value = project;
  gsap.fromTo(
    ".detail-card",
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" },
  );
};

// 关闭详情
const closeDetails = () => {
  gsap.to(".detail-card", {
    scale: 0,
    opacity: 0,
    duration: 0.3,
    onComplete: () => (selectedProject.value = null),
  });
};
</script>

<template>
  <section
    class="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900"
  >
    <!-- 中心头像 -->
    <div
      class="absolute z-10"
      :style="{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }"
    >
      <img
        src="https://asset.lopop.top/public/other-images/avatar.webp"
        class="h-24 w-24 transform rounded-full border-4 border-white object-cover shadow-2xl transition-transform duration-300 hover:scale-110"
        alt="Avatar"
      />
    </div>

    <!-- 气泡 -->
    <div
      v-for="(project, index) in projects"
      :key="project.id"
      ref="bubbles"
      :class="[
        'bubble absolute flex h-28 w-28 transform cursor-pointer items-center justify-center rounded-full backdrop-blur-md transition-transform duration-300 hover:scale-110',
        bubbleColors[index % bubbleColors.length],
      ]"
      :style="{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }"
      @click="showDetails(project)"
    >
      <div class="text-center text-white">
        <h3 class="truncate px-2 text-sm font-semibold">{{ project.name }}</h3>
        <p class="text-xs opacity-75">{{ project.date }}</p>
      </div>
    </div>

    <!-- 详情卡片 - 改为固定居中 -->
    <transition name="fade">
      <div
        v-if="selectedProject"
        class="detail-card fixed top-1/2 left-1/2 z-20 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/95 p-6 shadow-2xl backdrop-blur-lg"
      >
        <button
          @click="closeDetails"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h3 class="text-xl font-bold text-indigo-900">
          {{ selectedProject.name }}
        </h3>
        <p class="text-sm text-gray-600">
          开发时间：{{ selectedProject.date }}
        </p>
        <p class="mt-2 text-gray-800">
          <strong>技术栈：</strong> {{ selectedProject.stack }}
        </p>
        <p class="mt-2 text-gray-800">
          <strong>简介：</strong> {{ selectedProject.description }}
        </p>
        <p class="mt-2 text-gray-700 italic">
          <strong>评价：</strong> {{ selectedProject.review }}
        </p>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
