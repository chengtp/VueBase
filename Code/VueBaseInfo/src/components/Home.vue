<template>
  <div>
    <el-container>
	<el-header>
		<div>头部信息</div>
		<div>头部信息</div>
		<div>头部信息</div>
		<div>头部信息</div>
	</el-header>
	<el-container>
    <el-aside width='200px'>
    <div>左边</div>
    <div>左边</div>
    <div>左边</div>
    <div>左边</div>
    <div>左边</div>
    <div>左边</div>
    <div>左边</div>
    <div>左边</div>
    </el-aside>
	<el-main>内容</el-main>
	</el-container>
    </el-container>
  </div>
</template>

<script>
</script>

<style>
* {margin: 0;}

html,
body {width: 100%;height: 100%;}

.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 20%;
    height:20%;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 80%;
    height:80%;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 80%;
    height:80%;
  }
  body > .el-container {
    margin-bottom: 0;
  }
</style>
