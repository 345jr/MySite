<!-- 文章+我的喜爱组件 -->

<script setup>
import ArticleCard from "./myartcles.vue";
import BottomList from "@/components/文章主页/BottomList.vue";
import artcleData from "@/data/artcles_data.json";
import gamesData from "@/data/games.json";
import musicData from "@/data/musics.json";
import tasksData from "@/data/tasks.json";
import { ref, onMounted, computed  , nextTick} from "vue";
import { gsap } from "gsap";

const MyIdeas = ref(
  [...artcleData].sort((a, b) => new Date(b.uptime) - new Date(a.uptime)),
);
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



// 计算当前显示的卡片标题
const currentTitle = computed(() => cardTitles[currentCardIndex.value]);

onMounted(() => {
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

const currentPage = ref(1)
const pageSize = 6
function nextPage() {
  if (currentPage.value < totalPages.value) {
    animateCardExit(() => currentPage.value++)
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    animateCardExit(() => currentPage.value--)
  }
}
const totalPages = computed(() =>
  Math.ceil(MyIdeas.value.length / pageSize)
)

const pagedIdeas = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return MyIdeas.value.slice(start, start + pageSize)
})

function animateCardExit(callback) {
  const cards = document.querySelectorAll('.article-card')
  gsap.to(cards, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    onComplete: () => {
      callback()
      nextTick(() => {
        gsap.fromTo(
          '.article-card',
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3 }
        )
      })
    }
  })
}
</script>

<template>
  <div class="flex flex-col items-center space-y-2">
    <div class="felx flex-row">
      <!-- 文章列表部分 -->
      <section class="w-full px-6 py-8 lg:px-8">
        <div class="mx-auto w-full sm:max-w-4xl">
          <div class="mb-10 flex items-center justify-end">
            <!-- 分页按钮 -->
            <div class="flex gap-4 ">
              <button @click="prevPage" :disabled="currentPage === 1"
                class="btn-page">
                <i class="pi pi-chevron-left pt-3 pr-2"></i>
                <p class="btn-text ">上页</p>
                
              </button>
              <div class="mt-3 block h-6 w-1 bg-sky-700 rounded-full "></div>
              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="btn-page">                
                <p class="btn-text ">下页</p> 
                <i class="pi pi-chevron-right pt-3 pl-2"></i>               
              </button>
            </div>

            <!-- 标题右对齐 -->
            <h2 class="pl-4 bg-sky-500 bg-clip-text text-right text-2xl font-bold text-transparent lg:text-4xl">             
              <span class="text-shadow-sm">思绪日志</span>        
            </h2>
              <p class="pi pi-circle-fill pl-2 pt-1 scale-150 text-cyan-400 animate-ping-slow drop-shadow-[0_0_6px_#22d3ee]"></p>
          </div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <ArticleCard v-for="idea in pagedIdeas" :key="idea.id" :idea="idea" class="article-card"/>
          </div>
        </div>
      </section>
    </div>

    <!-- 公告牌 -->
    <div class="mb-5 w-full max-w-6xl px-4 sm:mx-auto">
      <!-- 移动端导航按钮 -->
      <div class="mb-4 flex items-center justify-between rounded-l rounded-r border-2 border-blue-300 md:hidden">
        <button @click="prevCard" class="bg-blue-300 px-4 py-2 font-bold text-gray-800">
          <i class="pi pi-chevron-left"></i>
        </button>
        <h3 class="text-lg font-bold">{{ currentTitle }}</h3>
        <button @click="nextCard" class="bg-blue-300 px-4 py-2 font-bold text-gray-800">
          <i class="pi pi-chevron-right"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <!-- 游戏列表 -->
        <div class="flex h-full flex-col overflow-hidden rounded-lg border-2 border-pink-200"
          :class="{ 'hidden md:flex': currentCardIndex !== 0 }">
          <div ref="gamesCard">
            <BottomList title="BEST游戏" :items="Mylove1">
              <template #card="{ items }">
                <div class="flex min-h-[215px] w-full flex-grow flex-col rounded-lg bg-red-50 p-3 shadow-md">
                  <h2 class="mb-4 flex items-center text-xl font-bold text-red-700">
                    <i class="pi pi-thumbs-up mr-2"></i>
                    BEST游戏
                  </h2>
                  <ul class="flex-grow">
                    <li v-for="item in items" :key="item.id" class="mb-2 border-b p-2 last:border-b-0">
                      <strong>{{ item.title }}</strong>: {{ item.description }}
                    </li>
                  </ul>
                </div>
              </template>
            </BottomList>
          </div>
        </div>

        <!-- 音乐列表 -->
        <div class="flex h-full flex-col overflow-hidden rounded-lg border-2 border-pink-200"
          :class="{ 'hidden md:flex': currentCardIndex !== 1 }">
          <div ref="musicsCard">
            <BottomList title="BEST游戏OST" :items="Mylove2">
              <template #card="{ items }">
                <div class="flex min-h-[215px] w-full flex-grow flex-col rounded-lg bg-green-50 p-3 shadow-md">
                  <h2 class="mb-4 flex items-center text-xl font-bold text-green-700">
                    <i class="pi pi-volume-up mr-2"></i>
                    BEST游戏OST
                  </h2>
                  <ul class="flex-grow">
                    <li v-for="item in items" :key="item.id" class="mb-2 border-b p-2 last:border-b-0">
                      <strong>{{ item.title }}</strong>: {{ item.description }}
                    </li>
                  </ul>
                </div>
              </template>
            </BottomList>
          </div>
        </div>

        <!-- 待办事项列表 -->
        <div class="flex h-full flex-col overflow-hidden rounded-lg border-2 border-pink-200"
          :class="{ 'hidden md:flex': currentCardIndex !== 2 }">
          <div ref="tasksCard">
            <BottomList title="待办事项" :items="Mylove3">
              <template #card="{ items }">
                <div class="flex min-h-[215px] w-full flex-grow flex-col rounded-lg bg-blue-50 p-3 shadow-md">
                  <h2 class="mb-4 flex items-center text-xl font-bold text-blue-700">
                    <i class="pi pi-check-square mr-2"></i>
                    待办事项
                  </h2>
                  <ul class="flex-grow">
                    <li v-for="item in items" :key="item.id" class="mb-1 border-b p-2 last:border-b-0">
                      <strong>{{ item.title }}</strong>: {{ item.description }}
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
@reference '@/assets/tailwind.css';
.btn-page {
  @apply transition duration-200 ease-in-out hover:text-sky-500 flex flex-row px-2 py-1 mr-2 cursor-pointer  border-b-3 border-sky-500 hover:scale-110  disabled:opacity-50 disabled:cursor-not-allowed disabled:border-b-orange-500;
}
.btn-text{
  @apply   font-bold text-2xl text-black text-shadow-lg hover:text-sky-500 ;
}
</style>
