<template>
  <div class="Frame" style="top: 0">
    <!--      <x-header :left-options="{backText: ''}">返回</x-header>-->
    <!--      <router-view></router-view>-->

    <div
      style="height: 230px; background: url('http://45.112.205.186/images/test2.png') 50% 0px / cover no-repeat; padding: 20px;">
      <div class="home-title"><p>首页</p></div>
      <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
    </div>

    <div style="background-color: rgb(255, 255, 255); border-radius: 20px; margin-top: -20px;">
      <div style="padding: 20px;">
        <p style="margin-bottom: 20px;">货币推荐</p>
        <panel :list="list" :type="type" @on-img-error="onImgError" class="w-panel"></panel>
      </div>
    </div>

  </div>
</template>

<script>
  import {Swiper, XHeader, Panel, AlertModule} from 'vux'
  import FrameTabBar from "@/components/Frame/FrameTabBar";
  import qs from 'Qs'

  export default {
    name: "Frame",
    components: {
      FrameTabBar,
      Swiper,
      XHeader,
      Panel, AlertModule
    },

    data() {
      return {
        demo01_list: [{
          url: 'javascript:',
          img: 'http://jsgj.sls4741.store/storage/admin/images/d896f3e5a4ee0afd59fcbbcca6d35d48.jpg',
        }, {
          url: 'javascript:',
          img: 'http://jsgj.sls4741.store/storage/admin/images/d896f3e5a4ee0afd59fcbbcca6d35d48.jpg',
        }, {
          url: 'javascript:',
          img: 'http://jsgj.sls4741.store/storage/admin/images/d896f3e5a4ee0afd59fcbbcca6d35d48.jpg',
        }],
        demo01_index: 0,
        websock: null,
        type: '6',
        list: [],
        footer: {
          title: '----我也是有底线的----',
          url: 'http://vux.li'
        }
      }
    },
    created() {
      // 首次获取产品信息
      this.select()
      this.websock = setInterval(this.getqhdata, 1000)
      setInterval(this.update, 1000)
      //定时获取用户金额
      setInterval(this.updatemember, 6000)
      console.log(this.$parent.xldata)
    },
    sockets: {
      multiLastData(data) {
        const _this = this
        _this.$parent.qhdata = data
        let a = ["HLM", "SH", "GC", "ETH", "LTC", "HS", "MHIS", "NGM", "DAX", "XAGM", "CL", "RU", "I"]
        for (let i = 0; i < _this.list.length; i++) {
          if (a.indexOf(_this.list[i].pinyin) !== -1) {
            _this.list[i].price = JSON.parse(window.localStorage.getItem('qhdata'))[_this.list[i].pinyin]["C"]
            _this.list[i].rate = JSON.parse(window.localStorage.getItem('qhdata'))[_this.list[i].pinyin]["Ur"]
          }
        }
      }
    },
    methods: {
      //

      getqhdata() {
        let data = {
          "data": ["HLM", "SH", "GC", "ETH", "LTC", "HS", "MHIS", "NGM", "DAX", "XAGM", "CL", "RU", "I"],
          "emitType": "multiLastData"
        }
        this.$socket.emit("multiLast", data);
      },
      demo01_onIndexChange: function (index) {
        this.demo01_index = index
      },
      onImgError(item, $event) {
        console.log(item, $event)
      },
      select() {
        this.axios.post('http://45.112.205.186/futuresProductData/listAllLastData')
          .then(res => {
            for (let i = 0; i < res.data["data"].length; i++) {
              let datas = {
                pinyin: res.data["data"][i]["commodityCode"],
                zhongwen: res.data["data"][i]["commodityName"],
                baozhengjin: res.data["data"][i]["freezingMargin"],
                price: res.data["data"][i]["lastPrice"] === null ? '' : res.data["data"][i]["lastPrice"],
                rate: res.data["data"][i]["percentage"] === null ? '' : res.data["data"][i]["percentage"],
                time: res.data["data"][i]["startStopTime"],
                url: '/frame-index?pinyin=' + res.data["data"][i]["commodityCode"] + '&name=' + res.data["data"][i]["commodityName"]
              }
              this.list.push(datas)
            }
          }).catch(Error => {
          AlertModule.show({
            title: '信息',
            content: Error
          })
        })
      }
      ,
      update() {
        this.axios.post('http://45.112.205.186/futuresProductData/listAllLastData').then(res => {
          let a = ["HLM", "SH", "GC", "ETH", "LTC", "HS", "MHIS", "NGM", "DAX", "XAGM", "CL", "RU", "I"]
          let xldata = []
          for (let i = 0; i < this.list.length; i++) {
            if (a.indexOf(res.data["data"][i]["commodityCode"]) === -1) {
              this.list[i].price = res.data["data"][i]["lastPrice"]
              this.list[i].rate = res.data["data"][i]["percentage"]
              let b = {
                code: res.data["data"][i]["commodityCode"],
                price: res.data["data"][i]["lastPrice"],
                rate: res.data["data"][i]["percentage"]
              }
              xldata.push(b)
            }
          }
          this.$parent.xldata = xldata
        })
      },
      updatemember() {
        this.axios.post('http://45.112.205.186/futuresMember/getMember', qs.stringify({id: this.$parent.user.id})).then(res => {
          if (res.data["code"] === 1) {
            this.$parent.user.sealingMoney = res.data["data"]["accountBalance"]
          }
        })
      }
    }, watch: {
      '$route': {
        deep: true,
        handler: function (val) {
          const _this = this
          if (val.name === 'frame') {
            _this.websock = setInterval(this.getqhdata, 1000)
          } else {
            clearInterval(_this.websock)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .home-title {
    color: #fff;
    font-size: 18px;
    text-align: center;
    margin-bottom: 15px;
  }
</style>
