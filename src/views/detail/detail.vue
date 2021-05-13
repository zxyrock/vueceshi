<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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

import Scroll from "@/components/content/scroll/Scroll"
import GoodsList from "@/components/content/goods/GoodsList"

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail';
// import {debounce} from '@/common/utils';
import {itemListenerMixin} from "@/common/mixin";

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
      itemImgListener:null
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
    Scroll,
    GoodsList
    
    
  },
  mixins:[itemListenerMixin],
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
      
      

    }).catch(err => {
      console.log('详情页数据请求失败',err)
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list

    }).catch(err => {
      console.log('推荐数据请求失败',err)
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
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
    console.log('详情页 被销毁');
    // this.$bus.$off("itemImageLoad",this.itemImgListener)
    // this.$refs.scroll.getScrollY() = this.saveY
  }
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
  height: calc(100% - 44px);
}

</style>