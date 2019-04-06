<template>
  <div>
    <el-button type="primary" @click="createInformation()">新建简历信息</el-button>

    <el-table
    :data="tableData"
     highlight-current-row 
     height="600" 
     :stripe="true"
     style="width: 100%;">
     <el-table-column prop="id" label="ID" width="400"></el-table-column>
     <el-table-column prop="name" label="姓名" width="120"></el-table-column>
     <el-table-column prop="wuli" label="物理" width="100" ></el-table-column>
     <el-table-column prop="huaxue" label="化学" width="100" sortable></el-table-column>
     <el-table-column prop="shengwu" label="生物" width="120" sortable></el-table-column>
   </el-table>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {

      }
    },
    computed: {
      ...mapState('list',['tableData'])
    },
    methods: {
      createInformation(){
        this.$router.push({path: '/home/information/edit'})
      },
      query(){
        this.$store.dispatch('list/queryGrades')
      }
    },
    mounted(){
      this.query();
      console.log(this)
    }
  }
</script>