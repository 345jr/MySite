<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import advicesData from '@/data/advices.json';


const advices = ref(advicesData.advices);

const currentAdvice = ref(advices.value[0]);
const adviceText = ref(null);

// 随机获取一条谏言
const getRandomAdvice = () => {
  const randomIndex = Math.floor(Math.random() * advices.value.length);
  
  // 使用GSAP实现淡出动画
  gsap.to(adviceText.value, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.out",
    onComplete: () => {
      currentAdvice.value = advices.value[randomIndex];
      // 淡入新谏言
      gsap.fromTo(adviceText.value, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          ease: "power3.out"
        }
      );
    }
  });
};

onMounted(() => {
  // 初始加载动画
  gsap.from(".game-window", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "back.out(1.7)"
  });
  
  getRandomAdvice();
});
</script>

<template>
  <div class="w-full p-2 md:p-3">
    <div class="bg-[#1a4b8c] border-4 border-[#0d3a6e] rounded-lg shadow-lg shadow-black/20 ring-2 ring-inset ring-[#0a2e57] overflow-hidden">
      <div class="bg-[#1a4b8c] text-white px-3 py-2 flex justify-between items-center border-b-2 border-[#0a2e57]">
        <span class=" tracking-wider">每日谏言</span>
      </div>
      
      <div class="p-3 md:p-4 flex flex-col items-center bg-[#2a6fc9]">
        <div 
          ref="adviceText"
          class="text-white text-center mb-5 leading-relaxed px-3 py-2 bg-[#3d8ae5] rounded border-2 border-[#0a2e57] min-h-[80px] md:min-h-[100px] w-full flex items-center justify-center  text-sm md:text-base"
        >
          "{{ currentAdvice }}"
        </div>
        
        <button 
          @click="getRandomAdvice" 
          class="bg-[#ff6b6b] text-white px-4 py-2 rounded font-bold border-b-4 border-[#d45555] hover:bg-[#d45555] active:translate-y-1 active:border-b-0 transition-all duration-100  text-sm"
        >
          换一条
        </button>
      </div>
    </div>
  </div>
</template>