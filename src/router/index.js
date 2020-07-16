import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home=()=>import("views/home/home.vue")
const category=()=>import("views/category/category.vue")
const cart=()=>import("views/cart/cart.vue")
const profile=()=>import("views/profile/profile.vue")
const jx=()=>import("views/jx/jx.vue")

const routes= [
    {
      path:"/",
      redirect:"/home"
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: "home页面"
      }
    },
    {
      path: '/category',
      name: 'category',
      component: category,
      meta: {
        title: "category页面"
      }
    },
    {
      path: '/jx',
      name: 'jx',
      component: jx,
      meta: {
        title: "jx页面"
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
      meta: {
        title: "cart页面"
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: {
        title: "profile页面"
      }
    },
  ]
const routers = new Router({
  mode: "history",
  routes,
  linkActiveClass: "active",
})
routers.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
})
export default routers
