import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/components/base/Base'
import User from '@/components/user/User'
import Login from '@/components/base/Login'
import stuIndex from '@/components/student/StuIndex'
import teaIndex from '@/components/teacher/TeaIndex'
import manIndex from '@/components/manager/ManIndex'
import perCourseTab from '@/components/student/PerCourseTab'

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
    },
    {
      path: '/student',
      name: 'student',
      component: stuIndex,
      children:[
        {
          path:'/student/perCourseTab',
          name: 'PerCourseTab',
          component:perCourseTab
        }
      ]
    },
    {
      path: '/teacher/teaIndex',
      name: 'teaIndex',
      component: teaIndex
    },
    {
      path: '/manager/manIndex',
      name: 'manIndex',
      component: manIndex
    }
  ]
})
