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
      <div class="mb-6 w-full rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-4 flex items-center text-xl font-bold">
          <i class="pi pi-list mr-2 text-blue-500"></i>
          {{ title }}
        </h2>
        <ul ref="listItems">
          <li
            v-for="item in localItems"
            :key="item.id"
            class="mb-2 border-b p-2 last:border-b-0"
          >
            <strong>{{ item.title }}</strong
            >: {{ item.description }}
          </li>
        </ul>
      </div>
    </slot>
  </div>
</template>
