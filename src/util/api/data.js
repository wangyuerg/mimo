// 引入使用
import { get } from './http.js'

function deleteData(param) {
  return get('/data/deleteData', param)
}
function getData(param) {
  return get('/data/getData', param)
}

export default {
  deleteData,
  getData,
}
