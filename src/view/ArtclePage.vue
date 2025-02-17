<script setup>
import Data from '@/data.json'
import { useRoute } from 'vue-router'
import { ref, shallowRef, watchEffect} from 'vue'
const router = useRoute()
const articles = ref(Data)
const article = articles.value[router.params.id]
const mdComponent = shallowRef(null);
const markdownFiles = import.meta.glob('@/mypage/*.md');
watchEffect(async () => {
    const mdPath = `/src/mypage/${router.params.id}.md`;
    if (markdownFiles[mdPath]) {
        const module = await markdownFiles[mdPath]();
        mdComponent.value = module.default; 
    } else {
        mdComponent.value = null;
    }
});
</script>

<template>
    <section class="bg-gray-50 py-12 px-6 sm:px-8">
        <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
            <h1 class="text-3xl font-bold text-gray-800">{{ article.title }}</h1>
            <p class="text-gray-500">发布时间：{{ article.time }}</p>
            <component :is="mdComponent" v-if="mdComponent" />
            <p v-else class="text-gray-500 text-center mt-6">文章内容未找到</p>
        </div>
    </section>
</template>