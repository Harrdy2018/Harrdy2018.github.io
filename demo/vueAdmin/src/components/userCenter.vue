<template>
  <div>
    <p>用户中心</p>
    <div>
      <i class="el-icon-info">我的信息</i>
    </div>
    <div>
      <p>管理员id: {{this.administrator.id}}</p>
      <p>用户名: {{this.administrator.account}}</p>
      <p>邮箱：{{this.administrator.email}}</p>
    </div>
    <el-button @click="test">test test</el-button>

    <div>
        <i class="el-icon-info">登录记录</i>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default{
    computed:{
      ...mapState('users',{
        administrator: state=>state.administrator,
        isLogin: state=>state.isLogin
      })
    },
    methods: {
      test(){
        console.log(this);
      }
    },
    watch: {
      
    }
  }
</script>