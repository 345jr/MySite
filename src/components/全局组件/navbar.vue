<!-- 导航栏组件 -->

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref,  watch , nextTick } from "vue";
import { gsap } from "gsap";

const route = useRoute();
const router = useRouter();
const isMenuOpen = ref(false);
const menuRef = ref(null);
const openMenu = ref(false);

const isActive = (routePath) => route.path === routePath;

const navigate = (path) => {
  router.push(path);
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  if (isMenuOpen.value) {
    gsap.to(menuRef.value, { x: 300, opacity: 0, duration: 0.5, ease: "power2.out", onComplete: () => (isMenuOpen.value = false) }); 
  } else {
    isMenuOpen.value = !isMenuOpen.value;
    openMenu.value =!openMenu.value;
  }
  
};

// 监听菜单状态变化，添加动画
watch(isMenuOpen, async (newValue , oldValue) => {
  await nextTick();
  console.log(newValue + " | " + menuRef.value);
  
  if (newValue && menuRef.value) {
    // 菜单打开动画
    gsap.fromTo(
      menuRef.value,
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  } 
});
</script>

<template>
  <nav class="w-full bg-white shadow-md p-4 flex justify-between items-center">
    <!-- 网站标题 -->
    <div class="hidden lg:block">
      <h1 class="text-4xl font-bold ml-24">
        <span class="text-blue-300">Lo</span><span class="text-black">pop</span>
      </h1>
    </div>

    <!-- 移动端菜单按钮 -->
    <button @click="toggleMenu" class="lg:hidden text-gray-700">
      <i class="pi pi-bars text-xl"></i>
    </button>

    <!-- 桌面端导航按钮 -->
    <div class="hidden lg:flex space-x-4 mx-auto lg:mx-0">
      <button @click="navigate('/')" :class="{
      'text-blue-600 font-bold': isActive('/'),
      'text-gray-700': !isActive('/'),
    }" class="px-4 py-2 rounded-md hover:bg-gray-100">
        文章主页
      </button>
      <button @click="navigate('/about')" :class="{
      'text-blue-600 font-bold': isActive('/about'),
      'text-gray-700': !isActive('/about'),
    }" class="px-4 py-2 rounded-md hover:bg-gray-100">
        个人介绍
      </button>
      <button @click="navigate('/work')" :class="{
      'text-blue-600 font-bold': isActive('/work'),
      'text-gray-700': !isActive('/work'),
    }" class="px-4 py-2 rounded-md hover:bg-gray-100">
        我的作品
      </button>
      <button @click="navigate('/daily')" :class="{
      'text-blue-600 font-bold': isActive('/daily'),
      'text-gray-700': !isActive('/daily'),
    }" class="px-4 py-2 rounded-md hover:bg-gray-100">
        日常活动
      </button>
    </div>

    <!-- 移动端导航菜单 -->
    <div v-show="isMenuOpen" class="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 lg:hidden"
      @click="toggleMenu">
      <div ref="menuRef" class="absolute right-0 top-0 h-full w-64 bg-white shadow-lg" @click.stop>
        <div class="flex justify-end p-4">
          <button @click="toggleMenu" class="text-gray-700">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <div class="flex flex-col p-4 space-y-2">
          <button @click="navigate('/')" :class="{
      'text-blue-600 font-bold': isActive('/'),
      'text-gray-700': !isActive('/'),
    }" class="px-4 py-3 rounded-md hover:bg-gray-100 text-left">
            文章主页
          </button>
          <button @click="navigate('/about')" :class="{
      'text-blue-600 font-bold': isActive('/about'),
      'text-gray-700': !isActive('/about'),
    }" class="px-4 py-3 rounded-md hover:bg-gray-100 text-left">
            个人介绍
          </button>
          <button @click="navigate('/work')" :class="{
      'text-blue-600 font-bold': isActive('/work'),
      'text-gray-700': !isActive('/work'),
    }" class="px-4 py-3 rounded-md hover:bg-gray-100 text-left">
            我的作品
          </button>
          <button @click="navigate('/daily')" :class="{
      'text-blue-600 font-bold': isActive('/daily'),
      'text-gray-700': !isActive('/daily'),
    }" class="px-4 py-3 rounded-md hover:bg-gray-100 text-left">
            日常活动
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
