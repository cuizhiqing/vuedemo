<template>
  <div id="cart">
    <scroll ref="cartscroll" class="cartscroll">
      <navbar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">购物车</div>
        <div slot="right">
          <el-dropdown trigger="click" @command="pushrouper">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home">首页</el-dropdown-item>
              <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
              <el-dropdown-item command="/search">我的京东</el-dropdown-item>
              <el-dropdown-item command="/profile">浏览记录</el-dropdown-item>
              <el-dropdown-item command="/home">我的关注</el-dropdown-item>
              <el-dropdown-item command="/home">分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </navbar>

      <div class="cartcont">
        <div class="cartadd">
          <div>{{$store.state.shopingaddress}}</div>|
          <div style="flex:2;">编辑商品</div>
        </div>
        <div>
          登录后可同步账户购物车中的商品
          <button @click="goprofile">登录</button>
        </div>
      </div>
      {{this.$store.state.shopcartlength}}
      <div
        class="shopcarlist"
        v-for="(item,key,index) in $store.state.shopcart"
        :key="index"
        ref="shopcarlist"
      >
        <div class="shopname">
          <div style="text-align:left;padding:10px 0;">
            <span class="gou" @click="shopgou(index,key)"></span>
            {{key}}
          </div>
        </div>
        <div v-for="(list,index) in item" :key="index" class="shopcardet" ref="shopcardet">
          <div>
            <span
              class="gou"
              :class="list.ischeck=='1' ? 'gouactive':''"
              @click="checkobj(list,item)"
            ></span>
          </div>
          <div class="listimg">
            <img :src="$store.state.path+'/goods/'+list.img_cover" alt />
          </div>
          <div class="cardet" v-on:click="todetails('/details/'+list.goods_id)">
            <div>{{list.goods_name}}</div>
            <div class="norm-box" v-on:click.stop="selectnorm(list)" style="font-size:12px;">
              <p class="norm">
                <em style="width: 90px;display: inline-block;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{list.goods_name}}</em>
                <span>
                  ,选服务
                  <i class="el-icon-arrow-down"></i>
                </span>
              </p>
            </div>

            <div>
              <span>{{list.money_now}}</span>
              <div>
                <strong v-on:click.stop="jj(list,'-')">-</strong>
                <input
                  type="text"
                  v-model="list.num"
                  style="width:18px;height:18px;text-align:center;"
                  v-on:click.stop
                />
                <strong v-on:click.stop="jj(list,'+')">+</strong>
              </div>
            </div>
            <div style="text-align:right;">删除</div>
          </div>
        </div>
      </div>
    </scroll>
    <shopcartab @hhh="hhh" :ee="ee" @totalmoney="totalmoney"></shopcartab>
  </div>
</template>
<script>
import navbar from "components/common/navbar/navbar";
import shopcartab from "components/content/maintabbar/shpcartab";
import scroll from "components/content/scroll/scroll";
export default {
  name: "cart",
  components: {
    navbar,
    shopcartab,
    scroll,
  },
  data() {
    return {
      ee: false,
    };
  },
  //   如果用户存在，则网络请求getshopcat数据
  created() {
    if (this.$store.state.userinfo && this.$store.state.shopcartlength == 0) {
      this.getshopcart();
      this.totalmoney();
    }
  },
  computed: {},
  methods: {
    selectnorm(data){
      console.log(data)
    },
    pushrouper(path) {
      this.$router.push(path);
    },
    goprofile() {
      this.$router.push("/profile");
    },
    getshopcart() {
      this.$store.dispatch("getshopcart", this.$store.state.userinfo);
    },
    checkobj(list, item) {
      let e = e || event;
      list.ischeck = list.ischeck == "1" ? "0" : "1";
      var dd = 0,
        io;
      item.forEach((list) => {
        if (list.ischeck == "1") dd++;
      });
      if (dd == item.length) {
        io = "gou gouactive";
      } else {
        io = "gou";
      }
      e.target.parentNode.parentNode.parentNode.querySelector(
        ".shopname .gou"
      ).className = io;
      this.totalmoney();
    },
    totalmoney() {
      this.$store.state.totalpayment = 0;
      this.$store.state.shopcargoodsnum = 0;
      console.log(this.$store.state.shopcart);
      for (var key in this.$store.state.shopcart) {
        for (var f = 0; f < this.$store.state.shopcart[key].length; f++) {
          if (this.$store.state.shopcart[key][f].ischeck == "1") {
            this.$store.state.totalpayment +=
              this.$store.state.shopcart[key][f].money_now *
              this.$store.state.shopcart[key][f].num;
            this.$store.state.shopcargoodsnum += this.$store.state.shopcart[
              key
            ][f].num;
          }
        }
      }
    },
    shopgou(index, key) {
      let e = e || event;

    
      // let box = this.$refs.shopcarlist;
      // let btnall = box[index].querySelectorAll(".gou");
     
      var obj = {};
      obj =
        e.target.className == "gou"
          ? { tt: 1, cname: "gouactive gou" }
          : { tt: 0, cname: "gou" };
      e.target.className = obj.cname;
      var fo = 0;
      this.$store.state.shopcart[key].forEach((item) => {
        item.ischeck = obj.tt;
        if (item.ischeck == "0") fo++;
      });
      if (fo.length == this.$store.state.shopcartlength) {
        this.ee = true;
      } else {
        this.ee = false;
      }
      this.totalmoney();
      // let temp = -1;
      // if (e.target.checked) {
      //   temp = 1;
      // }
      // for (let i = 0; i < btnall.length; i++) {
      //   // 如果当前商品复选框的checked为true，并且店铺复选框也为true，则跳过当前循环，执行下一次循环，因为如果当前商品是选中的状态，那么支付总价是不需要增加价钱的
      //   if (btnall[i].checked && e.target.checked) {
      //     continue;
      //   }
      //   this.$store.state.totalpayment +=
      //     this.goods[i].money_now * this.goods[i].num * temp;
      //   this.$store.state.totalnum += this.goods[i].num * temp;
      //   btnall[i].checked = e.target.checked;
      //   this.goods[i].ischeck = Number(e.target.checked).toString();
      // }
    },
    hhh(ee) {
      var ff = !ee ? { tt: "1", ll: "gou gouactive" } : { tt: "0", ll: "gou" };
      this.$refs.shopcarlist.forEach((item) => {
        item.querySelectorAll(".shopname").forEach((list) => {
          list.querySelector(".gou").className = ff.ll;
        });
      });
      for (var key in this.$store.state.shopcart) {
        for (var f = 0; f < this.$store.state.shopcart[key].length; f++) {
          this.$store.state.shopcart[key][f].ischeck = ff.tt;
        }
      }
    },
    jj(list, val) {
      switch (val) {
        case "-":
          if (list.num > 1) {
            list.num = list.num * 1 - 1;
          }
          console.log(list);
          break;
        case "+":
          list.num = list.num * 1 + 1;
          break;
      }
      this.totalmoney();
    },
    todetails(path){
      this.$router.push(path)
    }
  },
};
</script>
<style lang='less'>
#cart {
  background: #ddd;
  overflow: hidden;
  .content > div {
    background: white;
  }
  .cartcont {
    border-top: 1px solid #ddd;
    margin-bottom: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    > div {
      padding: 10px 0;
    }
    .cartadd {
      display: flex;
      padding-left: 18px;
      > div:first-child {
        flex: 4;
        text-align: left;
      }
      > div:last-child {
        flex: 2;
      }
    }
  }
  .shopcarlist {
    padding: 0 15px 0 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    .shopcardet {
      padding: 10px 0 10px 5px;
      display: flex;
      flex-wrap: wrap;
      &:not(:last-child) {
        border-bottom: 1px solid #ddd;
      }
      > div {
        float: left;
      }
      > div:nth-child(3) {
        flex: 1;
      }
      .listimg {
        // flex:2;
        width: 86px;
        height: 86px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cardet {
        > div:nth-child(3) {
          overflow: hidden;
          span {
            float: left;
          }
          > div {
            float: right;
          }
          strong {
            width: 16px;
            height: 16px;
            text-align: center;
            :nth-child(2) {
              padding: 0 3px;
            }
          }
        }
      }
    }
    .gou {
      margin-top: 100%;
      margin-left: 0;
    }
    .shopname .gou {
      margin-top: 0;
    }
  }
}

.cartscroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  float: left;
}
</style>

