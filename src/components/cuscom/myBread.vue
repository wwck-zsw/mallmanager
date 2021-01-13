<template>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  // 组件的名称
  name: 'my-bread',
  // props 值 字符串数组
  // props中值的用法和data数据用法一样
  // props中数据的值来源于使用组件时传递的值
  // props中的数据也是该组件的属性 <child-a :msg="abc">

  // props就是用来接受父组件传递过来的值
  props: ['level1', 'level2']
}
</script>

<style>
</style>
