import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/components/base/Base'
import User from '@/components/user/User'
import Login from '@/components/base/Login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/base',
      name: 'Base',
      component: Base
    }
  ],
  mode: 'history'
})
