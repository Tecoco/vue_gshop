<template>
  <div id="appContainer">
    <h2>stylue使用</h2>
    <button class="btn1">定义混合1</button>
    <button class="btn2">定义混合2</button>
    <ul>
      <li @click="navIndex = item" :class="{active: navIndex === item}" v-for="item in 10" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      navIndex: 1
    }
  }
}
</script>

<style lang='stylus'>/* 这里必须要写lang */
/* 引入 */
@import './common/stylus/mixins.styl';
/* 定义变量 */
$color = pink
/* 定义混合 代码复用*/
btnStyle(w, g, bgColor)
  width w
  height g
  background bgColor
  border none
/* 定义函数 可进行计算*/
add(a, b)
  a + b

#appContainer
  h2
    color $color
  .btn1
    btnStyle(100px, 100px, $color) /* 使用混合 */
    padding add(20px, 20px) /* 使用函数 */
    box-sizing content-box /* 所以可以知道button标签实质是一个怪异盒子模型 */
  .btn2
    btnStyle(200px, 200px, $yellow)
  ul
    li
      line-height 30px
      &.active /* 父级引用 */
        color $color
</style>
