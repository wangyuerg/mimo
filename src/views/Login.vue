<template>
  <div class="login">
    <div class="login-head">
      <div class="head-text">Massive MIMO智能优化系统</div>
    </div>
    <div class="login-card">
      <div class="card-title">用户登陆</div>
      <div class="card-input">
        <div class="input-item">
          <a-tooltip :visible="visible.name" placement="right">
            <template slot="title"> 请输入用户名 </template>
            <a-input
              size="large"
              ref="userNameInput"
              v-model="userName"
              placeholder="用户名"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-tooltip>
        </div>
        <div class="input-item">
          <a-tooltip :visible="visible.pwd" placement="right">
            <template slot="title"> 请输入密码 </template>
            <a-input-password size="large" placeholder="密码" v-model="userpwd">
              <a-icon slot="prefix" type="key" />
            </a-input-password>
          </a-tooltip>
        </div>
      </div>
      <a-button class="card-button" type="primary" @click="login"
        >登陆</a-button
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { userHttp } from '../util/api/index'
import { user } from '../const/index'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      userName: '',
      userpwd: '',
      visible: {
        name: false,
        pwd: false,
      },
    }
  },
  methods: {
    login() {
      if (this.userName === '') {
        this.visible.name = true
        setTimeout(() => {
          this.visible.name = false
        }, 1000)
      }
      if (this.userpwd === '') {
        this.visible.pwd = true
        setTimeout(() => {
          this.visible.pwd = false
        }, 1000)
      }
      // 两个校验都通过才可提交
      if (!this.visible.name && !this.visible.pwd) {
        // :todo发送请求
        let param = {
          userName: this.userName,
          pwd: this.pwd,
        }
        userHttp.login(param).then((res) => {
          if (res.data.status === 'success') {
            this.$store.commit('setRole', user.ROLE['LOGIN'])
            this.$message.success('登陆成功')
            this.$router.push({ path: '/task' })
          }
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.login {
  background-color: #1891ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-head {
    position: absolute;
    top: 0;
    height: 76px;
    background-color: white;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .head-text {
      padding-left: 50px;
      font-size: 28px;
    }
  }
  .login-card {
    background-color: white;
    width: 500px;
    height: 340px;
    border-radius: 25px;
    padding: 40px;
    display: flex;
    flex-flow: column;
    align-items: center;
    .card-title {
      font-size: 30px;
      color: #1875cb;
      text-align: center;
      line-height: 30px;
      padding-bottom: 40px;
    }
    .card-input {
      .input-item {
        width: 300px;
        padding-bottom: 20px;
      }
      padding-bottom: 10px;
    }
    .card-button {
      width: 300px;
      height: 46px;
      font-size: 20px;
    }
  }
}
</style>
