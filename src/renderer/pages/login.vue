
<template>
  <div class="login">
    <div class="login-main" v-loading="isloading">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="login"
      >
        <!-- <el-form-item label="版本" prop="IP">
          <el-select v-model="formLabelAlign.serviceVersion" placeholder="请选择">
            <el-option key="1" label="版本一" value="1"></el-option>
            <el-option key="2" label="版本二" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="IP" prop="IP">
          <el-input v-model="formLabelAlign.IP" @focus="getFocus($event)"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户" prop="user">
          <el-input v-model="formLabelAlign.user"></el-input>
        </el-form-item>-->
        <el-form-item label="密钥" prop="session_id">
          <el-input
            @focus="getFocus($event)"
            v-model="formLabelAlign.session_id"
            @keyup.enter.native="submitForm()"
            type="password"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm()" style="width: 100%;margin-top: 40px;">登录</el-button>
      </el-form>
    </div>
    <vue-touch-keyboard
      :options="options"
      v-if="visible"
      :layout="layout"
      :cancel="hide"
      :accept="hide"
      :input="input"
    />
  </div>
</template>
<script>
import md5 from "js-md5";
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "left",
      isloading: false,
      formLabelAlign: {
        serviceVersion: "2",
        user: "admin",
        session_id: "",
        IP: ""
      },
      rules: {
        session_id: [
          { required: true, message: "请输入您的密钥", trigger: "change" }
        ],
        IP: [{ required: true, message: "请输入IP", trigger: "change" }],
        user: [{ required: true, message: "请输入用户名", trigger: "change" }]
      },
      // 键盘
      options: {
        useKbEvents: false,
        preventClickEvent: false
      },
      visible: false,
      layout: "normal",
      input: null
    };
  },
  methods: {
    submitForm() {
      this.isloading = true;
      this.vueSubmit();
      this.electronSubmit();
      this.verifySubmit();
    },

    vueSubmit() {
      localStorage.IP = this.formLabelAlign.IP;
      localStorage.serviceVersion = this.formLabelAlign.serviceVersion;
      axios.defaults.baseURL = `http://${this.formLabelAlign.IP}`;
      localStorage.session_id = this.formLabelAlign.session_id;
    },

    electronSubmit() {
      this.$electron.ipcRenderer.send("main-message", {
        demand: "session",
        url: `http://${this.formLabelAlign.IP}`,
        name: "session_id",
        value: this.formLabelAlign.session_id
      });
    },

    async verifySubmit() {
      const data = {};
      try {
        await this.$refs.login.validate();
        let res;
        if (this.formLabelAlign.serviceVersion === "1") {
          res = await this.$axios.patientReport(data);
        } else {
          res = await this.$axios.patientReport2(data);
        }
        if (res.error_code === "session not valid") {
          this.$message.error("密钥无效");
          this.isloading = false;
        } else {
          this.goHome();
        }
      } catch (error) {
        this.isloading = false;
      }
    },

    goHome() {
      this.$router.push("/home");
    },

    //键盘
    hide() {
      this.visible = false;
    },

    getFocus(event) {
      if (!this.visible) this.visible = true;
      this.input = event.target;
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
    height: 300px;
    padding: 45px 30px 40px;
    background: #fff;
    box-shadow: 0 20px 30px 0 rgba(63, 63, 65, 0.06);
    border-radius: 10px;
  }
}
.vue-touch-keyboard{
  width: 80%;
  left: 10%;
  position: absolute;
  bottom: 100px;
}
</style>
