<template>
  <div class="Consulting" style="top: 0;">
    <Header title="设置"></Header>
    <div  class="router-view">
      <div>
        <div class="weui-cells vux-no-group-title" style="margin-top: 0px;"> </div>
      </div>
      <div style="margin: 20px 10px;">
        <x-button class="weui-btn weui-btn_warn" @click.native="setting()"  style="background-color: #755fda;line-height: 1.7rem">退出登录</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  export default {
    name: "Member-setting",
    components:{
      Header
    },methods:{
      setting(){
        let _this = this;
        window.localStorage.removeItem("user")
        _this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>

</style>
