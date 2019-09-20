<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="home">
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  mounted: function() {
    if (localStorage.session_id) {
      this.setCookie("session_id", localStorage.session_id, 0);
      this.$router.push("/home");
    }
  },
  methods: {
    setCookie(name, value, day) {
      if (day !== 0) {
        //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        const expires = day * 24 * 60 * 60 * 1000;
        const date = new Date(+new Date() + expires);
        document.cookie = `${name} = ${escape(
          value
        )}; expires = ${date.toUTCString()}`;
      } else {
        window.document.cookie = `${name} = ${escape(value)}`;
        console.log(window.document.cookie);
      }
    }
  },

  watch: {
    $route(to, from) {
      // console.log(to.meta.index,from.meta.index)
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #a2a2a2;
  background: url(./assets/login_bg.png) top left repeat;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 路由动画 */
.child-view {
  position: absolute;
  transition: all 0.4s;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
/* 公共样式 */
.submit-div {
  margin-top: 20px;
  .submit {
    margin-top: 8px;
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    width: 100%;
    height: 50px;
    border-radius: 0.35em;
    font-size: 1.25em;
  }
}
</style>

