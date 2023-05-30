<script setup>
// pinia
import { useFuncCate } from "../stores/funcCate";
const funcCate = useFuncCate();
function getFuncCate(e) {
  funcCate.cate = e.target.textContent;
}
</script>

<template>
  <div id="button_content">
    <div class="button_container">
      <div
        @click="getFuncCate"
        v-for="cate in funcCate.funcCate"
        :key="cate.id"
      >
        {{ cate.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 设置最外边的容器
#button_content {
  height: 40px;
  width: 100vw;
  background-color: #18181c;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 设置第二层容器
.button_container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  flex-basis: 97vw;
  background-color: #303033;
  gap: 1px;
  padding-left: 4px;
  padding-right: 4px;
  box-sizing: border-box; /* 设置padding不撑大总体大小 */
  border-radius: 2px;
  div {
    flex: 1; /*每个div的长度相等 */
    display: flex; /*为了设置每个div里的文字居中 */
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    height: 32px;
    border-radius: 3px;
  }
  div:hover {
    background-color: #454548;
  }
}
</style>
