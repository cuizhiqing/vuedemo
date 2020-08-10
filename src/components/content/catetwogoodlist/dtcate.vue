<template>
  <div class="dtcate">
    <!-- <dd></dd>
    -->
    <!-- <slot name="ff">
      <dd v-for="(item,key) in secmenulist" :key="key"> -->
     <!-- <img :src="path+item.c3_img" alt />
      <span>{{item.c3_name}}</span>
       </dd> -->
    <!-- </slot> --> -->

    <slot name="nn">
      <dt>{{index}}</dt>
      <dd  v-for="(item,key) in list" :key="key" :item='item' slot="nn">
        <a :href="'/details/'+item">
          <img :src="$store.state.path+'/jd_category/'+item.c3_img" alt />
          <span>{{item.c3_name}}</span>
        </a>
      </dd>
    </slot>
  </div>
</template>

<script>
export default {
  name: "dtcate",
  props: {
    shophistory: {
      type: Array,
      default() {
        return [];
      }
    },
    item: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style  scoped>
</style>
