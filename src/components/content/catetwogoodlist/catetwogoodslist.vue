<template>
  <div class="catetwogoodslist">
    <div v-if="controlindex==0">
      <dl v-if="shophistory.length">
        <slot name="zero"></slot>
      </dl>
      <dl>
        <slot name="zerohot"></slot>
      </dl>
    </div>
    <div v-if="controlindex!=0">
      <dl>
        <slot name="nozero"></slot>
      </dl>
    </div>
  </div>
</template>

<script>
// import onelist from './onelist'
export default {
  name: "catetwogoodslist",
  props: {
    controlindex: {
      type: Number,
      default: 0
    },
    secmenulist: null,
    shophistory: {
      type: Array,
      default() {
        return {};
      }
    },
   
  },
  data() {
    return {};
  },
  components: {
    //  onelist
  },
  created() {},
  mounted() {},
  methods: {
    // 清除历史纪录事件
    rmHistory() {
      let that = this;
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.shophistory = [];
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.two dl {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.two dl dt {
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
}
.two dl dd {
  width: 33%;
  margin-bottom: 10px;
  margin-left: 0;
}
.two dl dd img {
  width: 80%;
  display: block;
  margin: 0 auto;
}
</style>
