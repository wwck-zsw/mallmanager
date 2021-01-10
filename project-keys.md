## Vue-项目重点

### day-07-重点

#### 01-项目-准备-项目目录说明
1. src/
2. build/ webpack相关代码
3. config/ 本地服务器配置
4. .eslintignore eslint排除工具
5. .eslintrc eslint配置文件
6. .babelrc 转换es6代码
7. .postcaarc 兼容浏览器
8. .package 这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。
    npm install命令根据这个配置文件，自动下载所需的 模块，也就是配置项目所需的运行和开发环境。
    npm i 简化命令
#### 02-项目-准备-代码规范-自定义指令-lintfix
项目采用 JavaScript Standard Style代码风格，以下是一些基本规范细则
    使用两个空格 进行缩进
    除需要转义的情况外，字符串统一使用单引号
    不要留下未使用的变量
    关键字后面加空格
    函数声明时括号与函数名间加空格
    始终使用 === 替代 ==
    字符串拼接操作符（Infix operators）之间要留空格
    逗号后面加空格
    else 关键字要与花括号保持在同一行
    多行if语句的括号不能省
    不允许有连续多行的空行
    对于三元运算符 ? 和 : 与他们所负责的代码处于同一行
1. 结尾没有 ‘;’ 号
2. 必须用全等 ‘===’
3. 

> 在package.json中scripts自定义指令：指令很长
> npm run 自定义指令名(dev)
> npm run lintfix (自动按照规范修正全部的js代码),(这个指令要在程序运行(npm run dev)时使用)
    不能修复(不允许出现未使用的变量)多余的变量
> npm run gitcus

> 自动打开浏览器 dev: 'xxxxxx --open'

> 关闭eslint build/webpack.base.conf.js 注释掉(...(config.dev.useEslint ? [createLintingRule()] : []),)

#### 03-项目-准备-element-ui-文档分析
> element-ui 是饿了么开发团队
> 适用于vue项目-PC端项目
> DDFE
> 在main.js引入
> Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库

#### 04-项目-准备-element-ui-安装-引入
> npm i element-ui -S
> 在main.js import
> Vue.use(ElementUI)

#### 05-项目-准备-项目模板简化-调整
> 删除模板中我们用不到的文件/代码

#### 06-项目-准备-git版本控制
> git/svn
1. git init -> .git
2. git status
3. git add .
4. git commit -m "init"
5. 在代码托管平台(github) 新建远程仓库
7. git remote add origin https://github.com/wwck-zsw/mallmanager.git
8. git push -u origin master (之后再push 直接 git push)

#### 07-项目-登录-新建分支-login组件-配置路由
> 新建一个分支 专门写登录功能
> git branch
> git checkout -b dev-login
> 新建组件+配置路由
> 注意：
    1.每完成一个小功能就commit一次
    2.push操作要在master分支去执行

#### 08-项目-登录-引入表单组件
> el-form
    1.引入
    2.调整标签(h2+el-button)
> label-position="top"

#### 09-项目-登录-样式调整
> height: 100%
> 注意：div#app height: 100%

#### 10-项目-登录-axios 插件
> axios 不是vue插件 - 不能直接这样使用Vue.use(axios)
```js
// 插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
    // 添加实例方法
    Vue.prototype.$http = axios
}
export default MyHttpServer
```
> 在main.js 导入之后 Vue.use(插件名)
> 结果：this.$http.get()

#### 11-项目-登录-发送登录请求
> login.vue methods handleLogin()
1. this.$http.post('login', this.formdata).then((res)=>{})
2. 对象结构赋值 res.data
```js
    const {
    data, meta: {msg, status}
    } = res.data
```

#### 12-项目-登录-引入提示框组件
> this.$message.error(msg)

#### 13-项目-登录-登录成功-进入home组件
> 登录成功 -> 来到home组件
1. js编程式导航this.$router.push({name: 'home'})
2. App.vue router-view
3. 新建home组件
4. 路由index.js 配置路由

#### 14-项目-登录-简化登录请求代码-async和await
> 让异步代码ajax看起来像同步代码
1. 找到异步操作有结果的代码 前面加await 同时接口异步操作的结果res
2. 找到距离异步操作有结果的代码最近的方法 前面加async

#### 15-项目-登录-保存token值
> 目的：如果用户没登录 -> url直接来到home组件
> 在登录成功时 保存正确用户的token
```js
    localStorage.setItem('token', data.token)
```

#### 16-项目-首页-布局容器-使用-样式调整
> 引入布局容器

#### 17-项目-首页-头部-样式调整
> loyout 布局
> 行 el-row
> 列 el-col
> 注意：24栏

#### 18-项目-首页-侧边栏-导航组件-文档
> el-menu
    1.router 开启路由模式 true index值==path值
    2.unique-opened是否只保持一个子菜单的展开

#### 19-项目-首页-侧边栏-引入导航组件-调整
> 调整el-menu
> index值不能一样

#### 20-项目-首页-进入首页的权限验证
> 如果没有登录过 就不能进入到home组件
```js
  // new Vue之前触发
  beforeCreate () {
    // 获取token
    const token = localStorage.getItem('token')
    if (!token) {
      // token 没有 -> 登录
      this.$router.push({name: 'login'})
    }
    // if token 有 -> 继续渲染组件
  }
```

#### 21-项目-首页-头部-退出功能
```js
    // 退出
    handleSignout () {
      // 1.清除token
      localStorage.clear()
      // 2.提示
      this.$message.success('退出成功')
      // 3.来到login组件
      this.$router.push({name: 'login'})
    }
```

#### 22-项目-首页-合并分支-新建用户分支
 1. 切到 master 分支
 2. git merge dev-login 合并分支
 3. git push
 4. 新建 dev-users

#### 23-项目-首页-用户列表-新建组件-路由配置
 1. home.vue 开启路由模式
 2. home.vue main -> router-view
 3. 新建users.vue
 4. router/index.js 在home中children配置users的路由

 
 ### day-08-重点

 #### 01-项目-用户管理-用户列表-面包屑合搜索框
 1. el-card 卡片 小容器
 2. 面包屑
 3. el-row>el-col>el-input+el-button
 4. 调整样式

 #### 02-项目-用户管理-用户列表-引入表格组件
  > el-table(data数据源[]) > el-table-column(label表头/prop="数据") >字符串数据
  ```html
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
    </el-table>
  ```

 #### 03-项目-用户管理-用户列表-表头处理
  > 按照效果 调整了表头的数量合label
  > type="index" -> 该列的每个单元格的内容从1开始的序号

 #### 04-项目-用户管理-用户列表-请求数据-设置请求头
  1. created () {this.getuserList()}
  2. methods: {getuserList () {发送请求}
  3. 接口文档中 除了登录之外的所有请求都需要就行授权 -> 设置请求头
  4. 找axios中关于请求头设置的代码
  ```js
    const AUTH_TOKEN = localStorage.getItem('token')
    this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
  ```
 5. 发送请求
 
 #### 05-项目-用户管理-用户列表-渲染数据-一般数据
  1. 结构赋值 给this.userList=res.data.data.users
  2. prop = ""
  <!-- username -->
  <!-- email -->
  <!-- mobile -->
  <!-- create_time -->
  <!-- mg_state -->
  
 #### 06-项目-用户管理-用户列表-渲染数据-日期格式处理
 1. main.js 全局过滤器 fmtdate
 2.
 2.1 prop="create_time | fmtdate" 不行！
 2.2 单元格的内容只能显示文本
 ```html
    <el-table-column
        prop="create_time"
        label="创建时间">
        {{create_time | fmtdate}}
    </el-table-column>
 ```
2.3 需要给改内容外层加容器template
    不同组件的数据不是共享 独立作用域
```html
    <el-table-column
        prop="create_time"
        label="创建时间">
        <template>
            {{create_time | fmtdate}}
        </template>
    </el-table-column>
```
2.4 最终写法
    > slot-scope 作用：传值
    > slot-scope的值会自动去上一级找最外层标签el-table所绑定的数据userList
    > slot-scope="scope" 此时"scope"==userList数组
    > scope.row是数组的每个对象
    > scope.row.create_time我们要用的数据
```html
    <el-table-column
        label="创建时间">
         <template slot-scope="userlist">
            {{userlist.row.create_time | fmtdate}}
        </template>
    </el-table-column>
 ```
 #### 07-项目-用户管理-用户列表-渲染数据-用户状态开关
 > el-switch v-model="bool"
 ```html
    <el-table-column
        prop="mg_state"
        label="用户状态">
        <template slot-scope="userlist">
            <el-switch
            v-model="userlist.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </template>
    </el-table-column>
 ```

 #### 08-项目-用户管理-用户列表-渲染数据-操作
 > 操作里面不是字符串
 1. template容器 slot-scope="scope"
 2. el-button
 3. size="mini" plain

 #### 09-项目-用户管理-用户列表-分页组件-文档-引入
 > 该接口支持分页 url参数中有pagenum pagesize
 1. @size-change：每页显示条数变化时 触发
 2. @current-change：当前页改化时 触发
 3. current-page：设置当前页是第几页
 4. page-sizes=[2,4,6]：每页多少条的数据数组
 5. page-size：功能列表
 7. total：数据总数

 #### 10-项目-用户管理-用户列表-分页组件-配置数组
 1. current-page="pagenum"
 2. page-size="pagesize"
 3. total="total"

 #### 11-项目-用户管理-用户列表-分页组件-分页请求
 1. 每页显示条数改变 -> this.pagesize = val -> this.getUserList()
 2. 页码改变时 -> this.pagenum = val -> this.getUserList()
 > 希望当每页条数改变时 从第一页开始显示 this.pagenum-1 -> currPage=1

 #### 12-项目-用户管理-用户列表-搜索用户
 1. 给搜索输入框绑定query v-model="query"
 2. 点击搜索按钮 发送请求
 3. 一键清除 clearable
 4. 点击清除按钮 -> 重新获取数据
 ```html
    <el-input placeholder="请输入内容" v-model="query" class="inputSearch"
    clearable @clear="searchUser()">
        <el-button slot="append" @click="searchUser()" icon="el-icon-search"></el-button>
    </el-input>
 ```

 #### 13-项目-用户管理-用户列表-添加用户-显示对话框
 1. 引入对话框 > el-form
 2. 点击添加用户的按钮 -> 显示对话框 this.dialogFormVisibleAdd = true
 3. 配置对话框
 3.1 :model=form:{看接口文档中添加用户时用哪个数据}
 3.2 dialogFormVisibleAdd: false
 3.3 el-form>el-input v-model="form.xxx"

 #### 14-项目-用户管理-用户列表-添加用户-发送请求
 1. post this.form
 2. 关闭对话框
 3. 清空文本框this.form = {}
 4. 更新视图
 5. 提示框
 > post status === 201
 #### 15-项目-用户管理-用户列表-添加用户-处理响应

 #### 16-项目-用户管理-用户列表-删除用户-打开确认框
 > this.$confirm().then.catch()
 1. 点击确定 -> .then的参数
 2. 点击取消 -> .catch的参数

 #### 17-项目-用户管理-用户列表-删除用户-处理响应
 1. 点击确定 -> 发送delete请求
 2. 提示
 3. 更新数据、回到第一页
 4. 注意async的位置，要写在离await最近的一个函数前面
 
 #### 18-项目-用户管理-用户列表-编辑用户-显示对话框
 > 点击操作中的编辑按钮 打开编辑对话框
 0. 提供该对话框显示/隐藏控制属性 dialogFormVisibleEdit
 1. 找到编辑按钮@click
 2. 打开对话框
 3. 把之前添加对话框进行复制 - 修改
 > form用的是之前添加用户时的form


 #### day-09-重点

 #### 01-项目-用户管理-用户列表-编辑用户-显示编辑数据
 1. 点击edit编辑按钮 scope.row
 2. 在showEditUserDia方法中 this.form = user  user其实就是scope.row
 > 用户名 禁用

 #### 02-项目-用户管理-用户列表-编辑用户-发送请求
 1. 找打对话框的确定按钮 -> editUser() -> 发送请求
 > this.form = user
 > id -> this.form
 > 先点编辑 再点添加 -> 打开添加对话框之前 this.form = {}

 #### 03-项目-用户管理-用户列表-修改用户状态
 1. 找到开关 @change="changeMgStatus(userlist.row)"
 2. changeMgStatus(){发送put请求}

 #### 04-项目-用户管理-用户列表-分配角色-功能演示
 1. 点击按钮 -> 打开对话框
 2. 对话框中有下拉框
 3. 修改当前用户的角色
 4. 5个角色名来源于请求
 > 每个角色的权限是不同的

 #### 05-项目-用户管理-用户列表-分配角色-显示对话框
 1. 点击操作中的按钮 -> 打开对话框
 2. 引入对话框（有下拉框）
 > 下拉框的特性：如果select绑定的数据的值和option的value一样,就会显示该option的value值
 3. 把option分成了两类 请选择（-1）和v-for遍历option
 4. data提供了el-select的v-model所绑定的数据currRoleId = -1

 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
 > el-select和el-option
 1. 当改变label时 -> 该label显示 -> 改变了value -> el-select v-model绑定的数据 自动关联

 #### 07-项目-用户管理-用户列表-分配角色-显示当前用户角色
 1. 获取所有角色 roles
 2. v-for el-option :label="item.roleName" :value="item.id"
 3. 通过请求获取当前用户的rid
 4. 给el-select 中v-model绑定的数据赋值 this.currRoleId = res.data.data.rid
 > rid接口文档中的参数名是role_id

 #### 08-项目-用户管理-用户列表-分配角色-修改用户角色
 1. 通过视图操作 -> 修改了lable-value值变化 -> el-select v-model绑定的数据变化
 2. currRoleId
 > 在setRole方法中要使用用户id 在data中声明currUserId = -1
 3. 在showSetUserRoleDia () { this.currUserId = user.id }

 #### 09-项目-用户管理-用户列表-合并分支-推送
 
 #### 10-项目-权限管理-新建分支-功能演示




 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框

 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
 #### 06-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
  
