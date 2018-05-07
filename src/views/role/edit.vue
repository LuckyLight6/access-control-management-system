<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="权限列表" prop="permissionList">
        <span v-if="useablePermission.length === 0">
          <el-tag type="info">暂无数据</el-tag>
        </span>
        <el-checkbox-group v-model="form.permissionList" v-else>
          <el-checkbox
            v-for="item in useablePermission"
            :key="item.permissionId"
            :label="item.permissionId"
            border>
          {{item.permissionName}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="onReset('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUsablePermission } from '@/api/permission'
import { updateRole } from '@/api/role'
import { getRolePermission } from '@/api/role'

export default {
  data() {
    return {
      useablePermission: [],
      form: {
        roleId: this.$route.params.roleId,
        roleName: this.$route.params.roleName,
        permissionList: []
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUsablePermission().then(response => {
        this.useablePermission = response.data.permissionList
      })

      getRolePermission(this.$route.params.roleId).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.form.permissionList.push(response.data[i].permissionId)
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateRole(this.form).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })

            this.$router.push({
              name: 'RoleList'
            })
          })
        }
      })
    },
    onReset(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
