<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-bread level1="商品管理" level2="分类参数"></my-bread>
        <!-- 提示 el-alert -->
        <el-alert
          class="alert"
          title="只允许为第三级分类设置参数"
          type="success"
          center
          show-icon>
        </el-alert>
        <!-- 级联选择器 -->
        <el-form label-position="left" label-width="80px">
          <el-form-item label="商品分类">
            <el-cascader
              clearable
              :show-all-levels="false"
              v-model="selectOptions"
              :options="options"
              expandTrigger="hover"
              :props="defaultProp"
              @change="tabChange"></el-cascader>
              <!-- @change="handleChange"></el-cascader> -->
          </el-form-item>
          <!-- tabs -->
          <el-tabs v-model="active" @tab-click="tabChange">
            <el-tab-pane name="1" label="动态参数">
              <!-- 按钮 -->
              <el-button type="danger">设置动态参数</el-button>
              <!-- 表格 -->
              <el-table
                :data="arrDyparams"
                style="width: 100%">
                <el-table-column type="expand" label="#">
                  <template slot-scope="props">
                    <el-tag
                      :key="tag"
                      v-for="tag in props.row.attr_vals"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(props.row, tag)">
                      {{tag}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm(props.row)"
                      @blur="handleInputConfirm(props.row)"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="属性名称"
                  prop="attr_name">
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
            </el-tab-pane>
            <el-tab-pane name="2" label="静态参数">
              <!-- 按钮 -->
              <el-button type="danger">设置静态参数</el-button>
              <!-- 表格 -->
              <el-table
                :data="arrStaticparams"
                style="width: 100%">
                <el-table-column type="index" label="#">
                </el-table-column>
                <el-table-column
                  label="属性名称"
                  prop="attr_name">
                </el-table-column>
                <el-table-column
                  label="属性值"
                  prop="attr_vals">
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
            </el-tab-pane>
          </el-tabs>
        </el-form>
    </el-card>
</template>

<script>

export default {
  data () {
    return {
      // 级联选择器绑定的数据
      selectOptions: [],
      options: [],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态参数的数据数组
      arrDyparams: [],
      // 静态参数的数据数组
      arrStaticparams: [],
      active: '1',
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.getGoodCate()
  },
  methods: {
    // 点击x按钮 移除tag
    async handleClose (row, tag) {
      row.attr_vals.splice(row.attr_vals.indexOf(tag), 1)
      // 发送请求
      // put 请求体{attr_name:?,attr_sel:?,attr_vals:?}
      // attr_name 参数名称 不能为空
      // attr_sel [many,only] 不能为空
      // attr_vals 如果是mant就需要填写值的选项，以逗号分隔
      let putData = {
        attr_name: row.attr_name,
        attr_sel: 'many',
        attr_vals: row.attr_vals.join(',')
      }
      // 获取数据
      const res = await this.$http.put(`categories/${this.selectOptions[2]}/attributes/${row.attr_id}`, putData)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 提示
        this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // 点击newTag按钮 增加tag
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 回车-失去焦点触发
    async handleInputConfirm (row) {
      let inputValue = this.inputValue
      if (inputValue) {
        row.attr_vals.push(inputValue)
        // 发送请求
        // attr_name 参数名称 不能为空
        // attr_sel [many,only] 不能为空
        // attr_vals 如果是mant就需要填写值的选项，以逗号分隔
        let putData = {
          attr_name: row.attr_name,
          attr_sel: 'many',
          attr_vals: row.attr_vals.join(',')
        }
        // 获取数据
        const res = await this.$http.put(`categories/${this.selectOptions[2]}/attributes/${row.attr_id}`, putData)
        console.info(res)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          // 提示
          this.$message.success(msg)
        } else {
          // 提示
          this.$message.warning(msg)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 点击不同的tab时触发
    async tabChange () {
      // 动态参数的数据数组
      this.arrDyparams = []
      // 静态参数的数据数组
      this.arrStaticparams = []
      // 如果点击的是第二个tab时，同时三级分类要有值
      if (this.active === '1') {
        if (this.selectOptions.length !== 3) {
          this.$message.warning('请选择商品的三级分类')
          return
        }
        // 获取数据
        const res = await this.$http.get(`categories/${this.selectOptions[2]}/attributes/?sel=many`)
        console.info(res)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          // 给表格数据赋值
          this.arrDyparams = res.data.data
          // this.arrDyparams每个对象 .attr_vals字符串->数组->v-for
          this.arrDyparams.forEach(item => {
            // 并不是使用的三级分类都有动态参数 -> ""->[]->v-for->报错
            item.attr_vals = item.attr_vals.lenght === 0 ? [] : item.attr_vals.trim().split(',')
          })
          // 提示
          this.$message.success(msg)
        } else {
          // 提示
          this.$message.warning(msg)
        }
      } else if (this.active === '2') {
        if (this.selectOptions.length !== 3) {
          this.$message.warning('请选择商品的三级分类')
          return
        }
        // 获取静态参数数据
        const res = await this.$http.get(`categories/${this.selectOptions[2]}/attributes/?sel=only`)
        console.info(res)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          // 给表格数据赋值
          this.arrStaticparams = res.data.data
          // 提示
          this.$message.success(msg)
        } else {
          // 提示
          this.$message.warning(msg)
        }
      }
    },
    // 级联选择器@change触发的方法
    async handleChange () {
      if (this.selectOptions.length === 3) {
        // 获取数据
        const res = await this.$http.get(`categories/${this.selectOptions[2]}/attributes/?sel=many`)
        console.info(res)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          // 给表格数据赋值
          this.arrDyparams = res.data.data
          // this.arrDyparams每个对象 .attr_vals字符串->数组->v-for
          this.arrDyparams.forEach(item => {
            // 并不是使用的三级分类都有动态参数 -> ""->[]->v-for->报错
            item.attr_vals = item.attr_vals.lenght === 0 ? [] : item.attr_vals.trim().split(',')
          })
          // 提示
          this.$message.success(msg)
        } else {
          // 提示
          this.$message.warning(msg)
        }
      }
    },
    // 获取三级分类的信息
    async getGoodCate () {
      const res = await this.$http.get(`categories?type=3`)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 给表格数据赋值
        this.options = res.data.data
        // 提示
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
    .box-card {
        height: 100%;
    }
    .alert{
      margin: 20px 0;
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
</style>
