<template>
  <div class="register">

    <div class="login-zhuce">
      <router-link to="/login">登陆</router-link>
    </div>
    <div class="login-title">
      <div>
        <img data-v-01e7f602="" src="http://jsgj.sls4741.store/image/logo.png" alt="">
        嘉盛国际
      </div>
      <p style="color: rgb(173, 173, 173); font-size: 16px;">嘉盛国际·智能交易系统</p></div>
    <form>
      <div class="form-item">
        <group>
          <x-input v-model="members.phone"  required name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        </group>
        <group>
          <x-input v-model="members.username"  required name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
        </group>
        <group>
          <x-input v-model="yanz" required placeholder="请输入验证码" class="weui-vcode">
            <x-button v-show="show" slot="right" action-type="button" @click.native="getCode()" mini >获取验证码</x-button>
            <span v-show="!show" slot="right" >{{count}}</span>
          </x-input>
        </group>
        <group>
          <x-input v-model="members.password" required name="password" placeholder="请输入密码"  type="password"></x-input>
        </group>
        <group>
          <x-input v-model="members.recommendCode" placeholder="请输入推荐码" ></x-input>
        </group>
      </div>
      <div style="margin: 0px auto; width: 90%;">
        <x-button @click.native="register()" type="warn" action-type="button" class="weui-btn vux-x-button-no-border weui-btn_warn"  style="background: linear-gradient(90deg, rgb(9, 120, 200), rgb(27, 178, 221)); color: rgb(255, 255, 255); border-radius: 99px;">提交</x-button>
      </div>
    </form>
    <div class="login-bottom">
      <img src="http://jsgj.sls4741.store/image/login_bottom.png" style="width: 100%;">
    </div>
  </div>
</template>
<script>
  import { AlertModule} from 'vux'
  import qs from 'Qs'
  export default {
        name: "Register",
        components: {
          AlertModule
        },
      data(){
          return{
            show: true,
            count:'',
            timer:null,
            yanz:'',
            Id:'',
            members:{
              phone:'',
              username:'',
              password:'',
              recommendCode:''
            }
          }
      },
      methods:{
          //region 注册
        register(){
          if(this.members.phone===''||this.members.name===''||this.yanz===''||this.members.pwd===''){
            AlertModule.show({
              title: '信息',
              content: "请填写完整信息"
            })
            return false;
          }
          let _this = this;
          // 短信验证
          console.log(this.Id)
          this.axios.post('http://45.112.205.186/SmsApi/smsCalibration', qs.stringify({
            Id:window.localStorage.getItem('smsId'),code:this.yanz,phone:this.members.phone
          }))
            .then(res => {
              if(res.data["code"]==1){
                //region 后台注册
                this.axios({
                  method:"post",
                  url:"http://45.112.205.186/futuresMember/register",
                  data:_this.members
                }).then((res)=>{
                  if(res.data["code"]==1){
                    AlertModule.show({
                      title: '信息',
                      content: "注册成功,前往登陆页面"
                    })
                    window.localStorage.removeItem("smsId")
                    _this.$router.push('/login');
                  }else {
                    AlertModule.show({
                      title: '信息',
                      content: res.data["message"]
                    })
                  }
                }).catch(error => {
                  AlertModule.show({
                    title: '信息',
                    content: error.message()
                  })
                });
                //endregion
              }else {
                AlertModule.show({
                  title: '信息',
                  content: "验证码不正确"
                })
                return false
              }
            }).catch(error => {
            AlertModule.show({
              title: '信息',
              content: "重新获取验证码"
            })
            return false
          });

        }//endregion
        ,
          //region 发送验证码计时方法
        getCode() {
          if(this.members.phone===''){
            AlertModule.show({
              title: '信息',
              content: "请输入手机号码"
            })
            return false;
          }
          // 发送验证码
          this.axios.post('http://45.112.205.186/SmsApi/sms', qs.stringify(this.members))
            .then(res => {
              console.log(res.data)
              if(res.data["code"]==1){
                window.localStorage.setItem('smsId',res.data["data"]["id"])
              }else {
                AlertModule.show({
                  title: '信息',
                  content: res.data["message"]
                })
                return false;
              }
            }).catch(error => {
            AlertModule.show({
              title: '信息',
              content:error.message()
            })
            console.log(this.members.phone);
            return false;
          });
          // 验证计时
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
        }
        //endregion
      }
    }
</script>

<style scoped>
  .register.router-view {
    background: #fff;
    height: 100%;
    overflow: hidden;
    top: 0px;
  }

  .login-zhuce {
    text-align: right;
    margin: 20px;
  }

  .login-zhuce a {
    font-weight: bold;
    font-size: 16px;
    color: #000;
  }

  .login-title {
    text-align: center;
    font-size: 26px;
  }

  .login-title img {
    width: 45px;
    height: 45px;
    vertical-align: middle;
  }

  .form-item {
    margin: 70px 0 50px 0;
  }

  .form-item /deep/ .weui-cells.vux-no-group-title {
    width: 85%;
    margin: 30px auto;
    border-radius: 100px;
    border: 1px solid #e8e8e8;
  }

  .form-item /deep/ .weui-cells:before {
    border-top: none;
  }

  .form-item /deep/ .weui-cells:after {
    border-bottom: none;
  }

  .form-item .weui-btn {
    background: #fff;
    color: #000;
    font-weight: normal;
  }

  .form-item .weui-btn:after {
    border: none;
  }

</style>
