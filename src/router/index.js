import Vue from 'vue'
import Router from 'vue-router'

import baseIndex from '@/components/base/BaseIndex'
import Login from '@/components/base/Login'

import stuIndex from '@/components/student/StuIndex'
import perCourseTab from '@/components/student/PerCourseTab'
import clsCourseTab from '@/components/student/ClsCourseTab'
import stuGradeTab from '@/components/student/StuGradeTab'
import selectCourseTab from '@/components/student/SelectCourseTab'
import dropCourseTab from '@/components/student/DropCourseTab'


import teaIndex from '@/components/teacher/TeaIndex'
import perTeaInfoTab from '@/components/teacher/PerInfoTab'
import teaPerCourseTab from '@/components/teacher/PerCourseTab'
import teaGiveCourseGradeTab from '@/components/teacher/GiveCourseGradeTab'


import manIndex from '@/components/manager/ManIndex'
import perManInfoTab from '@/components/manager/PerInfoTab'
import listAllStudent from '@/components/manager/ListAllStudent'
import listAllTeacher from '@/components/manager/ListAllTeacher'
import listAllCourse from '@/components/manager/ListAllCourse'

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
        },
        {
          path: '/student/selectCourseTab',
          name: 'SelectCourseTab',
          component: selectCourseTab
        },
        {
          path: '/student/dropCourseTab',
          name: 'SelectCourseTab',
          component: dropCourseTab
        }
      ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: teaIndex,
      children: [
        {
          path: '/',
          name: 'BaseIndex',
          component: baseIndex
        },
        {
          path: '/teacher/perInfoTab',
          name: 'PerInfoTab',
          component: perTeaInfoTab
        },
        {
          path: '/teacher/perCourseTab',
          name: 'TeaPerCourseTab',
          component: teaPerCourseTab
        },
        {
          path: '/teacher/teaGiveCourseGradeTab',
          name: 'GiveCourseGradeTab',
          component: teaGiveCourseGradeTab
        }
      ]
    },
    {
      path: '/manager',
      name: 'manIndex',
      component: manIndex,
      children: [
        {
          path: '/',
          name: 'BaseIndex',
          component: baseIndex
        },
        {
          path: '/manager/perInfoTab',
          name: 'PerInfoTab',
          component: perManInfoTab
        },
        {
          path: '/manager/listAllStudent',
          name: 'ListAllStudent',
          component: listAllStudent
        },
        {
          path: '/manager/listAllTeacher',
          name: 'ListAllTeacher',
          component: listAllTeacher
        },
        {
          path: '/manager/listAllCourse',
          name: 'ListAllCourse',
          component: listAllCourse
        }
      ]
    }
  ]
})
