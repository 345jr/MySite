<!-- 个人介绍组件 -->

<script setup>
import Dialog from "@/components/个人介绍/aboutdialog.vue";
</script>

<template>
  <section class="bg-gray-50 py-12 px-6 sm:px-8">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6 md:p-10">
      <div class="flex flex-col md:flex-col items-center md:items-start md:space-x-8">
        <img src="https://imge.lopop.top/avatar.webp" alt="Profile Avatar" class="w-16 h-16 md:w-16 md:h-16 rounded-full object-cover border-4 border-blue-400 shadow-md">
        <div class="mt-6 md:mt-0 text-center md:text-left">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Lopop</h1>
          <p class="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">在互联网遨游的鼠鼠，只做自己喜欢的事情😎</p>
          <div class="mt-6 flex justify-center md:justify-start space-x-4">
            <Dialog />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
