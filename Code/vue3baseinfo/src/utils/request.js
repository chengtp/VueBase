import axios from "axios";

//创建axois，赋值变量service
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";
const service = axios.create({
    baseURL: BASEURL,
    timeout: 50000, // 默认为 `0`（无超时）
});

// Add a request interceptor
//请求接口前，做一些数据处理（请求拦截）
service.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        //在发送请求之前做些什么
        //后台需要前端这边传相关的参数（在发送头添加参数）
        // Tokey ,userId等

        config.headers["Tokey"] = "123424242343";

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
//请求接口后，返回数据进行拦截（响应拦截器）
service.interceptors.response.use(
    function (response) {
        // Do something with response data
        //对响应数据做点什么
        let data = response.data;
        if (data.resCode !== 0) {
            alert(data.message);
            return Promise.reject(data);
        } else {
            return response;
        }
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

//service.request({
//    method: "post",
//    url: "/user/123",
//    data: {
//        firstName: "zhang",
//        lastName:"san"
//    }
//});

export default service;
