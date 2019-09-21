
<template>
  <el-card class="patientDetail">
    <div slot="header" class="clearfix">
      <span>报到信息</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goHome()">返回首页</el-button>
    </div>
    <div class="patientDetail-detail" v-loading="loading" :element-loading-text="loadingText">
      <div
        class="patientDetail-detail-main"
        :class="patient_name?'background-succeed':'background-error'"
      >
        <div v-if="patient_name">
          <h3><i class="el-notification__icon el-icon-success"></i> 报到成功</h3>
          <p>{{patient_name}} 您已报到成功！</p>
          <p>将在 {{time}}S 后返回主界面</p>
        </div>
        <div v-if="!patient_name && !loading">
          <h3><i class="el-notification__icon el-icon-error"></i> 报到失败</h3>
          <p>错误码：{{erroCode}}</p>
          <p>将在 {{time}}S 后返回主界面</p>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { setTimeout } from "timers";
export default {
  name: "PatientDetail",
  data() {
    return {
      patient_pid: "",
      patient_name: "",
      erroCode: "",
      loading: false,
      loadingText: "如果加载时间过长 请返回重新报到！",
      time: 5
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      const data = { patient_pid: `${this.patient_pid}` };
      const res = await this.$axios.axiosPost(
        "/service/go/post/patient_report",
        data
      );
      if (res.error_code === "success") {
        this.patient_name = res.patient_name;
      } else {
        this.erroCode = res.error_code;
      }
      this.loading = false;
      this.delayedTime();
    },

    delayedTime() {
      const timeObj = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearTimeout(timeObj);
          this.goHome();
        }
      }, 1000);
    },

    goHome() {
      this.$router.push("/home");
    }
  },
  mounted: function() {
    this.patient_pid = this.$route.params.patient_pid;
    this.submit();
  }
};
</script>
<style lang="less" scoped>
.patientDetail {
  width: 80%;
  height: 80vh;
  margin: 30px auto;
  position: relative;
  &-detail {
    width: 100%;
    position: relative;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-main {
      width: 500px;
      height: 300px;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #ebeef5;
      h3 {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p {
        margin-top: 20px;
      }
    }
  }
}
.background-error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

.background-succeed {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.el-notification__icon{
  margin-right: 10px;
}
</style>