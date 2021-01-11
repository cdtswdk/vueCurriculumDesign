<template>
  <div>
    <el-form :model="queryParams" :inline="true" ref="queryForm" label-width="100px">
      <el-form-item label="课程名称:">
        <el-select v-model="queryParams.courseId" filterable placeholder="请选择">
          <el-option
            v-for="item in courseOptions"
            :key="item.courseid"
            :label="item.coursename"
            :value="item.courseid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">清空条件</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="studentid"
        label="学生编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="studentname"
        label="学生名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="coursename"
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deptname"
        label="学院"
        width="180">
      </el-table-column>
      <el-table-column
        prop="majorname"
        label="专业"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">登分</el-button>
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

    <!--添加对话框-->
    <el-dialog :title="title" :visible.sync="open" width="600px" :close-on-click-modal="false">
      <el-form ref="updateForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="学生id:" prop="studentid">
          <el-input :disabled="true" v-model.number="form.studentid" placeholder="请输入学生id" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="学生名字:" prop="studentname">
          <el-input :disabled="true" v-model="form.studentname" placeholder="请输入学生名字" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="课程名称:" prop="coursename">
          <el-input :disabled="true" v-model="form.coursename" placeholder="请输入课程名称" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="成绩:" prop="grade">
          <el-input v-model="form.grade" placeholder="请输入成绩" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="绩点:" prop="gradepoint">
          <el-input v-model="form.gradepoint" placeholder="请输入绩点" style="width: 450px"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {listTeaCourseByTeaId, listSelCourseByCourseIdAndTeacherId,updateStuCourseGrade} from '@/api/teacher'

  export default {
    name: "GiveCourseGradeTab",
    data() {
      return {
        tableData: [],
        //总条数
        total: 0,
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        queryParams: {
          page: 1,
          pageSize: 5,
          teacherId: undefined,
          courseId: undefined
        },
        form: {},//更新课程数据
        courseOptions: [],
        rules: {
          grade: [
            {required: true, message: "课程成绩不能为空！", trigger: "blur"}
          ],
          gradepoint: [
            {required: true, message: "课程绩点不能为空！", trigger: "blur"}
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.queryParams.teacherId = this.$route.query.username;
        listTeaCourseByTeaId(this.queryParams).then(res => {
          this.courseOptions = res.data;
        })
      },
      handleQuery() {
        this.queryParams.teacherId = this.$route.query.username;
        listSelCourseByCourseIdAndTeacherId(this.queryParams).then(res => {
          this.tableData = res.data;
          this.total = res.recordsTotal;
        })
      },
      handleUpdate(row) {
        this.reset();
        this.open = true;
        this.title = "登分";
        this.form = row;
      },
      resetQuery() {
        this.resetQueryForm();
        this.handleQuery();
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      //查询表单重置
      resetQueryForm() {
        this.queryParams = {
          page: 1,
          pageSize: 5,
          courseId: undefined,
          teacherId: undefined
        };
        this.resetForm("queryForm");
      },
      // 表单重置
      reset() {
        this.form = {
          stucourseid: undefined,
          studentid: undefined,
          studentname: undefined,
          coursename: undefined,
          grade: undefined,
          gradepoint: undefined
        };
        this.resetForm("form");
      },
      submitForm() {
        this.$refs["updateForm"].validate(valid => {
          if (valid) {
            updateStuCourseGrade(this.form).then(res => {
              console.log(res);
              this.msgSuccess("登分成功！");
              this.open = false;
              this.getList();
            }).catch(err => {
              this.msgError("登分失败！");
            })
          }
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
