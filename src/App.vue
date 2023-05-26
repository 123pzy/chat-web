<script setup>
import NavBar from "./components/NavBar.vue";
import LoginPage from "./page/LoginPage.vue";
import { watch } from "vue";
import { useChat } from "./stores/chat";
import { useRoute } from "vue-router";
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
  <template v-if="$route.name !== '/login'">
    <header class="header">
      <NavBar></NavBar>
    </header>
    <router-view></router-view>
  </template>
  <template v-if="$route.path === '/login'">
    <LoginPage></LoginPage>
  </template>
</template>

<style scoped></style>
