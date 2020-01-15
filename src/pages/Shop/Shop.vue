<template>
  <div id="shopContainer">
     <ShopHeader />
     <div class="tabs">
       <div class="tabs-item">
         <!-- 注意这里可以利用属性，实现有痕或无痕迹历史记录的操作，面试：区分编程式和声明式跳转的操作 -->
         <router-link to="/shop/good" replace>点餐</router-link>
       </div>
        <div class="tabs-item">
         <router-link to="/shop/rating" replace>评价</router-link>
       </div>
        <div class="tabs-item">
         <router-link to="/shop/info" replace>商家</router-link>
       </div>
     </div>
     <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ShopHeader from '../../components/ShopHeader/ShopHeader'
import {SAVE_SHOPDATE, SAVE_CARTSHOP} from '../../store/mutations_types'
import {mapState} from 'vuex'
export default {
    components: {
        ShopHeader
    },
    computed: {
      ...mapState({
        shopData: state => state.shop.shopData
      })
    },
    mounted(){      
      //现在遇到一个问题是：当添加/删除商品后，再次刷新界面，数据将会丢失
      //原因：数据保存在Vuex中的，当刷新界面时，组件将会重新挂载到页面，主要在于，Vuex的数据时存储在内存的，
      //当刷新时，内存的数据会被释放，之后重新分配内存
      //解决方式：1）跟登录与注册一样，重新发送请求； 2）利用unload事件，即将刷新前，保存数据在sessionStorage
      //解决Vuex刷新页面数据丢失问题：

      //从sessionStorage读取数据
      let shopData = JSON.parse(sessionStorage.getItem('shopData'));
      if(shopData){
        //1、将读取的数据存入Vuex
        this.$store.commit(SAVE_SHOPDATE, shopData);
        //2、计算最新的购物车数据， food.count>0
        let cartShop = shopData.goods.reduce((pre, good)=>{
          //过滤所有food.count>0的对象
          pre.push(...good.foods.filter(food => food.count>0));
          return pre;
        }, []);
        //3、cartShop存入Vuex
        this.$store.commit(SAVE_CARTSHOP, cartShop);
      }else{
        //分发action,发请求获取数据
        this.$store.dispatch('getShopDataAction');
      }
      //unload事件在页面确定刷新，但是还没有真正刷新时，页面即将刷新之前执行
      window.addEventListener('unload', ()=>{
        //将最新的shopData存入sessionStorage中，只有会话结束，数据才会被释放
        sessionStorage.setItem('shopData', JSON.stringify(this.shopData));//注意需要将一般对象转换为JSON串存储在sessionStorage
      });
    },
    beforeDestroy(){
      sessionStorage.setItem('shopData', JSON.stringify(this.shopData));
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
  #shopContainer
   .tabs
    display flex
    bottom-border-1px(#eee)
    .tabs-item
      flex 1
      height 40px
      line-height 40px
      text-align center
      font-size 16px
      position relative
      a
        &.router-link-active
          color $green
          &:after
            content ''
            width 40px
            height 4px
            transform scaleY(.5)
            background-color $green
            display block
            position absolute
            left 50%
            bottom 0
            margin-left -20px

 
</style>
