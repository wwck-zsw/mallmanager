<template>
    <div>
        <el-card class="box-card">
            <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索 -->
            <el-row class="searchRow">
                <el-col>
                    <el-input placeholder="请输入内容" v-model="query" class="inputSearch"
                    clearable @clear="searchUser()">
                        <el-button slot="append" @click="searchUser()" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-button type="success"  @click="showAddUserDia()">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table
                :data="userList"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="#"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="电话">
                </el-table-column>
                <!-- {{create_time | fmtdate}}
                // 不支持这种写法
                <el-table-column
                    prop="create_time | fmtdate"
                    label="创建时间">
                </el-table-column> -->
                <el-table-column
                    label="创建时间">
                    <!-- 如果单元格内显示的内容不是字符串（文本）
                    需要给被显示的内容外层包裹一个template -->
                    <!-- el-table-column和template都是组件，就涉及到组件之间的传值 -->
                    <!-- template内部要用数据 设置slot-scope属性
                    该属性的值是要用数据create_time的数据源userlist -->
                    <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
                        userlist.row -> 数组中的每个对象
                     -->
                    <!-- <template slot-scope="row">
                        {{row.create_time | fmtdate}}
                    </template> -->
                    <template slot-scope="userlist">
                        {{userlist.row.create_time | fmtdate}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mg_state"
                    label="用户状态">
                    <template slot-scope="userlist">
                       <el-switch
                        v-model="userlist.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeMgStatus(userlist.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <!-- size 尺寸 medium / small / mini -->
                        <el-button plain type="primary" icon="el-icon-edit" circle
                        @click="showEditUserDia(scope.row)"></el-button>
                        <el-button plain type="success" icon="el-icon-check" circle
                        @click="showSetUserRoleDia(scope.row)"></el-button>
                        <el-button plain type="danger" icon="el-icon-delete" circle
                        @click="showDeleUserMsgBox(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                :page-sizes="[2, 4, 6, 8]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            <!-- 对话框 -->
            <!-- 添加用户的对话框 -->
            <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
                <el-form :model="form">
                    <el-form-item label="用户名" label-width="100px">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密 码" label-width="100px">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮 箱" label-width="100px">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电 话" label-width="100px">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                    <el-button type="primary" @click="addUser()">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑用户的对话框 -->
            <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
                <el-form :model="form">
                    <el-form-item label="用户名" label-width="100px">
                        <el-input disabled v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮 箱" label-width="100px">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电 话" label-width="100px">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                    <el-button type="primary" @click="editUser()">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 为用户分配角色的对话框 -->
            <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
              <el-form>
                <el-form-item label="用户名" label-width="100px">
                  {{currUsername}}
                </el-form-item>
                <el-form-item label="角色" label-width="100px">
                  <!--
                    如果select绑定的数据的值和option的value一样
                    就会显示该option的value值
                  -->
                  <el-select v-model="currRoleId">
                    <!-- value="-1"是字符串-1 , :value="-1"是数字-1 -->
                    <el-option label="请选择" :value="-1"></el-option>
                    <el-option v-for="(item,i) in roles" :key="i"
                    :label="item.roleName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
                <el-button type="primary" @click="setRole()">确 定</el-button>
              </div>
            </el-dialog>
        </el-card>

    </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      // 表格
      userList: [],
      // 分页
      pagenum: 1,
      pagesize: 2,
      total: 0,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRol: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 分配角色
      currRoleId: -1,
      currUserId: -1,
      currUsername: '',
      // 角色列表
      roles: []
    }
  },
  created () {
    this.getuserList()
  },
  methods: {
    // 分配角色 - 发送请求
    async setRole () {
      // users/:id/role
      // :id 要修改的用户id值
      // 请求体中rid 修改的新增角色id
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId
      })
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 提示
        this.$message.success(msg)
        this.dialogFormVisibleRol = false
      } else {
        this.$message.warning(msg)
      }
    },
    // 分配角色 - 显示对话框
    async showSetUserRoleDia (user) {
      // 初始化用户数据
      this.currUsername = user.username
      this.currUserId = user.id
      // 获取所有的角色列表
      const role = await this.$http.get(`roles`)
      this.roles = role.data.data
      // 获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`)
      const {meta: {status, msg}, data} = res.data
      if (status === 200) {
        // 提示
        this.$message.success(msg)
        this.currRoleId = data.rid
      }
      this.dialogFormVisibleRol = true
    },
    // 用户状态切换
    async changeMgStatus (user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      const {meta: {status, msg}, data} = res.data
      if (status === 200) {
        // 提示
        this.$message.success(msg)
        // 关闭对话框
        this.dialogFormVisibleEdit = false
        // 更新试图
        this.getuserList()
        console.info(data)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 编辑用户 - 显示对话框
    showEditUserDia (row) {
      // 获取用户数据
      this.form = row
      this.dialogFormVisibleEdit = true
    },
    // 编辑用户 - 发送请求
    async editUser (id) {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      const {meta: {status, msg}, data} = res.data
      if (status === 200) {
        // 修改成功
        // 提示
        this.$message.success(msg)
        // 关闭对话框
        this.dialogFormVisibleEdit = false
        // 更新试图
        this.getuserList()
        console.info(data)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 删除用户
    showDeleUserMsgBox (userId) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除用户请求
        // data中找userId
        // 把userId以showDeleUserMsgBox参数形式传进来
        const res = await this.$http.delete(`users/${userId}`)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.handleCurrentChange(1)
        } else {
          this.$message({
            type: 'info',
            message: msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户 - 发送请求
    async addUser () {
      const res = await this.$http.post(`users`, this.form)
      const {meta: {status, msg}, data} = res.data
      if (status === 201) {
        // 添加成功
        // 提示
        this.$message.success(msg)
        // 关闭对话框
        this.dialogFormVisibleAdd = false
        // 更新试图
        this.getuserList()
        // 清空文本框
        // this.form.username=""
        // this.form = {}
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = ''
          }
        }

        console.info(data)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 添加用户 - 显示对话框
    showAddUserDia () {
      // 清空文本框
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    // 获取用户列表的请求
    async getuserList () {
      // query 查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数 不能为空

      // 需要授权的API 必须在请求头中使用Authorization 字段提供token令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.info(res)
      const {meta: {status, msg}, data: {users, total}} = res.data
      if (status === 200) {
        // 1.给表格数据赋值
        this.userList = users
        // 2.给total赋值
        this.total = total
        // 3. 提示
        this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 分页相关方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagenum = 1
      this.pagesize = val
      this.getuserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getuserList()
    },
    // 搜索功能
    searchUser () {
      // 按照input绑定的query参数 发请求
      this.getuserList()
    }
  }
}
</script>

<style>
    .box-card {
        height: 100%;
    }
    .inputSearch {
        width: 300px;
    }
    .searchRow {
        margin-top: 20px;
    }
</style>
