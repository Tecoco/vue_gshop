<template>
  <div id="shopContainer">
     <ShopHeader />
     <div class="tabs">
       <div class="tabs-item">
         <router-link to="/shop/good">点餐</router-link>
       </div>
        <div class="tabs-item">
         <router-link to="/shop/rating">评价</router-link>
       </div>
        <div class="tabs-item">
         <router-link to="/shop/info">商家</router-link>
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
