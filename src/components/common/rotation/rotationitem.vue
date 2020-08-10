<template>
  <div class="slide">
           <!-- 不写图，只留出一个插槽的位置提供给后边使用 -->
    <slot>

    </slot>
  </div>
</template>

<script>

export default {
  name: "slide"
};
</script>
<style>
.slide{
         width: 100%;
         flex-shrink:0;
         /* 不使用空间压缩，默认值是1，当父元素x轴方向空间不足时，子元素宽度之和大于父元素，可以按照flex-shrink分配的值，按比例缩小子元素，缩小的值是超出部分的值得计算值 */
}
.slide img{
  height: 100%;
         width: 100%;
}
/* .slide {
  flex: 1;
  justify-content: center;
}
.slide img {
  width: 15vw;
} */
</style>