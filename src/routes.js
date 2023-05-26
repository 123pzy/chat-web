import HomePage from "./page/HomePage.vue";
import LoginPage from "./page/LoginPage.vue";
import ProfileEdittingPage from "./page/ProfileEdittingPage.vue";
import ProfilePage from "./page/ProfilePage.vue";
import ChatPage from "./page/ChatPage.vue";
import { createRouter, createWebHistory } from "vue-router";

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
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export {router}