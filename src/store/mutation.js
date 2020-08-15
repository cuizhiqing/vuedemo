import router from '../router'
import { postshopcar } from 'network/shopcar'
import { POST_SHOPCART } from './mutation-types'

import * as types from "./mutation-types"
export default {
        [types.BACK]() {
                router.go(-1)
        },
        // 要做的是网络请求---需要在actions中做分发监控，不然同步数据不会改变
        // 要把当前的事件在actions中进行执行
        [POST_SHOPCART](state, payload) {
                postshopcar(payload).then(res => {
                        if (res.code != 200) return console.log('请求数据失败')
                        state.shopcartlength = res.data.length
                        state.temp = res.data
                        state.totalpayment = 0;
                        res.data.forEach(item => {
                                // if (state.shopcart[item.shop_name]) {
                                //         state.shopcart[item.shop_name].push(item)
                                //         state.indexArr[item.shop_name].push(item.goods_id)
                                // } else {
                                //         state.shopcart[item.shop_name] = [item]
                                //         state.shopCartNameArr.push(item.shop_name);
                                //         state.indexArr[item.shop_name] = [item.goods_id]
                                // }

                                if (!state.shopcart[item.shop_name]) {
                                        state.shopcart[item.shop_name] = []
                                        state.shopcarthistory[item.shop_name] = []
                                        state.indexArr[item.shop_name] = []
                                        state.shopCartNameArr.push(item.shop_name)
                                }
                                let a = {}, b = {}
                                for (let i in item) {
                                        a[i] = item[i]
                                        b[i] = item[i]
                                }
                                state.shopcart[item.shop_name].push(a)
                                state.shopcarthistory[item.shop_name].push(b)
                                state.indexArr[item.shop_name].push(a.goods_id)


                                if (item.ischeck == "1") {
                                        state.totalpayment +=
                                                item.money_now * item.num;
                                        state.shopcargoodsnum += item.num
                                        state.paymentgoods.push(item)

                                        // if(state.paymentgoods[item.shop_name]){
                                        //         state.paymentgoods[item.shop_name].push(item)
                                        // }else{
                                        //         state.paymentgoods[item.shop_name]=[item]

                                        // }


                                }
                        })
                        console.log(state.shopcart)

                        for (let g in state.shopcart) {
                                let gg = 0
                                console.log(state.shopcart[g])
                                state.shopcart[g].forEach(item => {
                                        if (item.ischeck == '1') {
                                                gg++
                                        }
                                })
                                if (gg == state.shopcart[g].length) {
                                        state.checkedCities.push(g)
                                }
                        }
                        console.log(state.checkedCities)
                })

        }
}