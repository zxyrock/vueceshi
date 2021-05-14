import {debounce} from './utils';

export const itemListenerMixin = {
  // data() {
  //   return {
  //     itemImgListener:null
  //   }
  // },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,3000)
    // this.itemImgListener = () => { refresh()}
    refresh()

    // console.log('我是混入中的内容')
  },
}