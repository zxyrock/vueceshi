import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast'
// 安装toast插件


createApp(App).use(store).use(router).use(toast).mount('#app')



