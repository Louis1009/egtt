<template>
  <div style="height:100%;">
    <!--  <div>-->
    <div class="weui-tab">
      <div id="vux_view_box_body" class="weui-tab__panel vux-fix-safari-overflow-scrolling"
           :style="show_tab_bar() ? 'padding-bottom: 55px;' : ''">
        <!--        <view-box>-->
        <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
          <keep-alive>
            <router-view class="router-view"></router-view>

          </keep-alive>
        </transition>
        <FrameTabBar v-if="show_tab_bar()"></FrameTabBar>
        <!--        </view-box>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import FrameTabBar from "@/components/Frame/FrameTabBar";

  export default {
    name: 'app',
    data() {
      return {
        user: {},
        qhdata:{},
        xldata:[],
        showFooter: false
      }
    },
    components: {
      FrameTabBar
    },
    computed: {
      ...mapState({
        direction: state => state.mutations.direction
      })
    },
    methods: {
      show_tab_bar: function () {
        let showUrl = [
          "/frame", "/member", "/trading", "/consulting"
        ]

        return showUrl.indexOf(this.$route.path) !== -1;
      }
    },
    created() {
     /* this.user = JSON.parse(window.localStorage.getItem("user") || '{}')

      if (this.user.isLogin) {
        // 放行
        // this.$router.push({path: '/frame'})
      } else {
        // 去登陆*/
        //this.$router.push({path: '/login'})
      /*}*/
    },
    watch: {
      user: {
        deep: true,
        handler: function (value) {
          window.localStorage.setItem("user", JSON.stringify(value))
        }
      },qhdata: {
        deep: true,
        handler: function (value) {
          window.localStorage.setItem("qhdata", JSON.stringify(value))
        }
      },xldata: {
        deep: true,
        handler: function (value) {
          window.localStorage.setItem("xldata", JSON.stringify(value))
        }
      }
    }
  }
</script>

<style>
  .router-view {
    width: 100%;
    position: relative;
    top: 46px;
  }

  .weui-tab {
    height: 100%;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    -webkit-transition: all 500ms;
    transition: all 500ms;
    /* height: 100%; */
    top: 46px;
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  #vux_view_box_body {
    padding-bottom: 0;
  }
</style>
