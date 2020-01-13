import myAxios from './myAxios'

//1、根据经纬度获取位置详情
export const getAddress = (latitude, longitude)=> myAxios({
    method: 'GET',
    url: `/position/${latitude},${longitude}`
});

//2、获取食品分类列表
export const getCategory = ()=> myAxios({
    url: '/index_category',
    headers: { //做一个标识，需要token
        needToken: true
    }
});

//3、根据经纬度获取商铺列表
export const getShopsList = (latitude, longitude)=> myAxios({
    url: '/shops',
    params: {
        latitude,//纬度
        longitude//经度
    },
    headers: { //做一个标识，需要token
        needToken: true
    }
});

//4、发送短信验证码
export const getCode = ({phone})=> myAxios({
    url: '/sendcode',
    params: {
        phone
    }
});

//5、用户名密码登陆
export const getLoginWithUser = (name, pwd, captcha)=> myAxios({
    method: 'POST',
    url: '/login_pwd',
    data: {
        name,
        pwd,
        captcha
    }
});

//6、手机号验证码登陆
export const getLoginWithPhone = (phone, code)=> myAxios({
    method: 'POST',
    url: '/login_sms',
    data: {
        phone,
        code
    }
});

//7、自动登陆
export const autoLogin = ()=> myAxios({
    //get请求方式，需要携带token参数，请求头的方式----在拦截器中处理
    url: '/auto_login',
    headers: { //做一个标识，需要token
        needToken: true
    }
});