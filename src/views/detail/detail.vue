<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './detailComps/DetailNavBar';
import DetailSwiper from './detailComps/DetailSwiper';
import DetailBaseInfo from './detailComps/DetailBaseInfo'
import DetailShopInfo from './detailComps/DetailShopInfo'

import Scroll from "@/components/content/scroll/Scroll"

import {getDetail,Goods,Shop} from '@/network/detail';

export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{}
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
    
  },
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
      

    }).catch(err => {
      console.log('详情页数据请求失败',err)
    })
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