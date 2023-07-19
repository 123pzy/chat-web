import { defineStore } from "pinia";
import { useFuncBroad } from "./funcBoard";

export const useChat = defineStore("chat", {
  state: () => {
    return {
      say: "",
      messages: [],
      pushed: false,
      content: "",
      htmlBefore: '',
      test: '',
      currentFuncBoard: '',
      contentBox: '',
    };
  },
  getters: {

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
    }
  },
});
