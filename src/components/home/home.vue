<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/heima.png" alt="无法显示图片">
          </div></el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout" href="#" @click.prevent="handleSignout()">退出</a>
          </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 侧边栏导航el-menu -->
        <!-- 开启路由模式 -->
        <el-menu
        :router="true"
        :unique-opened="true">
          <!-- 用户管理 -->
          <el-submenu :index="'' + item1.order"
          v-for="(item1,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path"
            v-for="(item2,index) in item1.children" :key="index">
              <i class="el-icon-success"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
          <!-- 权限管理
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="role">
              <i class="el-icon-location"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-location"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu> -->
          <!-- 商品管理
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              <span>分类参数</span>
            </el-menu-item>
              <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu> -->
          <!-- 订单管理
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu> -->
          <!-- 数据统计
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-location"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.getMenus()
  },
  methods: {
    // 获取导航数据
    async getMenus () {
      // 发送请求
      const res = await this.$http.get(`/menus`)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 提示
        this.$message.success(msg)
        this.menus = res.data.data
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 退出
    handleSignout () {
      // 1.清除token
      localStorage.clear()
      // 2.提示
      this.$message.success('退出成功')
      // 3.来到login组件
      this.$router.push({name: 'login'})
    }
  },
  // new Vue之前触发
  beforeCreate () {
    // 获取token
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   // token 没有 -> 登录
    //   this.$router.push({name: 'login'})
    // }
    // if token 有 -> 继续渲染组件
  }
}
</script>

<style>
.container{
  height: 100%;
}
.header{
  background-color: #b3c0d1;
}
.aside{
  background-color: #d2dce6;
}
.main{
  background-color: #e9eef3;
  height: 100%;
}
/* 头部样式 */
.middle{
  text-align: center;
}
.loginout{
  line-height: 60px;
  text-decoration: none;
}
</style>
