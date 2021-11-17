<template>
  <el-table :data="tableData" style="margin-left: 20px;margin-right: 50px">
    <el-table-column prop="username" label="姓名"/>
    <el-table-column prop="city" label="注册城市"/>
    <el-table-column prop="contact" label="联系方式"/>
    <el-table-column prop="communityType" label="注册社区"/>
    <el-table-column prop="introduction" label="简介"/>
    <el-table-column prop="createTime" label="创建时间" sortable/>
  </el-table>
</template>

<script>
import {getUserInfo} from "@/api/user.js";
import moment from "moment";

export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted: function () {
    // 网络请求统一处理
    getUserInfo().then(res => {
      console.log("api tableData :", res)
      this.tableData = res.data["records"]
    }, err => {
      console.log("err :", err)
    })
  },
  methods: {
  }
}
</script>

<style>
</style>
