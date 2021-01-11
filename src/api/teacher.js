import request from '@/utils/request'

export function getPersonInfo(teacherId) {
  return request({
    url: '/teacher/getPersonInfo',
    method: 'get',
    params: teacherId
  })
}

export function listTeaCourseByTeaId(query) {
  return request({
    url: '/teacher/listCourseByTeaId',
    method: 'get',
    params: query
  })
}

export function listSelCourseByCourseIdAndTeacherId(query) {
  return request({
    url: '/teacher/listSelCourseByCourseIdAndTeacherId',
    method: 'get',
    params: query
  })
}

export function updateStuCourseGrade(form) {
  return request({
    url: '/teacher/updateStuCourseGrade',
    method: 'post',
    params: form
  })
}
