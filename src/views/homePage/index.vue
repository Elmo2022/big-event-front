
<template>
  <el-input style="width: 30%"></el-input>
  <div class="waterfall">
    <div class="item" @click="dialogVisible=true" >
      <img src="@/assets/demo1.jpg" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo2.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo3.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo4.jpeg" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo2.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo3.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo4.jpeg" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo1.jpg" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo2.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo3.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo4.jpeg" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo1.jpg" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo3.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo4.jpeg" alt="" />
      <span>测试瀑布流</span>
    </div>   
     <div class="item">
      <img src="@/assets/demo2.png" alt="" />
      <span>测试瀑布流</span>
    </div>    
    <div class="item">
      <img src="@/assets/demo2.png" alt="" />
      <span>测试瀑布流</span>
    </div>  
    <div class="item">
      <img src="@/assets/demo2.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo2.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo2.png" alt="" />
      <span>测试瀑布流</span>
    </div>
    <div class="item">
      <img src="@/assets/demo4.jpeg" alt="" />
      <span>测试瀑布流</span>
    </div>  

  
  </div>
  <!-- <VideoPlayer/> -->
  <!-- <PopDialog  /> -->
  <el-dialog
      style="
        border-radius: 15px;
        height: 600px;
        width: 900px;
        margin-top: 100px;
      "
      v-model="dialogVisible"
    >
      <div class="container" style="width: 100%; height: 100%">
        <div
          class="left"
          style="
            width: 450px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <VideoPlayer />
        </div>
        <div
          class="right-content"
          style="height: 100%; width: 450px; display: flex; flex-wrap: wrap"
        >
          <div class="speak" style="width: 100%; height: 60px">
            作者头像和名称
          </div>
          <div style="overflow: auto; background-color: aqua">
            <div style="height: 440px; width: 100%">
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="drawer-con"
            style="width: 100%; height: 60px; background-color: #000000"
          >
            发言区
            <button @click="showDrawer">发言</button>
            <button>取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
</template>

  <script setup>
import VideoPlayer from "../../components/VideoPlayer.vue";
import PopDialog from "../../components/PopDialog.vue";
import { ref } from "vue";
const dialogVisible = ref(false)
// 控制弹窗显示隐藏
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

const drawerShow = ref(false);
const showDrawer = () => {
  drawerShow.value = true;
};
</script>
  
  
  
  <style scoped>
.waterfall {
  column-count: 5;
  column-gap: 0px;
}
.item {
  break-inside: avoid;
  margin-bottom: 10px;
  width: 200px;
  cursor: pointer;
}
.item img {
  width: 100%;
  height: auto;
}
.item span {
  display: block;
  text-align: center;
}
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
</style>
  