import { request } from './request'


export function get_jd_category_one(){
         return request({
                  url: '/vuedemo/get_jd_category_one',
                  params:{
                           // c1_id:1,
                  }
         })
}
export function get_jd_category_two(){
         return request({
                  url: '/vuedemo/get_jd_category_two',
                  params:{
                           // c1_id:1,
                  }
         })
}
export function get_jd_category_three(){
         return request({
                  url: '/vuedemo/get_jd_category_three',
                  params:{
                           // c1_id:1,
                           // c2_id:1,
                           // c3_name:'老人机',
                           // page:3,
                           // pagesize:500
                  }
         })
}
export function get_jd_category_max(){
         return request({
                  url: '/vuedemo/get_jd_category_max'
         })
}