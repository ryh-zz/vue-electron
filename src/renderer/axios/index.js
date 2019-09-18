import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// axios.defaults.baseURL = process.env.API_ROOT;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.defaults.baseURL = localStorage.IP ? `http://${localStorage.IP}` : process.env.API_ROOT;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// get请求
const axiosGet = (url, data, callback) => {
  axios({
    method: 'get',
    url: url,
    params: data,
    timeout: 5000,
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
const axiosPost = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
    })
      .then(function (res) {
        if (res.data.error_code === 'login_timeout') {
          router.push("/");
          return;
        }
        resolve(res.data)
      })
      .catch(function (error) {
        reject(error);
      })
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
