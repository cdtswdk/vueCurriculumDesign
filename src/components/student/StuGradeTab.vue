<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="courseid"
        label="课程编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="coursename"
        label="课程名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="coursestatus"
        label="课程状态">
        <template slot-scope="scope">
          {{courseStatus[scope.row.coursestatus]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="coursetype"
        label="课程类型">
        <template slot-scope="scope">
          {{courseType[scope.row.coursetype]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="grade"
        label="成绩"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gradepoint"
        label="绩点"
        width="180">
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
  import {listStuGradeByStuId} from '@/api/student'

  export default {
    name: "StuGradeTab",
    data() {
      return {
        tableData: [],
        //总条数
        total: 0,
        queryParams: {
          page: 1,
          pageSize: 5,
          stuId: undefined
        },
        courseStatus: ['未结课', '已结课'],
        courseType: ['选修课', '必修课']
      }
    },
    created() {
      this.getList();
    },
    methods: {
      initData() {
        const StudentId = this.$route.query.username;
        listStuGradeByStuId(StudentId).then(res => {
          console.log(res);
          this.tableData = res;
        })
      },
      getList() {
        this.queryParams.stuId = this.$route.query.username;
        listStuGradeByStuId(this.queryParams).then(res => {
          this.tableData = res.data;
          this.total = res.recordsTotal;
        })
      }
    }
  }
</script>

<style scoped>

</style>
