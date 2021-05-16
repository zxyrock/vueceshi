<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!--属性：topImages， 传入值：top-images-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    
    <detail-bottom-bar  @addToCart="addToCart"/>

    <back-top @click="backTop" v-show="isShowBackTop"/>
    
  </div>
</template>

<script>
import DetailNavBar from './detailComps/DetailNavBar';
import DetailSwiper from './detailComps/DetailSwiper';
import DetailBaseInfo from './detailComps/DetailBaseInfo'
import DetailShopInfo from './detailComps/DetailShopInfo'
import DetailGoodsInfo from './detailComps/DetailGoodsInfo'
import DetailParamInfo from './detailComps/DetailParamInfo'
import DetailCommentInfo from './detailComps/DetailCommentInfo'
import DetailBottomBar from './detailComps/DetailBottomBar'

import Scroll from "@/components/content/scroll/Scroll"
import GoodsList from "@/components/content/goods/GoodsList"

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail';
// import {debounce} from '@/common/utils';
import {itemListenerMixin,backTopMixin} from "@/common/mixin";

export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      itemImgListener:null,
      themeTopYs:[],
      currentIndex:0
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
    
    
  },
  mixins:[itemListenerMixin,backTopMixin],
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res=> {
      console.log(res)
      // 1.获取轮播图数据
      this.topImages = res.result.itemInfo.topImages

      // 2.获取商品数据的基本信息
      const data = res.result
      this.goods= new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // 6.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      
      // this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来的
        // 但是图片依然是没有加载完（目前获取到的offetTop是不包含图片的）
        // 一般的情况下，offsetTop的值不，都是因为图片的问题
        // this.themeTopYs = []

        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop-44);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
        // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop-44);
        // console.log(this.themeTopYs,"---")
      // })
      
      

    }).catch(err => {
      console.log('详情页数据请求失败',err)
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list

    }).catch(err => {
      console.log('推荐数据请求失败',err)
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()

      let num = 1;
      num ++;
      console.log(num)

      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop-44);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs,"---")
    },
    titleClick(index){
      console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){
      // console.log(position)
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中的值进行对比
      // [0,725,1412,1765,非常大的值(Number.MAX_VALUE)]
      // positionY 在 0~725 之间，index = 0
      // positionY 在 =725~1412 之间，index= 1
      // positionY 在 1412~1765 之间，index = 2

      // positionY 大于等于 1765 ，index= 3  或者 positionY 在 1765和一个非常大的值之间 ，index= 3 

      let length = this.themeTopYs.length

      for(let i = 0; i < this.themeTopYs.length-1; i++){
        // console.log(i)
        // 下面写法错误
        // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
        //   console.log(i,"---")
        // }

        // 正确写法（普通做法）
        // if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || 
        // (i === length -1 && positionY >= this.themeTopYs[i]))){
        //   // console.log(i,'---')
        //   this.currentIndex = i
        //   console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        // 优化后
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
        }

        // 3.是否显示回到顶部
        this.isShowBackTop = (-position.y) > 1000


      }
    },
    addToCart(){
      // console.log('---123---')
      // 1.获取加入添加到购物车需要展示的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.nowPrice = this.goods.nowPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里面
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)

    }
  },
  mounted(){
    // const refresh = debounce(this.$refs.scroll.refresh,3000)
    // this.itemImgListener = () => { refresh()}
    // refresh()

    // this.$bus.$on("itemImageLoad",this.itemImgListener)

    // itemListenerMixin()

    
  },
  // deactivated(){
  //   console.log('退出了详情页')
  // }
  unmounted(){
    // console.log('详情页 被销毁');
    // this.$bus.$off("itemImageLoad",this.itemImgListener)
    // this.$refs.scroll.getScrollY() = this.saveY
  },
  // updated(){
  //   this.themeTopYs = []
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
  //   console.log(this.themeTopYs,"---")
  // }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 19;
  background: #ffffff;
  height: 100vh;
}

.detail-nav{
  position: relative;
  z-index: 9;
  background: #fff;
}

.content{
  height: calc(100% - 44px - 49px);
}

</style>