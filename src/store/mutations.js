import {ADD_TO_CART,ADD_COUNTER} from "./mutations_type"
export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  }
}
