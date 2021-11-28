<template>
  <div>
  <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button>
  <el-button @click="clearFilter">清除所有过滤器</el-button> -->

<!--   
   <el-input
          v-model="search"
          size="small"
          placeholder="输入关键字搜索"
          clearable/> -->
          <br/>
<div style="cursor: pointer;" >&nbsp;&nbsp;&nbsp;   <el-input placeholder="请输入主题名称" icon="search" v-model="search" @input="inputChange" class="search-input" style="width: 30%;">
</el-input>     
  
</div>

 
<br/><br/>

  <el-table
    ref="filterTable"
     :data="tables"
    style="width: 100%">

       <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="请求标识">
           <span>{{props.row.id}}</span>
          </el-form-item>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <el-form-item label="用户标识">
            <span>{{ props.row.userId}}</span>
          </el-form-item>
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <el-form-item label="请求类型">
            <span>{{ props.row.kind}}</span>
          </el-form-item>
          <br/>  
          <el-form-item label="主题名称">
            
          <span>{{props.row.subject}}</span>
          </el-form-item>
          <br/>
          <el-form-item label="请求描述" >
                <div style="width:600px"><span>{{props.row.content}}</span></div>
          </el-form-item>
          <br/>
           <el-form-item label="图片">
            <img :src= props.row.base64Image height="380" width="668"alt="">
          </el-form-item>
           <br/>
          <el-form-item label="请求人数">
            <span>{{ props.row.numbers }}</span>
          </el-form-item>
           <br/>
          <el-form-item label="请求结束日期">
            <span>{{ props.row.endDate }}</span>
          </el-form-item>
               &nbsp; &nbsp; &nbsp;
              <el-form-item label="创建时间">
            <span>{{ props.row.beginDate }}</span>
          </el-form-item>
            &nbsp; &nbsp; &nbsp;
              <el-form-item label="修改时间">
            <span>{{ props.row.modifyDate }}</span>
          </el-form-item>
          &nbsp; &nbsp; &nbsp;
          <el-form-item label="状态">
            <span>{{ props.row.status}}</span>
          </el-form-item>

          <br/>
   

          <br/>
          <el-form-item label="我的响应信息"  class="item" >
  
        <div style="width:600px"><el-input type="textarea" :rows=10 v-model="props.row.responseContent"></el-input></div>

          </el-form-item>
          <br/>

          <br/>
          <el-form-item label="响应状态"  class="item" >
             <span>{{props.row.responseStatus}}</span>
          </el-form-item>
          <br/>
        </el-form>
        
     <div style="cursor: pointer;text-align:center;" >
       <el-button type="primary" @click="response_again(props.row)">再次响应</el-button>
       <el-button type="warning" @click="delete_response(props.row)">撤销</el-button>
    </div>
   
      </template>
    </el-table-column>
    
     <el-table-column
      prop="id"
      label="请求标识"
      width="100"
      align="center">
    </el-table-column>

     <el-table-column
      prop="userId"
      label="用户标识"
      width="100"
      align="center">
    </el-table-column>
     <el-table-column
      prop="subject"
      label="主题名称"
      width="180">
    </el-table-column>
   


    <el-table-column
      prop="beginDate"
      label="请求日期"
      sortable
      width="180"
      column-key="begin_date"
    >
    </el-table-column>

    <el-table-column
      prop="kind"
      label="帮忙类型"
      width="180"
      :filters="[{ text: '小时工', value: '小时工' }, { text: '搬重物', value: '搬重物' },{ text: '上下班搭车', value: '上下班搭车' },{ text: '社区服务志愿者', value: '社区服务志愿者' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
           v-if="scope.row.kind=='小时工'" 
          :type="'primary'"
          disable-transitions>{{scope.row.kind}}</el-tag>
            <el-tag
           v-if="scope.row.kind=='搬重物'" 
          :type="'success'"
          disable-transitions>{{scope.row.kind}}</el-tag>
            <el-tag
           v-if="scope.row.kind=='上下班搭车'" 
          :type="'info'"
          disable-transitions>{{scope.row.kind}}</el-tag>
            <el-tag
           v-if="scope.row.kind=='社区服务志愿者'" 
          :type="'warning'"
          disable-transitions>{{scope.row.kind}}</el-tag>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
 import Vue from 'vue'
  import Dialog from '@/views/community/wokeyi'
  import axios from 'axios'
  import qs from  'qs'

  Vue.component('Dialog',Dialog)

  

  export default {

    inject:['reload'],//将重新刷新表格数据功能注入  
    data() {
      return {
        search : '',
        vm: {
              showDialog: false,
            },
        tableData: [{
          id:1,
          user_id:21313,
          content:'会对撒谎对撒谎的哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          numbers:1,
          subject:'帮帮我！！！', 
          kind:'搬重物',
          begin_date: '2016-05-02',
          end_date:'2016-05-02',
          modify_date:'2016-05-02',
          status:'待响应',
          base64_image:'',
          
        }, {
           id:2,
          user_id:21313,
          content:'会对撒谎对撒谎的哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          numbers:1,
          subject:'别帮我！！！', 
          kind:'小时工',
          begin_date: '2016-05-02',
          end_date:'2016-05-02',
          modify_date:'2016-05-02',
          status:'待响应',
          base64_image:'',
        }, {
            id:3,
          user_id:21313,
          content:'会对撒谎对撒谎的哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          numbers:1,
          subject:'帮帮我！！！', 
          kind:'上下班搭车',
          begin_date: '2016-05-02',
          end_date:'2016-05-02',
          modify_date:'2016-05-02',
          status:'待响应',
          base64_image:'',
        }, {
            id:4,
          user_id:21313,
          content:'会对撒谎对撒谎的哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          numbers:1,
          subject:'帮帮我！！！', 
          kind:'社区服务志愿者',
          begin_date: '2016-05-02',
          end_date:'2016-05-02',
          modify_date:'2016-05-02',
          status:'待响应',
          base64_image:'',
        }],

          }
      },

        created() {
    axios
      .post('/wokeyi/request',
        qs.stringify({
           userId:localStorage.getItem('loginUserId')
        })
      )
      .then(response =>{
        console.log(response.data);

        this.tableData=response.data['data'];

        console.log(this.tableData);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
  },
     
    methods: {
      close(val){
          this.vm.showDialog = val;
          },
              inputChange(e) {
                //强制刷新
                this.$forceUpdate() 
            },
       
       delete_response(val){
        
                axios
      .post('/wokeyi/delete',
        qs.stringify({
          responseId:val.responseId
        })
      )
      .then(response =>{
        console.log(response.data);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

          //  this.reload();
          location.reload();
 
                        
       },

       response_again(val){

         var date=new Date();



                 axios
      .post('/wokeyi/modify',{
           
           id:val.responseId,
           userId:val.userId,
           content:val.responseContent,
           modifyDate: date.toLocaleDateString()
      }
      )
      .then(response =>{
        console.log(response.data);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

          //  this.reload();
          location.reload();

       },
 
      filterTag(value, row) {
        return row.kind === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    },

    computed:{
          tables() {
                const search = this.search
                if(search) {

                    return this.tableData.filter(data =>data.subject.toLowerCase().includes(search.toLowerCase()))
                }
                return this.tableData
            }

    
    }
    

  }
</script>

<style >
 .item .el-form-item__label{
    color:#1637ec;
     font-weight:bold;
     font-size:15px;

  }

</style>