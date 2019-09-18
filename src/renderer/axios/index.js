import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router'

// axios.defaults.baseURL = process.env.API_ROOT;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.defaults.baseURL = localStorage.IP ? `http://${localStorage.IP}` : process.env.API_ROOT;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// get请求
const axiosGet = (url, data, callback) => {
  axios({
    method: 'get',
    url: url,
    params: data
  })
    .then(function (res) {
      if (typeof (callback) == 'function') {
        if (res.data.error_code === 'login_timeout') {
          router.push("/");
          return;
        }
        callback(res)
      }
    })
    .catch(function (error) {
    })
}

// post请求
const axiosPost = (url, data, callback) => {
  axios({
    method: 'post',
    url: url,
    data: data
  })
    .then(function (res) {
      if (typeof (callback) == 'function') {
        if (res.data.error_code === 'login_timeout') {
          router.push("/");
          return;
        }
        callback(res)
      }
    })
    .catch(function (error) {

    })
}
// 上传请求
const axiosUpload = (url, data, callback) => {
  let formData = new FormData();
  for (var item in data) {
    formData.append(item, data[item])
  }
  axios({
    method: 'post',
    url: url,
    data: formData
  })
    .then(function (res) {
      if (res.status != 200) { Message.error("服务器异常"); return false; }
      if (res.data.code == '1003') { window.store.commit('login_ture'); return false; }
      if (res.data.code != '1000') { Message.error(res.data.msg); return false; }
      if (typeof (callback) == 'function') {
        callback(res)
      }
    })
    .catch(function (error) {
    })
}

// 参数校验
const parameterVerify = (data, slip) => {
  let verify = false;
  for (var item in data) {
    if (data[item] == false && item != slip) {
      verify = true
      break
    }
  };
  if (verify) {
    Message.error("请确认所有选项都填写完毕");
    return 1;
  } else {
    return 0;
  }

}

export default {
  axiosGet,
  axiosPost,
  axiosUpload,
  parameterVerify
}
