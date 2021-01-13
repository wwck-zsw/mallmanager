<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-bread level1="权限管理" level2="权限列表"></my-bread>
        <!-- 表格 -->
        <el-table
            class="role-table"
            height="400px"
            :data="rightList"
            border
            style="width: 100%;margin-top:30px;">
            <el-table-column
            type="index"
            label="#"
            width="100">
            </el-table-column>
            <el-table-column
            prop="authName"
            label="权限名称">
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径">
            </el-table-column>
            <el-table-column
            label="层级">
                <template slot-scope="scope">
                    <span v-if="scope.row.level === '0'">一级</span>
                    <span v-if="scope.row.level === '1'">二级</span>
                    <span v-if="scope.row.level === '2'">三级</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 表格
      rightList: []
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    // 获取权限列表的请求
    async getRightList () {
      // 除了请求之外的所有请求 都需要设置请求头
      const res = await this.$http.get(`rights/list`)
      console.info(res)
      const {meta: {status, msg}, data} = res.data
      if (status === 200) {
        // 1.给表格数据赋值
        this.rightList = data
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
</style>
