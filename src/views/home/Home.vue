<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles = "['流行', '新款', '精选']"
                 @tabItemClick="tabItemClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed">
    </tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @position="contentScroll"
            :pulling-up="true"
            @pullingUpEvent="loadMore"
            >
      <home-swiper :banners="banner" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend :recommends = recommend></recommend>
      <feature-view></feature-view>
      <tab-control :titles = "['流行', '新款', '精选']"
                   @tabItemClick="tabItemClick"
                   ref="tabControl2">
      </tab-control>
      <good-list :goods="goods[currentType].list"></good-list>
    </scroll>
    <back-top @click.native="scrollTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
import {itemListenerMinxin,backTopMixIn} from "@/common/mixin";
import Scroll from "@/components/common/scroll/Scroll";
import GoodList from "@/components/content/goods/GoodList";
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabcontrol/TabControl";

import HomeSwiper from "@/views/home/childcomp/HomeSwiper";
import Recommend from "@/views/home/childcomp/Recommend";
import FeatureView from "@/views/home/childcomp/FeatureView";

import {debounce} from "@/common/utils";

import {getHomeMultiData, getHomeGoods} from "@/network/home";

  export default {
    name: "Home",
    components: {
      Scroll,
      GoodList,
      TabControl,
      FeatureView,
      Recommend,
      HomeSwiper,
      NavBar
    },
    mixins: [
      itemListenerMinxin,
      backTopMixIn
    ],
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          "pop": {page: 0, list: []},
          "new": {page: 0, list: []},
          "sell": {page: 0, list: []}
        },
        currentType: 'pop',
        offsetTop: 0,
        isTabFixed: false,
        scrollY: 0,
      }
    },
    created() {
      this.getHomeMultiData()
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")

    },
    mounted() {
      // console.log("mouted")

      this.$bus.$on("aaa", this.refFunc)
    },
    activated() {
      // console.log("activated")
      this.$refs.scroll.scrollToTop(0,this.scrollY)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // console.log("deactivated")
      this.scrollY = this.$refs.scroll.getScrollY()
      this.$bus.$off("aaa",this.refFunc)
    },
    methods: {
      swiperImgLoad(){
        // console.log(this.$refs.tabControl2.$el.offsetTop);
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      contentScroll(position){
        // console.log(position);
        this.isShow = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.offsetTop
      },
      tabItemClick(index){
        switch (index){
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "new"
            break
          case 2:
            this.currentType = "sell"
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

      },
      /*----------------------------------*/
      getHomeGoods(type){
        let page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.loadFinish()
        })
      },
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          // console.log(res);
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
