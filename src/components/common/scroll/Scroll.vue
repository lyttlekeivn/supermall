<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      bscroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullingUp: {
      type :Boolean,
      default() {
        return false;
      }
    }
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullingUp
    })
    this.bscroll.on("scroll",(position) => [
      // console.log(position)
      this.$emit("position", position)
    ])
    // console.log(this.bscroll)
    this.bscroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      this.$emit("pullingUpEvent")
    })

  },
  methods: {
    scrollToTop(x, y ,time=300) {
      this.bscroll && this.bscroll.scrollTo(x, y ,time)
    },
    loadFinish(){
      this.bscroll && this.bscroll.finishPullUp()
    },
    refresh() {
      // console.log("收到刷新")
      this.bscroll && this.bscroll.refresh()
    },
    getScrollY() {
      return this.bscroll.y
    }
  }
}
</script>

<style scoped>

</style>
