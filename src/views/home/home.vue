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
    <scroll
      class="homecontent"
      ref="scrollcom"
      :probeType="3"
      @parentscroll="homescroll"
      @pullingUp="loadmore"
      :pull-up-load="true"
    >
      <homerotation :cbanners="banners" :intime="1000"></homerotation>
      <!-- <homefeature :cfeature="feature" iscopy="true"></homefeature> -->
      <homefeature :cfeature="feature"></homefeature>
      <!-- {{aaaa:num}} -->
      <!-- <aaa  :cbanners="banners"> </aaa>-->
      <hr />
      <div class="tabconent">
        <div class="tabtitle">
          <button @click="tabclick('recomend')">recomend</button>
          <button @click="tabclick('news')">news</button>
        </div>
        <div v-for="(item,key) in goods" :key="key">
          <ul v-if="tabcurrenttype==key">
            <li v-for="(i,index) in item.list" :key="index">
              <a href="javascript:;">
                <img :src="path+i.c3_img" alt />
                <span>{{i.c3_name}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <a class="totop" @click="homdetop" v-if="isshowbacktop">返回顶部</a>
  </div>
</template>
<script>
import navbar from "components/common/navbar/navbar.vue";
import scroll from "components/content/scroll/scroll";
import homerotation from "./childcomp/homeratation";
import homefeature from "./childcomp/homefeature";
// import aaa from "./childcomp/aaa";

import { getHomeBanner, getfeature, get_jd_category_max } from "network/home";

export default {
  name: "home",
  data() {
    return {
      banners: null,
      feature: [],
      aaaa: 100.1111,
      num: 100,
      isshowbacktop: false,
      goods: {
        recomend: {
          page: 2,
          list: []
        },
        news: {
          page: 10,
          list: []
        }
      },
      tabcurrenttype: "recomend",
      path: "http://106.12.85.17:8090/public/image/jd_category/"
    };
  },
  components: {
    navbar,
    homerotation,
    homefeature,
    scroll
    // aaa
  },
  created() {
    //vue实例在创建时的钩子参数
    // 页面在创建的时候我们需要请求数据
    this.getHomeBanner();
    this.getfeature();
    this.getgoodall("recomend");
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
    homescroll(position) {
      console.log(position);
      this.isshowbacktop = -position.y > 1000;
    },
    homdetop() {
      console.log("回到顶部");
      this.$refs.scrollcom.scrollTo(0, 0, 300);
    },
    getgoodall(type) {
      console.log(this.goods[type].list);
      let page = this.goods[type].page + 1;
      get_jd_category_max(page).then(res => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res);
        console.log(this.$refs.scrollcom.scroll);
        this.$refs.scrollcom.scroll.finishPullUp();
      });
    },
    loadmore() {
      this.getgoodall(this.tabcurrenttype);
    },
    tabclick(type) {
      this.tabcurrenttype = type;
      if(!this.goods[type].list.length){
        this.getgoodall(type)
      }
    }
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
  /* padding-top: 44px; */
  height: 100vh; /*把本身高度分成100分*/
  position: relative;
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
.homecontent {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.totop {
  position: absolute;
  bottom: 100px;
  right: 5px;
  background: red;
  /* display: none; */
}
.tabconent {
  display: flex;
 flex-wrap: wrap;
}
.tabconent .tabtitle{
  width: 100%;
  display: flex;
}
.tabconent .tabtitle button{
  flex:1;
  height: 40px;
}
.tabconent div {
  width: 100%;
}
.tabconent div ul {
  width: 100%;
}
.tabconent div ul li img {
  width: 30%;
  margin: 0 auto;
  display: block;
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

