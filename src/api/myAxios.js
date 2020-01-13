/* 二次封装axios */
import axios from 'axios'
import qs from 'querystring'
//引入路由器
import router from '../router'

/* 创建Axios 的伪实例, 不是new Axios的实例，但可以利用Axios实例中的所有方法和属性 */
const instance = axios.create({
    baseURL: '/api'
});

//请求拦截器：即将发送请求之前，将所有请求拦截下来，批量处理，例如：添加token,或者修改请求参数
instance.interceptors.request.use(config => {
    //config包含了所有与当前请求相关的所有信息：method/url/data
    //axios中默认发送的格式是json,但目前的服务器没有对json格式的请求参数做处理，所以需要转换为urlencoded编码格式
    config.data = qs.stringify(config.data);
    // console.log(config);

    //正对自动登录的处理
    //获取localStorage中的token_key
    let token = localStorage.getItem('token_key');
    //先判断是否需要token
    if(config.headers.needToken){
        //判断是否存在token
        if(token){//存在token,存放在请求头中
            config.headers.authorization = token;
        }else{ //不存在抛出错误，并提示需要先登录
            throw Error('请先登录');
        }
    }
    
    return config;
});

//响应拦截器
instance.interceptors.response.use(
    response => response.data,
    error => {
        //默认返回的是 成功状态的Promise实例对象，为了发送请求能够继续进入.then的成功回调函数里面
        if(!error.response){//请求没有真正的发送出去，在请求拦截器处出现错误---没有token
            alert(error.message);
            //判断当前路径是否在登录，如果没有需要先跳转到登录界面
            if(router.currentRoute.path !== '/login'){
                router.replace('/login');
            }
        }else{//请求已经发送出去了，但服务器返回错误信息
            if(error.response.status === 401){
                //token过期或失败
                alert('token已过期');
                if(router.currentRoute.path !== '/login'){
                    router.replace('/login');
                }
            }else if(error.response.status === 404){
                 //请求资源找不到
                 alert('请求资源失败');
                 if(router.currentRoute.path !== '/login'){
                     router.replace('/login');
                 }
            }else{
                alert('其他错误');
            }
        }
        return new Promise(()=>{});//初始化promise实例对象，为pending状态
    }

);

export default instance;