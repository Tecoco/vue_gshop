import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import shop from './modules/shop'

Vue.use(Vuex);
//创建一个store对象
export default new Vuex.Store({
    modules: {
        shop
    },
    state,
    mutations,
    actions,
    getters
});