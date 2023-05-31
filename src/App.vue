<script setup>
import { watch, defineAsyncComponent } from "vue";
import { useChat } from "./stores/chat";
import { useRoute } from "vue-router";
const NavBar = defineAsyncComponent(() => import("./components/NavBar.vue"));
const LoginPage = defineAsyncComponent(() => import("./page/LoginPage.vue"));

const route = useRoute();
const chat = useChat();
// 如果改变了功能板块，清空messages:
watch(
  () => route.path,
  () => {
    chat.$reset();
  }
);
</script>

<template>
  <template v-if="$route.name !== 'login'">
    <header>
      <Suspense><NavBar></NavBar></Suspense>
    </header>
    <Suspense><router-view></router-view></Suspense>
  </template>
  <template v-if="$route.name === 'login'">
    <Suspense><LoginPage></LoginPage></Suspense>
  </template>
</template>

<style scoped></style>
