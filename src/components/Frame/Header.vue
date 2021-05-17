<template>
  <div class="Frame">
    <x-header>{{title}}</x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
    export default {
        name: "Header",
        components:{
            XHeader
        },
        props: {
          title: String
        }
    }
</script>
<style scoped>

</style>
