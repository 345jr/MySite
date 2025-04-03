<script setup>
import { ref, onMounted, reactive } from 'vue';
import { gsap } from 'gsap';
import advicesData from '@/data/advices.json';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

const advices = ref(advicesData.advices);
const currentAdvice = ref(advices.value[0]);
const adviceText = ref(null);
const currentMessageId = ref(null);
const likeCount = ref(0);
const hasLiked = ref(false);
const showMessageDialog = ref(false);
const newMessage = ref('');
const messageError = ref('');

// 留言表单状态
const messageForm = reactive({
  content: '',
  submitting: false,
  error: ''
});

// 从API获取随机留言
const fetchRandomMessage = async () => {
  try {
    const response = await fetch('https://msg.lopop.top/api/messages/random');
    if (!response.ok) throw new Error('获取留言失败');

    const data = await response.json();
    currentAdvice.value = data.content;
    currentMessageId.value = data.id;
    likeCount.value = data.likes;
    hasLiked.value = false; // 重置点赞状态

    // 使用GSAP实现淡出动画
    animateAdviceChange();
  } catch (error) {
    console.error('获取随机留言失败:', error);
    currentAdvice.value = '获取谏言失败';
  }
};

// 动画效果封装
const animateAdviceChange = (callback = null) => {
  gsap.to(adviceText.value, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.out",
    onComplete: () => {
      if (callback) callback();
      // 淡入新谏言
      gsap.fromTo(adviceText.value,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        }
      );
    }
  });
};

// 点赞功能
const likeMessage = async () => {
  if (hasLiked.value || !currentMessageId.value) return;

  try {
    const response = await fetch(`https://msg.lopop.top/api/messages/${currentMessageId.value}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('点赞失败');

    const data = await response.json();
    likeCount.value = data.likes;
    hasLiked.value = true;

    // 点赞成功动画
    gsap.fromTo(".like-button",
      { scale: 1 },
      { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 }
    );
  } catch (error) {
    console.error('点赞失败:', error);
  }
};

// 提交留言
const submitMessage = async () => {
  messageForm.error = '';
  messageForm.submitting = true;

  if (messageForm.content.length < 4) {
    messageForm.error = '留言内容至少需要4个字符';
    messageForm.submitting = false;
    return;
  }

  if (messageForm.content.length > 100) {
    messageForm.error = '留言内容不能超过100个字符';
    messageForm.submitting = false;
    return;
  }

  try {
    const response = await fetch('https://msg.lopop.top/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: messageForm.content
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || '提交留言失败');
    }

    // 提交成功，关闭对话框并清空内容
    showMessageDialog.value = false;
    messageForm.content = '';
    SuccessNotify();
  } catch (error) {
    messageForm.error = error.message || '提交留言失败，请稍后再试';
    ErrorNotify();
    console.error('提交留言失败:', error);
  } finally {
    messageForm.submitting = false;
  }
};

const SuccessNotify = () => {
  toast.success("提交成功 !", {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER
  }); 
}
const ErrorNotify = () => {
  toast.error("提交失败 !", {
    autoClose: 3000,
    position: toast.POSITION.TOP_CENTER
  });

}

onMounted(() => {
  // 初始加载动画
  gsap.from(".game-window", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "back.out(1.7)"
  });

  // 尝试从API获取留言，如果失败则使用本地数据
  fetchRandomMessage();
});
</script>

<template>
  <div class="w-full p-2 md:p-3">
    <div
      class=" bg-[#1a4b8c] border-4 border-[#0d3a6e] rounded-lg shadow-lg shadow-blue-500/50 overflow-hidden">
      <div class="bg-[#1a4b8c] text-white px-3 py-2 flex justify-between items-center border-b-2 border-[#0a2e57]">
        <span class="tracking-wider">每日谏言</span>
        <div class="flex items-center gap-2">
          <span v-if="currentMessageId" class="text-xs flex items-center">
            <i class="pi pi-heart-fill text-red-400 mr-1"></i>{{ likeCount }}
          </span>
        </div>
      </div>

      <div class="p-3 md:p-4 flex flex-col items-center bg-[#2a6fc9]">
        <div ref="adviceText"
          class="text-white text-center mb-5 leading-relaxed px-3 py-2 bg-[#3d8ae5] rounded border-2 border-[#0a2e57] min-h-[80px] md:min-h-[100px] w-full flex items-center justify-center text-sm md:text-base">
          "{{ currentAdvice }}"
        </div>

        <div class="flex gap-2 w-full justify-center">
          <button @click="fetchRandomMessage"
            class="bg-[#ff6b6b] text-white px-4 py-2 rounded font-bold border-b-4 border-[#d45555] hover:bg-[#d45555] active:translate-y-1 active:border-b-0 transition-all duration-100 text-sm flex items-center">
            <i class="pi pi-refresh mr-1"></i> 换一条
          </button>

          <button @click="likeMessage" :disabled="hasLiked || !currentMessageId" :class="[
            'like-button text-white px-4 py-2 rounded font-bold border-b-4 active:translate-y-1 active:border-b-0 transition-all duration-100 text-sm flex items-center',
            hasLiked ? 'bg-gray-400 border-gray-500 cursor-not-allowed' : 'bg-[#4CAF50] border-[#388E3C] hover:bg-[#388E3C]'
          ]">
            <i :class="['pi mr-1', hasLiked ? 'pi-heart-fill text-red-400' : 'pi-heart']"></i>
            {{ hasLiked ? '已点赞' : '点赞' }}
          </button>

          <button @click="showMessageDialog = true"
            class="bg-[#2196F3] text-white px-4 py-2 rounded font-bold border-b-4 border-[#1565C0] hover:bg-[#1565C0] active:translate-y-1 active:border-b-0 transition-all duration-100 text-sm flex items-center">
            <i class="pi pi-comment mr-1"></i> 留言
          </button>
        </div>
      </div>
    </div>

    <!-- 留言对话框 -->
    <div v-if="showMessageDialog" class="fixed inset-0  flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div class="bg-[#1a4b8c] text-white px-4 py-3 flex justify-between items-center">
          <h3 class="font-bold">添加新留言</h3>
          <button @click="showMessageDialog = false" class="text-white hover:text-gray-200">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <div class="p-4">
          <div class="mb-4">
            <textarea v-model="messageForm.content"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              placeholder="请输入你的留言(4-100个字符)"></textarea>
            <div v-if="messageForm.error" class="text-red-500 text-sm mt-1">{{ messageForm.error }}</div>
            <div class="text-gray-500 text-xs mt-1 text-right">{{ messageForm.content.length }}/100</div>
          </div>

          <div class="flex justify-end gap-2">
            <button @click="showMessageDialog = false"
              class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
              取消
            </button>
            <button @click="submitMessage" :disabled="messageForm.submitting"
              class="px-4 py-2 bg-[#1a4b8c] text-white rounded hover:bg-[#0d3a6e] disabled:bg-gray-400 flex items-center">
              <i v-if="messageForm.submitting" class="pi pi-spinner pi-spin mr-1"></i>
              <span>{{ messageForm.submitting ? '提交中...' : '提交留言' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>