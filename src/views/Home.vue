<template>
  <a-layout class="home">
    <a-layout-header class="home-top">
      <div class="top-platname">Massive MIMO智能优化系统</div>
      <div class="top-userInfo">你好, {{ username }}</div>
    </a-layout-header>
    <a-layout-sider class="home-menu">
      <div class="logo">logo</div>
      <a-menu
        v-model="currentMenuKey"
        mode="inline"
        @select="selectMenuItem"
        class="menu"
        theme="dark"
      >
        <a-menu-item key="1">任务中心</a-menu-item>
        <a-menu-item key="2">数据管理</a-menu-item>
        <a-sub-menu key="3">
          <span slot="title">test</span>
          <a-menu-item key="3-1">test1</a-menu-item>
          <a-menu-item key="3-2">test2</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="home-content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      menuList: [
        // 设置menu的地址
        {
          key: '1',
          title: '任务中心',
          path: '/task',
        },
        {
          key: '2',
          title: '数据管理',
          path: '/data',
        },
        {
          key: '3-1',
          title: 'test1',
        },
        {
          key: '3-2',
          title: 'test2',
        },
      ],
      username: '李梅',
      currentMenuKey: ['1'],
    }
  },
  beforeRouteEnter(to, from, next) {
    // 渲染新链接时
    next((vm) => {
      // 此时无this
      let path = to.fullPath
      let currentMenuItem = vm.menuList.find((item) => {
        return item.path === path
      })
      if (typeof currentMenuItem !== 'undefined') {
        vm.currentMenuKey = [currentMenuItem.key]
      }
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 跟新部分路由时
    //此处有this，等效于watch，每次路由参数更新触发
    let path = to.fullPath
    let currentMenuItem = this.menuList.find((item) => {
      return item.path === path
    })
    if (typeof currentMenuItem !== 'undefined') {
      this.currentMenuKey = [currentMenuItem.key]
    }
    next()
  },
  methods: {
    selectMenuItem(item) {
      let key = item.key
      let targetItem = this.menuList.find((item) => {
        return item.key === key
      })
      if (typeof targetItem === 'undefined') {
        console.log('menuList中没有该项')
      } else if (typeof targetItem.path === 'undefined') {
        console.log('该项没设置path')
      } else {
        this.$router.push(targetItem.path)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  .home-top {
    margin-left: 200px;
    position: fixed;
    z-index: 1;
    width: 100%;
    background-color: white;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    .top-platname {
      font-weight: bold;
      font-size: 16px;
    }
    .top-userInfo {
      min-width: 400px;
      padding-right: 50px;
      position: absolute;
      right: 25px;
    }
  }
  .home-menu {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    .logo {
      height: 40px;
    }
  }
  .home-content {
    padding-left: 200px;
    margin: 56px 16px 0;
    min-height: 100vh;
  }
}
</style>
>
