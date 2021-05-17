<template>
  <div class="Consulting" style="top: 0;">
    <Header title="充值"></Header>
    <div class="weui-cells__title">余额：{{this.$parent.user.sealingMoney}}</div>
    <group>
        <x-input name="price" :is-type="price" v-model="prices.order_amount" title="充值金额" placeholder="请输入500元以上的充值金额" keyboard="number"></x-input>
    </group>
    <group title="请选择充值方式">
      <radio :options="radio001" @on-change="change"></radio>
    </group>
    <div data-v-7484f99e="" style="margin: 30px 10px;">
      <x-button class="weui-btn" @click.native="chongz()" style="background-color: #755fda;color: #f2f2f2;line-height:02rem;" action-type="button">下一步</x-button>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  import { Radio, Group,AlertModule } from 'vux'
  import qs from 'Qs'
  export default {
    name: "Member-recharge",
    components:{
      Header,Radio,Group,AlertModule
    },
    data(){
      return {
        radio001: ['微信扫码','支付宝扫码','网关支付'],
        url:'/recharge-qrcode',
        price:function (value) {
          return {
            valid: value >= 500,
            msg:'充值金额要大于200'
          }
        },
        prices:{
          order_amount:'',
          pay_type:''

        }
      }
    },watch:{
      url:{
        deep:true,
        handler: function (value) {
          this.url=value
        }
      }
    },
    created() {
    },
    methods: {
      change (value) {
        if(value==='微信扫码'){
          this.prices.pay_type='1'
        }else if(value==='支付宝扫码'){
          this.prices.pay_type='2'
        }else {
          this.prices.pay_type='0'
        }
      },
      chongz(){
        if(this.prices.order_amount<500){
          AlertModule.show({
            title: '信息',
            content: "充值金额要大于500"
          })
          return false;
        }if (this.prices.pay_type===''){
          AlertModule.show({
            title: '信息',
            content: "请选择充值类型"
          })
          return false;
        }
        this.axios.post('http://45.112.205.186/payApi/scanPay',qs.stringify(this.prices))
          .then((res)=>{
            console.log(res.data["data"]["order_no"])
            console.log(res.data["data"]["qrCode"])
            window.localStorage.setItem('order_no',res.data["data"]["order_no"])
            window.localStorage.setItem('url',res.data["data"]["qrCode"])
            this.$router.push('/recharge-qrcode?order_amount='+this.prices.order_amount)
          }).catch(Error=>{
          AlertModule.show({
            title: '信息',
            content: "拉起支付失败"
          })
          return false
        })

      },
      select(){
        this.axios.post('http://45.112.205.186/payApi/getPayInfo',qs.stringify({'orderNO':window.localStorage.getItem('order_on')}))
          .then((res)=>{
            this.url= res.data.data["qrCode"]
            window.localStorage.setItem('order_on',res.data.data["order_on"])
            window.location.href=res.data.data["qrCode"]
          }).catch(Error=>{
          AlertModule.show({
            title: '信息',
            content: "拉起支付失败"
          })
        })
      }
    }

  }
</script>

<style scoped>

</style>
