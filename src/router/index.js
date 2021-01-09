import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/base/Login'
import stuIndex from '@/components/student/StuIndex'
import teaIndex from '@/components/teacher/TeaIndex'
import manIndex from '@/components/manager/ManIndex'
import perCourseTab from '@/components/student/PerCourseTab'
import clsCourseTab from '@/components/student/ClsCourseTab'
import stuGradeTab from '@/components/student/StuGradeTab'
import baseIndex from '@/components/base/BaseIndex'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
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
      component: teaIndex,
      children:[
        {
          path: '/',
          name: 'BaseIndex',
          component: baseIndex
        }
      ]

    },
    {
      path: '/manager/manIndex',
      name: 'manIndex',
      component: manIndex
    }
  ]
})
