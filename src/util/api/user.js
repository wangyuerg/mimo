import { post } from './http.js'
function login(param) {
  return post('/login', param)
}

export default {
  login,
}
