<template>
  <div id="dialog">
    <el-dialog title="响应填写" :visible.sync="dialogTableVisible" @close='closeDialog'>
        <el-form ref="form" :model="form" label-width="40px">
  <el-form-item label="内容">
    <el-input type="textarea" v-model="form.desc" :rows="10" style="width: 100%;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="failandclose">取消</el-button>
  </el-form-item>
</el-form>

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

          form: {
        //   name: '',
        //   region: '',
        //   date1: '',
        //   date2: '',
        //   delivery: false,
        //   type: [],
        //   resource: '',
          desc: ''
        }
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
 