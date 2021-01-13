<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-bread level1="权限管理" level2="角色列表"></my-bread>
        <el-row class="add-role-btn">
            <el-col>
                <el-button type="info">添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
            class="role-table"
            :data="roleList"
            border
            style="width: 100%;margin-top:30px;">
            <el-table-column
            type="expand">
                <template slot-scope="scope">
                    <el-row v-for="(item1,i) in scope.row.children" :key="i">
                        <el-col :span="4">
                            <el-tag @close="deleRight(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-row v-for="(item2,i) in item1.children" :key="i">
                                <el-col :span="4">
                                  <el-tag @close="deleRight(scope.row, item2.id)" closable type="success">{{item2.authName}}</el-tag>
                                  <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="20">
                                  <el-tag @close="deleRight(scope.row, item3.id)" closable v-for="(item3,i) in item2.children" :key="i" type="warning">
                                    {{item3.authName}}
                                  </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <!-- 无权限的提示 -->
                    <span v-if="scope.row.children.length===0">未分配权限</span>
                </template>
            </el-table-column>
            <el-table-column
            type="index"
            label="#"
            width="100">
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名称">
            </el-table-column>
            <el-table-column
            prop="roleDesc"
            label="角色描述">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button plain type="primary" icon="el-icon-edit" circle
                    @click="showEditUserDia(scope.row)"></el-button>
                    <el-button plain type="success" icon="el-icon-check" circle
                    @click="showSetRightDia(scope.row)"></el-button>
                    <el-button plain type="danger" icon="el-icon-delete" circle
                    @click="showDeleUserMsgBox(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 修改/分配权限 对话框 -->
        <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
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
          <el-tree
            ref="tree"
            :data="treeList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="arrecpand"
            :default-checked-keys="arrcheck"
            :props="defaultProps">
          </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
            <el-button type="primary" @click="setRoleRight()">确 定</el-button>
          </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 表格
      roleList: [],
      dialogFormVisibleRight: false,
      // 树形结构的数据
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      arrecpand: [],
      arrcheck: [],
      currRoleId: -1
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    // 修改权限 - 发送请求
    async setRoleRight () {
      // roleId 当前要修改权限的角色id
      // rids 树形节点中 所有全选和半选的label的id []

      // 获取DOM元素
      // div -> js方法/属性innerText
      // 1. 获取div -> DOM元素
      // 2. DOM.innerText
      // var div = document.getElementById('id')
      // div.innerText;
      // el-tree -> js方法getCheckedKeys
      // 1. 给要操作的dom元素 设置ref属性值 input ref="txt"
      // 2. this.$refs.ref属性值.js方法名() this.$refs.txt.foucs()

      // 获取全选的id数组arr1 getCheckedKeys()
      let arr1 = this.$refs.tree.getCheckedKeys()
      // 获取半选的id数组arr2 getHalfCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()

      // arr1.concat(arr2)
      // arr = arr1 + arr2
      // ES6 展开运算符  ...数组/对象
      let arr = [...arr1, ...arr2]

      // 发送请求
      const res = await this.$http.post(`/roles/${this.currRoleId}/rights`, {rids: arr.join(',')})
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 提示
        this.$message.success(msg)
        this.dialogFormVisibleRight = false
        this.getRoleList()
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 修改/分配权限 - 打开对话框
    async showSetRightDia (role) {
      // 给currRoleId赋值
      this.currRoleId = role.id

      // 获取树形结构的权限数据
      const res = await this.$http.get(`/rights/tree`)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 提示
        this.$message.success(msg)
        this.treeList = res.data.data
        // 展开全部
        var arrtemp1 = []
        this.treeList.forEach(item1 => {
          arrtemp1.push(item1.id)
          item1.children.forEach(item2 => {
            arrtemp1.push(item2.id)
          })
        })
        this.arrecpand = arrtemp1
        // 第二种方法 展开全部
        // el-tree增加属性 default-expand-all

        // 获取当前角色role的权限id
        let arrtemp2 = []
        role.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            item2.children.forEach(item3 => {
              arrtemp2.push(item3.id)
            })
          })
        })
        this.arrcheck = arrtemp2
      } else {
        // 提示
        this.$message.warning(msg)
      }
      this.dialogFormVisibleRight = true
    },
    // 取消权限
    async deleRight (role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 提示
        this.$message.success(msg)
        // 删除成功 返回了200和该角色的剩余权限
        // this.getRoleList()
        role.children = res.data.data
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 获取角色列表的请求
    async getRoleList () {
      // 除了请求之外的所有请求 都需要设置请求头
      const res = await this.$http.get(`roles`)
      console.info(res)
      const {meta: {status, msg}, data} = res.data
      if (status === 200) {
        // 1.给表格数据赋值
        this.roleList = data
        // 3. 提示
        this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
    .add-role-btn{
        margin-top:20px;
    }
</style>

// 布局是行列布局 -> for嵌套
// 这里使用 for嵌套 渲染el-tag
