
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
    <el-table :data="tableData" border highlight-current-row style="width: 100%" :row-style="tableRowStyle" :row-class-name="tableRowClassName">
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
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
      <el-table-column prop="EntryTime" label="入职日期" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="Disabled" label="是否禁用" :formatter="disabledFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="info" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" label-width="80px" prop="UserCode">
              <el-input v-model="ruleForm.UserCode" autocomplete="off" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" label-width="80px" prop="User_Name">
              <el-input v-model="ruleForm.User_Name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" label-width="80px" prop="User_Password">
              <el-input v-model.trim="ruleForm.User_Password" type="password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" label-width="80px" prop="User_Password_confirm">
              <el-input v-model.trim="ruleForm.User_Password_confirm" type="password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄" label-width="80px" prop="Age">
              <el-input v-model.number="ruleForm.Age" type="number" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期" label-width="80px" prop="EntryTime">
              <el-date-picker v-model="ruleForm.EntryTime"  type="date"  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" label-width="80px"  prop="Phone">
              <el-input v-model="ruleForm.Phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" label-width="80px"  prop="Email">
              <el-input v-model="ruleForm.Email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门" label-width="80px">
              <el-cascader :options="deptList" v-model="ruleForm.deptId"  placeholder="请选择部门"></el-cascader>
              <!--<el-select v-model="ruleForm.deptId" placeholder="请选择部门">
    <el-option v-for="item in deptList"
               :key="item.Id"
               :label="item.Department_Name"
               :value="item.Id">
    </el-option>
  </el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" label-width="80px">
              <el-select v-model="ruleForm.roleId" multiple collapse-tags placeholder="请选择角色">
                <el-option v-for="item in roleList" style="width:210px"
                           :key="item.Id"
                           :label="item.Role_Name"
                           :value="item.Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" label-width="80px">
              <el-input type="textarea" v-model="ruleForm.Description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserModels, GetDeptModels, GetRoleModels } from '../api/api'
import { isvalidPhone, isvalidEmail } from '../common/validate'

var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}

var validEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入电子邮箱'))
  } else if (!isvalidEmail(value)) {
    callback(new Error('请输入正确的电子邮箱'))
  } else {
    callback()
  }
}

export default {
  name: 'User',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.User_Password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tableData: [], // 列表集合定义
      deptList: [], // 部门集合定义
      roleList: [], // 角色集合定义
      dialogFormVisible: false,
      ruleForm: {
        UserCode: '',
        User_Name: '',
        User_Password: '',
        User_Password_confirm: '',
        Age: null,
        Phone: '',
        Email: '',
        EntryTime: '',
        deptId: null,
        roleId: null,
        Description: ''
      },
      formLabelWidth: '120px',
      rules: {
        UserCode: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符' }
        ],
        User_Name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符' }
        ],
        User_Password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        User_Password_confirm: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        Phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ],
        Email: [
          { required: true, trigger: 'blur', validator: validEmail }
        ],
        Age: [
          { required: true, message: '请输入年龄', trigger: 'change' },
          { type: 'number', message: '只能输入数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    dateFormat (row, column) {
      var t = new Date(row.EntryTime)
      return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
    },
    disabledFormat (row, column, cellValue) {
      if (cellValue) {
        return '禁用'
      } else {
        return '启用'
      }
    },
    tableRowStyle ({ row, rowIndex }) {
      if (row.Disabled) {
        return { 'background-color': '#bf8383' }
      }
      return ''
    },
    tableRowClassName ({ row, rowIndex }) {
      if (!row.Disabled) {
        // return { 'background-color': 'oldlace !important' }
        return 'warning-row'
      }
      return ''
    },
    handleClick (row) {
      console.log(row)
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      GetDeptModels(null).then(data => {
        if (data.status === 200 && data.data) {
          // this.deptList = this.getDeptList(data.data, null)
          this.deptList = data.data
        }
      })
      GetRoleModels(null).then(data => {
        debugger
        if (data.status === 200 && data.data) {
          this.roleList = data.data
        }
      })
    },
    handleDelete (index, row) {
      alert(3)
      console.log(index, row)
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 如果通过验证 to do...
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getDeptList (data, pid) {
      var result = []
      var temp
      for (var i in data) {
        if (data[i].Parent_Id === pid) {
          result.push(data[i])
          temp = this.getDeptList(data, data[i].Id)
          if (temp.length > 0) {
            data[i].children = temp
          }
        }
      }
      return result
    }
  },
  computed: {},
  created: function () {
    getUserModels(null).then(data => {
      if (data.status === 200 && data.data) {
        this.tableData = data.data
      }
    })
  }
}

</script>

<style lang="css" scoped>
  .el-breadcrumb {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }

  .el-table .warning-row {
    background:#bf8383;
  }

  .el-table .success-row {
    background: oldlace;
  }
</style>
