import request from '@/utils/request'

export function listStuCourseByStuId(query) {
  return request({
    url: '/student/listCourseByStuId',
    method: 'get',
    params: query
  })
}

export function listClsCourseByStuId(query) {
  return request({
    url: '/student/listClassByStuId',
    method: 'get',
    params: query
  })
}

export function listStuGradeByStuId(query) {
  return request({
    url: '/student/listGradeByStuId',
    method: 'get',
    params: query
  })
}

export function listAllCourseByStuId(query) {
  return request({
    url: '/student/listAllCourseByStuId',
    method: 'get',
    params: query
  })
}

export function getCourseByCourseId(courseId) {
  return request({
    url: '/student/getCourseByCourseId',
    method: 'get',
    params: courseId
  })
}

export function selectCourseByCourseId(courseId) {
  return request({
    url: '/student/selectCourseByCourseId',
    method: 'post',
    params: courseId
  })
}

export function dropCourseByCourseId(courseId) {
  return request({
    url: '/student/dropCourseByCourseId',
    method: 'post',
    params: courseId
  })
}
