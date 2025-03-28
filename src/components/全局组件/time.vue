<script setup>
import { ref, onMounted } from 'vue'

const uptime = ref({ days: 0, hours: 0 })
const startTime = ref('')
const isLoading = ref(true)
const error = ref(null)

const fetchUptime = async () => {
  try {
    const response = await fetch('https://api.lopop.top/api/start-time')
    if (!response.ok) throw new Error('网络响应不正常')
    const data = await response.json()
    uptime.value = data
    startTime.value = data.startTime
  } catch (err) {
    error.value = err.message
    console.error('获取运行时间失败:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchUptime()  
})
</script>

<template>
  <div class="uptime-container">
    <div v-if="isLoading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="uptime">
        <span class="label">网站已运行:</span>
        <span class="value">{{ uptime.days }}天 {{ uptime.hours }}小时</span>
      </div>
      <div class="start-time">
        <span class="label">上线时间:</span>
        <span class="value">{{ startTime }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.uptime-container {
  font-family: 'Arial', sans-serif;
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
}

.loading, .error {
  color: #666;
  padding: 1rem;
}

.uptime, .start-time {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
}

.label {
  font-weight: bold;
  margin-right: 0.5rem;
  color: #333;
}

.value {
  color: #007bff;
}
</style>