<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">新用户注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          id="account"
          ref="username"
          v-model="registerForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          id="psw"
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>

      <el-form-item prop="idNo">
        <span class="svg-container">
          <svg-icon icon-class="form"/>
        </span>
        <el-input
          id="idNo"
          ref="idNo"
          v-model="registerForm.idNo"
          placeholder="身份证号"
          name="idNo"
          type="text"
          tabindex="4"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="city">
        <span class="svg-container">
          <svg-icon icon-class="form"/>
        </span>
        <el-select style="width: 90%" placeholder="选择城市" v-model="registerForm.city">
          <el-option  v-for="item in cities" :label="item.name" :value="item.code" :key="item.code"/>
        </el-select>
      </el-form-item>

      <el-form-item prop="communityType">
        <span class="svg-container">
          <svg-icon icon-class="form"/>
        </span>

        <el-select style="width: 90%" placeholder="选择社区" v-model="registerForm.communityType">
          <el-option  v-for="item in communities" :label="item.name" :value="item.code" :key="item.code"/>
        </el-select>
      </el-form-item>

      <el-button
        id="register_btn"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >注册
      </el-button>
    </el-form>
  </div>
</template>

<script>

import {Message} from "element-ui";
import {getCities, getCommunities} from "@/api/dict";

export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 3 || value.length > 20) {
        callback(new Error("必填，用户名长度为3-20个字符"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3 || value.length > 20) {
        callback(new Error("必填，密码长度为3-20个字符"));
      } else {
        callback();
      }
    };
    const validateCity = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("必填，城市长度为2-10个字符"));
      } else {
        callback();
      }
    };
    const validateIdNo = (rule, value, callback) => {
      if (value.length !== 18) {
        callback(new Error("必填，身份证号长度为18个字符"));
      } else {
        callback();
      }
    };
    const validateCommunityType = (rule, value, callback) => {
      callback();
    };
    return {
      communities:[],
      cities:[],
      registerForm: {
        username: "",
        password: "",
        city: "",
        idNo: "",
        communityType: ""
      },
      registerRules: {
        username: [
          {required: true, trigger: "blur", validator: validateUsername}
        ],
        password: [
          {required: true, trigger: "blur", validator: validatePassword}
        ],
        city: [
          {required: true, trigger: "blur", validator: validateCity}
        ],
        idNo: [
          {required: true, trigger: "blur", validator: validateIdNo}
        ],
        communityType: [
          {required: true, trigger: "blur", validator: validateCommunityType}
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted: function () {
    //加载城市字典
    getCities().then(res=>{
      this.cities=res.data
    })
    //加载城社区字典
    getCommunities().then(res=>{
      this.communities=res.data
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
      });
    },
    handleRegister() {
      let that = this;
      this.loading = true;
      //数据格式验证
      this.$refs.registerForm.validate(valid => {
        if (!valid) {
          console.log("格式校验错误");
          this.loading = false
          return
        }

        // 注册时的逻辑处理
        this.req({
          url: "/user/register",
          data: {
            username: that.registerForm.username,
            password: that.registerForm.password,
            city: that.registerForm.city,
            idNo: that.registerForm.idNo,
            communityType: that.registerForm.communityType
          },
          method: "POST"
        }).then(
          res => {
            console.log("register res :", res);
            Message({
              message: "注册成功",
              type: 'success',
              duration: 2 * 1000
            })
            this.$router.push({path: "/login"});
          },
          err => {
            console.log("err :", err);
            this.loading = false;
          }
        );
      });
    }
  }
};
</script>

<style lang="scss">
.info {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: gainsboro;
}

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
