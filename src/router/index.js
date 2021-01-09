import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user/User'
import Login from '@/components/base/Login'
import stuIndex from '@/components/student/StuIndex'
import teaIndex from '@/components/teacher/TeaIndex'
import manIndex from '@/components/manager/ManIndex'
import perCourseTab from '@/components/student/PerCourseTab'
import clsCourseTab from '@/components/student/ClsCourseTab'
import stuGradeTab from '@/components/student/StuGradeTab'
import baseIndex from '@/components/student/BaseIndex'

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
      path: '/student',
      name: 'student',
      component: stuIndex,
      children: [
        {
          path: '/',
          name: 'BaseIndex',
          component: baseIndex
        },
        {
          path: '/student/perCourseTab',
          name: 'PerCourseTab',
          component: perCourseTab
        },
        {
          path: '/student/clsCourseTab',
          name: 'ClsCourseTab',
          component: clsCourseTab
        },
        {
          path: '/student/stuGradeTab',
          name: 'StuGradeTab',
          component: stuGradeTab
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
