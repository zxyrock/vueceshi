import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList:[]
  },
  mutations: {
    addCart(state,payload){
      // payload新添加的商品
      // 第一种方法
      // let oldProduct = null
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }

      // 2.判断oldProduct是否有值
      // if(oldProduct){
      //   oldProduct.count += 1
      // }else{
      //   payload.count = 1
      //   state.cartList.push(payload)
      // }

      // 第二种方法
      let index = state.cartList.indexOf(payload)

      // 2.判断oldProduct是否有值
      if(index !== -1){
        let oldProduct= state.cartList[index]
        oldProduct += 1
      }else{
        payload.count = 1
        state.cartList.push(payload)
      }
      

      // 第三种写法：一步查找数组中是否有该商品
      // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      // if(oldProduct){
      //   oldProduct.count += 1
      // }else{
      //   payload.count = 1
      //   state.cartList.push(payload)
      // }
    }
  },
  actions: {
  },
  modules: {
  }
})
