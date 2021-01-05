import axios from 'axios'
import {Notification, Message} from 'element-ui'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // baseURL: '/api',
    // 超时
    timeout: 10000000
})
// request拦截器
// service.interceptors.request.use(
//   config => {
//     if (getToken()) {
//       config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     Promise.reject(error)
//   }
// )

// 响应拦截器
// 规定了后端的响应的格式为 DataResult<Object>
service.interceptors.response.use(res => {
        const code = res.data.code;
        if (code !== null && code === 0) {
            return res.data.data
        } else if (code !== null && code !== 0) {
            Notification.error({
                title: res.data.message
            })

            return Promise.reject('error')
        }
    },
    error => {
        console.log('err' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
