<!-- 文章主页页面 -->

<script setup>
import MyList from "@/components/文章主页/mylist.vue";
import About from "@/components/个人介绍/about.vue";
</script>

<template>
  <div class="w-full py-4 ">
    <div class="flex flex-col lg:flex-row gap-1">
      <!-- 左侧文章列表 -->
      <div class="md:w-4/5">
        <MyList />
      </div>

      <!-- 右侧个人介绍 -->
      <div class="w-1/5">
        <div class="hidden lg:block">
          <About />
        </div>
      </div>
    </div>
  </div>
</template>
