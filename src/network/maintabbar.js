import { request } from './request'

export function getTabbar(path) {
         return request({
                  url: '/vuedemo'+path
         })
}