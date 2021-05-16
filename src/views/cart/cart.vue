<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{ length }})</div>
      </template>
    </nav-bar>

      <!--商品收藏列表-->
      <cart-list/>
      <!--底部汇总-->
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from './childComps/CartList';




import { mapGetters } from "vuex";


export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    // 两种语法，第一种：用数组的方式将这里需要拿来的函数传入
    // ...mapGetters(['cartLength','cartList'])
    // 第二种：用对象，用key:value的方式，key为你需要在此页面用的名称，vulue为对应的需要调用的函数
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  }
};
</script>

<style scoped>
.cart{
  height: 100vh;
}

.nav-bar {
  background: var(--color-tint);
  color: #fff;
  font-weight: 700;
  font-size: 18px;
}
</style>