<!-- 代码记录学习组件 -->

<script setup>
import { ref, onMounted , nextTick } from "vue";
import gsap from "gsap";
import languageData from "@/data/codelang.json";
import axios from 'axios';

// 计算阶段
// const languages = ref(
//   languageData.map((lang) => {
//     const stage =Math.floor(lang.days / 5) + 1;
//     const remainingDays = lang.days % 5;
//     return {
//       ...lang, //id ,名字 ，天数 ，技术栈
//       stage,
//       remainingDays,
//     };
//   })
// );

const getYourLangData = async () => {
  try {
    const response = await axios.get( 'localhost:8080/api/lang');
      
  }  
  catch (error) {
    
  }
}
// 获取阶段文本
const getStageText = (stage) => {
  switch (stage) {
    case 1:
      return "初级";
    case 2:
      return "中级";
    case 3:
      return "高级";
    default:
      return "未知";
  }
};

// 获取阶段对应的样式类
const getStageClass = (stage) => {
  return `stage-${Math.min(stage, 3)}`; // 限制最高阶段为3
};

const barRefs = {};

// 动画效果
onMounted(async() => {
  await nextTick();
  languages.value.forEach((lang) => {
    const bar = barRefs[lang.id];
    if (bar) {
      gsap.from(bar, {
        width: 0, 
        duration: 1, 
        ease: "power2.out", 
        delay: lang.id * 0.1, 
      });
    }
  });
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">编程语言学习进度</h1>
    <h3 class="mb-5">连续学习5天进入下一个阶段</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="lang in languages"
        :key="lang.id"
        class="p-4 bg-gray-100 rounded-lg"
      >
        <h2 class="text-2xl font-bold">{{ lang.name }}</h2>
        <p class="text-sm text-gray-600">技术栈: {{ lang.stack }}</p>
        <p class="text-sm text-gray-600">
          阶段: {{ getStageText(lang.stage) }}
        </p>
        <div class="w-full bg-gray-200 rounded-full h-4 mt-1">
          <div
            :ref="el => (barRefs[lang.id] = el)"
            class="h-4 rounded-full transition-all duration-300"
            :class="getStageClass(lang.stage)"
            :style="{ width: `${Math.min(lang.remainingDays * 20  , 100)}%` }"
          ></div>
        </div>
        <p class="text-xl mt-1">连续使用: {{ lang.days }} 天</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage-1 { background-color: #93c5fd; } /* 初级 */
.stage-2 { background-color: #60a5fa; } /* 中级 */
.stage-3 { background-color: #2563eb; } /* 高级 */
</style>