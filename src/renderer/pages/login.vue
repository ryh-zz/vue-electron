
<template>
  <div class="login">
    <div class="login-main" v-loading="loading">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="login"
      >
        <el-form-item label="IP" prop="IP">
          <el-input v-model="formLabelAlign.IP"></el-input>
        </el-form-item>
        <el-form-item label="key_code" prop="session_id">
          <el-input
            v-model="formLabelAlign.session_id"
            @keyup.enter.native="submitForm()"
            type="password"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm()" style="width: 100%;margin-top: 40px;">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "left",
      loading: false,
      formLabelAlign: {
        username: "",
        session_id: "123",
        IP: "192.168.1.181"
      },
      rules: {
        session_id: [
          { required: true, message: "请输入您的密码", trigger: "change" }
        ],
        IP: [{ required: true, message: "请输入IP", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm() {
      localStorage.IP = this.formLabelAlign.IP;
      axios.defaults.baseURL = `http://${this.formLabelAlign.IP}`;
      localStorage.password = '123';
      localStorage.session_id = this.formLabelAlign.session_id;
      this.electronSubmit();
    },
    electronSubmit() {
      this.$electron.ipcRenderer.send("main-message", {
        demand:'session',
        url: `http://${this.formLabelAlign.IP}`,
        name: "session_id",
        value: this.formLabelAlign.session_id
      });
      this.$router.push("/home");
    },
  },
  mounted: function() {
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
  top: 0;
  z-index: 1999;
  &-main {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -190px;
    margin-top: -255px;
    box-sizing: border-box;
    width: 380px;
    height: 300px;
    padding: 45px 30px 40px;
    background: #fff;
    box-shadow: 0 20px 30px 0 rgba(63, 63, 65, 0.06);
    border-radius: 10px;
  }
}
</style>
