import Vue from 'vue'
import {SAVE_SHOPDATE, ADD_FOOD_COUNT, DEL_FOOD_COUNT} from '../mutations_types'
import {getShopData} from '../../api'

const state = {
    shopData: {}, //商铺商品的数据
    cartShop: [] //商品信息
};

const mutations = {
    [SAVE_SHOPDATE](state, shopData){
        state.shopData = shopData;
    },
    [ADD_FOOD_COUNT](state, {food}){
        if(food.count){
            food.count++;
        }else{
            Vue.set(food, 'count', 1);
            state.cartShop.push(food);
        }
    },
    [DEL_FOOD_COUNT](state, {food}){
        if(food.count>0){
            food.count--;
            if(food.count === 0){
                state.cartShop.splice(state.cartShop.indexOf(food), 1);
            }
        }
    }
};

const actions = {
    async getShopDataAction({commit}){
       //mock模拟
        let result = await getShopData();
        commit(SAVE_SHOPDATE, result.data);
    },
    changeFoodCountAction({commit},{isAdd, food}){
        if(isAdd){ //增加商品
            commit(ADD_FOOD_COUNT, {food});
        }else{ //删除商品
            commit(DEL_FOOD_COUNT, {food});
        }
    }
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
} 