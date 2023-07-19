<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { getUsername } from "../api/request";
import { useStyle } from "../stores/style";
import { storeToRefs } from "pinia";

const style = useStyle();
const { fontColor, theme } = storeToRefs(style);
const token = localStorage.getItem("token");
// 获取用户名
const username_res = await getUsername({ token });
const username = username_res.data.username;
const router = useRouter();
// 退出登录
function logout() {
  localStorage.removeItem("token");
  router.go(0);
}
const imgUrl =
  import.meta.env.MODE === "development"
    ? ` /api/profile/getimg/${token}`
    : `/profile/getimg/${token}`;

// 改变色调：
function changeColor() {
  style.changefontColor();
}
</script>

<template>
  <div class="text_box">
    <span class="span_home" @click="$router.push('/')">首页</span>
    <span class="span_2">AI画图</span>
    <span class="span_3" @click="$router.push('/gettutorial')">教程</span>
    <span class="span_4" @click="$router.push('/buyvip')">购买次数</span>
    <img
      src="../assets/icon/moon.svg"
      alt=""
      class="icon_moon_sun"
      @click="changeColor"
      v-if="theme === 'blackTheme'"
    />
    <img
      src="../assets/icon/sun.svg"
      alt=""
      class="icon_moon_sun"
      @click="changeColor"
      v-else
    />
    <img src="../assets/icon/bell.svg" alt="" class="icon_bell" />
    <div class="headImage_box">
      <img
        :src="imgUrl"
        alt=""
        class="headImg"
        @click="$router.push('/profile/edit')"
      />
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/profile/edit')"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
$font-color: v-bind(fontColor);
.text_box {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-basis: 65vw;
  float: right;
  flex-wrap: wrap;
  gap: 18px;
  margin-right: 10px;
  span:nth-child(-n + 4) {
    color: $font-color;
    font-size: 0.85em;
    height: 20px;
    box-shadow: 0 0 0 0.5px #4ca488;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    cursor: pointer;
  }
  span:nth-child(1) {
    // 设置0.5px的边框
    box-shadow: 0 0 0 0.5px $font-color;
  }
  span:nth-child(2) {
    color: #63e2b7;
  }
  span:nth-child(3) {
    color: #65accf;
  }
  span:nth-child(4) {
    color: #63e2b7;
  }
  .icon_moon_sun {
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
  .icon_bell {
    height: 23px;
    width: 23px;
    background-color: #666;
    border-radius: 10%;
  }
  .headImage_box {
    height: 28px;
    width: 28px;
  }
  .headImg {
    height: 100%;
    width: auto;
    border-radius: 50%;
    cursor: pointer;
  }
  .myName {
    color: white;
    font-size: 14px;
  }
}

// element-plus下拉框
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  border: none;
}
</style>
