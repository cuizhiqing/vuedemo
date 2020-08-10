<template>
  <div class="detailbaseinfo" v-if='Object.keys(goodsinfo).length !=0'>
    <div>原价： {{goodsinfo.oldprice}}</div>
    <div>现价： {{goodsinfo.newprice}}</div>
    <div>
      <span v-for="(item,index) in goodsinfo.imglist" :key="index">{{item}}</span>
    </div>
    <div>{{goodsinfo.title}}</div>
  </div>
</template>

<script>
export default {
  name: "detailbaseinfo",
  data() {
    return {
      goodsinfo: {
        oldprice: "200",
        newprice: "",
        imglist: [1, 2, 3, 4, 5],
        title: "这是一件衣服",
      },
    };
  },
  components: {},
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {},
};
</script>
<style lang='less' scoped>
         .detailbaseinfo div{
                  height: 200px;
                  border-bottom: 5px solid red;
         }
</style>
