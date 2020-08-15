<template>
  <div class="pay">
    <navbar>
      <div slot="left" @click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center" class="tab-center">京东收银台</div>
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
    <div style="border-top:1px solid #ddd;line-height:50px;">{{moneyall}}</div>
    <scroll ref="payscroll" class="payscroll">
      <div class="p" style="border-top-left-radius:10px;border-top-right-radius:10px;">
        <div></div>
      </div>
      <div style="text-align:left;" class="catepay">
        <div>
          <img
            src="../../assets/img/pay2.png"
            style="width: 24px;
    height: 24px;margin-right:8px;"
            alt
          />
          <span style="flex:5;">打白条</span>
          <el-radio v-model="radio" label="开通白条并支付"></el-radio>
        </div>

        <div>
          <span style="flex:1">分期方式</span>
          <span style="flex:1;text-align:right;">应还总额</span>
        </div>
        <!-- <ul>
          <li>不分期</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>-->
        <div>
          <img
            src="../../assets/img/pay3.png"
            style="width: 24px;
    height: 24px;margin-right:8px;"
            alt
          />
          <span style="flex:5;">使用新卡支付</span>
          <el-radio v-model="radio" label="使用新卡支付"></el-radio>
        </div>

        <div>
          <img
            src="../../assets/img/pay4.png"
            style="width: 24px;
    height: 24px;margin-right:8px;"
            alt
          />
          <div
            style="flex:5;display:flex;margin-right:-18px;flex-wrap:wrap;border-bottom:1px solid #ddd;"
          >
            <span style="flex:5">
              <div>京东小金库</div>
              <div style="padding-bottom:8px;">请设置数字支付密码后使用</div>
            </span>
            <el-radio v-model="radio" label="" style="margin-right:18px;"></el-radio>
          </div>
        </div>

        <div>
          <div style="flex:1"></div>
          <span style="flex:5">全部付款方式</span>
          <div>
            查看
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <div>
          <img
            src="../../assets/img/wchat.png"
            style="width: 24px;
    height: 24px;margin-right:8px;float:left;background-size:100%;"
            alt
          />
          <!-- <div
            style="flex:5;display:flex;margin-right:-18px;flex-wrap:wrap;"
          > -->
            <span style="flex:5">
              <div>微信支付方式</div>
              <div style="padding-bottom:8px;">仅安装微信6.0.2及以上版本客户端使用</div>
            </span>
            <el-radio v-model="radio" label="微信支付"></el-radio>
          <!-- </div> -->
        </div>
      </div>
    </scroll>
    <div class="paybar">
      <el-button type="danger" round style="width:90%;margin-top:10px;">{{radio}}￥{{moneyall}}</el-button>
    </div>
  </div>
</template>

<script>
import navbar from "components/common/navbar/navbar";
import scroll from "components/content/scroll/scroll";
import { getorderbyorderid } from "network/order";
export default {
  name: "pay",
  data() {
    return {
      goods: {},
      order_id: null,
      moneyall: 0,
      radio: "开通白条并支付",
    };
  },
  components: {
    navbar,
    scroll,
  },
  created() {
    this.order_id = this.$route.params.orderid;
    console.log(this.$route);
    this.getpathmentorder();
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    getpathmentorder() {
      getorderbyorderid(this.order_id).then((res) => {
        if (res.code != 200) {
          // 弹出对话框---获取订单数据失败
          // 跳转页面
          // this.$router.push('/profile')
        }
        this.goods = res.data;
        this.goods.forEach((item) => {
          this.moneyall += item.money_now * item.num;
        });
        console.log(this.goods);
      });
    },

    pushrouper(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang='less'>
.pay {
  .catepay {
    font-size: 14px;
    text-align: left;
    padding: 0 18px;
    > div {
      margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .p {
    width: 100%;
    background: linear-gradient(90deg, #fef5f4 0, #fef0ef 100%);
    div {
      background: url("../../assets/img/pay1.png") no-repeat;
      height: 61px;
      margin: 0;
      background-size: 95px 24px;
      background-position: 18px center;
    }
  }

  .paybar {
    position: fixed;
    bottom: 0;
    height: 60px;
    background: white;
    width: 100%;
  }
}
.el-radio__label{
  display:none;
}
.el-radio__input.is-checked .el-radio__inner{
  border:none;
  background:red;
}
.el-radio__inner{
  width:20px;
  height:20px;
  &:after{
    width:0;
    height:0;
    left: 10%;
    top: 0;
    color:white;
    font-size:20px;
    
  content:"√";
}
}
</style>
