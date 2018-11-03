import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Main from '@/components/Main'
import User from '@/components/User'
import Role from '@/components/Role'
import test from '@/components/test'
import testt from '@/components/testt'

import Element from 'element-ui'
// import Element from 'element-ui/lib/index.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(Element, { size: 'small', zIndex: 3000 })

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Home,
      name: 'Home',
      meta: {
        name: '主页面'
      }
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
      meta: {
        name: '登录页面'
      }
    },
    {
      path: '/home',
      component: Home,
      name: 'Home',
      children: [
        {
          path: '',
          component: Main,
          name: 'Main'
        },
        {
          path: '/home/main',
          component: Main,
          name: 'Main'
        },
        {
          path: '/home/user',
          component: User,
          name: 'User'
        },
        {
          path: '/home/role',
          component: Role,
          name: 'Role'
        },
        {
          path: '/home/test',
          component: test,
          name: 'test'
        },
        {
          path: '/home/testt',
          component: testt,
          name: 'testt'
        }
      ]
    },
    {
      path: '**',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('token')
  }
  let token = sessionStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
