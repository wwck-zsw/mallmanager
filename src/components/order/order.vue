<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-bread level1="订单管理" level2="订单列表" class="bread"></my-bread>
        <!-- 表格 -->
        <el-table
            max-height="700px"
            :data="list"
            style="width: 100%">
            <el-table-column
                type="index"
                label="#"
                width="60">
            </el-table-column>
            <el-table-column
                prop="order_number"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="order_price"
                label="订单价格(元)">
            </el-table-column>
            <el-table-column
                label="是否付款">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.order_pay === '0'">已付款</el-tag>
                    <el-tag v-if="scope.row.order_pay === '1'">未付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="is_send"
                label="是否发货">
            </el-table-column>
            <el-table-column
                label="下单时间">
                <template slot-scope="goodsList">
                    {{goodsList.row.add_time | fmtdate}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button plain type="primary" icon="el-icon-edit" circle @click="showEditdia(scope.row)"></el-button>
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
        <!-- 修改订单地址的对话框 -->
        <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <!-- 级联选择器 -->
                <el-form-item label="分类" label-width="120px">
                  <el-cascader
                    clearable
                    v-model="selectOptions"
                    :options="catlist"
                    expandTrigger="hover"></el-cascader>
                </el-form-item>

                <el-form-item label="详细地址" label-width="120px">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
// .vue 引入.js库（swiper.js/zepto.js/iscroll.js/wow.js(整屏滚动)）
import Citydata from '@/components/order/citydata.js'
export default {
  data () {
    return {
      list: [],
      // 表格
      form: {
        address: ''
      },
      // 分页
      pagenum: 1,
      pagesize: 10,
      total: 0,
      // 级联选择器绑定的数据
      selectOptions: [],
      catlist: [],
      dialogFormVisible: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 修改地址-打开对话框
    showEditdia () {
      this.catlist = Citydata
      this.dialogFormVisible = true
    },
    // 获取商品列表的请求
    async getData () {
      // query 查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数 不能为空

      const res = await this.$http.get(`orders?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 1.给表格数据赋值
        this.list = res.data.data.goods
        // 2.给total赋值
        this.total = res.data.data.total
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
      this.getData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getData()
    }
  }
}
</script>

<style>
    .box-card {
        height: 100%;
    }
    .bread {
        margin-bottom: 20px;
    }
</style>
