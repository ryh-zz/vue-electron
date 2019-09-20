// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/axios/index.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueTouchKeyboard from "vue-touch-keyboard";
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css";
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

// 虚拟键盘
Vue.use(VueTouchKeyboard);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
