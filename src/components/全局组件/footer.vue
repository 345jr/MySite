<!-- 页脚组件 -->

<script setup>
import { ref, onMounted } from 'vue';

const currentYear = new Date().getFullYear();

const uptime = ref({ days: 0, hours: 0 });
const startTime = ref('');
const isLoading = ref(true);
const error = ref(null);

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

onMounted(() => {
  fetchUptime();
});
</script>

<template>
    <footer class="bg-gray-100 text-gray-600 py-8 mt-10 border-t border-gray-200">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <!-- 左侧版权信息 -->
                <div class="mb-4 md:mb-0">
                    <div class="flex items-center">
                        <h2 class="text-xl font-bold">
                            <span class="text-blue-300">Lo</span><span class="text-gray-800">pop</span>
                        </h2>
                    </div>
                    <p class="text-sm mt-2">© {{ currentYear }} Lopop个人博客. 保留所有权利.</p>
                </div>

                <!-- 中间导航链接 -->
                <div class="mb-4 md:mb-0">
                    <ul class="flex flex-wrap justify-center gap-4">
                        <li><a href="/" class="hover:text-blue-500 transition-colors">首页</a></li>
                        <li><a href="/#/about" class="hover:text-blue-500 transition-colors">关于我</a></li>
                        <li><a href="/#/work" class="hover:text-blue-500 transition-colors">作品集</a></li>
                        <li><a href="/#/daily" class="hover:text-blue-500 transition-colors">日常</a></li>
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
            <div class="mt-6 p-3 bg-blue-50 rounded-lg shadow-sm border border-blue-100 max-w-md mx-auto">
                <div v-if="isLoading" class="text-center text-gray-500 py-2">
                    <i class="pi pi-spin pi-spinner mr-2"></i>加载中...
                </div>
                <div v-else-if="error" class="text-center text-red-500 py-2">
                    <i class="pi pi-exclamation-circle mr-2"></i>{{ error }}
                </div>
                <div v-else class="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <div class="flex items-center">
                        <i class="pi pi-clock text-blue-500 mr-2"></i>
                        <span class="font-medium text-gray-700 whitespace-nowrap">运行时间:</span>
                        <span class="ml-2 text-blue-600 font-semibold whitespace-nowrap">{{ uptime.days }}天 {{ uptime.hours }}小时</span>
                    </div>
                    <div class="hidden sm:block text-gray-300">|</div>
                    <div class="flex items-center">
                        <i class="pi pi-calendar text-blue-500 mr-2"></i>
                        <span class="font-medium text-gray-700 whitespace-nowrap">上线时间:</span>
                        <span class="ml-2 text-blue-600 font-semibold whitespace-nowrap">{{ startTime }}</span>
                    </div>
                </div>
            </div>
            
            <div class="text-center text-xs text-gray-500 mt-4">
                使用 Vue 3 + Tailwind CSS 构建
            </div>
        </div>
    </footer>
</template>