<script setup>
import HomeButton from "../components/HomeButton.vue";
import HomeFuncBoard from "../components/HomeFuncBoard.vue";
import InputComponent from "../components/InputComponent.vue";
import { useFuncCate } from "../stores/funcCate";
import { useChat } from "../stores/chat";
import { useStyle } from "../stores/style";
import { ElNotification } from "element-plus";
import { storeToRefs } from "pinia";

const funcCate = useFuncCate();
const chat = useChat();
const style = useStyle();
const { showNum } = storeToRefs(style);
// 控制消息弹出框只显示两次
if (showNum.value <= 1) {
  ElNotification({
    title: "温馨提示",
    message:
      '这个网站是国外站点，访问速度可能比较慢。国内站点为：<a href="http://www.dapanna.cn:3000">http://www.dapanna.cn:3000</a>',
    dangerouslyUseHTMLString: true,
    duration: 6500,
    position: "bottom-right",
  });
  showNum.value++;
}
</script>

<template>
  <div class="inp_box">
    <InputComponent
      :height="30"
      :width="97"
      @keyup.enter.native="funcCate.cate = chat.say"
      placeholder="搜索场景名"
    ></InputComponent>
  </div>
  <HomeButton></HomeButton>
  <HomeFuncBoard></HomeFuncBoard>
</template>

<style lang="scss" scoped>
.inp_box {
  height: 50px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
</style>
