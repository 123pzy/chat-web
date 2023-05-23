<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import { useChat } from "../stores/chat";
import InputComponent from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import Chat from "../components/Chat.vue";

import showdown from "showdown";

let converter = new showdown.Converter();
// 显示表格
converter.setOption("tables", true);

const chat = useChat();

// 请求参数：
const OPENAI_API_KEY = "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";
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
};
// chat.messages = []
const data = {
  model: "gpt-3.5-turbo",
  messages: chat.messages,
  temperature: 0.7,
};
const sended = ref(false); // 控制不能在上一次sendQuestion的请求没结束时就发送第二次请求
var html;
async function sendQuestion() {
  if (chat.pushed == true && sended.value == false) {
    sended.value = !sended.value;
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      config
    );
    chat.messages.push(res.data.choices[0].message);
    console.log(res.data.choices[0].message.content);
    html = converter.makeHtml(res.data.choices[0].message.content);
    console.log(html);

    chat.pushed = !chat.pushed;
    sended.value = !sended.value;
  } else {
    if (chat.pushed == false) {
      console.log("不能发送空字符串哦！");
    } else if (sended.value == true) {
      console.log("正在发送，请耐心等待！");
    }
  }
}
</script>

<template>
  <div class="chat_container">
    <aside class="chat_history">
      <div class="chat_every_history"></div>
    </aside>
    <div class="chat_content">
      <div class="chat_context">
        <Chat
          v-for="(message, index) in chat.messages"
          :role="message.role"
          :content="message.content"
          :key="index"
          :html="html"
        ></Chat>
      </div>
      <div class="chat_question_box">
        <InputComponent
          :height="35"
          :width="60"
          placeholder="请输入你的问题..."
          @keydown.enter="sendQuestion"
        ></InputComponent>
        <ButtonComponent @click="sendQuestion" />
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
    border-right: 2px solid #fff;
  }
  .chat_history {
    flex: 1;
    // border: 2px solid #fff;
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
