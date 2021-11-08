<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navItemClick="navItemClick" ref="detailRef"></detail-nav-bar>
    <scroll class="content" ref="scroll" @position="position" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info @imageLoad="imageLoad" :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paramRef"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentRef"></detail-comment-info>
      <good-list :goods="recommends" ref="goodRef"></good-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="scrollTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import {backTopMixIn} from "@/common/mixin";
import DetailBottomBar from "@/views/detail/chidlcomps/DetailBottomBar";
import {debounce} from "@/common/utils";
import {itemListenerMinxin} from "@/common/mixin";
import GoodList from "@/components/content/goods/GoodList";
import DetailCommentInfo from "@/views/detail/chidlcomps/DetailCommentInfo";
import DetailParamInfo from "@/views/detail/chidlcomps/DetailParamInfo";
import DetailGoodsInfo from "@/views/detail/chidlcomps/DetailGoodsInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailShopInfo from "@/views/detail/chidlcomps/DetailShopInfo";
import DetailNavBar from "@/views/detail/chidlcomps/DetailNavBar";
import DetailSwiper from "@/views/detail/chidlcomps/DetailSwiper";
import {getGoodDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import DetailBaseInfo from "@/views/detail/chidlcomps/DetailBaseInfo";
export default {
  name: "Detail",
  components: {
    DetailBottomBar,
    GoodList,
    DetailCommentInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    Scroll,
    DetailShopInfo,
    DetailBaseInfo,
    DetailSwiper,
    DetailNavBar

  },
  mixins: [
    itemListenerMinxin,
    backTopMixIn
  ],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommends: [],
      scrollYList: [],
      debounceScrollY: null,
      currentIndex: -1
    }
  },
  mounted() {
    // console.log("Detail监听了")
    this.$bus.$on("aaa",this.refFunc)
    this.debounceScrollY = debounce(() => {
      this.scrollYList = []
      this.scrollYList.push(0)
      this.scrollYList.push(this.$refs.paramRef.$el.offsetTop)
      this.scrollYList.push(this.$refs.commentRef.$el.offsetTop)
      this.scrollYList.push(this.$refs.goodRef.$el.offsetTop)
      this.scrollYList.push(Number.MAX_VALUE)
      console.log(this.scrollYList)
    })
  },
  beforeDestroy() {
    this.$bus.$off("aaa",this.refFunc)
    // console.log("销毁Detail的bus");
  },
  created() {
    this.id = this.$route.params.id
    getGoodDetail(this.id).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // console.log(res);
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6.获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list
      }
    })
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

  },
  methods: {
    ...mapActions({
      addCart: "addToCart"
    }),
    imageLoad() {
      this.$refs.scroll.refresh()
      console.log("imageLoad")
      this.debounceScrollY()

    },
    navItemClick(index) {
      console.log(index);
      this.$refs.scroll.scrollToTop(0, -this.scrollYList[index])
    },
    position(position){

      const length = this.scrollYList.length
      // console.log(length,"length的长度为")
      // console.log(position)
      let postionY = -position.y
      // console.log(postionY)
      for (let i = 0; i < length-1; i++) {
        // console.log(this.scrollYList[i])
        if(this.currentIndex!==i&&postionY>this.scrollYList[i]&&postionY<this.scrollYList[i+1]){
          this.currentIndex = i
          console.log(i)
          this.$refs.detailRef.currentIndex = i
        }
      }
      this.isShow = (-position.y) > 1000
      // for (let i = 0; i < length; i++) {
      //   // console.log(this.scrollYList[i])
      //   if(this.currentIndex!==i&&(i<length-1&&(postionY>this.scrollYList[i] && postionY < this.scrollYList[i+1]) || (i===length-1&&postionY>this.scrollYList[i]))){
      //     this.currentIndex = i
      //     console.log(i)
      //     this.$refs.detailRef.currentIndex = i
      //   }
      // }
    },
    addToCart(){
      const product = {
        iid: this.id,
        desc: this.goods.desc,
        price: this.goods.realPrice,
        title: this.goods.title,
        img: this.topImages[0]
      };
      // this.$store.commit("addToCart",product)
      // this.$store.dispatch("addToCart",product)
      // .then(res => {
      //   console.log(res);
      // })
      // console.log("添加购物车成功")
      this.addCart(product).then(res => {
        // console.log(res);
        // console.log(res);
        this.$toast.show(res)
        // console.log(this.$toast);
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>
