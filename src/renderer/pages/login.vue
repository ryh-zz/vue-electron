
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
        <el-form-item label="版本" prop="IP">
          <el-select v-model="formLabelAlign.serviceVersion" placeholder="请选择">
            <el-option key="1" label="版本一" value="1"></el-option>
            <el-option key="2" label="版本二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP" prop="IP">
          <el-input v-model="formLabelAlign.IP"></el-input>
        </el-form-item>
        <el-form-item label="密钥" prop="session_id">
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
        serviceVersion: "1",
        session_id: "123",
        IP: "192.168.1.181"
      },
      rules: {
        session_id: [
          { required: true, message: "请输入您的密钥", trigger: "change" }
        ],
        IP: [{ required: true, message: "请输入IP", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm() {
      localStorage.IP = this.formLabelAlign.IP;
      localStorage.serviceVersion = this.formLabelAlign.serviceVersion;
      axios.defaults.baseURL = `http://${this.formLabelAlign.IP}`;
      localStorage.session_id = this.formLabelAlign.session_id;
      this.electronSubmit();
    },
    electronSubmit() {
      this.$electron.ipcRenderer.send("main-message", {
        demand: "session",
        url: `http://${this.formLabelAlign.IP}`,
        name: "session_id",
        value: this.formLabelAlign.session_id
      });
      this.verifySubmit();
    },

    async verifySubmit() {
      const data = {};
      let res;
      if (localStorage.serviceVersion === "1") {
        res = await this.$axios.patientReport(data);
      } else {
        res = await this.$axios.patientReport2(data);
      }
      if (res.error_code === "session not valid") {
        this.$message.error("密钥无效");
      } else {
        this.$router.push("/home");
      }
    }
  },
  mounted: function() {},
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
    height: 345px;
    padding: 45px 30px 40px;
    background: #fff;
    box-shadow: 0 20px 30px 0 rgba(63, 63, 65, 0.06);
    border-radius: 10px;
  }
}
</style>
