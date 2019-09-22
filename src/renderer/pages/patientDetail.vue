
<template>
  <div class="patientDetail">
    <!-- <p>{{patient_name}}报到成功！</p> -->
    <p>报到成功!</p>
    <p>{{time}}S 后自动跳转</p>
  </div>
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
      time: 5
    };
  },
  methods: {
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
    this.patient_name = this.$route.params.patient_name;
    this.delayedTime();
  }
};
</script>
<style lang="less" scoped>
.patientDetail {
  width: 100%;
  height: 100vh;
  position: relative;
  text-align: center;
  font-size: 30px;
  color: #ff8e8e;
  font-family: SimHei;
  font-weight: 400;
  padding-top: 300px;
  & > p:first-child {
    margin-bottom: 60px;
    font-size: 72px;
    font-family: SimHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>