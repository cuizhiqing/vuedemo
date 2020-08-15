// 无论登录还是注册都是和用户有关系的


import { requestpost } from './request'

// params get请求或者jquery
// post请求使用data上传数据
// register({
//          actionkey:'shortmsg',//短信注册/account
//          telphone:"",
//          username:'',
//          password:'',
//          email:''
// })
export function register(data){
         console.log(data)
         return requestpost({
                  url:'/vuedemo/login',
                  data
                           // actionkey:'shortmsg',//短信注册/account
                           // telphone:"",
                           // username:'',
                           // password:'',
                           // email:''
                  
         })
}

export function land(data){
         return requestpost({
                  url:'/vuedemo/land',
                  data
                  
         })
}



export function autoland(data){
         return requestpost({
                  url:'/vuedemo/autoland',
                  data
                  
         })
}