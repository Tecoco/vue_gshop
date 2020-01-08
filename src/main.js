import Vue from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router /* 安装路由器 */
});

