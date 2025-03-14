<script setup>

import { ref } from "vue";
const props = defineProps({
  title: String,
  items: Array,
});
const localItems = ref(props.items);

</script>

<template>
  <div>
    <slot name="card" :items="localItems">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <i class="pi pi-list mr-2 text-blue-500"></i>
            {{ title }}
          </h2>
          <ul ref="listItems">
            <li
              v-for="item in localItems"
              :key="item.id"
              class="mb-2 p-2 border-b last:border-b-0"
            >
              <strong>{{ item.title }}</strong>: {{ item.description }}
            </li>
          </ul>
      </div>
    </slot>
  </div>
</template>
