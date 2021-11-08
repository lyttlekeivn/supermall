import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import obj from "@/components/common/toast";
import FastClick from "fastclick"
import LazyLoad from "vue-lazyload"

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(obj)
Vue.use(LazyLoad,{
  loading: require("assets/img/common/placeholder.png")
})

FastClick.attach(document.body)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
