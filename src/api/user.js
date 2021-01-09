import request from '@/utils/request'

export function userLogin(loginData) {
  return request({
    url: '/user/login',
    method: 'post',
    params: loginData
  })
}
