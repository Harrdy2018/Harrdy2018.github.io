<template>
  <div>
    <el-form :model="form">
      <el-form-item label="真实姓名" label-width="80px">
        <el-input v-model="form.name" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="学号" label-width="80px">
        <el-input v-model="form.id" style="width:300px;" plaacehold="请给一个唯一的学号，用于后台检索"></el-input>
      </el-form-item>
      <el-form-item label="物理" label-width="80px">
        <el-input v-model="form.wuli" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="化学" label-width="80px">
        <el-input v-model="form.huaxue"  style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="生物" label-width="80px">
        <el-input v-model="form.shengwu"  style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" @click="save()">保存信息</el-button>
      </el-form-item> 
    </el-form>
  </div>
</template>
<script>
  import {saveGrades} from "./../../../api/api.js";
  import {mapState,mapGetters} from 'vuex';
  export default {
  data(){
    return {
    }
  },
  computed: {
    ...mapState('edit',['testName','form']),
    ...mapGetters('edit',['postdata'])
  },
  methods: {
    save(){
      saveGrades(this.postdata).then(()=>{
        this.$router.push({path: '/home/information/list'})
      });
     
    }
  },
  mounted(){
    console.log(this)
    this.$store.commit('edit/init')
  }
}
</script>
