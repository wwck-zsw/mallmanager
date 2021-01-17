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

 #### 18-项目-用户管理-用户列表-编辑用户-显示对话框
 1. 之前分页 回到第一页的写法 this.pagenum=1
 2. el-table 固定表头 height="250px"
 > max-height="250px"
 > overflow: auto


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
 1. git add .
 2. git commit -m "注释"
 3. git branch
 4. git checkout master
 5. git merge dev-users
 6. git push
 
 #### 10-项目-权限管理-新建分支-功能演示
 1. 权限管理
 2. 角色列表
 > 展开行+树形结构
 3. 权限列表

 #### 11-项目-权限管理-权限列表-新建组件-路由配置
 1. 新建right.vue
 2. home.vue 改标识
 3. 配置路由

 #### 12-项目-权限管理-权限列表-自定义面包屑组件
 > 好多组件都有面包屑 -> 二次封装面包屑组件
 1. 新建 .Vue文件
 2. 在自定义组件中提供数据 level1 level2 -> props: []
 3. main.js 中引入
 4. Vue.component(MyBread.name, MyBread)

 #### 13-项目-权限管理-权限列表-获取权限列表数据
 > 除了登录之外的所有请求 都需要设置头部信息
 > type参数 值list或tree

 #### 14-项目-权限管理-权限列表-axios-拦截器统一设置请求头
 > 除了登录之外的所有请求 都需要设置头部信息
 > 请求发起之前 添加头部 -> axios文档
 > 请求拦截器 config.header
 > 响应拦截器 

 #### 15-项目-权限管理-权限列表-表格展示
 > 引入el-table 绑定数据 rightlist(authName path level)

 #### 16-项目-权限管理-权限列表-表格展示-层级显示
 > level === '0' 一级
 1. template slot-scope="scope"
 2. v-if="scope.row.level === '0'" 一级

 #### 17-项目-权限管理-权限列表-表格展示-固定表头
 > 给el-table设置固定高
 > overflow: auto

 #### 18-项目-权限管理-角色列表-新建组件-配置路由
 1. 新建role.vue组件
 2. 配置路由

 #### 19-项目-权限管理-角色列表-面包屑和添加按钮
 1. 自定义面包屑
 2. 添加按钮

 #### 20-项目-权限管理-角色列表-获取角色列表数据
 1. 发送请求 this.$http.get(`roles`)

 #### 21-项目-权限管理-角色列表-表格展示
 > 将users.vue中的表格进行复制 修改
 1. :data="rolelist"
 2. roleName
 3. roleDesc
 4. 操作

 #### 22-项目-权限管理-角色列表-表格展示-展开行功能分析
 1. type="expand"
 2. template > 该用户的权限（三级）
 3. 布局是行列布局 -> for嵌套 -> for嵌套 渲染el-tag

 #### 23-项目-权限管理-角色列表-表格展示-展开行-一级权限
 1. 分析数据rolelist > 每个对象中的chlidren中authName
 2. 布局 一行 > (列A > (el-tag) + 列B > (一行el-row) > 两列((el-colA > el-tag+el)-colB > el-tag))
 3. 一级权限展示 v-for 最外层的el-row scope.row.children

 ### day-10-重点

 #### 01-项目-权限管理-角色列表-表格展示-展开行-二级权限
 > 在第一列（一级权限）的基础上 展示二级权限

 #### 02-项目-权限管理-角色列表-表格展示-展开行-三级权限
 > 在二级权限展示完毕的基础上
 > v-for 遍历的是item2.children el-tag

 #### 03-项目-权限管理-角色列表-表格展示-展开行-样式调整
 1. el-tag颜色 type="success"
 2. closeable 关闭按钮
 3. <i class=""></i> 图标

 #### 04-项目-权限管理-角色列表-表格展示-展开行-处理无权限的展示
 > 角色无权限时 提示
 > <span v-if="scope.row.children.length===0">未分配权限</span>

 #### 05-项目-权限管理-角色列表-表格展示-展开行-取消权限
 > 点击x按钮 取消该角色的权限
 1. 给el-tag @close="deleRight(scope.row.id,itemx.id)"
 2. deleRight(roleId, rightId){发送请求}
 3. this.$http.delete(`roles/${roleId}/rights/${rightId}`)
 4. 更新视图
 > 删除成功 返回了该角色的剩余权限

 #### 06-项目-权限管理-角色列表-表格展示-展开行-取消取消-优化
 > 删除成功 -> 更新整个表格 -> 没必要
 > 删除成功 返回了该角色的剩余权限
 > 删除成功 -> 更新了当前角色的children

 #### 07-项目-权限管理-角色列表-表格展示-显示对话框
 > 点击操作的check按钮 -> 打开对话框
 1. 提供对话框
 2. check按钮 @click="showDeleUserMsgBox(scope.row.id)"

 #### 08-项目-权限管理-角色列表-表格展示-修改权限-树形结构-文档分析
 <!--
    树形结构
    data -> 数据源[]
    show-checkbox -> 选择框
    node-key 每个节点的唯一标识 通常时data数据源中key名id
    default-expanded-keys 默认展开 [要展开节点的id]
    default-checked-keys [要选择节点的id]
    props 配置项 {label, children}
    label 节点的文字标题, children 节点的子节点
    值都来源于data绑定的数据源中的key名 'label' 和 'children'
 -->

 #### 09-项目-权限管理-角色列表-表格展示-修改权限-树形结构-配置数据
 1. data中treeList
 2. 打开对话框 获取树形结构的权限列表数据
 > const res = await this.$http.get(`/rights/tree`)
 > this.treeList = res.data.data
 3. el-tree :data="treeList"
 4. el-tree node-key="id"
 5. :props={children: 'children', label: 'authName'}

 #### 10-项目-权限管理-角色列表-表格展示-修改权限-树形结构-展开所有项
 1. 两种写法
 > el-tree default-expand-all
 > :default-expanded-keys=[所有权限的id] for嵌套

 #### 11-项目-权限管理-角色列表-表格展示-修改权限-树形结构-显示角色拥有的权限
 > el-tree :default-checked-keys="arrcheck"
 1. data arrcheck
 2. role for嵌套 获取最里层叶子节点id arrtemp2
 3. this.arrcheck = arrtemp2

 #### 12-项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-功能分析
 #### 13-项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-实现
 1. 点击对话框的确定 发送请求
 > roleId rid
 2. roleId 在打开对话框的方法中 this.roleId - role.id
 3.
 3.1 获取全选的id数组arr1 getCheckedKeys()
 3.2 获取半选的id数组arr2 getHalfCheckedKeys()
 4. 在js中调用el-tree的js方法
 4.1 给el-tree设置ref
 4.2 this.$refs.ref的值tree.js方法(3.1和3.2的方法名)
 4.3 返回两个数组arr1和arr2
 5. ES6 展开运算符
 > let arr = [...arr1,...arr2]
 6. this.$http.post(`/roles/${this.currRoleId}/rights`, {rids: arr.join(',')})
 7. 关闭对话框+更新视图

 #### 14-项目-首页-侧边栏-动态导航
 > get('menus') 获取导航的所有数据
 1. order
 2. path标识
 3. children
 4. v-for
 > 在写之后的路由配置时 path不能随便写了

 #### 15-项目-效果演示-不同角色用户登录-显示对应权限
 > 每个角色有不同的权限
 1. 新建用户 分配角色
 2. 回到登录页 登录新用户 -> token
 3. 渲染home组件侧边栏时 使用header中的token
 4. 发送getMenus() 也会使用header

 #### 16-项目-不同角色用户登录-显示对应权限-导航守卫
 1. 在home.vue中判断token很麻烦
 2. 导航守卫
 2.1 路由配置生效前 先来到路由守卫的cb
 2.2 to 要去路由配置,from 当前的路由配置
 2.3 next() 让to的路由配置继续生效
 
 #### 17-项目-权限管理-合并分支-推送-新建分支
 1. git add .
 2. git commit -m "注释"
 3. git checkout master
 4. git merge dev-rights
 5. git push

 #### 18-项目-商品管理-功能演示
 1. 商品列表添加商品
 2. 分类参数
 2.1 动态参数
 2.2 静态参数(x)
 3. 商品分类
 3.1 表格中的树形结构


 ### day-11-重点

 #### 01-项目-商品管理-商品列表-准备组件
 > goods/goodslist.vue
 > 配置路由 标识path是goods

 #### 02-项目-商品管理-添加商品-新建组件配置路由
 1. goods/goodsadd.vue
 2. 配置路由 path:'/goodsadd'
 3. 点击列表组件中添加商品按钮 js编程式导航
 
 #### 03-项目-商品管理-添加商品-步骤条
 1. 面包屑
 2. 提示 el-alert
 3. 步骤条（进度条） el-steps
 > :active="abc" 如果"abc"值=2 表示当前是第二步

 #### 04-项目-商品管理-添加商品-tabs
 1. 引入el-table 表单元素 v-model="active"
 2. 如果选中的第二个el-tab-pane 此时active的值就是该tab的name属性值 也就是2
 3. 让rl-steps步骤条的:active属性的值和v-model绑定的属性是同一个

 #### 05-项目-商品管理-添加商品-基本信息-表单绑定数据
 1. 最外层包裹 el-form 调整了样式 overflow:auto
 2. v-model = "form"
 3. form数据的来源 添加商品的网络请求
 4. 基本信息tab 一般表单元素的数据绑定（名称/价格/重量/数量）

 #### 06-项目-商品管理-添加商品-基本信息-级联选择器-文档-引入
 > el-cascader 表单元素 级联选择器
 1. options=数据list[]
 2. v-model="selectOptions" 最终选择的label对应的value会在selectOptions数组中
 3. :props="{label: 'goodsname',value: 'id',children: 'children'}"
 4. @change="" 选择改变时触发
 ```js
    list:[
        {
            goodsname: '家电',
            id: '1',
            children: [
                goodsname: 'A家电',
                id: '101',
                children: []
            ]
        }
    ]
 ```

 #### 07-项目-商品管理-添加商品-基本信息-级联选择器-获取分类数据
 1. created(){}
 2. getGoodCate () {发送请求 type=3}
 3. this.options = res.data.data
 4. defaultProp: {label: 'cat_name',value: 'cat_id',children: 'children'}
 5. selectOptions: [1,3,6] 设置默认的分类

 #### 08-项目-商品管理-添加商品-基本信息-级联选择器-配置数据

 #### 09-项目-商品管理-添加商品-商品参数-获取动态参数数据
 1. 必须要先选择三级分类 -> 点击第二个tab才会获取数据
 2. if (this.active === '2') { if (this.selectOptions.length !== 3) { 提示 return} }
 3. categories/${this.selectOptions[2]}/attributes/?sel=many
 > sel=many 获取的是动态参数数据

 #### 10-项目-商品管理-添加商品-商品参数-复选框组-文档-引入
 1. 商品参数->动态参数数据->this.arrDyparams
 2. el-form-item + 复选框组
 3. v-for遍历el-form-item和el-checkbox
 > this.arrDyparams中的每个对象的attr_vals字符串->split(',') 数组

 #### 11-项目-商品管理-添加商品-商品参数-复选框组-调整样式
 1. border
 2. el-checkbox-group v-model="item1.attr_vals"

 #### 12-项目-商品管理-添加商品-商品属性-获取静态参数数据
 1. 如果选中了第三个tab this.active === '3',同时分类数组 长度===3
 2. sel=only
 > 静态参数的数据 是给商品属性用的

 #### 13-项目-商品管理-添加商品-商品参数-布局
 > v-for遍历输出arrStaticparams

 #### 14-项目-商品管理-添加商品-图片上传-文档-引入
 > el-upload
 1. action 全路径
 2. headers 头部
 3. on-remove = "移除触发的方法"
 4. on-preview = ""
 4. on-success = ""

 #### 15-项目-商品管理-添加商品-图片上传-配置属性-临时路径
 1. action = "http开头全路径"
 2. headers: { Authorization: localStorage.getItem('token') }
 > 除了登录请求 都需要设置头部 之前全局的头部设置是给axios请求设置的
 > 图片移除 file.response.data.tmp_path 图片临时上传的路径
 > 图片上传成功 file.data.tmp_path 图片临时上传的路径

 #### 16-项目-商品管理-添加商品-商品内容-富文本编辑器
 > npm install vue-quill-editor --save
 1. 全局注册 + 局部注册
 ```js
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
 ```
 2. 通过选项局部注册
  ```js
    components: {
        quillEditor
    },
 ```
 > v-model="form.goods_introduce"
 > github+npm+vue官网（资源列表）

 #### 17-项目-商品管理-添加商品-表单数据分析
 ```js
    未处理的数据
    1.
    goods_cat 以为','分割的分类列表  不能为空 -> 级联选择器绑定的数据 selectOptions
    this.selectOption -> String
    2.
    pics 上传的图片临时路径（对象）可以为空
    pics是数组 [{pics: 图片临时路径}]  
    3.
    attrs 商品的参数（数组），包含动态参数和静态属性可以为空
 ```

 #### 18-项目-商品管理-添加商品-表单数据处理-分类和图片
 0. this.form.goods_cat = this.selectOptions.join(',')
 1. 在临时上传成功时 给pics添加元素
 2. 在移除图片
 2.1 findIndex 找索引
 2.2 splice(索引,1)


 ### day-12-重点

 #### 01-项目-商品管理-添加商品-表单数据处理-attr_vals
 1. this.form.attes [{attr_id:?,attr_value:?}]
 2. 动态参数数组+静态参数数组 map遍历 返回新数组arr1和arr2
 3. 合并数组 this.form.attrs = [...arr1, ...arr2]4
 4. 发送请求
 5. 回到商品列表

 #### 02-项目-商品管理-分类参数-新建组件-路由配置
 1. goods/cateparams.vue
 2. 路由配置 path:"/params"

 #### 03-项目-商品管理-分类参数-动态参数-布局-配置级联选择器
 1. el-form > el-form-item > cas级联选择器
 2. 把goodsadd.vue中的级联选择器进行修改
 3. created(){this.getGoodsCate()}

 #### 04-项目-商品管理-分类参数-动态参数-获取动态参数数据
 1. 级联选择器选项发送改变时 同时 选择了三级分类
 > 获取动态参数数组 > 把goodsadd.vue的代码拿过来进行修改

 #### 05-项目-商品管理-分类参数-动态参数-表格渲染
 1. el-table :data="arrDyparams
 2. 属性名称 prop="attr_name"
 3. 第一列 type="expand"

 #### 06-项目-商品管理-分类参数-动态参数-动态编辑 tag-文档-引入
 1. 动态tag编辑
 1.1 删除
 1.2 添加
 > html(el-tag+el-input+el-button)+css+js(handleClose,showInput,handleInputConfirm)

 #### 07-项目-商品管理-分类参数-动态参数-动态编辑 tag-配置-完成
 1. el-tag v-for="tag in props.row.attr_vals"
 2. handleInputConfirm(props.row.attr_vals)
 3. handleClose(props.row.attr_vals, tag)

 #### 08-项目-商品管理-分类参数-动态参数-删除-发送请求
 > attr_vals 以‘,’号分隔、
 > 删除请求的接口 put 请求体 接口文档中没有
 let putData = {
    attr_name: row.attr_name,
    attr_sel: 'many',
    attr_vals: row.attr_vals.join(',')
 }

 #### 09-项目-商品管理-分类参数-动态参数-添加-发送请求
 > handleInputConfirm(props.row)
 > 添加属性值和删除属性值 请求是同一个put请求

 #### 10-项目-商品管理-分类参数-静态参数-布局-获取数据
 1. 点击第二个tag 请求静态参数数组的数据
 2. el-table 布局
 3. 把动态参数的表格进行修改

 #### 11-项目-商品管理-商品分类-准备组件-路由配置
 1. 准备组件 goods/goodscate/vue
 2. 路由配置 path:'/categories'

 #### 12-项目-商品管理-商品分类-准备组件-代码梳理
 1. 对话框中的级联选择器的数据 还未获取

 #### 13-项目-商品管理-商品分类-element-tree-grid-文档-引入
 > 单元格->树形结构->el-table->element-tree-grid
 > 插件名 element-tree-grid -> 增强了el-table的单元格
 1. npm i element-tree-grid --save
 2. 导入
 3. 局部注册
 4. <element-tree-grid></element-tree-grid>
 5. treeKey="" parentKey="" levelKey="" childKey=""

 #### 14-项目-商品管理-商品分类-element-tree-grid-配置
 > treeKey等属性值的来源 el-table :data="list"

 #### 15-项目-商品管理-商品分类-添加分类-打开对话框-获取数据
 1. 点击添加分类按钮 - 打开对话框
 2. 获取二级分类的数据 type=2
 > 不能给三级分类子级添加四级分类

 #### 16-项目-商品管理-商品分类-添加分类-发送请求
 > 只能添加三级分类
 > form: {cat_pid: -1, cat_name: '', cat_level: -1}

 #### 17-项目-合并分支-推送分支-新建分支
 
 #### 18-项目-订单管理-订单列表-准备组件-路由配置
 #### 19-项目-订单管理-订单列表-省市区引入




  
