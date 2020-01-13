<template>
  <section class="msite">
    <!--首页头部-->
    <GshopHeader :title="addressInfo.name ? addressInfo.name : '定位中...'">
      <!-- 命名插槽的方式一 -->
      <span slot="search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span slot="login" class="header_login">
        <span class="header_login_text">登录|注册</span>
      </span>
      <!-- 命名插槽的方式二 -->
      <!-- <template v-slot: search>
        <span class="header_search">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </template>
      <template v-slot: login>
        <span class="header_login">
          <span class="header_login_text">登录|注册</span>
        </span>
      </template>-->
    </GshopHeader>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category, index) in newCategories" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(categoryItem, index) in category"
              :key="index"
            >
              <div class="food_container">
                <img :src="`https://fuss10.elemecdn.com/${categoryItem.image_url}`" />
              </div>
              <span>{{categoryItem.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>

<script type="text/ecmascript-6">
/* 引入lodash */
import _ from "lodash";
import Swiper from "swiper";
// 为什么这个样式要写在这里?
import "swiper/css/swiper.min.css";
import { mapState } from "vuex";
import ShopList from '../../components/ShopList/ShopList'

export default {
  components: {ShopList},
  mounted() {
    //获取位置详情---调用对应的action
    this.$store.dispatch("getAddressAction");
    //食品分类列表---同理
    this.$store.dispatch("getCategoryAction", () => {
      //解决方式一：
      //将回调延迟到下次dom更新循环之后执行
     /*  console.log(this)
      new Swiper(".swiper-container", {
          loop: true,
          //分页器
          pagination: {
            el: ".swiper-pagination"
          }
      }) */
     /*  this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true,
          //分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      }); */
    });
  },
  methods: {
    //这种方式的，swiper的小圆点是有问题的，没有根据对应的滑块显示高亮的小圆点
   /*  _chunk(target, size){
      if(!Array.isArray(target) || size <=0){
        return target
      }
      let result = []
      while(target.length > size){
        result.push(target.splice(0, size))
      }
      !!target.length && result.push(target)
      return result
    } */
  },

  computed: {
    ...mapState({
      addressInfo: state => state.addressInfo,
      categoryList: state => state.categoryList,
      shopsList: state => state.shopsList
    }),
    //被拆分后的组合的新数组
    newCategories() {
      //Array的chunk方法
      return _.chunk(this.categoryList, 8);
      // return this._chunk(this.categoryList, 8);
    }
  },
 
  //方式二：利用watch监视categoryList
  watch: {
    categoryList(){
       this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true,
          //分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    } 
  }
};
</script>

<style lang="stylus" scoped>
/* 因为scoped只限定于当前路由组件中的标签，
但这里我们引入了第三方库Swiper,颜色被覆盖，要想修改第三方库中的样式，就需要用到深度选择器 /deep/
*/
@import '../../common/stylus/mixins.styl';

.msite {
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          height: 100%;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      /* 深度选择器的使用 */
      /deep/.swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  //商铺
}
</style>
