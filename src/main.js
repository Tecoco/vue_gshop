import Vue from 'vue'
import 'lib-flexible/flexible'
import './veevalidate'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'

import App from './App.vue'
import './mock/mockServer'
import GshopHeader from './components/GshopHeader/GshopHeader.vue'
import * as API from './api'

Vue.config.productionTip = false;
//全局注册路由组件
Vue.component('GshopHeader', GshopHeader);

//js组件不需要注册，但css组件需要全局注册
Vue.component(Button.name, Button);

//事件总线对象: 将所有发送请求的额方法都放在Vue的原型对象上
Vue.prototype.$API = API;

new Vue({
  el: '#app',
  render: h => h(App),
  router, /* 安装路由器 */
  store
});

