<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // console.log('123')
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-weight: 700;
  /* line-height: 49px; */
  box-shadow: 0 -3px 1px rgb(100, 100, 100, 0.2);
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* vertical-align: middle; */
}

/* .active {
  color: red;
} */
</style>