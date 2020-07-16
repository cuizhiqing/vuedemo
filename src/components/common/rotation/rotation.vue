<template>
  <div :id="divid">
    <!-- 放图片 -->
    <div class="ratation" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
      <slot></slot>
    </div>
    <!-- 左右按钮，如果需要的时候，给插槽内放置左右按钮即可 -->
    <div class="icator"  v-if="showicator && slidecount>1">
      <slot name="icator"></slot>
    </div>
    <!-- 放小圆点，索引指示器 -->
    <div class="indexIctor" v-if="showiiactord && slidecount>1">
      <slot name="indicator">
        <div v-for="(item,index) in slidecount" :key="index" class="round-item" :class="{active:index===currentindex-1}">

        </div>
      </slot>
    </div>
  </div>
  
</template>
<script>
// 轮播图的实际操作事件，要在当前的rotation组件中创建
export default {
  name: "rotation",
  // 因为我们是封装了一个轮播图，有些特定的值可能需要修改，所以我们需要动态的设定
  props: {
    interval: {
      type: Number,
      default: 3000 //轮播动画的时间，假设3秒一次
    },
    movebase: {
      type: Number,
      default: 0.3 //移动基数
    },
    showiiactord:{
      type:Boolean,
      default:true
    },
     showicator:{
      type:Boolean,
      default:false
    },
    divid:{
      type:String,
      default:"divid"
    }
  },
  data() {
    return {
      slidecount: 0, //轮播图片的个数
      totalwidth: 0, //获取rotation的宽度,一张图片盒子的宽度
      currentindex: 1, //当前的图片下标
      rotationstyle: {}, //因为要存储的transfoom有兼容问题，所以要存多个
      animationduration: 300, //定义动画时间为3hs
      scrolling: false, //轮播图是否在滚动
      playtimer: null, //接收定时器，用于定时器关闭
      startx: 0, //拖拽时的起始坐标点
      currentx: 0, //移动后的坐标点
      distance: 0, //接受两点的距离
    };
  },
  mounted() {
    // 页面渲染结束挂载页面获取
    setTimeout(() => {
      this.handledom(this.divid);
      this.starttimer();
    }, 500);
  },
  methods: {
    // 操作dom
    handledom(id) {
      let divid=document.querySelector(`#${id}`)
      divid.style.overflow='hidden';
      divid.style.backgrounf='red';
      divid.style.position='relative';
      // 只能获取页面的第一个，组件复用的问题
      let rotationel = document.querySelector(`#${id} .ratation`);
      let slideel = rotationel.querySelectorAll(".slide");
      console.log(slideel);
      // 保存个数
      this.slidecount = slideel.length;
      // 如果图片的数量大于1，执行下面操作
      if (this.slidecount > 1) {
        let clionefirst = slideel[0].cloneNode(true);
        // 克隆最后一张图
        let clionelast = slideel[slideel.length - 1].cloneNode(true);
        // 把克隆的第一张体放在图片的末尾
        rotationel.appendChild(clionefirst);
        // 把克隆的最后一张图放在图片的末尾
        rotationel.insertBefore(clionelast, slideel[0]);
        this.totalwidth = rotationel.offsetWidth;
        // 把当前元素的样式给rotationstyle   对象赋值，两个对象用了同一地址
        this.rotationstyle = rotationel.style;
      }
      this.settransform(-this.totalwidth);
    },
    // 设置图片滚动的位置,相当于定义样式，图片的每次移动都需要样式的执行，把样式存储在data数据中
    settransform(position) {
      // console.log(`${position}`);
      // this.rotationstyle.transform='translateX('+position+'px)'
      this.rotationstyle.transform = `translateX(${position}px)`;
      this.rotationstyle["-webkit-transform"] =
        "translateX(" + position + "px)";
      this.rotationstyle["-ms-transform"] = "translateX(" + position + "px)";
    },
    // 设置轮播开始定时器
    starttimer() {
      this.playtimer = setInterval(() => {
        this.currentindex++;
        this.scrollposition(-this.totalwidth * this.currentindex);
      }, this.interval);
    },
    // 移动正确位置
    scrollposition(currentposition) {
      this.scrolling = true;
      this.rotationstyle.transition =
        "transform " + this.animationduration + "ms";
      this.settransform(currentposition);
      this.checkposition();
      this.scrolling = false;
    },
    stoptimer() {
      clearInterval(this.playtimer);
    },
    // 判断当前图片的位置(矫正位置)
    checkposition() {
      setTimeout(() => {
        // 把动画时间设置为0，瞬间转换图片
        this.rotationstyle.transition = "0ms";
        if (this.currentindex >= this.slidecount + 1) {
          this.currentindex = 1;
        } else if (this.currentindex <= 0) {
          this.currentindex = this.slidecount;
        }
        this.settransform(-this.totalwidth * this.currentindex);
      }, this.animationduration);
    },
    // 拖拽事件
    // 在拖拽轮播图的时候，当当前轮播正在执行移动时，是不允许拖拽的，所以在轮播动画执行时，需要禁止拖拽
    // 开始拖拽
    touchstart(e) {
      if (this.scrolling) return;
      // 获取当前用户拖拽按下点的x坐标
      this.startx = e.touches[0].pageX;
      // 停止定时器
      this.stoptimer();
    },
    touchmove(e) {
      this.currentx = e.touches[0].pageX;
      // 获取移动前和移动后的距离差
      this.distance = this.currentx - this.startx;
      // 获取一下在手动移动前的图片位置
      let currentposition = -this.totalwidth * this.currentindex;
      console.log(currentposition);
      // 需要移动的距离
      let movedistance = this.distance + currentposition;
      console.log(movedistance);
      // 把当前移动后的值设置给settransform
      this.settransform(movedistance);
      // 当设置结束后，鼠标停止移动时，执行下一步的过度
    },
    touchend() {
      // 获取移动的距离  取正数
      let currentmove = Math.abs(this.distance);
      // 判断最终的距离
      if (this.distance == 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentmove > this.totalwidth * this.movebase
      ) {
        //currentx-startx>0 向右移动图片图片--
        this.currentindex--;
      } else if (
        this.distance < 0 &&
        currentmove > this.totalwidth * this.movebase
      ) {
        // currentx-startx<0向左移动图片图片++
        this.currentindex++;
      }

      this.scrollposition(-this.totalwidth * this.currentindex);

      // 开启定时器
      this.starttimer();
    }
  }
};
</script>
<style>
/* #rotationbox {
  overflow: hidden;
  background: red;
  position: relative;
} */
.ratation {
  display: flex;
}
.indexIctor{
  position: absolute;
  width: 100%;
  justify-content: center;
bottom: 20px;
display: flex;
}
.round-item{
  width: 10px;
  height: 10px;
  border-radius: 5px;
  line-height: 10px;
  background: #fff;
  font-size: 10px;
  color: red;
  margin: 0 5px;
}
.round-item.active{
  background:red;
}
</style>
