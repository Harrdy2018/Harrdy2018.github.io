<template>
  <div class="container">
    <div class="login-form">
      <h3>系统登录</h3>
      <el-form :model="loginForm" :rules="rules" ref="ruleForm"  label-width="60px" label-position="right">    
      <el-form-item label="账号" prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model='checked'>记住密码</el-checkbox>
      </el-form-item>
      <el-form-item style="margin:-14px 0px 0px 76px;">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      </el-form>
    </div>
  </div>
  
</template>
<script>
  import {mapActions} from 'vuex';
  export default{
    data: function(){
      return {
        logining: false,
        loginForm: {
          account: 'lukang',
          password: '123456'
        },
        rules: {
          account:[
            {required: true,message:'请输入账号',trigger:'blur'},
            {min:3,max:10,message:'长度在3到10个字符',trigger:'blur'}
          ],
          password:[
            {required: true,message:'请输入密码',trigger:'blur'},
            {min:3,max:10,message:'长度在3到10个字符',trigger:'blur'}
          ]
        },
        checked: true
      }
    },
    methods: {
      ...mapActions('users',['updateAdministrator']),
      test(){
        console.log(this)
      },
      submitForm(ruleForm){
        this.$refs[ruleForm].validate(valid=>{
          if(valid){
            console.log(valid);
            this.logining=true;
            console.log(this.loginForm)
            const loginParams={account: this.loginForm.account,password: this.loginForm.password} 
            console.log(this)
            this.$store.dispatch('users/requestLogin',loginParams)
              .then(res=>{
                console.log(res)
              this.logining=false;
              let {code,msg,user}=JSON.parse(res)[1];
              if(code!=200){
                this.$message({
                  showClose: false,
                  message: msg,
                  type: 'error'
                });
              }else{
                console.log('现在登陆的是管理员');
                //console.log(new Date().toLocaleString())
                this.$message({
                  showClose: false,
                  message: '成功哦，欢迎进入本系统！！！',
                  type: 'success'
                })
                this.updateAdministrator(user);
                this.$router.push('/home/user');
              }
            })
          }else{
            console.log('error submit!');
            return false
          }
        })
      },
      resetForm(ruleForm){
        console.log('现在是重置');
        console.log(typeof(ruleForm));
        console.log(ruleForm);
        this.$refs[ruleForm].resetFields();
      }

    }
  }
</script>
<style lang="styl" scope>
  .container
    background-color: #b2b3b7
    height: 100%
    display: flex
    justify-content: center
    align-items: center

  .login-form
    width: 400px
    height: 245px
    margin-top: -300px
    h3
      text-align: center
      margin-bottom: 5px
</style>