<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-bread level1="商品管理" level2="商品列表"></my-bread>
        <!-- 搜索 -->
        <el-row class="searchRow">
            <el-col>
                <el-input placeholder="请输入内容" v-model="query" class="inputSearch"
                clearable @clear="searchUser()">
                    <el-button slot="append" @click="searchUser()" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success"  @click="$router.push({name:'goodsadd'})">添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
            max-height="700px"
            :data="goodsList"
            style="width: 100%">
            <el-table-column
                type="index"
                label="#"
                width="60">
            </el-table-column>
            <el-table-column
                prop="goods_name"
                label="商品名称">
            </el-table-column>
            <el-table-column
                prop="goods_price"
                label="商品价格(元)">
            </el-table-column>
            <el-table-column
                prop="goods_weight"
                label="商品重量">
            </el-table-column>
            <el-table-column
                label="创建时间">
                <template slot-scope="goodsList">
                    {{goodsList.row.add_time | fmtdate}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button plain type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button plain type="danger" icon="el-icon-delete" circle
                    @click="showDeleUserMsgBox(scope.row.goods_id)"></el-button>
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
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      // 表格
      goodsList: [],
      // 分页
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  created () {
    this.getgoodsList()
  },
  methods: {
    showDeleUserMsgBox (userId) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除商品请求
        // data中找userId
        // 把userId以showDeleUserMsgBox参数形式传进来
        const res = await this.$http.delete(`goods/${userId}`)
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
    // 获取商品列表的请求
    async getgoodsList () {
      // query 查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数 不能为空

      const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.info(res)
      const {meta: {status, msg}, data: {goods, total}} = res.data
      if (status === 200) {
        // 1.给表格数据赋值
        this.goodsList = goods
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
      // 回到第一页
      this.pagenum = 1
      this.pagesize = val
      this.getgoodsList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getgoodsList()
    },
    // 搜索功能
    searchUser () {
      // 按照input绑定的query参数 发请求
      this.getgoodsList()
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
