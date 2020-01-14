<template>
  <div id="goodContainer">
    <div class="leftWrap">
      <ul class="navList" ref="leftUl">
        <li @click="changeNavIndex(index)" :class="{active: navIndex === index}" v-for="(good, index) in goods" :key="index">{{good.name}}</li>
      </ul>
    </div>
    <div class="rightWrap">
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//引入BetterScroll
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
import CartControl from '../../../components/CartControl/CartControl'

export default {
  components: {
    CartControl
  },
  data(){
    return {
      tops: [], //获取所有右侧的li标对应累计的值
      scrollY: 0 //内容滚动的距离
    }
  },
  mounted(){
  //  console.log('mounted-----',this.goods); //undefined
  //注意：切换组件/new BScroll的时机
    if(this.goods){
      this._initScroll();
      this._initTop();
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.shopData.goods
    }),
    //计算左侧导航对应的下标值，来确定高亮显示位置
    navIndex(){
      const {tops, scrollY} = this;
      //获取左侧所有的li节点 
      //findIndex获取满足条件的第一个元素的下标值，之后会停止循环遍历
      // let index = tops.findIndex((top, index)=> (scrollY >= top && scrollY < tops[index+1]));
      //这两种写法都可以
      let index = tops.findIndex((top, index)=> (scrollY >= tops[index] && scrollY < tops[index+1]));
      // this.index = index;
      //el 滚动到的目标元素
      //参考better-scroll的文档  // this.navIndex !== index 不要在计算属性内部获取计算属性本身的值，死循环 *****
      //如果不做this.leftScroll的判断，则会报错TypeError: Cannot read property 'scrollToElement' of undefined"
      //这是因为计算属性的依赖数据scroll实时会在变化，一上来就会执行computed中的方法，这是执行到this.leftScroll，此时methods中
      //的方法还没有执行，所以会报错,处理方式，如下操作：
      if(this.leftScroll && this.index !== index){
        this.index = index;
        this.leftScroll.scrollToElement(this.$refs.leftUl.children[index], 1000);
      }
      return index;
    }
  },
  methods: {
    _initScroll(){
       //类似之前封装的swiper，一样的用法，可以去gitHub搜索
        this.leftScroll = new BScroll('.leftWrap', {
          scrollY: true,
          click: true
        });
        this.rightScroll = new BScroll('.rightWrap', {
          scrollY: true,
          //默认是0，则不派发 scroll 事件
          // probeType: 1 //非实时派发
          // probeType: 3 //实时派发，但计算惯性移动的距离---没有必要的操作，性能相对2也是较弱的
          probeType: 2, //实时派发，但不计算惯性移动的距离
          click: true
        });

        //绑定事件
        this.rightScroll.on('scroll', ({x, y})=>{
          this.scrollY = Math.abs(y);
        });

        this.rightScroll.on('scrollEnd', ({x, y})=>{
          this.scrollY = Math.abs(y);
        });
    },
     _initTop(){
       //获取右侧的所有li节点
       let liNodes = Array.from(this.$refs.rightUl.children);
       //累加计算对应节点距离content页面 顶部的距离
       let top = 0;
       let tops = [];
       tops.push(top);
       //方式一： for循环
      /*  for(let i=0; i<liNodes.length; i++){
        top = liNodes[i].clientHeight;
        tops.push(top);
       }
       */
       //方式二： 数组的reduce()方法
       liNodes.reduce((pre, liItem)=> {
         pre += liItem.clientHeight;
         tops.push(pre);
         return pre;//注意：如果不写return 那么默认会返回一个undefined
       }, top);
       this.tops = tops;//性能优化，减少重绘重排的次数，一次渲染到页面，类似文档碎片
    },

    changeNavIndex(index){
        this.scrollY = this.tops[index]
        this.rightScroll.scrollTo(0, -this.scrollY, 1000)
    }
  },
  watch: {
    //监视goods的变化
    goods(){
      // console.log('watch-----',this.goods);
      //组件下一次重新渲染之后执行
      this.$nextTick(()=>{
        this._initScroll();
        this._initTop();
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../common/stylus/mixins.styl"
  #goodContainer
    display flex
    overflow hidden
    height calc(100vh - 224px)
    .leftWrap
      width 80px
      //方式一
      //vh: 1vh=1%--视口高度的1%   vh/vw
      // height calc(100vh - 224px)

      //方式二：
     /*  position absolute
      top 224px
      bottom 0 */
      //上面3行代码可以改变div的高度
      overflow hidden

      background-color #f3f5f7
      .navList
        li
          position relative
          width 100%
          text-align center
          height 50px
          line-height 50px
          &.active
            background-color #fff
            color $green
          &:after
            content ''
            width 80%
            height 1px
            position absolute
            left 10%
            bottom 0
            background-color #eee

    .rightWrap
      width 295px
      background-color #fff
      .foods-wrapper
        flex: 1
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .desc, .extra
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
              line-height: 12px
              margin-bottom: 8px
            .extra
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px


</style>
