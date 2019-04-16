<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-plus" @click="showAdd">创建数据源</el-button>
    <el-table :data="tableData" style="width: 50%;">
      <el-table-column prop="name" label="数据源名称" width="130" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="type" label="数据源类型" width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="lionPrefix" label="lion prefix" width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="120" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作"  width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="showEdit(scope)">编辑</el-button>
          <el-button type="text" @click="showDel(scope)">删除</el-button>
          <el-button type="text" @click="showExportData(scope)">取弹框数据</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import Edit from "./components/edit.vue";
  import Test from "./components/test.vue";
  export default{
    data(){
      return {
        tableData: [{
          name: '数据源A',
          type: 'mysql',
          lionPrefix: '556',
          createTime: '2018-02-01',
          updateTime: '2019-05-26'
        },{
          name: '数据源B',
          type: 'mysql',
          lionPrefix: '22222222556',
          createTime: '2015-05-02',
          updateTime: '2017-02-03'
        }] 
      }
    },
    methods: {
      showAdd(){
        const h=this.$createElement(Edit,{
          key: new Date().getTime(),
          attrs: {
            parent: this
          }
        });
        this.$msgbox({
          title: '创建数据源',
          message: h,
          showCancelButton: true,
          beforeClose: (action,instance,done)=>{
            if(action !== 'confirm'){
              done()
            }else{
              console.log(this);
              this.myForm.validate(valid=>{
                if(valid) done()
                else this.$message({type: 'error',message: '表单验证失败!!!'})
              })
            }
          }
        }).then((data)=>{
          //调用后端add接口，刷新页面
          console.log(this.myForm.model)
          let name=this.myForm.model.name;
          let type=this.myForm.model.type;
          let lionPrefix=this.myForm.model.lionPrefix;
          this.tableData.push({name: name,type: type,lionPrefix: lionPrefix})
        }).catch(e=>{})
      },
      showDel(scope){
        console.log('你正在执行删除操作')
        console.log(scope)
        this.$confirm(`确定要删除数据源: ${scope.row.name}吗?`,'删除数据源',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((action)=>{
          //调用后端del接口，刷新页面
          this.tableData.splice(scope.$index,1)
        }).catch((e)=>{
          //点击xx 取消按钮时执行
          this.$message({type: 'info',message: '已取消删除'})
        })
      },
      showEdit(scope){
        console.log('你正在执行编辑操作');
        const hh=this.$createElement(Edit,{
          key: new Date().getTime(),
          attrs: {
            parent: this,
            datasource: Object.assign({},scope.row)
          }
        });
        this.$msgbox({
          title: '编辑数据源',
          message: hh,
          showCancelButton: true,
          beforeClose: (action,instance,done)=>{
            if(action !== 'confirm'){
              done()
            }else{
              console.log(this);
              this.myForm.validate(valid=>{
                if(valid) done()
                else this.$message({type: 'error',message: '表单验证失败!!!'})
              })
            }
          }
        }).then((action)=>{
          console.log(action)
          //更新编辑信息
          //调用后端edit接口，刷新页面
          let name=this.myForm.model.name;
          let type=this.myForm.model.type;
          let lionPrefix=this.myForm.model.lionPrefix;
          this.tableData[scope.$index].name=name
          this.tableData[scope.$index].type=type
          this.tableData[scope.$index].lionPrefix=lionPrefix
        }).catch((action)=>{
          this.$message({type: 'info',message: '已取消编辑'})
        })
      },
      //弹框里面的数据是我们所需要的，我们如何去取呢？
      showExportData(scope){
        console.log('你正在执行取弹框里面数据的方法')
        let vnode=this.$createElement(Test,{
          key: new Date().getTime()
        });
        this.$msgbox({
          title: '我要取弹框里面的数据',
          message: vnode,
          showCancelButton: true,
          beforeClose: (action,instance,done)=>{
            if(action !== 'confirm'){
              done()
            }else{
              console.log(vnode);
              if(vnode.componentInstance.text.trim()){
                done();
              }else{
                this.$message({type: 'warning',message: '请输入必要信息！！！'})
              }
            }
          },
        }).then(()=>{
          this.$message({type: 'success',message: `你要的数据是: ${vnode.componentInstance.text.trim()}`})
        }).catch(()=>{})
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>