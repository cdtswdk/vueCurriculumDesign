<template>
  <div>
    <span>{{$route.query.usertype}}</span>
    <span>{{$route.query.username}}</span>
  </div>
</template>

<script>
  export default {
    name: "ManIndex",
    beforeCreate() {
      if (this.$route.query.usertype == null || this.$route.query.username == null) {
        this.$message('管理员尚未登录，请先登录！');
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style scoped>

</style>
