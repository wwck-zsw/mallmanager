<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button class="login-btn" type="primary" @click.prevent="handleLogin2">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    handleLogin () {
      this.$http.post('login', this.formdata)
        .then((res) => {
          // console.info(res)
          const {
            data, meta: {msg, status}
          } = res.data

          console.info(data)

          //   // 1
          //   const {meta:obj} =
          //   {meta:{msg:"11", status:200}}
          //   // 结果
          //   obj = {msg:"11", status:200}
          //   // 2
          //   const {meta:{msg, status}} =
          //   {meta:{msg:"11", status:200}}
          //   // 结果
          //   {msg, status} = {msg:"11", status:200}

          //    不成功
          //    1. 提示消息
          if (status === 200) {
            // 登录成功
            // 1. 跳转home
            this.$router.push({name: 'home'})
            // 2. 提示成功
            this.$message({
              message: msg,
              type: 'success'
            })
          } else {
            this.$message.error(msg)
          }
        })
    },
    // 登录请求2
    async handleLogin2 () {
      // 希望让异步操作的代码 看起来像同步代码
      // ES7 async+await
      const res = await this.$http.post('login', this.formdata)
      const {
        data, meta: {msg, status}
      } = res.data
      if (status === 200) {
        // 登录成功
        // 0. 保存token
        localStorage.setItem('token', data.token)
        // 1. 跳转home
        this.$router.push({name: 'home'})
        // 2. 提示成功
        this.$message({
          message: msg,
          type: 'success'
        })
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
    .login-wrap{
        height: 100%;
        background-color: #324152;
        /* 弹性盒布局 */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-wrap .login-form{
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
    }
    .login-wrap .login-btn{
        width: 100%;
    }
</style>
