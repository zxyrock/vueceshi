<template>
  <div class="bottom-bar">
    <div class="checked-content">
      <check-button class="checked-all"/>
      <span>全选</span>
    </div>

  </div>
</template>

<script>
import CheckButton from './CheckButton'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  }
}
</script>

<style>
.bottom-bar{
  height: 40px;
  background: #eee;
  position: relative;
  line-height: 40px;

}

.checked-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  
}

.checked-all{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
</style>