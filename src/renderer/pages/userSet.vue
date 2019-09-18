
<template>
  <el-card class="userSet">
    <div slot="header" class="clearfix">
      <span>设置</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goHome">返回</el-button>
    </div>
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="6">
        <div class="grid-content bg-purple">服务器IP：</div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-input class="home-input" v-model="IP" type="text"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="6">
        <div class="grid-content bg-purple">session_id</div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-input class="home-input" v-model="session_id" type="password"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-button type="primary" @click="submit">确定修改</el-button>
  </el-card>
</template>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      IP: "",
      session_id: "",
      dialogVisible: true
    };
  },
  methods: {
    submit() {
      this.vueSubmit();
      this.electronSubmit();
    },
    vueSubmit() {
      localStorage.IP = this.IP;
      localStorage.session_id = this.session_id;
      axios.defaults.baseURL = `http://${localStorage.IP}`;
    },
    electronSubmit() {
      this.$electron.ipcRenderer.send("main-message", {
        url: `http://${this.IP}`,
        name: "session_id",
        value: this.session_id
      });
      this.$router.push("/home");
    },
    goHome() {
      this.$router.push("/home");
    },
  },
  mounted() {
    this.IP = localStorage.IP;
    this.session_id = localStorage.session_id;
  }
};
</script>
<style lang="less" scoped>
.userSet {
  width: 80%;
  height: 80vh;
  margin: 30px auto;
  .el-row {
    margin-bottom: 10px;
  }
}
</style>