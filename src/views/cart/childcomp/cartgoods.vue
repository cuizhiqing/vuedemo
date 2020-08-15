<template>
  <div class="shopcarlist" ref="shopcarlist">
    <div class="shopname">
      <div style="text-align:left;padding:10px 0;">
        <!-- <span class="gou" @click="shopgou(index,key)"></span> -->

        <!-- <el-checkbox @change="shopgou()"></el-checkbox> -->
        <el-checkbox-group v-model="$store.state.checkedCities" @change="shopgou(index)">
          <el-checkbox :label="shopname" :key="shopname"></el-checkbox>
        </el-checkbox-group>

        <!-- <el-checkbox-group > -->
        <!-- <el-checkbox @change="shopgou"></el-checkbox> -->
        <!-- </el-checkbox-group> -->
        <!-- {{shopname}} -->
      </div>
    </div>
    <div v-for="(list,index) in goods" :key="index" class="shopcardet" ref="shopcardet">
      <div>
        <!-- <span class="gou" :class="list.ischeck=='1' ? 'gouactive':''" @click="checkobj(list,item)"></span> -->

        <!-- <el-checkbox @change="checkobj" :model="list.ischeck=='1'"></el-checkbox> -->
        <el-checkbox-group v-model="indexArr" @change="checkobj">
          <el-checkbox :label="list.goods_id"></el-checkbox>
        </el-checkbox-group>
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
            <strong v-on:click.stop="jj(list,'-',index)">-</strong>
            <input
              type="text"
              v-model="list.num"
              style="width:18px;height:18px;text-align:center;"
              v-on:click.stop
            />
            <strong v-on:click.stop="jj(list,'+',index)">+</strong>
          </div>
        </div>
        <div style="text-align:right;">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartgoods",
  data() {
    return {
      indexArr: [],
    };
  },
  props: {
    shopname: {
      type: String,
      default: "",
    },

    index: {
      type: Number,
      default: null,
    },
  },
  components: {},
  computed: {
    name() {
      return this.shopname;
    },
    goods() {
      return this.$store.state.shopcart[this.name];
    },
    shopCartNameArr() {
      return this.$store.state.shopCartNameArr;
    },
    paymentgoods() {
      return this.$store.state.paymentgoods;
    },
  },
  created() {
    this.goods.forEach(item=>{
      if(item.ischeck=='1'){
        this.indexArr.push(item.goods_id)
      }
    })
  },
  activated() {},
  deactivated() {},
  mounted() {
    
  },
  methods: {
    checkobj(val) {
      var e = e || event;
      if (val.length == this.goods.length) {
        this.$store.state.checkedCities.push(this.name);
      } else {
        let a = this.$store.state.checkedCities.indexOf(this.name);
        if (a != -1) {
          this.$store.state.checkedCities.splice(a, 1);
        }
      }

      this.$parent.$parent.$children[1].checkAll =
        this.$store.state.checkedCities.length === this.shopCartNameArr.length;
      console.log(this.$store.state.shopcart);







      let label = e.path[3].querySelector(".el-checkbox__label").innerText;
      this.goods.forEach((text) => {
        if (val.indexOf(label)!=-1 ) {
          text.ischeck='1';
        }else{
          text.ischeck='0';

        }
      });














      // let label = e.path[3].querySelector(".el-checkbox__label").innerText;
      // var hhh;
      // this.goods.forEach((text) => {
      //   if (a != -1) {
      //     arr.forEach((item) => {
      //       if (this.indexArr.indexOf(item.goods_id) == -1) {
      //         //添加选中
      //         this.indexArr.push(item.goods_id);
      //         //加支付总价
      //       }
      //       item.ischeck = "1";
      //     });
      //   } else {
      //     this.indexArr = [];
      //     arr.forEach((item) => {
      //       item.ischeck = "0";
      //     });
      //   }
      // });

      this.$emit("totalmoney");
    },

    shopgou(index) {
      this.indexArr = [];
      let a = this.$store.state.checkedCities.indexOf(
        this.shopCartNameArr[index]
      );
      let arr = this.$store.state.shopcart[this.shopCartNameArr[index]];

      if (a != -1) {
        arr.forEach((item) => {
          if (this.indexArr.indexOf(item.goods_id) == -1) {
            //添加选中
            this.indexArr.push(item.goods_id);
            //加支付总价
          }
          item.ischeck = "1";
        });
      } else {
        this.indexArr = [];
        arr.forEach((item) => {
          item.ischeck = "0";
        });
      }

      //当前的  checkedCities 的长度    里面的 值是被选中的
      this.$parent.$parent.$children[1].checkAll =
        this.$store.state.checkedCities.length === this.shopCartNameArr.length;

      // for (let j = 0; j < this.goods.length; j++) {
      //   if (this.$store.state.checkedCities.indexOf(this.name) != -1) {
      //     // alert("pp");
      //     if (this.paymentgoods.indexOf[this.goods[j]] != -1) {
      //       // alert("pp2");
      //       continue;
      //     }
      //     this.paymentgoods.push(this.goods[j]);
      //   } else {
      //     this.paymentgoods.splice(this.paymentgoods.indexOf[this.goods[j]], 1);
      //   }
      // }
      console.log(this.$store.state.indexArr);
      console.log(this.$store.state.checkedCities);
      console.log(this.$store.state.shopCartNameArr);
      console.log(this.indexArr);
      this.$emit("totalmoney");
    },

    jj(list, val, index) {
      var e = e || event;
      switch (val) {
        case "-":
          if (list.num > 1) {
            e.target.nextElementSibling.value = list.num * 1 - 1;
            list.num = list.num * 1 - 1;
          }
          break;
        case "+":
          e.target.previousElementSibling.value = list.num * 1 + 1;
          list.num = list.num * 1 + 1;
          break;
      }
      this.$store.state.shopcart[this.name][index].ischeck = "1";
      this.$emit("totalmoney");
    },

    todetails(path) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang='less'>
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
</style>
