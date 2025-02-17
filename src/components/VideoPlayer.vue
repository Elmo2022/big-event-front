<template>
  <div >
    <!-- 视频播放器 -->
    <video class="video-container" ref="videoRef" :src="videoSrc" :poster="coverImage" crossorigin="anonymous" controls>
      <!-- 如果浏览器不支持 video 标签，显示此提示信息 -->
      Your browser does not support the video tag.
    </video>
    <!-- 播放图标 -->
    <!-- <div v-if="!isPlaying" class="play-icon" @click="playVideo">
      <svg width="80" height="80" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="rgba(0, 0, 0, 0.6)" />
        <polygon points="40,30 40,70 70,50" fill="white" />
      </svg>
    </div> -->
    <button @click="captureFrame">截取封面</button>
    <!-- 显示封面
    <img v-if="coverImage" :src="coverImage" alt="Video Cover" width="640" height="360" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 定义视频源
const videoSrc = ref(
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
);
const videoRef = ref(null);
const coverImage = ref("");
const isPlaying = ref(false);

// 播放视频的方法
const playVideo = () => {
  if (videoRef.value) {
    videoRef.value.play();
    isPlaying.value = true;
  }
};

// 暂停视频的方法
const pauseVideo = () => {
  if (videoRef.value) {
    videoRef.value.pause();
    isPlaying.value = false;
  }
};

// 截取视频帧的方法
const captureFrame = () => {
  if (videoRef.value) {
    const video = videoRef.value;
    // 创建一个 canvas 元素
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    // 将视频当前帧绘制到 canvas 上
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // 将 canvas 内容转换为 data URL
    const dataURL = canvas.toDataURL("image/jpeg");
    // 更新封面图片的 data URL
    coverImage.value = dataURL;
  }
  console.log("截取好了");
};

onMounted(() => {
  if (videoRef.value) {
    // 监听视频加载完成事件
    videoRef.value.addEventListener("loadeddata", () => {
      // 可以在这里设置截取的时间点，例如截取视频开始的第一帧
      videoRef.value.currentTime = 0;
      // 自动截取第一帧作为封面
      captureFrame();
    });

    // 监听视频播放事件，确保点击播放后从视频开头开始播放
    videoRef.value.addEventListener("play", () => {
      videoRef.value.currentTime = 0;
      isPlaying.value = true;
    });

    // 监听视频暂停事件
    videoRef.value.addEventListener("pause", () => {
      isPlaying.value = false;
    });
  }
});
</script>

<style scoped>
.video-container {
  position: relative;
  display: inline-block;
  width:320px
}

.play-icon {
  position: absolute;
  top: 40%;
  left: 35%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

video {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}
</style>