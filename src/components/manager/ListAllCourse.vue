<template>
  <div>
    <el-form :model="queryParams" :inline="true" ref="queryForm" label-width="100px">
      <el-form-item label="课程id:">
        <el-input v-model="queryParams.courseid" placeholder="请输入课程id"
                  clearable style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="课程名称:">
        <el-input v-model="queryParams.coursename" placeholder="请输入课程名称"
                  clearable style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="审核状态:">
        <el-select v-model="queryParams.auditstatus" clearable placeholder="请选择" value="">
          <el-option
            v-for="item in auditStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">清空条件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">添加课程</el-button>
      </el-form-item>
    </el-form>

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
      <el-table-column
        prop="coursestarttime"
        label="开始时间"
        width="100">
        <template slot-scope="scope">
          {{formatDate(scope.row.coursestarttime)}}
        </template>
      </el-table-column>
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
      <el-form ref="insertForm" :model="form" :rules="rules" label-width="80px">
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
          <el-select v-model="form.courseweek" clearable placeholder="请选择" value="">
            <el-option
              v-for="item in courseWeekOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课节数:" prop="coursedaynum">
          <el-select v-model="form.coursedaynum" clearable placeholder="请选择" value="">
            <el-option
              v-for="item in courseDayNumOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程类型:" prop="coursetype">
          <el-select v-model="form.coursetype" clearable placeholder="请选择" value="">
            <el-option
              v-for="item in courseTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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

  import {listAllCourseByManagerId, queryCourse,addCourse} from '@/api/manager'

  export default {
    name: "ListAllCourse",
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
          managerId: undefined,
          courseid: undefined,
          coursename: undefined,
          auditstatus: undefined
        },
        form: {},//提交课程数据
        courseStatus: ['未结课', '已结课'],
        courseType: ['选修课', '必修课'],
        auditStatusOptions: [{
          value: '0',
          label: '未审核'
        }, {
          value: '1',
          label: '已审核'
        }],
        courseWeekOptions: [
          {
            value: '星期一',
            label: '星期一'
          }, {
            value: '星期二',
            label: '星期二'
          }, {
            value: '星期三',
            label: '星期三'
          },
          {
            value: '星期四',
            label: '星期四'
          },
          {
            value: '星期五',
            label: '星期五'
          },
          {
            value: '星期六',
            label: '星期六'
          },
          {
            value: '星期日',
            label: '星期日'
          }
        ],
        courseDayNumOptions: [
          {
            value: '1',
            label: '第一节'
          },
          {
            value: '2',
            label: '第二节'
          },
          {
            value: '3',
            label: '第三节'
          },
          {
            value: '4',
            label: '第四节'
          },
          {
            value: '5',
            label: '第五节'
          },
          {
            value: '6',
            label: '第六节'
          },
          {
            value: '7',
            label: '第七节'
          },
          {
            value: '8',
            label: '第八节'
          },
          {
            value: '9',
            label: '第九节'
          },
          {
            value: '10',
            label: '第十节'
          },
          {
            value: '11',
            label: '第十一节'
          }
        ],
        courseTypeOptions: [
          {
            value: '0',
            label: '选修课'
          },
          {
            value: '1',
            label: '必修课'
          }
        ],
        rules: {
          courseid: [
            {required: true, message: "课程id不能为空且必须为数字", trigger: "blur", type: 'number'}
          ],
          coursename: [
            {required: true, message: "课程名称不能为空", trigger: "blur"}
          ],
          teacherid: [
            {required: true, message: "教师编号不能为空", trigger: "blur"}
          ],
          coursecredit: [
            {required: true, message: "课程学分不能为空", trigger: "blur"}
          ],
          coursehours: [
            {required: true, message: "课程学时不能为空", trigger: "blur"}
          ],
          coursedesc: [
            {required: true, message: "课程描述不能为空", trigger: "blur"}
          ],
          coursestarttime: [
            {required: true, message: "课程开始时间不能为空", trigger: "blur"}
          ],
          courseendtime: [
            {required: true, message: "课程结束不能为空", trigger: "blur"}
          ],
          coursestartweek: [
            {required: true, message: "课程开始周数不能为空", trigger: "blur"}
          ],
          courseendweek: [
            {required: true, message: "课程结束周数不能为空", trigger: "blur"}
          ],
          courseweek: [
            {required: true, message: "课程上课时间不能为空", trigger: "blur"}
          ],
          coursedaynum: [
            {required: true, message: "课程上课节数不能为空", trigger: "blur"}
          ],
          coursetype: [
            {required: true, message: "课程类型不能为空", trigger: "blur"}
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.queryParams.managerId = this.$route.query.username;
        listAllCourseByManagerId(this.queryParams).then(res => {
          this.tableData = res.data;
          this.total = res.recordsTotal;
        })
      },
      handleQuery() {
        queryCourse(this.queryParams).then(res => {
          this.tableData = res.data;
          this.total = res.recordsTotal;
        })
      },
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加课程";
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
          managerId: undefined,
          courseid: undefined,
          coursename: undefined,
          auditstatus: undefined
        };
        this.resetForm("queryForm");
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
        this.resetForm("form");
      },
      submitForm() {
        this.$refs["insertForm"].validate(valid => {
          if (valid) {
            addCourse(this.form).then(res => {
              console.log(res);
              this.msgSuccess("增加成功！");
              this.open = false;
              this.getList();
            }).catch(err=>{
              this.msgError("增加失败！");
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
