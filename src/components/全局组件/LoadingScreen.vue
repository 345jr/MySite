<script setup>
import { ref, onMounted, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
});

const loadingText = ref("欢迎来到我的世界");
const loadingProgress = ref(0);
const loadingContainer = ref(null);
const logoElements = ref(null);
const isVisible = ref(true);

// 加载文字动画效果
onMounted(() => {
  // 进度条动画
  gsap.to(loadingProgress, {
    value: 100,
    duration: 2.5,
    ease: "power2.inOut",
  });

  // Logo动画
  if (logoElements.value) {
    const elements = logoElements.value.querySelectorAll(".logo-element");
    gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
      },
    );
  }
});

// 监听加载状态变化退出动画
watch(
  () => props.isLoading,
  (newValue) => {
    if (!newValue && loadingContainer.value) {
      gsap.to(loadingContainer.value, {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: "power3.out",
        onComplete: () => {
          isVisible.value = false;
        },
      });
    }
  },
  { immediate: true },
);
</script>

<template>
  <div
    v-show="isLoading || isVisible"
    ref="loadingContainer"
    class="loading-screen"
  >
    <div class="loading-content">
      <!-- 自定义Logo动画 -->
      <div ref="logoElements" class="logo-animation">
        <span class="logo-element text-blue-500"
          ><i class="pi pi-book text-4xl"></i
        ></span>
        <span class="logo-element text-blue-600"
          ><i class="pi pi-code text-4xl"></i
        ></span>
        <span class="logo-element text-blue-700"
          ><i class="pi pi-heart text-4xl"></i
        ></span>
      </div>

      <h2 class="site-name">Lopop个人博客</h2>
      <p class="loading-text">{{ loadingText }}</p>

      <!-- 进度条 -->
      <div class="progress-container">
        <div
          class="progress-bar"
          :style="{ width: `${loadingProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- 底部波浪效果 -->
    <div class="wave-container">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.logo-animation {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.logo-element {
  display: inline-block;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.site-name {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #2563eb, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.loading-text {
  margin-top: 10px;
  font-size: 1.2rem;
  color: #4b5563;
  font-weight: 500;
  min-width: 100px;
  text-align: center;
}

.progress-container {
  width: 250px;
  height: 6px;
  background-color: rgba(219, 234, 254, 0.7);
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  border-radius: 10px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* 波浪效果 */
.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18.17 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" fill="%233b82f6" opacity=".25"/></svg>')
    repeat-x;
  background-size: 1200px 100%;
  animation: wave 15s linear infinite;
}

.wave1 {
  animation: wave 20s linear infinite;
  z-index: 1;
  opacity: 0.7;
  animation-delay: 0s;
  bottom: 0;
}

.wave2 {
  animation: wave 15s linear infinite;
  z-index: 0;
  opacity: 0.3;
  animation-delay: -5s;
  bottom: 10px;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 添加一些响应式调整 */
@media (max-width: 640px) {
  .site-name {
    font-size: 2rem;
  }

  .progress-container {
    width: 200px;
  }
}
</style>
