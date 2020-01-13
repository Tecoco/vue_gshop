<template>
  <div id="appContainer">
    <router-view></router-view>
    <FooterWrap v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import FooterWrap from './components/FooterWrap/FooterWrap'
import {SAVE_USER} from './store/mutations_types'
export default {
  components: {//注册路由
    FooterWrap
  },
  async mounted(){
    let result = await this.$API.autoLogin();
    // console.log(result);
    //将用户信息保存到Vuex
    this.$store.commit(SAVE_USER, result.data);
  }
}
</script>

<style lang='stylus'>/* 这里必须要写lang */


</style>
