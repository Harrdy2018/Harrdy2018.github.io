<template>
    <div>
      <el-row>
        <el-col :span='24'>
          <div class="tool-bar">
            <el-form :inline="true" :model="filters">
              <el-form-item><el-input v-model="filters.name" placeholder="姓名"></el-input></el-form-item>
              <el-form-item><el-button type="primary" @click="getUser()">查询</el-button></el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div>
          <el-table
           :data="users"
            highlight-current-row 
            v-loading="loading"
            height="600" 
            :stripe="true"
            style="width: 100%;">
            <el-table-column type="index" width="60" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex"></el-table-column>
            <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
            <el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
            <el-table-column prop="addr" label="地址" width="400"></el-table-column>
          </el-table>
      </div>
    </div>
  </template>
  <script>
    import * as api from './../api/api.js';
    export default{
      data(){
        return { 
          filters: {name: ''},
          loading: false,
          users:[]
        }
      },
      methods:{
        //性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
        getUser(){
          let para={name: this.filters.name};
          console.log(para)
          this.loading=true;
          //向服务器发起请求
          this.$store.dispatch('users/getUserList',para).then(res=>{
            //console.log(res);
            this.users=JSON.parse(res)[1].users;
            this.loading=false;
          })
          
        }
      },
      mounted(){
        this.getUser();
      }
    }
  </script>
  <style lang="styl" scoped>
  </style>