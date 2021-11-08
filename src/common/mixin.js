import {debounce} from "@/common/utils";
export const itemListenerMinxin = {
  data() {
    return {
      refFunc: null
    };
  },
  mounted() {
    // 防抖
    let deBounceRefresh = debounce(this.$refs.scroll.refresh, 200);
    this.refFunc = () => {
      //利用 $bus 事件监听，去刷新 scroll的高度
      // console.log("混入了")
      deBounceRefresh();
    };
  }
};

import BackTop from "@/components/content/backtop/BackTop";
export const backTopMixIn = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    scrollTop() {
      this.$refs.scroll.scrollToTop(0,0)
    }
  }
}
