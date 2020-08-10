<template>
  <div id="shopcartab">
    <div class="shopcaritem">
      <span class="gou" :class="ghgh==true ? 'gouactive':''" @click="gougou($event)"></span>
      全选{{ghgh}}
    </div>
    <div class="shopcaritem" style="text-align:right;">
      <div>
        总计:
        <span>{{this.$store.state.totalpayment}}</span>
      </div>
    </div>
    <div class="shopcaritem">
      <span class="js">去结算({{$store.state.shopcargoodsnum}}件)</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopcartab",
  props: {
    ee: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  computed: {
    ghgh() {
      var fo = 0;
      for (var key in this.$store.state.shopcart) {
        for (var f = 0; f < this.$store.state.shopcart[key].length; f++) {
          if (this.$store.state.shopcart[key][f].ischeck == "1") fo++;
        }
      }
      return fo == this.$store.state.shopcartlength;
    },
  },
  methods: {
    gougou() {
      this.$emit("hhh",this.ghgh);
      this.$emit('totalmoney')
    },
  },
};
</script>
<style lang='less'>
#shopcartab {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  .shopcaritem {
    line-height: 49px;
    font-size: 14px;
    text-align: center;
    &:not(:first-child) {
      flex: 1;
    }
    .js {
      padding: 8px 10px;
      background: red;
      border-radius: 20px;
      color: white;
    }
  }
}
.gou {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  margin-right: 8px;
  background-position: -6px -36px;
  background-image: url("../../../assets/img/gou.png");
  background-size: 130px 105px;
}

.gou.gouactive {
  background-position: -37px -111px;
}
</style>
