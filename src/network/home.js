import { request } from './request'

export function getHomeBanner() {
         return request({
                  url: '/vuedemo/banner'
         })
}
// 导出一个获取功能视图的访问
export function getfeature() {
         return request({
                  url: '/vuedemo/feature',
                  params:{
                           show:1
                  }
         })
}
export function get_jd_category_one(){
         return request({
                  url: '/vuedemo/get_jd_category_one'
         })
}
export function get_jd_category_two(){
         return request({
                  url: '/vuedemo/get_jd_category_two'
         })
}
export function get_jd_category_three(){
         return request({
                  url: '/vuedemo/get_jd_category_three'
         })
}
export function get_jd_category_max(){
         return request({
                  url: '/vuedemo/get_jd_category_max'
         })
}