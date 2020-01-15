import Vue from 'vue'
import {
    SAVE_SHOPDATE, 
    ADD_FOOD_COUNT, 
    DEL_FOOD_COUNT,
    CLEAR_SHOPCART,
    SAVE_CARTSHOP
} from '../mutations_types'
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
    },
    //清空购物车
    [CLEAR_SHOPCART](state){
        //将cartShop中所有food.count>0的项修改为0，这样才会实现显示的购物车的数量和添加/删除的操作保持一致
        state.cartShop.forEach(food => food.count = 0);
        state.cartShop = [];
    },
    //保存food.count>0的对象到cartShop中
    [SAVE_CARTSHOP](state, cartShop){
        state.cartShop = cartShop;
    },
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
    //计算count总数
    totalCount(state){
        return state.cartShop.reduce((pre, food)=>{
            return pre += food.count;
            }, 0);
    },
    //计算总价格
    totalPrice(state){
        return state.cartShop.reduce((pre, food)=>{
            return pre += food.count*food.price;
            }, 0);
    }

};

export default {
    state,
    mutations,
    actions,
    getters
} 