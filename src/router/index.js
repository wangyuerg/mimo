import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import TaskManage from '../views/TaskManage.vue'
import DataManage from '../views/DataManage.vue'
import Login from '../views/Login.vue'
import store from '../store/index'
import { user } from '../const/index'
import { userHttp } from '../util/api/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/task',
        name: 'TaskManage',
        component: TaskManage,
        meta: {
          requiresAuth: true, //加一个自定义字段，需要检测
        },
      },
      {
        path: '/data',
        name: 'DataManage',
        component: DataManage,
        meta: {
          requiresAuth: true, //加一个自定义字段，需要检测
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(store.state)
    if (store.state.role === user.ROLE['LOGIN']) {
      // 为1
      next()
    } else {
      userHttp
        .login({})
        .then((res) => {
          if (res.data.status === 'success') {
            store.commit('setRole', res.data.data.roleId)
            store.commit('setUserName', res.data.data.userName)
            next()
          } else {
            next({
              path: '/login',
            })
          }
        })
        .catch(() => {
          next({
            path: '/login',
          })
        })
    }
  } else {
    next()
  }
})

export default router
