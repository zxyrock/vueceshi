<template>
  <div id="Home">
    <nav-bar class="home-nav"><template v-slot:center> 购物街 </template></nav-bar>
    <home-swiper :banners="banners"/>
    
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwiper';

import {getHomeMultidata} from '@/network/home';




export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper
  },
  data() {
    return {
      banners:[],
      recommendS:[]
    }
  },
  created(){
    // 1.请求首页的多个数据
    getHomeMultidata().then(res =>{
      console.log(res)
      this.banners = res.data.banner.list;
      this.recommendS = res.data.recommend.list;
    }).catch(err =>{
      console.log('数据请求失败',err)
    })
  }
};
</script>

<style>
.home-nav{
  background: var(--color-tint);
  color: #fff;
}
</style>