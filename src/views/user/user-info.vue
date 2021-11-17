<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180"></el-table-column>
    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="contact" label="联系方式"></el-table-column>
    <el-table-column prop="introduction" label="简介"></el-table-column>
  </el-table>
</template>

<script>
import { getUserInfo } from "@/api/user-info.js";
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted: function() {
    // 网络请求统一处理
    getUserInfo().then(res => {
      console.log("api tableData :", res);
      this.tableData = res.data["records"];
    },err=>{
      console.log("err :", err);
    });
  },
  methods: {}
};
</script>

<style>
</style>
