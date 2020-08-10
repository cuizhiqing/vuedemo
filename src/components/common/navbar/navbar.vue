<template>
  <div class="navbar">
    <div class="left" @click="parentl" >
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    parentl() {
      this.$emit("leftparent");
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex; /*css3看下display*/
  height: 44px;
  text-align: center;
  line-height: 44px;
  /* box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2); */
}

.left,
.right {
  width: 44px;
}
.center {
  flex: 1;
}
</style>