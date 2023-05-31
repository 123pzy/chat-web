<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { getRemainTimes, getUsername, updateUsername } from "../api/request";

const router = useRouter();
const token = localStorage.getItem("token");
// 上传图片成功后执行
const handleAvatarSuccess = () => {
  router.go(0);
};
// 上传图片之前执行
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type === "image/jpeg" || rawFile.type === "image/png") {
    if (rawFile.size / 1024 / 1024 > 2) {
      alert("头像大小不能超过2MB!");
      return false;
    } else {
      return true;
    }
  }
  alert("头像必须为图片形式哦!");
  return false;
};

// 输入框内容
const input_content = ref(null);

// 获取剩余次数
const result = await getRemainTimes({
  token,
});
const remainTimes = result.data.remainTimes;

// 获取用户名
const username_res = await getUsername({ token });
const username = username_res.data.username;

// 修改用户名
async function changeUsername() {
  if (input_content.value === null) {
    ElMessage({
      showClose: true,
      message: "请输入您要修改的用户名！",
    });
  } else {
    const res = await updateUsername({
      token,
      newUsername: input_content.value,
    });
    alert(res.data.message);
    router.go(0);
  }
}
const imgUrl = import.meta.env.MODE=== 'development'?` /api/profile/getimg/${token}` : `/profile/getimg/${token}`
const imgUrl2 = import.meta.env.MODE === 'development' ? '/api/profile/' + `${token}` : '/profile/' + `${token}`
</script>

<template>
  <div class="profileInfo">
    <div class="profileInfo_content">
      <div class="title">编辑用户资料</div>
      <span>用户头像：</span>
      <el-upload
        class="avatar-uploader"
        :action="imgUrl2"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="true" :src="imgUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"
          ><Plus
        /></el-icon> </el-upload
      ><span>(点击头像进行修改)</span>
      <hr />
      <span>用户名：</span>
      <el-input
        :placeholder="username"
        v-model="input_content"
        clearable
        class="input"
      ></el-input>
      <el-button type="primary" @click="changeUsername">修改用户名</el-button>
      <div>剩余使用次数：{{ remainTimes }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.title {
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.profileInfo {
  height: 91vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin-top: 3vh;
    margin-bottom: 3vh;
  }
  span {
    margin-top: 3vh;
    margin-bottom: 3vh;
  }
}
.profileInfo_content {
  height: 85vh;
  width: 40%;
  background-color: #bdc3c7;
  border-radius: 6%;
  padding: 20px;
  font-size: 1.2em;
}
.avatar-uploader {
  margin: 30px;
  display: inline-block;
}
.input {
  width: 25vw;
  background-color: #fff;
  margin: 20px;
}
</style>
