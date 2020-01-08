import Vue from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
});

