<template>
 <div id="bar">
      <slot></slot>
    </div>
</template>

<script>
export default{
         name:"tabbar",
        
}
</script>
<style scoped>
 #bar{
  display:flex;
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  background:pink;
  margin:0 auto;
}


</style>
