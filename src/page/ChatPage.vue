<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useChat } from "../stores/chat";
import { useFuncBroad } from "../stores/funcBoard";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import Chat from "../components/Chat.vue";
import { ElMessage } from "element-plus";
import {
  deleteRemainTimes,
  getUsername,
  chatEventSource,
} from "../api/request";
import { useStyle } from "../stores/style";
import { storeToRefs } from "pinia";
import showdown from "showdown";

// 渲染输出的markdown样式
let converter = new showdown.Converter();
// 显示表格
converter.setOption("tables", true);
const style = useStyle();
const { fontColor } = storeToRefs(style);
// pinia
const route = useRoute();
const chat = useChat();
const funcbroad = useFuncBroad();
// 获取用户名
const token = localStorage.getItem("token");
if (!!token) {
  var username_res = await getUsername({ token });
  var username = username_res.data.username;
}
// 传递system的content到chat.js中：
const funcBoardList = funcbroad.funcBoard.find((item) => {
  return item.route == route.params.route;
});
// 判断是不是在自定义功能板块刷新了页面，是的话执行：
let newMessage;
if (funcBoardList == undefined) {
  const func = prompt("请重新输入场景！");
  newMessage = func;
}
const system_message = {
  role: "system",
  content: `${funcBoardList != undefined ? funcBoardList.message : newMessage}`,
};
chat.messages.push(system_message);
const sended = ref(false); // 控制不能在上一次sendQuestion的请求没结束时就发送第二次请求
// 定义html
var chatRefs = storeToRefs(chat);
async function sendQuestion() {
  chat.htmlBefore = "";
  if (chat.pushed == true && sended.value == false) {
    sended.value = !sended.value;
    // chatGPT免费使用次数减一
    const remainTimesRes = await deleteRemainTimes(username);
    // 判断是否还有使用次数
    if (remainTimesRes.data.remainTimes >= 0) {
      // 发送SSE请求,重点！
      const eventSource = chatEventSource(chat.messages);
      chat.messages.push({
        role: "assistant",
        content: "",
      });
      eventSource.onmessage = (event) => {
        if (!event.data.includes("[DONE]")) {
          chat.htmlBefore += event.data;
          chat.messages[chat.messages.length - 1].content = converter.makeHtml(
            chat.htmlBefore
          );
        } else if (event.data.includes("[DONE]")) {
          eventSource.close();
        }
      };
      eventSource.onerror = (error) => {
        console.error("流式传输发生错误：", error);
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
const chatContext = ref(null);
</script>

<template>
  <div class="chat_container">
    <aside class="chat_history">
      <div class="chat_every_history"></div>
    </aside>
    <div class="chat_content">
      <div class="chat_context" ref="chatContext">
        <Suspense><Chat :chatContext="chatContext"></Chat></Suspense>
      </div>
      <div class="chat_question_box">
        <InputComponent
          :height="35"
          :width="60"
          placeholder="请输入你的问题..."
          @keydown.enter.native="sendQuestion"
        ></InputComponent>
        <ButtonComponent @click.native="sendQuestion" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat_container {
  display: flex;
  height: 91vh;
  width: 100%;
  box-sizing: border-box;

  .chat_history {
    flex: 1;
    border-right: 2px solid v-bind(fontColor);
  }
  .chat_content {
    flex: 4;
    width: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .chat_context {
      margin-top: 3vh;
      height: 78vh;
      width: 95%;
      overflow: auto; // 添加滚动条
      padding-bottom: 10px;
      border-bottom: 1px solid #353535;
    }
    // 隐藏滚动条：
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .chat_question_box {
      align-self: flex-end;
      flex-basis: 60vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      position: fixed;
      bottom: 30px;
    }
  }
}
</style>
