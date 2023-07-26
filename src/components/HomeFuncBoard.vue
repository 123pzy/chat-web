<script setup>
import sprite from "../assets/icon/sprite.svg";
import sprite2 from "../assets/icon/sprite2.svg";
import { useFuncBroad } from "../stores/funcBoard.js";
import { useFuncCate } from "../stores/funcCate";
import { useStyle } from "../stores/style";
import { storeToRefs } from "pinia";
import { ElMessage, ElMessageBox } from "element-plus";

const style = useStyle();
const { fontColor, theme } = storeToRefs(style);
const funcBoard = useFuncBroad();
const funcCate = useFuncCate();
const funcBoard_list = funcBoard.funcBoard;

// element弹出输入框
const open = () => {
  ElMessageBox.prompt(
    "请输入你要chatGPT扮演一个什么样的角色，比如你想让它做你的英语老师，检查你的英文是否包含语法错误，你就可以说:你现在是我的英文老师，检查我发给你的每段英文中是否包含语法错误。关于chatgpt扮演的角色描述的越详细越好~",
    "自定义chatgpt",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      inputErrorMessage: "输入的不对哦~",
      lockScroll: false,
    }
  )
    .then(({ value }) => {
      if (value) {
        const message = value;
        setTimeout(() => {
          ElMessageBox.prompt("请给你的自定义板块起个名字", "输入板块名", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            inputErrorMessage: "输入的不对哦~",
            lockScroll: false,
          })
            .then(({ value }) => {
              if (value) {
                console.log(value);
                funcBoard_list.push({
                  id: funcBoard_list.length + 1,
                  func: value,
                  icon: "all",
                  label: "",
                  route: `chat_your-maked-${funcBoard_list.length + 1}`,
                  message: `${message}`,
                });
                ElMessage({
                  type: "success",
                  message: `自定义功能成功，快去试试吧！`,
                });
              }
            })
            .catch(() => {
              ElMessage({
                type: "info",
                message: "自定义功能很好玩的~再试试吧~",
              });
            });
        }, 500);
        ElMessage({
          type: "success",
          message: `下面输入你自定义板块的名字吧`,
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "自定义功能很好玩的~再试试吧~",
      });
    });
};
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
    <div @click="open">
      <img
        src="../assets/icon/plus.svg"
        alt=""
        class="addButton"
        v-if="theme == 'blackTheme'"
      />
      <img src="../assets/icon/plus2.svg" alt="" class="addButton" v-else />
      <div>增加自定义功能</div>
      <!-- <el-button text @click="open">增加自定义功能</el-button> -->
    </div>
    <!-- element输入框 -->
  </div>
</template>

<style lang="scss" scoped>
$font-color: v-bind(fontColor);
#boardContainer {
  // grid布局
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10vw, 150px));
  justify-content: center;
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
