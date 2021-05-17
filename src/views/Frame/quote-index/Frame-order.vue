<template>
  <div class="Frame-order" style="top: 0">
    <Header title="买涨/买跌"></Header>
    <!--    <group style="padding-bottom:16rem;">-->
    <group style="padding-bottom:76%;">
      <cell title="账户资金" :value="this.$parent.user.sealingMoney"></cell>
      <cell :title="orderdata.name" :value="this.orderdata.enddate"></cell>
      <popup-picker :title="name" :data="list" v-model="value" placeholder="完成"></popup-picker>
      <cell title="出发止损金额" :value="-orderdata.zhis"></cell>
      <cell title="出发止盈金额" :value="orderdata.zhiy"></cell>
      <cell title="市价买入" :value="this.$route.query.dangqian"></cell>
      <cell title="交易综合费(元)" :value='orderdata.zhonghe'></cell>
      <cell title="冻结保证金(元)" :value="orderdata.dongj"></cell>
    </group>
    <flexbox class="vux-flexbox w-pay-bottom vux-flex-row">
      <flexbox-item>
        <div class="vux-flexbox w-pay-bottom vux-flex-row" style="flex: 0 0 66.6667%;">
          <div style="padding: 0px 10px;">
            合计：<font id="totalprice">{{orderdata.heji}}</font>元
          </div>
        </div>
      </flexbox-item>
      <flexbox-item>
        <button class="weui-btn weui-btn_primary" @click="goumai">确定买{{this.$route.query.fangx}}</button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  import {Cell, PopupPicker, Flexbox, FlexboxItem, AlertModule} from 'vux'
  import qs from 'Qs'

  export default {
    name: "Frame-order",
    components: {
      Cell, Header, PopupPicker, Flexbox, FlexboxItem, AlertModule
    },
    data() {
      return {
        dangqian:this.$route.query.dangqian,
        name: '购买手数',
        list: [],
        value: [1],
        orderdata: {
          name:'',
          code:'',
          enddate: '',
          zhis: '',
          zhiy: '',
          mair: this.$route.query.dangqian,
          zhonghe: '',
          dongj: '',
          heji: ''
        },
        data: {
          zhis: '',
          zhiy: '',
          mair: '',
          zhonghe: '',
          dongj: '',
          heji: '',
        }
      }
    }
    , methods: {
      showLoading() {
        this.vux.loading.show({
          text: 'Loading'
        })
        setTimeout(() => {
          this.vux.loading.hide()
        }, 2000)
      },
      goumai() {
        console.log(this.$route.query.dangqian)
        this.axios.post('http://45.112.205.186/futuresOrder/addInfo', {
          memberId: this.$parent.user.id,
          commodityId:this.$route.query.pinyin,
          communityName: this.orderdata.name,
          buyDirection: this.$route.query.fangx,
          purchaseNumber: this.value[0],
          stopLossMoney: this.orderdata.zhis,
          stopEarningsMoney: this.orderdata.zhiy,
          marketPriceBuying: this.$route.query.dangqian,
          consolidatedFees: this.orderdata.zhonghe,
          freezingMargin: this.orderdata.dongj,
          orderMoney: this.orderdata.heji
        })
          .then(res => {

            if (res.data["code"] === 1) {
              this.$parent.user.sealingMoney = res.data["data"]["accountBalance"]
              AlertModule.show({
                title: '信息',
                content: '下单成功'
              })
              this.$router.push('/frame-position?commodityId=' + this.$route.query.pinyin)
            } else {
              AlertModule.show({
                title: '信息',
                content: res.data["message"]
              })
            }
          })
      }
      ,
      select() {
        this.axios.post('http://45.112.205.186/futuresLimit/infoByCode', qs.stringify({code: this.$route.query.pinyin}))
          .then(res => {
            if (res.data["code"] === 1) {
              this.orderdata.enddate = res.data["data"]["startStopTime"]
              this.orderdata.name = res.data["data"]["commodityName"]
              this.orderdata.zhis = res.data["data"]["stopLossMoney"]
              this.orderdata.zhiy = res.data["data"]["stopEarningsMoney"]
              this.orderdata.zhonghe = res.data["data"]["consolidatedFees"]
              this.orderdata.dongj = res.data["data"]["freezingMargin"]
              this.orderdata.heji = res.data["data"]["freezingMargin"] + res.data["data"]["consolidatedFees"]
              this.data.zhis = res.data["data"]["stopLossMoney"]
              this.data.zhiy = res.data["data"]["stopEarningsMoney"]
              this.data.zhonghe = res.data["data"]["consolidatedFees"]
              this.data.dongj = res.data["data"]["freezingMargin"]
              this.data.heji = res.data["data"]["freezingMargin"] + res.data["data"]["consolidatedFees"]
            }

          })
      }
    }
    , watch: {
      value: {
        deep: true,
        handler: function (val) {
          this.orderdata.zhis = val["0"] * this.data.zhis
          this.orderdata.zhiy = val["0"] * this.data.zhiy
          this.orderdata.zhonghe = val["0"] * this.data.zhonghe
          this.orderdata.dongj = val["0"] * this.data.dongj
          this.orderdata.heji = val["0"] * this.data.dongj + val["0"] * this.data.zhonghe
        }
      },
      '$route': {
        deep: true,
        handler: function (val) {
          if (val.name === 'Frame-order') {
            this.select()
          }
        }
      }
    },
    created() {
      this.select()
      let lists = []
      for (let i = 1; i < 1000; i++) {
        lists.push(i)
      }
      this.list.push(lists)
    }
  }
</script>

<style scoped>
  .Frame-order >>> .vux-flexbox {
    position: fixed;
    bottom: 0;
    height: 48px;
    background-color: #FFF;
  }
</style>
