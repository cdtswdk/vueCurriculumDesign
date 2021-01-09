import request from '@/utils/request'

export function getStuCourse(StudentNum) {
  return request({
    url:'/student/getCourse/'+StudentNum,
    method:'get'
  })
}
export function listStuCourseByStuNum(query) {
  return request({
    url: '/student/listCourseByStuNum',
    method: 'get',
    params:query
  })
}

export function listClsCourseByStuNum(query) {
  return request({
    url: '/student/listClassByStuNum',
    method: 'get',
    params:query
  })
}

export function listStuGradeByStuNum(query) {
  return request({
    url: '/student/listGradeByStuNum',
    method: 'get',
    params:query
  })
}
