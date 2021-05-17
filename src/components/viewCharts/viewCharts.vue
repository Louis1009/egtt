<template>
  <!--图表内容区域，必须给 ECharts 容器本身指定高度。不然它会使用默认高度-->
  <div class="viewCharts">
    <!-- 头部tab选项卡 -->
    <tab bar-active-color="#755fda" custom-bar-width="25px">
      <tab-item :selected="this.index===0?true:false" @on-item-click="getIndex">分时</tab-item>
      <tab-item @on-item-click="getIndex">日线</tab-item>
      <tab-item @on-item-click="getIndex">5分钟</tab-item>
      <tab-item @on-item-click="getIndex">15分钟</tab-item>
      <tab-item @on-item-click="getIndex">30分钟</tab-item>
      <tab-item @on-item-click="getIndex">盘口</tab-item>
    </tab>
    <!-- 中间图表 -->
    <div id="echarts" ref="myChart" style="height:443px"></div>
    <!-- 分时图的上方数据 -->
    <div class="chartData chTop" v-show="false">
      <div style="flex:1">5702.8</div>
      <div style="flex:1;text-align:right">3.77%</div>
    </div>
    <!-- 分时图的下方数据 -->
    <div class="chartData chBot" v-show="false">
      <div class="bot">
        <p style="color: rgb(46, 186, 128)">5375.7</p>
        <p style="color: rgb(255, 219, 52)">09:00</p>
      </div>
      <div class="bot" style="text-align:right">
        <p style="color: rgb(46, 186, 128)">-2.182%</p>
        <p style="color: white">14:50:16</p>
      </div>
    </div>
    <!-- 盘口数据 -->
    <div class="myTable" v-show="index===5">
      <x-table>
        <tbody>
          <tr>
            <td>
              <span class="m_left">涨跌</span>
              <span class="m_right" style="color:red">{{obj.U}}</span>
            </td>
            <td>
              <span class="m_left">涨幅</span>
              <span class="m_right" style="color:red">{{obj.Ur}}%</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="m_left">最高</span>
              <span class="m_right" style="color:red">{{obj.H}}</span>
            </td>
            <td>
              <span class="m_left">最低</span>
              <span class="m_right" style="color:green">{{obj.L}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="m_left">开盘</span>
              <span class="m_right">{{obj.O}}</span>
            </td>
            <td>
              <span class="m_left">昨收</span>
              <span class="m_right"></span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="m_left">持仓</span>
              <span class="m_right"></span>
            </td>
            <td>
              <span class="m_left">昨持仓</span>
              <span class="m_right"></span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="m_left">今结</span>
              <span class="m_right"></span>
            </td>
            <td>
              <span class="m_left">昨结</span>
              <span class="m_right">{{obj.Yc}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="m_left">总手</span>
              <span class="m_right"></span>
            </td>
            <td>
              <span class="m_left">金额</span>
              <span class="m_right"></span>
            </td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <!-- 下方数据介绍 -->
    <div class="bottom">
      <flexbox orient="vertical">
        <!-- 股名 -->
        <flexbox-item>
          <div class="flexbox">
            <div style="flex:1;text-align:left;padding-left:10px">
              <span style="font-size:16px">{{this.$route.query.name}}</span>
              {{this.$route.query.pinyin}}
              <span class="gp_rules">交易规则</span>
            </div>
            <div style="flex:1;text-align:right;padding-right:10px;line-height:2">
              本时段持仓时间至
              <span class="time" style="color:rgb(255,219,52)">03:30</span>
            </div>
          </div>
        </flexbox-item>
        <!-- 数据 -->
        <flexbox-item
          class="second"
          style="display:flex;text-align:center;padding:5px 0;margin-top:0;position:relative"
        >
          <!-- 交易数据 -->
          <div
            class="flexbox"
            style="padding-left:10px;font-size:20px;color:green;"
          >{{obj.C?obj.C:xlData.price}}</div>
          <!-- 数据 -->
          <div style="font-size:12px;color:green;flex:1">
            <p>{{obj.U?obj.U:0}}</p>
            <p>{{obj.Ur?obj.Ur:xlData.rate}}%</p>
          </div>
          <!-- 买入/卖量 -->
          <div style="font-size:12px;flex:1">
            <p>
              买入
              <span style="color:#fff;margin-left:3px">{{randomNum}}</span>
            </p>
            <p>
              卖量
              <span style="color:#fff;margin-left:3px">{{randomNum2}}</span>
            </p>
          </div>
          <!-- 进度条 -->
          <div style="flex:1;padding:9px 10px">
            <box style="margin-bottom:6px">
              <x-progress :percent="randomNum" :show-cancel="false" class="red"></x-progress>
            </box>
            <box>
              <x-progress :percent="randomNum2" :show-cancel="false"></x-progress>
            </box>
          </div>
          <!-- 一键全平 -->
          <div style="padding-right:10px">
            <div class="oneKey">
              一键
              <br />全平
            </div>
          </div>
        </flexbox-item>
        <!-- 操作 -->
        <flexbox-item class="op" style="flex:1;text-align:center;margin-top:0;position:relative">
          <div style="display:flex">
            <div
              @click="gotodie(0)"
              style="flex:1;line-height:2.2;color:white;font-size:18px;padding:4px 0"
            >持仓</div>
            <div @click="gotodie(2)" class="foot">
              {{((this.obj.C?this.obj.C:this.xlData.price)+0.1).toFixed(1)}}
              <br />买涨
            </div>
            <div @click="gotodie(1)" class="foot" style="background-color:#ffdb34">
              {{(this.obj.C?this.obj.C:this.xlData.price)}}
              <br />买跌
            </div>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
// 导入工具函数
import chartUtil from '../../untils/chartUtil'
import { Flexbox, FlexboxItem, XTable } from 'vux'
import { XProgress, Box } from 'vux'
import { async } from 'q'

export default {
  name: 'viewCharts',
  data() {
    return {
      myChart: null,
      index: 0,
      newArr: [], //分时拼合后的数据
      nowDate: [], //公共的数据(日线丶MA5丶MA15丶MA30)
      show: true, //四条小数据是否显示
      timer: null, //定时器
      randomNum: 0, //随机数
      randomNum2: 0, //随机数
      gp_title: '', //src路径传过来的股票字母
      obj: {}, //保存的嘉盛数据
      xlData: {}, //保存新浪数据
      changeUrl: true, //布尔值：用于判断请求哪方接口
      myUrl: 'http://45.112.205.186/', //我方后台数据接口
      bydown:'',
      byup:''
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    XProgress,
    Box,
    XTable
  },
  created() {
    this.obj={}
    this.gp_title = this.$route.query.pinyin
    this.changeUrl = this.getUrl()
  },
  mounted() {
    const _this = this
    // 为true:访问嘉盛数据
    if (_this.changeUrl) {
      _this.getSecondTime()
      // 定时器获取随机数
      _this.timer = setInterval(() => {
        _this.getRandom()
        _this.getqhdata()
      }, 1000)
    } else {
      // 为false:访问我方后台数据
      _this.timer = setInterval(() => {
        _this.getRandom()
        _this.getxlData(_this.gp_title)
      }, 1000)
    }
  },
  // 组件销毁
  beforeDestroy() {
    //组件销毁前先销毁 ECharts 实例
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    // 判断股票代码是否在嘉盛已知数据中
    getUrl() {
      let a = [
        'HLM',
        'SH',
        'GC',
        'ETH',
        'LTC',
        'HS',
        'MHIS',
        'NGM',
        'DAX',
        'XAGM',
        'CL',
        'RU',
        'I'
      ]
      for (let i = 0; i < a.length; i++) {
        if (a.indexOf(this.$route.query.pinyin) !== -1) {
          // 如果已存在，就访问嘉盛数据
          this.changeUrl = true
        } else {
          // 不存在就访问新浪数据
          this.changeUrl = false
        }
      }
      return this.changeUrl
    },
    // 获取点击tab-item的索引
    getIndex(e) {
      this.clearAll()
      let url = ''
      if (this.index != e) {
        this.index = e
        // 如果股票名存在嘉盛数据中就走这条
        if (this.changeUrl == true) {
          if (this.index === 0) {
            this.show = true
            this.getSecondTime()
          } else if (this.index === 5) {
            this.myChart.clear()
          } else {
            this.show = false
            if (this.index === 1) {
              url = 'http://47.75.63.240:8070/dk?s=' + this.gp_title
            } else if (this.index === 2) {
              url = 'http://47.75.63.240:8070/mk?m=5&s=' + this.gp_title
            } else if (this.index === 3) {
              url = 'http://47.75.63.240:8070/mk?m=15&s=' + this.gp_title
            } else if (this.index === 4) {
              url = 'http://47.75.63.240:8070/mk?m=30&s=' + this.gp_title
            }
            this.getLine(url)
          }
        } else {
          // 不存在就走这条,请求新浪接口
          console.log(this.changeUrl)
          if (this.index === 0) {
            this.show = true
            // 不画分时图
          } else if (this.index === 5) {
            this.myChart.clear()
          } else {
            this.show = false
            if (this.index === 1) {
              url = this.myUrl + 'stock/queryDayLine?stockCode=' + this.gp_title
            } else if (this.index === 2) {
              url =
                this.myUrl + 'stock/queryFiveLine?stockCode=' + this.gp_title
            } else if (this.index === 3) {
              url =
                this.myUrl + 'stock/queryFifteenLine?stockCode=' + this.gp_title
            } else if (this.index === 4) {
              url =
                this.myUrl + 'stock/queryThirtyLine?stockCode=' + this.gp_title
            }
            this.getxLine(url)
          }
        }
      }
    },
    // 嘉盛分时
    async getSecondTime() {
      // 请求分时数据
      await this.axios
        .get('http://47.75.63.240:8070/?s=' + this.gp_title)
        .then(res => {
          // 拼和数据
          for (let i = 0; i < res.data['dataarr'].length; i++) {
            if (i === 0) {
              this.newArr.push([
                res.data['datearr'][i]['value'],
                res.data['dataarr'][i]
              ])
            } else {
              this.newArr.push([res.data['datearr'][i], res.data['dataarr'][i]])
            }
          }
        })
      this.initCharts(chartUtil.lineOption(this.newArr))
    },
    // 日线丶MA5丶MA15丶MA30  请求嘉盛数据
    async getLine(url) {
      await this.axios.get(url).then(res => {
        this.nowDate = res.data
      })
      this.initCharts(chartUtil.candleOption(this.nowDate))
    },
    // 日线丶MA5丶MA15丶MA30  请求新浪数据
    async getxLine(url) {
      await this.axios.post(url).then(res => {
        this.nowDate = res.data
      })
      this.initCharts(chartUtil.candleOption(this.nowDate))
    },
    // 随机数
    getRandom() {
      this.randomNum = Math.floor(Math.random() * (100 - 0)) + 0
      this.randomNum2 = Math.floor(Math.random() * (100 - 0)) + 0
    },
    // 初始化echarts实例
    initCharts(obj) {
      // 找到画板
      this.myChart = echarts.init(this.$refs.myChart)
      // 清空画板
      this.myChart.clear()
      // 设置配置项
      this.myChart.setOption(obj)
    },
    // 清空所有值
    clearAll() {
      this.newArr = []
      this.nowDate = []
    },
    //goto页面
    gotodie(val) {
      if (val === 1) {
        this.$router.push(
          '/frame-order?pinyin=' +
            this.$route.query.pinyin +
            '&dangqian=' +
          ((this.obj.C?this.obj.C:this.xlData.price)) +
            '&fangx=' +
            '跌'
        )
      } else if (val === 2) {
        this.$router.push(
          '/frame-order?pinyin=' +
            this.$route.query.pinyin +
            '&dangqian=' +
          ((this.obj.C?this.obj.C:this.xlData.price)+0.1).toFixed(1) +
            '&fangx=' +
            '涨'
        )
      } else {
        this.$router.push(
          '/frame-position?commodityId=' + this.$route.query.pinyin
        )
      }
    },
    //拿去socletio的数据
    getqhdata() {
      let data = { data: this.$route.query.pinyin, emitType: 'lastData' }
      this.$socket.emit('last', data)
    },
    // 获取新浪对应的数据
    getxlData(gpName) {
      let data = JSON.parse(window.localStorage.getItem('xldata'))
      for (let i = 0; i < data.length; i++) {
        if (gpName == data[i].code) {
          this.xlData = data[i]
          return
        }
      }
    }
  },
  sockets: {
    lastData(data) {
      this.obj = data
      this.bydown=((this.obj.C?this.obj.C:this.xlData.price)+0.1).toFixed(1)
      this.byup=(this.obj.C).toFixed(1)
    }
  },
  deactivated() {
    clearInterval(this.timer)
  },
  watch: {
    index: {
      deep: true,
      handler: function(oldValue, newValue) {
        if (oldValue === newValue) return
      }
    },
    $route: {
      deep: true,
      handler: function(value) {
        if (value.path === '/frame-index') {
          this.obj={}
          this.xlData={}
          if (this.changeUrl) {
            this.getqhdata()
          }
          this.getxlData(this.$route.query.pinyin)
          this.timer = setInterval(() => {
            this.getRandom()
            if (this.changeUrl) {
              this.getqhdata()
            } else {
              this.getxlData(this.$route.query.pinyin)
            }
          }, 1000)
          this.getUrl()
          this.index = 0
          this.clearAll()
          this.gp_title = this.$route.query.pinyin
          if (this.myUrl) {
            this.getSecondTime()
          }
        }
      }
    }
  },
  deactivated() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.viewCharts {
  width: 100%;
}

#echarts {
  background: #21202d;
}

/* 小数据样式 */
.chartData {
  width: 100%;
  position: absolute;
}

/* 上面小数据 */
.chTop {
  display: flex;
  top: 90px;
  font-size: 12px;
  color: #ff0000;
  line-height: 21px;
}

/* 下面小数据 */
.chBot {
  display: flex;
  font-size: 12px;
  bottom: 134px;
  line-height: 14px;
}

.bot {
  flex: 1;
}

/* 盘口 */
.myTable {
  font-size: 12px;
  color: white;
  position: absolute;
  top: 90px;
  width: 100%;
}

.myTable span {
  padding: 0 10px;
}

.myTable >>> .m_left {
  float: left;
}

.myTable >>> .m_right {
  float: right;
}

.vux-table td:before,
.vux-table th:before {
  border-bottom: 1px solid #484848;
}

.bottom {
  background-color: #1d2228;
  font-size: 18px;
  color: #999;
  height: 134px;
  overflow: hidden;
}

.flexbox {
  font-size: 12px;
  padding: 5px 0;
  line-height: 1.4;
  display: flex;
}

.flexbox:before,
.second:before,
.op:before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  content: '';
  /* -webkit-transform: scaleY(.5); */
  transform: scaleY(0.5);
  background-color: #34393e;
}

.gp_rules {
  margin-left: 10px;
  color: #ce3c39;
  font-size: 12px;
  border-bottom: 1px solid #ce3c39;
  line-height: 1;
}

.viewCharts >>> .weui-progress__bar {
  height: 10px;
  background-color: #b6b6b6;
  border-radius: 1px;
}

.viewCharts >>> .red .weui-progress__inner-bar {
  background-color: #bd162c;
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
}

.oneKey {
  border: 1px solid #755fda;
  color: #755fda;
  border-radius: 50%;
  padding: 6px 9px;
  font-size: 12px;
  line-height: 1.3;
}

.foot {
  flex: 1;
  line-height: 1.2;
  color: white;
  font-size: 16px;
  background: #755fda;
  padding: 4px 0;
}
</style>
