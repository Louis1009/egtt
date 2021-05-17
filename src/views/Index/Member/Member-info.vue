<template>
  <div class="Consulting" style="top: 0;">
    <Header title="个人资料"></Header>
    <group>
      <cell :title="title" :value="value" link="/info-password"></cell>
    </group>
  </div>
</template>

<script>
  import Header from "@/components/Frame/Header";
  import {Cell} from 'vux'
  export default {
    name: "Member-info",
    components:{
      Header,Cell
    },
    data(){
      return{
        title:'修改密码',
        value:'修改'
      }
    }
  }
</script>

<style scoped>

</style>
