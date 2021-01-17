<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-bread level1="商品管理" level2="商品列表"></my-bread>
        <!-- 提示 el-alert -->
        <el-alert
          class="alert"
          title="添加商品信息"
          type="success"
          center
          show-icon>
        </el-alert>
        <!-- 步骤条 el-steps -->
        <el-steps :active="1*active" finish-status="success" simple style="margin: 20px 0">
          <el-step title="基本信息" ></el-step>
          <el-step title="商品参数" ></el-step>
          <el-step title="商品属性" ></el-step>
          <el-step title="商品图片" ></el-step>
          <el-step title="商品内容" ></el-step>
        </el-steps>
        <!-- 最外面是el-form -->
        <el-form label-position="top" label-width="80px" :model="form"
          style="height: 650px;overflow=auto;">
          <el-tabs v-model="active" :tab-position="tabPosition" @tab-click="tabChange">
            <el-tab-pane name="1" label="基本信息">
              <el-form-item label="商品名称">
                <el-input v-model="form.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格">
                <el-input v-model="form.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量">
                <el-input v-model="form.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量">
                <el-input v-model="form.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                  <el-cascader
                    clearable
                    v-model="selectOptions"
                    :options="options"
                    expandTrigger="hover"
                    :props="defaultProp"
                    @change="handleChange"></el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="2" label="商品参数">
              <el-form-item
                v-for="(item1,i) in arrDyparams"
                :key="i"
                :label="item1.attr_name">
                <!-- 复选框组 -->
                <!--  el-checkbox-group 不绑定属性 v-model="item1.attr_vals" 时
                      报错：Cannot read property 'length' of undefined"
                 -->
                <el-checkbox-group v-model="item1.attr_vals">
                  <el-checkbox :label="item2" v-for="(item2, i) in item1.attr_vals" :key="i" border></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="3" label="商品属性">
              <!-- 静态参数的数据 -->
              <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaticparams" :key="i">
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="4" label="商品图片">
              <el-form-item>
                <el-upload
                  action="http://127.0.0.1:8888/api/private/v1/upload"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="5" label="商品内容">
              <el-form-item>
                <!-- 添加按钮 -->
                <el-button type="success" @click="addGoods()">添加商品</el-button>
                <!-- 富文本 -->
                <quill-editor class="editor" v-model="form.goods_introduce"></quill-editor>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
    </el-card>
</template>

<script>
// 富文本
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      tabPosition: 'left',
      active: '1',
      // 添加商品的表单数据
      form: {
        // 商品名称 不能为空
        goods_name: '',
        // 以为','分割的分类列表  不能为空 -> 级联选择器绑定的数据 selectOptions
        goods_cat: '',
        // 价格 不能为空
        goods_price: '',
        // 数量 不能为空
        goods_number: '',
        // 重量 不能为空
        goods_weight: '',
        // 介绍  可以为空
        goods_introduce: '',
        // 上传的图片临时路径（对象）可以为空
        pics: [],
        // 商品的参数（数组），包含动态参数和静态属性可以为空
        attrs: []
      },
      // 级联选择器绑定的数据
      selectOptions: [1, 3, 6],
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
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getGoodCate()
  },
  methods: {
    // 添加商品
    async addGoods () {
      // 在发送请求之前 处理form中未处理的数据
      // goods_cat -> 分类
      this.form.goods_cat = this.selectOptions.join(',')

      // pics:[] {pics:?} 在上传和移除图片时 进行赋值和删除

      // attrs [{attr_id:?,attr_value:?}]
      // 遍历+取值+放在一个新数组中
      let arr1 = this.arrDyparams.map((item) => {
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      let arr2 = this.arrStaticparams.map((item) => {
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      this.form.attrs = [...arr1, ...arr2]

      // 获取数据
      const res = await this.$http.post(`goods`, this.form)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 201) {
        // 提示
        this.$message.success(msg)
        // 回到商品列表
        this.$router.push({name: 'goods'})
      } else {
        // 提示
        this.$message.warning(msg)
      }
    },
    // file形参里面是当前操作的图片的相关信息（图片名/图片路径）
    // 图片上传-预览
    handlePreview (file) {},
    // 图片上传-移除
    handleRemove (file) {
      // file.response.data.tmp_path 图片临时上传的路径
      // findIndex() 遍历数组 把符合条件的元素的索引进行返回
      let index = this.form.pics.findIndex((item) => {
        return item.pics === file.response.data.tmp_path
      })
      this.form.pics.splice(index, 1)
    },
    // 图片上传-成功
    handleSuccess (file) {
      // file.data.tmp_path 图片临时上传的路径
      this.form.pics.push({
        pics: file.data.tmp_path
      })
    },
    // 点击不同的tab时触发
    async tabChange () {
      // 如果点击的是第二个tab时，同时三级分类要有值
      if (this.active === '2') {
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
      } else if (this.active === '3') {
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
    handleChange () {

    },
    // 获取三级分类的信息
    async getGoodCate () {
      const res = await this.$http.get(`categories?typr=3`)
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
    },
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
    }
  }
}
</script>

<style>
    .box-card {
        height: 100%;
    }
    .alert{
      margin-top: 20px;
    }
    .editor{
      margin-top: 20px;
    }
    .ql-editor{
      min-height: 300px;
    }
</style>
