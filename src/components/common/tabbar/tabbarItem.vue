<template>
  <div class="bar-item" @click="itemclick">
    <div v-if="!isactive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{fontcolor:isactive}" :style="isactive==true?{color:color2}:{color:'red'}">
      <slot name="item-text" ></slot>
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
    iscolor:{
             type:String,
             default:"red"
    }
  },
  data() {
    return {
      color2:this.iscolor
    };
  },
  computed: {
    isactive() {  
      return this.$route.path.indexOf(this.path1)!=-1;
    },
  },
  methods: {
    itemclick() {
//       this.isactive = !this.isactive;

      this.$router.replace(this.path1);
      console.log(this.iscolor); //得到的是上一个页的路径
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
.fontcolor {
  color: red;
}
</style>

