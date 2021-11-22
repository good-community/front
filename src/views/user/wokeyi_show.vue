<template>
  <div id="dialog">
    <el-dialog title="响应列表" :visible.sync="dialogTableVisible" @close='closeDialog'>
        <!-- <el-form ref="form" :model="form" label-width="40px">
            
   
  <!-- <el-form-item label="ID" >
        <span>{{item.id}}</span>
  </el-form-item>

   <el-form-item label="内容">
        <span>{{item.desc}}</span>
  </el-form-item>

   <el-form-item label="状态">
        <span>{{item.status}}</span>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmit">接受</el-button>
    <el-button type="danger"@click="failandclose">拒绝</el-button>
  </el-form-item> -->
    <!-- <el-form-item v-for="item in form">
    <br/>  
        <h3>响应id</h3>   
        <span>{{item.id}}</span><br/>
        <h3>响应内容</h3>
        <span>{{item.desc}}</span><br/>
        <h3>响应状态</h3>
        <span>{{item.status}}</span><br/>
    <br/>
    
    <el-button type="primary" @click="onSubmit(item.id)">接受</el-button>
    <el-button type="danger"@click="failandclose(item.id)">拒绝</el-button>
  </el-form-item>
  
</el-form> --> 


<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item v-for="item in form" title="响应信息" class="title" >
     <br/>  
        <h3>响应id</h3>   
        <span>{{item.id}}</span><br/>
        <h3>响应内容</h3>
        <span>{{item.desc}}</span><br/>
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
  export default {
    name: "",
    data(){
      return {
          dialogTableVisible:true,
          dialogFormVisible:true,

          form: [{
          desc: 'shaiudhsaijdiajio',
          id:'2',
          status:'已接受',
        },{
          desc: 'sadsadsadsad',
          id:'1',
          status:'已接受',
        },{
          desc: 'sano;djaoio',
          id:'3',
          status:'已接受',
        }]
      }
    },
    methods:{
      closeDialog(){
          //传给后端接口
         //给父组件传参
           this.$emit('closeDialog',false);
  
      },
      failandclose(){

          this.dialogTableVisible=false;
          this.$emit('closeDialog',false);

      },
      onSubmit(){
          this.dialogTableVisible=false;
          this.$emit('closeDialog',false);

      }
    }
  }
</script>
 
 <<style >
 
 </style>