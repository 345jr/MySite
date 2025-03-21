<!-- 个人介绍弹窗组件 -->

<script setup>
import { ref } from 'vue';

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
        <button @click="openDialog" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            联系我
        </button>

        <div v-if="isDialogVisible" class="fixed inset-0 flex items-center justify-center">
            <div class="bg-gray-800 opacity-25 fixed inset-0 "></div>
            <div class="bg-white rounded-lg shadow-lg w-96 p-6 relative z-10">
                <h2 class="text-lg font-bold text-gray-800 mb-4">联系方式</h2>

                <ul class="text-gray-600 space-y-2">
                    <li> 微信: pg345482661</li>
                    <li> 邮箱 : loppgljr@gmail.com</li>
                    <li> 抖音: 狂鼠Ω战魂</li>
                </ul>

                <button @click="closeDialog" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    ✖
                </button>
            </div>
        </div>

    </div>
</template>
