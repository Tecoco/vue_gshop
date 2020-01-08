<template>
  <div id="appContainer">
    <h2>stylue使用</h2>
    <div class="noAdaptive">没有做适配</div>
    <div class="hasAdaptive">有做适配</div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang='stylus'>/* 这里必须要写lang */
#appContainer
  .noAdaptive
    width 750px
    height 100px
    background-color red
  .hasAdaptive
    width 10rem
    height 100px
    background-color green
</style>
