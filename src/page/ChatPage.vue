<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChat } from "../stores/chat";
import { useFuncBoard } from "../stores/funcBoard";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import Chat from "../components/Chat.vue";
import { ElMessage } from "element-plus";
import {
  deleteRemainTimes,
  getUsername,
  chatEventSource,
  haveOwnOpenAItoken,
  sendMessageArray,
  getUsersFuncBoard,
} from "../api/request";
import { marked } from "marked";

// 获取DOM
const chatContext = ref(null);
// pinia
const route = useRoute();
const chat = useChat();
const funcBoard = useFuncBoard();
// router
const router = useRouter();
// 获取用户名
const token = localStorage.getItem("token");
if (!!token) {
  var username_res = await getUsername({ token });
  var username = username_res.data.username;
}
const sended = ref(false); // 控制不能在上一次sendQuestion的请求没结束时就发送第二次请求
// 定义html
async function sendQuestion() {
  chat.htmlBefore = "";
  if (chat.pushed == true && sended.value == false) {
    sended.value = !sended.value;
    // chatGPT免费使用次数减一
    const remainTimesRes = await deleteRemainTimes(username);
    // 判断是否还有使用次数
    if (remainTimesRes.data.remainTimes >= 0) {
      // 发送SSE请求,重点！
      const tokenObj = { token: token };
      const res_openAItoken = await haveOwnOpenAItoken(tokenObj);
      if (res_openAItoken !== "noOpenAI_token") {
        // 发送请求，传递openAI_token和messageArr
        let data = { openAI_token: res_openAItoken, message: chat.messages };
        await sendMessageArray(data);
      } else {
        // 发送请求，只传递messageArr
        let data = { message: chat.messages };
        await sendMessageArray(data);
      }
      const eventSource = chatEventSource();
      chat.messages.push({
        role: "assistant",
        content: "",
      });
      eventSource.onmessage = (event) => {
        if (!event.data.includes("[DONE]")) {
          chat.htmlBefore += event.data;
          chat.messages[chat.messages.length - 1].content = marked.parse(
            chat.htmlBefore
          );
        } else if (event.data.includes("[DONE]")) {
          eventSource.close();
        }
      };
      eventSource.onerror = (error) => {
        console.error("流式传输发生错误：", error);
        ElMessage({
          showClose: true,
          message: "你给的token似乎不太对哦",
          type: "error",
        });
      };
      chat.pushed = !chat.pushed;
      sended.value = !sended.value;
    } else {
      ElMessage({
        showClose: true,
        message: `${remainTimesRes.data.message}`,
        type: "error",
      });
    }
  } else {
    if (chat.pushed == false) {
    } else if (sended.value == true) {
    }
  }
}

// 点击侧边栏按钮跳转chat界面
async function handleRouterPush(route) {
  await router.push(route);
  await reGetFuncBoard();
}

// 重新获取funcBoard
async function reGetFuncBoard() {
  const res = await getUsersFuncBoard(username);
  funcBoard.funcBoard = JSON.parse(res.data.funcBoard);
  funcBoard.funcBoardCurrent = funcBoard.funcBoard.find((item) => {
    return item.route == route.params.route;
  });
  const system_message = {
    role: "system",
    content: funcBoard.funcBoardCurrent.message,
  };
  chat.messages.push(system_message);
}

onMounted(async () => {
  reGetFuncBoard();
});
</script>

<template>
  <div class="chat_container">
    <aside class="chat_history">
      <div class="func-btn-title">切换模块</div>
      <div class="chat_every_history">
        <div
          v-for="board in funcBoard.funcBoard"
          class="func-btn"
          @click="handleRouterPush(board.route)"
        >
          {{ board.func }}
        </div>
      </div>
    </aside>
    <div class="chat_content">
      <div class="chat_context" ref="chatContext">
        <Suspense><Chat :chatContext="chatContext"></Chat></Suspense>
      </div>
      <div class="chat_question_box">
        <InputComponent
          :height="35"
          :width="60"
          @keydown.enter.native="sendQuestion"
          :placeholder="funcBoard.funcBoardCurrent.placeholder || '请输入...'"
        ></InputComponent>
        <ButtonComponent @click.native="sendQuestion" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat_container {
  display: flex;
  height: 88.5vh;
  width: 100%;
  box-sizing: border-box;

  .chat_history {
    flex: 1;
    border-right: 2px solid #666;
    overflow: auto; // 添加滚动条
    .func-btn-title {
      color: #fff;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-weight: 600;
    }
    .chat_every_history {
      padding-left: 8px;
      padding-right: 8px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
      text-align: center;
      .func-btn {
        color: #fff;
        font-size: 14px;
        height: 35px;
        box-shadow: 0 0 0 0.5px #4ca488;
        line-height: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
        cursor: pointer;
      }
    }
  }
  .chat_content {
    flex: 4;
    display: grid;
    grid-template-rows: 1fr 70px;
    .chat_context {
      margin-top: 3vh;
      width: 95%;
      margin-left: 2.5%;
      overflow: auto; // 添加滚动条
      padding-bottom: 10px;
      border-bottom: 1px solid #353535;
    }
    // 隐藏滚动条
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    ::-webkit-scrollbar-thumb {
      display: none; /* Chrome Safari */
    }

    .chat_question_box {
      align-self: flex-end;
      flex-basis: 60vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      margin-bottom: 20px;
    }
  }
}
</style>
