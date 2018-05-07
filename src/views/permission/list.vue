<template>
  <div class="app-container">
    <div class="tool-bar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="addPermission">新增权限</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="banSelectionPermission">禁用选中权限</el-button>
        <el-button type="success" icon="el-icon-check" @click="allowSelectionPermission">启用选中权限</el-button>
      </el-button-group>
    </div>

    <div>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" header-align="center" width="50">
        </el-table-column>
        <el-table-column label='Id' align="center" header-align="center" prop="permissionId">
        </el-table-column>
        <el-table-column label="权限名称" align="center" header-align="center" prop="permissionName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="权限 IP" align="center" header-align="center" prop="permissionIp" width="130">
        </el-table-column>
        <el-table-column label="权限端口" align="center" header-align="center" prop="permissionPort" width="80">
          <template slot-scope="scope">{{scope.row.permissionPort == null ? '无' : scope.row.permissionPort}}</template>
        </el-table-column>
        <el-table-column label="权限详情" align="left" header-align="center" prop="remark" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="流表 Id" align="center" header-align="center" prop="flowId">
        </el-table-column>
        <el-table-column label="流表内容" align="left" header-align="center" prop="flowBody">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <pre>{{JSON.stringify(JSON.parse(scope.row.flowBody), null, 2)}}</pre>
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.flowBody }}</el-tag>
              </div>
            </el-popover>
          </template>
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
            <el-button size="mini" plain @click="editUser(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status === 1" slot="reference" size="mini" type="danger" @click="banPermission(scope.row)">禁用</el-button>
            <el-button v-else slot="reference" size="mini" type="success" @click="allowPermission(scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 20px; float: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100, 200]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { banPermission } from '@/api/permission'
import { allowPermission } from '@/api/permission'
import { banSelectionPermission } from '@/api/permission'
import { allowSelectionPermission } from '@/api/permission'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPermissionList(this.listQuery).then(response => {
        this.list = response.data.permissionList
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    statusFilter(value, row) {
      return row.status === value
    },
    addPermission() {
      this.$router.push({
        name: 'PermissionAdd'
      })
    },
    banSelectionPermission() {
      if (this.multipleSelection == null || this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '请至少选择一项'
        })
        return
      }

      this.$confirm('确定禁用选中权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 1) {
            ids.push(this.multipleSelection[i].permissionId)
          }
        }

        banSelectionPermission(ids).then(response => {
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
    allowSelectionPermission() {
      if (this.multipleSelection == null || this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '请至少选择一项'
        })
        return
      }

      this.$confirm('确定启用选中权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 0) {
            ids.push(this.multipleSelection[i].permissionId)
          }
        }

        allowSelectionPermission(ids).then(response => {
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
    banPermission(permission) {
      if (permission.status === 0) {
        return
      }

      banPermission(permission.permissionId).then(response => {
        this.$message({
          message: '禁用成功！',
          type: 'success'
        })
        this.fetchData()
      })
    },
    allowPermission(permission) {
      if (permission.status === 1) {
        return
      }

      allowPermission(permission.permissionId).then(response => {
        this.$message({
          message: '启用成功！',
          type: 'success'
        })
        this.fetchData()
      })
    },
    editUser(permission) {
      this.$router.push({
        name: 'PermissionEdit',
        params: permission
      })
    }
  }
}
</script>

<style>
  .app-container .tool-bar {
    margin-bottom: 20px;
  }
</style>