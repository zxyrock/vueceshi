import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  // console.log('执行了obj的install函数',Vue)

  // 下面这种方法不可行
  // console.log(Toast.$el)
  // document.body.appendChild(Toast.$el)

  // 可行方法(仅限于vue2，vue3把extend删除了)
  // // 1.创建组件构造器
  // const toastConstructor= Vue.extend(Toast)

  // // 2.new的方式，根据组件构造器可以创建出来一个组件对象
  // const toast = new toastConstructor()

  // //3.将组件对象，手动地挂载到某一个元素上
  // toast.mount(document.createElement('div'))

  // // 4.toast.$el对应的就是div
  // document.body.appendChild(toast.$el)

  // Vue.prototype.$toast = Toast;
}

export default obj