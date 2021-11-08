import vuex from "vuex"
import Vue from "vue";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

Vue.use(vuex)

const state = {
  cartList: []
}

const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
