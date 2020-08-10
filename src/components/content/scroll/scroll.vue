<template>
  <div class="scroll" ref="scroll">
    <div class="content">
      <slot></slot>
      
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true,
      scrollX: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", position => {
        //       调用一下父组件中绑定的事件，并传递参数
        this.$emit("parentscroll", position);
      });
    }
    // 当父组件允许加兹安更多时，才能监听滚动条是否滚到页面底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
    // this._registerHooks(["scroll", "scrollEnd"], (pos) => {
    //   console.log(pos);
    // });
  },
  methods: {
    // 注意，在组件内定义地方法是，尽量不使用其他茶净重已经定义好的方法名，容易冲突
    //   定义跳转页面指定位置事件
    scrollTo1(x, y,time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refreshscroll() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    // _registerHooks(hookNames, handler) {
    //   hookNames.forEach(name => {
    //     this.scroll.on(name, handler);
    //   });
    // }
  }
};
</script>
<style lang='less' scoped>
.scroll {
  overflow: hidden;
}
</style>

