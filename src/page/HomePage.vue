<script setup>
import HomeButton from "../components/HomeButton.vue";
import HomeFuncBoard from "../components/HomeFuncBoard.vue";
import InputComponent from "../components/InputComponent.vue";
import ProfileEdittingPage from "./ProfileEdittingPage.vue";
</script>

<template>
    <div class="inp_box">
      <InputComponent
        :height="30"
        :width="97"
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
