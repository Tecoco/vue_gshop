import {
    SAVE_ADDRESS,
    SAVE_CATEGORY,
    SAVE_SHOPS,
    SAVE_USER,
    SAVE_TOKEN,
    LOGOUT
} from './mutations_types'

export default {
    [SAVE_ADDRESS](state, address){
        //直接修改state中的状态数据
        state.addressInfo = address;
    },
    [SAVE_CATEGORY](state, categories){
        state.categoryList = categories;
    },
    [SAVE_SHOPS](state, shops){
        state.shopsList = shops;
    },
    [SAVE_USER](state, user){
        state.userInfo = user;
    },
    [SAVE_TOKEN](state, token){
        state.token = token;
    },
    [LOGOUT](state){
        //清除Vuex中的用户信息
        state.userInfo = {};
        state.token = '';
        //清除localStorage中的token
        localStorage.removeItem('token_key');
    }
}
