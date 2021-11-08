<template>
  <div id="cart_list">
    <scroll class="cart_scroll" ref="scroll">
      <cart-list-item v-for="item in cartList" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "@/views/cart/childComps/CartListItem";
import Scroll from "@/components/common/scroll/Scroll";
import {mapGetters} from "vuex"
export default {
  name: "CartList",
  components: {CartListItem, Scroll},
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
#cart_list {
  font-size: 0.68rem;
  height: calc(100vh - 1.9rem - 2.09rem - 1.9rem);
}

/**
* scroll
*/
.cart_scroll {
  height: 100%;
  overflow: hidden;
}
</style>
