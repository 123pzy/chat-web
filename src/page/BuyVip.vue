<script setup></script>

<template>
  <div class="container">
    <div class="qrcode">
      <img src="../assets/weixin.jpg" alt="" />
      <hr />
      <span class="text">扫码加微信，0.08元购买一次chatGPT使用机会</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 91vh;
  width: 100%;
  background-color: #18181c;
}
.qrcode {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #18181c;
  margin-top: 10vh;
  img {
    height: 100%;
    width: 15vw;
    margin-right: 2vw;
  }
  .text {
    color: #fff;
    text-align: center;
    font-size: 1.5em;
  }
}
</style>
