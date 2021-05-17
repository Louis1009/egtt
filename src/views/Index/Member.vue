<template>
  <div class="member" style="top: 0">
    <div data-v-117390fa="" class="w-member">
      <div style="height: 215px; background: url(http://45.112.205.186/images/test1.png) 50% 0px / cover no-repeat rgb(212, 39, 43);">
        <div style="height: 215px; position: relative; overflow: hidden;">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="414" height="215" id="blurred_0slgwh8et" class="vux-bg-blur" viewBox="0 0 414 215" preserveAspectRatio="none" style="opacity: 1;">
            <filter id="blur_0slgwh8et">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15">

              </feGaussianBlur>
            </filter>
            <image x="0" y="0" width="414" height="215" externalResourcesRequired="true" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://jsgj.sls4741.store/storage/admin/images/2e1468330023410acbe6125982decfbe.png" style="filter:url(#blur_0slgwh8et)" preserveAspectRatio="none"></image>
          </svg>
          <p class="center">
            <img src="http://jsgj.sls4741.store/storage/admin/images/2e1468330023410acbe6125982decfbe.png">
          </p>
          <p class="w-name" style="font-size: 16px;">{{this.$parent.user.username}}</p>
          <p class="w-name">{{this.$parent.user.phone}}</p>
        </div>
      </div>
      <div class="flexbox">
        <div class="box-item">
          <p>我的账户</p>
        </div>
        <div class="box-item">
          <p style="color: rgb(0, 0, 0); font-size: 16px; font-weight: bold;">{{this.$parent.user.sealingMoney}}</p>
        </div>
      </div>
      <div style="margin: 15px;">
        <flexbox>
          <flexbox-item>
            <x-button link="/member-recharge" type="primary" style="height: 40px;background: #fff;color: #000;">充值</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button link="/member-atm" type="warn" style="background: linear-gradient(90deg, rgb(9, 120, 200), rgb(27, 178, 221));
    color: rgb(255, 255, 255);" >提现</x-button>
          </flexbox-item>
        </flexbox>
      </div>
      <div style="background-color: rgb(255, 255, 255); overflow: hidden; border-radius: 15px;">
        <group-title> 常用功能 </group-title>
        <grid :cols="3" :show-lr-borders="false">
          <grid-item link="/member-fund">
            <div class="weui-grid__icon"><img src="../../../static/image/mgnav-01.png"></div>
            <p class="weui-grid__label"><span>资金明细</span></p>
          </grid-item>
          <grid-item link="/member-transaction">
            <div class="weui-grid__icon"><img src="../../../static/image/mgnav-02.png"></div>
            <p class="weui-grid__label"><span>结算记录</span></p>
          </grid-item>
          <grid-item link="/member-info">
            <div class="weui-grid__icon"><img src="../../../static/image/mgnav-03.png"></div>
            <p class="weui-grid__label"><span>个人资料</span></p>
          </grid-item>
          <grid-item link="/member-setting">
            <div class="weui-grid__icon"><img src="../../../static/image/mgnav-09.png"></div>
            <p class="weui-grid__label"><span>设置</span></p>
          </grid-item>
          <grid-item link="/member-message">
            <div class="weui-grid__icon"><img src="../../../static/image/mgnav-06.png"></div>
            <p class="weui-grid__label"><span>消息中心</span></p>
          </grid-item>
          <grid-item link="/member-index">
            <div class="weui-grid__icon"><img src="../../../static/image/mgnav-07.png"></div>
            <p class="weui-grid__label"><span>系统公告</span></p>
          </grid-item>
        </grid>
      </div>
    </div>

</div>

</template>
<script>
  import {Flexbox,FlexboxItem,Grid, GridItem, GroupTitle} from 'vux'
    export default {
        name: "Member",
      components:{
        Flexbox,FlexboxItem,Grid,
        GridItem,
        GroupTitle
      }
    }
</script>

<style scoped>
  .vux-bg-blur {
     z-index: -2;
     opacity: 0;
     position: absolute;
     min-height: 100%;
     display: block;
     top: 0;
     max-height: none;
     left: -20%;
     top: -20%;
     width: 140%;
     height: 140%;
     -webkit-transition: opacity linear 0.8s;
     transition: opacity linear 0.8s;
  }
  .w-member .center img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid #ececec;
  }
  .w-member .center {
    text-align: center;
    padding-top: 65px;
    color: #fff;
    font-size: 18px;
  }
  .w-member .w-name {
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
  .box-item {
    float: left;
    width: 50%;
  }
  .flexbox {
    background-color: #fff;
    font-size: 12px;
    color: #999;
    line-height: 50px;
    height: 50px;
    text-align: center;
    width: 345px;
    margin: 0 auto;
    margin-top: -25px;
    border-radius: 10px;
  }
  .w-member .weui-btn_warn {
    height: 40px;
    background: #fff;
    color: #000;
  }
  .w-member .weui-btn {
    font-size: 14px;
  }

</style>
