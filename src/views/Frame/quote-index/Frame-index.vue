<template>
  <div class="Frame-index" style="top: 0">
    <Header title="实盘交易"></Header>
    <loading :show="show1" text="正在加载"></loading>
    <Charts></Charts>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  import Charts from '@/components/viewCharts/viewCharts'
  import VChart from "vux/src/components/v-chart/v-chart";
  import { Loading } from 'vux'
    export default {
      name: "Frame-index",
      components:{
        VChart,
        Header,Charts,Loading
      },
      data(){
        return{
          code:this.$route.query.pinyin,
          websocket:null,
          show1: true
        }
      },created() {
        this.showLoading()
      }
      ,methods:{
        showLoading () {
          setTimeout(() => {
           this.show1=false
          }, 1000)
        }
      }
      , watch: {
        '$route': {
          deep: true,
          handler: function (val) {
            if(val.name==='Frame-index'){
               this.showLoading()
            }else {
              this.show1=true
            }
          }
        }
      }
    }
</script>

<style scoped>

</style>
