<template>
  <div id="home">
    <navbar class="home-nav-bar">
      <div slot="left">&lt;</div>
      <div slot="center">
        <input type="search" name placeholder="衣服" id />
      </div>
      <div slot="right">登录</div>
    </navbar>
    <hr />
    <!-- <ul class="banner">
      <li v-for="(item,index) in banners" :key="index">
        <img :src="path+item.crs" alt />
      </li>
    </ul>-->

    <homerotation :cbanners="banners" :intime="1000"></homerotation>
    <!-- <homefeature :cfeature="feature" iscopy="true"></homefeature> -->
    <homefeature :cfeature="feature"></homefeature>
    <!-- {{aaaa:num}} -->

    <!-- <aaa  :cbanners="banners">
    </aaa>-->



  </div>
</template>
<script>
import navbar from "components/common/navbar/navbar.vue";
import homerotation from "./childcomp/homeratation";
import homefeature from "./childcomp/homefeature";
// import aaa from "./childcomp/aaa";

import {getHomeBanner,getfeature} from "network/home";

export default {
  name: "home",
  data() {
    return {
      banners: null,
      feature: [],
      aaaa: 100.1111,
      // path: "http://106.12.85.17:9091/public/image/banner/"
    };
  },
  components: {
    navbar,
    homerotation,
    homefeature
    // aaa
  },
  created() {
    //vue实例在创建时的钩子参数
    // 页面在创建的时候我们需要请求数据
    this.getHomeBanner();
    this.getfeature();
    // var arr[1,2,3,4,500].filterfeature(100)
    
  },
  methods: {
    getHomeBanner() {
      getHomeBanner().then(res => {
        console.log(res);
        this.banners = res;
        console.log(this.banners);
        // this.banners = {...res};//数组的解构赋值，三个点代表结构赋值，取出数组的每一个值
      });
    },
    // 获取功能视图的数据
    getfeature() {
      getfeature().then(res => {
        console.log(res);
        let arr = res;
        for (let i = 0; i < arr.length / 10; i++) {
          this.feature.push([]);
          console.log(i);
          for (let j = 0; j < arr.length; j++) {
            if (parseInt(j / 10) == i) {
              this.feature[i].push(arr[j]);
            }
          }
        }
        console.log(this.feature);
      });
    },
    
  },
  filter: {
    // filterfeature(data,i){
    //   console.log(data,i);
    // },
    num(data) {
      return "$" + data;
    }
  }
};
</script>
<style>
#home {
  padding-top: 44px;
  height: 100vh; /*把本身高度分成100分*/
}
#home .home-nav-bar {
  background: #e43130;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
/* #home .banner {
  padding: 0;
  margin: 0;
  width: 98vw;
  padding: 0 1vw;
}
#home .banner li{
  list-style: none;
}
#home .banner img {
  width:98vw;
} */
</style>

