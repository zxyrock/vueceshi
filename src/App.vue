<template>
  <div id="app" class="wrapper">
    <!-- <router-view /> -->
    <router-view v-slot="{ Component }">
      <keep-alive include="Home,News" exclude="detail">
        <component class="view" :is="Component" />
      </keep-alive>
    </router-view>

    <main-tab-bar class="tabbar" />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/MainTabBar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "~@/assets/css/base.css";

/* #app{
  height: 100vh;
} */

.tabbar {
  z-index: 100;
}
</style>