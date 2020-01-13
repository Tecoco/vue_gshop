<template>
  <div id="goodContainer">
    <div class="leftWrap">
      <ul class="navList">
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
        <li>爽口清凉</li>
      </ul>
    </div>
    <div class="rightWrap"></div>
  </div>
</template>

<script type="text/ecmascript-6">
//引入BetterScroll
import BScroll from 'better-scroll'

export default {
  mounted(){
    //类似之前封装的swiper，一样的用法，可以去gitHub搜索
    new BScroll('.leftWrap', {
      scrollY: true
    });
  }
}
</script>

<style lang="stylus" scoped>
  #goodContainer
    display flex
    overflow hidden
    .leftWrap
      width 20%
      //方式一
      //vh: 1vh=1%--视口高度的1%   vh/vw
      // height calc(100vh - 224px)

      //方式二：
      position absolute
      top 224px
      bottom 0
      overflow hidden

      background-color #f3f5f7
      .navList
        li
          position relative
          width 100%
          text-align center
          height 50px
          line-height 50px
          &:after
            content ''
            width 80%
            height 1px
            position absolute
            left 10%
            bottom 0
            background-color #eee

    .rightWrap
      width 80%
      background-color hotpink
 
</style>
