<template>
  <feature divid="homefeature1" :iscopy="iscopy">
    <featureitem v-for="(item,index) in cfeature" :key="index">
      <li v-for="i in item" :key="i.id">
        <a :href="i.imghref">
          <img :src="$store.state.path+'/feature/'+i.imgsrc" />
          <span>{{i.Title}}</span>
        </a>
      </li>
      <li v-if="index==cfeature.length-1 && cfeature.length%10 !=0">
        <a href>
          <img :src="$store.state.path+'/feature/'+'20.png'" />
          <span>全部</span>
        </a>
      </li>
    </featureitem>
  </feature>
</template>
<script>
import { feature, featureitem } from "components/common/feature";
export default {
  name: "homefeature",
  props: {
    cfeature: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      iscopy: true,
    };
  },
  components: {
    feature,
    featureitem,
  },
};
</script>

<style scoped>
</style>
