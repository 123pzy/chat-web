import HomePage from "./page/HomePage.vue";
import LoginPage from "./page/LoginPage.vue";
import ProfileEdittingPage from "./page/ProfileEdittingPage.vue";
import ProfilePage from "./page/ProfilePage.vue";
import ChatPage from "./page/ChatPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import BuyVip from "./page/BuyVip.vue";
import GetTutorial from "./page/GetTutorial.vue";
import { judgmentIsLogin } from "./api/request";
import { ElMessage } from "element-plus";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/:route",
    name: "chat",
    component: ChatPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: "/profile/edit",
    name: "profileEdit",
    component: ProfileEdittingPage,
  },
  {
    path: "/buyvip",
    name: "buyvip",
    component: BuyVip,
  },
  {
    path: "/gettutorial",
    name: "gettutorial",
    component: GetTutorial,
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

// 全局导航守卫
router.beforeEach(async (to, from) => {
  const token = localStorage.getItem("token");
  // 判断用户是否有token或者token是否过期
  const res = await judgmentIsLogin({ token });
  if (to.path != "/login") {
    if (!res.data.islogin) {
      ElMessage({
        showClose: true,
        message: `${res.data.message}`,
      });
      return "/login";
    }
  }
});

export { router };
