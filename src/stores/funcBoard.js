import { defineStore } from "pinia";

export const useFuncBroad = defineStore("funcBoard", {
  state: () => {
    return {
      funcBoard: [
        {
          id: 1,
          func: "万能",
          icon: "all",
          label:'',
          router:'/chat_all'
        },
        {
          id: 2,
          func: "写代码",
          icon: "coding",
          label:'职业'
        },
        {
          id: 3,
          func: "联网模式",
          icon: "network",
          label:'职业',
          router:'chat_profession'
        },
        {
          id: 4,
          func: "写简易论文",
          icon: "paper",
          label:'职业'
        },
        
        {
          id: 5,
          func: "论文降重",
          icon: "weigth-reduction",
        },
        {
          id: 6,
          func: "文章扩写",
          icon: "article-expansion",
        },
        {
          id: 7,
          func: "小红书文案",
          icon: "little-red-book",
        },
        {
          id: 8,
          func: "AI写诗",
          icon: "writing-poetry",
        },
        {
          id: 9,
          func: "解释代码",
          icon: "explain-code",
        },
        {
          id: 10,
          func: "视频脚本",
          icon: "video-scripts",
        },
        {
          id: 11,
          func: "情感表白",
          icon: "all",
        },
        {
          id: 12,
          func: "虚拟女友",
          icon: "all",
        },
        {
          id: 13,
          func: "文章润色",
          icon: "all",
        },
        {
          id: 14,
          func: "知乎回答",
          icon: "all",
        },
        {
          id: 15,
          func: "写作助理",
          icon: "all",
        },
        {
          id: 16,
          func: "小说家",
          icon: "all",
        },
        {
          id: 17,
          func: "画图提示词V5",
          icon: "all",
        },
        {
          id: 18,
          func: "写广告文案",
          icon: "all",
        },
        {
          id: 19,
          func: "中文论文润色",
          icon: "all",
        },
        {
          id: 20,
          func: "找图片",
          icon: "all",
        },
        {
          id: 21,
          func: "面试模拟",
          icon: "all",
        },
        {
          id: 22,
          func: "论文大纲",
          icon: "all",
        },
        {
          id: 23,
          func: "前端助手",
          icon: "all",
        },
        {
          id: 24,
          func: "中译外",
          icon: "all",
        },
      ],
    };
  },
});
