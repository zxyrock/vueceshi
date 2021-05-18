<template>
  <div class="toast" v-show="isShow">
     <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data() {
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message="默认文字",duration=2000){
      //es6语法可以直接在参数找那个设置默认值，es5设置默认值的写法如下：
      // duration = duration || 2000
      this.isShow = true;
      this.message = message;

      setTimeout(()=>{
        this.isShow = false;
        this.message = '';
      },duration)
    }
  }
}
</script>

<style>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.65);

}
</style>