<template>
  <div class="address">
    <scroll ref="addscroll" class="addscroll">
      <navbar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">收货地址</div>
      </navbar>
    </scroll>
    <div style="position:fixed;bottom:0;width:100%;">
             <el-button type="danger" style="margin:10px 0;margin:4%;width:92%;border-radius:20px;">新增收货地址</el-button>
    </div>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import scroll from "components/content/scroll/scroll";

export default {
  name: "address",
  data() {
    return {};
  },
  components: {
    navbar,
    scroll,
  },
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less' scoped>
.address{
         .addscroll{
                  height: calc(100%-80px);
         }
}
</style>
