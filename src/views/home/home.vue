<template>
  <div id="Home">
    <nav-bar class="home-nav"><template v-slot:center> 购物街 </template></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "Home",
  components: {
    NavBar,
  },
};
</script>

<style>
.home-nav{
  background: var(--color-tint);
  color: #fff;
}
</style>