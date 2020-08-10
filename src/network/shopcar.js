import { requestpost } from './request'

export function postshopcar(data="") {
         return requestpost({
                  url: '/vuedemo/get_shopcart',
                  data:{//post方式提交数据的时候，用data，get方式提交数据的时候，用params/query
                           user_id:data
                  }
         })
}