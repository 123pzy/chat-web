<script setup>
import sprite from "../assets/icon/sprite.svg";
import sprite2 from "../assets/icon/sprite2.svg";
import { useFuncBroad } from "../stores/funcBoard.js";
import { useFuncCate } from "../stores/funcCate";
import { ElMessage } from "element-plus";
import { useStyle } from "../stores/style";
import { storeToRefs } from "pinia";

const style = useStyle();
const { fontColor, theme } = storeToRefs(style);
const funcBoard = useFuncBroad();
const funcCate = useFuncCate();
const funcBoard_list = funcBoard.funcBoard;

function addFuncBoard() {
  const func = prompt(
    "请输入你要chatGPT扮演一个什么样的角色，比如你想让它做你的英语老师，检查你的英文是否包含语法错误，你就可以说，你现在是我的英文老师，检查我发给你的每段英文中是否包含语法错误。描述的越详细越好~"
  );
  if (func) {
    funcBoard_list.push({
      id: funcBoard_list.length + 1,
      func: "你自定义的板块",
      icon: "all",
      label: "",
      route: `chat_your-maked-${funcBoard_list.length + 1}`,
      message: `${func}`,
    });
  }
}
</script>

<template>
  <div id="boardContainer">
    <div
      v-for="board in funcBoard.funcBoard"
      v-show="funcCate.cate === '全部' ? true : board.label === funcCate.cate"
      @click="$router.push(`${board.route}`)"
    >
      <svg class="funcboard_icon">
        <use
          :href="`${fontColor == '#f5f5f5' ? sprite : sprite2}#icon-${
            board.icon
          }`"
          fill="none"
        ></use>
      </svg>
      <div>{{ board.func }}</div>
    </div>
    <div @click="addFuncBoard">
      <img
        src="../assets/icon/plus.svg"
        alt=""
        class="addButton"
        v-if="theme == 'blackTheme'"
      />
      <img src="../assets/icon/plus2.svg" alt="" class="addButton" v-else />
      <div>增加自定义功能</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$font-color: v-bind(fontColor);
#boardContainer {
  // grid布局
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11vw, 150px));
  gap: 20px;
  padding-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  > div {
    height: 140px;
    box-shadow: 0 0 0 0.1px $font-color;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    div {
      font-size: 22px;
      padding-bottom: 10px;
    }
    .addButton {
      height: 60px;
    }
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 180px;
    color: $font-color;
  }
}
.funcboard_icon {
  height: 50px;
  width: 48px;
}
</style>
