import request from '@/utils/request'

export function listTeaCourseByTeaId(query) {
  return request({
    url: '/teacher/listCourseByTeaId',
    method: 'get',
    params:query
  })
}

export function listClsCourseByStuId(query) {
  return request({
    url: '/student/listClassByStuId',
    method: 'get',
    params:query
  })
}

export function listStuGradeByStuId(query) {
  return request({
    url: '/student/listGradeByStuId',
    method: 'get',
    params:query
  })
}