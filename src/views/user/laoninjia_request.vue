<template>
  <div id="dialog">
    <el-dialog title="请求填写" :visible.sync="dialogTableVisible"@close='closeDialog'>
        <el-form ref="form" :model="form" label-width="40px">

        <el-form-item label="期限">
                          <el-date-picker
      v-model="form.end_date"
      type="date"
      placeholder="选择截止日期"
      style="width: 150px;">
    </el-date-picker>
          </el-form-item>  
             
    <el-form-item label="类型" >
     
              <el-select v-model="form.kind" placeholder="请选择" style="width:150px;">
            <el-option
              v-for="item in option"
              :key="item.label"
              :label="item.value"
              :value="item.value"/>
          </el-select>
           
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>人数</b>&nbsp;&nbsp;
            <el-input  v-model="form.numbers" style="width:60px;"></el-input>

          </el-form-item>
           <el-form-item label="主题">
            
            <el-input  v-model="form.subject"></el-input>
          </el-form-item>           


  <el-form-item label="内容">
    <el-input type="textarea" v-model="form.desc" :rows="10" style="width: 100%;"></el-input>
  </el-form-item>
  <el-form-item label="图片">
        <el-upload
    class="avatar-uploader"
    action="fakeaction"
    :show-file-list="false"
    :http-request="uploadImg"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
>
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

    </el-form-item>   
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="failandclose">取消</el-button>
  </el-form-item>
</el-form>
      <!-- <el-button @click="closeDialog">
          test
      </el-button> -->

    </el-dialog>
      
    </div>

</template>
 
<script>
  import axios from 'axios'
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
          imgUrl:'',
          form:'',
          kind:'',
          desc: '',
          numbers:1,
          subject:'',
          end_date:null//日期类型
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
      
         imgType: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      }
    },
    methods:{

        // 上传文件判断
beforeAvatarUpload(file) {
    // 调用testFileType方法，把定义的imgType数组和我们上传的图片类型file.type一起传进去
    const isTYPE = this.testFileType(this.imgType, file.type);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isTYPE) {
        this.$message.error('上传的图片只能是 JPG、JPEG、PNG、GIF 格式!');
    }
    if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过 2MB!');
    }
    return !isTYPE && isLt2M;
},
// 判断文件类型是否在数组中 返回布尔值
testFileType(arr, fileType) {
    arr.filter((el, index) => {
        return fileType === el[index];
    });
},

// 上传文件
uploadImg(params) {
    console.log(params);
    // Promise的数据需要用.then得到

    this.getBase64(params.file).then(res => {

        this.form.imgUrl=res;
       console.log(this.form.imgUrl);

    });
    

    // 在此axios请求
},
// 转换格式
getBase64(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileResult = '';
        reader.readAsDataURL(file); //开始转
        reader.onload = function() {
            fileResult = reader.result;
        }; //转 失败
        reader.onerror = function(error) {
            reject(error);
        }; //转 结束  咱就 resolve 出去
        reader.onloadend = function() {
            resolve(fileResult);
        };
    });
},
    closeDialog(){
          //传给后端接口
         //给父组件传参
           this.$emit('closeDialog',false);
  
      },
      failandclose(){//axios

          this.dialogTableVisible=false;
          this.$emit('closeDialog',false);

      },
      onSubmit(){
          
        var date=new Date();
        var user_id=localStorage.getItem('loginUserId');
        var begin_date=date.toLocaleDateString();
        var modify_date=date.toLocaleDateString();
        console.log(this.form.imgUrl);
        axios.post('/laoninjia/publish', {

          userId: Number(user_id),
          kind:this.form.kind,
          subject:this.form.subject,
          numbers:this.form.numbers,
          base64Image:this.form.imgUrl, 
          content: this.form.desc,
          endDate:this.form.end_date.toLocaleDateString(),
          beginDate: begin_date,
          modifyDate: modify_date,
          status:'待响应'

            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          
          this.dialogTableVisible=false;
          this.$emit('closeDialog',false);

      }
    }
  }
</script>
 