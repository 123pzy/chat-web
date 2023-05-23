import { defineStore } from "pinia";

export const useChat = defineStore("chat", {
  state: () => {
    return {
      say: "",
      messages: [{ role: "system", content: "和我聊聊天吧！" }],
      pushed: false,
      content:'',
    };
  },
  actions: {
    toSay() {
      if (this.say != "" && this.pushed == false) {
        this.messages.push({
          role: "user",
          content: `${this.say}`,
        });
        this.say = "";
        this.pushed = !this.pushed;
      }
    },
  },
});
