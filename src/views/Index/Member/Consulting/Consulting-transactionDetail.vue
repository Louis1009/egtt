<template>
  <div class="TransactionDetail" style="top: 0">
    <Header title="结算详情"></Header>
    <group>
      <cell :title="title" :value="'￥'+money"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  import { CellFormPreview, Cell } from 'vux'
  import qs from 'Qs'
    export default {
        name: "Consulting-transactionDetail",
        components:{
          Header,Cell,CellFormPreview
        },
        data(){
            return{
              title:'结算金额',
              money:'',
              list:[]
            }
        },
      created(){
          this.getdata()
      },
      methods:{
          getdata(){
            this.axios.post('http://45.112.205.186/futuresSettlementDetails/queryDetail',qs.stringify({id:this.$route.query.id}))
              .then(res=>{
                this.money=res.data["data"]["settlementMoney"]
                let list=[{
                  label: '资产类型(Asset type)',
                  value: res.data["data"]["assetType"]
                },{
                  label: '结算状态(Settlement status)',
                  value: res.data["data"]["settlementStatus"]===0?'市场卖出':res.data["data"]["settlementStatus"]===1?'止盈卖出':'止损卖出'
                },{
                  label: '方向(direction)',
                  value: res.data["data"]["direction"]
                },{
                  label: '买入(Purchase)',
                  value: res.data["data"]["purchase"]
                },{
                  label: '卖出(Sell out)',
                  value: res.data["data"]["sellOut"]
                },{
                  label: '止盈(target profit)',
                  value: '+HK'+res.data["data"]["targetProfit"]
                },{
                  label: '止损(Stop loss)',
                  value: '-HK'+res.data["data"]["stopLoss"]
                },{
                  label: '结算时间(Settling time)',
                  value: res.data["data"]["createTime"]
                }]
                this.list=list
              })
          }
      },watch:{
        '$route':{
          deep:true,
          handler:function (val) {
            if(val.name==='Consulting-transactionDetail'){
              this.getdata()
            }
          }
        }
      }

    }
</script>

<style scoped>

</style>
