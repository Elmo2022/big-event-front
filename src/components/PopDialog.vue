<template>
  <div style="border-radius: 10px">
    <el-button @click="openDialog">打开视频弹窗</el-button>
    <el-dialog
      style="border-radius: 15px; height: 560px"
      v-model="dialogVisible"
    >
      <div class="container" style="width: 100%; height: 100%">
        <div
          class="left"
          style="
            width: 320px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <VideoPlayer />
        </div>
        <div
          class="right"
          style="
            height: 100%;
            width: 500px;
            display: flex;
            flex-wrap: wrap;
          "
        >
          <div class="speak" style="width: 420px; height: 60px">作者头像和名称</div>
          <div style="overflow: auto; background-color: aqua">
            <div style="height: 340px">
              <div class="title">
                <h3>帖子名称</h3>
                <p>{{ videoIntroduction }}</p>
              </div>
              <div class="introduction">
                <h3>文章内容</h3>
                <p>{{ videoIntroduction }}</p>
              </div>
              <div class="comment">
                <h3>评论区</h3>
                <ul>
                  <li v-for="(comment, index) in comments" :key="index">
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                    {{ comment }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="speak" style="width: 420px; height: 60px">发言区</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VideoPlayer from "./VideoPlayer.vue";
// 控制弹窗显示隐藏
const dialogVisible = ref(false);
// 视频源
const videoSrc = ref(
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
);
// 视频介绍
const videoIntroduction = ref(
  "这是一个美丽花朵的视频，展示了花朵盛开的全过程，非常漂亮！"
);
// 评论列表
const comments = ref([
  "哇，这花真美！",
  "拍得太赞了，爱了爱了",
  "感觉心情都变好了",
]);
// 视频元素引用
const videoRef = ref(null);
const openDialog = () => {
  console.log("点击按钮事件触发");
  dialogVisible.value = true;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
}

.left {
  background-color: #ececec;
  border-right: 1px solid #e3e3e3;
  height: 100%;
}
.right {
  height: 100%;
}

.speak {
  background-color: beige;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>