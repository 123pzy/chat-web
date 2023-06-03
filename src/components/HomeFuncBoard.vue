<script setup>
import sprite from "../assets/icon/sprite.svg";
import sprite2 from "../assets/icon/sprite2.svg";
import { useFuncBroad } from "../stores/funcBoard.js";
import { useFuncCate } from "../stores/funcCate";
import { ElMessage } from "element-plus";
import { useStyle } from "../stores/style";
import { storeToRefs } from "pinia";

const style = useStyle();
const { fontColor } = storeToRefs(style);
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
// 需要科学上网提醒
function showWarning() {
  ElMessage({
    message:
      "温馨提示，本网站暂时只支持科学上网才能访问chatGPT，未来将实现所有用户都可访问！",
  });
}
// icon的填充色fill
// const fillColor = ref({
//   none: true,
// });
</script>

<template>
  <div id="boardContainer">
    <div
      class="funcboard_content"
      v-for="board in funcBoard.funcBoard"
      v-show="funcCate.cate === '全部' ? true : board.label === funcCate.cate"
      @click="
        $router.push(`${board.route}`);
        showWarning();
      "
    >
      <svg class="funcboard_icon">
        <use
          :href="`${fontColor == '#f5f5f5' ? sprite : sprite2}#icon-${board.icon}`"
          fill="none"
        ></use>
      </svg>
      <div class="funcboard_text">{{ board.func }}</div>
    </div>
    <div @click="addFuncBoard">
      <img src="../assets/icon/plus.svg" alt="" class="addButton" />
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
