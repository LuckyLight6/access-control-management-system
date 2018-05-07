<template>
  <div class="app-container">
    <div class="tool-bar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="addUser">新增用户</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="banSelectionUser">禁用选中用户</el-button>
        <el-button type="success" icon="el-icon-check" @click="allowSelectionUser">启用选中用户</el-button>
      </el-button-group>
    </div>

    <div>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border  @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" header-align="center" width="50">
        </el-table-column>
        <el-table-column align="center" header-align="center" label='Id' prop="id">
        </el-table-column>
        <el-table-column label="用户名" align="center" header-align="center" prop="username">
        </el-table-column>
        <el-table-column label="头像" align="center" header-align="center" width="60">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" class="user-avatar" />
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center" header-align="center" prop="roleName">
        </el-table-column>
        <el-table-column label="电话" align="center" header-align="center" prop="mobile">
          <template slot-scope="scope">{{scope.row.mobile == null ? '无' : scope.row.mobile}}</template>
        </el-table-column>
        <el-table-column label="邮箱" align="center" header-align="center" prop="email">
          <template slot-scope="scope">{{scope.row.email == null ? '无' : scope.row.email}}</template>
        </el-table-column>
        <el-table-column
          label="状态"
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
            <el-button v-if="scope.row.status === 1" slot="reference" size="mini" type="danger" @click="banUser(scope.row)">禁用</el-button>
            <el-button v-else slot="reference" size="mini" type="success" @click="allowUser(scope.row)">启用</el-button>
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
import { getUserList } from '@/api/user'
import { banSelectionUser } from '@/api/user'
import { banUser } from '@/api/user'
import { allowSelectionUser } from '@/api/user'
import { allowUser } from '@/api/user'

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
      getUserList(this.listQuery).then(response => {
        this.list = response.data.userList
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    statusFilter(value, row) {
      return row.status === value
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    addUser() {
      this.$router.push({
        name: 'UserAdd'
      })
    },
    banSelectionUser() {
      if (this.multipleSelection == null || this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '请至少选择一项'
        })
        return
      }

      this.$confirm('确定禁用选中用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 1) {
            ids.push(this.multipleSelection[i].id)
          }
        }

        banSelectionUser(ids).then(response => {
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
    allowSelectionUser() {
      if (this.multipleSelection == null || this.multipleSelection.length === 0) {
        this.$message({
          type: 'info',
          message: '请至少选择一项'
        })
        return
      }

      this.$confirm('确定启用选中用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 0) {
            ids.push(this.multipleSelection[i].id)
          }
        }

        allowSelectionUser(ids).then(response => {
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
    banUser(user) {
      if (user.status === 0) {
        return
      }

      banUser(user.id).then(response => {
        this.$message({
          message: '禁用成功！',
          type: 'success'
        })
        this.fetchData()
      })
    },
    allowUser(user) {
      if (user.status === 1) {
        return
      }

      allowUser(user.id).then(response => {
        this.$message({
          message: '启用成功！',
          type: 'success'
        })
        this.fetchData()
      })
    },
    editUser(user) {
      this.$router.push({
        name: 'UserEdit',
        params: user
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