<template>
  <div class="Consulting" style="top: 0;">
    <Header title="提现"></Header>
    <div>
      <div class="weui-cells__title">余额：{{this.$parent.user.sealingMoney }}</div>
      <group>
        <x-input required name="presentationMoney" :is-type="presentationMoney" v-model="atm.presentationMoney"  title="提现金额"  placeholder="最低提现200元，提现手续费2%/笔" keyboard="number"></x-input>
        <x-input required name="cardholderName" v-model="atm.cardholderName" title="持卡姓名" placeholder="持卡人姓名" is-type="china-name"></x-input>
        <x-input required name="reservedIdNumber" :is-type="reservedIdNumber" v-model="atm.reservedIdNumber" title="身份证号" placeholder="请输入身份证号"></x-input>
        <x-input required name="openingBank" v-model="atm.openingBank" title="开户行" placeholder="请输入开户行" keyboard="number"></x-input>
        <x-input required name="bankCardNumber" :is-type="bankCardNumber" v-model="atm.bankCardNumber" title="银行卡号" placeholder="请输入银行卡号" keyboard="number"></x-input>
        <x-input required name="openingBankAddress" v-model="atm.openingBankAddress" title="开户行全称" placeholder="开户行支行地址" keyboard="number"></x-input>
        <x-input required name="reservedPhone" v-model="atm.reservedPhone" title="手机号" placeholder="银行预留手机号" is-type="china-mobile" keyboard="number"></x-input>
        <x-input required name="loginPassword" v-model="atm.loginPassword" title="登陆密码" placeholder="请输入登陆密码" type="password"></x-input>
      </group>
    </div>
    <div style="margin: 30px 10px;">
      <x-button @click.native="atmprice()"  class="weui-btn" style="background-color: #755fda;color: #f2f2f2;line-height:02rem;" action-type="button">提交申请</x-button>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  import {AlertModule} from 'vux'
  export default {
    name: "Member-atm",
    components:{
      Header,AlertModule
    },
    data(){
      return{

        presentationMoney:function (value) {
          return {
            valid: value >= 200,
            msg:'提现金额要大于200'
          }
        },
        reservedIdNumber:function(value){
          return{
            valid: (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(value),
              msg:'输入正确身份证号'
          }
        },
        bankCardNumber:function(value){
          return{
            valid:(/(^\d{19}$)/).test(value),
            msg:'请输入正确的银行卡账号'
          }
        },
        // sealingMoney:JSON.parse(window.localStorage.getItem("user")).sealingMoney,
        atm:{
          presentationMoney:'',
          memberId:this.$parent.user.id,
          cardholderName:'',
          reservedIdNumber:'',
          openingBank:'',
          bankCardNumber:'',
          openingBankAddress:'',
          reservedPhone:'',
          loginPassword:''
        }
      }
    },
    methods:{
      // region 提现
      atmprice(){
        //region 文本校验
        if(this.atm.presentationMoney<200){
            AlertModule.show({
              title: '信息',
              content: "提现金额要大于200"
            })
            return false;
        }
        if(this.atm.cardholderName===''||this.atm.reservedIdNumber===''||this.atm.openingBank===''||this.atm.bankCardNumber===''||this.atm.openingBankAddress===''||this.atm.reservedPhone===''||this.atm.loginPassword===''){
          AlertModule.show({
            title: '信息',
            content: "请填写完整信息"
          })
          return false;
        }
        //endregion
        this.axios({
          method:"post",
          url:"http://45.112.205.186/futuresPresentation/addFuturesPresentation",
          data:this.atm
        }).then((res)=>{
          if(res.data["code"]==1){
            this.$parent.user.sealingMoney = res.data["data"]["accountBalance"]
            AlertModule.show({
              title: '信息',
              content: "提现成功！"
            })
            console.log(res.data);
            // this.$router.push('/member')
          }else {
            AlertModule.show({
              title: '信息',
              content: res.data["message"]
            })
          }
        })
      }
      // endregion
    },
    watch:{
    '$route':{
      deep: true,
        handler: function (route) {
        console.log(route.name)
        this.atm={
          presentationMoney:'',
          memberId:this.$parent.user.id,
          cardholderName:'',
          reservedIdNumber:'',
          openingBank:'',
          bankCardNumber:'',
          openingBankAddress:'',
          reservedPhone:'',
          loginPassword:''
        }
      }
    }
  }
  }
</script>

<style scoped>

</style>

