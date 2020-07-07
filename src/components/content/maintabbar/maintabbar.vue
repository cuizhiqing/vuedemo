<template>
          <tabbar> 
               <tabbaritem path1="/home" iscolor="blue"> 
                         <img  slot="item-icon" src='../../../assets/img/home.svg'>
                          <img slot="item-icon-active"  src='../../../assets/img/home_active.svg'>
                          <div slot="item-text" >首页</div>
               </tabbaritem>
               <tabbaritem path1="/category" iscolor="orange">
                           <img slot="item-icon" src='../../../assets/img/category.svg'>
                           <img slot="item-icon-active"  src='../../../assets/img/category_active.svg'>
                           <div slot="item-text" >分类</div>
               </tabbaritem>
               <tabbaritem  path1="/cart" iscolor="green">
                         <img slot="item-icon" src='../../../assets/img/shopcart.svg'>
                         <img slot="item-icon-active"  src='../../../assets/img/shopcart_active.svg'>
                         <div slot="item-text" >购物车</div>
               </tabbaritem>
                <tabbaritem  path1="/profile" iscolor="yellow">
                           <img slot="item-icon" src='../../../assets/img/profile.svg'>
                           <img slot="item-icon-active"  src='../../../assets/img/profile_active.svg'>
                           <div slot="item-text" >我的</div>
               </tabbaritem>
            </tabbar>
</template>



<script>
//插槽组件
//@相当于webpack.base.conf.js中的resolve（'src'）函数
import tabbar from 'components/tabbar.vue'
//import tabbar from 'localhost:8080/src/components/tabbar.vue'
//这样写的components是webpack.base.config.js中别名配置的
import tabbaritem from 'components/tabbarItem.vue'
export default{
         name:"maintabbar",
         components:{
           tabbar,
           tabbaritem 
         }
}
</script>
<style>

</style>
