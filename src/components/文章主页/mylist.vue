<!-- 文章+我的喜爱组件 -->

<script setup>
import ArticleCard from "./myartcles.vue";
import BottomList from "@/components/文章主页/BottomList.vue";
import artcleData from "@/data/artcles_data.json";
import gamesData from "@/data/games.json";
import musicData from "@/data/musics.json";
import tasksData from "@/data/tasks.json";
import { ref, onMounted, computed } from "vue";
import { gsap } from "gsap";

const MyIdeas = ref(artcleData);
const Mylove1 = ref(gamesData);
const Mylove2 = ref(musicData);
const Mylove3 = ref(tasksData);

// 引用DOM元素
const gamesCard = ref(null);
const musicsCard = ref(null);
const tasksCard = ref(null);

// 添加移动端轮播状态
const currentCardIndex = ref(0);
const cardTitles = ["BEST游戏", "BEST游戏OST", "待办事项"];

// 切换卡片的方法
const nextCard = () => {
  currentCardIndex.value = (currentCardIndex.value + 1) % 3;
};

const prevCard = () => {
  currentCardIndex.value = (currentCardIndex.value - 1 + 3) % 3;
};

// 计算当前显示的卡片标题
const currentTitle = computed(() => cardTitles[currentCardIndex.value]);

onMounted(() => {
  // 原有动画代码保持不变
  setTimeout(() => {
    if (gamesCard.value) {
      const items = gamesCard.value.querySelectorAll("li");
      if (items.length) {
        gsap.from(items, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    }

    // 为音乐列表应用动画
    if (musicsCard.value) {
      const items = musicsCard.value.querySelectorAll("li");
      if (items.length) {
        gsap.from(items, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        });
      }
    }

    // 为待办事项列表应用动画
    if (tasksCard.value) {
      const items = tasksCard.value.querySelectorAll("li");
      if (items.length) {
        gsap.from(items, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.6,
        });
      }
    }
  }, 100);
});
</script>

<template>
  <div class="flex flex-col items-center space-y-2 py-6">
    <!-- 文章列表部分 -->
    <section class="bg-gray-50 w-full px-6 py-8 lg:px-8 lg:mr-30">
      <div class="w-full sm:max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          📖文章列表📖
        </h2>
        <div
          class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
        >
          <ArticleCard v-for="idea in MyIdeas" :key="idea.id" :idea="idea" />
        </div>
      </div>
    </section>

    <!-- 三个新组件部分 - 支持移动端轮播 -->
    <div class="w-full max-w-6xl sm:mx-auto px-4 lg:ml-30">
      <!-- 移动端导航按钮 -->
      <div class="md:hidden flex justify-between items-center mb-4 border-blue-300 border-2 rounded-l rounded-r">
        <button 
          @click="prevCard" 
          class="bg-blue-300 text-gray-800 font-bold py-2 px-4 "
        >
          <i class="pi pi-chevron-left"></i>
        </button>
        <h3 class="text-lg font-bold  ">{{ currentTitle }}</h3>
        <button 
          @click="nextCard" 
          class="bg-blue-300 text-gray-800 font-bold py-2 px-4 "
        >
          <i class="pi pi-chevron-right"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <!-- 游戏列表 -->
        <div
          class="border-2 border-pink-200 rounded-lg overflow-hidden h-full flex flex-col"
          :class="{'hidden md:flex': currentCardIndex !== 0}"
        >
          <div ref="gamesCard">
            <BottomList title="BEST游戏" :items="Mylove1">
              <template #card="{ items }">
                <div
                  class="bg-red-50 rounded-lg shadow-md p-3 w-full flex-grow flex flex-col min-h-[215px]"
                >
                  <h2
                    class="text-xl font-bold mb-4 flex items-center text-red-700"
                  >
                    <i class="pi pi-thumbs-up mr-2"></i>
                    BEST游戏
                  </h2>
                  <ul class="flex-grow">
                    <li
                      v-for="item in items"
                      :key="item.id"
                      class="mb-2 p-2 border-b last:border-b-0"
                    >
                      <strong>{{ item.title }}</strong
                      >: {{ item.description }}
                    </li>
                  </ul>
                </div>
              </template>
            </BottomList>
          </div>
        </div>

        <!-- 音乐列表 -->
        <div
          class="border-2 border-pink-200 rounded-lg overflow-hidden h-full flex flex-col"
          :class="{'hidden md:flex': currentCardIndex !== 1}"
        >
          <div ref="musicsCard">
            <BottomList title="BEST游戏OST" :items="Mylove2">
              <template #card="{ items }">
                <div
                  class="bg-green-50 rounded-lg shadow-md p-3 w-full flex-grow flex flex-col min-h-[215px]"
                >
                  <h2
                    class="text-xl font-bold mb-4 flex items-center text-green-700"
                  >
                    <i class="pi pi-volume-up mr-2"></i>
                    BEST游戏OST
                  </h2>
                  <ul class="flex-grow">
                    <li
                      v-for="item in items"
                      :key="item.id"
                      class="mb-2 p-2 border-b last:border-b-0"
                    >
                      <strong>{{ item.title }}</strong
                      >: {{ item.description }}
                    </li>
                  </ul>
                </div>
              </template>
            </BottomList>
          </div>
        </div>

        <!-- 待办事项列表 -->
        <div
          class="border-2 border-pink-200 rounded-lg overflow-hidden h-full flex flex-col"
          :class="{'hidden md:flex': currentCardIndex !== 2}"
        >
          <div ref="tasksCard">
            <BottomList title="待办事项" :items="Mylove3">
              <template #card="{ items }">
                <div
                  class="bg-blue-50 rounded-lg shadow-md p-3 w-full flex-grow flex flex-col min-h-[215px]"
                >
                  <h2
                    class="text-xl font-bold mb-4 flex items-center text-blue-700"
                  >
                    <i class="pi pi-check-square mr-2"></i>
                    待办事项
                  </h2>
                  <ul class="flex-grow">
                    <li
                      v-for="item in items"
                      :key="item.id"
                      class="mb-1 p-2 border-b last:border-b-0"
                    >
                      <strong>{{ item.title }}</strong
                      >: {{ item.description }}
                    </li>
                  </ul>
                </div>
              </template>
            </BottomList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
