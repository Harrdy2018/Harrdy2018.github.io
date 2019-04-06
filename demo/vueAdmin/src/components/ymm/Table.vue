<template>
    <div>
      <el-row>
        <el-col :span='24'>
          <div class="tool-bar">
            <el-form :inline="true" :model="filters">
              <el-form-item><el-input v-model="filters.name" placeholder="姓名"></el-input></el-form-item>
              <el-form-item><el-button type="primary" @click="getUser()">查询</el-button></el-form-item>
              <el-form-item><el-button type="primary" @click="getUser()">新增</el-button></el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div>
          <el-table
           :data="users"
            highlight-current-row 
            stripe
            v-loading="loading"
            :stripe="true"
            style="width: 100%;">
            <el-table-column type="index" width="60" label="序号" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
            <el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
            <el-table-column prop="addr" label="地址" width="400" sortable></el-table-column>
            <el-table-column label="操作" width="400">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>            
                <el-button
                  size="mini"
                  @click="handleAdd(scope.$index, scope.row)">新增</el-button>
                <el-button
                  size="mini"
                  @click="handleShiftUp(scope.$index, scope.row)">上移</el-button>
                <el-button
                  size="mini"
                  @click="handleShiftDown(scope.$index, scope.row)">下移</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change=handleCurrentChange($event)
            layout="prev,pager,next"
            background
            :page-size="10"
            :total="total"
          ></el-pagination>
      </div>
    </div>
  </template>
  <script>
    import * as api from './../../api/api.js';
    export default{
      data(){
        return { 
          filters: {name: ''},
          loading: false,
          allUsers:[],
          users:[],
          total:0,
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
            this.allUsers=JSON.parse(res)[1].users;
            console.log(this.allUsers)
            this.total=this.allUsers.length;
            this.users=this.allUsers.slice(0,10)
            this.loading=false;
          })
          
        },
      //table按钮操作
      handleShiftUp(index,row){
        if(index !=0){
          const aa=this.users[index]
          this.users.splice(index,1)
          this.users.splice(index-1,0,aa)
        }else{
          this.$message({
          showClose: false,
          message: '警告哦，您不能再上移了哦！！！',
          type: 'warning'
        });
        }
      },
      handleShiftDown(index,row){
        if(index !=9){
          const aa=this.users[index]
          this.users.splice(index,1)
          this.users.splice(index+1,0,aa)
        }else{
          this.$message({
          showClose: false,
          message: '警告哦，您不能再下移了哦！！！',
          type: 'warning'
        });
        }
      },
      handleAdd(index,row){
        console.log('新增')
      },
      handleEdit(index,row){
        console.log('编辑')
      },
      handleDelete(index,row){
        console.log('删除')
        this.$confirm('此操作将永久删除该行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let para={id:row.id};
          this.$store.dispatch('users/removeUser',para).then(res=>{
            this.loading=false;
            this.getUser();
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          })  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handlePrev(e){
        console.log(e)
      },
      handleCurrentChange(e){
        console.log(e)
        this.users=this.allUsers.slice((e-1)*10,e*10)
        }
      },
      mounted(){
        this.getUser();
      }
    }
  </script>
  <style lang="styl" scoped>
  </style>