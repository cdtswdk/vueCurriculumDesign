<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="teacherid"
        label="教师编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teachername"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deptname"
        label="学院"
        width="180">
      </el-table-column>
      <el-table-column
        prop="majorname"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="teachersex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="teacherbirthday"
        label="出生日期">
        <template slot-scope="scope">
          {{formatDate(scope.row.teacherbirthday)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="teacherdesc"
        label="简介">
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>

  import {listAllTeaByManagerId} from '@/api/manager'

  export default {
    name: "ListAllTeacher",
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
        listAllTeaByManagerId(this.queryParams).then(res => {
          this.tableData = res.data;
          this.total = res.recordsTotal;
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
