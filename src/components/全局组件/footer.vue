<!-- 页脚组件 -->

<script setup>
const currentYear = new Date().getFullYear();
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
            <div class="text-center text-xs text-gray-500 mt-4">
                本站使用 Vue 3 + Tailwind CSS 构建
            </div>
        </div>
    </footer>
</template>