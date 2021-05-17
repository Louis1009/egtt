<template>
  <div class="Consulting" style="text-align: center;top: 0;">
    <Header title="二维码支付"></Header>
    <divider>二维码支付</divider>
    <div class="body">
      <iframe :src="url"></iframe>
    </div>
  </div>
</template>

<script>
  import { Divider,AlertModule } from 'vux'
  import Header from "@/components/Frame/Header";
  import qs from 'Qs'

  export default {
    name: "Recharge-qrcode",
    components:{
      Header,Divider,AlertModule
    },data(){
      return{
        aa: 'abc',
        url:window.localStorage.getItem('url'),
        id:this.$parent.user.id,
        increaseAmount:this.$route.query.order_amount
      }
    }
    ,methods:{
      select(){
        this.axios.post('http://45.112.205.186/payApi/getPayInfo',qs.stringify({'orderNO':window.localStorage.getItem('order_no')}))
          .then((res)=>{
            if(res.data["code"]==='1'&&res.data["data"]["payStatus"]==='success'){
                this.axios.post('http://45.112.205.186/futuresMember/increasedAmount',qs.stringify({id:this.id,increaseAmount:this.increaseAmount})).then(res=>{
                  if(res.data["code"]===1){
                    this.$parent.user.sealingMoney=res.data["data"]["accountBalance"]
                    AlertModule.show({
                      title:'信息',
                      content:'充值成功！返回个人主页'
                    })
                    window.localStorage.removeItem('url')
                    window.localStorage.removeItem('order_no')
                    clearInterval(this.dateitemintavl)
                    this.$router.push('/member')
                  }
                }).catch(res=>{

                })
            }
          }).catch(error=>{

        })
      }
    },
    deactivated() {
      clearInterval(this.dateitemintavl)
    },
    watch:{
        '$route':{
          deep:true,
          handler:function (val) {
            console.log(val.name)
            if(val.name==='Recharge-qrcode'){
              this.dateitemintavl=setInterval(this.select,6000)
              console.log("dateitemintavl", this.dateitemintavl)
            } else {
              window.localStorage.removeItem("url")
              window.localStorage.removeItem("order_no")
              clearInterval(this.dateitemintavl)
            }
          }
        }
    }
  }
</script>

<style scoped>
  .body>>> iframe{
    top:10px;
    bottom: 10px;
    height: 50rem;
    width: 99%;
  }

</style>
