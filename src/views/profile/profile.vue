<template>
  <div id="login">
    <scroll ref="loginscroll" class="loginscroll">
      <navbar>
        <div slot="left" @click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center" class="tab-center">我的京东</div>
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
      <div class="usermsg">
        <div class="user_bj">
          <div class="settinguser">
            <i class="el-icon-setting"></i> 账户设置
          </div>
          <div class="user_bj_msg">
            <img src="~/assets/img/tx.png" alt />
            <div>
              <div class="user_bj_msg_user">
                <span>jd_15934</span>
                <img src="~/assets/img/qm.png" alt />
                <div class="iconjd">
                  <span>银牌</span>
                </div>
              </div>
              <div>用户名</div>
              <div></div>
            </div>
          </div>
          <div class="vip_wg">
            <div>
              PLUS | 尊享会员特权
            </div>
            <div>
              立即查看
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <myjd :arr1="arr1"></myjd>
      <myjd :arr1="arr2"></myjd>

      <myjd :arr1="arr3"></myjd>

      <!-- <myjd :arr1="arr4" class="arr4"></myjd> -->

      <div></div>
    </scroll>
  </div>
</template>

<script>
import myjd from "components/content/maintabbar/myjd.vue";
import navbar from "components/common/navbar/navbar";
import scroll from "components/content/scroll/scroll";
export default {
  name: "login",
  data() {
    return {
      arr1: [
        { icon: "myjd11.png", title: "代付款" },
        { icon: "myjd12.png", title: "待收货" },
        { icon: "myjd13.png", title: "退换/售后" },
        { icon: "myjd14.png", title: "全部订单" },
      ],
      arr2: [
        { icon: "myjd11.png", title: "京东卷" },
        { icon: "myjd12.png", title: "白条" },
        { icon: "myjd13.png", title: "金豆" },
        { icon: "myjd14.png", title: "红包" },
        { icon: "myjd14.png", title: "我的资产" },
      ],
      arr3: [
        { icon: "myjd11.png", title: "商品收藏" },
        { icon: "myjd12.png", title: "店铺收藏" },
        { icon: "myjd13.png", title: "我的足迹" },
      ],
      arr4: [
        { icon: "myjd11.png", title: "我的预约" },
        { icon: "myjd12.png", title: "高价回收" },
        { icon: "myjd13.png", title: "京东火车票" },
        { icon: "myjd14.png", title: "应用推荐" },
        { icon: "myjd14.png", title: "京东机票" },
        { icon: "myjd14.png", title: "京东酒店" },
        { icon: "myjd14.png", title: "闲置换钱" },
      ],
    };
  },
  components: {
    navbar,
    scroll,
    myjd,
  },
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    pushrouper(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang='less' scoped>
#login {
  background: #ddd;
  overflow: hidden;
  .content > div {
    background: white;
    &:not(:nth-child(1)) {
      margin-bottom: 20px;
    }
  }
  .usermsg {
    background: #ddd !important;
    .user_bj {
      height: 100%;
      padding: 0 14px;
      border-bottom-right-radius: 300px 20px;
      border-bottom-left-radius: 300px 20px;
      box-shadow: 0 2px 4px rgba(228, 57, 60, 0.4);
      background: -webkit-linear-gradient(left, #eb3c3c, #ff7459);
      .user_bj_msg {
        display: flex;
        flex-wrap: wrap;
        > div {
          text-align: left;
          flex: 5;
        }
        > img {
          width: 60px;
          height: 60px;
          margin-right: 14px;
        }
        .user_bj_msg_user {
          > img {
            width: 12px;
            height: 12px;
            margin: 0 5px;
          }
          .iconjd {
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.5);
            display: inline-block;
            height: 16px;
            font-size: 12px;
            color: white;
            vertical-align: middle;
            margin-top: -3px;
            padding-right: 5px;
            &:before {
              width: 20px;
              height: 20px;
              margin-top: -2px;
              background: url(../../assets/img/icon_vip.png) no-repeat -40px 0;
              background-size: 100px 20px;
              float: left;
              content: "";
              margin-left: -2px;
            }
          }
        }
      }
      .vip_wg {
        height: 37px;
        background: url(../../assets/img/vip_wg.png) no-repeat;
        background-size: 100% 67px;
        border-bottom-right-radius: 300px 16px;
        border-bottom-left-radius: 300px 16px;
        color: rgba(255,230,120);
        font-size: 12px;
        margin-top: 10px;
        > div {
          padding: 10px 10px;
          float: left;
          &:nth-child(2){
              float: right;
          }
        }
      }
      .settinguser {
        font-size: 14px;
        padding-top: 10px;
        text-align: right;
      }
    }
  }
}
.cartscroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  float: left;
  width: 100%;
}
#login #bar {
  position: relative;
}
// #login .arr4 .bar-item {
//          width: 25%;
// }
</style>



