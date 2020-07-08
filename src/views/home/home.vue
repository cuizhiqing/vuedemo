<template>
<div id="home">
         <navbar class="home-nav-bar">
                  <div slot="left">&lt;</div>
                  <div slot="center">
                           <input type="search" name="" placeholder="衣服" id="">
                  </div>
                  <div slot="right">登录</div>
         </navbar>
         111
</div>

</template>
<script>
import navbar from "components/common/navbar/navbar.vue"
export default{
         name:"home",
         components:{
                  navbar
         }
}

</script>
<style>
#home{
         padding-top: 44px;
         height: 100vh;/*把本身高度分成100分*/
}
.home-nav-bar{
         background: #e43130;
         color: white;
         position: fixed;
         top: 0;
         left: 0;
         right: 0;
         z-index: 100;
}
</style>

