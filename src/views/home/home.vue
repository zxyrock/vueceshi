<template>
  <div id="Home">
    <nav-bar class="home-nav"><template v-slot:center> 购物街 </template></nav-bar>
    <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl1" :class="tab-control" v-show="isTabFixed" />
    <scroll class="content" ref="scroll" 
            :probe-type="3" :pull-up-load="true" 
            @scroll="contentScroll"  @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click="backTop" v-show="isShowBackTop"/>
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


import { getHomeMultidata,getHomeGoods } from "@/network/home";
// import {debounce} from '@/common/utils';
import {itemListenerMixin,backTopMixin} from "@/common/mixin";


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
    // BackTop
  },
  mixins:[itemListenerMixin,backTopMixin],
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
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
    };
  },
  computed:{
    showGoods(){
     return this.goods[this.currentType].list
    }
  },
  unmounted(){
    console.log('Home 被销毁123')
  },
  activated(){
   this.$refs.scroll.scrollTo(0,this.saveY,0)
   this.$refs.scroll.refresh()
  },
  deactivated(){
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)

    // 2.取消全局事件的监听，注：实际上因为bus不知怎么用，因此这里实际上没监听
    // this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  created() {
    // 1.请求首页的多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    //3.赋值
    
    
      
  },
  mounted(){

    // 3.监听goodsItem中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh,3000)


    // 对监听的事件进行保存
    // this.itemImgListener = () => { refresh()}
    // this.$bus.$on('itemImageLoad',this.itemImgListener)
    // refresh()
    
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    
    contentScroll(position){
      // console.log(position)
      // 1.判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop


    },
    loadMore(){
      console.log('上拉请求数据')
      this.getHomeGoods(this.currentType)
      
    },
    swiperImageLoad(){
      // 3.获取tabControl的offsetTop
      // 注：所有的组件都有一个属性：$el:用于获取组件内的元素的
      // console.log(this.$refs.tabControl2.$el.offsetTop)

       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
       网络请求相关方法
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }).catch(err => {
        console.log("首页数据请求失败", err);
      });
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()

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
  /* position: sticky; */
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

.tab-control{
  position: relative;
  top: 0;
  z-index: 9;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>