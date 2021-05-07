import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import bus from 'vue-bus'

// createApp(App).prototype.$bus = createApp(bus)

createApp(App).use(store).use(router).mount('#app')


