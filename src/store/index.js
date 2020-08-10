import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './actions'


Vue.use(Vuex)

const state = {
         path: "http://106.12.85.17:8090/public/image",
         tabbar: {
                  is_jd_tabbar: true,
                  is_jx_tabbar: false,
         },
         userinfo: 1,
         shopcart: {
                  // jd: [],
                  // shop1: [],
                  // shop2: [],
                  // shop3: []
         },
         loginris: "",//进入login的记录
         shopcartlength: 0,
         temp: null,
         shopingaddress:'山西省晋城市阳城县',
         city:null,
         sknavigation:null,
         totalpayment:0,//支付总价
         totalnum:0,//支付数量
         shopcarmoneyall:0,//购物车所有商品价格总和
         shopcargoodsnum:0,//购物车所有商品总数量


}

const x = new Vuex.Store({
         state,
         mutations,
         actions
})

export default x