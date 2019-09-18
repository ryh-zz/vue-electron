
<template>
  <el-card class="patientDetail" v-loading="loading">
    <div slot="header" class="clearfix">
      <span>报道信息</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goHome()">返回首页</el-button>
    </div>
    <div>
      <span>{{patient_name}} 报道成功</span>
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
      patient_name: "测试",
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      const data = { patient_pid: `${this.patient_pid}` };
      this.$axios.axiosPost("/service/go/post/patient_report", data, res => {
        if (res.data.error_code === "success") {
          this.$message({ message: "报道成功", type: "success" });
          this.patient_name = res.data.patient_name;
        } else{
          this.$message.error({ message: res.data.error_code});
        }
        this.loading = false;
      });
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
  &-affirm {
    position: absolute;
    bottom: 50px;
  }
}
</style>