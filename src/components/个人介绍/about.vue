<!-- 个人介绍组件 -->

<script setup>
import Dialog from "@/components/个人介绍/aboutdialog.vue";
</script>

<template>
  <section class="px-4 py-16">
    <div
      class="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white p-6 shadow-md md:p-10"
    >
      <div
        class="flex flex-col items-center md:flex-col md:items-start md:space-x-8"
      >
        <img
          src="https://asset.lopop.top/public/other-images/avatar.webp"
          alt="Profile Avatar"
          class="h-16 w-16 rounded-full border-4 border-blue-400 object-cover shadow-md md:h-16 md:w-16"
        />
        <div class="mt-6 text-center md:mt-0 md:text-left">
          <h1 class="text-2xl font-bold text-gray-800 md:text-3xl">Lopop</h1>
          <p class="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
            在互联网遨游的鼠鼠，只做自己喜欢的事情😎
          </p>
          <div class="mt-6 flex justify-center space-x-4 md:justify-start">
            <Dialog />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
