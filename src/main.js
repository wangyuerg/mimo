import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Menu,
  Layout,
  Button,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Table,
  Modal,
  message,
  Form,
  Icon,
  Upload,
  Tooltip,
  Divider,
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'

Vue.config.productionTip = false
Vue.use(Menu)
Vue.use(Layout)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Modal)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Tooltip)
Vue.use(Divider)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
