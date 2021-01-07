import request from '@/utils/request'

export function getStuCourse(StudentNum) {
  return request({
    url:'/student/getCourse/'+StudentNum,
    method:'get'
  })
}
