<template>
  <div class="Frame-position" style="top: 0">
    <Header title="持仓"></Header>
    <div style="background-color: rgb(255, 255, 255); border-radius: 20px; margin-top: -20px;">
      <div style="padding: 20px;">
        <panel :list="list" :type="type" class="w-panel"></panel>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  import {Panel} from 'vux'
  import qs from 'Qs'

  export default {
    name: "Frame-position",
    components: {
      Panel, Header
    }, data() {
      return {
        type: '8',
        list: [],
        Interval:''
      }
    }, methods: {
      getdata() {
        this.axios.post('http://45.112.205.186/futuresOrder/infoAllPosition', qs.stringify({
          commodityId: this.$route.query.commodityId,
          memberId: this.$parent.user.id
        }))
          .then(res => {
            if (res.data["code"] === 1) {
              for (let i = 0; i < res.data["data"].length; i++) {
                let list={
                  orderid:res.data["data"][i]["id"],
                  name: res.data["data"][i]["communityName"],
                  code:res.data["data"][i]["commodityId"],
                  orderno: res.data["data"][i]["orderNumber"],
                  rate:  res.data["data"][i]["buyDirection"],
                  number:  res.data["data"][i]["purchaseNumber"],
                  targetProfit:  res.data["data"][i]["stopEarningsMoney"],
                  mairu:  res.data["data"][i]["marketPriceBuying"],
                  yinkui: res.data["data"][i]["profitAndLossState"]===0?res.data["data"][i]["profitAndLossMoney"]:-res.data["data"][i]["profitAndLossMoney"],
                  stopLoss: res.data["data"][i]["stopLossMoney"],
                  zuixinprice: res.data["data"][i]["productLatestPrice"],
                  date: res.data["data"][i]["createTime"]
                }
                this.list.push(list)
              }
            }
          })
      },update() {
        this.axios.post('http://45.112.205.186/futuresOrder/infoAllPosition', qs.stringify({
          commodityId: this.$route.query.commodityId,
          memberId: this.$parent.user.id
        }))
          .then(res => {
            if (res.data["code"] === 1) {
              let datas=[]
              for (let i = 0; i < res.data["data"].length; i++) {
                let list={
                  orderid:res.data["data"][i]["id"],
                  name: res.data["data"][i]["communityName"],
                  code:res.data["data"][i]["commodityId"],
                  orderno: res.data["data"][i]["orderNumber"],
                  rate:  res.data["data"][i]["buyDirection"],
                  number:  res.data["data"][i]["purchaseNumber"],
                  targetProfit:  res.data["data"][i]["stopEarningsMoney"],
                  mairu:  res.data["data"][i]["marketPriceBuying"],
                  yinkui: res.data["data"][i]["profitAndLossState"]===0?res.data["data"][i]["profitAndLossMoney"]:-res.data["data"][i]["profitAndLossMoney"],
                  stopLoss: res.data["data"][i]["stopLossMoney"],
                  zuixinprice: res.data["data"][i]["productLatestPrice"],
                  date: res.data["data"][i]["createTime"]
                }
                datas.push(list)
              }
              this.list=datas
            }else {
              this.list=[]
            }
          })
      }
    },watch:{
    '$route':{
      deep:true,
        handler:function (val) {
        if(val.name==='Frame-position'){
          this.Interval=setInterval(this.update,1000)
        }else{
            clearInterval(this.Interval)
        }
      }
    }
  },created() {
      this.getdata()
      this.Interval=setInterval(this.update,1000)
    }

  }
</script>

<style scoped>

</style>
