import 'bootstrap'
import 'jquery'
import 'popper.js'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import 'sweetalert2/dist/sweetalert2.min.css'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router)
  .mount('#app')
