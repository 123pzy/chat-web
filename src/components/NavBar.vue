<script setup>
import NavBarButton from "../components/NavBarButton.vue";
</script>

<template>
  <div id="nav">
    <div class="icon_box">
      <!-- logo图 -->
      <img src="../assets/icon/logo.svg" alt="" class="icon_cat"/>
      <h2 class="title">智慧喵</h2>
    </div>
    <Suspense><NavBarButton></NavBarButton></Suspense>
  </div>
</template>

<style lang="scss" scoped>
#nav {
  display: flex;
  justify-content: space-between;
  height: 9vh;
  width: 100%;
  min-height: 80px;
  box-shadow: 0 0 0 0.4px #57606f;
  // border-bottom: 1px solid #57606f;
  background-color: #18181c;
}
.icon_box {
  display: flex;
  align-items: center;
  flex-basis: 23vw;
  justify-content: flex-start;
  padding-left: 1vw;
  .title{
    color: #fff;
    font-size: 1.7vw;
    margin-left: 1vw;
  }
}
.icon_cat {
  height: 5vw;
  width: 5vw;
  min-width: 40px;
  min-height: 40px;
}
</style>
