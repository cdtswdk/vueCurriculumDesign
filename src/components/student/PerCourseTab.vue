<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="coursenum"
        label="课程编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teachernum"
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
  </div>
</template>

<script>

  import {getStuCourse} from '@/api/student'

  export default {
    name: "PerCourseTab",
    data() {
      return {
        tableData: []
      }
    },
    created() {
      const StudentNum = this.$route.query.username;
      getStuCourse(StudentNum).then(res=>{
        console.log(res);
        this.tableData = res;
      })
    }
  }
</script>

<style scoped>

</style>
