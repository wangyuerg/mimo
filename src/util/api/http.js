// request.js文件
import axios from 'axios'
import { message } from 'ant-design-vue'
// 引入基础参数文件  和  baseURL配置文件

const BASE_URL =
  'https://www.fastmock.site/mock/cb14cea098ccc89e966c6e5a7cca0171/api'
// 默认的全局配置
axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 10000
// then,catch处理之前，进行拦截处理,如果不是success则报msg的错误
axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      // 不是200报错，:todo之后分类处理
      message.error(response.data.status)
      return response
    } else if (response.status === 200 && response.data.status !== 'success') {
      // 200但是不是success,代表请求服务器成功，后端有问题
      message.error(response.data.msg)
      return response
    }
    return response
  },
  (error) => {
    message.error('请求错误')
    return Promise.reject(error)
  }
)
// 导出post请求
export function post(url, data) {
  return axios({
    method: 'post',
    url,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  })
}
// 导出get请求
export function get(url, params) {
  return axios({
    method: 'get',
    url,
    params,
    headers: {},
  })
}
// then处理执行了successHandle
// function successHandle(data, resolve) {
//   if (res.success && res.errorCode == '60000') {
//     resolve(res)
//   } else {
//     // 弹出toast报错
//     Toast({
//       message: res.msg,
//       duration: 2000,
//     })
//   }
// }
// catch处理执行了errorHandle
// function errorHandle(err, reject) {
//   reject(err)
// }
