<template>
    <div style="height:100%;">
    

      <div class="header">
        <h1>{{sysName}}</h1>
        <div class="userinfo">
            <el-dropdown 
             @command="handleCommand"
             trigger="hover">
              <span class="el-dropdown-link" style="color:#fff;margin-left: 16px;">
                <img :src="this.administrator.avatar"/>
                {{this.administrator.account}}
                <i class="el-icon-arrow-down el-icon-right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item command="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>  
          </div>
      </div>
     
  
    
       
        <!--导航界面-->
        <el-row class="nav">
          <el-col :span="3" class="navBar">
            <el-menu
              default-active="/home/user"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              @open="handleOpen"
              text-color="#fff"
              active-text-color="#ffd04b"
              @close="handleClose"
              :router="true">
             
              <el-menu-item index="/home/user">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户中心</span>
                  </template>
              </el-menu-item>
                
          
  
              <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>基础操作</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="/home/table">表格练习</el-menu-item>
                    <el-menu-item index="/home/form">表单练习</el-menu-item>
                    <el-menu-item index="/home/query">查询用户</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
  
                <el-submenu index="4" :disabled="false">
                    <template slot="title">
                      <i class="el-icon-document"></i>
                      <span>测试中心</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="/home/test">测试</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>   
  
                <el-submenu index="4" :disabled="false">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>Charts</span>
                    </template>
                    <el-menu-item-group>
                      <template slot="title">分组一</template>
                      <el-menu-item index="/home/echarts">echarts</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>  
                  
                  
            
            </el-menu>
          </el-col>

          <el-col :span="21">
            <router-view></router-view>
          </el-col>
        </el-row>

         
    </div> 
  </template>
  <script>
    import {mapState,mapGetters,mapMutations} from 'vuex';
    export default {
      data(){
        return {
          sysName: 'VueAdmin',
        }
      },
      computed: {
        ...mapState('users',{
          administrator: state=> state.administrator,
          isLogin: state=>state.isLogin
        }),
      
      },
      watch: {
      
      },
      methods: {
        handleCommand(command){
          console.log(command)
          switch(command){
            case 'exit':
              window.sessionStorage.removeItem('admin');
              window.sessionStorage.removeItem('isLogin');
              this.$router.push({path:'/login'});
              break;
          }
        },
        handleClose(key,keyPath){
          console.log(key,keyPath)
        },
        handleOpen(key,keyPath){
          console.log(key,keyPath)
        },
      },
      mounted(){
        console.log("执行 home.vue 的mounted函数")
      },
      created(){
        console.log("执行 home.vue 的created函数")
      }   
    }
  </script>
  <style lang="styl" scoped>
    .header
      width: 100%
      height: 60px
      line-height: 60px
      background-color: #404040
      color: white
      h1
        width: 240px
        display: inline-block
        text-align: center
      .userinfo
        float right
        width: 140px
        img
          width: 40px
          height: 40px
          border-radius: 20px
          float: right
          margin-top: 9px
    .nav
      height: 94%
      .navBar
        height: 100%
        background-color: #545c64
  </style>