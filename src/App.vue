<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar class="tabbar"></main-tab-bar>
    
  </div>
</template>

<script>
import MainTabBar from '@/components/content/MainTabBar/MainTabBar'


export default {
  name: "App",
  components: {
    MainTabBar
  },
};
</script>

<style>
@import "~@/assets/css/base.css";

.tabbar{
  z-index: 100;
}
</style>