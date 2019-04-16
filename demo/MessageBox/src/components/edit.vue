<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label-width="120px" label="名称: " prop="name">
        <el-input size="mini" maxlength="100" v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label-width="120px" label="类型: " prop="type">
        <el-select size="mini" v-model="form.type">
          <el-option value="mysql" />
          <el-option value="impala" />
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" label="lion prefix: " prop="lionPrefix">
        <el-input size="mini" maxlength="100" v-model.trim="form.lionPrefix" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default{
    props: ['parent','datasource'],
    data(){
      return {
        form: {
        name: '',
        type: '',
        lionPrefix: ''
        },
        rules: {
          name: [{ required: true, message: '请输入数据源名称' }],
          type: [{ required: true, message: '请选择数据源类型' }],
          lionPrefix: [{ required: true, message: '请输入lion prefix' }]
        }
      }
    },
    computed: {},
    methods: {},
    mounted: function(){
      this.parent.myForm=this.$refs.form;
      if(this.datasource){
        //只有在编辑状态下，页面加载的时候，更新表单
        Object.assign(this.form,this.datasource)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  /*为什么深度选择器设置无效呢？我在满满都是这样做的？*/
  /deep/ .el-message-box__header{
    background-color: red;
  }
</style>