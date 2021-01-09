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
        prop="teacherid"
        label="教师编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teachername"
        label="教师姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="coursestatus"
        label="课程状态">
      </el-table-column>
      <el-table-column
        prop="coursetype"
        label="课程类型">
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

  import {listClsCourseByStuId} from '@/api/student'

  export default {
    name: "ClsCourseTab",
    data() {
      return {
        tableData: [],
        //总条数
        total: 0,
        queryParams: {
          page: 1,
          pageSize: 5,
          stuId: undefined
        }
      }
    },
    created() {
      this.getList();
    },
    methods:{
      initData(){
        const StudentId = this.$route.query.username;
        listClsCourseByStuId(StudentId).then(res => {
          console.log(res);
          this.tableData = res;
        })
      },
      getList(){
        this.queryParams.stuId = this.$route.query.username;
        listClsCourseByStuId(this.queryParams).then(res=>{
          this.tableData = res.data;
          this.total = res.recordsTotal;
        })
      }
    }
  }
</script>

<style scoped>

</style>
