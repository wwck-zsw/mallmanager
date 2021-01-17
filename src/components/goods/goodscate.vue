<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-bread level1="商品管理" level2="商品分类"></my-bread>
        <!-- 按钮 -->
        <el-button type="success" class="alert" @click="addGoodsCate()">添加分类</el-button>
        <!-- 表格 -->
        <el-table
            :data="list"
            style="width: 100%">
            <!-- <el-table-column label="分类名称" prop="cat_name"></el-table-column> -->
            <!--
                treeKey -> nodeKey -> 节点唯一标识
                parentKey -> 父节点的id
                levelKey -> 当前节点的级别
                childKey -> 子节点
            -->
            <el-tree-grid  label="分类名称" prop="cat_name"
                treeKey="cat_id"
                parentKey="cat_pid"
                levelKey="cat_level"
                childKey="children"
            >
            </el-tree-grid>
            <el-table-column
                label="级别">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_level === 0">一级</span>
                    <span v-if="scope.row.cat_level === 1">二级</span>
                    <span v-if="scope.row.cat_level === 2">三级</span>
                </template>
            </el-table-column>
            <el-table-column
                label="是否有效">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_deleted === false">有效</span>
                    <span v-if="scope.row.cat_deleted === true">无效</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                <el-button plain type="primary" icon="el-icon-edit" circle></el-button>
                <el-button plain type="danger" icon="el-icon-delete" circle
                @click="showDeleUserMsgBox(scope.row.cat_id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 添加分类的对话框 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item label="分类名称" label-width="120px">
                    <el-input v-model="form.cat_name" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 级联选择器 -->
                <el-form-item label="分类" label-width="120px">
                  <el-cascader
                    clearable
                    v-model="selectOptions"
                    :options="caslist"
                    expandTrigger="hover"
                    :props="defaultProp"
                    @change="handleChange"></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addCate()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
// 引入element-tree-grid
var ElTreeGrid = require('element-tree-grid')
export default {
  components: {
    ElTreeGrid
  },
  data () {
    return {
      pagenum: 1,
      pagesize: 10,
      total: 0,
      list: [],
      dialogFormVisibleAdd: false,
      // 级联选择器绑定的数据
      selectOptions: [],
      options: [],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      caslist: [],
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: -1
      }
    }
  },
  created () {
    this.getGoodCate()
  },
  methods: {
    // 删除分类
    showDeleUserMsgBox (id) {
      console.info(id)
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除用户请求
        // data中找userId
        // 把userId以showDeleUserMsgBox参数形式传进来
        const res = await this.$http.delete(`categories/${id}`)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.getGoodCate()
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
    // 添加分类-发送请求
    async addCate () {
      // cat_pid 分类父id 不能为空
      // cat_name: 分类名称 不能为空
      // cat_level: 分类层级 不能为空

      // 三种情况
      // 1. 一级分类 selectOptions.length===0 cat_pid=0 cat_level=0
      // 2. 二级分类 selectOptions.length===1 cat_pid=selectOptions[0] cat_level=1
      // 3. 三级分类 selectOptions.length===2 cat_pid=selectOptions[1] cat_level=2
      if (this.selectOptions.length === 0) {
        this.form.cat_pid = 0
        this.form.cat_level = 0
      } else if (this.selectOptions.length === 1) {
        this.form.cat_pid = this.selectOptions[0]
        this.form.cat_level = 1
      } else if (this.selectOptions.length === 2) {
        this.form.cat_pid = this.selectOptions[1]
        this.form.cat_level = 2
      }
      // 发送请求
      const res = await this.$http.post(`categories`, this.form)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 201) {
        // 提示
        this.$message.success(msg)
        this.dialogFormVisibleAdd = false
        this.form = {}
        this.getGoodCate()
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 添加分类-显示对话框
    async addGoodsCate () {
      // 获取二级分类数据
      // 获取数据
      const res = await this.$http.get(`categories?type=2`)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 赋值
        this.caslist = res.data.data
        // 提示
        this.$message.success(msg)
        this.dialogFormVisibleAdd = true
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 级联选择器改变时触发
    handleChange () {
    },
    // 获取所有分类
    async getGoodCate () {
      const res = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 给表格数据赋值
        this.list = res.data.data.result
        // 给total赋值
        this.total = res.data.data.total
        // 提示
        this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 分页相关方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 回到第一页
      this.pagenum = 1
      this.pagesize = val
      this.getGoodCate()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getGoodCate()
    }
  }
}
</script>

<style>
    .box-card {
        height: 100%;
    }
    .alert{
      margin: 20px 0;
    }
</style>
