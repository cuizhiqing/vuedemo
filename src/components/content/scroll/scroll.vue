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
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  created() {},
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      click: true,
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
        console.log("到页面底部了");
          this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //   定义跳转页面指定位置事件
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    }
  }
};
</script>
<style lang='less' scoped>
.scroll {
  overflow: hidden;
}
</style>

