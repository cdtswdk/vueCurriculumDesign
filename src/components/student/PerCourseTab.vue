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
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teacherid"
        label="教师编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teachername"
        label="教师名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="courseweek"
        label="上课时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="coursedaynum"
        label="上课节数"
        width="180">
        <template slot-scope="scope">
          第{{scope.row.coursedaynum}}节
        </template>
      </el-table-column>
      <el-table-column
        prop="coursestatus"
        label="状态"
        width="180">
        <template slot-scope="scope">
          {{courseStatus[scope.row.coursestatus]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="coursetype"
        label="类型"
        width="180">
        <template slot-scope="scope">
          {{courseType[scope.row.coursetype]}}
        </template>
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

  import {listStuCourseByStuId} from '@/api/student'

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
        courseStatus: ['未结课', '已结课'],
        courseType: ['选修课', '必修课'],
      }
    },
    created() {
      this.getList();
    },
    methods:{
      getList(){
        this.queryParams.stuId = this.$route.query.username;
        listStuCourseByStuId(this.queryParams).then(res=>{
          this.tableData = res.data;
          this.total = res.recordsTotal;
        })
      }
    }
  }
</script>

<style scoped>

</style>
