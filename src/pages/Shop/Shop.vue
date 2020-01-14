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
export default {
    components: {
        ShopHeader
    },
    mounted(){
      this.$store.dispatch('getShopDataAction');
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
