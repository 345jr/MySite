<!-- 每一篇文章的详细页面 -->

<script setup>
import Data from "@/data/artcles_data.json";
import { useRoute } from "vue-router";
import { ref, shallowRef, watchEffect } from "vue";
const router = useRoute();
const articles = ref(Data);
const article = articles.value[router.params.id];
const mdComponent = shallowRef(null);
const markdownFiles = import.meta.glob("@/mypage/*.md");

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
  <section class="px-6 py-12 sm:px-8">
    <div class="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md md:p-10">
      <h1 class="text-3xl font-bold text-gray-800">{{ article.title }}</h1>
      <div class="flex flex-row justify-normal">
        <p class="time-text">发布时间：{{ article.time }}</p>
        <p class="time-text">更新时间：{{ article.uptime }}</p>
      </div>

      <div class="markdown-content">
        <component :is="mdComponent" v-if="mdComponent" />
        <p v-else class="mt-6 text-center text-gray-500">
          文章内容加载中请稍等...
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference '@/assets/tailwind.css';
/* 文章详细页样式 */
.time-text {
  @apply my-6 pl-2 whitespace-nowrap text-gray-500;
}
/* Markdown 样式 */
.markdown-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #c7551c;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.markdown-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #a1c91b;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.markdown-content h3 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1fc9b0;
}

.markdown-content h4 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  text-decoration: underline;
  color: #2159ba;
}

.markdown-content p {
  margin-bottom: 1rem;
  line-height: 1.7;
  font-size: 1.15rem;
}

.markdown-content ul,
.markdown-content ol {
  list-style-type: disc;
  margin-left: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
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
