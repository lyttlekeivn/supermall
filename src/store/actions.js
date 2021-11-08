import {ADD_TO_CART,ADD_COUNTER} from "./mutations_type"
export default {
  addToCart({state,commit}, payload) {
    // let oldProduct = null
    // for(let item of state.cartList) {
    //   if(item.iid = payload.iid){
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve, reject) => {
      const oldProduct = state.cartList.find(item => item.iid == payload.iid)
      if(oldProduct){
        commit(ADD_COUNTER,oldProduct)
        resolve("商品数量加1")
      }else {
        payload.count = 1
        payload.isChecked = true
        commit(ADD_TO_CART,payload)
        resolve("添加商品")
      }
    })
  }
}
