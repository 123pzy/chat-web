import HomePage from "./page/HomePage.vue";
import LoginPage from "./page/LoginPage.vue";
import ProfileEdittingPage from "./page/ProfileEdittingPage.vue";
import ProfilePage from "./page/ProfilePage.vue";
import ChatPage from "./page/ChatPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import BuyVip from "./page/BuyVip.vue";
import GetTutorial from "./page/GetTutorial.vue";
import { judgmentIsLogin } from "./api/request";

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
  console.log(token);
  // 判断用户是否有token或者token是否过期
  const res = await judgmentIsLogin({ token });
  console.log("res.data:", res.data);
  // console.log("res.data.islogin:", res.data.islogin);
  // startsWith()能够匹配到所有以'/login'开头的路径
  if (to.path != "/login") {
    if (!res.data.islogin) {
      alert(res.data.message);
      return "/login";
    }
  }
});

export { router };
