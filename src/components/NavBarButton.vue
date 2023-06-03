<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getUsername } from "../api/request";

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
const imgUrl = import.meta.env.MODE=== 'development'?` /api/profile/getimg/${token}` : `/profile/getimg/${token}`
</script>

<template>
  <div class="text_box">
    <span class="span_1" @click="$router.push('/')">首页</span>
    <span class="span_2">AI画图</span>
    <span class="span_3" @click="$router.push('/gettutorial')">教程</span>
    <span class="span_4" @click="$router.push('/buyvip')">购买次数</span>
    <svg
      t="1684050229865"
      class="icon_moon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3828"
      width="200"
      height="200"
    >
      <path
        d="M474.6366342 593.01998195c-126.50140315-126.50140315-151.8865366-316.07673119-78.20601-472.06448712-43.76990976 20.71822869-85.06494578 48.71965722-121.33952365 84.9942351C109.34527104 371.69555944 106.37542256 637.42628781 268.30287545 799.3537407c161.99816357 161.99816357 427.65818126 158.95760441 593.47472145-6.85893577 36.34528855-36.34528855 64.27600641-77.5696139 84.9942351-121.33952365-155.98775593 73.82194796-345.56308397 48.43681451-472.1351978-78.13529933z"
        p-id="3829"
        fill="white"
      ></path>
    </svg>
    <svg
      t="1684050446437"
      class="icon_bell"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6891"
      width="200"
      height="200"
    >
      <path
        d="M593.861938 788.582269 424.670537 788.582269c-9.444093 0-18.437931 3.931542-24.695448 10.902304-6.313799 6.970762-9.441023 16.32378-8.547677 25.675776 2.860141 29.191856 16.32378 56.238862 38.009685 76.018348 21.772886 20.016893 50.161447 31.0379 79.889515 31.0379 29.696346 0 58.084906-11.022031 79.830163-30.977525 21.714558-19.839861 35.178197-46.885843 38.068014-76.255755 0.595564-9.473769-2.534729-18.707061-8.638751-25.498744C612.299869 792.513812 603.306031 788.582269 593.861938 788.582269zM555.020304 863.825974c-25.082258 22.877033-66.604954 22.817682-91.567485 0.060375-7.596002-6.970762-13.404288-15.429411-17.157775-24.723078l125.82266 0C568.394916 848.51629 562.643935 856.914564 555.020304 863.825974z"
        fill="white"
        p-id="6892"
      ></path>
      <path
        d="M818.608631 648.343271l-62.763462-82.927711 0-36.22197 0-13.046131L755.845169 410.432767c0-70.745251-24.215518-136.337131-68.182892-184.682209-26.003234-28.625968-57.310264-49.715285-93.055372-62.821791-3.306302-18.944468-12.720719-36.251645-26.926256-49.207725-32.050973-29.251208-85.104283-29.251208-117.095905 0-14.356986 13.046131-23.77038 30.382984-26.986631 49.2681-35.71441 13.046131-67.022463 34.135448-93.025697 62.791092-43.937698 48.434106-68.183915 114.025986-68.183915 184.652534l0.179079 154.686035-62.315254 82.45085c-8.757454 9.353019-13.582343 21.506826-13.582343 34.256198l0 40.331567c0 27.643594 22.460548 50.042743 50.042743 50.042743l544.812313 0c27.610848 0 50.011021-22.400173 50.011021-50.042743l0-40.331567C831.535035 669.075455 826.739822 656.921647 818.608631 648.343271zM535.776008 149.881612c-7.387247-0.655939-19.301602-1.906419-26.569122-1.906419-7.29822 0-19.689435 1.251503-27.048029 1.906419C494.578724 129.627313 526.542716 133.379777 535.776008 149.881612zM237.426992 722.156394l-0.119727-40.034808 62.315254-82.449827c8.698103-9.354042 13.524015-21.447475 13.524015-34.256198L313.146535 410.432767c0-58.056254 19.540032-111.553679 54.986335-150.634766 17.574261-19.361977 38.307468-34.374902 61.540611-44.681642 48.851615-21.745257 110.302175-21.745257 159.096485 0 23.321148 10.425444 43.99398 25.438369 61.538565 44.681642 35.449373 39.081087 54.958706 92.578512 54.958706 150.634766l0 105.715717 0 13.046131 0 36.22197c0 12.867052 4.825912 25.081235 12.95608 33.539884l62.791092 82.868359 0.508583 39.795355L237.426992 722.156394z"
        fill="white"
        p-id="6893"
      ></path>
    </svg>
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
    color: aliceblue;
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
    box-shadow: 0 0 0 0.5px #fff;
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
  .icon_moon {
    height: 20px;
    width: 20px;
  }
  .icon_bell {
    height: 20px;
    width: 20px;
  }
  .headImage_box {
    height: 25px;
    width: 25px;
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
