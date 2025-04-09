<script setup>
import { ref, onMounted, reactive } from "vue";
import { gsap } from "gsap";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const currentAdvice = ref("");
const adviceText = ref(null);
const currentMessageId = ref(null);
const likeCount = ref(0);
const hasLiked = ref(false);
const showMessageDialog = ref(false);

// 留言表单状态
const messageForm = reactive({
  content: "",
  submitting: false,
  error: "",
});

// 从API获取随机留言
const fetchRandomMessage = async () => {
  try {
    const response = await fetch("https://msg.lopop.top/api/messages/random");
    if (!response.ok) throw new Error("获取留言失败");

    const data = await response.json();
    currentAdvice.value = data.content;
    currentMessageId.value = data.id;
    likeCount.value = data.likes;
    // 重置点赞状态
    hasLiked.value = false;

    // 使用GSAP实现淡出动画
    animateAdviceChange();
  } catch (error) {
    console.error("获取随机留言失败:", error);
    currentAdvice.value = "获取谏言失败了欸ovo";
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
      gsap.fromTo(
        adviceText.value,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    },
  });
};

// 点赞功能
const likeMessage = async () => {
  if (hasLiked.value || !currentMessageId.value) return;

  try {
    const response = await fetch(
      `https://msg.lopop.top/api/messages/${currentMessageId.value}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) throw new Error("点赞失败");

    const data = await response.json();
    likeCount.value = data.likes;
    hasLiked.value = true;

    // 点赞成功动画
    gsap.fromTo(
      ".like-button",
      { scale: 1 },
      { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 },
    );
    SuccessLikeNotify();
  } catch (error) {
    console.error("点赞失败:", error);
  }
};

// 提交留言
const submitMessage = async () => {
  messageForm.error = "";
  messageForm.submitting = true;

  if (messageForm.content.length < 4) {
    messageForm.error = "留言内容至少需要4个字符";
    messageForm.submitting = false;
    return;
  }

  if (messageForm.content.length > 100) {
    messageForm.error = "留言内容不能超过100个字符";
    messageForm.submitting = false;
    return;
  }

  try {
    const response = await fetch("https://msg.lopop.top/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: messageForm.content,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "提交留言失败");
    }

    // 提交成功，关闭对话框并清空内容
    showMessageDialog.value = false;
    messageForm.content = "";
    SuccessNotify();
  } catch (error) {
    messageForm.error = "提交留言失败，请稍后再试";
    ErrorNotify();
    console.error("提交留言失败:", error);
  } finally {
    messageForm.submitting = false;
  }
};

const SuccessNotify = () => {
  toast.success("提交成功 !", {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
const ErrorNotify = () => {
  toast.error("提交失败 !", {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
  });
};
const SuccessLikeNotify = () => {
  toast.success("点赞成功!", {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
  });
};

onMounted(() => {
  fetchRandomMessage();
});
</script>

<template>
  <div class="w-full p-2 md:p-3">
    <div
      class="overflow-hidden rounded-lg border-4 border-[#0d3a6e] bg-[#1a4b8c] shadow-lg shadow-blue-500/50"
    >
      <div
        class="flex items-center justify-between border-b-2 border-[#0a2e57] bg-[#1a4b8c] px-3 py-2 text-white"
      >
        <span class="tracking-wider">每日谏言</span>
        <div class="flex items-center gap-2">
          <span v-if="currentMessageId" class="flex items-center text-xs">
            <i class="pi pi-heart-fill mr-1 text-red-400"></i>{{ likeCount }}
          </span>
        </div>
      </div>

      <div class="flex flex-col items-center bg-[#2a6fc9] p-3 md:p-4">
        <div
          ref="adviceText"
          class="mb-5 flex min-h-[80px] w-full items-center justify-center rounded border-2 border-[#0a2e57] bg-[#3d8ae5] px-3 py-2 text-center text-sm leading-relaxed text-white md:min-h-[100px] md:text-base"
        >
          "{{ currentAdvice }}"
        </div>

        <div class="flex w-full justify-center gap-2">
          <button
            @click="fetchRandomMessage"
            class="flex items-center rounded border-b-4 border-[#d45555] bg-[#ff6b6b] px-4 py-2 text-sm font-bold text-white transition-all duration-100 hover:bg-[#d45555] active:translate-y-1 active:border-b-0"
          >
            <i class="pi pi-refresh mr-1"></i> 换一条
          </button>

          <button
            @click="likeMessage"
            :disabled="hasLiked || !currentMessageId"
            :class="[
              'like-button flex items-center rounded border-b-4 px-4 py-2 text-sm font-bold text-white transition-all duration-100 active:translate-y-1 active:border-b-0',
              hasLiked
                ? 'cursor-not-allowed border-gray-500 bg-gray-400'
                : 'border-[#388E3C] bg-[#4CAF50] hover:bg-[#388E3C]',
            ]"
          >
            <i
              :class="[
                'pi mr-1',
                hasLiked ? 'pi-heart-fill text-red-400' : 'pi-heart',
              ]"
            ></i>
            {{ hasLiked ? "已点赞" : "点赞" }}
          </button>

          <button
            @click="showMessageDialog = true"
            class="flex items-center rounded border-b-4 border-[#1565C0] bg-[#2196F3] px-4 py-2 text-sm font-bold text-white transition-all duration-100 hover:bg-[#1565C0] active:translate-y-1 active:border-b-0"
          >
            <i class="pi pi-comment mr-1"></i> 留言
          </button>
        </div>
      </div>
    </div>

    <!-- 留言对话框 -->
    <div
      v-if="showMessageDialog"
      class="fixed inset-0 z-40 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl"
      >
        <div
          class="flex items-center justify-between bg-[#1a4b8c] px-4 py-3 text-white"
        >
          <h3 class="font-bold">添加新留言</h3>
          <button
            @click="showMessageDialog = false"
            class="text-white hover:text-gray-200"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>

        <div class="p-4">
          <div class="mb-4">
            <textarea
              v-model="messageForm.content"
              class="min-h-[100px] w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="请输入你的留言(4-100个字符)"
            ></textarea>
            <div v-if="messageForm.error" class="mt-1 text-sm text-red-500">
              {{ messageForm.error }}
            </div>
            <div class="mt-1 text-right text-xs text-gray-500">
              {{ messageForm.content.length }}/100
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button
              @click="showMessageDialog = false"
              class="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              取消
            </button>
            <button
              @click="submitMessage"
              :disabled="messageForm.submitting"
              class="flex items-center rounded bg-[#1a4b8c] px-4 py-2 text-white hover:bg-[#0d3a6e] disabled:bg-gray-400"
            >
              <i
                v-if="messageForm.submitting"
                class="pi pi-spinner pi-spin mr-1"
              ></i>
              <span>{{
                messageForm.submitting ? "提交中..." : "提交留言"
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
