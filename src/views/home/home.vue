<template>
  <div id="Home">
    <nav-bar class="home-nav"><template v-slot:center> 购物街 </template></nav-bar>
    <scroll class="content" ref="scroll" 
            :probe-type="3" :pull-up-load="true" 
            @scroll="contentScroll" >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop"/>
    </div>
    
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from '@/components/content/TabControl/TabControl';
import GoodsList from '@/components/content/goods/GoodsList';
import Scroll from '@/components/content/scroll/Scroll';
import BackTop from '../../components/content/backTop/BackTop';

import { getHomeMultidata,getHomeGoods } from "@/network/home";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
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
      currentType:'pop',
      isShowBackTop:false
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
  mounted(){
    // 3.监听goodsItem中图片加载完成

    const refresh = this.debounce(this.$refs.scroll.refresh,200)

    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })
  },
  methods: {
    /*
      事件监听相关方法
     
    */
   debounce(func, wait){
     let timer;
      return function(...args) {
      // arguments中存着e
      let args = arguments; 
      
         
      if (timer) clearTimeout(timer);
 
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
   },
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
    backClick(){
      // console.log('回到顶部')
      this.$refs.scroll.scrollTo(0,0)

      
    },
    contentScroll(position){
      // console.log(position)
      this.isShowBackTop = (-position.y) > 1000

    },
    // loadMore(){
    //   // console.log('上拉请求数据')
    //   this.getHomeGoods(this.currentType)
      
    // },

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

        // this.$refs.scroll.finishPullUp()

      }).catch(err=>{
        console.log('请求商品数据失败',err)
      })
    }
    
  },
};
</script>

<style scoped>
#Home {
  padding-top: 44px;

  height: 100vh;

  position: relative;
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

.content{
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>