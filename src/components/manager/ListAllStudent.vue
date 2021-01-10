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
        prop="grade"
        label="成绩">
      </el-table-column>
      <el-table-column
        prop="gradepoint"
        label="绩点">
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
    name: "ListAllStudent",
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
