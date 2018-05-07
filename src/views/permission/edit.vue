<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="权限名称" prop="permissionName">
        <el-input v-model="form.permissionName" placeholder="请输入权限名称"></el-input>
      </el-form-item>
      <el-form-item label="IP 地址" prop="permissionIp">
        <el-input v-model="form.permissionIp" placeholder="请输入 IP 地址"></el-input>
      </el-form-item>
      <el-form-item label="端口号" prop="permissionPort">
        <el-input v-model="form.permissionPort" type="number" placeholder="请输入端口号"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 25}"
          placeholder="请输入描述"
          v-model="form.remark">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="onReset('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePermission } from '@/api/permission'

export default {
  data() {
    return {
      roleList: null,
      form: {
        permissionId: this.$route.params.permissionId,
        permissionName: this.$route.params.permissionName,
        permissionIp: this.$route.params.permissionIp,
        permissionPort: this.$route.params.permissionPort,
        remark: this.$route.params.remark,
        flowId: this.$route.params.flowId
      },
      rules: {
        permissionName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        permissionIp: [
          { required: true, message: '请输入 IP 地址', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePermission(this.form).then(response => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })

            this.$router.push({
              name: 'PermissionList'
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
