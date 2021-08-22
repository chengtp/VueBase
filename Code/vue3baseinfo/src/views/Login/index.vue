<template>
  <body id="poster">
    <div class="divForm">
      <el-form class="login-container" label-position="left" label-width="0px">
        <h1 class="login_title">通用系统后台登录</h1>
        <el-form-item>
          <el-input
            type="text"
            v-model="loginForm.username"
            auto-complete="off"
            placeholder="登录账号"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="登录密码"
          ></el-input>
        </el-form-item>

        <el-form-item style="width: 100%">
          <el-button type="primary" class="buttonLogin" v-on:click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </body>
</template>
<script>
//  import axiois from 'axios'
import Service from "@/utils/request";
import { Test } from "api/login";
//  import { stripscript, stripscript2 } from "@/utils/validate";
export default {
  name: "login",
  componets: {},
  data () {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  // created() { },
  // mounted () {},
  methods: {
    login () {
      this.$axios
        .post("/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((successResponse) => {
          if (successResponse.data.code === 200) {
            this.$router.replace({ path: "/index" });
          }
        })
        .catch((failResponse) => { });
    },
  },
  props: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
#poster {
  background: url("../../assets/login.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  text-align: center;
  margin: 0 auto;
}

.divForm {
  position: absolute; /*绝对定位*/
  width: 400px;
  height: 380px;

  text-align: center; /*(让div中的内容居中)*/
  top: 50%;
  left: 50%;
  margin-top: -180px;
  margin-left: -200px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  width: 320px;
  padding: 40px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-container .login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
  font-size: 30px;
}

.login-container .el-form-item {
  margin-top: 40px;
}

.login-container .buttonLogin {
  width: 100%;
  background: #2408c0;
  border: none;
}
</style>
