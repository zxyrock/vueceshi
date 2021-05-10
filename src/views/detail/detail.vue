<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
import DetailNavBar from './detailComps/DetailNavBar';
import DetailSwiper from './detailComps/DetailSwiper';

import {getDetail} from '@/network/detail';

export default {
  name:'Detail',
  data() {
    return {
      iid:null,
      topImages:[]
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper
  },
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res=> {
      console.log(res)
      // 1.获取轮播图数据
      this.topImages = res.result.itemInfo.topImages

    }).catch(err => {
      console.log('详情页数据请求失败',err)
    })
  }
}
</script>

<style>

</style>