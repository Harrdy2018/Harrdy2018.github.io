<template>
  <div>
    <p>必填</p>
    <el-input v-model="text"></el-input>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        text: ''
      }
    }
  }
</script>