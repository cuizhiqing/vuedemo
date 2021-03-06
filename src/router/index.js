import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'


Vue.use(Router)
const home = () => import("views/home/Home.vue")
const category = () => import("views/category/category.vue")
const cart = () => import("views/cart/cart.vue")
const profile = () => import("views/profile/profile.vue")
const login = () => import("views/login/login.vue")

const jxindex = () => import("views/jx/jxindex.vue")
// const register = () => import("views/register/register.vue")\
const phbhot = () => import('views/phb/phbhot.vue')
const phbdoub = () => import("views/phb/phbdoub.vue")
const phbdz = () => import("views/phb/phbdz.vue")
const detail = () => import("views/details/details.vue")
const search = () => import("views/search/search.vue")
const jxcategroy = () => import("views/jx/jxcategroy.vue")
const jxvlog = () => import("views/jx/jxvlog.vue")
const jxmyself = () => import("views/jx/jxmyself.vue")
const order = () => import("views/order/order.vue")
const confirmorder = () => import("views/order/confirmorder.vue")
const pay = () => import("views/order/payment.vue")
const address = () => import("views/address/address.vue")


const routes = [
  {
    path: "/",
    redirect: "/home"
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
  {
    path: '/phbhot',
    name: 'phbhot',
    component: phbhot,
    meta: {
      title: "phbhot页面"
    },
  },
  {
    path: '/phbdoub',
    name: 'phbdoub',
    component: phbdoub,
    meta: {
      title: "phbdoub页面"
    },
  },
  {
    path: '/phbdz',
    name: 'phbdz',
    component: phbdz,
    meta: {
      title: "phbdz页面"
    },
  },
  {
    path: '/details/:id',
    name: 'detail',
    component: detail,
    meta: {
      title: "detail页面"
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      title: "search页面"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: "login页面"
    }
  },
  {
    path: '/jxindex',
    name: 'jxindex',
    component: jxindex,
    meta: {
      title: "jxindex页面"
    },
    children: [
      {
        path: '/jxindex/profile',
        name: 'jxmyself',
        component: jxmyself,
        meta: {
          title: "jxmyself页面"
        }
      },

      {
        path: '/jxindex/live',
        name: 'jxvlog',
        component: jxvlog,
        meta: {
          title: "jxvlog页面"
        }
      },
      {
        path: '/jxindex/jc',
        name: 'jxcategroy',
        component: jxcategroy,
        meta: {
          title: "jxcategroy页面"
        }
      },
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      title: "order页面"
    }
  },
  {
    path: '/pay/:orderid',
    name: 'pay',
    component: pay,
    meta: {
      title: "pay页面"
    }
  },
  {
    path: '/confirmorder/:shop',
    name: 'confirmorder',
    component: confirmorder,
    meta: {
      title: "confirmorder页面"
    }
  },
  {
    path: '/address',
    name: 'address',
    component: address,
    meta: {
      title: "address页面"
    }
  },
]
const routers = new Router({
  mode: "history",
  routes,
  linkActiveClass: "active",
})
routers.beforeEach((to, from, next) => {
  // document.title = to.matched[0].meta.title;
  // 每次路由在执行的时候，记录一下进入页面的路由地址，后期用于判断tabbar被重复点击
  store.state.sknavigation = to.path
  if (to.path == from.path) return


  for (let item in store.state.tabbar) {
    store.state.tabbar[item] = false
  }
  if (to.path == '/home' || to.path == '/category'|| to.path == '/login'|| to.path == '/cart') {
    store.state.tabbar['is_jd_tabbar'] = true
    // store.state.tabbar.is_jd_tabbar=true
  } else if (to.path.lastIndexOf('/jx') != -1) {
    store.state.tabbar.is_jx_tabbar = true

  }
  next();
})
export default routers
