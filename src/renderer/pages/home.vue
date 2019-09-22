
<template>
  <div @click="getFocus" class="home">
    <div class="home-title">
      <p>上海大图医疗科技有限公司</p>
      <p>放射治疗报到机</p>
    </div>
    <input
      type="text"
      placeholder="请扫码或手工输入患者编号"
      v-model="inputValue"
      ref="codeInput"
      class="home-input"
      @click="visible = true"
      @keyup.enter="submit"
    />

    <div class="home-report" @click="submit" v-loading="loading">报到</div>

    <div class="home-defeated">{{errorCode}}</div>

    <div class="home-keyboard">
      <vue-touch-keyboard
        :options="options"
        v-if="visible"
        :layout="layout"
        :cancel="hide"
        :accept="accept"
        :input="input"
      />
    </div>
    <div class="home-set" @dblclick="goUserSet"></div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      dialogVisible: false,
      inputValue: "",
      visible: false,
      layout: "normal",
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      },
      loading: false,
      errorCode: ""
    };
  },
  methods: {
    async submit() {
      if (this.inputValue === "") {
        this.errorCode = "请输入报到码";
        return;
      }
      this.loading = true;
      const data = { patient_pid: `${this.inputValue}` };
      const res = await this.$axios.patientReport(data);
      if (res.error_code === "success") {
        this.$router.push(`/patientDetail/${res.patient_name}`);
      }
      if (res.error_code === "report exist") {
        this.errorCode = "您已经报到过了!";
      }
      if(res.error_code.indexOf("patient not exist") != -1){
        this.errorCode = "患者不存在!";
      }
      this.loading = false;
    },

    goUserSet() {
      this.$router.push("/userSet");
    },

    getFocus() {
      this.$refs.codeInput.focus();
    },

    accept(text) {
      this.hide();
    },

    hide() {
      this.visible = false;
    }
  },
  mounted() {
    this.input = this.$refs.codeInput;
    this.$refs.codeInput.focus();
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 90%;
  height: 100%;
  text-align: center;
  padding-top: 67px;
  &-title {
    font-size: 48px;
    color: #ffffff;
    font-size: 48px;
    font-family: SimHei;
    font-weight: 400;
  }
  &-input {
    width: 576px;
    height: 78px;
    box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.25),
      0px 0px 4px 0px rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    font-size: 36px;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    margin: 60px 0;
    border: none;
  }
  &-report {
    width: 175px;
    height: 67px;
    margin: 0 auto;
    background: url(../assets/button.png);
    opacity: 0.8;
    text-align: center;
    line-height: 62px;
    font-size: 30px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 40px;
    cursor: pointer;
  }
  &-defeated {
    font-size: 30px;
    color: #ff8e8e;
    font-family: SimHei;
    font-weight: 400;
  }
  &-keyboard {
    position: absolute;
    width: 100%;
    bottom: 100px;
  }
  &-set{
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 250px;
  }
}
</style>