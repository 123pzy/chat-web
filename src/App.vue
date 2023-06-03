<script setup>
import { ref, watch, defineAsyncComponent } from "vue";
import { useChat } from "./stores/chat";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useStyle } from "./stores/style";

const style = useStyle();
const { bgColor } = storeToRefs(style);
console.log(bgColor.value);

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
  <div class="app">
    <template v-if="$route.name !== 'login'">
    <header>
      <Suspense><NavBar></NavBar></Suspense>
    </header>
    <Suspense><router-view></router-view></Suspense>
  </template>
  <template v-if="$route.name === 'login'">
    <Suspense><LoginPage></LoginPage></Suspense>
  </template>
  </div>
</template>

<style lang="scss">
$bgcolor:v-bind(bgColor);
.app {
  height: 100%;
  width: 100%;
  background-color: $bgcolor;
}
</style>
