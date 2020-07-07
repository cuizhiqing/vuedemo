module.exports = {
         configureWebpack: {//与webpack的配置合并
                  resolve: {
                           extensions: [],//设置默认后缀名，检测js，css等
                           alias: {
                                    // "@":"/src",//默认 在2.0创建的时候不能给其他的别名使用
                                    "assets": "@/assets",
                                    "components": "@/components",
                                    "views": "@/views",
                                    "network": "@/network",
                                    "common": "@/common",//common指的是公共js文件夹


                           },//别名        
                  }
         }
}