<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <my-bread level1="数据统计" level2="数据报表" class="bread"></my-bread>
        <!-- echarts容器 -->
        <div id="main" style="width:600px;height:400px"></div>
    </el-card>
</template>

<script>
var myEchart = require('echarts')
export default {
  data () {
    return {
      option2: {}
    }
  },
  created () {
    // 因为要操作dom元素，就不能在这里调用了
    // this.useEchart()
  },
  mounted () {
    this.useEchart()
  },
  methods: {
    async useEchart () {
      // 1. init
      var myChart = myEchart.init(document.getElementById('main'))
      // 2. option
      // 获取表格数据
      const res = await this.$http.get(`reports/type/1`)
      console.info(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        // 1.给表格数据赋值
        this.option2 = res.data.data
        // 提示
        this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
      let option1 = {
        title: {
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }
      // ES6 展开运算符
      let option = {...option1, ...this.option2}
      // 3. setOption
      myChart.setOption(option)
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
