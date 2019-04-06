<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div id="chartColumn" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartBar" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div id="chartLine" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartPie" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">ECHARTS官网>>></a>
      </el-col>
    </el-row>       
                  
  </div>
</template>
  <script>
    export default{
      name: 'myChart',
      created(){
      console.log("I am at test.vue created函数")
      //console.log(document)
      console.log(document.getElementById('myChart'))//null
      },
      mounted(){
        console.log("I am at test.vue mounted函数")
        console.log(document.getElementById('myChart'))
        console.log(this.$chart)
        this.$chart.drawColumnChart('chartColumn');
        this.$chart.drawBarChart('chartBar');
        this.$chart.drawLineChart('chartLine');
        this.$chart.drawPieChart('chartPie');
      }
    }
  </script>
  <style scoped>
  </style>