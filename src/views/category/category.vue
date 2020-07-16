<template>
  <div id="category">
    <!-- <homefeature :cfeature="feature" ></homefeature> -->
    <!-- <ul class="one">
      <li v-for="item in jd_category_one" :key="item.c1_id">
        <button>{{item.c1_name}}</button>
      </li>
    </ul>-->

    <div class="one">
      <tabcontrol
        :controlid="tabcontrolid"
        :titlearr="jd_category_one"
        @tabclick="tabcontrolclick"
        ref="categorycontrol"
      >
        <!-- ref='categorycontrol'相当于对又定义了一个名字 -->
        <div :class="{active:controlindex=='hot'}" @click="tabcontrolclick('hot')">
          <span>热门推荐</span>
          <span>0</span>
        </div>
      </tabcontrol>
    </div>
    <div class="two">
      <div v-if="controlindex=='hot'">
        <h1>热门商品</h1>
        <dl v-if="shophistory.length">
          <dt>
            浏览记录
            <el-button type="text" @click="rmHistory">清空</el-button>
          </dt>
          <dd></dd>
        </dl>

        <dl v-for="(item,key) in secmenulist" :key="key">
          <dt>热门分类</dt>
          <dd v-for="(item,key) in secmenulist" :key="key">
            <img :src="path+item.c3_img" alt />
            <span>{{item.c3_name}}</span>
          </dd>
        </dl>
      </div>
      <div v-if="controlindex!='hot'">
        <dl v-for="(list,index) in secmenulist" :key="index">
          <dt>{{index}}</dt>
          <dd v-for="(item,key) in list" :key="key">
            <a :href="'/details/'+item">
              <img :src="path+item.c3_img" alt />
              <span>{{item.c3_name}}</span>
            </a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import tabcontrol from "components/content/tabcontroll/tabcontrol";
// import homefeature from "./childcomp/homefeature";
import {
  get_jd_category_one,
  get_jd_category_two,
  get_jd_category_three
} from "network/home";

export default {
  name: "category",
  data() {
    return {
      feature: [],
      // 动态定义组件名字
      tabcontrolid: "categorycontrol",
      jd_category_one: [],
      jd_category_two: [],
      jd_category_three: [],
      controlindex: "hot",
      path: "http://106.12.85.17:8090/public/image/jd_category/",
      secmenulist: null, //可能是数组也可能是对象
      shophistory: [1] //已经浏览的记录，在发生页面跳转后，在路由守卫中记录当前请求的数据，并在页面跳转前，存储到shophistory
    };
  },
  components: {
    // homefeature
    tabcontrol
  },
  created() {
    // this.getfeature()
    this.get_jd_category_one();
    this.get_jd_category_two();
    this.get_jd_category_three();
  },
  methods: {
    // 获取功能视图的数据
    // getfeature() {
    //   getfeature().then(res => {
    //     console.log(res);
    //     let arr = res;
    //     for (let i = 0; i < arr.length / 10; i++) {
    //       this.feature.push([]);
    //       console.log(i);
    //       for (let j = 0; j < arr.length; j++) {
    //         if (parseInt(j / 10) == i) {
    //           this.feature[i].push(arr[j]);
    //         }
    //       }
    //     }
    //     console.log(this.feature);
    //   });
    // },
    // 定义业务相关事件
    tabcontrolclick(index) {
      if (index == "hot") {
        this.secmenulist = [];
        // 循环遍历表3取出ishot==1的值存到secmenulist
        // 本身返回一个新数组
        this.secmenulist = [
          ...this.jd_category_three.filter(threelist => {
            if (threelist.c3_ishot == 1) {
              return true; //条件成立存到新数组
            }
            return false; //不成立不存
          })
        ];

        // var arr = this.jd_category_three.filter(threelist => {
        //   if (threelist.c3_ishot == 1) {
        //     return true; //条件成立存到新数组
        //   }
        //   return false; //不成立不存
        // });
        // this.secmenulist = [...arr]; //循环赋值
      } else {
        this.secmenulist = {};
        this.jd_category_two.forEach(twolist => {
          if (twolist.c1_id == index) {
            this.secmenulist[twolist.c2_name] = {};
            this.jd_category_three.forEach(threelist => {
              if (threelist.c2_id == twolist.c2_id) {
                this.secmenulist[twolist.c2_name][
                  threelist.c3_name
                ] = threelist;
              }
            });
          }
        });
      }
      console.log(this.secmenulist);
      // 传递进来的参数用于判断按钮是否被选中
      this.controlindex = index;
      console.log(index);
      // 回传数据给子组件/修改子组件的数据
      this.$refs.categorycontrol.itemindex = index;
    },
    rmHistory() {
      let that = this;
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.shophistory = [];
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 网络请求
    get_jd_category_one() {
      get_jd_category_one().then(res => {
        console.log(res);
        if (res) this.jd_category_one.push(...res);
      });
    },
    get_jd_category_two() {
      get_jd_category_two().then(res => {
        console.log(res);
        if (res) this.jd_category_two.push(...res);
      });
    },
    get_jd_category_three() {
      get_jd_category_three().then(res => {
        console.log(res);
        if (res) this.jd_category_three.push(...res);
        this.tabcontrolclick(this.controlindex);
      });
    }
  }
};
</script>
<style scoped>
#category {
  display: flex;
  font-size: 12px;
}
.one {
  flex: 1;
  background: #ddd;
}

.one li {
  width: 100%;
}
.one button {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
}
@media screen and (max-width: 768px) {
  .two {
    flex: 3;
    background: red;
  }
}
@media screen and (min-width: 768px) {
  .two {
    flex: 6;
    background: green;
  }
}
.active {
  color: red;
  background: #fff;
}
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

