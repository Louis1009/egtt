<template>
  <div class="forgetPassword">
    <div class="Frame">
      <x-header :left-options="{backText: ''}">返回</x-header>
    </div>
    <group>
      <x-input  name="mobile" v-model="forget.phone" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    </group>
    <group>
      <x-input v-model="yanz" placeholder="请输入验证码" class="weui-vcode">
        <x-button v-show="show"  slot="right" type="primary" @click.native="getCode()" mini>发送验证码</x-button>
        <span v-show="!show" slot="right" >{{count}}</span>
      </x-input>
    </group>
    <group>
      <x-input name="password" v-model="forget.newPassWord" placeholder="请输入密码"  type="password"></x-input>
    </group>
    <div style="margin: 0px auto; width: 90%;">
      <x-button type="primary" @click.native="FoegetPwd()" class="weui-btn vux-x-button-no-border weui-btn_warn"
                style="background: linear-gradient(90deg, rgb(9, 120, 200), rgb(27, 178, 221)); color: rgb(255, 255, 255); border-radius: 99px;">
        提交
      </x-button>
    </div>
  </div>
</template>
<script>
  import { XInput,XButton,XHeader,AlertModule } from 'vux'
  import qs from 'Qs'
  export default {
      name: "ForgetPassword",
      components: {
        XInput,
        XButton,
        XHeader,AlertModule
      },
    data(){
      return{
        show: true,
        count:'',
        timer:null,
        Id:'',
        yanz:'',
        forget:{
          phone:'',
          newPassWord:''
        }
      }
    },
    methods:{
        //region 短信验证
      getCode(){
        if(this.forget.phone===''){
          AlertModule.show({
            title: '信息',
            content: "请输入手机号码"
          })
          return false;
        }
        // 发送验证码
        this.axios.post('http://45.112.205.186/SmsApi/sms', qs.stringify(this.forget))
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
            content:alert(error.message())
          })
          console.log(this.members.phone);
          return false;
        });
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
    //  endregion
      ,
      // region 修改密码
      FoegetPwd(){
          if(this.forget.phone===''||this.forget.newPassWord===''||this.yanz===''){
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
            Id:window.localStorage.getItem('smsId'),code:this.yanz,phone:this.forget.phone
          }))
            .then(res => {
             if(res.data["code"]==1){
               console.log(res.data)
                //region 后台注册
                this.axios({
                  method:"post",
                  url:"http://45.112.205.186/futuresMember/chagePassWord",
                  params:_this.forget
                }).then((res)=>{
                  if(res.data["code"]==1){
                    AlertModule.show({
                      title: '信息',
                      content: "密码修改成功，前往登陆页面"
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

      }
      // endregion
    }
    }
</script>

<style scoped>
  .forgetPassword.router-view {
    background: #fff;
    height: 100%;
    overflow: hidden;
    top: 0px;
  }
</style>
