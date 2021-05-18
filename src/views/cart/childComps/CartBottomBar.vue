<template>
  <div class="bottom-bar">
    <div class="checked-content">
      <check-button class="checked-all" :is-checked="isSelectAll" @click="checkClick" />
      <span>全选</span>
    </div>

    <div class="add-price"> 合计：￥{{totalPrice}}</div>

    <div class="calculate">去计算：({{checkLength}})</div>

  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
   totalPrice(){
    // vue3不支持filter过滤器
    //  return this.$store.state.cartLis.filter(item => {
    //    return item.chexked
    //  }).reduce((preValue,item) => {
    //     return preValue + (item.nowPrice * item.counter)
    //  },0).toFiixed(2)

    // 自己写的，错误
    // let item = this.$store.state.cartList
    // for(let i = 0;i<item.length;i++){
    //   let obj = {}
    //   if(item.checked){
    //     return obj.price += (item.newPrice * item.counter)
    //   }
    // }

    //先随便返回个数
    return 1000
   },
   checkLength(){
    //  return this.$store.state.cartList.filter(item => item.checked).length
    return 5;
   },
   isSelectAll(){
     if(this.$store.state.cartList.length === 0)  return false

    // 方法一：过滤器filter()
    //  return !(this.$store.state.cartList.filter(item => !item.checked).length)
    // 方法二：find()
    // return !this.$store.state.cartList.find(item => !item.checked)

    // 方法三：数组遍历
    for(let item of this.$store.state.cartList){
       if(!item.checked){
         return false
       }
    }
    
    return true
   }
  },
  methods:{
    checkClick(){
      // console.log('全选按钮被点击')
      // 全部选中状态条件
      if(this.isSelectAll){
        // 点击后变成全部不选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        // 有部分没选中或全部都没选中的状态，点击后改为全选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
      // 注：以上的条件判断不可简化
      // 错误写法：
      // return this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
      // 这种写法this.isSelectAll与checked会互相改，改变计算属性中isSelectAll的值，会乱改

      this.$store.state.cartList.Vue.filter(id, [definition])
    }
    
    
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;

  height: 40px;
  background: #eee;
  line-height: 40px;
  display: flex;
  font-size: 14px;

}

.checked-content{
  display: flex;
  width: 60px;
  align-items: center;
  margin-left: 10px;
  
}

.checked-all{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.add-price{
  /* margin-left: 30px; */
  text-align: center;
  flex: 1;
}

.calculate{
  width: 90px;
  background: #ff8198;
  color: #fff;
  font-weight: 700px;
  text-align: center;
}
</style>