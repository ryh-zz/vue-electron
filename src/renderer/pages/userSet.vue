
<template>
  <el-card class="userSet">
    <div slot="header" class="clearfix">
      <span>设置</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goHome">返回</el-button>
    </div>
    <template v-if="!adminTrue">
      <div>
        <el-row :gutter="24" type="flex" align="middle">
          <el-col :span="6">
            <div class="grid-content bg-purple">管理员密钥</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input
                class="home-input"
                v-model="verifyPassword"
                type="password"
                @focus="getFocus($event)"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <div class="submit-div">
          <el-button type="primary" @click="adminVerify" class="submit">确定</el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <el-row :gutter="24" type="flex" align="middle">
        <el-col :span="6">
          <div class="grid-content bg-purple">服务器IP：</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-input class="home-input" v-model="IP" @focus="getFocus($event)"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" type="flex" align="middle">
        <el-col :span="6">
          <div class="grid-content bg-purple">端口号</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-input
              class="home-input"
              v-model="port"
              style="width:auto;"
              @focus="getFocus($event)"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" type="flex" align="middle">
        <el-col :span="6">
          <div class="grid-content bg-purple">密钥</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-input
              class="home-input"
              v-model="session_id"
              type="password"
              @focus="getFocus($event)"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <div class="submit-div" v-loading="isloading">
        <el-button type="primary" @click="submit" class="submit">确定修改</el-button>
      </div>
      <div class="submit-div close">
        <el-button type="primary" @click="appClose" class="submit">关闭程序</el-button>
      </div>
    </template>
    <vue-touch-keyboard
      :options="options"
      v-if="visible"
      :layout="layout"
      :cancel="hide"
      :accept="accept"
      :input="input"
    />
  </el-card>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      isloading:false,
      verifyPassword: "",
      adminTrue: false,

      IP: "",
      port: "80",
      session_id: "",
      password: "",

      visible: false,
      layout: "normal",
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      }
    };
  },
  methods: {
    submit() {
      this.isloading = true;
      this.vueSubmit();
      this.electronSubmit();
    },
    vueSubmit() {
      const IP = `${this.IP}:${this.port}`;
      localStorage.IP = IP;
      localStorage.session_id = this.session_id;
      localStorage.password = this.password;
      axios.defaults.baseURL = `http://${IP}`;
    },
    electronSubmit() {
      this.$electron.ipcRenderer.send("main-message", {
        demand: "session",
        url: `http://${this.IP}`,
        name: "session_id",
        value: this.session_id
      });
      this.verifySubmit();
    },
    goHome() {
      this.$router.push("/home");
    },

    getFocus(event) {
      if (!this.visible) this.visible = true;
      this.input = event.target;
    },

    adminVerify() {
      if (this.verifyPassword === this.session_id) {
        this.adminTrue = true;
      } else {
        this.$message.error("管理员密钥不正确");
      }
    },

    async verifySubmit() {
      const data = {};
      const res = await this.$axios.patientReport(data);
      if (res.error_code === "session not valid") {
        this.$message.error("密钥无效");
      } else {
        this.goHome();
      }
      this.isloading = true;
    },

    appClose() {
      this.$electron.ipcRenderer.send("main-message", {
        demand: "close"
      });
    },

    accept(text) {
      this.hide();
    },

    hide() {
      this.visible = false;
    }
  },
  mounted() {
    const arryIP = localStorage.IP.split(":");
    this.IP = arryIP[0];
    this.port = arryIP[1] || "80";
    this.session_id = localStorage.session_id;
  }
};
</script>
<style lang="less" scoped>
.userSet {
  width: 80%;
  height: 80vh;
  position: relative;
  .el-row {
    margin-bottom: 10px;
  }
  .close {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
</style>