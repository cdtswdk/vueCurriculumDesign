import request from '@/utils/request'

// 查询所有用户
export function listUser(query) {
  return request({
    url: '/user/getAllUser',
    method: 'get',
    params: query
  })
}

export function getUserById(id) {
  return request({
    url: '/user/getUser/' + id,
    method: 'get'
  })
}

export function userLogin(loginData) {
  return request({
    url: '/user/login',
    method: 'post',
    params: loginData
  })
}
