<template>
  <div>
    <nav-bar class="cart_nav_bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import BottomBar from "@/views/cart/childComps/BottomBar";
import CartList from "@/views/cart/childComps/CartList";
import NavBar from "@/components/common/navbar/NavBar";
import {mapGetters} from "vuex"
  export default {
    name: "Cart",
    components: {BottomBar, CartList, NavBar},
    computed: {
      ...mapGetters({
        length: "cartLength"
      })
    }
  }
</script>

<style scoped>
.cart_nav_bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
