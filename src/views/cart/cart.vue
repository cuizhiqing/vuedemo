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
        <div class="cartadd" v-if="this.$store.state.shopcartlength">
          <div>{{$store.state.shopingaddress}}</div>|
          <div style="flex:2;" @click="bji=!bji" v-if="bji">编辑商品</div>
          <div style="flex:2;" @click="bji=!bji" v-if="!bji">完成</div>
        </div>

        <div v-if="!this.$store.state.userinfo.id">
          登录后可同步账户购物车中的商品
          <button @click="goprofile">登录</button>
        </div>

        <div>
          <img src="../../assets/img/shop.png" v-if="!this.$store.state.shopcartlength" alt />
          <div v-if="!this.$store.state.userinfo.id">登录后可同步账户购物车中的商品</div>
          <div
            v-if="this.$store.state.userinfo.id && !this.$store.state.shopcartlength"
          >购物车空空如也，去逛逛吧</div>
        </div>
      </div>

      <cartgoods
        v-for="(item,key,index) in $store.state.shopcart"
        :key="index"
        :shopname="key"
        :index="index"
        ref="cart_goods"
        @totalmoney="totalmoney"
        @ischeckshopall="is_check_shop_all"
      ></cartgoods>
      <!-- <div
       
      >
        <div class="shopname">
          <div style="text-align:left;padding:10px 0;">
            <span class="gou" @click="shopgou(index,key)"></span>

            <el-checkbox @click.native="shopgou(index,key)"  v-model='list.ischeck'></el-checkbox>
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

            <el-checkbox @click="checkobj(list,item)" :checked="list.ischeck=='1'" v-model='list.ischeck'></el-checkbox>
          </div>
          <div class="listimg">
            <img :src="$store.state.path+'/goods/'+list.img_cover" alt />
          </div>
          <div class="cardet" v-on:click="todetails('/details/'+list.goods_id)">
            <div>{{list.goods_name}}</div>
            <div class="norm-box" v-on:click.stop="selectnorm(list)" style="font-size:12px;">
              <p class="norm">
                <em
                  style="width: 90px;display: inline-block;white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
                >{{list.goods_name}}</em>
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
      </div>-->
    </scroll>

    <shopcartab
      v-if="this.$store.state.shopcartlength"
      @hhh="hhh"
      @totalmoney="totalmoney"
      :bji="bji"
      ref="tabBar"
      @confirm_goods="confirm_goods"
      @payment="payment"
    >{{this.$store.state.shopcartlength}}</shopcartab>
  </div>
</template>
<script>
import cartgoods from "./childcomp/cartgoods";
import navbar from "components/common/navbar/navbar";
import shopcartab from "components/content/maintabbar/shpcartab";
import scroll from "components/content/scroll/scroll";
import { updatashopcart } from "network/shopcar";
export default {
  name: "cart",
  components: {
    navbar,
    shopcartab,
    scroll,
    cartgoods,
  },
  data() {
    return {
      // ee: false,
      bji: true,
      paymentdataarr: [],
    };
  },
  //   如果用户存在，则网络请求getshopcat数据
  created() {
    if (
      this.$store.state.userinfo.id &&
      this.$store.state.shopcartlength == 0
    ) {
      this.getshopcart();
      // this.totalmoney();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.updatashopcart();
    next();
  },
  computed: {
    shopCartNameArr() {
      return this.$store.state.shopCartNameArr;
    },
  },
  methods: {
    selectnorm(data) {
      console.log(data);
    },
    pushrouper(path) {
      this.$router.push(path);
    },
    goprofile() {
      this.$router.push("/profile");
    },
    getshopcart() {
      this.$store.dispatch("getshopcart", this.$store.state.userinfo.id);
    },
    // -----------------------------------
    totalmoney() {
      this.$store.state.totalpayment = 0;
      this.$store.state.shopcargoodsnum = 0;
      for (var key in this.$store.state.shopcart) {
        for (var f = 0; f < this.$store.state.shopcart[key].length; f++) {
          if (this.$store.state.shopcart[key][f].ischeck == "1") {
            console.log(this.$store.state.shopcart);
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
    updatashopcart() {
      let shopcart = { ...this.$store.state.shopcart };
      let shopcarthistory = { ...this.$store.state.shopcarthistory };
      for (let i in shopcart) {
        for (let j = 0; j < shopcart[i].length; j++) {
          if (
            shopcart[i][j].ischeck != shopcarthistory[i][j].ischeck ||
            shopcart[i][j].num != shopcarthistory[i][j].num ||
            shopcart[i][j].norm != shopcarthistory[i][j].norm
          ) {
            let data = {};
            data.id = shopcart[i][j].id;
            data.num = shopcart[i][j].num;
            data.ischeck = shopcart[i][j].ischeck;
            data.norm = shopcart[i][j].norm;
            console.log(data);
            updatashopcart(data).then((res) => {
              console.log(res);
            });
          }
        }
      }
      console.log(this.paymentdataarr);
    },
    hhh(checked) {
      console.log(this.indexArr);
      console.log(this.$store.state.checkedCities);
      console.log(this.shopCartNameArr);
      this.$store.state.checkedCities = checked ? this.shopCartNameArr : [];
      this.$refs.cart_goods.forEach((item) => {
        let label = item.$el.querySelectorAll(".el-checkbox__label");
        var aaa = [];
        label.forEach((text) => {
          aaa.push(text.innerText);
        });
        if (checked) {
          item.indexArr = aaa;
        } else {
          item.indexArr = [];
        }
      });
      for (var key in this.$store.state.shopcart) {
        for (var f = 0; f < this.$store.state.shopcart[key].length; f++) {
          this.$store.state.shopcart[key][f].ischeck = Number(
            checked
          ).toString();
        }
      }

      this.totalmoney();
    },

    //是否是全选商品
    is_check_shop_all() {
      let cart_goods = this.$refs.cart_goods;
      let tabbar = this.$refs.tabBar;
      let allCheck = tabbar.$el.querySelector("input[type=checkbox]");
      let temp = 0;
      cart_goods.forEach((item) => {
        let shopNameCheck = item.$el.querySelector(
          ".shopname input[type=checkbox]"
        );
        if (shopNameCheck.checked) {
          temp++;
        }
      });
      if (temp == cart_goods.length) {
        alert("3");
        allCheck.checked = true;
      } else {
        allCheck.checked = false;
      }
    },
    confirm_goods() {
      // 找到购物车内需要做支付的商品是哪一个
      // 直接查找shopcart的ischeck=1，添加到data里边传递到confirm_order
      // let data = ["整个商品数据", "整个商品数据", "整个商品数据"];
      // this.$router.push("/confirmorder/" + data);
      let data = {};
      for (var key in this.$store.state.shopcart) {
        this.$store.state.shopcart[key].forEach((item) => {
          if (item.ischeck == 1) {
            if (data[key]) {
              data[key].push(item);
            } else {
              data[key] = [item];
            }
          }
        });
      }

      let flag = true;
      for (let i in data) {
        i;
        flag = false;
        break;
      }

      if (flag) return;
      data = JSON.stringify(data);
      this.$router.push("/confirmorder/" + data);
    },
    payment() {
      let arr = [];
      for (let i in this.$store.state.shopcart) {
        this.$store.state.shopcart[i].forEach((item) => {
          if (item.ischeck == "1") {
            arr.push(item);
          }
        });
      }
      this.$router.push("/confirmorder/" + JSON.stringify(arr));
    },
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
  .cartscroll {
    width: 100%;
    height: calc(100vh - 100px);
    overflow: hidden;
    float: left;
  }
}

// ----------------------------------
.el-checkbox__input.is-focus {
  .el-checkbox__inner {
    border-color: #dcdfe6;
  }
}
.el-checkbox__input.is-checked {
  .el-checkbox__inner {
    background-color: red;
    border-color: red;
  }
}
.el-checkbox__inner {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  &:after {
    top: 4px;
    left: 7px;
  }
}
</style>

