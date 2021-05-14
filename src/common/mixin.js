import {debounce} from './utils';
import BackTop from '@/components/content/backTop/BackTop';

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

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  methods: {
    backTop(){
      // console.log('回到顶部')
      this.$refs.scroll.scrollTo(0,0,300)
    },
  },
}