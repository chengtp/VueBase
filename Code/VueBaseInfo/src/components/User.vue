
<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">系统安全管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-row>
        <el-button type="info">查看 </el-button>
        <el-button type="primary">添加</el-button>
        <el-button type="success">修改</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>
      <br />
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="UserCode" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="User_Name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="Phone" label="手机号码" width="120">
      </el-table-column>
      <el-table-column prop="Email" label="邮箱" width="160">
      </el-table-column>
      <el-table-column prop="Age" label="年龄" width="50">
      </el-table-column>
      <el-table-column prop="CreateTime" label="创建日期">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="info" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserModels } from '../api/api'
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element, { size: 'small', zIndex: 3000 })
export default {
  name: 'User',
  data () {
    return {
      name: '1用户管理',
      tableData: []
    }
  },
  method: {
    handleClick: function (row) {
      console.log(row)
    },
    test: function () {
      var params = null
      getUserModels(params).then(data => {
        debugger
        if (data.data) {
          this.tableData = data.data
        }
      })
    }
  },
  computed: {},
  created: function () {
    getUserModels(null).then(data => {
      if (data.data) {
        this.tableData = data.data
      }
    })
  }
}

</script>

<style lang="css" scoped>
  .el-breadcrumb {
    height: 40px;
    line-height:40px;
    padding-left:10px;
  }
</style>
