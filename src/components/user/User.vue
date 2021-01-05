<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="userData"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名"
        width="120">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {listUser, getUserById} from '@/api/user'

  export default {
    name: "User",
    data() {
      return {
        userData: [],
        multipleSelection: []
      }
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        listUser().then(resp => {
          this.userData = resp;
        })
      }
    }
  }
</script>

<style scoped>

</style>
