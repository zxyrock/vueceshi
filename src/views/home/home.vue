<template>
  <div id="Home">
    <nav-bar class="home-nav"><template v-slot:center> 购物街 </template></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"/>
    
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from '@/components/content/TabControl/TabControl';
import GoodsList from '@/components/content/goods/GoodsList';

import { getHomeMultidata,getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles:['流行','新款','热销'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType:'pop'
    };
  },
  computed:{
    showGoods(){
     return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求首页的多个数据
    this.getHomeMultidata();

      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      
  },
  methods: {
    /*
      事件监听相关方法
     
    */
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType ="pop";
          break;
        case 1:
          this.currentType ="new";
          break;
        case 1:
          this.currentType ="sell";
          break;
      }

    },

    /*
       网络请求相关方法
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }).catch(err => {
        console.log("首页数据请求失败", err);
      });
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

      }).catch(err=>{
        console.log('请求商品数据失败',err)
      })
    }
    
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
  z-index: 9;
}

</style>