<script setup>
import { ref, watch, nextTick } from "vue";
import { gsap } from "gsap";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  visible: Boolean,
  onClose: Function,
});

const menuRef = ref(null);
const route = useRoute();
const router = useRouter();
const isActive = (routePath) => route.path === routePath;
const navigate = (path) => {
  router.push(path);
  close();
};

const close = async () => {
  await nextTick();
  if (menuRef.value) {
    gsap.to(menuRef.value, {
      x: 300,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => props.onClose?.(),
    });
  } else {
    props.onClose?.();
  }
};

watch(
  () => props.visible,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      if (menuRef.value) {
        gsap.fromTo(
          menuRef.value,
          { x: 300, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        );
      }
    }
  },
);

const buttonClass = (active) =>
  [
    "flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200",
    active
      ? "bg-blue-100 text-blue-600 font-semibold"
      : "text-gray-700 hover:bg-gray-100 hover:text-blue-500",
  ].join(" ");

const links = [
  { path: "/", name: "文章主页", icon: "pi pi-home mr-2" },
  { path: "/about", name: "个人介绍", icon: "pi pi-id-card mr-2" },
  { path: "/work", name: "我的作品", icon: "pi pi-code mr-2" },
  { path: "/daily", name: "日常活动", icon: "pi pi-check-circle mr-2" },
];
const icon = [
  "pi pi-home mr-2",
  "pi pi-id-card mr-2",
  "pi pi-code mr-2",
  "pi pi-check-circle mr-2",
];
</script>

<template>
  <!-- 遮罩层 -->
  <div
    v-show="visible"
    class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
    @click="close"
  >
    <!-- 抽屉主体 -->
    <div
      ref="menuRef"
      class="absolute top-0 right-0 z-50 flex h-full w-72 flex-col rounded-l-2xl bg-white p-6 shadow-2xl"
      @click.stop
    >
      <!-- 顶部标题 -->
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-800">菜单导航</h2>
        <button
          @click="close"
          class="text-xl text-gray-400 hover:text-gray-600"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>
      <!-- 内建菜单 -->
      <nav class="flex flex-col space-y-2">
        <button
          v-for="link in links"
          :key="link.path"
          @click="navigate(link.path)"
          :class="buttonClass(isActive(link.path))"
        >
          <i :class="link.icon"></i> {{ link.name }}
        </button>
      </nav>
    </div>
  </div>
</template>
