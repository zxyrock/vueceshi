<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="backImg" @click="backClick" >
          <img src="@/assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles" 
             :key="index" class="title-item" 
             :class="{active : currentIndex === index}"
             @click="titleClick(index)">
             {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles:["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
    },
    backClick(){
      this.$router.back()
      console.log('dinaji')
    }
  }
};
</script>

<style>
.title{
  display: flex;
}
 
.title-item{
  flex:1;
  font-size: 14px;
  font-weight: 500;
}

.active{
  color:var(--color-high-text)
}

.backImg{
  margin-top: 8px;
}
</style>