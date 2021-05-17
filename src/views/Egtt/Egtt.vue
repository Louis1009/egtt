<template>
  <div>
    <flexbox orient="vertical" :gutter="0" style="border-bottom: 1px #3A4094 solid;">
      <flexbox-item>
        <div class="toutu">
          <img src="../../../static/img/toutu@3x.png"/>
        </div>
      </flexbox-item>
      <flexbox-item>
        <flexbox orient="horizontal" :gutter="0">
          <flexbox-item :span="2">
            <div class="about-left">關於 </div>
          </flexbox-item>
          <flexbox-item :span="10">
            <div class="about-right">EGTT </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item>
        <div class="about-content">
          EGTT 是基於DeFi這一完全去中心化技術，同時借助火幣生態鏈Heco全球最大的交易生態，在開放源代碼狀態下，構建的區塊鏈數字經濟價值新平臺。所有的收益鏈上結算，公開透明，完全去中心化。
        </div>
        <div class="about-content">
          EGTT 致力為全球用戶打造一個價值開放、共用安全、高度加密的數字經濟體，將更安全、更普惠、更優質的金融服務提供給世界上的每一個人。
        </div>
        <div class="about-content">
          與此同時，EGTT將在去中心化流動挖礦的基礎上，進一步布局，逐步布局包括去中心化DeFi借貸、多資產抵押、聚合理財、交易挖礦等等。
        </div>
      </flexbox-item>
      <flexbox-item>
        <button class="about-content-detail">查看官方介绍</button>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" style="border-bottom: 1px #3A4094 solid;">
      <flexbox-item>
        <div class="youshi-title">核心優勢 </div>
      </flexbox-item>
      <flexbox-item>
        <div class="youshi-content">
          對所有人開放、沒有中間結構，受益於完全去中心化特性，構建全球範圍的加密金融服務網絡。
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="youshi-img">
          <img src="../../../static/img/diqiu@3x.png"/>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="youshi-title2">產品優勢 </div>
      </flexbox-item>
      <flexbox-item>
        <div class="youshi-content2">
          · 完全去中心化，守護每個人權益<br/><br/>

          · 流動性挖礦，更高效的激勵機制<br/><br/>

          · 極簡化用戶體驗，對交易者和 LP 都十分友好<br/><br/>

          · 場景豐富，打造一體化的 DeFi 交易體驗<br/><br/>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" style="border-bottom: 1px #3A4094 solid;">
      <flexbox-item>
        <div class="time-img">
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="time-content">
          生態共建  安全運營
        </div>
      </flexbox-item>
      <flexbox-item>
        <flexbox orient="horizontal" :gutter="0" style="padding-left: 20px;width: 90%">
          <flexbox-item :span="3">
            <div class="time-flex-item">
              <div class="time-flex-item-num">
                {{time.days}}
              </div>
              <div class="time-flex-item-param">
                天
              </div>
            </div>
          </flexbox-item>
          <flexbox-item :span="3">
            <div class="time-flex-item">
              <div class="time-flex-item-num">
                {{time.hours}}
              </div>
              <div class="time-flex-item-param">
                小時
              </div>
            </div>
          </flexbox-item>
          <flexbox-item :span="3">
            <div class="time-flex-item">
              <div class="time-flex-item-num">
                {{time.minutes}}
              </div>
              <div class="time-flex-item-param">
                分鐘
              </div>
            </div>
          </flexbox-item>
          <flexbox-item :span="3">
            <div class="time-flex-item">
              <div class="time-flex-item-num">
                {{time.seconds}}
              </div>
              <div class="time-flex-item-param">
                秒
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" style="border-bottom: 1px #3A4094 solid; padding-bottom: 60px">
      <flexbox-item>
        <div class="total-title">當前質押總量</div>
      </flexbox-item>
      <flexbox-item>
        <flexbox orient="horizontal" :gutter="0">
          <flexbox-item>
            <div class="total-left">
              <countup :end-val="8234345" :duration="10" :decimals="0" class="demo1"></countup>EGTT
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="total-right">已被質押</div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item>
        <div class="rotateDiv">
          <div class="total-img">
          </div>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="total_param">
          <div class="total_param_content">當前質押總量</div>
          <div class="total_param_value">
            <countup :end-val="8968234" :duration="10" :decimals="0" class="demo1"></countup>
          </div>
          <div class="total_param_unit">EGTT</div>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" style="border-bottom: 1px #3A4094 solid; padding-bottom: 60px">
      <flexbox-item>
        <div class="plan-title">EGTC</div>
      </flexbox-item>
      <flexbox-item>
        <div class="plan-sub-title">减半计划</div>
      </flexbox-item>
      <flexbox-item>
        <div class="plan-chartline">
          <v-chart :data="data" prevent-default :width="width" :height="width" style="background-color: #121169">
            <v-scale x :tick-count="5"/>
            <v-scale y :tick-count="5" />
            <v-tooltip :show-item-marker="false" show-x-value />
            <v-point
              :style="{
                stroke: '#fff',
                lineWidth: 1
              }"
              shape="smooth" />
            <v-line shape="smooth" />
          </v-chart>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="plan_param">
          <div class="plan_param_content">2100萬枚 EGTT</div>
          <div class="plan_param_value">2.1萬枚 EGTC</div>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="plan_detail">210枚/天    每個月減半一次</div>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0">
      <flexbox-item>
        <div class="buy-title">購買EGTT</div>
      </flexbox-item>
      <flexbox-item>
        <div class="buy-sub-title">1 EGTT = 8 USTD</div>
      </flexbox-item>
      <flexbox-item>
        <flexbox orient="horizontal" :gutter="0" style="padding-left: 20px;width: 90%;padding-top: 20px">
          <flexbox-item :span="6">
            <div class="buy-flex-item-select">
              <div style="height: 45px;line-height: 60px">
                100-2000
              </div>
              <div>
                EGTT
              </div>
            </div>
          </flexbox-item>
          <flexbox-item :span="6">
            <div class="buy-flex-item">
              <div style="height: 45px;line-height: 60px">
                2001-5000
              </div>
              <div>
                EGTT
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item>
        <x-input style="border: 1px solid #6A73B1; border-radius: 24px;color: #FFF;margin: 30px 20px"
                 title="" :max="10" placeholder="輸入需要購買的EGTT數量" name="number"></x-input>
      </flexbox-item>
      <flexbox-item>
        <button class="buy-button">購買EGTT</button>
      </flexbox-item>
      <flexbox-item>
        <button class="audit-button">批準使用USDT</button>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" style="border-bottom: 1px #3A4094 solid; padding-bottom: 50px">
      <flexbox-item>
        <div class="buy-title">質押EGTT</div>
      </flexbox-item>
      <flexbox-item>
        <x-input style="border: 1px solid #6A73B1; border-radius: 24px;color: #FFF;margin: 30px 20px 10px 20px"
                 title="" :max="10" placeholder="輸入需要質押的EGTT數量" name="number"></x-input>
      </flexbox-item>
      <flexbox-item>
        <x-input style="border: 1px solid #6A73B1; border-radius: 24px;color: #FFF;margin: 0px 20px 30px 20px"
                 title="" v-model="address" readonly placeholder="輸入需要購買的EGTT數量"></x-input>
      </flexbox-item>
      <flexbox-item>
        <button class="buy-button">質押EGTT</button>
      </flexbox-item>
      <flexbox-item>
        <button class="audit-button">批準使用USDT</button>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" style="padding-bottom: 50px">
      <flexbox-item>
        <div class="buy-title">解除質押EGTT</div>
      </flexbox-item>
      <flexbox-item>
        <x-input style="border: 1px solid #6A73B1; border-radius: 24px;color: #FFF;margin: 30px 20px 30px 20px"
                 title="" :max="10" placeholder="輸入需要解除質押的EGTT數量" name="number"></x-input>
      </flexbox-item>
      <flexbox-item>
        <button class="buy-button">解除質押EGTT</button>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" style="border-bottom: 1px #3A4094 solid; padding-bottom: 50px">
      <flexbox-item style="padding-top: 30px">
        <div class="user-flex-item">
          <flexbox orient="horizontal" :gutter="0" style="border-bottom: 1px #6A73B1 solid;width: 90%;margin-left: 5%">
            <flexbox-item :span="6">
              <div class="user-info-left">個人等級 </div>
            </flexbox-item>
            <flexbox-item :span="6">
              <div class="user-info-right">Lv 8 </div>
            </flexbox-item>
          </flexbox>
          <flexbox orient="horizontal" :gutter="0" style="border-bottom: 1px #6A73B1 solid;width: 90%;margin-left: 5%">
            <flexbox-item :span="6">
              <div class="user-info-left">個人質押總量 </div>
            </flexbox-item>
            <flexbox-item :span="5">
              <div class="user-info-right">669 </div>
            </flexbox-item>
            <flexbox-item :span="1">
              <div class="user-info-right-unit">EGTT</div>
            </flexbox-item>
          </flexbox>
          <flexbox orient="horizontal" :gutter="0" style="width: 90%;margin-left: 5%">
            <flexbox-item :span="6">
              <div class="user-info-left">個人質押收益 </div>
            </flexbox-item>
            <flexbox-item :span="5">
              <div class="user-info-right">669 </div>
            </flexbox-item>
            <flexbox-item :span="1">
              <div class="user-info-right-unit">EGTC</div>
            </flexbox-item>
          </flexbox>
        </div>
      </flexbox-item>
      <flexbox-item style="padding-top: 20px">
        <div class="user-flex-item">
          <flexbox orient="horizontal" :gutter="0" style="border-bottom: 1px #6A73B1 solid;width: 90%;margin-left: 5%">
            <flexbox-item :span="6">
              <div class="user-info-left">團隊質押總量 </div>
            </flexbox-item>
            <flexbox-item :span="5">
              <div class="user-info-right">8669 </div>
            </flexbox-item>
            <flexbox-item :span="1">
              <div class="user-info-right-unit">EGTT</div>
            </flexbox-item>
          </flexbox>
          <flexbox orient="horizontal" :gutter="0" style="width: 90%;margin-left: 5%">
            <flexbox-item :span="6">
              <div class="user-info-left">團隊質押收益 </div>
            </flexbox-item>
            <flexbox-item :span="5">
              <div class="user-info-right">8669 </div>
            </flexbox-item>
            <flexbox-item :span="1">
              <div class="user-info-right-unit">EGTC</div>
            </flexbox-item>
          </flexbox>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" :gutter="0" style="border-bottom: 1px #3A4094 solid; padding-bottom: 60px">
      <flexbox-item>
        <div class="help-title">常見問題</div>
      </flexbox-item>
      <flexbox-item>
        <group style="margin-left: 20px; width: 90%; background-color: #121149">
          <div v-for="(item,index) in helpList" :key="index">
            <cell
              :title="item.title"
              is-link
              :border-intent="false"
              :arrow-direction="item.isShow ? 'up' : 'down'"
              @click.native="showContent(item)" class="help-content-list" style="color: #FFFFFF;background-color: #121169;"></cell>

            <template v-if="item.isShow">
              <div v-for="(child,index) in item.childList" :key="index">
                <cell-box :border-intent="false" class="sub-item help-content" style="padding-bottom: 30px;color: #9F9EB5;background-color: #121169;">{{child.content}}</cell-box>
              </div>
            </template>
          </div>
          <!--<cell
            title="EGTT 的資金安全嗎？"
            is-link
            :border-intent="false"
            :arrow-direction="showContent002 ? 'up' : 'down'"
            @click.native="showContent002 = !showContent002"></cell>

          <template v-if="showContent002">
            <cell-form-preview :border-intent="false" :list="list"></cell-form-preview>
          </template>

          <cell
            :title="$t('Title 003')"
            is-link
            :border-intent="false"
            :arrow-direction="showContent003 ? 'up' : 'down'"
            @click.native="showContent003 = !showContent003"></cell>

          <template v-if="showContent003">
            <cell-box :border-intent="false" class="sub-item">I'm content 003</cell-box>
          </template>-->

        </group>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Countup, XInput, Flexbox, FlexboxItem, Divider, VChart, VTooltip, VLine, VPoint, VScale, VAxis, VLegend, Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

  export default {
    components: {
      Countup,
      Cell,
      CellBox,
      CellFormPreview,
      Group,
      Badge,
      XInput,
      VAxis,
      Flexbox,
      FlexboxItem,
      Divider,
      VChart,
      VTooltip,
      VLine,
      VScale,
      VPoint,
      VLegend
    },
    methods: {
      showContent (record) {
        var isShow = !record.isShow
        record.isShow = isShow
        return isShow
      }
    },
    created () {
      window.setInterval(() => {
        if ((this.time.seconds + 1) === 60) {
          this.time.seconds = 0
          if ((this.time.minutes + 1) === 60) {
            if ((this.time.hours + 1) === 24) {
              this.time.hours = 0
              this.time.days = this.time.days + 1
            } else {
              this.time.hours = this.time.hours + 1
            }
          } else {
            this.time.minutes = this.time.minutes + 1
          }
        } else {
          this.time.seconds = this.time.seconds + 1
        }
      }, 1000)
    },
    data () {
      return {
        time: {
          days: 10,
          hours: 20,
          minutes: 30,
          seconds: 30
        },
        helpList: [{
          title: 'EGTT 值得投資嗎？',
          isShow: true,
          childList: [{
            content: 'EGTT 值得投資!'
          }]
        }, {
          title: 'EGTT 的資金安全嗎？',
          isShow: false,
          childList: [{
            content: '完全去中心化的EGTT，所有的收益鏈上結算，公開透明。購買\n' +
            '並質押後，亦可以隨時解除質押。（扣除一定比例手續費即可）'
          }]
        }, {
          title: 'EGTT 如何獲取收益？',
          isShow: false,
          childList: [{
            content: 'EGTT 如何獲取收益'
          }]
        }, {
          title: 'EGTT 收益率如何？',
          isShow: false,
          childList: [{
            content: 'EGTT 收益率!'
          }]
        }, {
          title: 'EGTT 如何參與？',
          isShow: false,
          childList: [{
            content: 'EGTT 如何參與？'
          }]
        }],
        list: [{
          label: 'Apple',
          value: '3.29'
        }, {
          label: 'Banana',
          value: '1.04'
        }, {
          label: 'Fish',
          value: '8.00'
        }],
        address: '0x2031d045f56e679925bf',
        width: 400,
        data: [
          { date: '第1月', value: 50 },
          { date: '第2月', value: 20 },
          { date: '第3月', value: 13 },
          { date: '第4月', value: 9 },
          { date: '第5月', value: 6.3434 }
        ]
      }
    }
  }
</script>

<style>
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  body {
    background-color: #121169;
  }
  .vux-popup-dialog .vux-popup-header-right {
    color: #755fda;
  }
  .vux-actionsheet .vux-actionsheet-menu-warn {
    color: #755fda;
  }
  .app-theme .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
  .app-theme .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
  .app-theme .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #755fda;
  }
  .app-theme .weui-btn_warn {
    background-color: #755fda;
  }
  .app-theme .weui-btn_warn:not(.weui-btn_disabled):active {
    background-color: #5b43cf;
  }
  .app-theme .weui-btn_disabled.weui-btn_warn {
    background-color: #afa0f7;
  }
  .app-theme .weui-btn_primary {
    background-color: #ffdb34;
  }
  .app-theme .weui-btn_primary:not(.weui-btn_disabled):active {
    background-color: #ebc410;
  }
  .app-theme .vux-tab .vux-tab-item.vux-tab-selected {
    color: #755fda;
    border-bottom: 3px solid #755fda;
  }
  .app-theme .vux-tab-bar-inner {
    background-color: #755fda;
  }
  .app-theme .weui-btn_plain-primary {
    color: #755fda;
    border: 1px solid #755fda;
  }


  .toutu{
    position:relative;
    width: 100%;
    height:0;
    padding-top:103%;
  }
  .toutu img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 103%;
  }
  .about-left{
    width: 56px;
    height: 33px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #FFFFFF;
    text-align: left;
    line-height: 33px;
    font-weight: 600;
    padding-left: 20px;
  }
  .about-right{
    width: 64px;
    height: 33px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #04EBFF;
    text-align: left;
    line-height: 33px;
    font-weight: 500;
    padding-left: 10px;
  }
  .about-content{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #A4A4B7;
    font-weight: 400;
    padding: 10px 20px 10px 20px;
  }
  .about-content-detail{
    margin-top: 35px;
    margin-left: 20px;
    margin-bottom: 70px;
    width: 155.56px;
    height: 42px;
    color: #FFFFFF;
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    padding: 5px 15px;
    border: 1px transparent solid;
    border-radius: 30px;
    position: relative;
    background: #121149;
  }
  .about-content-detail:after{
    content:'';
    position: absolute;
    top: -3px; bottom: -3px;
    left: -3px; right: -3px;
    background: linear-gradient(135deg,#004CFB, #00E2D9);
    border-radius: 27px;
    content: '';
    z-index: -1;
  }

  .youshi-title{
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: 600;
    padding-left: 20px;
    padding-top: 60px;
  }
  .youshi-title2{
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: 600;
    padding-left: 20px;
    padding-top: 30px;
  }
  .youshi-content{
    height: 44px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #A4A4B7;
    font-weight: 400;
    padding: 10px 20px 60px 20px;
  }
  .youshi-content2{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #04EBFF;
    font-weight: 400;
    padding: 30px 20px 60px 20px;
  }
  .youshi-img{
    position:relative;
    width: 90%;
    height:0;
    padding-top:90%;
    margin-left: 5%;
    margin-right: 5%;
    background:url("../../../static/img/waihuan@3x.png") no-repeat  0px 0px;
    background-size:cover;
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 10s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 60s;
    -webkit-animation: rotate 60s linear infinite;
    -moz-animation: rotate 60s linear infinite;
    -o-animation: rotate 60s linear infinite;
    animation: rotate 60s linear infinite;
    text-align: center;
  }
  @keyframes rotate{
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
  }

  @keyframes bak-rotate{
    0%{-webkit-transform:rotate(360deg);}
    25%{-webkit-transform:rotate(270deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(90deg);}
    100%{-webkit-transform:rotate(0deg);}
  }

  .youshi-img img {
    position: absolute;
    top: 12%;
    left: 12%;
    width: 76%;
    height: 76%;
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 60s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 60s;
    -webkit-animation: bak-rotate 60s linear infinite;
    -moz-animation: bak-rotate 60s linear infinite;
    -o-animation: bak-rotate 60s linear infinite;
    animation: bak-rotate 60s linear infinite;
  }

  .time-img{
    margin-top: 60px;
    position:relative;
    width: 96%;
    height:0;
    padding-top:96%;
    margin-left: 2%;
    margin-right: 2%;
    background:url("../../../static/img/shijian@3x.png") no-repeat  0px 0px;
    background-size:cover;
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 60s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 60s;
    -webkit-animation: rotate 60s linear infinite;
    -moz-animation: rotate 60s linear infinite;
    -o-animation: rotate 60s linear infinite;
    animation: rotate 60s linear infinite;
    text-align: center;
  }
  .time-content{
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: 600;
    padding-left: 20px;
    margin-top: -80px;
  }
  .time-flex-item-num{
    height: 60px;
    font-family: PingFangSC-Semibold;
    font-size: 28px;
    line-height: 80px;
    color: #04EBFF;
    text-align: center;
    font-weight: 600;
  }
  .time-flex-item-param{
    height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #D17878;
    text-align: center;
    font-weight: 400;
    line-height: 20px;
  }
  .time-flex-item {
    margin-left: 10px;
    width: 70px;
    text-align: center;
  //border-radius: 4px;
    margin-top: -25px;
    height: 98px;
    background-image: linear-gradient(50deg, #121169 0%, #121149 100%);
    border: 0.5px solid #FF78C7;
    border-radius: 4px;
    margin-bottom: 60px;
  }

  .total-title{
    padding-left: 20px;
    padding-top: 60px;
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: 600;
  }
  .total-left{
    height: 30px;
    font-family: PingFangSC-Semibold;
    font-size: 22px;
    color: #04EBFF;
    text-align: left;
    line-height: 33px;
    font-weight: 600;
    padding-left: 20px;
    min-width: 200px;
  }
  .total-right{
    height: 30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #A4A4B7;
    text-align: left;
    line-height: 33px;
    font-weight: 500;
    padding-left: 10px;
  }
  .total-img{
    margin-top: 40px;
    position:relative;
    width: 90%;
    height:0;
    padding-top:90%;
    margin-left: 5%;
    margin-right: 5%;
    background:url("../../../static/img/zongliang@3x.png") no-repeat  0px 0px;
    background-size:cover;
    text-align: center;
    opacity: 1;
    -webkit-animation-name: fadeInOut;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-duration: 8s;
    -webkit-animation-direction: alternate;
  }
  .rotateDiv{
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 5s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 5s;
    -webkit-animation: rotate 5s linear infinite;
    -moz-animation: rotate 5s linear infinite;
    -o-animation: rotate 5s linear infinite;
    animation: rotate 5s linear infinite;
  }
  @-webkit-keyframes fadeInOut {
    0% {
      opacity:1;
    }
    25% {
      opacity:0;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity:0.5;
    }
  }
  .total_param{
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: 600;
    padding-left: 20px;
    margin-top: -55%;
  }
  .total_param_content{
    height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #A4A4B7;
    font-weight: 400;
    text-align: center;
    line-height: 20px;
  }
  .total_param_value{
    height: 40px;
    font-family: PingFangSC-Semibold;
    font-size: 28px;
    color: #04EBFF;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
  }
  .total_param_unit{
    height: 22px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #04EBFF;
    text-align: center;
    line-height: 22px;
    font-weight: 600;
  }

  .plan-title{
    padding-left: 20px;
    padding-top: 60px;
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: 600;
  }
  .plan-sub-title{
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #04EBFF;
    text-align: left;
    line-height: 33px;
    font-weight: 600;
    padding-left: 20px;
  }
  .plan-chartline{
    padding:10px 20px 0px 10px;
  }
  .chartBg{
    background: #121169;
  }
  .plan_param{
    width: 138px;
    height: 66px;
    border: 1px solid #AA4D98;
    background-image: linear-gradient(50deg, #121169 0%, #121149 100%);
    border-radius: 10px;
    margin-top: -75%;
    margin-left: 50%;
  }
  .plan_param_content{
    padding-left: 5px;
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #04EBFF;
    font-weight: 600;
    text-align: left;
    line-height: 33px;
  }
  .plan_param_value{
    padding-left: 5px;
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #04EBFF;
    font-weight: 600;
    text-align: left;
    line-height: 33px;
  }
  .plan_detail{
    height: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #A4A4B7;
    font-weight: 500;
    padding-left: 40px;
  }

  .buy-title{
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: 600;
    padding-top: 60px;
    padding-left: 20px;
  }
  .buy-sub-title{
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #A4A4B7;
    font-weight: 400;
    padding-left: 20px;
  }
  .buy-flex-item-select{

    margin-left: 10px;
    text-align: center;
    height: 90px;
    background: #2B2A68;
    border: 1px solid #04EBFF;
    border-radius: 8px;
    padding-right: 20px;

    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #04EBFF;
    text-align: center;
    font-weight: 400;
  }
  .buy-flex-item {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #A4A4B7;
    margin-left: 10px;
    text-align: center;
    height: 90px;
    background: #2B2A68;
    border-radius: 8px;
    padding-right: 20px;
  }

  .buy-button{
    width: 90%;
    margin-top: 10px;
    margin-left: 20px;
    height: 42px;
    color: #FFFFFF;
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    padding: 5px 15px;
    border: 1px transparent solid;
    border-radius: 24px;
    position: relative;
    background-image: linear-gradient(47deg, #004CFB 0%, #00E2D9 100%);
  }
  .buy-button:after{
    content:'';
    position: absolute;
    top: -3px; bottom: -3px;
    left: -3px; right: -3px;
    background: linear-gradient(135deg,#004CFB, #00E2D9);
    border-radius: 27px;
    content: '';
    z-index: -1;
  }
  input::-webkit-input-placeholder{
    color: #A4A4B7;
  }

  .audit-button{
    width: 90%;
    margin-top: 10px;
    margin-left: 20px;
    height: 42px;
    color: #FFFFFF;
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    padding: 5px 15px;
    border: 1px #6A73B1 solid;
    border-radius: 24px;
    background-color: #121149;
  }

  .user-flex-item {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #A4A4B7;
    text-align: center;
    background: #2B2A68;
    border-radius: 12px;
    margin-left: 20px;
    width: 90%;
  }
  .user-info-left{
    height: 70px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9F9EB5;
    text-align: left;
    line-height: 33px;
    font-weight: 400;
    letter-spacing: 0.01px;
    line-height: 70px;
  }
  .user-info-right{
    height: 70px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #04EBFF;
    text-align: right;
    line-height: 33px;
    font-weight: 400;
    letter-spacing: 0.01px;
    line-height: 70px;
    padding-right: 10px;
  }
  .user-info-right-unit{
    height: 70px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #04EBFF;
    text-align: right;
    line-height: 33px;
    font-weight: 400;
    letter-spacing: 0.01px;
    line-height: 76px;
  }
  .help-title{
    height: 33px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: 600;
    padding-top: 50px;
    padding-left: 20px;
    padding-bottom: 20px;
  }
  .help-content-list{
    height: 50px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    font-weight: 400;
    border-top: 0.72px solid #3A4094;
  }
  .help-content{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9F9EB5;
    letter-spacing: 0;
    font-weight: 400;
  }

  .sub-item {
    color: #FFFFFF;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
</style>
<style lang="less">
  @import '~vux/src/styles/index.less';
</style>
