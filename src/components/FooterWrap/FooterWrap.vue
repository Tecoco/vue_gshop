<template>
  <div id="footerWrap">
      <div :class="{active: $route.path === '/msite'}" @click="navToggle('/msite')" class="navItem">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </div>
      <div :class="{active: $route.path === '/search'}" @click="navToggle('/search')" class="navItem">
        <i class="iconfont icon-sousuo"></i>
        <span>搜索</span>
      </div>
      <div :class="{active: $route.path === '/order'}" @click="navToggle('/order')" class="navItem">
        <i class="iconfont icon-dingdan"></i>
        <span>订单</span>
      </div>
      <div :class="{active: $route.path === '/profile'}" @click="navToggle('/profile')" class="navItem">
        <i class="iconfont icon-wode"></i>
        <span>我的</span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      methods: {
          /* 单击footer的每项会跳转到相应的页面，根据路由路径确定
              编程式路由跳转
           */
          navToggle(path){
            path !== this.$route.path && this.$router.replace(path);
          }
      }
  }
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
/* 底部导航 */
#footerWrap
  display flex
  top-border-1px(#eee)
  position fixed
  left 0
  bottom 0
  width 100%
  height 50px
  background-color #fff
  
  /* 导航的每一项 */
  .navItem
    display flex
    flex-direction column
    width 25%
    height 50px
    text-align center
    &.active
      color $green
    .iconfont
      font-size 22px
      line-height 30px
 
</style>
