<template>
  <div id="Home">
    <nav-bar class="home-nav"
      ><template v-slot:center> 购物街 </template></nav-bar
    >
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <div v-for="item in 100" :key="item">fff</div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
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
</style>