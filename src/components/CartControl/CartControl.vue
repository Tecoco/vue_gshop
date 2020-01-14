<template>
  <div class="cartcontrol">
    <transition name="move">
        <div class="iconfont icon-jianhao" v-show="food.count" @click="changeFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="iconfont icon-add" @click="changeFoodCount(true)"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          food: {
              type: Object,
              required: true
          }
      },
      methods: {
        changeFoodCount(isAdd){
            this.$store.dispatch('changeFoodCountAction', {isAdd, food: this.food});
        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .icon-jianhao
        padding 2px
        color $green
        /* 针对移入移出过渡 */
        &.move-enter-active,&.move-leave-active
            transition all 0.5s
        &.move-enter,&.move-leave-to
            transform translateX(20px) rotate(180deg)
            opacity 0
    .cart-count
        display: inline-block
        width: 14px
        text-align: center
        font-size: 14px
        color: rgb(147, 153, 159)
        margin 0 8px
    .icon-add
        padding: 2px
        color $green
    .iconfont
        display: inline-block
        border 2px solid $green
        border-radius 50%
        font-size 10px

</style>

