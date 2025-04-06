<!-- 文章主页页面 -->

<script setup>
import MyList from "@/components/文章主页/mylist.vue";
import About from "@/components/个人介绍/about.vue";
import GameBlock from "../components/快乐区块/GameBlock.vue";
</script>

<template>
  <div class="w-full">
    <!-- 手机端显示的谏言区块 -->
    <div class="block lg:hidden mb-4">
      <GameBlock />
    </div>

    <div class="flex flex-col lg:flex-row gap-1">
      <!-- 左侧文章列表 -->
      <div class="md:w-4/5 ">
        <MyList />
      </div>

      <!-- 右侧个人介绍 -->
      <div class="w-1/5">
        <div class="hidden lg:block">
          <About />
           <!-- 电脑端显示的谏言区块 -->
           <div class="mt-6">
            <GameBlock />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
