import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: localStorage.getItem('lang') || 'ru'
  },
  {
    path: '/:lang',
    component: {
      render(c) {
        return c('router-view')
      }
    },
    children: [

      {
        path: '/login',
        name: 'Login',
        component: () => import( '../views/login/index')
      },
      {
        path: '/',
        name: 'Home',
        component: Home,

      },
      {
        path: 'shop/create',
        name: 'crete/sjaj',
        component: () => import( '@/views/magazin/create')
      },
      {
        path: 'shop/:id/',
        name: 'crete/shhs',
        component: () => import( '@/views/magazin/single')
      },
      {
        path: 'shop/:id/create_product',
        name: 'crete/show',
        component: () => import( '@/views/magazin/create_mahsulot')
      },
      {
        path: 'shop/:id/edit_product/:pro_id',
        name: 'crete/show',
        component: () => import( '@/views/magazin/edit_product.vue')
      },
      {
        path: 'shop/:id/give',
        name: 'crete',
        component: () => import( '@/views/magazin/give.vue')
      },
      {
        path: 'statistic',
        name: 'statistic',
        component: () => import( '@/views/main/statistic.vue')
      },
      {
        path: 'today',
        name: 'today',
        component: () => import( '@/views/main/Today.vue')
      },
      // {
      //   path: 'login',
      //   name: 'Login',
      //   component: () => import( '../views/login/index')
      // },



    ],
  },
]
const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes,
      scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
          return savedPosition;
        } else if (to.hash) {
          return {
            selector: to.hash
          };
        } else {
          return { x: 0, y: 0 };
        }
      }
    });
export default router
