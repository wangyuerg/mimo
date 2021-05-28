import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: 0, // 0代表未登录，1是已登陆
    userName: 'test',
  },
  mutations: {
    setRole: function (state, n) {
      state.role = n
    },
    setUserName: function (state, n) {
      state.userName = n
    },
  },
  actions: {},
  modules: {},
})
