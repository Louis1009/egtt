<template>
  <div class="Consulting" style="top: 0;">
    <Header title="结账记录"></Header>
    <div v-for="item in list">
    <group>
      <cell :title="item.title" :inlineDesc="item.date" :value="item.money" :link="url+item.id" >
      </cell>
    </group>
    </div>
  </div>

</template>

<script>
  import Header from "@/components/Frame/Header";
  import qs from 'Qs'
  import {Cell} from 'vux'
  export default {
    name: "Member-transaction",
    components:{
      Header,Cell
    },
    data(){
      return {
        list:[],
        url:'/consulting-transactionDetail?id=',
        member:{
          memberId:this.$parent.user.id
        }
      }
    },
  mounted() {
      this.getdata()
  }
    ,
    methods:{
     async getdata(){
     await this.axios.post('http://45.112.205.186/futuresSettlementDetails/listAllByMId',qs.stringify(this.member))
          .then(res=>{
            if(res.data["code"]===1){
              for (let i=0;i<res.data["data"].length;i++){
                let list={
                    id:res.data["data"][i]["id"],
                    title:res.data["data"][i]["assetType"],
                    date:res.data["data"][i]["settlingTime"],
                    money:res.data["data"][i]["settlementMoney"]
                }
                if(res.data["data"][i]["settlementStatus"]===0){
                  list.title+="【市价卖出】"
                }else if(res.data["data"][i]["settlementStatus"]===1){
                  list.title+="【止盈卖出】"
                }else{
                  list.title+="【止损卖出】"
                }
                this.list.push(list)
              }
            }
          }).catch(Error=>{
          console.log(Error)
        })
      }
    },
    watch:{
      '$route':{
        deep:true,
        handler:function (val) {
          if(val.name==='Member-transaction'){
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
