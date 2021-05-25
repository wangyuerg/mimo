// 引入使用
import { get, post } from './http.js'
function getTaskInfo(param) {
  console.log(param, 'sadsadas')
  return post('/task/getTaskInfo', param)
}

function gettest(param) {
  return get('/getTaskInfo', param)
}

export default {
  getTaskInfo,
  gettest,
}
