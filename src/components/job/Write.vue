<template>
  <div>
    <h1 style="text-align: center;">总结笔试相关问题</h1>
    <h2>Collapse 折叠面板</h2>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <h3>JS/NodeJS在线编程题获取控制台输入</h3>
          <i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <p>const readline=require('readline');</p>
          <p>const res=readline.createInterface({</p>
            <p>input: process.stdin,</p>
            <p></p>output: process.stdout</p>
            <p>})</p>
            <p>let arr=[]</p>
            <p>res.on('line',input=>{</p>
              <p>arr.push(input)</p>
              <p>if(arr.length === 2){</p>
                <p>var newArr=arr.map(item=>item.split(' ').filter(e=>e!=='').map(e=>+e))</p>
                <p>console.log(newArr)</p>
                <p>res.close()</p>
                <p>}</p>
                <p>})</p>
                <p>res.on('close',()=>{</p>
                  <p>process.exit(0)</p>
                  <p>})</p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>