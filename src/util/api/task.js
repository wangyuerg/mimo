// 引入使用
import { get, post } from './http.js'
function getTaskInfo(param) {
  return post('/task/getTaskInfo', param)
}

function endTask(param) {
  return get('/task/endTask', param)
}

function downloadConfig(param) {
  return post('/task/downloadConfig', param)
}

function gettest(param) {
  return get('/getTaskInfo', param)
}

export default {
  getTaskInfo,
  gettest,
  endTask,
  downloadConfig,
}
