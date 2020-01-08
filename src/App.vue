<template>
  <div id="appContainer">
    <router-view></router-view>
    <FooterWrap />
  </div>
</template>

<script>
import FooterWrap from './components/FooterWrap/FooterWrap'
export default {
  components: {//注册路由
    FooterWrap
  }
}
</script>

<style lang='stylus'>/* 这里必须要写lang */

</style>
