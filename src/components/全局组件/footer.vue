<!-- 页脚组件 -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
const currentYear = new Date().getFullYear();

const uptime = ref({ days: 0, hours: 0 });
const startTime = ref('');
const isLoading = ref(true);
const error = ref(null);
const route = useRoute();
const router = useRouter();

const isActive = (routePath) => route.path === routePath;
const navigate = (path) => {
    router.push(path);
};
const fetchUptime = async () => {
    try {
        const response = await fetch('https://api.lopop.top/api/start-time');
        if (!response.ok) throw new Error('网络响应不正常');
        const data = await response.json();
        uptime.value = data;
        startTime.value = data.startTime;
    } catch (err) {
        error.value = err.message;
        console.error('获取运行时间失败:', err);
    } finally {
        isLoading.value = false;
    }
};

const links = [
    { path: '/', name: '文章主页' },
    { path: '/about', name: '个人介绍' },
    { path: '/work', name: '我的作品' },
    { path: '/daily', name: '日常活动' }
];
const btnClass = (isActive) =>
    [
        'px-4 py-2 rounded-md hover:bg-gray-100',
        isActive
            ? 'bg-blue-100 text-blue-600 font-semibold'
            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500',
    ].join(' ');

onMounted(() => {
    fetchUptime();
});
</script>

<template>
    <div class="bg-white text-gray-600 py-8 border-t border-gray-200 relative">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <!-- 左侧版权信息 -->
                <div class="mb-4 md:mb-0">
                    <div class="flex items-center">
                        <h2 class="text-xl font-bold">
                            <span class="text-blue-300">Lo</span><span class="text-gray-800">pop</span>
                        </h2>
                    </div>
                    <p class="text-sm mt-2">© {{ currentYear }} Lopop个人博客.</p>
                </div>

                <!-- 中间导航链接 -->
                <div class="mb-4 md:mb-0">
                    <ul class="flex flex-wrap justify-center gap-4">
                        <li v-for="link in links" :key="link.path">
                            <button @click="navigate(link.path)" :class="btnClass(isActive(link.path))">
                                {{ link.name }}
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- 右侧社交媒体链接 -->
                <div class="flex gap-4">
                    <a href="https://github.com/345jr" class="text-gray-400 hover:text-gray-700" title="GitHub">
                        <i class="pi pi-github text-xl"></i>
                    </a>
                </div>
            </div>

            <!-- 网站运行时间信息 -->
            <div class="mt-6 px-6 bg-blue-50 rounded-lg shadow-sm border border-blue-100 max-w-md mx-auto">
                <div v-if="isLoading" class="text-center text-gray-500 py-2">
                    <i class="pi pi-spin pi-spinner mr-2"></i>
                    <p>加载中...</p>
                </div>
                <div v-else-if="error" class="text-center text-red-500 py-2">
                    <i class="pi pi-exclamation-circle mr-2"></i>
                    <p>网络请求失败 !</p>
                </div>
                <div v-else class="flex flex-col sm:flex-row justify-center items-center">
                    <div class="flex items-center">
                        <i class="pi pi-clock text-blue-500 mr-2"></i>
                        <span class="start-time-text">运行时间:</span>
                        <span class="time-data">{{ uptime.days }}天{{ uptime.hours }}小时</span>
                    </div>
                    <!-- 分隔线 -->
                    <div class="hidden sm:block w-px h-5 bg-gray-300 mx-4"></div>
                    <div class="block sm:hidden w-full h-px bg-gray-300 my-2"></div> 
                    <div class="flex items-center">
                        <i class="pi pi-calendar text-blue-500 mr-2"></i>
                        <span class="start-time-text">上线时间:</span>
                        <span class="time-data">{{ startTime }}</span>
                    </div>
                </div>
            </div>

            <div class="text-center text-xs text-gray-500 mt-4">
                使用 Vue 3 + Tailwind CSS 构建
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference '@/assets/tailwind.css';

.start-time-text {
    @apply text-gray-500 my-2 pl-2 whitespace-nowrap;
}

.time-data {
    @apply ml-2 text-blue-600 font-semibold whitespace-nowrap;
}
</style>