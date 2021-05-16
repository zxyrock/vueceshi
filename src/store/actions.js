// 导入常量
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  addCart(context,payload){
    // payload新添加的商品
    // 第一种方法
    // let oldProduct = null
    // for(let item of context.state.cartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }

    // 2.判断oldProduct是否有值
    // if(oldProduct){
    //   oldProduct.count += 1
    // }else{
    //   payload.count = 1
    //   context.state.cartList.push(payload)
    // }

    // 第二种方法
    // let index = context.state.cartList.indexOf(payload)

    // 2.判断oldProduct是否有值
    // if(index !== -1){
    //   let oldProduct= context.state.cartList[index]
    //   oldProduct += 1
    // }else{
    //   payload.count = 1
    //   context.state.cartList.push(payload)
    // }
    

    // 第三种写法：一步查找数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct){
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
    }else{
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }
  }
}