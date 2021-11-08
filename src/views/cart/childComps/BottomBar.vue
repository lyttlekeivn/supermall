<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :is-checked="isSelectAll" @click.native="btnClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{cartCountChecked}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import {mapGetters} from "vuex"

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
		  ...mapGetters(["cartList"]),
      totalPrice() {
        // const cartList = this.$store.state.cartList
        return this.cartList.filter(item => item.isChecked)
        .reduce((previousValue, item) => {
          return previousValue + item.price * item.count
        },0)
      },
      cartCountChecked() {
        return this.$store.state.cartList.filter(item => item.isChecked).length
      },
      isSelectAll() {
        // const cartList = this.$store.state.cartList
        if(this.cartList.length==0) return false
        // return !cartList.find(item => !item.isChecked)
        for(let item of this.cartList) {
          if(!item.isChecked){
            return false
          }
        }
        return true
      }
    },
    methods: {
      btnClick() {
        if(this.isSelectAll){
          this.cartList.forEach(item => item.isChecked = false)
        }else {
          this.cartList.forEach(item => item.isChecked = true)
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
