<template>
  <div class="Consulting" style="top: 0;">
    <Header title="资金明细"></Header>
    <div v-for="item in list">
    <group>
      <cell :inlineDesc="item.date" :title="item.title" :value="item.money"></cell>
    </group>
    </div>
  </div>

</template>

<script>
  import Header from "@/components/Frame/Header";
  import { Cell,CellFormPreview,AlertModule} from 'vux'
  import qs from 'Qs'
  export default {
    name: "Member-fund",
    components:{
      Header,Cell,CellFormPreview,AlertModule
    },
    data(){
      return {
       list:[],
        member:{
          memberId:this.$parent.user.id
        }

      }
    },
    created(){
      this.getdata()
    },
    methods:{
      getdata(){
        this.axios({
          headers:{'Content-Type': 'application/x-www-form-urlencoded'},
          method:'post',
          url:'http://45.112.205.186/futuresCapitalDetails/listAll',
          data:qs.stringify(this.member)
        })
          .then((res)=>{
            if (res.data["code"]===1){
              let title=''
              for (let i=0;i<res.data["data"].length;i++){
                if(res.data["data"][i]["capitalType"]===3){
                  title= "资金提现"
                }else if(res.data["data"][i]["capitalType"]===2){
                  title= "订单结算"
                }else if(res.data["data"][i]["capitalType"]===1){
                  title= "购买资产"
                }else {
                  title= "系统充值"
              }
                let a={
                  title:title,
                  money:res.data["data"][i]["positiveAndNegative"]+""+res.data["data"][i]["capitalNumber"],
                  date:res.data["data"][i]["createTime"]
                }
                this.list.push(a)
              }
            }
          }).catch(error => {
          AlertModule.show({
            title: '信息',
            content: error
          })
        })
      }
    }
    ,watch:{
      '$route':{
        deep: true,
        handler: function (route) {
          if(route.name==='Member-fund'){
            console.log(route.name)
            this.list=[]
            this.getdata()
          }
        }
      }
    }

  }
</script>

<style scoped>

</style>
