<script setup>
import { ref } from "vue";
import "/node_modules/github-markdown-css/github-markdown-light.css";
const props = defineProps(["role", "content", "html"]);
var style_say;
var style_answer;
var showFirstSystem = true; // 这个变量控制第一次的system不显示在聊天框中

// 要优化下边的代码：
if (props.role === "user") {
  style_answer = ref({
    display: "none",
  });
} else if (props.role === "assistant") {
  style_say = ref({
    display: "none",
  });
} else if (props.role === "system") {
  showFirstSystem = false;
} else if (props.role != "system") {
  showFirstSystem = true;
}
const styleGitHubCss = ref("markdown-body");
</script>

<template>
  <div class="chat" v-if="showFirstSystem">
    <div class="answer_container" :style="style_answer">
      <img src="../assets/头像.jpg" alt="" />
      <!-- 这里使用到了v-html，所以必须搭配上v-once使用，不然会导致所有的span的内容同时修改 -->
      <span
        class="answer_content"
        v-html="props.html"
        :class="styleGitHubCss"
        v-once
      ></span>
    </div>
    <div class="say_container" :style="style_say">
      <span class="say_content"> {{ props.content }} </span>
      <img src="../assets/头像2.jpg" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$contentMarginTop: 25px;
.say_container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 40px;
  height: auto;
  max-width: 800px;
  padding-left: 50%;
  padding-top: $contentMarginTop;
  .say_content {
    display: flex;
    align-items: center;
    height: 80%;
    background-color: #fff;
    // 设置自动换行：
    word-wrap: break-word;
    word-break: break-all;
    // text-align: center;
    min-height: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    border-radius: 3px;
  }
  .say_content::after {
    content: "";
    // css绘制三角形：
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #fff;
    position: relative;
    // 控制伪元素的位置：
    left: 20px;
    top: 0px;
  }
  img {
    height: 100%;
    width: 40px;
    margin-left: 15px;
  }
}

// answer:
.answer_container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 40px;
  height: auto;
  max-width: 800px;
  padding-right: 100px;
  padding-top: $contentMarginTop;
  .answer_content {
    height: 100%;
    background-color: #fff;
    // padding: 10px;
    // 设置自动换行：
    word-wrap: break-word;
    word-break: break-all;
    min-height: 40px;
    padding-top: 0px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 3px;
  }
  .answer_content::before {
    content: "";
    // css绘制三角形：
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #fff;
    position: relative;
    // 控制伪元素的位置：
    left: -28px;
    top: 5px;
  }
  img {
    height: 100%;
    width: 40px;
    margin-right: 15px;
  }
}
</style>
