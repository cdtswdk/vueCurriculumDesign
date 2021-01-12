<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1','2']">
          <el-menu-item-group>
            <el-menu-item @click="toBaseIndex"><i class="el-icon-back"></i>首页</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>信息查询</template>
            <el-menu-item-group>
              <template slot="title">个人</template>
              <el-menu-item index="1-1" @click="toPerInfo">个人信息查询</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">学生</template>
              <el-menu-item index="1-2" @click="toAllStuTab">学生信息</el-menu-item>
              <el-menu-item index="1-3" @click="toAllStuCourseTab">学生课表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">老师</template>
              <el-menu-item index="1-4" @click="toAllTeaTab">老师信息</el-menu-item>
              <el-menu-item index="1-5" @click="toAllTeaCourseTab">老师课表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">课程</template>
              <el-menu-item index="1-6" @click="toAllCourseTab">课程信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 20px;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>欢迎您，{{$route.query.username}}</span>
          <el-link type="primary" @click="logout">退出</el-link>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "StuIndex",
    data() {
      return {}
    },
    beforeCreate() {
      if (this.$route.query.usertype == null || this.$route.query.username == null) {
        this.$message('管理员尚未登录，请先登录！');
        this.$router.push({
          path: '/'
        }).catch(err => {
          console.log(err)
        })
      }
    },
    methods: {
      toBaseIndex() {
        this.$router.push({
          path: '/manager/',
          query: {
            usertype: this.$route.query.usertype,
            username: this.$route.query.username
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toPerInfo() {
        this.$router.push({
          path: '/manager/perInfoTab',
          query: {
            usertype: this.$route.query.usertype,
            username: this.$route.query.username
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toAllStuTab() {
        this.$router.push({
          path: '/manager/listAllStudent',
          query: {
            usertype: this.$route.query.usertype,
            username: this.$route.query.username
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toAllStuCourseTab() {

      },
      toAllTeaTab() {
        this.$router.push({
          path: '/manager/listAllTeacher',
          query: {
            usertype: this.$route.query.usertype,
            username: this.$route.query.username
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toAllTeaCourseTab() {

      },
      toAllCourseTab() {
        this.$router.push({
          path: '/manager/listAllCourse',
          query: {
            usertype: this.$route.query.usertype,
            username: this.$route.query.username
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toStuSelCourseTab() {

      },
      logout() {
        this.$confirm('您确定退出吗？').then(() => {
          this.$message({
            message: '退出成功',
            type: 'warning'
          });
          window.location.href = '/';
        })
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
