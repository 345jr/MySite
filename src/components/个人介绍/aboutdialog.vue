<!-- 个人介绍弹窗组件 -->

<script setup>
import { ref } from "vue";

const isDialogVisible = ref(false);

const openDialog = () => {
  isDialogVisible.value = true;
};

const closeDialog = () => {
  isDialogVisible.value = false;
};
</script>

<template>
  <div>
    <button
      @click="openDialog"
      class="rounded-md bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
    >
      联系我
    </button>
    <div
      v-if="isDialogVisible"
      class="fixed inset-0 flex items-center justify-center"
    >
      <!-- 遮罩层 -->
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div class="relative z-10 w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 class="mb-4 text-lg font-bold text-gray-800">联系方式</h2>

        <ul class="space-y-2 text-gray-600">
          <li>微信: pg345482661</li>
          <li>邮箱 : loppgljr@gmail.com</li>
          <li>抖音: 狂鼠Ω战魂</li>
          <li>小红书 :鳕鸽蛋</li>
        </ul>

        <button
          @click="closeDialog"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>
    </div>
  </div>
</template>
