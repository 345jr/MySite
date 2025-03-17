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
            <p class="text-gray-500 mb-6">发布时间：{{ article.time }}</p>
            <div class="markdown-content">
                <component :is="mdComponent" v-if="mdComponent" />
                <p v-else class="text-gray-500 text-center mt-6">文章内容未找到</p>
            </div>
        </div>
    </section>
</template>

<style>
/* Markdown 样式 */
.markdown-content h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #1a202c;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.5rem;
}

.markdown-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #2d3748;
}

.markdown-content h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: #4a5568;
}

.markdown-content p {
    margin-bottom: 1rem;
    line-height: 1.7;
}

.markdown-content ul, .markdown-content ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
}

.markdown-content li {
    margin-bottom: 0.5rem;
}

.markdown-content a {
    color: #3182ce;
    text-decoration: underline;
}

.markdown-content blockquote {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    font-style: italic;
    margin: 1rem 0;
    color: #4a5568;
}

.markdown-content code {
    background-color: #f7fafc;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.9em;
}

.markdown-content pre {
    background-color: #f7fafc;
    padding: 1rem;
    border-radius: 0.25rem;
    overflow-x: auto;
    margin: 1rem 0;
}

.markdown-content img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
    border-radius: 0.25rem;
}
</style>