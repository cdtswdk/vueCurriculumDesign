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
        prop="teachername"
        label="教师名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="coursestarttime"
        label="开始时间"
        width="180">
        <template slot-scope="scope">
          {{formatDate(scope.row.coursestarttime)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="courseendtime"
        label="结束时间"
        width="180">
        <template slot-scope="scope">
          {{formatDate(scope.row.courseendtime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleQuery(scope.row)">详细信息
          </el-button>
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="handleSelect(scope.row)">选课
          </el-button>
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
      <el-form :disabled="true" ref="queryForm" :model="form" label-width="80px">
        <el-form-item label="课程id:" prop="courseid">
          <el-input v-model.number="form.courseid" placeholder="请输入课程id" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="教师id:" prop="teacherid">
          <el-input v-model="form.teacherid" placeholder="请输入教师id" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="课程名称:" prop="coursename">
          <el-input v-model="form.coursename" placeholder="请输入课程名称" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="学分:" prop="coursecredit">
          <el-input v-model="form.coursecredit" placeholder="请输入学分" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="学时:" prop="coursehours">
          <el-input v-model="form.coursehours" placeholder="请输入学时" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="课程描述:" prop="coursedesc">
          <el-input v-model="form.coursedesc" placeholder="请输入课程描述" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="开始时间:" prop="coursestarttime">
          <el-date-picker
            v-model="form.coursestarttime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="courseendtime">
          <el-date-picker
            v-model="form.courseendtime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始周:" prop="coursestartweek">
          <el-input v-model="form.coursestartweek" placeholder="请输入开始周" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="结束周:" prop="courseendweek">
          <el-input v-model="form.courseendweek" placeholder="请输入结束周" style="width: 450px"/>
        </el-form-item>
        <el-form-item label="上课时间:" prop="courseweek">
          <el-input v-model="form.courseweek" clearable placeholder="请选择">
          </el-input>
        </el-form-item>
        <el-form-item label="上课节数:" prop="coursedaynum">
          <el-input v-model="form.coursedaynum" clearable placeholder="请选择">

          </el-input>
        </el-form-item>
        <el-form-item label="课程类型:" prop="coursetype">
          <el-input v-model="courseType[form.coursetype]" clearable placeholder="请选择">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {getCourseByCourseId, listAllCourseByStuId,selectCourseByCourseId} from '@/api/student'

  export default {
    name: "SelectCourseTab",
    data() {
      return {
        tableData: [],
        //总条数
        total: 0,
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        form: {},
        queryParams: {
          page: 1,
          pageSize: 5,
          stuId: undefined,
          courseId: undefined
        },
        courseStatus: ['未结课', '已结课'],
        courseType: ['选修课', '必修课']
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.queryParams.stuId = this.$route.query.username;
        listAllCourseByStuId(this.queryParams).then(res => {
          this.tableData = res.data;
          this.total = res.recordsTotal;
        })
      },
      handleQuery(row) {
        this.reset();
        this.open = true;
        this.title = "课程详细信息";
        this.queryParams.courseId = row.courseid;
        getCourseByCourseId(this.queryParams).then(res => {
          this.form = res;
        })
      },
      // 表单重置
      reset() {
        this.form = {
          courseid: undefined,
          teacherid: undefined,
          coursename: undefined,
          coursecredit: undefined,
          coursehours: undefined,
          coursedesc: undefined,
          coursecreatetime: undefined,
          coursestarttime: undefined,
          courseendtime: undefined,
          coursestartweek: undefined,
          courseendweek: undefined,
          courseweek: undefined,
          coursedaynum: undefined,
          coursetype: undefined,
          coursestatus: '0',
          auditstatus: '1'
        };
        this.resetForm("queryForm");
      },
      cancel(){
        this.reset();
        this.open = false;
      },
      handleSelect(row) {
        this.$confirm("您确定选择这门课吗？").then(()=>{
          this.queryParams.courseId = row.courseid;
          selectCourseByCourseId(this.queryParams).then(res=>{
            this.msgSuccess('选课成功！');
            console.log(res);
          })
        }).catch(err=>{
          console.log(err);
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
