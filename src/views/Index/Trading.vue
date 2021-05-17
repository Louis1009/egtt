<template>
  <div class="Teading" style="top:0">
    <Header title="交易"></Header>
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
    name: "Trading",
    components: {
      Panel, Header
    }, data() {
      return {
        type: '7',
        list: [],
        interval:'',
        creatinterval:'',
        qhdata:[]
      }
    }
    , methods: {
      getdata() {
        this.list=[]
        this.axios.post('http://45.112.205.186/futuresOrder/infoAllUnOrder', qs.stringify({memberId: this.$parent.user.id}))
          .then(res => {
            let a = ["HLM", "SH", "GC", "ETH", "LTC", "HS", "MHIS", "NGM", "DAX", "XAGM", "CL", "RU", "I"]
            if (res.data["code"] === 1) {
              let data = res.data["data"]
              for (let i = 0; i < data.length; i++) {
                let list = {
                  orderid: data[i]["id"],
                  pinyin: data[i]["commodityId"],
                  zhongwen: data[i]["communityName"],
                  yinli: data[i]["buyDirection"],
                  mairu: data[i]["buyAmount"],
                  zuixinprice: data[i]["productLatestPrice"],
                  rate: data[i]["percentage"],
                  chicang: data[i]["purchaseNumber"],
                  yinkui: data[i]["profitAndLossMoney"],
                }
                if (data[i]["upsanddowns"] === 1) {
                  list.yinkui = "-" + data[i]["profitAndLossMoney"]
                }
                if(a.indexOf(data[i]["commodityId"])!==-1&&this.qhdata.indexOf(data[i]["commodityId"])===-1){
                  this.qhdata.push(data[i]["commodityId"])
                }
                this.list.push(list)
              }
            }
          })
      }
      , update() {
        this.axios.post('http://45.112.205.186/futuresOrder/infoAllUnOrder', qs.stringify({memberId: this.$parent.user.id}))
          .then(res => {
            let a = ["HLM", "SH", "GC", "ETH", "LTC", "HS", "MHIS", "NGM", "DAX", "XAGM", "CL", "RU", "I"]
            if (res.data["code"] === 1) {
              let data = res.data["data"]
              for (let i = 0; i < data.length; i++) {
                if(a.indexOf(data[i]["commodityId"])===-1){
                  this.list[i].yinli= data[i]["buyDirection"]
                  this.list[i].zuixinprice=data[i]["productLatestPrice"]===null?'':data[i]["productLatestPrice"]
                  this.list[i].rate= data[i]["percentage"]===null?'':data[i]["percentage"]
                  this.list[i].yinkui= data[i]["profitAndLossMoney"]
                }
                if (data[i]["upsanddowns"] === 1) {
                  this.list.yinkui = "-" + data[i]["profitAndLossMoney"]
                }
              }
            } else {
              this.list = []
            }
          })
      },
      getqhdata() {
        let data = {
          "data": this.qhdata,
          "emitType": "multiLastData"
        }
        this.$socket.emit("multiLast", data);
      }
    },
    sockets: {
      multiLastData(data) {
        const _this = this
        let a = ["HLM", "SH", "GC", "ETH", "LTC", "HS", "MHIS", "NGM", "DAX", "XAGM", "CL", "RU", "I"]
        for (let i = 0; i < _this.list.length; i++) {
          if (a.indexOf(_this.list[i].pinyin) !== -1) {
            _this.list[i].zuixinprice = data[_this.list[i].pinyin]["C"]
            _this.list[i].rate = data[_this.list[i].pinyin]["Ur"]
          }
        }
      }
    }, watch: {
      '$route': {
        deep: true,
        handler: function (val) {
          if (val.name === 'Trading') {
            this.getdata()
            this.timer = setInterval(() => {
              this.update()
              if(this.qhdata.length!==0){
                this.getqhdata()
              }
            }, 1000)
          } else {
            clearInterval(this.timer)
          }
        }
      }
    },created() {
      this.getdata()
      this.timer = setInterval(() => {
        this.update()
        if(this.qhdata.length!==0){
          this.getqhdata()
        }
      }, 1000)
    }
  }
</script>

<style scoped>

</style>
