<template>
  <div class="root">
    <el-row :gutter="0">
      <el-col :span="12">
        <el-form label-width="200px" style="width:400px">
          <el-form-item label="用户名:">
            <label>{{ userInfo.username }}</label>
          </el-form-item>
          <el-form-item label="身份证号:">
            <label>{{ userInfo.idNo }}</label>
          </el-form-item>
          <el-form-item label="注册城市:">
            <label>{{ userInfo.city }}</label>
          </el-form-item>
          <el-form-item label="注册社区:">
            <label>{{ userInfo.communityType }}</label>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12">
        <el-form ref="userForm" label-width="100px" style="width:400px" :model="userInfo" :rules="userRules">
          <el-form-item label="密码:">
            <el-input
              ref="password"
              v-model="userInfo.password"
              :type="passwordType"
              name="password"
              placeholder="不填则不修改密码"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
            </span>
          </el-form-item>

          <el-form-item label="联系方式:">
            <el-input v-model="userInfo.contact"/>
          </el-form-item>

          <el-form-item label="个人简介:">
            <el-input resize="none" rows="6" type="textarea" v-model="userInfo.introduction"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12">

      </el-col>
    </el-row>
  </div>
</template>

<script>

import {getMyInfo} from "@/api/user";
import {Message} from "element-ui";

export default {
  data() {

    const validateContact = (rule, value, callback) => {
      if (value.length < 5 || value.length > 20) {
        callback(new Error("联系方式长度为5-20个字符"));
      } else {
        callback();
      }
    };
    const validateIntroduction = (rule, value, callback) => {
      if (value.length > 50) {
        callback(new Error("个人简介长度不超过50个字符"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        id: null,
        username: '',
        idNo: '',
        city: '',
        contact: '',
        introduction: '',
        communityType: ''
      },
      userRules: {
        contact: [
          {required: false, trigger: "blur", validator: validateContact}
        ],
        introduction: [
          {required: false, trigger: "blur", validator: validateIntroduction}
        ]
      },
      passwordType: "password"
    }
  },
  mounted: function () {
    let loginUserId = localStorage.getItem("loginUserId");
    getMyInfo(loginUserId).then(res => {
      console.log("getMyInfo res: ", res)
      this.userInfo = res.data
    }, err => {
      console.error("getMyInfo failed: ", err)
    })
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      })
    },
    handleSave() {
      this.$refs.userForm.validate(valid => {
        if (!valid) {
          console.log("保存用户信息失败")
          return
        }
        this.req({
          url: "/user/info",
          data: {
            userId: localStorage.getItem("loginUserId"),
            password: this.userInfo.password,
            contact: this.userInfo.contact,
            introduction: this.userInfo.introduction
          },
          method: "PUT"
        }).then(res => {
          Message({
            message: "保存成功",
            type: 'success',
            duration: 2 * 1000
          })
        })
      })
    }
  }
};
</script>

<style>
.show-pwd {
  position: absolute;
  right: 10px;
  top: 3px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>
