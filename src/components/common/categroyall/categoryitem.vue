<template>
  <dd class="fff" v-on:click="shoppingclick" @click="shoppingclick(item,bool)">
    <a>
      <!-- :href="'/details/'+item" -->
      <img :src="path+item.c3_img"  @load="loadmore2"/>
      <span>{{item.c3_name}}</span>
    </a>
  </dd>
</template>
<script>
export default {
  name: "fff",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    bool:{
       type: Boolean,
      default:true,
    },
    path: {
      type: String,
      default: "http://106.12.85.17:8090/public/image/jd_category/",
    },
  },
  computed: {},
  methods: {
    loadmore2() {
      this.$bus.$emit("goodsimageload1");
    },
    shoppingclick(shop,bool) {
     this.$emit('shoppingclick',shop,bool)
    },
  },
};
</script>
<style scoped>
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

