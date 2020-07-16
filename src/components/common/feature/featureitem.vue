<template>
  <ul class="feature-item">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  name: "featureitem"
};
</script>
<style>
.feature-item {
  width: 100vw;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap; /*当布局超过的时候自动换行 */
  /* justify-content: center; */
}
.feature-item li {
  width: 20vw;
  font-size: 12px;
  margin: 5px 0;
}
.feature-item li a {
  text-decoration: none;
  color: darkgrey;
}
.feature-item li img {
  width: 60%;
  display: block;
  margin-left: 20%;
}
</style>
