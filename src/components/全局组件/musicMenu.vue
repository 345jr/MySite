<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { watch } from "vue";

const props = defineProps({
  visible: Boolean,
  playMusic: Boolean,
});

const emit = defineEmits(["select-song", "is-play"]);
const audioPlayer = ref(null);
const songList = ref([]);
const currentSong = ref(null);

// 格式化歌名
const formatSongName = (song) => {
  return song.replace(/^music\//, "").replace(/\.(mp3|flac|wav|ogg|mp4)$/, "");
};

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
    if (audioPlayer.value && !audioPlayer.value.paused) {
      audioPlayer.value.pause();
    }
    currentSong.value = song;
    if (audioPlayer.value) {
      // 设置与等待新音频源
      audioPlayer.value.src = `https://music.lopop.top/api/bgm?name=${song}`;
      await new Promise((resolve, reject) => {
        audioPlayer.value.onloadedmetadata = resolve;
        audioPlayer.value.onerror = reject;
      });
      if (props.playMusic) {
        await audioPlayer.value.play();
      }
    }
    emit("select-song", formatSongName(song));
  } catch (error) {
    console.error("播放歌曲失败:", error);
  }
};

watch(
  () => props.playMusic,
  async (newVal) => {
    if (audioPlayer.value) {
      if (newVal) {
        try {
          await audioPlayer.value.play();
        } catch (error) {
          console.error("播放失败:", error);
        }
      } else {
        audioPlayer.value.pause();
      }
    }
  },
);

onMounted(() => {
  fetchSongs();
});
</script>

<template>
  <div
    v-show="visible"
    ref="musicMenu"
    class="absolute top-1 right-0 z-50 mt-18 w-56 overflow-hidden rounded-b-lg border border-gray-200 bg-white shadow-xl"
  >
    <div class="max-h-60 overflow-y-auto py-1">
      <div class="border-b bg-gray-50 px-3 py-2 text-sm text-gray-500">
        当前播放: {{ currentSong ? formatSongName(currentSong) : "无" }}
      </div>
      <a
        v-for="(song, index) in songList"
        :key="song"
        @click="selectSong(song)"
        class="block cursor-pointer px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-blue-100"
        :class="{ 'bg-blue-50': currentSong === song }"
      >
        <span class="mr-2 text-blue-500">{{ index + 1 }}.</span>
        {{ formatSongName(song) }}
      </a>
    </div>
  </div>
  <audio
    ref="audioPlayer"
    v-if="currentSong"
    :src="`https://music.lopop.top/api/bgm?name=${currentSong}`"
  ></audio>
</template>
