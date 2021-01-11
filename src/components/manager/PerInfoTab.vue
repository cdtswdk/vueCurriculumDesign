<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="managerid"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deptname"
        label="所在学院"
        width="180">
      </el-table-column>
      <el-table-column
        prop="majorname"
        label="所在专业">
      </el-table-column>
      <el-table-column
        prop="managername"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="managersex"
        label="性别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="managerbirthday"
        label="出生日期"
        width="180">
        <template slot-scope="scope">
          {{formatDate(scope.row.managerbirthday)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getPersonInfo} from '@/api/manager'

  export default {
    name: "PerInfoTab",
    data() {
      return {
        tableData: [],
        //总条数
        total: 0,
        queryParams: {
          page: 1,
          pageSize: 5,
          managerId: undefined
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.queryParams.managerId = this.$route.query.username;
        getPersonInfo(this.queryParams).then(res => {
          this.tableData = res.data;
        })
      },
      formatDate(inputDate) {
        let date = new Date(inputDate);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      }
    }
  }
</script>

<style scoped>

</style>
