<template>
  <div id="categobar">
    <dl>
      <dt>
        {{controlindex==0?'热门分类' : index}}
        <a
          href="/phbhot"
          class="fr phb"
          v-if="controlindex==0"
        >排行榜 &gt;</a>
      </dt>

      <slot></slot>
      
    </dl>
  </div>
</template>

<script>
export default {
  name: "categobar",
  props: {
    index: {
      type: String,
      default: null,
    },
    controlindex: {
      type: Number,
      default: 0,
    },
  },
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
</style>
