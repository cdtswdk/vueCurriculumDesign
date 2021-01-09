<template>
  <div>
    <div>
      <el-radio v-model="ruleForm2.userType" label=1>学生</el-radio>
      <el-radio v-model="ruleForm2.userType" label=2>老师</el-radio>
      <el-radio v-model="ruleForm2.userType" label=3>管理员</el-radio>
    </div>
    <div class="login-container">
      <el-form :model="ruleForm2" :rules="rules2"
               status-icon
               ref="ruleForm2"
               label-position="left"
               label-width="0px"
               class="demo-ruleForm login-page">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
          <el-input type="text"
                    v-model="ruleForm2.username"
                    auto-complete="off"
                    placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    v-model="ruleForm2.password"
                    auto-complete="off"
                    placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="loginLoading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {userLogin} from '@/api/user'

  export default {
    name: "Login",
    data() {
      return {
        userType: '1',
        loginLoading: false,
        ruleForm2: {
          username: '',
          password: '',
          userType: "1"
        },
        rules2: {
          username: [{required: true, message: '请输入账号', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: false
      }
    },
    methods: {
      handleSubmit(event) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.loginLoading = true;
            userLogin(this.ruleForm2).then(res => {
              console.log(res);
              if (res.usertype === "1") {
                this.$router.push({
                  path: '/student',
                  query: {
                    usertype: 1,
                    username: res.username
                  }
                })
              } else if (res.usertype === "2") {
                this.$router.push({
                  path: '/teacher/teaIndex',
                  query: {
                    usertype: 2,
                    username: res.username
                  }
                })
              } else if (res.usertype === "3") {
                this.$router.push(
                  {
                    path: '/teacher/teaIndex',
                    query: {
                      usertype: 2,
                      username: res.username
                    }
                  }
                )
              } else {
                console.log('error login!');
                return false;
              }
            })
          } else {
            console.log('error submit!');
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 80px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
</style>
