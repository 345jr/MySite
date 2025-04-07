<script setup>
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import navbar from '@/components/全局组件/navbar.vue';
import phoneMenu from '@/components/全局组件/phoneMenu.vue';
import musicMenu from './components/全局组件/musicMenu.vue';
import fool from '@/components/全局组件/footer.vue';
import LoadingScreen from '@/components/全局组件/LoadingScreen.vue';


const isLoading = ref(true);
const mainContent = ref(null);
const isMenuOpen = ref(false);
const isMusicMenuOpen = ref(false);
const isPlaying = ref(false);
const selectSong =ref(null);

// 预加载
onMounted(() => {
  const fontLoader = new Promise((resolve) => {
    document.fonts.ready.then(() => {
      console.log('字体已加载完成');
      resolve();
    });
  });

  // 其他资源加载
  const resourceLoader = new Promise((resolve) => {
    setTimeout(() => {
      console.log('资源加载完成');
      resolve();
    }, 2500);
  });

  // 等待所有资源加载完成
  Promise.all([fontLoader, resourceLoader])
    .then(() => {
      // 所有资源加载完成后，隐藏加载页面
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    })
    // 出错时也要关闭加载页面
    .catch(error => {
      console.error('资源加载出错:', error);
      isLoading.value = false;
    });
});

// 监听加载状态变化，添加内容进入动画
watch(() => isLoading.value, (newValue) => {
  if (!newValue && mainContent.value) {
    // 加载完成后，为主内容添加进入动画
    gsap.fromTo(mainContent.value,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      }
    );
  }
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const toggleMusicMenu = () => {
  isMusicMenuOpen.value = !isMusicMenuOpen.value
}
const playMusic = async () => {
  isPlaying.value = !isPlaying.value;
};

const handleSelectSong = async (song) => {
  selectSong.value = song;
};

const handleIsPlay = async() => {
    isPlaying.value = !isPlaying.value;
};
</script>

<template>
  <!-- 加载页面 -->
  <LoadingScreen :isLoading="isLoading" />

  <!-- 主应用内容 -->
  <div ref="mainContent" :class="{ 'invisible': isLoading, 'visible': !isLoading }" class="transition-all duration-500">
    <navbar @toggle-mobile-menu="toggleMenu" @play-music="playMusic" @open-music-menu="toggleMusicMenu" :isPlay="isPlaying" :song="selectSong" />
    <main class="min-h-screen bg-site-background">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <img src="@/assets/wave.svg" class="bg-site-background " />
    <fool />
    <phoneMenu :visible="isMenuOpen" :onClose="() => (isMenuOpen = false)" />
    <musicMenu :visible="isMusicMenuOpen" :playMusic="isPlaying" @select-song="handleSelectSong"  @is-play="handleIsPlay"/>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.bg-site-background {
  background-color: #f9fbfd;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23c7dff9' fill-opacity='0.51' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
