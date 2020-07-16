<template>
  <div :id="divid">
    <!-- feature -->
    <div class="feature" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <slot></slot>
    </div>
    <!-- 小按钮 -->
    <div>小按钮</div>
  </div>
</template>
<script>
export default {
  name: "feature",
  props: {
    divid: {
      type: String,
      default:"featurebox"
    },
    iscopy: {
      //是否允许复制
      type: Boolean,
      default: false
    }
  },
  data() {  
    return {
      itemlength: 0,
      featurewidth: 0,
      featurestyle: {},
      scrolling: false,
      startx: 0,
      currentx: 0,
      distance: 0,
      currentindex: 0,
      movebase: 0.3,
      animationduration: 300
    };
  },
  methods: {
    handledom(id) {
      let divel = document.querySelector(`#${id}`);
      divel.style.position = "relative";
      divel.style.overflow = "hidden";
      let featureel = document.querySelector(`#${id} .feature`);
      let itemels = featureel.querySelectorAll(".feature-item");
      //  更具传递的参数，判断是否需要赋值子对象
      if (this.iscopy && itemels.length > 1) {
        let clonefirst = itemels[0].cloneNode(true);
        // 克隆最后一张图
        let clonelast = itemels[itemels.length - 1].cloneNode(true);
        // 把克隆的第一张图插入图片的末尾
        featureel.appendChild(clonefirst);
        // 把克隆的最后一张图插入到图片的最前端
        featureel.insertBefore(clonelast, itemels[0]);
        this.currentindex=1;
      }

      this.itemlength = itemels.length;

      this.featurewidth = featureel.offsetWidth;
      console.log(divel);
      console.log(featureel);
      this.featurestyle = featureel.style;
      this.setransform(this.currentindex * -this.featurewidth);
    },
    setransform(position) {
      this.featurestyle.transform = `translateX(${position}px)`;
      this.featurestyle["-webkit-transform"] = "translateX(" + position + "px)";
      this.featurestyle["-ms-transform"] = "translateX(" + position + "px)";
    },
    scrollposition(currentposition) {
      this.scrolling = true;
      this.featurestyle.transition =
        "transform" + this.animationduration + "ms";
      this.setransform(currentposition);
      if(this.iscopy) {
        this.checkposition();
      }
 
      this.scrolling = false;
    },
     // 判断当前图片的位置(矫正位置)
    checkposition() {
      setTimeout(() => {
        // 把动画时间设置为0，瞬间转换图片
        this.featurestyle.transition = "0ms";
        console.log(this.itemlength + 1,this.currentindex)
        if (this.currentindex >= this.itemlength + 1) {
          console.log('111');
          this.currentindex = 1;
        } else if (this.currentindex <= 0) {
          this.currentindex = this.itemlength;
        }
        this.setransform(-this.featurewidth * this.currentindex);
      }, this.animationduration);
    },
    touchstart(e) {
      console.log("touchstart");
      if (this.scrolling) return;
      // 获取当前用户拖拽按下点的x坐标
      this.startx = e.touches[0].pageX;
    },
    touchmove(e) {
      this.currentx = e.touches[0].pageX;
      // 获取移动前和移动后的距离差
      this.distance = this.currentx - this.startx;
        console.log(this.currenindex);

      // 防止过度的拖拽
      if (!this.iscopy) {
        console.log("copy");
        console.log(this.currentindex);
        console.log(this.distance,this.distance  <= -this.featurewidth)
        if (
          (this.distance > 0 && this.currentindex == 0) ||
          this.distance  <= -this.featurewidth
        ) {
          console.log("copyreturn");
          return;
        }
        if (
          (this.distance < 0 && this.currentindex == 1) ||
          this.distance >= this.featurewidth
        ) {
          return;
        }
      }

      // 获取一下在手动移动前的图片位置
      let currentposition = -this.featurewidth * this.currentindex;

      // 需要移动的距离
      let movedistance = this.distance + currentposition;

      // 把当前移动后的值设置给settransform
      this.setransform(movedistance);
      // 当设置结束后，鼠标停止移动时，执行下一步的过度
    },
    touchend() {
      // 获取移动的距离  取正数
      let currentmove = Math.abs(this.distance);
      // 判断最终的距离
      //  if (this.distance == 0) {
      //     return;
      //   } else if (
      //     this.distance > 0 &&
      //     currentmove > this.featurewidth * this.movebase &&
      //     this.currentindex != 0
      //   ) {
      //     //第一页不能像做滑动
      //     this.currentindex--;
      //   } else if (
      //     this.distance < 0 &&
      //     currentmove > this.featurewidth * this.movebase &&
      //     this.currentindex !=this.itemlength-1
      //   ) {
      //     //第二页不能像右边滑动
      //     console.log("++");
      //     this.currentindex++;
      //   }
      if (this.iscopy) {
        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentmove > this.featurewidth * this.movebase
        ) {
          //第一页不能像做滑动
          this.currentindex--;
        } else if (
          this.distance < 0 &&
          currentmove > this.featurewidth * this.movebase
        ) {
          //第二页不能像右边滑动
          console.log("++");
          this.currentindex++;
        }
      } else {
        console.log("false");
        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentmove > this.featurewidth * this.movebase &&
          this.currentindex == 1
        ) {
          //第一页不能像做滑动
          this.currentindex--;
        } else if (
          this.distance < 0 &&
          currentmove > this.featurewidth * this.movebase &&
          this.currentindex == 0
        ) {

          //第二页不能像右边滑动
          this.currentindex++;
        }
      }
      console.log(this.currentindex);
      this.scrollposition(-this.featurewidth * this.currentindex);
    }
  },
  mounted() {
    setTimeout(() => {
      this.handledom(this.divid);
    }, 500);
  }
};
</script>

<style scoped>
#featurebox {
  position: relative;
  overflow: hidden;
}
.feature {
  display: flex;
  width: 100vw;
}
</style>
