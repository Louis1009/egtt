<template>
  <tabbar @on-index-change="change">
    <tabbar-item selected link="/frame">
      <img slot="icon" src="../../../static/image/nie-icon-home-on.png">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item link="/trading">
      <img slot="icon" src="../../../static/image/nie-icon-trading.png">
      <span slot="label">交易</span>
    </tabbar-item>
    <tabbar-item link="/consulting">
      <img slot="icon" src="../../../static/image/nie-icon-news.png">
      <span slot="label">资讯</span>
    </tabbar-item>
    <tabbar-item link="/member">
      <img slot="icon" src="../../../static/image/nie-icon-my.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>

    export default {
        name: "FrameTabBar",
        methods: {
            change: function (index) {
                switch (index) {
                    case 0:
                        // this.$router.push({ path:'/login'  })
                        break;
                    case 1:
                        break;
                }
            }
        }
    }
</script>

<style scoped>


  .weui-tab__panel {
    padding-bottom: 0;
  }
</style>
