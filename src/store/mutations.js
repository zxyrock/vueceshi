// 导入常量
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  // mutation唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.counter++
  },
  [ADD_TO_CART](state, payload) {
    // 默认商品为选中属性
    payload.checked = true
    state.cartList.push(payload)
  }
}