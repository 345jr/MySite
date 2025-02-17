<script setup>
import avatar from "@/assets/avatar.webp";
import Dialog from "@/components/aboutdialog.vue";
const profile = {
  name: "Lopop",
  bio: "在互联网遨游的鼠鼠，只做自己喜欢的事情😎",
  avatar: avatar 
};
</script>

<template>
  <section class="bg-gray-50 py-12 px-6 sm:px-8">
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6 md:p-10">
      <div class="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <img :src="profile.avatar" alt="Profile Avatar" class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200 shadow-md">
        <div class="mt-6 md:mt-0 text-center md:text-left">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ profile.name }}</h1>
          <p class="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">{{ profile.bio }}</p>
          <div class="mt-6 flex justify-center md:justify-start space-x-4">
            <Dialog />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
