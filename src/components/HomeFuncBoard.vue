<script setup>
import sprite from "../assets/icon/sprite.svg";
// pinia
import { useFuncBroad } from "../stores/funcBoard.js";
import { useFuncCate } from "../stores/funcCate";
const funcBoard = useFuncBroad();
const funcCate = useFuncCate();
</script>

<template>
  <div id="boardContainer">
    <div
      class="funcboard_content"
      v-for="board in funcBoard.funcBoard"
      v-show="funcCate.cate === '全部' ? true : board.label === funcCate.cate"
      @click="$router.push(`${board.route}`)"
    >
      <svg class="funcboard_icon">
        <use :href="`${sprite}#icon-${board.icon}`"></use>
      </svg>
      <div class="funcboard_text">{{ board.func }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#boardContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 20px;
  padding-top: 20px;
  .funcboard_content {
    height: 140px;
    box-shadow: 0 0 0 0.1px #fff;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 180px;
    color: #fff;
  }
}
.funcboard_content {
  display: flex;
  flex-wrap: wrap;
}
.funcboard_icon {
  height: 45px;
  width: 45px;
}
.funcboard_text {
  color: red;
  font-size: 22px;
  padding-bottom: 10px;
}
</style>
