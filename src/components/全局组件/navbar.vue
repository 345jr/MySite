<!-- 导航栏组件 -->

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, nextTick, onMounted } from "vue";
import { gsap } from "gsap";
import axios from "axios";

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
    gsap.to(menuRef.value, {
      x: 300,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => (isMenuOpen.value = false),
    });
  } else {
    isMenuOpen.value = !isMenuOpen.value;
    openMenu.value = !openMenu.value;
  }
};

// 监听菜单状态变化，添加动画
watch(isMenuOpen, async (newValue, oldValue) => {
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

// 新增音乐播放器相关逻辑
const isMusicOpen = ref(false);
const isPlaying = ref(false);
const currentSong = ref(null);
const songList = ref([]);
const audioPlayer = ref(null);

// 获取歌曲列表
const fetchSongs = async () => {
  try {
    const response = await axios.get("https://music.lopop.top/api/songs");
    songList.value = response.data;
    if (songList.value.length > 0) {
      currentSong.value = songList.value[0];
    }
  } catch (error) {
    console.error("获取歌曲列表失败:", error);
  }
};

// 选择歌曲
const selectSong = async (song) => {
  try {
    // 暂停当前播放
    if (audioPlayer.value && !audioPlayer.value.paused) {
      audioPlayer.value.pause();
    }
    
    currentSong.value = song;
    
    if (audioPlayer.value) {
      // 设置新音频源
      audioPlayer.value.src = `https://music.lopop.top/api/bgm?name=${song}`;
      
      // 等待音频加载
      await new Promise((resolve, reject) => {
        audioPlayer.value.onloadedmetadata = resolve;
        audioPlayer.value.onerror = reject;
      });
      
      // 如果之前是播放状态，则播放新歌曲
      if (isPlaying.value) {
        await audioPlayer.value.play();
      }
    }
  } catch (error) {
    console.error("播放歌曲失败:", error);
    isPlaying.value = false;
  }
};

// 播放/暂停音乐
const togglePlay = async () => {
  try {
    if (audioPlayer.value) {
      if (isPlaying.value) {
        await audioPlayer.value.pause();
      } else {
        await audioPlayer.value.play();
      }
      isPlaying.value = !isPlaying.value;
    }
  } catch (error) {
    console.error("播放控制失败:", error);
    isPlaying.value = false;
  }
};
// 格式化歌名
const formatSongName = (song) => {
  return song.replace(/^music\//, "").replace(/\.(mp3|flac|wav|ogg)$/, "");
};

const musicMenu = ref(null);
const toggleMusicMenu = () => {
  isMusicOpen.value = !isMusicOpen.value;
  if (isMusicOpen.value && musicMenu.value) {
    gsap.from(musicMenu.value, {
      y: -10,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }
};

onMounted(() => {
  fetchSongs();
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

    <!-- 音乐播放器 -->
    <div class="flex items-center space-x-4">

      <div class="md:block text-sm text-gray-500 italic">       
        可以点歌哦
        <i class="pi pi-angle-right "></i>
      </div>

      <button @click="togglePlay"
        class="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110">
        <i :class="isPlaying ? 'pi pi-pause' : 'pi pi-play'" class="text-blue-500 text-lg"></i>
      </button>

      <div class="relative">
        <button @click="toggleMusicMenu"
          class="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110">
          <i class="pi pi-headphones text-blue-500 text-lg mr-1.5"></i>
          <span v-if="currentSong" class="ml-1 text-sm text-gray-900 font-bold truncate max-w-[80px]">
            {{ formatSongName(currentSong) }}
          </span>
        </button>

        <!-- 音乐列表 -->
        <div v-show="isMusicOpen" ref="musicMenu"
          class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
          <div class="max-h-60 overflow-y-auto py-1">
            <div class="px-3 py-2 text-sm text-gray-500 bg-gray-50 border-b">
              当前播放: {{ currentSong ? formatSongName(currentSong) : "无" }}
            </div>
            <a v-for="(song, index) in songList" :key="song" @click="selectSong(song)"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
              :class="{ 'bg-blue-50': currentSong === song }">
              <span class="text-blue-500 mr-2">{{ index + 1 }}.</span>
              {{ formatSongName(song) }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端导航菜单 -->
    <div v-show="isMenuOpen" class="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 lg:hidden" @click="toggleMenu">
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
          <!-- 优化后的移动端音乐播放器 -->
          <div class="p-4 border-t border-gray-200">
            <div class="flex items-center space-x-2 mb-2">
              <button @click="togglePlay" class="p-2 rounded-full hover:bg-gray-100">
                <i :class="isPlaying ? 'pi pi-pause' : 'pi pi-play'" class="text-blue-500"></i>
              </button>
              <span class="text-sm text-gray-600">当前:
                {{ currentSong ? formatSongName(currentSong) : "无" }}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- 隐藏的音频元素 -->
  <audio ref="audioPlayer" v-if="currentSong" :src="`https://music.lopop.top/api/bgm?name=${currentSong}`"></audio>
</template>
