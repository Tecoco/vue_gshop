import {getAddress, getCategory, getShopsList} from '../api';
import {
    SAVE_ADDRESS,
    SAVE_CATEGORY,
    SAVE_SHOPS,
    SAVE_USER,
    SAVE_TOKEN
} from './mutations_types'

export default {
    async getAddressAction({commit}){
       let result = await getAddress(29.56470, 116.36867);
       !!(result.code === 0) && commit(SAVE_ADDRESS, result.data);
    },
    async getCategoryAction({commit}, delayTick){
       let result = await getCategory();
        if(!!(result.code === 0)){
            commit(SAVE_CATEGORY, result.data)
            //typeof delayTick === 'function' && delayTick()
         }
        /* !!(result.code === 0) && commit(SAVE_CATEGORY, result.data);
        delayTick(); */
    },
    async getShopsAction({commit}){
        let result = await getShopsList(29.56470, 116.36867);
        !!(result.code === 0) && commit(SAVE_SHOPS, result.data);
    },
    getUserInfoAction({commit,state}, user){
        commit(SAVE_TOKEN, user.token);
        //将token保存到本地localStorage
        localStorage.setItem('token_key', user.token);
        //删除user中的token
        delete user.token;
        commit(SAVE_USER, user);
    }
}
