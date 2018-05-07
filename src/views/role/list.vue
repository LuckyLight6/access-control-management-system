<template>
  <div class="app-container">
    <div class="tool-bar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="addRole">新增角色</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="banSelectionRole">禁用选中角色</el-button>
        <el-button type="success" icon="el-icon-check" @click="allowSelectionRole">启用选中角色</el-button>
      </el-button-group>
    </div>

    <div>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" header-align="center" width="50">
        </el-table-column>
        <el-table-column label='Id' align="center" header-align="center"  prop="roleId">
        </el-table-column>
        <el-table-column label="角色名称" align="center" header-align="center" prop="roleName">
        </el-table-column>
        <el-table-column label="状态"
          align="center"
          header-align="center"
          prop="status"
          :filters="[{ text: '启用', value: 1 }, { text: '禁用', value: 0 }]"
          :filter-method="statusFilter"
          filter-placement="bottom"
          width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status === 1 ? '启用' : '禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" header-align="center" label="创建时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="updateTime" label="更新时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.updateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" plain @click="editRole(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status === 1" slot="reference" size="mini" type="danger" @click="banRole(scope.row)">禁用</el-button>
            <el-button v-else slot="reference" size="mini" type="success" @click="allowRole(scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
import { banSelectionRole } from '@/api/role'
import { banRole } from '@/api/role'
import { allowSelectionRole } from '@/api/role'
import { allowRole } from '@/api/role'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRoleList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    statusFilter(value, row) {
      return row.status === value
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    addRole() {
      this.$router.push({
        name: 'RoleAdd'
      })
    },
    banSelectionRole() {
      if (this.multipleSelection == null || this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '请至少选择一项'
        })
        return
      }

      this.$confirm('确定禁用选中角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 1) {
            ids.push(this.multipleSelection[i].roleId)
          }
        }

        banSelectionRole(ids).then(response => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消禁用'
        })
      })
    },
    allowSelectionRole() {
      if (this.multipleSelection == null || this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '请至少选择一项'
        })
        return
      }

      this.$confirm('确定启用选中角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 0) {
            ids.push(this.multipleSelection[i].roleId)
          }
        }

        allowSelectionRole(ids).then(response => {
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消启用'
        })
      })
    },
    banRole(role) {
      if (role.status === 0) {
        return
      }

      banRole(role.roleId).then(response => {
        this.$message({
          message: '禁用成功！',
          type: 'success'
        })
        this.fetchData()
      })
    },
    allowRole(role) {
      if (role.status === 1) {
        return
      }

      allowRole(role.roleId).then(response => {
        this.$message({
          message: '启用成功！',
          type: 'success'
        })
        this.fetchData()
      })
    },
    editRole(role) {
      this.$router.push({
        name: 'RoleEdit',
        params: role
      })
    }
  }
}
</script>

<style>
  .app-container .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    vertical-align: middle;
  }

  .app-container .tool-bar {
    margin-bottom: 20px;
  }
</style>