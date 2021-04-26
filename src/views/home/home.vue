<template>
  <div id="Home">
    <nav-bar class="home-nav"><template v-slot:center> 购物街 </template></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control class="tab-control" :titles="titles"/>
    <div v-for="item in 100" :key="item">{{item}}</div>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from '@/components/content/TabControl/TabControl'

import { getHomeMultidata } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles:['流行','新款','热销']
    };
  },
  created() {
    // 1.请求首页的多个数据
    getHomeMultidata()
      .then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      .catch((err) => {
        console.log("数据请求失败", err);
      });
  },
};
</script>

<style>
#Home {
  padding-top: 44px;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
}
</style>