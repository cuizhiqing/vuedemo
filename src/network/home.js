import { request } from './request'

export function getHomeBanner() {
         return request({
                  url: '/vuedemo/banner'
         })
}
// 导出一个获取功能视图的访问
export function getfeature() {
         return request({
                  url: '/vuedemo/jd_feature',
                  params:{
                           show:1
                  }
         })
}
export function get_jd_category_max(page){
         return request({
                  url: '/vuedemo/get_jd_category_three',
                  params:{
                           page:page,
                           // pagesize:500
                  }
         })
}