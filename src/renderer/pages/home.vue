
<template>
  <div @click="getFocus" class="home">
    <el-card class="home-card">
      <div slot="header" class="clearfix">
        <span>报道</span>
        <el-button
          @click.stop
          style="float: right; padding: 3px 0"
          type="text"
          @click="goUserSet"
        >设置</el-button>
      </div>
      <input
        type="text"
        placeholder="请扫码"
        v-model="inputValue"
        ref="codeInput"
        class="home-card-input"
        @keyup.enter="submit"
      />
      <vue-touch-keyboard
        :options="options"
        v-if="visible"
        :layout="layout"
        :cancel="hide"
        :accept="accept"
        :input="input"
      />
      <div @click.stop style="text-align: center;">
        <el-button type="primary" v-if="visible" @click="submit" class="home-card-submit">submit</el-button>
        <!-- <el-button type="primary" v-else @click="show">手动输入</el-button> -->
      </div>
    </el-card>
  </div>
</template>
<script>
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css";
export default {
  name: "Home",
  data() {
    return {
      inputValue: "",

      visible: true,
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
      if(this.inputValue === ''){
        this.$message.error('请输入您的报道码');
         return;
      }
      this.$router.push(`/patientDetail/${this.inputValue}`);
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

    // show(e) {
    //   this.input = this.$refs.codeInput;
    //   if (!this.visible) this.visible = true;
    // },

    hide() {
      return;
      // this.visible = false;
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
  width: 80%;
  height: 80vh;
  margin: 30px auto;
  &-card {
    width: 100%;
    height: 100%;
    &-input {
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
    }
    &-submit {
      margin-top: 8px;
      color: #fff;
      background-color: #337ab7;
      border-color: #2e6da4;
      width: 160px;
      height: 46px;
      border-radius: 0.35em;
      font-size: 1.25em;
    }
  }
}
</style>