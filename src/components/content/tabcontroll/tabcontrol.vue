<template>
  <div :id="controlid" ref="tabcontrol" class="tabcontrol">
    <div v-if="cont">
      <slot></slot>
    </div>
    <div
      v-for="item in titlearr"
      :key="item.c1_id"
      @click="itemclick(item.c1_id)"
      :class="{active:itemindex==item.c1_id}"
    >
      <span>{{item.c1_name}}</span>
      <!-- <slot name="subname">{{item.c1_id}}</slot> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "tabcontrol",
  props: {
    controlid: {
      type: String,
      default: "tabcontrol"
    },
    titlearr: {
      type: Array,
      default() {
        return [];
      }
    },
    direction: {
      //排列的方向
      type: String,
      default: "portrait" //transverse
    },
    cont:{
       type: Boolean,
      default: true
    }
  },
  data() {
    return {
      itemindex: 'hot'
    };
  },
  methods: {
    itemclick(index) {
      //   在子组件中如果想使用父组件传递过来的事件，需要通过使用$emit
      this.$emit("tabclick", index);
      // $parent
      this.$parent.$parent.tabcontrolclick(index);
      this.itemindex = index;
    },
    handledom(){
      let tabcontrol=this.$refs.tabcontrol
      let parentwidth=tabcontrol.offsetWidth;
      let divitem=tabcontrol.querySelectorAll('div')
      divitem.forEach(item=>{
        item.style.width=parentwidth/this.column-2+'px'
      })
    }
  }
};
</script>
<style lang="less" scoped>
.tabcontrol {
  width: 100%;
  font-size: 12px;
  line-height: 40px;
}
.tabcontrol div {
  // width: 100%; /*不写默认100百分之*/
  border-bottom: 1px solid #ddd;
  height: 40px;
}
.active {
  color: red;
  background: #fff;
}

</style>
