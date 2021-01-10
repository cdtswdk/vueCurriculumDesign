<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="courseid"
        label="课程编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="teacherid"
        label="教师编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="coursename"
        label="名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="coursecredit"
        label="学分"
        width="100">
      </el-table-column>
      <el-table-column
        prop="coursehours"
        label="学时"
        width="100">
      </el-table-column>
      <el-table-column
        prop="coursecreatetime"
        label="创建时间"
        width="160">
        <template slot-scope="scope">
          {{formatDateTime(scope.row.coursecreatetime)}}
        </template>
      </el-table-column>
      <el-table-columnd
        prop="coursestarttime"
        label="开始时间"
        width="100">
        <template slot-scope="scope">
          {{formatDate(scope.row.coursestarttime)}}
        </template>
      </el-table-columnd>
      <el-table-column
        prop="courseendtime"
        label="结束时间"
        width="100">
        <template slot-scope="scope">
          {{formatDate(scope.row.courseendtime)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="courseweek"
        label="上课时间(星期)"
        width="100">
        <template slot-scope="scope">
          {{scope.row.courseweek}}
        </template>
      </el-table-column>
      <el-table-column
        prop="coursedaynum"
        label="上课时间(节数)"
        width="120">
        <template slot-scope="scope">
          {{scope.row.coursedaynum}}
        </template>
      </el-table-column>
      <el-table-column
        prop="coursestatus"
        label="课程状态"
        width="100">
        <template slot-scope="scope">
          {{courseStatus[scope.row.coursestatus]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="coursetype"
        label="课程类型"
        width="100">
        <template slot-scope="scope">
          {{courseType[scope.row.coursetype]}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="50">
        <el-button type="primary" size="mini">查询选课学生信息</el-button>
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

  import {listTeaCourseByTeaId} from '@/api/teacher'

  export default {
    name: "PerCourseTab",
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
        courseStatus:['未结课','已结课'],
        courseType:['选修课','必修课']
      }
    },
    created() {
      this.getList();
    },
    methods:{
      getList(){
        this.queryParams.stuId = this.$route.query.username;
        listTeaCourseByTeaId(this.queryParams).then(res=>{
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
