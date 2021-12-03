<template>
  <div id="dialog">
    <el-dialog title="响应列表" :visible.sync="dialogTableVisible" @close='closeDialog'>
 <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item v-for="item in form" title="响应信息" class="title" >
     <br/>  
        <h3>响应用户ID</h3>   
        <span>{{item.userId}}</span><br/>
        <h3>响应内容</h3>
        <span>{{item.content}}</span><br/>
        <h3>响应状态</h3>
        <span>{{item.status}}</span><br/>
    <br/>
    <el-button type="primary" @click="onSubmit(item.id)">接受</el-button>
    <el-button type="danger"@click="failandclose(item.id)">拒绝</el-button>
  </el-collapse-item>

</el-collapse>




    </el-dialog>
      
    </div>

</template>
 
<script>
import axios from 'axios'
import qs from 'qs'
  export default {
    name: "",
    data(){
      return {
          dialogTableVisible:true,
          dialogFormVisible:true,

          form: [],
      }
    },
    created() {
    axios
      .post('/wokeyi/info_request',
        qs.stringify({
           requestId:localStorage.getItem('requestId')
        })
      )
      .then(response =>{
        console.log(response.data);

        this.form=response.data['data'];

        console.log(this.form);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
  },
    methods:{
      closeDialog(){
          //传给后端接口
         //给父组件传参
           this.$emit('closeDialog',false);
  
      },
      failandclose(id){//拒绝响应

            axios
      .post('/wokeyi/reject',
        qs.stringify({
           responseId:id
        })
      )
      .then(response =>{
        console.log(response.data);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

         
          this.dialogTableVisible=false;
          this.$emit('closeDialog',false);

      },
      onSubmit(id){//接受响应

         axios
      .post('/wokeyi/accept',
        qs.stringify({
           responseId:id
        })
      )
      .then(response =>{
        console.log(response.data);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
          this.dialogTableVisible=false;
          this.$emit('closeDialog',false);

      }
    }
  }
</script>
 
 <<style >
 
 </style>