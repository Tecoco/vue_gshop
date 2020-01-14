import Mock from 'mockjs'
import shopData from './data.json'

//生成随机数据，拦截ajax请求
Mock.mock('/api/getShopData', {code: 0, data: shopData});