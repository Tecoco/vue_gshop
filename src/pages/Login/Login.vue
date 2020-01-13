<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" @click="isUserLogin=false" :class="{on: !isUserLogin}">短信登录</a>
          <a href="javascript:;" @click="isUserLogin=true" :class="{on: isUserLogin}">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!-- 手机号登录 -->
          <div :class="{on: !isUserLogin}">
            <section class="login_message">
              <input name="phone" v-model="phone" v-validate="'required|mobile'" type="tel" maxlength="11" placeholder="手机号" />
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button 
                @click.prevent="sendCode" 
                :disabled="!rightPhoneNum || countDownTime>0" 
                class="get_verification" 
                :class="{rightPhone: rightPhoneNum}"
              >{{countDownTime ? `${countDownTime}s可以重新获取` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input v-model="code" name="code" v-validate="'required|code'" type="tel" maxlength="8" placeholder="验证码" />
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 用户名登录 -->
          <div :class="{on: isUserLogin}">
            <section>
              <section class="login_message">
                <input v-model="username" name="username" v-validate="'required'"  type="tel" maxlength="11" placeholder="手机/邮箱/用户名" />
                <span style="color: red;" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </section>
              <section class="login_verification">
                <input v-model="pwd" name="pwd" v-validate="'required'" :type="isShowPwd ? 'tel' : 'password'" maxlength="8" placeholder="密码" />
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                <div class="switch_button" :class="isShowPwd?'on':'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{moveRight: isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input v-model="captcha" name="captcha" v-validate="'required'" type="text" maxlength="11" placeholder="验证码" />
                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                <img ref="captcha" class="get_verification" @click="toggleCaptcha" src="http://localhost:4000/captcha" alt="captcha" />
              </section>
            </section>
          </div>
          <button @click.prevent="login" class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantouzuo"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return {
      isUserLogin: false, //标识用户是否登录
      isShowPwd: false, //标识是否显示密码
      phone: '',//初始化手机号码
      countDownTime: 0, //获取验证码 倒计时
      code: '',
      username: '',
      pwd: '',
      captcha: ''
    }
  },
  methods: {
    //点击切换图形验证码
    toggleCaptcha(){
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now();
    },
    //点击获取验证码
    async sendCode(){
      this.countDownTime = 5;
      let interId = setInterval(()=>{
        this.countDownTime--;
        this.countDownTime === 0 && clearInterval(interId);
      }, 1000);

      //向后台发送请求 通过短信的方式 获取验证码
      let result = await this.$API.getCode({phone: this.phone});
      if(result.code === 0){
        alert('短信已发送');
      }else{
        alert(result.msg);
      }
      
    },
    //登录
    async login(){
      //收集用户数据
      const {isUserLogin, phone, code, username, pwd, captcha} = this;
      const names = isUserLogin ? [username, pwd, captcha] : [phone, code]
      // console.log(names);//返回一个指定表单项内容的数组
      // 对指定的所有表单项进行验证
      const success = await this.$validator.validateAll(names); //返回布尔值
      //前端验证
      if(success){//前端验证失成功
        //后端验证
        let result = null;
        //判断到底是用户登录还是手机号码登录
        if(isUserLogin){//用户登录
          result = await this.$API.getLoginWithUser(username, pwd, captcha);
          if(result.code === 1){
            alert('请输入正确的用户名或密码');
            //清除之前的验证码
            this.captcha = '';
            //更新图形验证码
            this.toggleCaptcha();
          }
        }else{//手机号码登录
          result = await this.$API.getLoginWithPhone(phone, code);
           if(result.code === 1){
            alert('请输入正确的手机号');
            //清空手机验证码
            this.code = '';
          }
        }

        //统一处理登录成功的情况
        if(result.code === 0){
          //跳转到profile页面
          alert('登录成功');
          this.$router.replace('/profile');
          //保存用户信息到vuex
          this.$store.dispatch('getUserInfoAction', result.data);
        }

      }else{ //前端验证失败
        alert('前端验证失败');
      }
    }
  },
  computed: {
    //正则匹配输入的手机号码是否正确
    rightPhoneNum(){
      return /^\d(3|4|5|6|7|8|9)\d{9}$/.test(this.phone);
    }
  },
};
</script>

<style lang="stylus">
 .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.rightPhone
                  color #333
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.moveRight
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

</style>
