<script setup>
import Data from '@/data2.json'
import { ref } from 'vue'
const projects = ref(Data)
</script>

<template>
    <section class="bg-gray-100 py-12 px-6 sm:px-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">我的作品列表</h2>
            <div class="space-y-6">
                <div v-for="project in projects" :key="project.id"
                    class="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h3 class="text-xl font-semibold text-gray-900">{{ project.name }}</h3>
                    <p class="text-sm text-gray-500">开发时间：{{ project.date }}</p>
                    <p class="mt-2 text-gray-700"><strong>技术栈：</strong> {{ project.stack }}</p>
                    <p class="mt-2 text-gray-700"><strong>简介：</strong> {{ project.description }}</p>
                    <p class="mt-2 text-gray-700 italic"><strong>个人评价：</strong> {{ project.review }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
