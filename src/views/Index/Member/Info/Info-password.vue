<template>
  <div class="password" style="top: 0">
    <Header title="修改密码"></Header>
    <group>
      <x-input required v-model="forms.newPassWord" title="新密码" name="pwd" type="password" placeholder="新密码"></x-input>
      <x-input required v-model="PassWord" title="再次输入" name="pwd1" type="password" placeholder="再次输入新密码"></x-input>
      <x-input required v-model="forms.phone" title="手机号码" name="pwd" keyboard="number" is-type="china-mobile" placeholder="请输入手机号码"></x-input>

      <x-input required title="验证码" v-model="yanz" placeholder="请输入验证码" class="weui-vcode">
        <x-button v-show="show"  slot="right" type="primary" @click.native="getCode()" mini>发送验证码</x-button>
        <span v-show="!show" slot="right" >{{count}}</span>
      </x-input>
    </group>
    <div style="margin: 30px 10px;">
      <x-button @click.native="FoegetPwd()" type="primary" style="background-color: #755fda;line-height: 1.5rem">
        提交
      </x-button>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  import {AlertModule} from 'vux'
  import qs from 'Qs'
    export default {
        name: "Info-password",
        components:{
            Header,AlertModule
        },
      data(){
          return{
            forms:{
              phone:'',
              newPassWord:''
            },
            PassWord:'',
            yanz:'',
            Id:'',
            show: true,
            count:'',
            timer:null,
          }
      },
      methods:{
        //region 短信验证
        getCode(){
          if(this.forms.phone===''){
            AlertModule.show({
              title: '信息',
              content: "请输入手机号码"
            })
            return false;
          }
          // 发送验证码
          this.axios.post('http://45.112.205.186/SmsApi/sms', qs.stringify(this.forms))
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
            console.log(this.forms.phone);
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
          if(this.forms.phone===''||this.forms.newPassWord===''||this.yanz===''||this.PassWord===''){
            console.log(this.forms.newPassWord+"-"+this.PassWord)
            AlertModule.show({
              title: '信息',
              content: "请填写完整信息"
            })
            return false;
          }
          if(this.forms.newPassWord!==this.PassWord){
            AlertModule.show({
              title: '信息',
              content: "两次密码不一致"
            })
            return false;
          }
          let _this = this;
          // 短信验证
          console.log(this.Id)
          this.axios.post('http://45.112.205.186/SmsApi/smsCalibration', qs.stringify({
            Id:window.localStorage.getItem('smsId'),code:this.yanz,phone:this.forms.phone
          }))
            .then(res => {
              if(res.data["code"]==1){
                console.log(res.data)
                //region 后台注册
                this.axios({
                  method:"post",
                  url:"http://45.112.205.186/futuresMember/chagePassWord",
                  params:_this.forms
                }).then((res)=>{
                  if(res.data["code"]==1){
                    AlertModule.show({
                      title: '信息',
                      content: "密码修改成功，请重新登陆！"
                    })
                    window.localStorage.removeItem('smsId')
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
      },watch:{
          '$route':{
            deep:true,
            handler:function (route) {
              if (route.name==='Info-password'){
                this.forms={
                  phone:'',
                  newPassWord:''
                }
                this.PassWord=''
                this.yanz=''
              }
            }
          }
      }

    }
</script>

<style scoped>

</style>
