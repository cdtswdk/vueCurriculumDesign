import request from '@/utils/request'

export function getPersonInfo(managerId) {
  return request({
    url: '/manager/getPersonInfo',
    method: 'get',
    params:managerId
  })
}

export function listAllStuByManagerId(query) {
  return request({
    url: '/manager/listAllStuByManagerId',
    method: 'get',
    params:query
  })
}

export function listAllTeaByManagerId(query) {
  return request({
    url: '/manager/listAllTeaByManagerId',
    method: 'get',
    params:query
  })
}

export function listAllCourseByManagerId(query) {
  return request({
    url: '/manager/listAllCourseByManagerId',
    method: 'get',
    params:query
  })
}

export function queryCourse(query) {
  return request({
    url: '/manager/queryCourse',
    method: 'get',
    params:query
  })
}
export function addCourse(data) {
  return request({
    url: '/manager/addCourse',
    method: 'post',
    params: data
  })
}
