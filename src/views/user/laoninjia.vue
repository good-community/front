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
  
<el-button type="primary" style="margin-left:300px"@click="vm.showDialog0=true ">添加</el-button></div>

     <Dialog0
      @closeDialog="close0"
      v-if="vm.showDialog0" ></Dialog0>      
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
            <span>{{ props.row.user_id}}</span>
          </el-form-item>
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <el-form-item label="请求类型">
              <el-select v-model="props.row.kind" placeholder="请选择">
            <el-option
              v-for="item in option"
              :key="item.label"
              :label="item.value"
              :value="item.value"/>
          </el-select>

          </el-form-item>
          <br/>  
          <el-form-item label="主题名称">
            
            <el-input  v-model="props.row.subject"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="请求描述" >
                <div style="width:600px"><el-input type="textarea" :rows=10 v-model="props.row.content"></el-input></div>
          </el-form-item>
          <br/>
           <el-form-item label="图片">
            <img :src="'data:image/png;base64,'+props.row.base64_image" alt="">
          </el-form-item>
           <br/>
          <el-form-item label="请求人数">
            <span>{{ props.row.numbers }}</span>
          </el-form-item>
           <br/>
          <el-form-item label="请求结束日期">
            <span>{{ props.row.end_date }}</span>
          </el-form-item>
               &nbsp; &nbsp; &nbsp;
              <el-form-item label="创建时间">
            <span>{{ props.row.begin_date }}</span>
          </el-form-item>
            &nbsp; &nbsp; &nbsp;
              <el-form-item label="修改时间">
            <span>{{ props.row.modify_date }}</span>
          </el-form-item>
           <br/>
          <el-form-item label="状态">
            <span>{{ props.row.status}}</span>
          </el-form-item>
           <span style="margin-left:200px"></span>
        <el-form-item label="已获得响应">
               <el-button type="text" @click="vm.showDialog = true">点击查看</el-button>

          </el-form-item>

        </el-form>
        
       <Dialog1
      @closeDialog="close"
      v-if="vm.showDialog"></Dialog1>  

     <div style="cursor: pointer;" >
       <el-button type="primary" @click="modify0(props.row)">保存</el-button>
       <el-button type="warning" @click="delete0(props.row.id)">撤销</el-button>
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
      prop="user_id"
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
      prop="begin_date"
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
  import Dialog1 from '@/views/user/wokeyi_show'
  import Dialog0 from '@/views/user/laoninjia_request'
  Vue.component('Dialog0',Dialog0)
  Vue.component('Dialog1',Dialog1)

  

  export default {

    inject:['reload'],//将重新刷新表格数据功能注入  
    data() {
      return {
        search : '',
        vm: {
              showDialog0:false,
              showDialog: false,
            },
        
        option:[{
          value:'小时工',
          label:'小时工'
        },
          {
            value:'搬重物',
            label:'搬重物'
          },
          {
            value:'社区服务志愿者',
            label:'社区服务志愿者'
          },
          {
            value:'上下班搭车',
            label:'上下班搭车'

          }
        ],
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
     
    methods: {
      close(val){
          this.vm.showDialog = val;

          },

           close0(val){
          this.vm.showDialog0 = val;

          },
              inputChange(e) {
                //强制刷新
                this.$forceUpdate() 
            },
       
       delete0(val){//依据id删除

       this.reload();
                        
       },

       modify0(val){
           
           this.reload();
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