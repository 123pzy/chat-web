<script setup>
import { useStyle } from '../stores/style';
import {storeToRefs} from 'pinia'

const style = useStyle()
const {fontColor} = storeToRefs(style)
</script>

<template>
  <div class="container">
    <div class="qrcode">
      <img src="../assets/weixin.jpg" alt="" />
      <hr />
    </div>
    <span class="text">扫码加微信，0.08元购买一次chatGPT使用机会</span>
  </div>
</template>

<style lang="scss" scoped>
$font-color: v-bind(fontColor);

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
    min-width: 150px;
    margin-right: 2vw;
    margin-left: 2vw;
    margin-bottom: 10vh;
  }
}
.text {
  color: $font-color;
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 10vh;
}
</style>
