<template>
  <div class="bar-item" >
    <div>
      <slot name="item-icon"></slot>
    </div>
    <div>
      <slot name="item-text" ></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabbaritem",
  props: {
   
  },
  data() {
    return {
      // color2:this.iscolor,
      // baccolor2:this.baccolor,

    };
  },
  computed: {

  },
  methods: {
    // itemclick() {
    //   if(this.path1==this.$store.state.sknavigation)return
    //   this.$router.push(this.path1); //得到的是上一个页的路径
    // }
  }
};
</script>
<style scoped>
#bar .bar-item {
  flex: 1;
  /* height: 49px; */
  font-size: 14px;
  text-align: center;
}
#bar .bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
/* .fontcolor {
  color: red;
} */
</style>

