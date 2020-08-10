<template>
  <div class="bar-item" @click="itemclick" :style="activestyle"  style="position:relative;">
    <div v-if="!isactive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div>
      <slot name="item-text" ></slot>
    </div>
     <div v-if='index==3'>
      <slot name="item-shopc" ></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabbaritem",
  props: {
    path1: {
      type: String
    },
    index:{
      type:Number,
      default:0
    },
    // iscolor:{
    //          type:String,
    //          default:"red"
    // },
    // baccolor:{
    //    type:String,
    //          default:"pink"
    // },
    cstyle:{
      type:Object,
      default(){
        return {
          bgcolor:'transparent',
          activebg:'transparent',
          color:'black',
          activetext:'red'
        }
      }
    }
  },
  data() {
    return {
      // color2:this.iscolor,
      // baccolor2:this.baccolor,

    };
  },
  computed: {
    isactive() {  
      return this.$route.path.indexOf(this.path1)!=-1;
    },
    activestyle(){
      return this.isactive?{color:this.cstyle.activetext,background:this.cstyle.activebg}:{color:this.cstyle.color,background:this.cstyle.bgcolor}
    }

  },
  methods: {
    itemclick() {
      if(this.path1==this.$store.state.sknavigation)return
      this.$router.push(this.path1); //得到的是上一个页的路径
    }
  }
};
</script>
<style scoped>
#bar .bar-item {
  flex: 1;
  height: 49px;
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

