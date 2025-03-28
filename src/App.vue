<script setup>
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import Navbar from '@/components/全局组件/navbar.vue';
import Footer from '@/components/全局组件/footer.vue';
import LoadingScreen from '@/components/全局组件/LoadingScreen.vue';
import Time from '@/components/全局组件/time.vue';

const isLoading = ref(true);
const mainContent = ref(null);

// 预加载
onMounted(() => {
  // 字体加载
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
</script>

<template>
  <!-- 加载页面 -->
  <LoadingScreen :isLoading="isLoading" />

  <!-- 主应用内容，当加载完成后显示 -->
  <div 
    ref="mainContent" 
    :class="{ 'invisible': isLoading, 'visible': !isLoading }" 
    class="transition-all duration-500"
  >
    <Navbar />
    <main class="min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
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
</style>

