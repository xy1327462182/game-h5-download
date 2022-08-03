import axios from "axios";
import { useRouter } from "vue-router";
import { Toast } from "vant";
const router = useRouter();
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    const header = {
      "Content-Type": "application/json;charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    };
    if (["get", "GET", "delete", "DELETE"].includes(config.method)) {
      header["Content-Type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
      config.params = config.data;
      delete config.data;
    }
    config.headers = {
      ...config.headers,
      ...header,
    };
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // 1成功0失败403无权限访问 401 未登入
    const res = response.data;
    switch (res.code) {
      // 成功
      case 1:
        return res;
        break;
      // 失败
      case 0:
        Toast.fail(res.msg || "请求失败");
        return Promise.reject(res || "Error");
        break;
      // 无权限
      case 403:
        Toast.fail("您暂无权限访问");
        return Promise.reject(res || "Error");
        break;
      case 401:
        Toast.fail("请先登录");
        router.replace("/");
        break;
    }
    return res;
  },
  (error) => {
    const errStr = "err" + error;
    if (errStr && errStr.indexOf("timeout") > -1) {
      //超时处理
      Toast.fail("请求超时，请重试");
    } else {
      Toast.fail(error.message || "请求失败，请稍后再试");
    }
    return Promise.reject(error);
  }
);

export default service;
